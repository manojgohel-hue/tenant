// app/api/check-domain/route.js

function checkIfDomainIsInDatabase(domain) {
  // Example - replace with real database lookup
  const allowedDomains = ["manoj.batball.xyz", "devin.batball.xyz","smartadsmanager.com","mybatball.com"];
  return allowedDomains.includes(domain);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  // Query your database
  const allowed = checkIfDomainIsInDatabase(domain);

  if (allowed) {
    return new Response(null, { status: 200 }); // allow Caddy to issue SSL
  } else {
    return new Response(null, { status: 403 }); // deny
  }
}
