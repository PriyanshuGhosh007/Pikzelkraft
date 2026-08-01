import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { env } from "./env";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

export async function connectDB(): Promise<void> {
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      if (!env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not set");
      }

      mongoose.connection.on("connected", () => logger.info("MongoDB connected"));
      mongoose.connection.on("error", (err) => logger.error("MongoDB connection error", err));
      mongoose.connection.on("disconnected", () => logger.warn("MongoDB disconnected"));

      await mongoose.connect(env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });

      logger.info(`MongoDB connection established (attempt ${attempts + 1})`);
      return;
    } catch (err) {
      attempts += 1;

      if (attempts >= MAX_RETRIES) {
        logger.error(`MongoDB connection failed after ${MAX_RETRIES} attempts`);
        throw err;
      }

      logger.warn(
        `MongoDB connection attempt ${attempts} failed, retrying in ${RETRY_DELAY_MS}ms: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  logger.info("MongoDB disconnected");
}
