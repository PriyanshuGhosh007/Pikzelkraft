import crypto from "node:crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../middleware/errorHandler";
import {
  signAccessToken,
  signRefreshToken,
  type AuthPayload,
} from "../middleware/auth";
import { UserModel, type UserDocument } from "../models/User";
import { otpEmail, registrationSuccess } from "../utils/emailTemplates";
import { sendMail } from "./mailer";
import { verifyGoogleIdToken } from "./googleAuth";

const BCRYPT_ROUNDS = 10;
export const OTP_EXPIRY_MINUTES = 10;
export const RESET_TOKEN_EXPIRES_IN = "10m";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface PublicUser {
  id: string;
  fullName: string;
  companyName: string;
  phone?: string;
  email: string;
  role: string;
  profilePicture?: string;
  isEmailVerified: boolean;
  googleId?: string;
  createdAt: Date;
}

function toAuthPayload(user: UserDocument): AuthPayload {
  return { sub: String(user._id), email: user.email, role: user.role };
}

function buildTokens(user: UserDocument): TokenPair {
  const payload = toAuthPayload(user);
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
}

function sanitizeUser(user: UserDocument): PublicUser {
  return {
    id: String(user._id),
    fullName: user.fullName,
    companyName: user.companyName,
    phone: user.phone,
    email: user.email,
    role: user.role,
    profilePicture: user.profilePicture,
    isEmailVerified: user.isEmailVerified,
    googleId: user.googleId,
    createdAt: user.createdAt,
  };
}

export interface RegisterInput {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  password: string;
}

export async function registerUser(input: RegisterInput): Promise<{
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
}> {
  const { fullName, companyName, phone, email, password } = input;

  const existing = await UserModel.findOne({
    $or: [{ email }, { phone }],
  }).select("email phone");

  if (existing) {
    if (existing.email === email) {
      throw new AppError(409, "This email is already registered", "EMAIL_ALREADY_REGISTERED");
    }
    throw new AppError(409, "This phone number is already registered", "PHONE_ALREADY_REGISTERED");
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const user = await UserModel.create({
    fullName,
    companyName,
    phone,
    email,
    password: passwordHash,
  });

  await sendMail({
    to: user.email,
    ...registrationSuccess(user),
  });

  return { user: sanitizeUser(user), ...buildTokens(user) };
}

export interface LoginInput {
  identifier: string;
  password: string;
}

export async function loginUser(input: LoginInput): Promise<{
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
}> {
  const { identifier, password } = input;
  const isEmail = identifier.includes("@");
  const query = isEmail ? { email: identifier.toLowerCase() } : { phone: identifier };

  const user = await UserModel.findOne(query).select("+password");

  if (!user || !user.password) {
    throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  return { user: sanitizeUser(user), ...buildTokens(user) };
}

export async function loginWithGoogle(idToken: string): Promise<{
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}> {
  const googleUser = await verifyGoogleIdToken(idToken);

  let user = await UserModel.findOne({ googleId: googleUser.googleId });
  let isNewUser = false;

  if (!user) {
    user = await UserModel.findOne({ email: googleUser.email });

    if (user) {
      user.googleId = googleUser.googleId;
      if (googleUser.emailVerified) {
        user.isEmailVerified = true;
      }
      if (!user.profilePicture && googleUser.picture) {
        user.profilePicture = googleUser.picture;
      }
      await user.save();
    } else {
      isNewUser = true;
      const derivedName = googleUser.name ?? googleUser.email.split("@")[0];
      user = await UserModel.create({
        fullName: derivedName,
        companyName: "",
        email: googleUser.email,
        profilePicture: googleUser.picture,
        isEmailVerified: googleUser.emailVerified,
        googleId: googleUser.googleId,
      });
    }
  }

  return { user: sanitizeUser(user), ...buildTokens(user), isNewUser };
}

export async function requestPasswordReset(input: {
  email: string;
}): Promise<{ message: string }> {
  const user = await UserModel.findOne({ email: input.email.toLowerCase() });

  if (!user) {
    return { message: "If an account exists for this email, an OTP has been sent." };
  }

  const otp = crypto.randomInt(100000, 1000000).toString();
  const otpHash = await bcrypt.hash(otp, BCRYPT_ROUNDS);

  user.otp = otpHash;
  user.otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
  await user.save();

  await sendMail({
    to: user.email,
    ...otpEmail(user.fullName, otp, OTP_EXPIRY_MINUTES),
  });

  return { message: "If an account exists for this email, an OTP has been sent." };
}

function signResetToken(userId: string): string {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, {
    expiresIn: RESET_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

export function verifyResetToken(token: string): { sub: string } {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub?: string };
    if (!payload.sub) {
      throw new Error("Missing subject");
    }
    return { sub: payload.sub };
  } catch {
    throw new AppError(400, "Invalid or expired reset token", "INVALID_RESET_TOKEN");
  }
}

export async function verifyOtp(input: {
  email: string;
  otp: string;
}): Promise<{ resetToken: string }> {
  const user = await UserModel.findOne({ email: input.email.toLowerCase() }).select(
    "+otp +otpExpiry"
  );

  if (!user || !user.otp || !user.otpExpiry) {
    throw new AppError(400, "Invalid or expired OTP", "INVALID_OTP");
  }

  if (user.otpExpiry < new Date()) {
    throw new AppError(400, "OTP has expired", "OTP_EXPIRED");
  }

  const otpMatches = await bcrypt.compare(input.otp, user.otp);
  if (!otpMatches) {
    throw new AppError(400, "Invalid or expired OTP", "INVALID_OTP");
  }

  return { resetToken: signResetToken(String(user._id)) };
}

export interface ResetPasswordInput {
  resetToken: string;
  newPassword: string;
}

export async function resetPassword(input: ResetPasswordInput): Promise<{ message: string }> {
  const { sub } = verifyResetToken(input.resetToken);

  const user = await UserModel.findById(sub);
  if (!user) {
    throw new AppError(400, "Invalid or expired reset token", "INVALID_RESET_TOKEN");
  }

  const passwordHash = await bcrypt.hash(input.newPassword, BCRYPT_ROUNDS);

  user.password = passwordHash;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  return { message: "Your password has been reset successfully." };
}

export async function refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
  try {
    const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as AuthPayload;

    if (!payload.sub) {
      throw new Error("Missing subject");
    }

    const user = await UserModel.findById(payload.sub);
    if (!user) {
      throw new Error("User not found");
    }

    return { accessToken: signAccessToken(toAuthPayload(user)) };
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(401, "Invalid or expired refresh token", "INVALID_REFRESH_TOKEN");
  }
}

export interface AdminLoginInput {
  email: string;
  password: string;
}

export async function loginAdmin(input: AdminLoginInput): Promise<{
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
}> {
  const user = await UserModel.findOne({ email: input.email.toLowerCase() }).select("+password");

  if (!user || !user.password) {
    throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  if (user.role !== "admin") {
    throw new AppError(403, "Access restricted to administrators only", "FORBIDDEN");
  }

  const passwordMatches = await bcrypt.compare(input.password, user.password);
  if (!passwordMatches) {
    throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  return { user: sanitizeUser(user), ...buildTokens(user) };
}

export async function seedAdmin(): Promise<void> {
  const email = env.ADMIN_EMAIL;
  const password = env.ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  const existing = await UserModel.findOne({ email: email.toLowerCase() });

  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
    }
    return;
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  await UserModel.create({
    fullName: env.ADMIN_NAME,
    companyName: "",
    email: email.toLowerCase(),
    password: passwordHash,
    role: "admin",
    isEmailVerified: true,
  });
}
