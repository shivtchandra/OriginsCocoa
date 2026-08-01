import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { MediaPlaceholder } from "./MediaPlaceholder";

const farmerImages = [
  "Farmer Portrait 1 Placeholder",
  "Farmer Portrait 2 Placeholder",
  "Farmer Portrait 3 Placeholder",
  "Farmer Portrait 4 Placeholder",
  "Farmer Portrait 5 Placeholder",
  "Farmer Portrait 6 Placeholder",
];

export function FarmerCommunity() {
  return (
    <section id="community" className="section-padding bg-cream-200/50 pt-32 md:pt-40">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="max-w-2xl mb-16">
            <h2 className="heading-h2 mb-6">
              100+ Cacao Farmer-member Community
            </h2>
            <div className="divider-line mb-8" />
            <p className="body-paragraph">
              We are dedicated to building a sustainable ecosystem for high-quality
              Indian cacao. Our farmer-members are carefully selected based on their
              cultivation and harvest practices, as well as their commitment to
              upholding strict quality protocols.
            </p>
            <p className="body-paragraph mt-6">
              We ensure they are paid a significant premium within a 24-hour time
              span, facilitated through our fully transparent digital platform.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <blockquote className="max-w-2xl mb-16 border-l-2 border-earth-gold/40 pl-8">
            <p className="body-paragraph italic text-chocolate/80 mb-4">
              &ldquo;When the quality is recognised and the payment is fair, we invest
              back in the land. This is not just cacao — it is our family&apos;s
              future.&rdquo;
            </p>
            <footer className="nav-link text-xs uppercase tracking-[0.15em] text-chocolate/50">
              GVS Prasad, Farmer-member, West Godavari
            </footer>
          </blockquote>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {farmerImages.map((label, i) => (
            <FadeIn key={label} delay={0.08 * i}>
              <MediaPlaceholder
                label={label}
                aspectRatio={
                  i === 0 || i === 3 ? "aspect-[3/4]" : "aspect-square"
                }
                className={i === 0 ? "md:row-span-2" : ""}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="text-center mt-16">
            <Link href="/our-craft" className="cta-link">
              Learn About Our Standards
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
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
