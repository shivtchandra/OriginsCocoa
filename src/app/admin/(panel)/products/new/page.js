import { DEFAULT_SITE_SLUG } from "@/lib/admin-db";
import { createProduct } from "@/app/admin/actions/products";
import ProductEditForm from "@/app/admin/components/ProductEditForm";

export default async function AdminNewProductPage() {
  const product = {
    key: "",
    label: "",
    meta: "",
    note: "",
    photo: "",
    photoClass: "",
    artKey: "",
    ctaLabel: "",
    index: "",
    isPublished: false,
    commerce: { price: 0, mrp: 0, badges: [] },
    specs: { category: "single-origin" },
  };

  const createForSite = createProduct.bind(null, DEFAULT_SITE_SLUG);

  return (
    <div className="admin-card admin-card-padded admin-card-flush">
      <ProductEditForm
        product={product}
        createProduct={createForSite}
        siteSlug={DEFAULT_SITE_SLUG}
        isNew
      />
    </div>
  );
}
