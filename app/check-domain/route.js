import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "Missing domain query parameter" }, { status: 400 });
  }

  const allowed = checkIfDomainIsInDatabase(domain);

  if (!allowed) {
    return NextResponse.json({ allowed: false }, { status: 403 });
  }

  return NextResponse.json({ allowed: true });
}

function checkIfDomainIsInDatabase(domain) {
  // Replace with a real database lookup
  const allowedDomains = ["manoj.batball.xyz", "devin.batball.xyz", "smartadsmanager.com"];
  return allowedDomains.includes(domain.toLowerCase());
}
