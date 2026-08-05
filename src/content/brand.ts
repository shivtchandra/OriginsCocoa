/**
 * SINGLE SOURCE OF TRUTH for all brand-supplied data.
 *
 * Nothing in here is invented. Every commercial / factual value is `null` or `[]`
 * until the brand provides it. Components render an honest placeholder ("—",
 * "on request") when a value is missing, so the design holds but no fake data ships.
 *
 * To go live: fill the values below. `Q#` comments map each field to a question in
 * `docs/data-questionnaire.md`. Provisional values are marked `// CONFIRM`.
 */

export type Maybe<T> = T | null;

export type ProductCategory =
  | "single-origin"
  | "single-farm"
  | "creative-fermentation"
  | "custom-fermentation"
  | "cocoa-nibs"
  | "cocoa-powder"
  | "cocoa-butter";

export interface ProofStat {
  /** The number/figure, e.g. "100+". Null → renders "—". */
  figure: Maybe<string>;
  /** The metric label (structure, safe to keep). */
  label: string;
}

export interface Certification {
  name: string; // e.g. "USDA Organic"
  body: Maybe<string>; // certifying body / cert number
  documentUrl: Maybe<string>;
}

export interface WholesaleTerms {
  moq: Maybe<string>; // Q4.1  e.g. "1 bag (60 kg)"
  priceModel: Maybe<string>; // Q4.2  e.g. "FOB per kg, tiered by volume"
  incoterms: string[]; // Q4.3  e.g. ["FOB", "DDP"]
  packaging: Maybe<string>; // Q4.4  e.g. "60 kg jute / GrainPro liner"
  leadTime: Maybe<string>; // Q4.5  e.g. "3–5 weeks"
  exportMarkets: string[]; // Q4.6  countries/regions served
  samplePolicy: Maybe<string>; // Q4.7  e.g. "1–2 kg samples on request"
  complianceDocs: string[]; // Q4.8  e.g. ["Phytosanitary", "COA", "FSVP"]
}

/** One purchasable cacao lot / product. */
export interface CacaoLot {
  slug: string;
  name: Maybe<string>; // Q5.1
  category: ProductCategory;
  origin: Maybe<string>; // Q5.2  region
  farm: Maybe<string>; // Q5.3
  variety: Maybe<string>; // Q5.4  Criollo / Trinitario / etc.
  fermentationPct: Maybe<number>; // Q5.5
  moisturePct: Maybe<number>; // Q5.6  target ≤ 7.5
  cutTest: Maybe<string>; // Q5.7  % well-fermented
  beanCountPer100g: Maybe<number>; // Q5.8
  harvestDate: Maybe<string>; // Q5.9
  tastingNotes: string[]; // Q5.10
  certifications: string[]; // Q5.11
  moq: Maybe<string>; // Q5.12
  leadTime: Maybe<string>; // Q5.13
  packaging: Maybe<string>; // Q5.14
  specSheetUrl: Maybe<string>; // Q5.15  downloadable PDF
}

/** Product line labels (offering STRUCTURE — not fabricated data). */
export const PRODUCT_CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "single-origin", label: "Single Origin" },
  { id: "single-farm", label: "Single Farm" },
  { id: "creative-fermentation", label: "Creative Fermentation" },
  { id: "custom-fermentation", label: "Custom Fermentation" },
];

export const brand = {
  company: {
    brandName: "Origins Cocoa", // CONFIRM
    legalName: null as Maybe<string>, // Q1.1
    tagline: "A fine-flavoured Indian Cacao Bean", // CONFIRM
    initiativeOf: null as Maybe<string>, // Q1.2  e.g. parent org
    region: "West Godavari, Andhra Pradesh, India", // CONFIRM
    foundedYear: null as Maybe<string>, // Q1.3
  },

  contact: {
    email: null as Maybe<string>, // Q1.4
    phone: null as Maybe<string>, // Q1.5
    addressLines: [] as string[], // Q1.6
  },

  socials: {
    instagram: null as Maybe<string>, // Q1.7
    linkedin: null as Maybe<string>,
    youtube: null as Maybe<string>,
    webshop: null as Maybe<string>, // Q1.8  external shop URL
  },

  /** Q2 — three headline proof metrics. Labels are the intended slots; figures are TBD. */
  proofStats: [
    { figure: null, label: "Farmer-members" }, // Q2.1
    { figure: null, label: "Traceable beans" }, // Q2.2
    { figure: null, label: "Farmer payment" }, // Q2.3
  ] as ProofStat[],

  certifications: [] as Certification[], // Q3

  wholesale: {
    moq: null,
    priceModel: null,
    incoterms: [],
    packaging: null,
    leadTime: null,
    exportMarkets: [],
    samplePolicy: null,
    complianceDocs: [],
  } as WholesaleTerms,

  /** Q5 — real lots drop in here. Empty until provided; UI shows "on request". */
  products: [] as CacaoLot[],

  community: {
    farmerCount: null as Maybe<string>, // Q6.1
    premiumStatement: null as Maybe<string>, // Q6.2
    paymentWindow: null as Maybe<string>, // Q6.3
    transparencyReportUrl: null as Maybe<string>, // Q6.4
  },

  awards: [] as string[], // Q7.1
  press: [] as { outlet: string; url: string }[], // Q7.2
};

/** Products for one category (empty until the brand supplies lots). */
export function lotsByCategory(category: ProductCategory): CacaoLot[] {
  return brand.products.filter((p) => p.category === category);
}
