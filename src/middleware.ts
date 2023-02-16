import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const token = req.nextauth.token;
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/templates", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/", "/templates/:path*", "/profile/:path*"],
};
