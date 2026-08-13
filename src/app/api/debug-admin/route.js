import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { DEFAULT_SITE_SLUG } from "@/lib/brand-db";

export async function GET() {
  const out = { DEFAULT_SITE_SLUG, hasSecret: !!process.env.SUPABASE_SECRET_KEY };

  const supabase = await createClient();
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  out.user = user ? { id: user.id, email: user.email } : null;
  out.userErr = userErr?.message ?? null;

  if (!user) {
    out.result = "no user (not logged in from server's view)";
    return NextResponse.json(out);
  }

  const { data: roles, error: rolesErr } = await supabase
    .from("user_site_roles")
    .select("role, sites (id, slug, name, domain)")
    .eq("user_id", user.id);
  out.rolesRaw = roles;
  out.rolesErr = rolesErr?.message ?? null;

  const matched = (roles ?? []).filter((r) => r.sites?.slug === DEFAULT_SITE_SLUG);
  out.matchedFromRoles = matched;

  if (matched.length) {
    out.result = "would succeed via roles branch";
    return NextResponse.json(out);
  }

  if (!process.env.SUPABASE_SECRET_KEY) {
    out.result = "FAIL: no SUPABASE_SECRET_KEY, fallback skipped";
    return NextResponse.json(out);
  }

  const admin = createAdminClient();
  const { data: site, error: siteErr } = await admin
    .from("sites")
    .select("id, slug, name, domain")
    .eq("slug", DEFAULT_SITE_SLUG)
    .maybeSingle();
  out.fallbackSite = site;
  out.fallbackErr = siteErr?.message ?? null;
  out.result = site ? "would succeed via fallback branch" : "FAIL: fallback site not found";

  return NextResponse.json(out);
}
