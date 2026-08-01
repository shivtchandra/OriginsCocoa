import type { Metadata } from "next";
import Link from "next/link";
import { HeroSequence } from "@/components/HeroSequence";
import { HomeManifesto } from "@/components/HomeManifesto";
import { ProofStrip } from "@/components/ProofStrip";
import { HomeIndex } from "@/components/HomeTeasers";
import { Mural } from "@/components/Mural";

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

      <section className="bg-cream-200">
        <div className="section-padding text-center max-w-2xl mx-auto">
          <p className="section-label mb-5">Manam Chocolate Karkhana</p>
          <h2 className="heading-h2 mb-8">
            Be part of a bold new Indian craft chocolate experience
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <Link href="/connect" className="cta-link">
              Get in Touch
            </Link>
            <span className="hidden sm:block text-chocolate/20" aria-hidden>
              |
            </span>
            <a
              href="https://manamchocolate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
            >
              Manam Webshop
              <span aria-hidden className="text-[11px]">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* quiet static mural close — no scroll drama on home */}
      <Mural
        src="/images/mural-home.png"
        alt="Painted mural of the West Godavari cacao journey — from pod and blossom to farmer, fermentery, beans, and chocolate"
      />
    </main>
  );
}
