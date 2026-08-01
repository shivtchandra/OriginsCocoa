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

interface Stage {
  n: string;
  title: string;
  text: string;
  img: string;
  alt: string;
}

const stages: Stage[] = [
  { n: "01", title: "The Pod", text: "A ripe cacao pod, hand-picked from the West Godavari canopy.", img: "/images/stages/stage-1-pod.png", alt: "Ripe cacao pod" },
  { n: "02", title: "The Beans", text: "Split open to reveal beans wrapped in sweet white pulp.", img: "/images/stages/stage-2-open.png", alt: "Cacao pod split open showing beans" },
  { n: "03", title: "Fermentation", text: "Days in wooden boxes, where flavour is born.", img: "/images/stages/stage-3-ferment.png", alt: "Fermenting cacao beans" },
  { n: "04", title: "Drying", text: "Turned by hand and dried under the Godavari sun.", img: "/images/stages/stage-4-dried.png", alt: "Dried cacao beans" },
  { n: "05", title: "Chocolate", text: "Crafted by makers worldwide — traceable to this bean.", img: "/images/stages/stage-5-chocolate.png", alt: "Dark chocolate" },
];

const TOTAL = stages.length;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// crossfade window for a given stage index
function stageWindow(index: number) {
  const o = 0.04;
  const bi = index / TOTAL;
  const bnext = (index + 1) / TOTAL;
  return {
    inLow: index === 0 ? -1 : bi - o,
    peakLow: index === 0 ? 0 : bi + o,
    peakHigh: index === TOTAL - 1 ? 1 : bnext - o,
    outHigh: index === TOTAL - 1 ? 2 : bnext + o,
  };
}

function StageImage({
  stage,
  index,
  progress,
}: {
  stage: Stage;
  index: number;
  progress: MotionValue<number>;
}) {
  const w = stageWindow(index);
  const range = [w.inLow, w.peakLow, w.peakHigh, w.outHigh];
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const scale = useTransform(progress, range, [0.94, 1, 1, 1.06]);
  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden={index !== 0}
    >
      <div className="relative h-[46vh] w-[46vh] md:h-[54vh] md:w-[54vh]">
        <Image
          src={stage.img}
          alt={stage.alt}
          fill
          priority={index === 0}
          className="object-contain drop-shadow-[0_18px_40px_rgba(45,27,20,0.18)]"
          sizes="54vh"
        />
      </div>
    </motion.div>
  );
}

function StageCaption({
  stage,
  index,
  progress,
}: {
  stage: Stage;
  index: number;
  progress: MotionValue<number>;
}) {
  const w = stageWindow(index);
  const opacity = useTransform(
    progress,
    [w.inLow, w.peakLow, w.peakHigh, w.outHigh],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [w.inLow, w.peakLow, w.peakHigh, w.outHigh],
    [20, 0, 0, -20]
  );
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute bottom-24 md:bottom-28 left-0 right-0 flex flex-col items-center text-center px-6"
    >
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-chocolate/55 mb-2">
        Step {stage.n} / {String(TOTAL).padStart(2, "0")}
      </p>
      <h3 className="font-presto-display text-[30px] md:text-[40px] font-normal leading-[1.05] text-chocolate mb-2">
        {stage.title}
      </h3>
      <p className="font-sans text-sm md:text-[15px] text-chocolate/75 max-w-[34ch]">
        {stage.text}
      </p>
    </motion.div>
  );
}

function RailDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const mid = (index + 0.5) / TOTAL;
  const opacity = useTransform(progress, [index / TOTAL, mid, (index + 1) / TOTAL], [0.25, 1, 0.25]);
  const scaleX = useTransform(progress, [index / TOTAL, mid, (index + 1) / TOTAL], [1, 1.6, 1]);
  return (
    <motion.span
      style={{ opacity, scaleX }}
      className="block h-[3px] w-7 origin-center rounded-full bg-chocolate"
    />
  );
}

const trustTags = [
  "State-of-the-art Fermentery",
  "Farmer Direct",
  "Transparent & Equitable",
];

export function HeroSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.09], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.09], [0, -30]);
  const objectScale = useTransform(scrollYProgress, [0, 0.12], [0.88, 1]);
  // captions stay hidden through the intro, appear once scrolling begins
  const captionsGate = useTransform(scrollYProgress, [0, 0.1, 0.15], [0, 0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  if (reduce) {
    return (
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center bg-cream section-padding pt-32">
        <p className="intro-script mb-4">In pursuit of</p>
        <div className="relative h-[38vh] w-[38vh] my-6">
          <Image src={stages[0].img} alt={stages[0].alt} fill priority className="object-contain" sizes="38vh" />
        </div>
        <h1 className="heading-h1 max-w-3xl mb-8">A fine-flavoured Indian Cacao Bean</h1>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {trustTags.map((t, i) => (
            <span key={t} className="flex items-center gap-3">
              {i > 0 && <span className="text-chocolate/30" aria-hidden>|</span>}
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-chocolate/70">{t}</span>
            </span>
          ))}
        </div>
      </section>
    );
  }

  return (
      <section
        ref={ref}
        className="relative bg-cream"
        style={{ height: `${TOTAL * 100}vh` }}
        aria-label="The life of a cacao bean — scroll to explore"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* warm light bloom — makes the object feel lit, not pasted on */}
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="h-[80vh] w-[80vh] rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,248,233,0.95) 0%, rgba(239,231,214,0) 62%)",
              }}
            />
          </div>
          {/* soft ground shadow — anchors the object like a product shot */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[20vh] h-[3vh] w-[22vh] rounded-[50%] bg-chocolate/15 blur-2xl"
          />

          {/* centre object — spring entrance → scroll-scale → gentle ambient float → crossfade */}
          <motion.div style={{ scale: objectScale }} className="absolute inset-0">
            <motion.div
              initial={{ scale: 0.55, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.25 }}
              className="absolute inset-0"
            >
              <motion.div
                animate={{ y: [0, -14, 0], rotate: [0, 1.2, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {stages.map((stage, i) => (
                  <StageImage key={stage.n} stage={stage} index={i} progress={scrollYProgress} />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* entry copy — fades out as the object takes centre */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-between py-[14vh] md:py-[13vh] text-center pointer-events-none"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: EASE }}
                className="font-presto-display italic text-[19px] md:text-[24px] tracking-wide text-chocolate/70 mb-4"
              >
                In pursuit of
              </motion.p>
              <h1 className="font-presto-display text-[44px] md:text-[64px] font-light leading-[1.04] tracking-[-0.02em] text-chocolate max-w-4xl mx-auto px-6 [font-optical-sizing:auto]">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
                >
                  A fine-flavoured
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
                >
                  Indian Cacao Bean
                </motion.span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.05 }}
              className="flex flex-col items-center gap-5"
            >
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6">
                {trustTags.map((tag, i) => (
                  <span key={tag} className="flex items-center gap-3">
                    {i > 0 && <span className="text-chocolate/30 hidden sm:inline" aria-hidden>|</span>}
                    <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-chocolate/70">{tag}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* stage captions — gated so they only appear after the intro clears */}
          <motion.div style={{ opacity: captionsGate }} className="absolute inset-0 pointer-events-none">
            {stages.map((stage, i) => (
              <StageCaption key={stage.n} stage={stage} index={i} progress={scrollYProgress} />
            ))}
          </motion.div>

          {/* start hint — minimal animated chevron only */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 text-chocolate/45"
            aria-hidden
          >
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="block text-base leading-none"
            >
              ↓
            </motion.span>
          </motion.div>

          {/* progress rail */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
            {stages.map((_, i) => (
              <RailDot key={i} index={i} progress={scrollYProgress} />
            ))}
          </div>

          {/* overall progress bar */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-chocolate/10">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full w-full origin-left bg-chocolate/50" />
          </div>
        </div>
      </section>
  );
}
