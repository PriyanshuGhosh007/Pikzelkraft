import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { UserModel } from "../models/User";
import { clearTestDB, connectTestDB, disconnectTestDB, registerUser, testAgent } from "./helpers";

const { sendMailMock } = vi.hoisted(() => ({ sendMailMock: vi.fn() }));

vi.mock("../services/mailer", () => ({
  sendMail: sendMailMock,
}));

function extractOtpFromHtml(html: string): string {
  const match = />(\d{6})</.exec(html);
  if (!match) {
    throw new Error(`Could not find 6-digit OTP in email html: ${html}`);
  }
  return match[1];
}

async function lastMail(): Promise<{ to: string; subject: string; html: string }> {
  expect(sendMailMock).toHaveBeenCalled();
  return sendMailMock.mock.calls[sendMailMock.mock.calls.length - 1][0] as {
    to: string;
    subject: string;
    html: string;
  };
}

describe("Password reset (forgot-password / verify-otp / reset-password)", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
    sendMailMock.mockReset();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it("generates a 6-digit OTP, stores it hashed, and emails it", async () => {
    await registerUser();
    sendMailMock.mockReset();

    const res = await testAgent.post("/api/auth/forgot-password").send({ email: "jane@example.com" });

    expect(res.status).toBe(200);
    expect(sendMailMock).toHaveBeenCalledTimes(1);

    const mail = await lastMail();
    expect(mail.to).toBe("jane@example.com");
    expect(mail.subject.toLowerCase()).toContain("code");

    const otp = extractOtpFromHtml(mail.html);
    expect(otp).toMatch(/^\d{6}$/);

    const user = await UserModel.findOne({ email: "jane@example.com" }).select("+otp +otpExpiry");
    expect(user!.otp).toBeTruthy();
    expect(user!.otp).not.toBe(otp);
    expect(user!.otpExpiry).toBeInstanceOf(Date);
  });

  it("does not reveal whether the email exists when the account is unknown", async () => {
    const res = await testAgent.post("/api/auth/forgot-password").send({ email: "missing@example.com" });

    expect(res.status).toBe(200);
    expect(sendMailMock).not.toHaveBeenCalled();
    expect(res.body.data.message).toBeTruthy();
  });

  it("verifies a correct OTP and returns a reset token", async () => {
    await registerUser();
    await testAgent.post("/api/auth/forgot-password").send({ email: "jane@example.com" });
    const mail = await lastMail();
    const otp = extractOtpFromHtml(mail.html);

    const res = await testAgent.post("/api/auth/verify-otp").send({ email: "jane@example.com", otp });

    expect(res.status).toBe(200);
    expect(res.body.data.resetToken).toBeTruthy();
  });

  it("rejects an incorrect OTP with 400 INVALID_OTP", async () => {
    await registerUser();
    await testAgent.post("/api/auth/forgot-password").send({ email: "jane@example.com" });

    const res = await testAgent.post("/api/auth/verify-otp").send({ email: "jane@example.com", otp: "000000" });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("INVALID_OTP");
  });

  it("rejects an expired OTP with 400 OTP_EXPIRED", async () => {
    await registerUser();
    await testAgent.post("/api/auth/forgot-password").send({ email: "jane@example.com" });
    await UserModel.updateOne(
      { email: "jane@example.com" },
      { otpExpiry: new Date(Date.now() - 60_000) }
    );

    const res = await testAgent.post("/api/auth/verify-otp").send({ email: "jane@example.com", otp: "123456" });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("OTP_EXPIRED");
  });

  it("resets the password with a valid reset token and old password stops working", async () => {
    await registerUser();
    await testAgent.post("/api/auth/forgot-password").send({ email: "jane@example.com" });
    const mail = await lastMail();
    const otp = extractOtpFromHtml(mail.html);
    const verify = await testAgent.post("/api/auth/verify-otp").send({ email: "jane@example.com", otp });

    const res = await testAgent.post("/api/auth/reset-password").send({
      resetToken: verify.body.data.resetToken,
      newPassword: "newpassword456",
      confirmPassword: "newpassword456",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const oldLogin = await testAgent.post("/api/auth/login").send({
      identifier: "jane@example.com",
      password: "password123",
    });
    expect(oldLogin.status).toBe(401);

    const newLogin = await testAgent.post("/api/auth/login").send({
      identifier: "jane@example.com",
      password: "newpassword456",
    });
    expect(newLogin.status).toBe(200);
  });

  it("rejects reset-password with an invalid reset token", async () => {
    const res = await testAgent.post("/api/auth/reset-password").send({
      resetToken: "not-a-valid-token",
      newPassword: "newpassword456",
      confirmPassword: "newpassword456",
    });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("INVALID_RESET_TOKEN");
  });

  it("rejects reset-password when passwords do not match", async () => {
    const res = await testAgent.post("/api/auth/reset-password").send({
      resetToken: "token",
      newPassword: "newpassword456",
      confirmPassword: "different456",
    });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects an OTP that is not 6 digits", async () => {
    const res = await testAgent.post("/api/auth/verify-otp").send({ email: "jane@example.com", otp: "12" });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});
