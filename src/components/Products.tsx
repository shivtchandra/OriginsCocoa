"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { PRODUCT_CATEGORIES, type ProductCategory, type CacaoLot } from "@/content/brand";
import { lotsByCategory } from "@/lib/brand-db";

function LotCard({ lot }: { lot: CacaoLot }) {
  const specs: [string, string | number | null][] = [
    ["Origin", lot.origin],
    ["Variety", lot.variety],
    ["Fermentation", lot.fermentationPct != null ? `${lot.fermentationPct}%` : null],
    ["Moisture", lot.moisturePct != null ? `${lot.moisturePct}%` : null],
  ];
  return (
    <div className="group">
      {lot.specSheetUrl ? (
        <div className="relative mb-6 aspect-[3/4] overflow-hidden">
          <Image
            src={lot.specSheetUrl}
            alt={lot.name ?? "Cacao lot"}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <MediaPlaceholder
          label={`${lot.name ?? "Lot"} — Image Placeholder`}
          aspectRatio="aspect-[3/4]"
          className="mb-6"
        />
      )}
      <h3 className="heading-h3 mb-3">{lot.name ?? "Lot name — on request"}</h3>
      <dl className="mb-4 space-y-1">
        {specs.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 text-sm">
            <dt className="font-sans uppercase tracking-[0.15em] text-[11px] text-chocolate/45">
              {k}
            </dt>
            <dd className="body-text text-chocolate/70">{v ?? "—"}</dd>
          </div>
        ))}
      </dl>
      <Link href="/connect" className="cta-link">
        Request Sample
      </Link>
    </div>
  );
}

function EmptyState() {
  return (
    <FadeIn>
      <div className="border border-chocolate/10 bg-cream/60 px-6 py-16 text-center max-w-2xl mx-auto">
        <p className="section-label mb-4">Current lots</p>
        <h3 className="heading-h3 mb-4">Full specifications available on request</h3>
        <p className="body-paragraph max-w-[46ch] mx-auto mb-8">
          Origin, variety, fermentation level, moisture, cut-test, harvest date, and
          certifications for each lot are shared with a sample. Tell us your flavour
          target and volume and we&apos;ll send matching options.
        </p>
        <Link href="/connect" className="cta-link">
          Request a Sample &amp; Quote
        </Link>
      </div>
    </FadeIn>
  );
}

export function Products({ products = [] as CacaoLot[] }: { products?: CacaoLot[] }) {
  const [active, setActive] = useState<ProductCategory>(PRODUCT_CATEGORIES[0].id);
  const lots = lotsByCategory(products, active);

  return (
    <section id="products" className="section-padding bg-cream-200/50">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="section-label mb-4">Introducing</p>
            <h2 className="heading-h2 mb-4">West Godavari Cacao Beans</h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {PRODUCT_CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`nav-link px-5 py-2.5 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                  active === tab.id
                    ? "border-earth-gold text-earth-gold bg-earth-gold/5"
                    : "border-chocolate/20 text-chocolate/50 hover:border-chocolate/40 hover:text-chocolate/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {lots.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {lots.map((lot, i) => (
              <FadeIn key={lot.slug} delay={0.1 * i}>
                <LotCard lot={lot} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}
