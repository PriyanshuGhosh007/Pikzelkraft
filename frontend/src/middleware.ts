import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/register", "/forgot-password", "/auth/google"];

export default withAuth(
  (req) => {
    const { pathname } = req.nextUrl;
    const isAuthPage = AUTH_PAGES.some(
      (page) => pathname === page || pathname.startsWith(`${page}/`)
    );

    if (isAuthPage && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: { signIn: "/login" },
    callbacks: {
      authorized({ req, token }) {
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return Boolean(token);
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/forgot-password", "/auth/google"],
};
