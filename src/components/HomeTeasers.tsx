import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { MediaPlaceholder } from "./MediaPlaceholder";

const rows = [
  {
    folio: "01",
    label: "Our Craft",
    title: "From farm to fermentery",
    description:
      "Fertile West Godavari land, scientific fermentation, and sun-drying — the making of a distinct Indian cacao.",
    href: "/our-craft",
    image: "/images/cacao-farm.jpg",
    imageAlt: "Cacao farm in West Godavari",
  },
  {
    folio: "02",
    label: "Products",
    title: "West Godavari cacao beans",
    description:
      "Single origin, single farm, and custom fermentation lots — crafted for professional makers and passionate creators alike.",
    href: "/products",
    image: "/images/origin-story-harvest.jpg",
    imageAlt: "Premium Indian cacao beans",
  },
  {
    folio: "03",
    label: "Community",
    title: "A 100+ farmer-member community",
    description:
      "Carefully selected partners, paid a significant premium within 24 hours through a fully transparent digital platform.",
    href: "/community",
    image: "/images/fermentery-hero-poster.jpg",
    imageAlt: "Farmer community at the fermentery",
  },
  {
    folio: "04",
    label: "Traceability",
    title: "End-to-end traceable beans",
    description:
      "Every step of the bean's journey — farm, farmer, harvest, and post-harvest — meticulously recorded and made transparent.",
    href: "/our-craft#traceability",
    image: "/images/origin-story-harvest.jpg",
    imageAlt: "Traceable cacao beans",
  },
];

export function HomeIndex() {
  return (
    <section className="bg-cream">
      <div className="section-padding !pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <p className="section-label mb-4">Discover Origins</p>
            <h2 className="heading-h2">A fine-flavoured journey</h2>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {rows.map((row, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={row.href}>
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center py-16 lg:py-24">
                <FadeIn className={flip ? "lg:order-2" : ""}>
                  <Link href={row.href} className="group block relative overflow-hidden">
                    {row.label === "Products" ? (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={row.image}
                          alt={row.imageAlt}
                          fill
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    ) : (
                      <MediaPlaceholder
                        label={`${row.label} — Image Placeholder`}
                        aspectRatio="aspect-[4/3]"
                        className="transition-colors duration-500 group-hover:border-chocolate/20"
                      />
                    )}
                  </Link>
                </FadeIn>

                <FadeIn delay={0.1} className={flip ? "lg:order-1" : ""}>
                  <p className="folio mb-5">
                    {row.folio} <span className="mx-2 text-chocolate/25">—</span>{" "}
                    {row.label}
                  </p>
                  <h3 className="heading-h3 mb-5 max-w-[18ch]">{row.title}</h3>
                  <p className="body-paragraph max-w-[46ch] mb-8">
                    {row.description}
                  </p>
                  <Link href={row.href} className="cta-link">
                    Explore
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
              </div>
              {i < rows.length - 1 && <div className="sheet-rule" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
