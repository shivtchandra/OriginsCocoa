import { createAdminClient } from "@/lib/supabase/admin";
import { getDefaultAboutContent, type AboutContent } from "@/lib/about-db";
import { DEFAULT_SITE_SLUG } from "@/lib/brand-db";

function mergeAboutContent(dbContent: Partial<AboutContent> | null | undefined, siteSlug: string): AboutContent {
  const defaults = getDefaultAboutContent(siteSlug);
  if (!dbContent || typeof dbContent !== "object" || Object.keys(dbContent).length === 0) {
    return structuredClone(defaults);
  }
  const content: Partial<AboutContent> = dbContent;
  return {
    hero: { ...defaults.hero, ...content.hero },
    origin: { ...defaults.origin, ...content.origin },
    process: {
      ...defaults.process,
      ...content.process,
      steps: content.process?.steps?.length ? content.process.steps : defaults.process.steps,
    },
    values: {
      ...defaults.values,
      ...content.values,
      items: content.values?.items?.length ? content.values.items : defaults.values.items,
    },
    places: {
      ...defaults.places,
      ...content.places,
      items: content.places?.items?.length ? content.places.items : defaults.places.items,
    },
    banter: { ...defaults.banter, ...content.banter },
    cta: { ...defaults.cta, ...content.cta },
  };
}

export async function getAdminAboutContent(siteSlug: string = DEFAULT_SITE_SLUG) {
  if (!process.env.SUPABASE_SECRET_KEY) {
    return { site: null, content: mergeAboutContent(null, siteSlug) };
  }

  const supabase = createAdminClient();

  const { data: site } = await supabase
    .from("sites")
    .select("id, slug, name, domain")
    .eq("slug", siteSlug)
    .maybeSingle();

  if (!site) return { site: null, content: mergeAboutContent(null, siteSlug) };

  const { data: row } = await supabase
    .from("about_page_content")
    .select("content")
    .eq("site_id", site.id)
    .maybeSingle();

  return { site, content: mergeAboutContent((row?.content as Partial<AboutContent>) ?? null, siteSlug) };
}
