"use server";

import { revalidatePath } from "next/cache";
import { revalidateOriginsCatalog } from "@/lib/admin-revalidate";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapCategoryToRow } from "@/lib/admin-categories-db";

async function getSiteIdBySlug(supabase, siteSlug) {
  const { data: site } = await supabase
    .from("sites")
    .select("id")
    .eq("slug", siteSlug)
    .maybeSingle();
  return site?.id ?? null;
}

function parseMatchTags(value) {
  if (Array.isArray(value)) {
    return value.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof value !== "string") return [];
  return value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function parseCategoryFromForm(formData) {
  const id = formData.get("id");
  const siteSlug = formData.get("siteSlug");
  const slug = formData.get("slug");
  const title = formData.get("title");

  if (typeof siteSlug !== "string" || !siteSlug.trim()) {
    throw new Error("Missing site");
  }
  if (typeof slug !== "string" || !slug.trim()) {
    throw new Error("Slug is required");
  }
  if (typeof title !== "string" || !title.trim()) {
    throw new Error("Title is required");
  }

  return {
    siteSlug: siteSlug.trim(),
    category: {
      id: typeof id === "string" && id.trim() ? id.trim() : null,
      slug: slug.trim(),
      eyebrow: String(formData.get("eyebrow") ?? "What we make").trim() || "What we make",
      title: title.trim(),
      description: String(formData.get("description") ?? "").trim() || null,
      matchTags: parseMatchTags(formData.get("match_tags")),
      showOnHome: formData.get("show_on_home") === "on" || formData.get("show_on_home") === "true",
      isPublished:
        formData.get("is_published") === "on" || formData.get("is_published") === "true",
      sortOrder: Number(formData.get("sort_order")) || 0,
    },
  };
}

function revalidateCategoryPaths() {
  revalidatePath("/admin/categories");
  revalidateOriginsCatalog();
  return {};
}

export async function upsertCategory(formData) {
  const { siteSlug, category } = parseCategoryFromForm(formData);
  const supabase = createAdminClient();
  const siteId = await getSiteIdBySlug(supabase, siteSlug);
  if (!siteId) throw new Error("Site not found");

  const row = {
    ...mapCategoryToRow(category),
    site_id: siteId,
  };

  if (category.id) {
    const { error } = await supabase
      .from("product_categories")
      .update(row)
      .eq("id", category.id)
      .eq("site_id", siteId);
    if (error) throw new Error(error.message);
  } else {
    const { id: _omit, ...insertRow } = row;
    const { error } = await supabase.from("product_categories").insert(insertRow);
    if (error) throw new Error(error.message);
  }

  const revalidation = revalidateCategoryPaths();
  return { revalidation };
}

export async function deleteCategory(formData) {
  const id = formData.get("id");
  const siteSlug = formData.get("siteSlug");

  if (typeof id !== "string" || !id.trim()) {
    throw new Error("Missing category id");
  }
  if (typeof siteSlug !== "string" || !siteSlug.trim()) {
    throw new Error("Missing site");
  }

  const supabase = createAdminClient();
  const siteId = await getSiteIdBySlug(supabase, siteSlug.trim());
  if (!siteId) throw new Error("Site not found");

  const { error } = await supabase
    .from("product_categories")
    .delete()
    .eq("id", id.trim())
    .eq("site_id", siteId);

  if (error) throw new Error(error.message);

  const revalidation = revalidateCategoryPaths();
  return { revalidation };
}

export async function saveCategoriesBulk(siteSlug, categoriesJson) {
  if (typeof siteSlug !== "string" || !siteSlug.trim()) {
    throw new Error("Missing site");
  }
  if (typeof categoriesJson !== "string" || !categoriesJson.trim()) {
    throw new Error("Missing categories");
  }

  let categories;
  try {
    categories = JSON.parse(categoriesJson);
  } catch {
    throw new Error("Invalid categories JSON");
  }

  if (!Array.isArray(categories)) {
    throw new Error("Categories must be an array");
  }

  const supabase = createAdminClient();
  const siteId = await getSiteIdBySlug(supabase, siteSlug.trim());
  if (!siteId) throw new Error("Site not found");

  for (const category of categories) {
    if (!category?.slug || !category?.title) {
      throw new Error("Each category needs a slug and title");
    }

    const row = {
      ...mapCategoryToRow({
        id: category.id ?? null,
        slug: String(category.slug).trim(),
        eyebrow: category.eyebrow ?? "What we make",
        title: String(category.title).trim(),
        description: category.description ?? null,
        matchTags: Array.isArray(category.matchTags)
          ? category.matchTags
          : parseMatchTags(category.matchTags ?? category.match_tags ?? ""),
        showOnHome: Boolean(category.showOnHome ?? category.show_on_home),
        isPublished: category.isPublished !== false && category.is_published !== false,
        sortOrder: Number(category.sortOrder ?? category.sort_order) || 0,
      }),
      site_id: siteId,
    };

    if (category.id) {
      const { error } = await supabase
        .from("product_categories")
        .update(row)
        .eq("id", category.id)
        .eq("site_id", siteId);
      if (error) throw new Error(error.message);
    } else {
      const { id: _omit, ...insertRow } = row;
      const { data, error } = await supabase
        .from("product_categories")
        .upsert(insertRow, { onConflict: "site_id,slug" })
        .select("id")
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (data?.id) category.id = data.id;
    }
  }

  const revalidation = revalidateCategoryPaths();
  return { revalidation };
}
