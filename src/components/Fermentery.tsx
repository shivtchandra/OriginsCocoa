import { FadeIn } from "./FadeIn";
import { SectionVideo } from "./SectionVideo";
import type { AboutContent } from "@/lib/about-db";

type FermenteryProps = {
  content: AboutContent;
};

export function Fermentery({ content }: FermenteryProps) {
  const { process } = content;
  const steps = process.steps.slice(0, 2);

  return (
    <section id="process" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="section-label mb-4">Origins Cocoa Fermentery</p>
            <h2 className="heading-h2 mb-4">{process.headline}</h2>
            <p className="body-paragraph">{process.subtext}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <SectionVideo
            src="/videos/fermentery-hero-loop.mp4"
            poster="/images/fermentery-hero-poster.jpg"
            alt="Illustrated fermentery interior — copper vats, drying racks, and cacao beans at Talikadapudi"
            aspectRatio="aspect-[21/9]"
            className="mb-16"
          />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={0.15 * (i + 1)}>
              <h3 className="heading-h3 mb-4">{step.title}</h3>
              <div className="divider-line mb-6" />
              <p className="body-paragraph">{step.body}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
