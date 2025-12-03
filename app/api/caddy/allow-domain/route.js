// app/api/caddy/allow-domain/route.ts
import { NextRequest } from "next/server";

/**
 * Replace these with real DB calls.
 * Example shape for a tenant domain record.
 */

const fakeTenantDomains = [
  {
    tenantSlug: "manoj",
    customDomain: "manoj.nopass.xyz",
    status: "active",
  },
  {
    tenantSlug: "devin",
    customDomain: "devin.nopass.xyz",
    status: "active",
  },
];

// Your platform domain, must match PLATFORM_DOMAIN in the shell script
const PLATFORM_DOMAIN = "nopass.xyz";

function findCustomDomain(domain){
  return fakeTenantDomains.find(
    (d) =>
      d.customDomain.toLowerCase() === domain.toLowerCase() &&
      d.status === "active"
  );
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return new Response("missing domain", { status: 400 });
  }

  // 1) Allow your main domain and subdomains always
  if (
    domain === PLATFORM_DOMAIN ||
    domain === `www.${PLATFORM_DOMAIN}` ||
    domain.endsWith(`.${PLATFORM_DOMAIN}`)
  ) {
    return new Response("ok", { status: 200 });
  }

  // 2) Allow any custom domain that is active in your DB
  const record = findCustomDomain(domain);

  if (record) {
    return new Response("ok", { status: 200 });
  }

  // 3) Deny certificate for unknown domains
  return new Response("not allowed", { status: 403 });
}
