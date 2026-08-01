import { FadeIn } from "./FadeIn";
import { SectionVideo } from "./SectionVideo";

const processSteps = [
  {
    title: "Taking ownership of post-harvest",
    description:
      "Cacao's post-harvest processes have conventionally been carried out by the farmer, often in rudimentary ways. Recognising their vital role in flavour development, we take full ownership at our fermentery — ensuring meticulous control while relieving farmers of cost and effort.",
  },
  {
    title: "Scientific fermentation protocols",
    description:
      "We have made significant progress in fermentation and drying through extensive trials. Our science-based interventions, enabled by proprietary technology, give us enhanced control to achieve desired flavours consistently. All processing data is digitally recorded for chocolate makers.",
  },
];

export function Fermentery() {
  return (
    <section id="process" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="section-label mb-4">Origins Cocoa Fermentery</p>
            <h2 className="heading-h2 mb-4">
              Talikadapudi, West Godavari
            </h2>
            <p className="body-paragraph">
              A state-of-the-art facility where science meets craft — unlocking
              the true flavour potential of Indian cacao.
            </p>
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
          {processSteps.map((step, i) => (
            <FadeIn key={step.title} delay={0.15 * (i + 1)}>
              <h3 className="heading-h3 mb-4">
                {step.title}
              </h3>
              <div className="divider-line mb-6" />
              <p className="body-paragraph">{step.description}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
