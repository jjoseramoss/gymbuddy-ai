import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isProtectedPath(pathname: string) {
  if (pathname === "/home") return true;
  if (pathname.startsWith("/workouts")) return true;
  if (pathname.startsWith("/coach")) return true;
  if (pathname.startsWith("/profile")) return true;
  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const session = req.cookies.get("gymbuddy.session")?.value;
  if (session) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
