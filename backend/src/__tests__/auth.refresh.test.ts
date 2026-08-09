import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { clearTestDB, connectTestDB, disconnectTestDB, registerUser, testAgent } from "./helpers";

describe("POST /api/auth/refresh", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it("returns a new access token for a valid refresh token", async () => {
    const register = await registerUser();
    const refreshToken = register.body.data.refreshToken;

    await new Promise((resolve) => setTimeout(resolve, 1100));

    const res = await testAgent.post("/api/auth/refresh").send({ refreshToken });

    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeTruthy();
    expect(res.body.data.accessToken).not.toBe(register.body.data.accessToken);
  });

  it("returns 401 for a malformed refresh token", async () => {
    const res = await testAgent.post("/api/auth/refresh").send({ refreshToken: "not-a-token" });
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("INVALID_REFRESH_TOKEN");
  });

  it("returns 401 when an access token is used as a refresh token", async () => {
    const register = await registerUser();
    const res = await testAgent.post("/api/auth/refresh").send({ refreshToken: register.body.data.accessToken });
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("INVALID_REFRESH_TOKEN");
  });

  it("returns 401 when refreshToken is missing", async () => {
    const res = await testAgent.post("/api/auth/refresh").send({});
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});
