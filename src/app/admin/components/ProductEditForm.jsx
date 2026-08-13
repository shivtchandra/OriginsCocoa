"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resolveStorefrontAssetUrl } from "@/lib/admin-assets";
import { ACCENT_VARS } from "@/lib/products-constants";
import { uploadProductImage } from "@/app/admin/actions/products";
import AdminDropdown from "@/app/admin/components/AdminDropdown";
import { CLASSICO_TAG_OPTIONS } from "@/lib/category-constants";

const PHOTO_CLASSES = [
  { value: "", label: "Default" },
  { value: "is-jar", label: "Jar crop" },
  { value: "is-tub", label: "Tub crop" },
  { value: "is-range", label: "Range / hero" },
  { value: "is-cocoa", label: "Cocoa tin" },
];

const ACCENT_OPTIONS = Object.keys(ACCENT_VARS).map((a) => ({ value: a, label: a }));

const BASE_TABS = [
  { id: "basics", label: "Basics" },
  { id: "pricing", label: "Pricing" },
  { id: "media", label: "Media" },
  { id: "copy", label: "Copy" },
];

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProductEditForm({
  product,
  updateProduct,
  createProduct,
  siteSlug,
  siteDomain,
  isNew = false,
}) {
  const router = useRouter();
  const [productId] = useState(() => product.id ?? crypto.randomUUID());
  const [activeTab, setActiveTab] = useState("basics");
  const [label, setLabel] = useState(product.label ?? "");
  const [slug, setSlug] = useState(product.key ?? "");
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [tab, setTab] = useState(product.tab ?? "");
  const [accent, setAccent] = useState(product.accent ?? "hazelnut");
  const [photoClass, setPhotoClass] = useState(product.photoClass ?? "");
  const [photo, setPhoto] = useState(product.photo ?? "");
  const [artKey, setArtKey] = useState(product.artKey ?? product.key ?? "spread");
  const [badges, setBadges] = useState(product.commerce?.badges ?? []);
  const [isPublished, setIsPublished] = useState(Boolean(product.isPublished));
  const [isUploading, startUpload] = useTransition();
  const [isSaving, startSave] = useTransition();

  const tabs = BASE_TABS;

  const tabOptions = [
    { value: "", label: "Select tab" },
    ...CLASSICO_TAG_OPTIONS.map((tag) => ({ value: tag, label: tag })),
    ...(product.tab && !CLASSICO_TAG_OPTIONS.includes(product.tab)
      ? [{ value: product.tab, label: product.tab }]
      : []),
  ];

  useEffect(() => {
    if (!isNew || slugTouched) return;
    setSlug(slugify(label));
  }, [label, isNew, slugTouched]);

  function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("productId", productId);

    startUpload(async () => {
      try {
        const url = await uploadProductImage(fd);
        setPhoto(url);
        toast.success("Image uploaded");
      } catch (err) {
        toast.error(err.message ?? "Upload failed");
      }
    });

    e.target.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startSave(async () => {
      try {
        if (isNew) {
          const result = await createProduct(siteSlug, fd);
          const id = result?.id ?? result;
          toast.success("Product created");
          router.push(`/admin/products/${id}`);
        } else {
          const result = await updateProduct(fd);
          toast.success("Product saved");
          router.push("/admin/products");
        }
        router.refresh();
      } catch (err) {
        toast.error(err.message ?? (isNew ? "Create failed" : "Save failed"));
      }
    });
  }

  const displayName = label.trim() || (isNew ? "New product" : "Untitled product");

  return (
    <form className="admin-edit-form admin-edit-form-tabbed" onSubmit={handleSubmit}>
      {isNew ? <input type="hidden" name="product_id" value={productId} /> : null}
      <input type="hidden" name="photo" value={photo} />
      <input type="hidden" name="art_key" value={artKey} />
      <input type="hidden" name="badges" value={badges.join(", ")} />
      <input type="hidden" name="tab" value={tab} />
      <input type="hidden" name="accent" value={accent} />
      <input type="hidden" name="photo_class" value={photoClass} />
      {isPublished ? <input type="hidden" name="is_published" value="on" /> : null}

      <div className="admin-form-sticky">
        <div className="admin-form-sticky-inner">
          <div className="admin-form-sticky-title">
            <Link href="/admin/products" className="admin-back-link is-inline">
              ← Back
            </Link>
            <div>
              <h2>{displayName}</h2>
              <p>{isNew ? "Create a new catalog item" : "Edit product details"}</p>
            </div>
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={isSaving}>
            {isSaving ? (isNew ? "Creating…" : "Saving…") : isNew ? "Create product" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="admin-tabs" role="tablist" aria-label="Product sections">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={activeTab === t.id}
            className={`admin-tab${activeTab === t.id ? " is-active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="admin-form-panel">
        <div
          className={`admin-tab-panel${activeTab === "basics" ? " is-active" : ""}`}
          role="tabpanel"
          hidden={activeTab !== "basics"}
        >
          <div className="admin-form">
            <label>
              Label <span className="admin-required">*</span>
              <input
                type="text"
                name="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </label>
            <label>
              Slug <span className="admin-required">*</span>
              <input
                type="text"
                name="slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                required
              />
              <span className="admin-field-hint">Storefront URL: /product/{slug || "…"}</span>
            </label>
            <AdminDropdown
              label="Tab"
              value={tab}
              options={tabOptions}
              onChange={setTab}
            />
            <label className="checkbox-label admin-checkbox-card">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              Published on storefront
            </label>
          </div>
        </div>

        <div
          className={`admin-tab-panel${activeTab === "pricing" ? " is-active" : ""}`}
          role="tabpanel"
          hidden={activeTab !== "pricing"}
        >
          <div className="admin-form">
            <div className="admin-form-row">
              <label>
                Price (₹)
                <input
                  type="number"
                  name="price"
                  defaultValue={product.commerce?.price ?? 0}
                  min={0}
                />
              </label>
              <label>
                MRP (₹)
                <input
                  type="number"
                  name="mrp"
                  defaultValue={product.commerce?.mrp ?? 0}
                  min={0}
                />
              </label>
            </div>
          </div>
        </div>

        <div
          className={`admin-tab-panel${activeTab === "media" ? " is-active" : ""}`}
          role="tabpanel"
          hidden={activeTab !== "media"}
        >
          <div className="admin-form admin-form-media">
            <div className={`admin-photo-preview${photo ? "" : " is-empty"}`}>
              {photo ? (
                <img
                  src={resolveStorefrontAssetUrl(photo, siteDomain) ?? photo}
                  alt={displayName}
                />
              ) : (
                <span>No photo — uses illustration fallback</span>
              )}
            </div>

            <label className="admin-upload-zone">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleUpload}
                disabled={isUploading}
              />
              <span>{isUploading ? "Uploading…" : "Upload image"}</span>
            </label>

            <label>
              Image URL
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="/images/products/…"
              />
            </label>

            <AdminDropdown
              label="Photo crop class"
              value={photoClass}
              options={PHOTO_CLASSES}
              onChange={setPhotoClass}
            />

            <label>
              Trust badges (comma-separated)
              <input
                type="text"
                value={badges.join(", ")}
                onChange={(e) =>
                  setBadges(
                    e.target.value
                      .split(",")
                      .map((b) => b.trim())
                      .filter(Boolean),
                  )
                }
                placeholder="Bestseller, New"
              />
            </label>
          </div>
        </div>

        <div
          className={`admin-tab-panel${activeTab === "copy" ? " is-active" : ""}`}
          role="tabpanel"
          hidden={activeTab !== "copy"}
        >
          <div className="admin-form">
            <label>
              Net weight / meta
              <input
                type="text"
                name="meta"
                defaultValue={product.meta ?? ""}
                placeholder="500g"
              />
            </label>
            <label>
              Note (short description)
              <textarea name="note" defaultValue={product.note ?? ""} rows={4} />
            </label>
            <label>
              Lineup quote
              <input type="text" name="line" defaultValue={product.line ?? ""} />
            </label>
            <label>
              Dollop quip
              <input type="text" name="quip" defaultValue={product.quip ?? ""} />
            </label>
            <div className="admin-form-row">
              <label>
                CTA label
                <input type="text" name="cta_label" defaultValue={product.ctaLabel ?? ""} />
              </label>
              <label>
                Sort index
                <input
                  type="text"
                  name="sort_index"
                  defaultValue={product.index ?? ""}
                  placeholder="01"
                />
              </label>
            </div>
            <AdminDropdown
              label="Accent colour"
              value={accent}
              options={ACCENT_OPTIONS}
              onChange={setAccent}
            />
          </div>
        </div>

      </div>
    </form>
  );
}
