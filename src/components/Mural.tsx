import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./FadeIn";

interface MuralOverlay {
  eyebrow?: string;
  title: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  side?: "left" | "right";
}

interface MuralProps {
  src: string;
  alt: string;
  overlay?: MuralOverlay;
}

// Full-bleed painterly mural band. Top edge blends up into the cream sheet so
// the art "rises" out of the page. Optional side text overlay sits over a
// directional cream scrim that guarantees contrast against the varied art.
export function Mural({ src, alt, overlay }: MuralProps) {
  const side = overlay?.side ?? "left";
  const scrim =
    side === "left"
      ? "bg-gradient-to-r from-cream via-cream/85 to-transparent"
      : "bg-gradient-to-l from-cream via-cream/85 to-transparent";

  return (
    <FadeIn direction="none">
      <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />

        {/* top blend into cream */}
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-cream via-cream/50 to-transparent" />
        {/* faint bottom seat for the footer */}
        <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-cream/40 to-transparent" />

        {overlay && (
          <>
            {/* side scrim for legibility */}
            <div
              className={`absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} w-full sm:w-3/4 md:w-1/2 ${scrim}`}
            />
            <div
              className={`absolute inset-y-0 flex items-center px-6 md:px-12 lg:px-20 ${
                side === "left" ? "left-0" : "right-0"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-sm ${side === "right" ? "text-right ml-auto" : ""}`}
              >
                {overlay.eyebrow && (
                  <p className="section-label mb-4">{overlay.eyebrow}</p>
                )}
                <h2 className="font-presto-display text-[30px] md:text-[38px] lg:text-[44px] font-normal leading-[1.1] text-chocolate mb-4">
                  {overlay.title}
                </h2>
                {overlay.text && (
                  <p className="body-text text-sm md:text-base text-chocolate/70 mb-6 max-w-[38ch]">
                    {overlay.text}
                  </p>
                )}
                {overlay.ctaLabel && overlay.ctaHref && (
                  <Link
                    href={overlay.ctaHref}
                    className={`cta-link ${side === "right" ? "flex-row-reverse" : ""}`}
                  >
                    {overlay.ctaLabel}
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
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </FadeIn>
  );
}
