import "dotenv/config";
import { app } from "./app";
import { connectDB, disconnectDB } from "./config/db";
import { env } from "./config/env";
import { logger } from "./utils/logger";

async function main(): Promise<void> {
  try {
    await connectDB();

    const server = app.listen(env.PORT, () => {
      logger.info(`Pikzelkraft API listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
    });

    const shutdown = async (signal: string): Promise<void> => {
      logger.info(`${signal} received, shutting down gracefully`);
      server.close(async () => {
        await disconnectDB();
        process.exit(0);
      });
      setTimeout(() => process.exit(1), 10000).unref();
    };

    process.on("SIGTERM", () => void shutdown("SIGTERM"));
    process.on("SIGINT", () => void shutdown("SIGINT"));
  } catch (err) {
    logger.error("Failed to start server", err as Error);
    process.exit(1);
  }
}

void main();
