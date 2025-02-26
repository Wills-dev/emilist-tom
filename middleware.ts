import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessionId = req.cookies.get("sessionId");

  if (!sessionId?.value) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/compare",
    "/expert/register/:path*",
    "/material/compare",
  ],
};
