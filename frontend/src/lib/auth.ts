import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const backendUrl = process.env.BACKEND_URL ?? "http://localhost:4000";

interface AuthLoginResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    profilePicture?: string | null;
  };
  accessToken: string;
  refreshToken: string;
}

const providers: NextAuthOptions["providers"] = [];

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (googleClientId && googleClientSecret) {
  providers.push(
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    })
  );
}

providers.push(
  CredentialsProvider({
    name: "credentials",
    credentials: {
      identifier: { label: "Email or phone", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.identifier || !credentials.password) {
        throw new Error("Invalid email or password.");
      }

      let response: Response;
      try {
        response = await fetch(`${backendUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: credentials.identifier,
            password: credentials.password,
          }),
        });
      } catch {
        throw new Error("Unable to reach the authentication service.");
      }

      const json = (await response.json().catch(() => null)) as {
        success?: boolean;
        data?: AuthLoginResponse;
        error?: { message?: string };
      } | null;

      if (!response.ok || !json?.success || !json.data) {
        throw new Error(json?.error?.message ?? "Invalid email or password.");
      }

      return {
        id: json.data.user.id,
        email: json.data.user.email,
        name: json.data.user.fullName,
        image: json.data.user.profilePicture ?? undefined,
        role: json.data.user.role,
        accessToken: json.data.accessToken,
        refreshToken: json.data.refreshToken,
      };
    },
  })
);

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.picture = token.picture;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
};
