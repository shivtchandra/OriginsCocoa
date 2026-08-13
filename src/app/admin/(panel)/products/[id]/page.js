import { notFound } from "next/navigation";
import { getAdminProduct } from "@/lib/admin-db";
import { updateProduct } from "@/app/admin/actions/products";
import ProductEditForm from "@/app/admin/components/ProductEditForm";

export default async function AdminProductEditPage({ params }) {
  const { id } = await params;
  const product = await getAdminProduct(id);

  if (!product) notFound();

  const updateWithId = updateProduct.bind(null, id);

  return (
    <div className="admin-card admin-card-padded admin-card-flush">
      <ProductEditForm
        product={product}
        updateProduct={updateWithId}
        siteSlug={product.siteSlug ?? "origins-cocoa"}
        siteDomain={product.siteDomain}
      />
    </div>
  );
}
