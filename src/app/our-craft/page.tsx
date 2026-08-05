import type { Metadata } from "next";
import { OriginStory, RegionSection } from "@/components/OriginStory";
import { Fermentery } from "@/components/Fermentery";
import { Traceability } from "@/components/Traceability";
import { MuralJourney } from "@/components/MuralJourney";
import { getAboutContent } from "@/lib/about-db";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Craft — Origins Cocoa",
  description:
    "From West Godavari's fertile land to our state-of-the-art fermentery — discover how we unlock the flavour potential of Indian cacao.",
};

export default async function OurCraftPage() {
  const content = await getAboutContent();

  const muralSteps = content.process.steps.map((step) => ({
    n: step.num,
    title: step.title,
    text: step.body,
  }));

  return (
    <main>
      <OriginStory content={content} />
      <RegionSection content={content} />
      <Fermentery content={content} />
      <Traceability content={content} />
      <MuralJourney
        src="/images/mural-craft.png"
        alt="Painted mural of the cacao fermentery — copper still, fermentation boxes, sun-drying trays, and traceable beans"
        eyebrow={content.banter.line}
        heading={content.process.headline}
        steps={muralSteps}
      />
    </main>
  );
}
