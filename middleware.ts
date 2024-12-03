// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// import { readAuthCookie } from "./helpers";

// const protectedRoutes = ["/settings"];

// const token = readAuthCookie("sessionId");

// export default function middleware(req: NextRequest) {
//   if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
//     const absoluteURL = new URL("/login", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }
