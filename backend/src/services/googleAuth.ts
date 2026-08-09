import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env";
import { AppError } from "../middleware/errorHandler";

export interface GoogleUserPayload {
  googleId: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  picture?: string;
}

const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export async function verifyGoogleIdToken(idToken: string): Promise<GoogleUserPayload> {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.sub || !payload.email) {
      throw new AppError(401, "Invalid Google ID token", "INVALID_GOOGLE_TOKEN");
    }

    return {
      googleId: payload.sub,
      email: payload.email.toLowerCase(),
      emailVerified: payload.email_verified ?? false,
      name: payload.name,
      picture: payload.picture,
    };
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(401, "Invalid Google ID token", "INVALID_GOOGLE_TOKEN");
  }
}
