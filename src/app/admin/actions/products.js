"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidateOriginsCatalog } from "@/lib/admin-revalidate";

function buildProductPayload(formData) {
  const label = formData.get("label");
  const slug = formData.get("slug");
  const note = formData.get("note");
  const meta = formData.get("meta");
  const ctaLabel = formData.get("cta_label");
  const photo = formData.get("photo");
  const photoClass = formData.get("photo_class");
  const artKey = formData.get("art_key");
  const sortIndex = formData.get("sort_index");
  const price = Number(formData.get("price"));
  const mrp = Number(formData.get("mrp"));
  const isPublished = formData.get("is_published") === "on";
  const specsOrigin = formData.get("specs_origin");
  const specsFarm = formData.get("specs_farm");
  const specsVariety = formData.get("specs_variety");
  const specsCategory = formData.get("specs_category");
  const specsFermentation = formData.get("specs_fermentation_pct");
  const specsMoisture = formData.get("specs_moisture_pct");
  const specsCutTest = formData.get("specs_cut_test");
  const specsBeanCount = formData.get("specs_bean_count");
  const specsHarvestDate = formData.get("specs_harvest_date");
  const specsMoq = formData.get("specs_moq");
  const specsLeadTime = formData.get("specs_lead_time");
  const specsPackaging = formData.get("specs_packaging");
  const specsSpecSheetUrl = formData.get("specs_spec_sheet_url");
  const specsTastingNotes = formData.get("specs_tasting_notes");

  if (typeof label !== "string" || !label.trim()) {
    throw new Error("Label is required");
  }
  if (typeof slug !== "string" || !slug.trim()) {
    throw new Error("Slug is required");
  }

  const trimmedSlug = slug.trim();

  const payload = {
    label: label.trim(),
    slug: trimmedSlug,
    note: typeof note === "string" ? note.trim() : null,
    meta: typeof meta === "string" ? meta.trim() : null,
    cta_label: typeof ctaLabel === "string" ? ctaLabel.trim() : null,
    photo: typeof photo === "string" && photo.trim() ? photo.trim() : null,
    photo_class:
      typeof photoClass === "string" && photoClass.trim() ? photoClass.trim() : null,
    art_key:
      typeof artKey === "string" && artKey.trim() ? artKey.trim() : trimmedSlug,
    sort_index:
      typeof sortIndex === "string" && sortIndex.trim() ? sortIndex.trim() : null,
    price: Number.isFinite(price) ? price : 0,
    mrp: Number.isFinite(mrp) ? mrp : 0,
    is_published: isPublished,
    specs: {
      category: typeof specsCategory === "string" && specsCategory.trim() ? specsCategory.trim() : "single-origin",
      origin: typeof specsOrigin === "string" && specsOrigin.trim() ? specsOrigin.trim() : null,
      farm: typeof specsFarm === "string" && specsFarm.trim() ? specsFarm.trim() : null,
      variety: typeof specsVariety === "string" && specsVariety.trim() ? specsVariety.trim() : null,
      fermentationPct:
        typeof specsFermentation === "string" && specsFermentation.trim()
          ? Number(specsFermentation)
          : null,
      moisturePct:
        typeof specsMoisture === "string" && specsMoisture.trim() ? Number(specsMoisture) : null,
      cutTest: typeof specsCutTest === "string" && specsCutTest.trim() ? specsCutTest.trim() : null,
      beanCountPer100g:
        typeof specsBeanCount === "string" && specsBeanCount.trim() ? Number(specsBeanCount) : null,
      harvestDate:
        typeof specsHarvestDate === "string" && specsHarvestDate.trim()
          ? specsHarvestDate.trim()
          : null,
      moq: typeof specsMoq === "string" && specsMoq.trim() ? specsMoq.trim() : null,
      leadTime: typeof specsLeadTime === "string" && specsLeadTime.trim() ? specsLeadTime.trim() : null,
      packaging:
        typeof specsPackaging === "string" && specsPackaging.trim() ? specsPackaging.trim() : null,
      specSheetUrl:
        typeof specsSpecSheetUrl === "string" && specsSpecSheetUrl.trim()
          ? specsSpecSheetUrl.trim()
          : null,
      tastingNotes:
        typeof specsTastingNotes === "string" && specsTastingNotes.trim()
          ? specsTastingNotes.split(",").map((n) => n.trim()).filter(Boolean)
          : [],
    },
  };

  return payload;
}

export async function uploadProductImage(formData) {
  const file = formData.get("file");
  const productId = formData.get("productId");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file selected");
  }
  if (typeof productId !== "string" || !productId) {
    throw new Error("Missing product ID");
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    throw new Error("Use JPG, PNG, WebP, or GIF");
  }

  const supabase = createAdminClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${productId}/${Date.now()}.${ext}`;

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

export async function updateProduct(productId, formData) {
  const updatePayload = buildProductPayload(formData);

  const supabase = createAdminClient();

  const { data: existing, error: fetchError } = await supabase
    .from("products")
    .select("slug")
    .eq("id", productId)
    .maybeSingle();

  if (fetchError || !existing) {
    throw new Error(fetchError?.message ?? "Product not found");
  }

  const oldSlug = existing.slug;
  const newSlug = updatePayload.slug;

  const { error } = await supabase
    .from("products")
    .update(updatePayload)
    .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);

  revalidateOriginsCatalog({ productSlug: newSlug, oldSlug });

  return {};
}

function formatProductError(message) {
  if (message?.includes("products_site_id_slug_key") || message?.includes("duplicate key")) {
    return "A product with this slug already exists for this site.";
  }
  return message;
}

export async function createProduct(siteSlug, formData) {
  const productId = formData.get("product_id");
  const payload = buildProductPayload(formData);

  if (typeof productId !== "string" || !productId.trim()) {
    throw new Error("Missing product ID");
  }

  const supabase = createAdminClient();

  const { data: site, error: siteError } = await supabase
    .from("sites")
    .select("id, slug")
    .eq("slug", siteSlug)
    .maybeSingle();

  if (siteError || !site) {
    throw new Error(siteError?.message ?? "Site not found");
  }

  const { data: lastProduct } = await supabase
    .from("products")
    .select("sort_order")
    .eq("site_id", site.id)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const sortOrder = (lastProduct?.sort_order ?? -1) + 1;

  const { data: created, error } = await supabase
    .from("products")
    .insert({
      id: productId.trim(),
      site_id: site.id,
      sort_order: sortOrder,
      ...payload,
    })
    .select("id, slug")
    .single();

  if (error) {
    throw new Error(formatProductError(error.message));
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${created.id}`);

  revalidateOriginsCatalog({ productSlug: created.slug });

  return { id: created.id };
}
