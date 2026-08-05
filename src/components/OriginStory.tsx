import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "./FadeIn";
import type { AboutContent } from "@/lib/about-db";

type SectionProps = {
  content: AboutContent;
};

export function OriginStory({ content }: SectionProps) {
  const { origin, cta } = content;

  return (
    <section id="origin" className="section-padding bg-cream pt-32 md:pt-40">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn>
            <p className="section-label mb-4">{content.hero.subtext}</p>
            <h2 className="heading-h2 mb-6">{origin.headline}</h2>
            <div className="divider-line mb-8" />
            <p className="body-paragraph mb-6">{origin.body}</p>
            {origin.bodyExtra ? (
              <p className="body-paragraph mb-8">{origin.bodyExtra}</p>
            ) : (
              <div className="mb-8" />
            )}
            <Link href={cta.primaryHref} className="cta-link">
              {cta.primaryLabel}
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
              {origin.imageUrl ? (
                <Image
                  src={origin.imageUrl}
                  alt={origin.imageLabel || "Origins Cocoa"}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <Image
                  src="/images/origin-story-harvest.webp"
                  alt={origin.imageLabel || "Illustrated scene of cacao harvest in West Godavari"}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function RegionSection({ content }: SectionProps) {
  const place = content.places.items[0];
  if (!place) return null;

  return (
    <section className="section-padding bg-cream-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div className="relative aspect-square overflow-hidden rounded-sm border border-chocolate/10">
              {place.imageUrl ? (
                <Image
                  src={place.imageUrl}
                  alt={place.imageLabel || place.region}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <Image
                  src="/images/origin-story-harvest.jpg"
                  alt={place.imageLabel || place.region}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="order-1 lg:order-2">
            <p className="section-label mb-4">{place.region}</p>
            <h2 className="heading-h2 mb-6">{content.places.headline}</h2>
            <div className="divider-line mb-8" />
            <p className="body-paragraph">{place.body}</p>
            {content.places.subtext ? (
              <p className="body-paragraph mt-6">{content.places.subtext}</p>
            ) : null}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
