import type { Metadata } from "next";
import { Products } from "@/components/Products";

export const metadata: Metadata = {
  title: "Products — Origins Cocoa",
  description:
    "West Godavari cacao beans — single origin, single farm, creative fermentation, and custom lots for craft chocolate makers.",
};

export default function ProductsPage() {
  return (
    <main>
      <Products />
    </main>
  );
}
