import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["nl", "fr", "en", "es", "de"] as const;
const defaultLocale = "nl";

function hasLocale(pathname: string) {
  return locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Studio nooit via i18n laten lopen
  // (ook handig als iemand /nl/studio intypt)
  const studioLocaleMatch = pathname.match(/^\/(nl|fr|en|es|de)\/studio(\/|$)/);
  if (studioLocaleMatch) {
    const url = req.nextUrl.clone();
    url.pathname = "/studio";
    return NextResponse.redirect(url);
  }

  // ✅ /studio (en alles eronder) volledig met rust laten
  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    return NextResponse.next();
  }

  // ignore next internals + api + assets/files
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

// ✅ BELANGRIJK: studio hier UITSLUITEN
export const config = {
  matcher: ["/((?!_next|api|studio|.*\\..*).*)"],
};