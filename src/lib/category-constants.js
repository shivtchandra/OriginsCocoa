/** Client-safe Provica category constants (no server imports). */

/** Provica / Classico storefront category sections (matches coffee defaults). */
export const DEFAULT_PROVICA_CATEGORIES = [
  {
    id: null,
    slug: "compound",
    eyebrow: "What we make",
    title: "Classico compound chocolate",
    description:
      "Dark, milk, and white compound — 500g foil-sealed packets for molding, enrobing, and everyday baking.",
    matchTags: ["Dark", "Milk", "White"],
    showOnHome: true,
    isPublished: true,
    sortOrder: 0,
  },
  {
    id: null,
    slug: "chips",
    eyebrow: "Chips",
    title: "Classico chocolate chips",
    description:
      "Dark, milk, and white chips that hold their shape — for cookies, muffins, and toppings.",
    matchTags: ["Chips"],
    showOnHome: true,
    isPublished: true,
    sortOrder: 1,
  },
  {
    id: null,
    slug: "powder",
    eyebrow: "Powder",
    title: "Classico cocoa powder",
    description:
      "Alkalized and natural cocoa powders for rich colour, smooth flavour, and classic recipes.",
    matchTags: ["Powder"],
    showOnHome: true,
    isPublished: true,
    sortOrder: 2,
  },
  {
    id: null,
    slug: "coverings",
    eyebrow: "Coverings",
    title: "Classico chocolate coverings",
    description:
      "Glossy dark and white coverings for a professional finish on cakes and pastries.",
    matchTags: ["Coverings"],
    showOnHome: false,
    isPublished: true,
    sortOrder: 3,
  },
  {
    id: null,
    slug: "fillings",
    eyebrow: "Fillings",
    title: "Classico chocolate fillings",
    description:
      "Ready-to-use dark and white fillings for pastries, donuts, and layered cakes.",
    matchTags: ["Fillings"],
    showOnHome: false,
    isPublished: true,
    sortOrder: 4,
  },
  {
    id: null,
    slug: "cone-spray",
    eyebrow: "Cone spray",
    title: "Classico cone spray",
    description:
      "Dark and white cone sprays for a protective, flavourful coating inside ice cream cones.",
    matchTags: ["Cone Spray"],
    showOnHome: false,
    isPublished: true,
    sortOrder: 5,
  },
];

export const CLASSICO_TAG_OPTIONS = [
  ...new Set(DEFAULT_PROVICA_CATEGORIES.flatMap((category) => category.matchTags)),
];

