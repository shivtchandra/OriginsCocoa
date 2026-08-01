import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "./FadeIn";

export function OriginStory() {
  return (
    <section id="origin" className="section-padding bg-cream pt-32 md:pt-40">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn>
            <p className="section-label mb-4">Unlocking the flavour</p>
            <h2 className="heading-h2 mb-6">
              Potential of Indian Cacao
            </h2>
            <div className="divider-line mb-8" />
            <p className="body-paragraph mb-6">
              Introduced in the 1960s as an industrial ingredient, Indian cacao&apos;s
              flavour potential has been overlooked for decades as productivity became
              the sole focus.
            </p>
            <p className="body-paragraph mb-8">
              At Origins Cocoa, we are shifting the focus back. Through long-term
              partnerships with our farmer-member community and radical advancements in
              fermentation and drying at our state-of-the-art fermentery, we are
              unlocking a new world of flavours for craft chocolate makers around the
              globe.
            </p>
            <Link href="/products" className="cta-link">
              Explore Our Beans
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-chocolate/10">
              <Image
                src="/images/origin-story-harvest.webp"
                alt="Illustrated scene of cacao harvest in West Godavari — farmers gathering ripe pods at golden hour"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function RegionSection() {
  return (
    <section className="section-padding bg-cream-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div className="relative aspect-square overflow-hidden rounded-sm border border-chocolate/10">
              <Image
                src="/images/origin-story-harvest.jpg"
                alt="West Godavari cacao region"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="order-1 lg:order-2">
            <p className="section-label mb-4">West Godavari</p>
            <h2 className="heading-h2 mb-6">
              A new origin for the world to discover
            </h2>
            <div className="divider-line mb-8" />
            <p className="body-paragraph mb-6">
              Our journey begins in the fertile West Godavari region of Andhra
              Pradesh, India. Blessed by the River Godavari, this land sustains
              abundant cacao growth with a distinct flavour profile.
            </p>
            <p className="body-paragraph">
              The cacao is farmed amidst lush tropical flora — banana, areca nut, and
              long pepper — which lend unique flavour nuances. Although the largest
              cacao-growing region in the country, it remains relatively unknown as a
              fine-flavoured origin. We aim to change that.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
