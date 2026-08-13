import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { DEFAULT_SITE_SLUG } from "@/lib/brand-db";

export { DEFAULT_SITE_SLUG };

function mapRowToLot(row: any) {
  const specs = row.specs ?? {};
  return {
    id: row.id,
    key: row.slug,
    index: row.sort_index ?? row.sort_order,
    label: row.label,
    meta: row.meta,
    note: row.note,
    photo: row.photo,
    photoClass: row.photo_class,
    artKey: row.art_key || row.slug,
    ctaLabel: row.cta_label,
    isPublished: row.is_published,
    specs: {
      category: specs.category ?? "single-origin",
      origin: specs.origin ?? null,
      farm: specs.farm ?? null,
      variety: specs.variety ?? null,
      fermentationPct: specs.fermentationPct ?? null,
      moisturePct: specs.moisturePct ?? null,
      cutTest: specs.cutTest ?? null,
      beanCountPer100g: specs.beanCountPer100g ?? null,
      harvestDate: specs.harvestDate ?? null,
      tastingNotes: Array.isArray(specs.tastingNotes) ? specs.tastingNotes : [],
      certifications: Array.isArray(specs.certifications) ? specs.certifications : [],
      moq: specs.moq ?? null,
      leadTime: specs.leadTime ?? null,
      packaging: specs.packaging ?? null,
      specSheetUrl: specs.specSheetUrl ?? row.photo ?? null,
    },
  };
}

export async function getAdminProducts(siteSlug: string = DEFAULT_SITE_SLUG) {
  if (!process.env.SUPABASE_SECRET_KEY) return { site: null, products: [] };

  const supabase = createAdminClient();

  const { data: site } = await supabase
    .from("sites")
    .select("id, slug, name, domain")
    .eq("slug", siteSlug)
    .maybeSingle();

  if (!site) return { site: null, products: [] };

  const { data: products } = await supabase
    .from("products")
    .select("id, slug, label, price, mrp, photo, is_published, sort_order, updated_at, specs")
    .eq("site_id", site.id)
    .order("sort_order", { ascending: true });

  return { site, products: (products ?? []).map(mapRowToLot) };
}

export async function getAdminProduct(productId: string) {
  if (!process.env.SUPABASE_SECRET_KEY) return null;

  const supabase = createAdminClient();

  const { data: row } = await supabase
    .from("products")
    .select("*, sites (slug, name, domain)")
    .eq("id", productId)
    .maybeSingle();

  if (!row) return null;

  return {
    ...mapRowToLot(row),
    siteSlug: row.sites?.slug,
    siteName: row.sites?.name,
    siteDomain: row.sites?.domain,
    isPublished: row.is_published,
  };
}

export async function getUserSites() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: roles } = await supabase
    .from("user_site_roles")
    .select("role, sites (id, slug, name, domain)")
    .eq("user_id", user.id);

  const sites = (roles ?? [])
    .filter((r: any) => r.sites?.slug === DEFAULT_SITE_SLUG)
    .map((r: any) => ({
      role: r.role,
      id: r.sites.id,
      slug: r.sites.slug,
      name: r.sites.name,
      domain: r.sites.domain,
    }));

  if (sites.length) return sites;

  if (!process.env.SUPABASE_SECRET_KEY) return [];

  const admin = createAdminClient();
  const { data: site } = await admin
    .from("sites")
    .select("id, slug, name, domain")
    .eq("slug", DEFAULT_SITE_SLUG)
    .maybeSingle();

  return site ? [{ role: "admin", ...site }] : [];
}
