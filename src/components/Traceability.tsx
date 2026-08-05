import { FadeIn } from "./FadeIn";
import { MediaPlaceholder } from "./MediaPlaceholder";
import type { AboutContent } from "@/lib/about-db";

type TraceabilityProps = {
  content: AboutContent;
};

export function Traceability({ content }: TraceabilityProps) {
  const { values } = content;
  const primary = values.items[0];
  const secondary = values.items[1];

  return (
    <section id="traceability" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn>
            <p className="section-label mb-4">{primary?.badge ?? "End-to-end"}</p>
            <h2 className="heading-h2 mb-6">{values.headline}</h2>
            <div className="divider-line mb-8" />
            {primary ? <p className="body-paragraph mb-6">{primary.body}</p> : null}
            {secondary ? <p className="body-paragraph">{secondary.body}</p> : null}
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
