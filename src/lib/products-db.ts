import { createPublicClient } from "@/lib/supabase/public";
import type { CacaoLot } from "@/content/brand";
import { DEFAULT_SITE_SLUG } from "@/lib/brand-db";

function mapRowToCacaoLot(row: {
  slug: string;
  label: string;
  specs?: Record<string, unknown> | null;
  photo?: string | null;
}): CacaoLot {
  const specs = row.specs ?? {};
  return {
    slug: row.slug,
    name: row.label,
    category: (specs.category as CacaoLot["category"]) ?? "single-origin",
    origin: (specs.origin as string | null) ?? null,
    farm: (specs.farm as string | null) ?? null,
    variety: (specs.variety as string | null) ?? null,
    fermentationPct: (specs.fermentationPct as number | null) ?? null,
    moisturePct: (specs.moisturePct as number | null) ?? null,
    cutTest: (specs.cutTest as string | null) ?? null,
    beanCountPer100g: (specs.beanCountPer100g as number | null) ?? null,
    harvestDate: (specs.harvestDate as string | null) ?? null,
    tastingNotes: Array.isArray(specs.tastingNotes) ? specs.tastingNotes : [],
    certifications: Array.isArray(specs.certifications) ? specs.certifications : [],
    moq: (specs.moq as string | null) ?? null,
    leadTime: (specs.leadTime as string | null) ?? null,
    packaging: (specs.packaging as string | null) ?? null,
    specSheetUrl: row.photo ?? (specs.specSheetUrl as string | null) ?? null,
  };
}

export async function getCacaoLots(siteSlug = DEFAULT_SITE_SLUG): Promise<CacaoLot[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

  try {
    const supabase = createPublicClient();
    const { data: site } = await supabase
      .from("sites")
      .select("id")
      .eq("slug", siteSlug)
      .eq("is_active", true)
      .maybeSingle();

    if (!site) return [];

    const { data: rows } = await supabase
      .from("products")
      .select("slug, label, photo, specs")
      .eq("site_id", site.id)
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    return (rows ?? []).map(mapRowToCacaoLot);
  } catch {
    return [];
  }
}
