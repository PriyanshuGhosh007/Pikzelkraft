import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  loginAdmin,
  loginUser,
  loginWithGoogle,
  refreshAccessToken,
  registerUser,
  requestPasswordReset,
  resetPassword,
  verifyOtp,
} from "../services/auth.service";
import { AppError } from "../middleware/errorHandler";

function sendSuccess(res: Response, status: number, data: unknown): void {
  res.status(status).json({ success: true, data });
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await registerUser(req.body);
  sendSuccess(res, 201, result);
});

export const google = asyncHandler(async (req: Request, res: Response) => {
  const { idToken } = req.body as { idToken: string };
  const result = await loginWithGoogle(idToken);
  sendSuccess(res, 200, result);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUser(req.body);
  sendSuccess(res, 200, result);
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const result = await requestPasswordReset(req.body);
  sendSuccess(res, 200, result);
});

export const verifyOtpHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await verifyOtp(req.body);
  sendSuccess(res, 200, result);
});

export const resetPasswordHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await resetPassword(req.body);
  sendSuccess(res, 200, result);
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body as { refreshToken: string };
  const result = await refreshAccessToken(refreshToken);
  sendSuccess(res, 200, result);
});

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginAdmin(req.body);
  sendSuccess(res, 200, result);
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) {
    throw new AppError(401, "Authentication required", "AUTH_REQUIRED");
  }
  sendSuccess(res, 200, { userId: req.userId, role: req.userRole, email: req.userEmail });
});
