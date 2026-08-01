import { FadeIn } from "./FadeIn";

const audiences = [
  {
    title: "Professional Makers",
    description:
      "For chocolatiers, pastry chefs, and craft makers who spend their days fine-tuning temperature, timing, and finish. Origins Cocoa supports the rhythm of professional kitchens with beans that perform consistently — so the focus stays on the craft itself.",
  },
  {
    title: "Passionate Creators",
    description:
      "For those who turn to chocolate out of curiosity, joy, or a desire to learn. We offer a dependable starting point — removing guesswork and leaving space to explore, experiment, and grow with confidence.",
  },
];

export function AudienceSplit() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="section-label mb-4">Partners in Creation</p>
            <h2 className="heading-h2">
              For Every Hand That Shapes Chocolate
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {audiences.map((audience, i) => (
            <FadeIn key={audience.title} delay={0.15 * i}>
              <div className="border border-chocolate/10 p-10 md:p-12 hover:border-earth-gold/30 transition-colors duration-500">
                <h3 className="heading-h3 mb-6">
                  {audience.title}
                </h3>
                <div className="divider-line mb-6" />
                <p className="body-paragraph">{audience.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
