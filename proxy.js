// middleware.ts
import { NextResponse } from "next/server";

const PLATFORM_DOMAIN = "batball.xyz";

export function proxy(req) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const pathname = url.pathname;

  // Ignore allow-domain API
  if (pathname.startsWith("/api/caddy/allow-domain")) {
    return NextResponse.next();
  }

  // Root domain
  if (host === PLATFORM_DOMAIN || host === `www.${PLATFORM_DOMAIN}`) {
    return NextResponse.next();
  }

  // Subdomain tenant: manoj.batball.xyz → tenant=manoj
  if (host.endsWith(`.${PLATFORM_DOMAIN}`)) {
    const sub = host.split(".")[0];
    url.searchParams.set("tenant", sub);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
