import type { Metadata } from "next";
import Link from "next/link";
import { HeroSequence } from "@/components/HeroSequence";
import { HomeManifesto } from "@/components/HomeManifesto";
import { ProofStrip } from "@/components/ProofStrip";
import { HomeIndex } from "@/components/HomeTeasers";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";

export const metadata: Metadata = {
  title: "Origins Cocoa — Fine-Flavoured Indian Cacao from West Godavari",
  description:
    "Premium Indian cacao beans from farm to fermentery. Single origin, traceable, farmer-direct West Godavari cacao for craft chocolate makers worldwide.",
};

export default function Home() {
  return (
    <main className="sheet">
      <HeroSequence />
      <div className="sheet-rule" />
      <HomeManifesto />
      <ProofStrip />
      <HomeIndex />

      {/* mural bridge into Our Craft — placeholder slot with copy retained */}
      <section className="relative bg-cream">
        <MediaPlaceholder
          label="Home Mural — West Godavari journey"
          aspectRatio="aspect-[21/9] md:aspect-[3/1]"
          className="rounded-none border-x-0"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-6 md:px-12 lg:px-20">
          <div className="pointer-events-auto max-w-sm">
            <p className="section-label mb-3">One origin</p>
            <h2 className="heading-h3 mb-4">Every step, in our hands</h2>
            <p className="body-text text-sm md:text-base text-chocolate/70 mb-6 max-w-[34ch]">
              Farm, fermentery, and makers — the whole journey of a West Godavari bean.
            </p>
            <Link href="/our-craft" className="cta-link">
              Discover our craft
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* final call to action — page ends on intent */}
      <section className="bg-cream-200">
        <div className="section-padding text-center max-w-2xl mx-auto">
          <p className="section-label mb-5">Connect</p>
          <h2 className="heading-h2 mb-8">
            Be part of a bold new Indian craft chocolate experience
          </h2>
          <div className="flex items-center justify-center">
            <Link href="/connect" className="cta-link">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
