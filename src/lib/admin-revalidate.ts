import { revalidatePath } from "next/cache";

export function revalidateOriginsCatalog({ productSlug, oldSlug }: { productSlug?: string; oldSlug?: string } = {}) {
  for (const p of ["/", "/products", "/our-craft", "/community", "/connect"]) revalidatePath(p);
  revalidatePath("/products/[slug]", "page");
  if (productSlug) revalidatePath(`/products/${productSlug}`);
  if (oldSlug && oldSlug !== productSlug) revalidatePath(`/products/${oldSlug}`);
}
