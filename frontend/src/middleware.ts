import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/register", "/forgot-password", "/auth/google"];

function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export default withAuth(
  (req) => {
    const { pathname } = req.nextUrl;
    const isAuthPage = AUTH_PAGES.some(
      (page) => pathname === page || pathname.startsWith(`${page}/`)
    );

    if (isAuthPage && req.nextauth.token) {
      const destination = req.nextauth.token.role === "admin" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(destination, req.url));
    }

    if (isAdminPath(pathname) && req.nextauth.token && req.nextauth.token.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: { signIn: "/login" },
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        if (isAdminPath(pathname)) {
          return token?.role === "admin";
        }
        if (pathname.startsWith("/dashboard")) {
          return Boolean(token);
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register", "/forgot-password", "/auth/google"],
};
