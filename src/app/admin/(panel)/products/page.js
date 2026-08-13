import { getAdminProducts, DEFAULT_SITE_SLUG } from "@/lib/admin-db";
import ProductCatalog from "@/app/admin/components/ProductCatalog";

export default async function AdminProductsPage() {
  const { site, products } = await getAdminProducts(DEFAULT_SITE_SLUG);

  return (
    <ProductCatalog
      products={products}
      site={site}
      siteSlug={DEFAULT_SITE_SLUG}
    />
  );
}
