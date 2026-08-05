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
      className="absolute inset-x-0 top-[36%] bottom-[22%] flex items-center justify-center lg:inset-x-auto lg:left-[44%] lg:right-6 xl:right-14 lg:top-[10%] lg:bottom-[18%]"
      aria-hidden={index !== 0}
    >
      <div className="relative h-[min(36vh,100%)] w-[min(36vh,88vw)] md:h-[min(40vh,100%)] md:w-[min(40vh,40vh)] lg:h-[min(50vh,100%)] lg:w-[min(50vh,50vh)] aspect-square">
        <Image
          src={stage.img}
          alt={stage.alt}
          fill
          priority={index === 0}
          className="object-contain drop-shadow-[0_18px_40px_rgba(45,27,20,0.18)]"
          sizes="50vh"
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
      className="absolute bottom-[14%] md:bottom-[13%] left-6 md:left-12 lg:left-20 max-w-xs md:max-w-md text-left"
    >
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-chocolate/55 mb-2">
        Step {stage.n} / {String(TOTAL).padStart(2, "0")}
      </p>
      <h3 className="font-presto-display text-[30px] md:text-[40px] font-normal leading-[1.05] text-chocolate mb-2">
        {stage.title}
      </h3>
      <p className="font-sans text-sm md:text-[15px] text-chocolate/75 max-w-[38ch]">
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
  const introY = useTransform(scrollYProgress, [0, 0.09], [0, -24]);
  const objectScale = useTransform(scrollYProgress, [0, 0.12], [0.88, 1]);
  const captionsGate = useTransform(scrollYProgress, [0, 0.1, 0.15], [0, 0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  if (reduce) {
    return (
        <section className="relative min-h-screen flex flex-col bg-cream overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <Image src="/images/hero-bg-poster.jpg" alt="" fill className="object-cover scale-105 blur-[3px] contrast-[0.88]" priority />
            <div className="absolute inset-0 bg-cream mix-blend-multiply opacity-30" />
            <div className="absolute inset-0 bg-cream/45" />
          </div>
          <div className="relative flex h-screen flex-col pt-28 lg:flex-row lg:items-center lg:pt-32">
            <div className="flex flex-[0.34] flex-col items-center justify-end px-6 pb-4 text-center lg:flex-none lg:w-[44%] lg:items-start lg:justify-center lg:pb-0 lg:pl-12 lg:pr-8 lg:text-left xl:pl-20">
              <p className="intro-script mb-3">In pursuit of</p>
              <h1 className="heading-h1 max-w-3xl lg:max-w-md xl:max-w-lg">A fine-flavoured Indian Cacao Bean</h1>
            </div>
            <div className="flex flex-[0.38] items-center justify-center px-6 lg:flex-1 lg:justify-end lg:pr-12 xl:pr-16">
              <div className="relative aspect-square h-[min(36vh,100%)] w-[min(36vh,88vw)] lg:h-[min(50vh,100%)] lg:w-[min(50vh,50vh)]">
                <Image src={stages[0].img} alt={stages[0].alt} fill priority className="object-contain" sizes="(max-width: 1024px) 36vh, 50vh" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-4 flex flex-col items-center px-6 md:bottom-5 lg:bottom-6">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                {trustTags.map((t, i) => (
                  <span key={t} className="flex items-center gap-3">
                    {i > 0 && <span className="text-chocolate/30" aria-hidden>|</span>}
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-chocolate/70">{t}</span>
                  </span>
                ))}
              </div>
            </div>
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
        <div className="sticky top-0 h-screen w-full overflow-hidden hero-feather-out">
          <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
            <video
              className="hero-drift absolute inset-0 h-full w-full object-cover blur-[3px] contrast-[0.88] saturate-[1.05]"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/hero-bg-poster.jpg"
              aria-hidden
            >
              <source src="/videos/hero-bg.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-cream mix-blend-multiply opacity-30" />
          <div className="pointer-events-none absolute inset-0 bg-cream/25" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/5 to-cream/75" />

          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[6%] xl:pr-[8%]">
            <div
              className="h-[80vh] w-[80vh] rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,249,236,0.95) 0%, rgba(234,223,200,0) 62%)",
              }}
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[63%] -translate-x-1/2 h-[2.5vh] w-[20vh] rounded-[50%] bg-chocolate/15 blur-2xl lg:left-[68%] lg:top-[56%] lg:translate-x-0 lg:w-[18vh]"
          />

          <motion.div style={{ scale: objectScale }} className="absolute inset-0">
            <motion.div
              initial={{ scale: 0.55, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.25 }}
              className="absolute inset-0"
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 0.8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {stages.map((stage, i) => (
                  <StageImage key={stage.n} stage={stage} index={i} progress={scrollYProgress} />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-x-0 top-0 h-[36%] flex flex-col items-center justify-end text-center pointer-events-none px-6 pb-4 md:pb-5 pt-24 md:pt-28 lg:h-[72%] lg:items-start lg:justify-center lg:text-left lg:px-12 xl:px-20 lg:max-w-[44%] lg:pb-0 lg:pt-32"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              className="font-presto-display italic text-[19px] md:text-[24px] tracking-wide text-chocolate/70 mb-3"
            >
              In pursuit of
            </motion.p>
            <h1 className="font-presto-display text-[40px] md:text-[58px] lg:text-[52px] xl:text-[58px] font-light leading-[1.04] tracking-[-0.02em] text-chocolate max-w-4xl mx-auto px-6 lg:mx-0 lg:px-0 lg:max-w-md xl:max-w-lg [font-optical-sizing:auto]">
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
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-4 md:pb-5 pointer-events-none">
            <motion.div
              style={{ opacity: introOpacity }}
              className="flex flex-col items-center px-6 mb-3 md:mb-3.5"
            >
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 max-w-3xl">
                <div className="divider-dotted w-full max-w-xl mb-1" />
                {trustTags.map((tag, i) => (
                  <span key={tag} className="flex items-center gap-3">
                    {i > 0 && <span className="text-chocolate/30 hidden sm:inline" aria-hidden>|</span>}
                    <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-chocolate/70">{tag}</span>
                  </span>
                ))}
                <div className="divider-dotted w-full max-w-xl mt-1" />
              </div>
            </motion.div>
            <div className="flex items-center gap-2.5">
              {stages.map((_, i) => (
                <RailDot key={i} index={i} progress={scrollYProgress} />
              ))}
            </div>
          </div>

          <motion.div style={{ opacity: captionsGate }} className="absolute inset-0 pointer-events-none">
            {stages.map((stage, i) => (
              <StageCaption key={stage.n} stage={stage} index={i} progress={scrollYProgress} />
            ))}
          </motion.div>

          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute top-[66%] left-1/2 -translate-x-1/2 text-chocolate/40 lg:hidden"
            aria-hidden
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="block text-sm leading-none"
            >
              ↓
            </motion.span>
          </motion.div>

          <div className="absolute bottom-0 inset-x-0 h-px bg-chocolate/10">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full w-full origin-left bg-chocolate/50" />
          </div>
        </div>
      </section>
  );
}
