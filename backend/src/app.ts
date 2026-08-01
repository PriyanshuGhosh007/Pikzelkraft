import express from "express";
import helmet from "helmet";
import cors from "cors";
import { env } from "./config/env";
import { globalLimiter } from "./middleware/rateLimiter";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import routes from "./routes";

export const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: env.CLIENT_URL.split(",").map((origin) => origin.trim()),
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

app.get("/", (_req, res) => {
  res.json({ success: true, data: { service: "pikzelkraft-api", version: "1.0.0" } });
});

app.use("/api/v1", globalLimiter);
app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(errorHandler);
