import { getAdminAboutContent } from "@/lib/admin-about-db";
import { DEFAULT_SITE_SLUG } from "@/lib/admin-db";
import AboutEditor from "@/app/admin/components/AboutEditor";

export default async function AdminAboutPage() {
  const { site, content } = await getAdminAboutContent(DEFAULT_SITE_SLUG);

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
          <h1>Our Craft page</h1>
          <p>Edit text and photos for {site.name} — /our-craft</p>
        </div>
      </div>

      <AboutEditor
        key={site.slug}
        siteSlug={site.slug}
        siteId={site.id}
        initialContent={content}
      />
    </>
  );
}
