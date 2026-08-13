import { getAdminCategories } from "@/lib/admin-categories-db";
import { DEFAULT_SITE_SLUG } from "@/lib/admin-db";
import CategoryManager from "@/app/admin/components/CategoryManager";

export default async function AdminCategoriesPage() {
  const { site, categories } = await getAdminCategories(DEFAULT_SITE_SLUG);

  if (!site) {
    return (
      <div className="admin-empty">
        <h3>Site not found</h3>
      </div>
    );
  }

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1>Product categories</h1>
          <p>Group storefront lots into {site.name} sections</p>
        </div>
      </div>

      <CategoryManager
        key={site.slug}
        siteSlug={site.slug}
        initialCategories={categories}
      />
    </>
  );
}
