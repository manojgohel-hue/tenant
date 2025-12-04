// middleware.ts
import { NextResponse } from "next/server";

export function proxy(req, res) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  // e.g. blog.example.com → ["blog", "example", "com"]
  const [subdomain] = host.split(".");
  console.log("🚀💡💡💡💡💡=====> ~ proxy ~ subdomain:", subdomain)

  // Ignore localhost with ports, e.g. localhost:3000
  if (host.startsWith("localhost")) {
    return NextResponse.next();
  }

  // Root domain (no subdomain or 'www')
  if (subdomain === "www" || subdomain === "example") {
    return NextResponse.next();
  }

  // Example: multi-tenant routing
  // Attach it as a search param or header so app router can read it
  url.searchParams.set("tenant", subdomain);

  return NextResponse.rewrite(url);
}

// Only run middleware on pages you care about
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
