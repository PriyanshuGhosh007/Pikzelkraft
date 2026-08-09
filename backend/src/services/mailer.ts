import nodemailer, { type Transporter } from "nodemailer";
import { env } from "../config/env";
import { logger } from "../utils/logger";

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: env.SMTP_USER
        ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
        : undefined,
    });
  }
  return transporter;
}

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail(options: MailOptions): Promise<boolean> {
  if (env.NODE_ENV === "test") {
    logger.info(`[mailer] test mode, email skipped for ${options.to}`);
    return true;
  }

  try {
    await getTransporter().sendMail({
      from: env.EMAIL_FROM,
      ...options,
    });
    return true;
  } catch (err) {
    logger.error("Failed to send email", err as Error);
    return false;
  }
}
