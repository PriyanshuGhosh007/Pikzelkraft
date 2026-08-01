import type { Request, Response } from "express";
import mongoose from "mongoose";
import { env } from "../config/env";

export function getHealth(_req: Request, res: Response): void {
  const dbState = mongoose.connection.readyState;
  const dbStatus =
    dbState === 1 ? "connected" : dbState === 2 ? "connecting" : dbState === 3 ? "disconnecting" : "disconnected";

  res.status(dbState === 1 ? 200 : 503).json({
    success: true,
    data: {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      database: dbStatus,
    },
  });
}
