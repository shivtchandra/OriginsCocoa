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
