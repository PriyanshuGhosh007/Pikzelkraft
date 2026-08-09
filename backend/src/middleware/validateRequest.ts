import type { NextFunction, Request, Response } from "express";
import type { ZodError, ZodSchema } from "zod";
import { AppError } from "./errorHandler";

function flattenZodErrors(error: ZodError): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([key, value]) => [key, value ?? []])
  );
}

export function validateRequest(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(new AppError(400, "Validation failed", "VALIDATION_ERROR", flattenZodErrors(result.error)));
      return;
    }

    req.body = result.data;
    next();
  };
}
