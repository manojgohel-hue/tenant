// app/api/caddy/allow-domain/route.ts

/**
 * Replace these with real DB calls.
 * Example shape for a tenant domain record.
 */

const fakeTenantDomains = [
  {
    tenantSlug: "manoj",
    customDomain: "manoj.batball.xyz",
    status: "active",
  },
  {
    tenantSlug: "devin",
    customDomain: "devin.batball.xyz",
    status: "active",
  },
];

// Your platform domain, must match PLATFORM_DOMAIN in the shell script
const PLATFORM_DOMAIN = "batball.xyz";

function findCustomDomain(domain){
  return fakeTenantDomains.find(
    (d) =>
      d.customDomain.toLowerCase() === domain.toLowerCase() &&
      d.status === "active"
  );
}

export async function GET(req) {
  // Try to get domain from Host header first (most common case)
  const host = req.headers.get("host") || "";

  // Remove port if present (e.g., "example.com:3000" -> "example.com")
  const domain = host.split(":")[0];
  console.log("🚀💡💡💡💡💡=====> ~ GET ~ domain:", domain)

  // Fallback: check query parameter if Host header doesn't have it
  // (useful if Caddy calls this endpoint with domain as query param)
  const domainFromQuery = new URL(req.url).searchParams.get("domain");
  const finalDomain = domain || domainFromQuery;

  if (!finalDomain) {
    return new Response("missing domain", { status: 400 });
  }

  // 1) Allow your main domain and subdomains always
  if (
    finalDomain === PLATFORM_DOMAIN ||
    finalDomain === `www.${PLATFORM_DOMAIN}` ||
    finalDomain.endsWith(`.${PLATFORM_DOMAIN}`)
  ) {
    return new Response("ok", { status: 200 });
  }

  // 2) Allow any custom domain that is active in your DB
  const record = findCustomDomain(finalDomain);

  if (record) {
    return new Response("ok", { status: 200 });
  }

  // 3) Deny certificate for unknown domains
  return new Response("not allowed", { status: 403 });
}
