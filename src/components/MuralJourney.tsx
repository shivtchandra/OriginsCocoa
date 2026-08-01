"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

export interface JourneyStep {
  n: string;
  title: string;
  text: string;
}

interface MuralJourneyProps {
  src: string;
  alt: string;
  eyebrow: string;
  heading: string;
  steps: JourneyStep[];
}

// One caption — owns its own scroll-linked opacity so hooks stay top-level.
function Caption({
  step,
  index,
  total,
  progress,
}: {
  step: JourneyStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const pad = (end - start) * 0.18;
  const opacity = useTransform(
    progress,
    [start, start + pad, end - pad, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, start + pad, end - pad, end],
    [24, 0, 0, -24]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute bottom-24 md:bottom-28 left-6 md:left-12 lg:left-20 max-w-xs md:max-w-md"
    >
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-chocolate/55 mb-3">
        Step {step.n} / {String(total).padStart(2, "0")}
      </p>
      <h3 className="font-presto-display text-[34px] md:text-[46px] font-normal leading-[1.02] text-chocolate mb-3">
        {step.title}
      </h3>
      <p className="font-sans text-sm md:text-[15px] leading-relaxed text-chocolate/75 max-w-[34ch]">
        {step.text}
      </p>
    </motion.div>
  );
}

// One progress-rail segment — brightens when the scroll is inside its step.
function RailDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const mid = (index + 0.5) / total;
  const opacity = useTransform(
    progress,
    [index / total, mid, (index + 1) / total],
    [0.25, 1, 0.25]
  );
  const scaleX = useTransform(
    progress,
    [index / total, mid, (index + 1) / total],
    [1, 1.6, 1]
  );
  return (
    <motion.span
      style={{ opacity, scaleX }}
      className="block h-[3px] w-7 origin-center rounded-full bg-chocolate"
    />
  );
}

export function MuralJourney({
  src,
  alt,
  eyebrow,
  heading,
  steps,
}: MuralJourneyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-140vw"]);
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  // Reduced-motion static fallback: mural + a clear numbered step list.
  if (reduce) {
    return (
      <section className="bg-cream">
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden">
          <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-cream to-transparent" />
        </div>
        <div className="section-padding !py-16 max-w-5xl mx-auto">
          <p className="section-label mb-2">{eyebrow}</p>
          <h2 className="heading-h2 mb-10">{heading}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n}>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-chocolate/55 mb-2">
                  Step {s.n} / {String(steps.length).padStart(2, "0")}
                </p>
                <h3 className="font-presto-display text-[24px] mb-2">{s.title}</h3>
                <p className="font-sans text-sm text-chocolate/70">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative bg-cream"
      style={{ height: `${steps.length * 100}vh` }}
      aria-label={`${heading} — scroll to explore`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* over-wide panning mural */}
        <motion.div
          style={{ x }}
          className="absolute top-0 left-0 h-full w-[240vw]"
        >
          <Image src={src} alt={alt} fill priority className="object-cover" sizes="240vw" />
        </motion.div>

        {/* legibility washes */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cream via-cream/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 md:w-1/2 bg-gradient-to-r from-cream/90 via-cream/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-cream to-transparent" />

        {/* pinned section header + intro cue */}
        <div className="absolute top-10 left-6 md:left-12 lg:left-20 max-w-xs">
          <p className="section-label mb-2">{eyebrow}</p>
          <h2 className="font-presto-display text-[26px] md:text-[32px] font-normal text-chocolate">
            {heading}
          </h2>
          <p className="mt-2 font-sans text-[12px] leading-relaxed text-chocolate/55">
            A {steps.length}-step story. Keep scrolling to follow the bean.
          </p>
        </div>

        {/* cross-fading captions */}
        {steps.map((step, i) => (
          <Caption
            key={step.n}
            step={step}
            index={i}
            total={steps.length}
            progress={scrollYProgress}
          />
        ))}

        {/* start hint — clear vertical scroll cue, fades once moving */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-chocolate/60"
        >
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.28em]">
            Scroll to follow the story
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            aria-hidden
            className="text-base leading-none"
          >
            ↓
          </motion.span>
        </motion.div>

        {/* numbered progress rail */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          {steps.map((_, i) => (
            <RailDot key={i} index={i} total={steps.length} progress={scrollYProgress} />
          ))}
        </div>

        {/* thin overall progress bar */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-chocolate/10">
          <motion.div
            style={{ scaleX: barScaleX }}
            className="h-full w-full origin-left bg-chocolate/50"
          />
        </div>
      </div>
    </section>
  );
}
