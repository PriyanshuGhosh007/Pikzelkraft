import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { seedAdmin } from "../services/auth.service";
import { UserModel } from "../models/User";
import { clearTestDB, connectTestDB, disconnectTestDB, registerUser, testAgent } from "./helpers";

describe("POST /api/auth/admin/login", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it("seeds the first admin from environment variables", async () => {
    await seedAdmin();

    const admin = await UserModel.findOne({ email: "admin@pikzelkraft.com" });
    expect(admin).not.toBeNull();
    expect(admin!.role).toBe("admin");
  });

  it("is idempotent — does not create duplicate admins", async () => {
    await seedAdmin();
    await seedAdmin();

    const count = await UserModel.countDocuments({ email: "admin@pikzelkraft.com" });
    expect(count).toBe(1);
  });

  it("logs in a seeded admin and returns tokens", async () => {
    await seedAdmin();

    const res = await testAgent.post("/api/auth/admin/login").send({
      email: "admin@pikzelkraft.com",
      password: "adminpassword123",
    });

    expect(res.status).toBe(200);
    expect(res.body.data.user.role).toBe("admin");
    expect(res.body.data.accessToken).toBeTruthy();
    expect(res.body.data.refreshToken).toBeTruthy();
  });

  it("returns 401 for a wrong admin password", async () => {
    await seedAdmin();

    const res = await testAgent.post("/api/auth/admin/login").send({
      email: "admin@pikzelkraft.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("INVALID_CREDENTIALS");
  });

  it("returns 403 when a regular user tries to use the admin login", async () => {
    await seedAdmin();
    await registerUser();

    const res = await testAgent.post("/api/auth/admin/login").send({
      email: "jane@example.com",
      password: "password123",
    });

    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe("FORBIDDEN");
  });
});
