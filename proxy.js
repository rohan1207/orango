import { NextResponse } from "next/server";

const INTRO_COOKIE = "orango_intro";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const seen = request.cookies.get(INTRO_COOKIE)?.value === "1";

  if (!seen && pathname !== "/intro") {
    return NextResponse.redirect(new URL("/intro", request.url));
  }

  if (seen && pathname === "/intro") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
