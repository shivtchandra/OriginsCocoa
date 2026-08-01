import { FadeIn } from "./FadeIn";

export function HomeManifesto() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <p className="section-label mb-6">A new model for a new Indian cacao</p>
          <p className="heading-h3 font-normal leading-[1.35] mb-8">
            Indian cacao arrived in the 1960s as an industrial ingredient — and its
            flavour was overlooked for sixty years.
          </p>
          <div className="w-12 h-px bg-chocolate/25 mx-auto mb-8" />
          <p className="body-paragraph max-w-[54ch] mx-auto">
            At Origins Cocoa we are shifting the focus back. Through long-term
            partnerships with our farmer-member community and radical advances in
            fermentation and drying at our state-of-the-art fermentery, we are
            unlocking a new world of flavour for craft chocolate makers worldwide.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
