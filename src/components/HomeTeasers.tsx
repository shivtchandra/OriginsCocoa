import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "./FadeIn";

const rows = [
  {
    folio: "01",
    label: "Our Craft",
    title: "From farm to fermentery",
    description:
      "Fertile West Godavari land, scientific fermentation, and sun-drying — the making of a distinct Indian cacao.",
    href: "/our-craft",
    image: "/images/index/index-craft-farm.webp",
    imageAlt:
      "Gouache illustration of cacao harvest in West Godavari — farmers carrying pods along a path at golden hour",
    imagePosition: "object-center",
  },
  {
    folio: "02",
    label: "Products",
    title: "West Godavari cacao beans",
    description:
      "Single origin, single farm, and custom fermentation lots — crafted for professional makers and passionate creators alike.",
    href: "/products",
    image: "/images/index/index-products-beans.webp",
    imageAlt:
      "Fermented and dried cacao beans on cream linen with ripe pods in the background",
    imagePosition: "object-center",
  },
  {
    folio: "03",
    label: "Community",
    title: "A 100+ farmer-member community",
    description:
      "Carefully selected partners, paid a significant premium within 24 hours through a fully transparent digital platform.",
    href: "/community",
    image: "/images/index/index-community-farmers.webp",
    imageAlt:
      "Farmer-members at the Origins Cacao Fermentery in Talikadapudi, West Godavari",
    imagePosition: "object-[center_35%]",
  },
  {
    folio: "04",
    label: "Traceability",
    title: "End-to-end traceable beans",
    description:
      "Every step of the bean\'s journey — farm, farmer, harvest, and post-harvest — meticulously recorded and made transparent.",
    href: "/our-craft#traceability",
    image: "/images/index/index-traceability.webp",
    imageAlt:
      "Origins Cacao batch label on a jute sack beside a tablet showing farm-to-ship traceability",
    imagePosition: "object-center",
  },
] as const;

export function HomeIndex() {
  return (
    <section className="bg-cream">
      <div className="section-padding !pb-12 md:!pb-16">
        <div className="max-w-7xl mx-auto px-0">
          <FadeIn>
            <p className="folio mb-3">Index</p>
            <h2 className="heading-h2 max-w-[16ch]">A fine-flavoured journey</h2>
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
                  <Link
                    href={row.href}
                    className="group block relative overflow-hidden rounded-sm border border-chocolate/10 bg-cream-200/40"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={row.image}
                        alt={row.imageAlt}
                        fill
                        className={`object-cover ${row.imagePosition} transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]`}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </Link>
                </FadeIn>

                <FadeIn delay={0.1} className={flip ? "lg:order-1" : ""}>
                  <p className="folio mb-5">
                    {row.folio} <span className="mx-2 text-chocolate/25">—</span>{" "}
                    {row.label}
                  </p>
                  <h3 className="heading-h3 mb-5 max-w-[18ch]">{row.title}</h3>
                  <p className="body-paragraph max-w-[42ch] mb-8">
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
