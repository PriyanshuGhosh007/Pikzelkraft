import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(80, "Full name must be at most 80 characters"),
    companyName: z.string().trim().max(100).optional().default(""),
    phone: z.string().trim().min(7, "Invalid phone number").max(20, "Invalid phone number"),
    email: z.string().trim().email("Invalid email address").toLowerCase(),
    password: z.string().min(8, "Password must be at least 8 characters").max(100),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const googleSchema = z.object({
  idToken: z.string().min(1, "idToken is required"),
});

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Email or phone is required"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Invalid email address").toLowerCase(),
});

export const verifyOtpSchema = z.object({
  email: z.string().trim().email("Invalid email address").toLowerCase(),
  otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export const resetPasswordSchema = z
  .object({
    resetToken: z.string().min(1, "resetToken is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters").max(100),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const refreshSchema = z.object({
  refreshToken: z.string().min(1, "refreshToken is required"),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Invalid email address").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});
