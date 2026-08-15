const ACCESS_TOKEN_KEY = "pz_access_token";
const REFRESH_TOKEN_KEY = "pz_refresh_token";

export class AuthApiError extends Error {
  readonly code?: string;
  readonly status?: number;

  constructor(message: string, options?: { code?: string; status?: number }) {
    super(message);
    this.name = "AuthApiError";
    this.code = options?.code;
    this.status = options?.status;
  }
}

export interface AuthUser {
  id: string;
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  role: string;
  profilePicture?: string | null;
  isEmailVerified: boolean;
  googleId?: string | null;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterInput {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ApiEnvelope<T> {
  success?: boolean;
  data?: T;
  error?: { code?: string; message?: string };
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new AuthApiError(
      "Unable to reach the server. Please check your connection and try again."
    );
  }

  const json = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!json || json.success !== true || !response.ok) {
    throw new AuthApiError(
      json?.error?.message ?? `Request failed (${response.status}). Please try again.`,
      { code: json?.error?.code, status: response.status }
    );
  }

  return json.data as T;
}

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  return postJson<AuthResponse>("/api/auth/register", input);
}

export async function loginUser(input: {
  identifier: string;
  password: string;
}): Promise<AuthResponse> {
  return postJson<AuthResponse>("/api/auth/login", input);
}

export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  return postJson<{ message: string }>("/api/auth/forgot-password", { email });
}

export async function verifyOtp(
  email: string,
  otp: string
): Promise<{ resetToken: string }> {
  return postJson<{ resetToken: string }>("/api/auth/verify-otp", { email, otp });
}

export async function resetPassword(
  resetToken: string,
  newPassword: string
): Promise<{ message: string }> {
  return postJson<{ message: string }>("/api/auth/reset-password", {
    resetToken,
    newPassword,
    confirmPassword: newPassword,
  });
}

export function setAuthTokens(tokens: AuthTokens): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearAuthTokens(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}
