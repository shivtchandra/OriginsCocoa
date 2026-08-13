import { createAdminClient } from "@/lib/supabase/admin";
import { DEFAULT_SITE_SLUG } from "@/lib/brand-db";

export function mapRowToCategory(row: any) {
  return {
    id: row.id ?? null,
    slug: row.slug ?? "",
    eyebrow: row.eyebrow ?? "What we make",
    title: row.title ?? "",
    description: row.description ?? "",
    matchTags: Array.isArray(row.match_tags) ? row.match_tags : [],
    showOnHome: row.show_on_home ?? false,
    isPublished: row.is_published ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}

export function mapCategoryToRow(category: any) {
  return {
    ...(category.id ? { id: category.id } : {}),
    slug: category.slug,
    eyebrow: category.eyebrow ?? "What we make",
    title: category.title,
    description: category.description ?? null,
    match_tags: Array.isArray(category.matchTags) ? category.matchTags : [],
    show_on_home: Boolean(category.showOnHome),
    is_published: category.isPublished !== false,
    sort_order: Number(category.sortOrder) || 0,
  };
}

export function getDefaultCategories(_siteSlug: string = DEFAULT_SITE_SLUG) {
  return [];
}

export async function getAdminCategories(siteSlug: string = DEFAULT_SITE_SLUG) {
  if (!process.env.SUPABASE_SECRET_KEY) {
    return { site: null, categories: getDefaultCategories(siteSlug) };
  }

  const supabase = createAdminClient();

  const { data: site } = await supabase
    .from("sites")
    .select("id, slug, name, domain")
    .eq("slug", siteSlug)
    .maybeSingle();

  if (!site) return { site: null, categories: getDefaultCategories(siteSlug) };

  const { data: rows, error } = await supabase
    .from("product_categories")
    .select(
      "id, slug, eyebrow, title, description, match_tags, show_on_home, is_published, sort_order, updated_at",
    )
    .eq("site_id", site.id)
    .order("sort_order", { ascending: true });

  if (error) {
    console.warn("[admin-categories-db] getAdminCategories:", error.message);
    return { site, categories: getDefaultCategories(siteSlug) };
  }

  if (!rows?.length) {
    return { site, categories: getDefaultCategories(siteSlug) };
  }

  return { site, categories: rows.map(mapRowToCategory) };
}
