import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "./errorHandler";
import type { Role } from "./roleGuard";

export interface AuthPayload {
  sub: string;
  email?: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: Role;
      userEmail?: string;
      user?: { id: string; email?: string; role: Role };
    }
  }
}

export function signAccessToken(payload: AuthPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

export function signRefreshToken(payload: AuthPayload): string {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

export function authenticateJWT(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    next(new AppError(401, "Authentication required", "AUTH_REQUIRED"));
    return;
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AuthPayload;

    if (!payload.sub) {
      next(new AppError(401, "Invalid token payload", "INVALID_TOKEN"));
      return;
    }

    const role: Role = payload.role ?? "user";
    req.userId = payload.sub;
    req.userRole = role;
    req.userEmail = payload.email;
    req.user = { id: payload.sub, email: payload.email, role };
    next();
  } catch {
    next(new AppError(401, "Invalid or expired token", "INVALID_TOKEN"));
  }
}
