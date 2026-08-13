"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { resolveStorefrontAssetUrl } from "@/lib/admin-assets";
import AdminDropdown from "@/app/admin/components/AdminDropdown";
import {
  IconLayers,
  IconLayoutList,
  IconPlus,
  IconSearch,
} from "@/app/admin/components/AdminIcons";

const ORIGIN_CATEGORY_LABELS = {
  "single-origin": "Single Origin",
  "single-farm": "Single Farm",
  "creative-fermentation": "Creative Fermentation",
  "custom-fermentation": "Custom Fermentation",
  "cocoa-nibs": "Cocoa Nibs",
  "cocoa-powder": "Cocoa Powder",
  "cocoa-butter": "Cocoa Butter",
};

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

function getGroupKey(product, siteSlug) {
  if (siteSlug === "origins-cocoa") {
    return product.specs?.category || "uncategorized";
  }
  return product.tab?.trim() || "uncategorized";
}

function formatGroupLabel(key, siteSlug) {
  if (key === "uncategorized") return "Uncategorized";
  if (siteSlug === "origins-cocoa") {
    return ORIGIN_CATEGORY_LABELS[key] ?? key.replace(/-/g, " ");
  }
  return key;
}

function ProductRow({ product, siteDomain, siteSlug, categoryLabel }) {
  return (
    <tr>
      <td>
        {product.photo ? (
          <img
            src={resolveStorefrontAssetUrl(product.photo, siteDomain)}
            alt=""
            className="admin-thumb"
          />
        ) : (
          <div className="admin-thumb is-empty">—</div>
        )}
      </td>
      <td>
        <div className="cell-title">{product.label}</div>
        <div className="cell-muted">{product.slug}</div>
      </td>
      <td>
        {siteSlug === "origins-cocoa"
          ? formatGroupLabel(product.specs?.category || "uncategorized", siteSlug)
          : product.tab || "—"}
      </td>
      <td>₹{product.price.toLocaleString("en-IN")}</td>
      <td>
        <span
          className={`admin-badge ${product.is_published ? "is-published" : "is-draft"}`}
        >
          {product.is_published ? "Published" : "Draft"}
        </span>
      </td>
      <td>
        <Link href={`/admin/products/${product.id}`} className="admin-btn admin-btn-ghost">
          Edit
        </Link>
      </td>
    </tr>
  );
}

function ProductTable({ products, siteDomain, siteSlug, categoryLabel, groupLabel }) {
  return (
  <div className="admin-table-wrap">
    {groupLabel ? (
      <div className="admin-catalog-group-header">
        <h3>{groupLabel}</h3>
        <span>{products.length} product{products.length === 1 ? "" : "s"}</span>
      </div>
    ) : null}
    <table className="admin-table">
      <thead>
        <tr>
          <th></th>
          <th>Product</th>
          <th>{categoryLabel}</th>
          <th>Price</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <ProductRow key={p.id} product={p} siteDomain={siteDomain} siteSlug={siteSlug} categoryLabel={categoryLabel} />
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default function ProductCatalog({ products, site, siteSlug }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [grouped, setGrouped] = useState(false);

  const categoryLabel = siteSlug === "origins-cocoa" ? "Lot type" : "Tab";

  const categories = useMemo(() => {
    const keys = new Set(products.map((p) => getGroupKey(p, siteSlug)));
    return Array.from(keys).sort((a, b) => {
      if (a === "uncategorized") return 1;
      if (b === "uncategorized") return -1;
      return formatGroupLabel(a, siteSlug).localeCompare(formatGroupLabel(b, siteSlug));
    });
  }, [products, siteSlug]);

  const categoryOptions = useMemo(
    () => [
      { value: "all", label: `All ${categoryLabel.toLowerCase()}s` },
      ...categories.map((key) => ({
        value: key,
        label: formatGroupLabel(key, siteSlug),
      })),
    ],
    [categories, categoryLabel, siteSlug],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (status === "published" && !p.is_published) return false;
      if (status === "draft" && p.is_published) return false;
      if (category !== "all" && getGroupKey(p, siteSlug) !== category) return false;
      if (!q) return true;
      return (
        p.label.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.tab ?? "").toLowerCase().includes(q)
      );
    });
  }, [products, query, status, category, siteSlug]);

  const groups = useMemo(() => {
    if (!grouped) return null;
    const map = new Map();
    for (const p of filtered) {
      const key = getGroupKey(p, siteSlug);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(p);
    }
    return Array.from(map.entries()).sort(([a], [b]) => {
      if (a === "uncategorized") return 1;
      if (b === "uncategorized") return -1;
      return formatGroupLabel(a, siteSlug).localeCompare(formatGroupLabel(b, siteSlug));
    });
  }, [filtered, grouped, siteSlug]);

  const siteName = site?.name ?? siteSlug;
  const siteDomain = site?.domain;

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1>Products</h1>
          <p>
            Managing catalog for {siteName}
            {products.length ? ` · ${filtered.length} shown` : ""}
          </p>
        </div>
        <Link href="/admin/products/new" className="admin-btn admin-btn-primary">
          <IconPlus />
          Add product
        </Link>
      </div>

      {products.length ? (
        <div className="admin-card admin-catalog">
          <div className="admin-catalog-toolbar">
            <label className="admin-search-field">
              <IconSearch />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                aria-label="Search products"
              />
            </label>

            <div className="admin-catalog-filters">
              <AdminDropdown
                label="Status"
                value={status}
                options={STATUS_OPTIONS}
                onChange={setStatus}
                className="admin-dropdown-compact"
              />
              <AdminDropdown
                label={categoryLabel}
                value={category}
                options={categoryOptions}
                onChange={setCategory}
                className="admin-dropdown-compact"
              />
              <div className="admin-view-toggle" role="group" aria-label="View mode">
                <button
                  type="button"
                  className={`admin-view-toggle-btn${!grouped ? " is-active" : ""}`}
                  onClick={() => setGrouped(false)}
                  title="List view"
                >
                  <IconLayoutList />
                </button>
                <button
                  type="button"
                  className={`admin-view-toggle-btn${grouped ? " is-active" : ""}`}
                  onClick={() => setGrouped(true)}
                  title="Grouped view"
                >
                  <IconLayers />
                </button>
              </div>
            </div>
          </div>

          {filtered.length ? (
            grouped ? (
              <div className="admin-catalog-groups">
                {groups.map(([key, items]) => (
                  <ProductTable
                    key={key}
                    products={items}
                    siteDomain={siteDomain}
                    groupLabel={formatGroupLabel(key, siteSlug)}
                    siteSlug={siteSlug}
                    categoryLabel={categoryLabel}
                  />
                ))}
              </div>
            ) : (
              <ProductTable products={filtered} siteDomain={siteDomain} siteSlug={siteSlug} categoryLabel={categoryLabel} />
            )
          ) : (
            <div className="admin-empty admin-empty-inline">
              <h3>No matches</h3>
              <p>Try a different search or filter.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="admin-card">
          <div className="admin-empty">
            <h3>No products yet</h3>
            <p>Add your first product for {siteName} to show it on the storefront.</p>
            <Link href="/admin/products/new" className="admin-btn admin-btn-primary">
              <IconPlus />
              Add product
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
