import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  // If user is not signed in (no token)
  if (!token) {
    // If trying to access dashboard, redirect to login
    if (path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    // If trying to access signup or login, allow access
    if (path === "/signup" || path === "/login") {
      return;
    }
    // If trying to access home page, allow access
    if (path === "/") {
      return;
    }
    // For any other path, redirect to login
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If user is signed in (has token)
  if (token) {
    // If trying to access dashboard, allow access
    if (path.startsWith("/dashboard")) {
      return;
    }
    // If trying to access signup or login, redirect to home
    if (path === "/signup" || path === "/login") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    // If trying to access home page, allow access
    if (path === "/") {
      return;
    }
    // For any other path, redirect to home
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/signup"],
};
