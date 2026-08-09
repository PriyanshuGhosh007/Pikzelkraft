import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User";
import { clearTestDB, connectTestDB, disconnectTestDB, registerPayload, testAgent } from "./helpers";

const { sendMailMock } = vi.hoisted(() => ({ sendMailMock: vi.fn() }));

vi.mock("../services/mailer", () => ({
  sendMail: sendMailMock,
}));

describe("POST /api/auth/register", () => {
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

  it("registers a user and returns access + refresh tokens", async () => {
    const res = await testAgent.post("/api/auth/register").send(registerPayload());

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeTruthy();
    expect(res.body.data.refreshToken).toBeTruthy();
    expect(res.body.data.user).toMatchObject({
      fullName: "Jane Doe",
      companyName: "Acme Corp",
      phone: "+10000000000",
      email: "jane@example.com",
      role: "user",
      isEmailVerified: false,
    });
    expect(res.body.data.user.password).toBeUndefined();
  });

  it("normalizes email to lowercase and trims fullName", async () => {
    const res = await testAgent
      .post("/api/auth/register")
      .send(registerPayload({ fullName: "  John Smith  ", email: "  John@Example.COM  " }));

    expect(res.status).toBe(201);
    expect(res.body.data.user.fullName).toBe("John Smith");
    expect(res.body.data.user.email).toBe("john@example.com");
  });

  it("stores a bcrypt-hashed password (never plaintext)", async () => {
    await testAgent.post("/api/auth/register").send(registerPayload());

    const user = await UserModel.findOne({ email: "jane@example.com" }).select("+password");
    expect(user).not.toBeNull();
    expect(user!.password).toBeTruthy();
    expect(user!.password).not.toBe("password123");
    const matches = await bcrypt.compare("password123", user!.password!);
    expect(matches).toBe(true);
  });

  it("sends a registration success email via Nodemailer", async () => {
    await testAgent.post("/api/auth/register").send(registerPayload());

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    const [mail] = sendMailMock.mock.calls[0] as Array<{ to: string; subject: string; html: string }>;
    expect(mail.to).toBe("jane@example.com");
    expect(mail.subject).toContain("Welcome");
    expect(mail.html).toContain("Jane Doe");
    expect(mail.html).toContain("<html");
  });

  it("rejects a duplicate email with 409 EMAIL_ALREADY_REGISTERED", async () => {
    await testAgent.post("/api/auth/register").send(registerPayload());
    const res = await testAgent
      .post("/api/auth/register")
      .send(registerPayload({ email: "JANE@example.com", phone: "+19999999999" }));

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("EMAIL_ALREADY_REGISTERED");
  });

  it("rejects a duplicate phone with 409 PHONE_ALREADY_REGISTERED", async () => {
    await testAgent.post("/api/auth/register").send(registerPayload());
    const res = await testAgent
      .post("/api/auth/register")
      .send(registerPayload({ email: "other@example.com", phone: "+10000000000" }));

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe("PHONE_ALREADY_REGISTERED");
  });

  it("rejects mismatched passwords with 400", async () => {
    const res = await testAgent
      .post("/api/auth/register")
      .send(registerPayload({ password: "password123", confirmPassword: "different123" }));

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
    expect(res.body.error.details.confirmPassword).toBeDefined();
  });

  it("rejects an invalid email address with 400", async () => {
    const res = await testAgent.post("/api/auth/register").send(registerPayload({ email: "not-an-email" }));
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects a short password with 400", async () => {
    const res = await testAgent
      .post("/api/auth/register")
      .send(registerPayload({ password: "123", confirmPassword: "123" }));
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects missing required fields with 400", async () => {
    const res = await testAgent.post("/api/auth/register").send({ email: "lonely@example.com" });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});
