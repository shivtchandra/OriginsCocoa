import { FadeIn } from "./FadeIn";
import { MediaPlaceholder } from "./MediaPlaceholder";

export function Traceability() {
  return (
    <section id="traceability" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn>
            <p className="section-label mb-4">End-to-end</p>
            <h2 className="heading-h2 mb-6">
              Traceable Beans
            </h2>
            <div className="divider-line mb-8" />
            <p className="body-paragraph mb-6">
              We practise complete transparency with our cacao bean supply chain —
              crucial to empowering our farmers, chocolate makers, and consumers.
            </p>
            <p className="body-paragraph">
              Every part of our bean&apos;s journey is meticulously recorded on our
              blockchain-enabled platform: from the farm and the farmer, to the
              purchase transaction, harvest date, and all post-harvest processes at
              our fermentery until packed and shipped to you.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <MediaPlaceholder
              label="Traceability Platform Video Placeholder"
              aspectRatio="aspect-[4/5]"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
