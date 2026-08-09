import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { UserModel } from "../models/User";
import { clearTestDB, connectTestDB, disconnectTestDB, registerUser, testAgent } from "./helpers";
import type { GoogleUserPayload } from "../services/googleAuth";

const { verifyGoogleIdTokenMock } = vi.hoisted(() => ({ verifyGoogleIdTokenMock: vi.fn() }));

vi.mock("../services/googleAuth", () => ({
  verifyGoogleIdToken: verifyGoogleIdTokenMock,
}));

const googlePayload: GoogleUserPayload = {
  googleId: "google-sub-123",
  email: "google.user@gmail.com",
  emailVerified: true,
  name: "Google User",
  picture: "https://lh3.googleusercontent.com/photo.jpg",
};

describe("POST /api/auth/google", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
    verifyGoogleIdTokenMock.mockReset();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it("creates a new user and returns tokens when the Google account is new", async () => {
    verifyGoogleIdTokenMock.mockResolvedValue(googlePayload);

    const res = await testAgent.post("/api/auth/google").send({ idToken: "valid-id-token" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.isNewUser).toBe(true);
    expect(res.body.data.accessToken).toBeTruthy();
    expect(res.body.data.refreshToken).toBeTruthy();
    expect(res.body.data.user).toMatchObject({
      fullName: "Google User",
      email: "google.user@gmail.com",
      googleId: "google-sub-123",
      role: "user",
      isEmailVerified: true,
      profilePicture: "https://lh3.googleusercontent.com/photo.jpg",
    });

    const count = await UserModel.countDocuments({ email: "google.user@gmail.com" });
    expect(count).toBe(1);
  });

  it("returns 400 when idToken is missing", async () => {
    const res = await testAgent.post("/api/auth/google").send({});
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns 401 when the Google ID token is invalid", async () => {
    verifyGoogleIdTokenMock.mockRejectedValue(
      new (await import("../middleware/errorHandler")).AppError(401, "Invalid Google ID token", "INVALID_GOOGLE_TOKEN")
    );

    const res = await testAgent.post("/api/auth/google").send({ idToken: "garbage-token" });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("INVALID_GOOGLE_TOKEN");
  });

  it("logs in an existing googleId user without creating a duplicate", async () => {
    verifyGoogleIdTokenMock.mockResolvedValue(googlePayload);
    await testAgent.post("/api/auth/google").send({ idToken: "first-login" });

    verifyGoogleIdTokenMock.mockResolvedValue({ ...googlePayload, name: "Renamed Google User" });
    const res = await testAgent.post("/api/auth/google").send({ idToken: "second-login" });

    expect(res.status).toBe(200);
    expect(res.body.data.isNewUser).toBe(false);
    expect(res.body.data.user.googleId).toBe("google-sub-123");
    expect(res.body.data.user.fullName).toBe("Google User");

    const count = await UserModel.countDocuments({ email: "google.user@gmail.com" });
    expect(count).toBe(1);
  });

  it("links googleId to an existing email account (not creating a new user)", async () => {
    await registerUser({ email: "google.user@gmail.com", phone: "+15550000000", password: "password123", confirmPassword: "password123" });
    verifyGoogleIdTokenMock.mockResolvedValue(googlePayload);

    const res = await testAgent.post("/api/auth/google").send({ idToken: "link-account" });

    expect(res.status).toBe(200);
    expect(res.body.data.isNewUser).toBe(false);
    expect(res.body.data.user.googleId).toBe("google-sub-123");

    const count = await UserModel.countDocuments({ email: "google.user@gmail.com" });
    expect(count).toBe(1);
  });

  it("derives a fullName from the email when Google returns no name", async () => {
    verifyGoogleIdTokenMock.mockResolvedValue({ ...googlePayload, name: undefined });

    const res = await testAgent.post("/api/auth/google").send({ idToken: "no-name" });

    expect(res.status).toBe(200);
    expect(res.body.data.user.fullName).toBeTruthy();
  });
});
