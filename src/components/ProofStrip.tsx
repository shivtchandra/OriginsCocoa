import { FadeIn } from "./FadeIn";
import type { ProofStat } from "@/content/brand";
import { brand } from "@/content/brand";

// Thin credibility band — figures come from brand.proofStats (real data only).
// Missing figures render "—" so the layout holds without inventing numbers.
export function ProofStrip({ proofStats = brand.proofStats }: { proofStats?: ProofStat[] }) {
  return (
    <section className="bg-cream-200/60 border-y border-chocolate/10">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-chocolate/10">
            {proofStats.map((s) => (
              <div key={s.label} className="pt-8 sm:pt-0 first:pt-0 flex flex-col items-center">
                <p className="font-presto-display text-[34px] md:text-[42px] font-light leading-none text-chocolate mb-2">
                  {s.figure ?? "—"}
                </p>
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-chocolate/55">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
