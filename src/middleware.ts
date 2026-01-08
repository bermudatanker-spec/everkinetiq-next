import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["nl", "fr", "en", "es", "de"] as const;
const defaultLocale = "nl";

function hasLocale(pathname: string) {
  return locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ignore next internals
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // already has locale
  if (hasLocale(pathname)) return NextResponse.next();

  // redirect /... -> /nl/...
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};