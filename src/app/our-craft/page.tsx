import type { Metadata } from "next";
import { OriginStory, RegionSection } from "@/components/OriginStory";
import { Fermentery } from "@/components/Fermentery";
import { Traceability } from "@/components/Traceability";
import { MuralJourney } from "@/components/MuralJourney";

export const metadata: Metadata = {
  title: "Our Craft — Origins Cocoa",
  description:
    "From West Godavari's fertile land to our state-of-the-art fermentery — discover how we unlock the flavour potential of Indian cacao.",
};

export default function OurCraftPage() {
  return (
    <main>
      <OriginStory />
      <RegionSection />
      <Fermentery />
      <Traceability />

      <MuralJourney
        src="/images/mural-craft.png"
        alt="Painted mural of the cacao fermentery — copper still, fermentation boxes, sun-drying trays, and traceable beans"
        eyebrow="Inside the Fermentery"
        heading="Post-harvest, perfected"
        steps={[
          { n: "01", title: "The Still", text: "Copper and fire at the heart of the fermentery." },
          { n: "02", title: "Fermentation", text: "Fresh beans rest in wooden boxes to build flavour." },
          { n: "03", title: "Sun-Drying", text: "Turned by hand on bamboo trays under the Godavari sun." },
          { n: "04", title: "Controlled", text: "Temperature and time, measured at every step." },
          { n: "05", title: "The Beans", text: "Glossy, graded, and scooped for the world's makers." },
          { n: "06", title: "Traceable", text: "Every bean recorded, fermentery to shipment." },
        ]}
      />
    </main>
  );
}
