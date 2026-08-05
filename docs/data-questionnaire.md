# Data Questionnaire — Origins Cocoa

Send this to the brand/customer to collect everything the site needs. Answers drop
straight into `src/content/brand.ts` (each `Q#` below matches a field there). Leave
blank what isn't ready — the site shows an honest placeholder until it's filled.

For each answer, give the **exact wording/number** you want public.

---

## Q1 — Company & contact
1.1 Registered/legal company name?
1.2 Is this an initiative of a parent company or group? (name to display, e.g. "An X initiative")
1.3 Founded / operating since (year)?
1.4 Public contact email for buyers?
1.5 Public phone (with country code)?
1.6 Full postal/registered address (as lines)?
1.7 Social profile URLs — Instagram, LinkedIn, YouTube (any others)?
1.8 External webshop / storefront URL, if any?
> Confirm we may keep: brand name **"Origins Cocoa"**, tagline **"A fine-flavoured Indian Cacao Bean"**, region **"West Godavari, Andhra Pradesh, India"**. Change any of these?

## Q2 — Headline proof stats (three numbers on the home page)
2.1 Number of farmer-members / partner farmers? (e.g. "100+")
2.2 Traceability claim in a few words? (e.g. "End-to-end", "100% batch-traceable")
2.3 Farmer payment claim? (e.g. "Within 24 hrs", "Premium above market")
> Prefer different metrics? Give up to 3 short figure + label pairs you can stand behind.

## Q3 — Certifications & food safety
3.1 Which certifications do you hold? (Organic USDA/EU, Fairtrade, Rainforest Alliance, GFSI/food-safety, etc.)
3.2 For each: certifying body + certificate number.
3.3 Can you provide a **Certificate of Analysis (COA)** on request (incl. heavy metals)? (yes/no)
3.4 Upload any certificate PDFs to display/download.

## Q4 — Wholesale / commercial terms
4.1 **MOQ** — minimum order (e.g. "1 bag (60 kg)", "1 pallet")?
4.2 **Pricing model** — how do you quote? (e.g. "FOB per kg, tiered by volume")
4.3 **Incoterms** offered? (FOB, DDP, EXW, CIF…)
4.4 **Packaging** options? (e.g. "60 kg jute with GrainPro liner")
4.5 **Lead time** from order to shipment?
4.6 **Export markets served** — which countries/regions do you currently ship to?
4.7 **Sample policy** — sample size, cost, who pays freight? (e.g. "1–2 kg, free, buyer pays courier")
4.8 **Compliance docs** you can supply? (Phytosanitary, COA, FSVP/FDA, HTS code…)

## Q5 — Product lots (repeat per lot / product you want listed)
Fill one block per lot. Also list any derivatives (nibs, cocoa powder, cocoa butter).
5.1 Lot / product name
5.2 Origin (region)
5.3 Farm (if single-farm)
5.4 Variety (Criollo / Trinitario / Forastero / blend)
5.5 Fermentation level (%)
5.6 Moisture (%) — target ≤ 7.5
5.7 Cut-test result (% well-fermented)
5.8 Bean count per 100 g
5.9 Harvest date / season
5.10 Tasting notes (3–5 descriptors)
5.11 Certifications that apply to this lot
5.12 MOQ for this lot
5.13 Lead time for this lot
5.14 Packaging for this lot
5.15 Spec-sheet PDF (upload) + a product photo
> Which category is each: Single Origin · Single Farm · Creative Fermentation · Custom Fermentation · Cocoa Nibs · Cocoa Powder · Cocoa Butter.

## Q6 — Community & impact
6.1 Farmer count (confirm Q2.1) + any detail (regions, women, youth)?
6.2 Premium / fair-payment statement (one sentence you can verify)?
6.3 Payment window (e.g. "24 hours")?
6.4 Do you publish a transparency/impact report? (upload PDF or link)

## Q7 — Credibility
7.1 Awards / recognitions (name, year, awarding body)?
7.2 Press / "featured in" (outlet + article URL)?

## Q8 — Real imagery (replaces current placeholders)
The site has labelled placeholder slots waiting on real photos. Please supply:
8.1 Farm / plantation (West Godavari) — wide + detail
8.2 Fermentery + post-harvest (fermentation boxes, drying beds)
8.3 Farmer community portraits
8.4 Beans (single origin, dried), nibs, and any finished chocolate
8.5 Per-lot product shots (see Q5.15)
> Prefer high-res, uncompressed originals; we'll optimise.

---

### How answers get used
- Q1, Q2, Q3, Q6, Q7 → `brand.company / contact / socials / proofStats / certifications / community / awards / press`
- Q4 → `brand.wholesale`
- Q5 → `brand.products[]`
- Q8 → replace the placeholder image slots across the site

Nothing publishes until you approve the wording.
