import { Schema, model, type HydratedDocument } from "mongoose";

export type Role = "user" | "admin";

export interface IUser {
  fullName: string;
  companyName: string;
  phone?: string;
  email: string;
  password?: string;
  role: Role;
  profilePicture?: string;
  isEmailVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    companyName: { type: String, trim: true, maxlength: 100, default: "" },
    phone: { type: String, trim: true, sparse: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, select: false, minlength: 8 },
    role: { type: String, enum: ["user", "admin"], default: "user", index: true },
    profilePicture: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    otp: { type: String, select: false },
    otpExpiry: { type: Date, select: false },
    googleId: { type: String, sparse: true, unique: true },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", userSchema);
