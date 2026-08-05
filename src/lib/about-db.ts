import { createPublicClient } from "@/lib/supabase/public";
export const DEFAULT_SITE_SLUG =
  process.env.NEXT_PUBLIC_SITE_SLUG ?? "origins-cocoa";

/** Zoops /about — gifting label story */
export const DEFAULT_ABOUT_ZOOPS = {
  hero: {
    headline: "Chocolate with the nerve to be shared",
    subtext:
      "Zoops is the gifting label of Provica — two generations of estate cocoa, stone-ground at our own facility in Andhra Pradesh.",
  },
  origin: {
    headline: "Two generations, one grinder",
    body: "Provica has grown cocoa in Andhra Pradesh and Uganda for two generations. We ferment on the estate, roast in our own facility, and stone-grind every batch ourselves — no compound chocolate, no outsourcing the middle.",
    bodyExtra:
      "Zoops is how we share that work with the world: spreads, bonbons, tablets and gift boxes, packed for the people who show up with a whole box and expect it to disappear.",
    imageUrl: null,
    imageLabel: "The estate — fermentation beds",
  },
  process: {
    headline: "From pod to jar, we don't outsource the middle",
    subtext: "Every Zoops product passes through the same four hands — ours.",
    steps: [
      {
        num: "01",
        title: "Grow",
        body: "Estate cocoa in Andhra Pradesh and Uganda — we know which farm every batch came from.",
      },
      {
        num: "02",
        title: "Ferment",
        body: "On-site fermentation at the estate, not commodity bulk traded through a dozen hands.",
      },
      {
        num: "03",
        title: "Roast & grind",
        body: "Stone-ground in our own facility. The grinder runs hot; the recipe doesn't change.",
      },
      {
        num: "04",
        title: "Gift",
        body: "Packed for sharing — spreads, bonbons, hampers, and corporate orders by the crate.",
      },
    ],
  },
  values: {
    headline: "What we won't compromise on",
    items: [
      {
        badge: "Single-Estate Cocoa",
        title: "Single-estate cocoa",
        body: "We know which farm every batch came from — Andhra Pradesh, Uganda, or both.",
      },
      {
        badge: "Stone-Ground",
        title: "Stone-ground, in-house",
        body: "No compound chocolate. Our grinder, our facility, our recipe.",
      },
      {
        badge: "Gift-Ready",
        title: "Made to be shared",
        body: "Gifting is the point — boxes, hampers, and corporate orders welcome.",
      },
    ],
  },
  places: {
    headline: "Andhra Pradesh & Uganda",
    subtext: "Two climates, two estates, one grinder.",
    items: [
      {
        region: "Andhra Pradesh",
        body: "Where Provica began — two generations of estate cocoa, fermentation beds, and the grinder that started it all.",
        imageUrl: null,
        imageLabel: "Andhra Pradesh estate",
      },
      {
        region: "Uganda",
        body: "Our second origin — a different climate, a different soil, the same commitment to growing and fermenting on-site.",
        imageUrl: null,
        imageLabel: "Uganda estate",
      },
    ],
  },
  banter: {
    headline: "The mascots have opinions",
    line: "We didn't ask them to narrate the About page. They insisted.",
    mood: "grumpy",
  },
  cta: {
    headline: "Taste what two generations built",
    body: "Six spreads, bonbons, tablets and more — stone-ground and ready to gift by the boxful.",
    primaryLabel: "Shop the range",
    primaryHref: "/products",
    secondaryLabel: "Bulk & corporate",
    secondaryHref: "/#bulk",
  },
};

/** Provica /about — facility & Classico story */
export const DEFAULT_ABOUT_PROVICA = {
  hero: {
    headline: "Indian cocoa, made in Hyderabad",
    subtext:
      "We source cocoa from Central Andhra Pradesh and Uganda. Every Classico compound is produced at our facility under our watch.",
  },
  origin: {
    headline: "We source cocoa from Central Andhra Pradesh and Uganda",
    body: "Provica is a cocoa chocolate company. Every Classico compound and every Zoops confection is produced at our facility on the outskirts of Hyderabad, to consistent quality standards.",
    bodyExtra:
      "Two generations of estate cocoa — fermentation on-site, roasting and grinding in-house. Classico is how we serve home bakers; Zoops is how we gift it.",
    imageUrl: null,
    imageLabel: "Provica facility — Hyderabad",
  },
  process: {
    headline: "From bean to compound, under one roof",
    subtext: "Grow, ferment, roast, and pack — without outsourcing the middle.",
    steps: [
      {
        num: "01",
        title: "Source",
        body: "Estate cocoa from Andhra Pradesh and Uganda — traceable batches, not commodity bulk.",
      },
      {
        num: "02",
        title: "Ferment",
        body: "On-site fermentation at the estate before beans reach our Hyderabad facility.",
      },
      {
        num: "03",
        title: "Compound",
        body: "Classico dark, milk, and white compounds — consistent melt, no tempering required.",
      },
      {
        num: "04",
        title: "Supply",
        body: "Home bakers, bakeries, and B2B — 500g packets to bulk orders.",
      },
    ],
  },
  values: {
    headline: "What we stand for",
    items: [
      {
        badge: "2 Origins",
        title: "Two origins",
        body: "Central Andhra Pradesh and Uganda — estate cocoa we know by farm.",
      },
      {
        badge: "1 Facility",
        title: "One facility",
        body: "Every Classico product is made in-house on the outskirts of Hyderabad.",
      },
      {
        badge: "In-house",
        title: "In-house production",
        body: "No outsourcing the middle — we control quality from bean to packet.",
      },
    ],
  },
  places: {
    headline: "Andhra Pradesh & Uganda",
    subtext: "Two climates, two estates, one grinder in Hyderabad.",
    items: [
      {
        region: "Andhra Pradesh",
        body: "Where Provica began — estate cocoa, fermentation beds, and decades of growing experience.",
        imageUrl: null,
        imageLabel: "Andhra Pradesh estate",
      },
      {
        region: "Uganda",
        body: "Our second origin — different soil and climate, the same on-site fermentation commitment.",
        imageUrl: null,
        imageLabel: "Uganda estate",
      },
    ],
  },
  banter: {
    headline: "Classico for the kitchen",
    line: "Melt, coat, create — no tempering needed.",
    mood: "sunny",
  },
  cta: {
    headline: "Buying for a bakery or business?",
    body: "Classico compounds, chips, and powders — wholesale and B2B welcome.",
    primaryLabel: "Bakeries & B2B",
    primaryHref: "/bakeries",
    secondaryLabel: "Shop Classico",
    secondaryHref: "/classico",
  },
};

/** Origins Cocoa — cacao sourcing story (same editor schema for now) */
export const DEFAULT_ABOUT_ORIGINS = {
  hero: {
    headline: "A fine-flavoured Indian cacao bean",
    subtext:
      "Origins Cocoa connects farmer-members in West Godavari to buyers who care about traceability, fermentation, and fair payment.",
  },
  origin: {
    headline: "Traceable beans from West Godavari",
    body: "We work directly with farmer-members in Andhra Pradesh — transparent pricing, on-site fermentation data, and lots you can cup before you buy.",
    bodyExtra:
      "Single-origin, single-farm, and custom fermentation lots for makers who want specificity, not commodity bulk.",
    imageUrl: null,
    imageLabel: "Fermentation beds — West Godavari",
  },
  process: {
    headline: "From pod to export-ready lot",
    subtext: "Four steps — grow, ferment, dry, and ship with full traceability.",
    steps: [
      {
        num: "01",
        title: "Grow",
        body: "Farmer-members in West Godavari — known farms, known varieties.",
      },
      {
        num: "02",
        title: "Ferment",
        body: "Controlled fermentation with cut-test and moisture data on every lot.",
      },
      {
        num: "03",
        title: "Dry & sort",
        body: "Sun-dried beans, graded and prepared for export or domestic sale.",
      },
      {
        num: "04",
        title: "Ship",
        body: "MOQ-friendly lots with spec sheets, samples, and compliance docs.",
      },
    ],
  },
  values: {
    headline: "What buyers get",
    items: [
      {
        badge: "Traceable",
        title: "Full traceability",
        body: "Farm, harvest date, fermentation %, and cut-test on every lot.",
      },
      {
        badge: "Farmer-paid",
        title: "Farmer-first pricing",
        body: "Transparent payment to farmer-members — not commodity auction opacity.",
      },
      {
        badge: "Spec-ready",
        title: "Export-ready specs",
        body: "MOQ, lead time, packaging, and spec sheets for serious buyers.",
      },
    ],
  },
  places: {
    headline: "West Godavari, Andhra Pradesh",
    subtext: "Indian cacao with fine flavour potential.",
    items: [
      {
        region: "West Godavari",
        body: "Our farmer-member network — fermentation beds, drying patios, and cupping before you commit.",
        imageUrl: null,
        imageLabel: "West Godavari estate",
      },
      {
        region: "Andhra Pradesh",
        body: "A growing region for fine-flavoured Indian cacao — we connect farms to makers worldwide.",
        imageUrl: null,
        imageLabel: "Andhra Pradesh",
      },
    ],
  },
  banter: {
    headline: "Cup before you buy",
    line: "Samples available on request for qualified buyers.",
    mood: "sunny",
  },
  cta: {
    headline: "Ready to source your next lot?",
    body: "Single-origin, single-farm, and custom fermentation — tell us what you need.",
    primaryLabel: "View cacao lots",
    primaryHref: "/products",
    secondaryLabel: "Contact us",
    secondaryHref: "/about#contact",
  },
};

/** @deprecated use getDefaultAboutContent(siteSlug) */
export const DEFAULT_ABOUT_CONTENT = DEFAULT_ABOUT_ZOOPS;

const SITE_DEFAULTS: Record<string, AboutContent> = {
  zoops: DEFAULT_ABOUT_ZOOPS,
  provica: DEFAULT_ABOUT_PROVICA,
  "origins-cocoa": DEFAULT_ABOUT_ORIGINS,
};

export function getDefaultAboutContent(siteSlug = DEFAULT_SITE_SLUG): AboutContent {
  return SITE_DEFAULTS[siteSlug] ?? DEFAULT_ABOUT_ZOOPS;
}

function isEmptyAboutContent(
  dbContent: Partial<AboutContent> | null | undefined
): dbContent is null | undefined {
  return (
    !dbContent ||
    typeof dbContent !== "object" ||
    Object.keys(dbContent).length === 0
  );
}

function mergeAboutContent(dbContent: Partial<AboutContent> | null | undefined, siteSlug = DEFAULT_SITE_SLUG): AboutContent {
  const defaults = getDefaultAboutContent(siteSlug);

  if (isEmptyAboutContent(dbContent)) {
    return structuredClone(defaults);
  }

  const content: Partial<AboutContent> = dbContent;

  return {
    hero: { ...defaults.hero, ...content.hero },
    origin: { ...defaults.origin, ...content.origin },
    process: {
      ...defaults.process,
      ...content.process,
      steps: content.process?.steps?.length
        ? content.process.steps
        : defaults.process.steps,
    },
    values: {
      ...defaults.values,
      ...content.values,
      items: content.values?.items?.length
        ? content.values.items
        : defaults.values.items,
    },
    places: {
      ...defaults.places,
      ...content.places,
      items: content.places?.items?.length
        ? content.places.items
        : defaults.places.items,
    },
    banter: { ...defaults.banter, ...content.banter },
    cta: { ...defaults.cta, ...content.cta },
  };
}

export async function getAboutContent(siteSlug = DEFAULT_SITE_SLUG): Promise<AboutContent> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return mergeAboutContent(null, siteSlug);
  }

  try {
    const supabase = createPublicClient();
    const { data: site } = await supabase
      .from("sites")
      .select("id")
      .eq("slug", siteSlug)
      .eq("is_active", true)
      .maybeSingle();

    if (!site) return mergeAboutContent(null, siteSlug);

    const { data: row } = await supabase
      .from("about_page_content")
      .select("content")
      .eq("site_id", site.id)
      .maybeSingle();

    return mergeAboutContent((row?.content as Partial<AboutContent>) ?? null, siteSlug);
  } catch {
    return mergeAboutContent(null, siteSlug);
  }
}
export interface AboutStep {
  num: string;
  title: string;
  body: string;
}

export interface AboutValueItem {
  badge: string;
  title: string;
  body: string;
}

export interface AboutPlaceItem {
  region: string;
  body: string;
  imageUrl: string | null;
  imageLabel: string;
}

export interface AboutContent {
  hero: { headline: string; subtext: string };
  origin: {
    headline: string;
    body: string;
    bodyExtra: string;
    imageUrl: string | null;
    imageLabel: string;
  };
  process: { headline: string; subtext: string; steps: AboutStep[] };
  values: { headline: string; items: AboutValueItem[] };
  places: { headline: string; subtext: string; items: AboutPlaceItem[] };
  banter: { headline: string; line: string; mood: string };
  cta: {
    headline: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
}


