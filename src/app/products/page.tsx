import type { Metadata } from "next";
import { Products } from "@/components/Products";
import { getBrandContent } from "@/lib/brand-db";
import { getCacaoLots } from "@/lib/products-db";

export const metadata: Metadata = {
  title: "Products — Origins Cocoa",
  description:
    "West Godavari cacao beans — single origin, single farm, creative fermentation, and custom lots for craft chocolate makers.",
};

export default async function ProductsPage() {
  const [brandContent, dbLots] = await Promise.all([
    getBrandContent(),
    getCacaoLots(),
  ]);

  const products = dbLots.length ? dbLots : brandContent.products;

  return (
    <main>
      <Products products={products} />
    </main>
  );
}
