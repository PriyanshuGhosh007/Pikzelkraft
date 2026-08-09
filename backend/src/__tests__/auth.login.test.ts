import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { UserModel } from "../models/User";
import { clearTestDB, connectTestDB, disconnectTestDB, registerUser, testAgent } from "./helpers";

describe("POST /api/auth/login", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  async function seedUser(): Promise<void> {
    await registerUser();
  }

  it("logs in with email and correct password", async () => {
    await seedUser();
    const res = await testAgent.post("/api/auth/login").send({
      identifier: "jane@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeTruthy();
    expect(res.body.data.refreshToken).toBeTruthy();
    expect(res.body.data.user.email).toBe("jane@example.com");
  });

  it("logs in with phone number and correct password", async () => {
    await seedUser();
    const res = await testAgent.post("/api/auth/login").send({
      identifier: "+10000000000",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body.data.user.phone).toBe("+10000000000");
  });

  it("is case-insensitive on email login", async () => {
    await seedUser();
    const res = await testAgent.post("/api/auth/login").send({
      identifier: "JANE@EXAMPLE.COM",
      password: "password123",
    });
    expect(res.status).toBe(200);
  });

  it("returns 401 for a wrong password", async () => {
    await seedUser();
    const res = await testAgent.post("/api/auth/login").send({
      identifier: "jane@example.com",
      password: "wrong-password",
    });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("INVALID_CREDENTIALS");
  });

  it("returns 401 for an unknown email", async () => {
    const res = await testAgent.post("/api/auth/login").send({
      identifier: "ghost@example.com",
      password: "password123",
    });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("INVALID_CREDENTIALS");
  });

  it("returns 401 for an unknown phone", async () => {
    await seedUser();
    const res = await testAgent.post("/api/auth/login").send({
      identifier: "+19999999999",
      password: "password123",
    });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("INVALID_CREDENTIALS");
  });

  it("never leaks whether the account or the password was wrong", async () => {
    await seedUser();
    const unknown = await testAgent.post("/api/auth/login").send({
      identifier: "ghost@example.com",
      password: "wrong-password",
    });
    const wrongPassword = await testAgent.post("/api/auth/login").send({
      identifier: "jane@example.com",
      password: "wrong-password",
    });

    expect(unknown.body.error.code).toBe(wrongPassword.body.error.code);
    expect(unknown.body.error.message).toBe(wrongPassword.body.error.message);
  });

  it("returns 400 when identifier or password is missing", async () => {
    const res = await testAgent.post("/api/auth/login").send({ identifier: "jane@example.com" });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});
