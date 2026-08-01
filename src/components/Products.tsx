"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { MediaPlaceholder } from "./MediaPlaceholder";

const tabs = [
  "Single Origin",
  "Single Farm",
  "Creative Fermentation",
  "Custom Fermentation",
] as const;

type Tab = (typeof tabs)[number];

const products: Record<Tab, { name: string; description: string }[]> = {
  "Single Origin": [
    {
      name: "West Godavari Estate",
      description: "Classic profile with notes of tropical fruit and warm spice.",
    },
    {
      name: "Godavari Reserve",
      description: "Deep cocoa with subtle floral undertones.",
    },
    {
      name: "River Valley Select",
      description: "Bright acidity with honey and nutty finish.",
    },
  ],
  "Single Farm": [
    {
      name: "Prasad Farm Lot",
      description: "Dedicated harvest from a single farmer's finest trees.",
    },
    {
      name: "Rao Estate Micro-lot",
      description: "Limited batch with distinctive terroir expression.",
    },
    {
      name: "Talikadapudi Farm",
      description: "Beans from our fermentery-adjacent partner farm.",
    },
  ],
  "Creative Fermentation": [
    {
      name: "Long Pepper Infusion",
      description: "Fermented alongside local long pepper for complex spice.",
    },
    {
      name: "Banana Leaf Protocol",
      description: "Traditional wrapping technique for enhanced fruit notes.",
    },
    {
      name: "Areca Nut Shade Dried",
      description: "Slow-dried under areca canopy for mellow sweetness.",
    },
  ],
  "Custom Fermentation": [
    {
      name: "Maker's Blend A",
      description: "Collaborative protocol designed with partner chocolatiers.",
    },
    {
      name: "Maker's Blend B",
      description: "Custom fermentation profile for specific flavour targets.",
    },
    {
      name: "Bespoke Lot",
      description: "Fully tailored post-harvest process for your brand.",
    },
  ],
};

export function Products() {
  const [activeTab, setActiveTab] = useState<Tab>("Single Origin");

  return (
    <section id="products" className="section-padding bg-cream-200/50 pt-32 md:pt-40">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="section-label mb-4">Introducing</p>
            <h2 className="heading-h2 mb-4">
              West Godavari Cacao Beans
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`nav-link px-5 py-2.5 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                  activeTab === tab
                    ? "border-earth-gold text-earth-gold bg-earth-gold/5"
                    : "border-chocolate/20 text-chocolate/50 hover:border-chocolate/40 hover:text-chocolate/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {products[activeTab].map((product, i) => (
            <FadeIn key={product.name} delay={0.1 * i}>
              <div className="group">
                <MediaPlaceholder
                  label={`${product.name} — Product Image Placeholder`}
                  aspectRatio="aspect-[3/4]"
                  className="mb-6 group-hover:border-chocolate/20 transition-colors duration-500"
                />
                <h3 className="heading-h3 mb-2">
                  {product.name}
                </h3>
                <p className="body-text text-chocolate/60 mb-4">
                  {product.description}
                </p>
                <Link href="/connect" className="cta-link text-sm">
                  Request Samples
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="text-center mt-16 pt-12 border-t border-chocolate/10">
            <Link href="/connect" className="cta-link">
              Speak to Our Team
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
