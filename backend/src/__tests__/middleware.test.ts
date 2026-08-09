import { describe, expect, it } from "vitest";
import express from "express";
import request from "supertest";
import { authenticateJWT, signAccessToken } from "../middleware/auth";
import { requireRole } from "../middleware/roleGuard";
import { validateRequest } from "../middleware/validateRequest";
import { errorHandler } from "../middleware/errorHandler";
import { loginSchema } from "../validators/auth.validators";

function buildTestApp(): express.Express {
  const testApp = express();
  testApp.use(express.json());

  testApp.post("/protected", authenticateJWT, (req, res) => {
    res.status(200).json({ ok: true, userId: req.userId, userRole: req.userRole, userEmail: req.userEmail });
  });

  testApp.post("/admin-only", authenticateJWT, requireRole("admin"), (_req, res) => {
    res.status(200).json({ ok: true });
  });

  testApp.post("/validated", validateRequest(loginSchema), (req, res) => {
    res.status(200).json({ ok: true, body: req.body });
  });

  testApp.use(errorHandler);

  return testApp;
}

const testApp = buildTestApp();

describe("authenticateJWT", () => {
  it("rejects a request without an Authorization header", async () => {
    const res = await request(testApp).post("/protected");
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("AUTH_REQUIRED");
  });

  it("rejects a malformed Authorization header", async () => {
    const res = await request(testApp).post("/protected").set("Authorization", "Basic abc123");
    expect(res.status).toBe(401);
  });

  it("rejects an invalid or expired token", async () => {
    const res = await request(testApp).post("/protected").set("Authorization", "Bearer not-a-jwt");
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("INVALID_TOKEN");
  });

  it("accepts a valid access token and populates request user info", async () => {
    const token = signAccessToken({ sub: "user-123", email: "jane@example.com", role: "user" });

    const res = await request(testApp).post("/protected").set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.userId).toBe("user-123");
    expect(res.body.userRole).toBe("user");
    expect(res.body.userEmail).toBe("jane@example.com");
  });
});

describe("requireRole('admin')", () => {
  it("rejects when no authentication is present", async () => {
    const res = await request(testApp).post("/admin-only");
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("AUTH_REQUIRED");
  });

  it("rejects a user role with 403", async () => {
    const token = signAccessToken({ sub: "user-1", email: "jane@example.com", role: "user" });
    const res = await request(testApp).post("/admin-only").set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("allows an admin role through", async () => {
    const token = signAccessToken({ sub: "admin-1", email: "admin@pikzelkraft.com", role: "admin" });
    const res = await request(testApp).post("/admin-only").set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});

describe("validateRequest", () => {
  it("passes valid bodies through (transformed value attached to req.body)", async () => {
    const res = await request(testApp).post("/validated").send({ identifier: " jane@example.com ", password: "secret" });
    expect(res.status).toBe(200);
    expect(res.body.body.identifier).toBe("jane@example.com");
  });

  it("rejects an invalid body with 400 and field details", async () => {
    const res = await request(testApp).post("/validated").send({ identifier: "", password: "" });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
    expect(res.body.error.details).toBeDefined();
  });
});
