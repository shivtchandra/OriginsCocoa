import type { Metadata } from "next";
import { HeroSequence } from "@/components/HeroSequence";
import { HomeManifesto } from "@/components/HomeManifesto";
import { ProofStrip } from "@/components/ProofStrip";
import { getBrandContent } from "@/lib/brand-db";
import { HomeIndex } from "@/components/HomeTeasers";

export const metadata: Metadata = {
  title: "Origins Cocoa — Fine-Flavoured Indian Cacao from West Godavari",
  description:
    "Premium Indian cacao beans from farm to fermentery. Single origin, traceable, farmer-direct West Godavari cacao for craft chocolate makers worldwide.",
  openGraph: {
    title: "Origins Cocoa — Fine-Flavoured Indian Cacao from West Godavari",
    description:
      "Single origin. Honestly sourced. Rooted in West Godavari. Premium traceable Indian cacao for craft chocolate makers.",
    images: [
      {
        url: "/images/og/og-home-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Origins Cocoa — single origin cacao honestly sourced from West Godavari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og/og-home-1200x630.jpg"],
  },
};

export default async function Home() {
  const brandContent = await getBrandContent();
  return (
    <main className="sheet">
      <HeroSequence />
      <div className="sheet-rule" />
      <HomeManifesto />
      <ProofStrip proofStats={brandContent.proofStats} />
      <HomeIndex />
    </main>
  );
}
