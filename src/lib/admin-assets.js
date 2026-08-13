/** Resolve product/about image URLs for admin previews (same-origin storefront). */
export function resolveStorefrontAssetUrl(url, domain) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : domain
        ? domain.startsWith("http")
          ? domain.replace(/\/$/, "")
          : `https://${domain.replace(/\/$/, "")}`
        : "";

  if (!base) return url.startsWith("/") ? url : `/${url}`;
  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}
