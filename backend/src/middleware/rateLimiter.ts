import type { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { AppError } from "./errorHandler";

const isTest = process.env.NODE_ENV === "test";

function noopLimiter(_req: Request, _res: Response, next: NextFunction): void {
  next();
}

export const globalLimiter = isTest
  ? noopLimiter
  : rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 300,
      standardHeaders: true,
      legacyHeaders: false,
      handler: (_req, _res, _next, options) => {
        throw new AppError(
          options.statusCode ?? 429,
          "Too many requests, please try again later",
          "RATE_LIMITED"
        );
      },
    });

export const authLimiter = isTest
  ? noopLimiter
  : rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 20,
      standardHeaders: true,
      legacyHeaders: false,
      handler: (_req, _res, _next, options) => {
        throw new AppError(
          options.statusCode ?? 429,
          "Too many authentication attempts, please try again later",
          "AUTH_RATE_LIMITED"
        );
      },
    });

export const contactLimiter = isTest
  ? noopLimiter
  : rateLimit({
      windowMs: 60 * 60 * 1000,
      limit: 5,
      standardHeaders: true,
      legacyHeaders: false,
      handler: (_req, _res, _next, options) => {
        throw new AppError(
          options.statusCode ?? 429,
          "Too many submissions from this device, please try again later",
          "CONTACT_RATE_LIMITED"
        );
      },
    });
