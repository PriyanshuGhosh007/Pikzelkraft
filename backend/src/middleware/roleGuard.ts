import type { NextFunction, Request, Response } from "express";
import { AppError } from "./errorHandler";

export type Role = "user" | "admin";

export function requireRole(roles: Role | Role[]) {
  const allowed = Array.isArray(roles) ? roles : [roles];

  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.userRole) {
      next(new AppError(401, "Authentication required", "AUTH_REQUIRED"));
      return;
    }

    if (!allowed.includes(req.userRole)) {
      next(
        new AppError(403, "You do not have permission to access this resource", "FORBIDDEN")
      );
      return;
    }

    next();
  };
}

export const requireAdmin = requireRole("admin");
export const requireUser = requireRole(["user", "admin"]);
