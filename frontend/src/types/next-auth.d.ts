import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: string | null;
      accessToken?: string | null;
      refreshToken?: string | null;
      picture?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
  }
}
