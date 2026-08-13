"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/app/admin/components/AdminConfirmDialog";
import {
  deleteCategory,
  saveCategoriesBulk,
} from "@/app/admin/actions/categories";
import { CLASSICO_TAG_OPTIONS } from "@/lib/category-constants";

function emptyCategory(sortOrder = 0) {
  return {
    id: null,
    slug: "",
    eyebrow: "What we make",
    title: "",
    description: "",
    matchTags: [],
    showOnHome: false,
    isPublished: true,
    sortOrder,
    _key: `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  };
}

function normalizeCategories(list) {
  return (list ?? []).map((c, i) => ({
    id: c.id ?? null,
    slug: c.slug ?? "",
    eyebrow: c.eyebrow ?? "What we make",
    title: c.title ?? "",
    description: c.description ?? "",
    matchTags: Array.isArray(c.matchTags) ? [...c.matchTags] : [],
    showOnHome: Boolean(c.showOnHome),
    isPublished: c.isPublished !== false,
    sortOrder: Number.isFinite(c.sortOrder) ? c.sortOrder : i,
    _key: c.id ?? c._key ?? `row-${i}-${c.slug || "new"}`,
  }));
}

export default function CategoryManager({ siteSlug, initialCategories }) {
  const router = useRouter();
  const confirm = useConfirm();
  const [categories, setCategories] = useState(() =>
    normalizeCategories(initialCategories),
  );
  const [isSaving, startSave] = useTransition();
  const [deletingKey, setDeletingKey] = useState(null);

  useEffect(() => {
    setCategories(normalizeCategories(initialCategories));
  }, [initialCategories]);

  function updateCategory(key, field, value) {
    setCategories((prev) =>
      prev.map((c) => (c._key === key ? { ...c, [field]: value } : c)),
    );
  }

  function reindexSortOrders(list) {
    return list.map((category, index) => ({ ...category, sortOrder: index }));
  }

  function handleMove(key, direction) {
    setCategories((prev) => {
      const sorted = [...prev].sort((a, b) => a.sortOrder - b.sortOrder);
      const index = sorted.findIndex((c) => c._key === key);
      const target = direction === "up" ? index - 1 : index + 1;
      if (index < 0 || target < 0 || target >= sorted.length) return prev;

      const next = [...sorted];
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return reindexSortOrders(next);
    });
  }

  const sortedCategories = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);

  function handleAdd() {
    setCategories((prev) => [
      ...prev,
      emptyCategory(prev.length ? Math.max(...prev.map((c) => c.sortOrder)) + 1 : 0),
    ]);
  }

  async function handleDelete(category) {
    const label = category.title || category.slug || "this category";
    const ok = await confirm({
      title: `Delete "${label}"?`,
      description: "This removes the category section from admin and storefront grouping.",
      confirmLabel: "Delete",
      destructive: true,
    });
    if (!ok) return;

    if (!category.id) {
      setCategories((prev) => prev.filter((c) => c._key !== category._key));
      toast.success("Category removed");
      return;
    }

    setDeletingKey(category._key);
    const fd = new FormData();
    fd.append("id", category.id);
    fd.append("siteSlug", siteSlug);

    try {
      const result = await deleteCategory(fd);
      setCategories((prev) => prev.filter((c) => c._key !== category._key));
      toast.success("Category deleted");
      router.refresh();
    } catch (err) {
      toast.error(err.message ?? "Delete failed");
    } finally {
      setDeletingKey(null);
    }
  }

  function handleSaveAll() {
    for (const c of categories) {
      if (!c.slug?.trim() || !c.title?.trim()) {
        toast.error("Every category needs a slug and title");
        return;
      }
    }

    const payload = [...categories]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(({ _key, ...rest }) => rest);

    startSave(async () => {
      try {
        const result = await saveCategoriesBulk(siteSlug, JSON.stringify(payload));
        toast.success("Categories saved");
        router.refresh();
      } catch (err) {
        toast.error(err.message ?? "Save failed");
      }
    });
  }

  return (
    <div className="admin-category-manager">
      <div className="admin-page-header" style={{ marginBottom: "1rem" }}>
        <div>
          <p className="admin-section-desc" style={{ margin: 0 }}>
            Match product tabs (e.g. Dark, Chips) to homepage and catalog sections. Use ↑↓ to reorder sections on the storefront.
            Suggested tags: {CLASSICO_TAG_OPTIONS.join(", ")}.
          </p>
        </div>
        <div className="admin-actions" style={{ margin: 0 }}>
          <button type="button" className="admin-btn admin-btn-secondary" onClick={handleAdd}>
            + Add category
          </button>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={handleSaveAll}
            disabled={isSaving}
          >
            {isSaving ? "Saving…" : "Save all"}
          </button>
        </div>
      </div>

      {!categories.length ? (
        <div className="admin-empty">
          <h3>No categories yet</h3>
          <p>Add a section to group products by tab on the storefront.</p>
        </div>
      ) : (
        <div className="admin-category-list" style={{ display: "grid", gap: "1rem" }}>
          {sortedCategories.map((category, index) => (
            <article key={category._key} className="admin-card admin-card-padded">
              <div className="admin-form">
                <div className="admin-form-row admin-category-sort-row">
                  <div className="admin-category-sort-controls" aria-label="Category order">
                    <span className="admin-sort-position">#{index + 1}</span>
                    <button
                      type="button"
                      className="admin-btn admin-btn-ghost admin-sort-btn"
                      onClick={() => handleMove(category._key, "up")}
                      disabled={index === 0}
                      aria-label="Move category up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-ghost admin-sort-btn"
                      onClick={() => handleMove(category._key, "down")}
                      disabled={index === sortedCategories.length - 1}
                      aria-label="Move category down"
                    >
                      ↓
                    </button>
                  </div>
                  <label>
                    Sort order
                    <input
                      type="number"
                      value={category.sortOrder}
                      onChange={(e) =>
                        updateCategory(category._key, "sortOrder", Number(e.target.value) || 0)
                      }
                      min={0}
                    />
                  </label>
                </div>
                <div className="admin-form-row">
                  <label>
                    Slug
                    <input
                      type="text"
                      value={category.slug}
                      onChange={(e) => updateCategory(category._key, "slug", e.target.value)}
                      placeholder="compound"
                      required
                    />
                  </label>
                </div>

                <div className="admin-form-row">
                  <label>
                    Eyebrow
                    <input
                      type="text"
                      value={category.eyebrow}
                      onChange={(e) => updateCategory(category._key, "eyebrow", e.target.value)}
                      placeholder="What we make"
                    />
                  </label>
                  <label>
                    Title
                    <input
                      type="text"
                      value={category.title}
                      onChange={(e) => updateCategory(category._key, "title", e.target.value)}
                      placeholder="Classico compound chocolate"
                      required
                    />
                  </label>
                </div>

                <label>
                  Description
                  <textarea
                    value={category.description}
                    onChange={(e) =>
                      updateCategory(category._key, "description", e.target.value)
                    }
                    rows={3}
                  />
                </label>

                <label>
                  Match tags (comma-separated)
                  <input
                    type="text"
                    value={category.matchTags.join(", ")}
                    onChange={(e) =>
                      updateCategory(
                        category._key,
                        "matchTags",
                        e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      )
                    }
                    placeholder="Dark, Milk, White"
                  />
                </label>

                <div className="admin-form-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={category.showOnHome}
                      onChange={(e) =>
                        updateCategory(category._key, "showOnHome", e.target.checked)
                      }
                    />
                    Show on homepage
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={category.isPublished}
                      onChange={(e) =>
                        updateCategory(category._key, "isPublished", e.target.checked)
                      }
                    />
                    Published
                  </label>
                </div>

                <div className="admin-actions">
                  <button
                    type="button"
                    className="admin-btn admin-btn-ghost"
                    onClick={() => handleDelete(category)}
                    disabled={deletingKey === category._key}
                  >
                    {deletingKey === category._key ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
