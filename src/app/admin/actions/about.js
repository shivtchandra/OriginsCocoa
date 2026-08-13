"use server";

import { revalidatePath } from "next/cache";
import { revalidateOriginsCatalog } from "@/lib/admin-revalidate";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDefaultAboutContent } from "@/lib/about-db";

async function getSiteIdBySlug(supabase, siteSlug) {
  const { data: site } = await supabase
    .from("sites")
    .select("id")
    .eq("slug", siteSlug)
    .maybeSingle();
  return site?.id ?? null;
}

export async function uploadAboutImage(formData) {
  const file = formData.get("file");
  const siteId = formData.get("siteId");
  const slot = formData.get("slot");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file selected");
  }
  if (typeof siteId !== "string" || !siteId) {
    throw new Error("Missing site ID");
  }
  if (typeof slot !== "string" || !slot) {
    throw new Error("Missing image slot");
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    throw new Error("Use JPG, PNG, WebP, or GIF");
  }

  const supabase = createAdminClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${siteId}/about/${slot}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(
      uploadError.message.includes("Bucket not found")
        ? "Storage bucket missing — run supabase/migrations/002_product_images_storage.sql"
        : uploadError.message
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(path);

  return publicUrl;
}

export async function updateAboutContent(siteSlug, contentJson) {
  if (typeof contentJson !== "string" || !contentJson.trim()) {
    throw new Error("Missing content");
  }

  let content;
  try {
    content = JSON.parse(contentJson);
  } catch {
    throw new Error("Invalid content JSON");
  }

  const supabase = createAdminClient();
  const siteId = await getSiteIdBySlug(supabase, siteSlug);
  if (!siteId) throw new Error("Site not found");

  const { data: existing } = await supabase
    .from("about_page_content")
    .select("id")
    .eq("site_id", siteId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("about_page_content")
      .update({ content })
      .eq("site_id", siteId);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("about_page_content")
      .insert({ site_id: siteId, content });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/about");
  revalidateOriginsCatalog();
  return {};
}

export async function resetAboutContent(siteSlug) {
  const supabase = createAdminClient();
  const siteId = await getSiteIdBySlug(supabase, siteSlug);
  if (!siteId) throw new Error("Site not found");

  const { data: existing } = await supabase
    .from("about_page_content")
    .select("id")
    .eq("site_id", siteId)
    .maybeSingle();

  const content = getDefaultAboutContent(siteSlug);

  if (existing) {
    const { error } = await supabase
      .from("about_page_content")
      .update({ content })
      .eq("site_id", siteId);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("about_page_content")
      .insert({ site_id: siteId, content });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/about");
  revalidateOriginsCatalog();
  return {};
}
