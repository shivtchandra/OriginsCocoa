import { getAdminProducts, DEFAULT_SITE_SLUG } from "@/lib/admin-db";
import { getAdminCategories } from "@/lib/admin-categories-db";
import AdminDashboard from "@/app/admin/components/AdminDashboard";

export default async function AdminIndexPage() {
  const [{ site, products }, { categories }] = await Promise.all([
    getAdminProducts(DEFAULT_SITE_SLUG),
    getAdminCategories(DEFAULT_SITE_SLUG),
  ]);

  const published = products.filter((p) => p.isPublished).length;

  const stats = [
    { key: "lots", label: "Cacao lots", value: products.length, tone: "blue", href: "/admin/products" },
    { key: "published", label: "Published", value: published, tone: "green", href: "/admin/products" },
    { key: "categories", label: "Categories", value: categories.length, tone: "amber", href: "/admin/categories" },
  ];

  const links = [
    { label: "Cacao Lots", desc: "Add, edit, publish cacao lots", href: "/admin/products", iconKey: "products" },
    { label: "Categories", desc: "Group lots into storefront sections", href: "/admin/categories", iconKey: "categories" },
    { label: "Our Craft", desc: "Edit the /our-craft page content", href: "/admin/about", iconKey: "about" },
  ];

  return <AdminDashboard siteName={site?.name ?? "Origins Cocoa"} stats={stats} links={links} />;
}
