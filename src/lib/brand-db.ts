import { createPublicClient } from "@/lib/supabase/public";
import { brand as defaultBrand } from "@/content/brand";
import type { CacaoLot } from "@/content/brand";

export const DEFAULT_SITE_SLUG =
  process.env.NEXT_PUBLIC_SITE_SLUG ?? "origins-cocoa";

function mergeBrandContent(dbContent: Record<string, unknown> | null) {
  if (!dbContent || typeof dbContent !== "object") {
    return structuredClone(defaultBrand);
  }

  return {
    ...defaultBrand,
    ...dbContent,
    company: { ...defaultBrand.company, ...(dbContent.company as object) },
    contact: { ...defaultBrand.contact, ...(dbContent.contact as object) },
    socials: { ...defaultBrand.socials, ...(dbContent.socials as object) },
    wholesale: { ...defaultBrand.wholesale, ...(dbContent.wholesale as object) },
    community: { ...defaultBrand.community, ...(dbContent.community as object) },
    proofStats:
      Array.isArray(dbContent.proofStats) && dbContent.proofStats.length
        ? dbContent.proofStats
        : defaultBrand.proofStats,
    certifications: Array.isArray(dbContent.certifications)
      ? dbContent.certifications
      : defaultBrand.certifications,
    products: Array.isArray(dbContent.products)
      ? dbContent.products
      : defaultBrand.products,
    awards: Array.isArray(dbContent.awards) ? dbContent.awards : defaultBrand.awards,
    press: Array.isArray(dbContent.press) ? dbContent.press : defaultBrand.press,
  };
}

export async function getBrandContent(siteSlug = DEFAULT_SITE_SLUG) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return structuredClone(defaultBrand);
  }

  try {
    const supabase = createPublicClient();
    const { data: site } = await supabase
      .from("sites")
      .select("id")
      .eq("slug", siteSlug)
      .eq("is_active", true)
      .maybeSingle();

    if (!site) return structuredClone(defaultBrand);

    const { data: row } = await supabase
      .from("about_page_content")
      .select("content")
      .eq("site_id", site.id)
      .maybeSingle();

    return mergeBrandContent((row?.content as Record<string, unknown>) ?? null);
  } catch {
    return structuredClone(defaultBrand);
  }
}

export function lotsByCategory(
  products: CacaoLot[],
  category: CacaoLot["category"]
) {
  return products.filter((p) => p.category === category);
}
