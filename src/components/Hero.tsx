"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { FilmModal } from "./FilmModal";

const trustTags = [
  "State-of-the-art Fermentery",
  "Farmer Direct",
  "Transparent & Equitable",
];

export function Hero() {
  const [filmOpen, setFilmOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex flex-col bg-cream">
        <div className="flex-1 flex flex-col items-center justify-center text-center section-padding pt-32 pb-16 md:pt-40 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="intro-script mb-4 md:mb-6"
          >
            In pursuit of
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="heading-h1 max-w-4xl mb-10 md:mb-12"
          >
            A fine-flavoured
            <br />
            Indian Cacao Bean
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="w-full max-w-3xl"
          >
            <div className="divider-dotted mb-5" />
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4">
              {trustTags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-chocolate/30 hidden sm:inline" aria-hidden>
                      |
                    </span>
                  )}
                  <span className="nav-link text-[10px] sm:text-xs uppercase tracking-[0.25em] text-chocolate/70">
                    {tag}
                  </span>
                </span>
              ))}
            </div>
            <div className="divider-dotted mt-5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-10 md:mt-12 flex flex-col items-center gap-6"
          >
            <button
              type="button"
              onClick={() => setFilmOpen(true)}
              className="group inline-flex items-center gap-3 nav-link text-xs uppercase tracking-[0.3em] text-chocolate/80 hover:text-chocolate transition-colors"
              aria-label="Play brand film"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-chocolate/25 group-hover:border-chocolate/50 transition-colors">
                <span className="ml-0.5 text-[10px]" aria-hidden>
                  ▶
                </span>
              </span>
              Play Film
            </button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: scrolled ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className={scrolled ? "visible" : "invisible"}
            >
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
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 1.04 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden aspect-[21/9] md:aspect-[2.4/1]"
        >
          <Image
            src="/images/cacao-farm.jpg"
            alt="Premium Indian cacao beans from West Godavari"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream/20 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="nav-link text-[10px] uppercase tracking-[0.3em] text-chocolate/40">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-8 bg-gradient-to-b from-chocolate/30 to-transparent"
          />
        </motion.div>
      </section>

      <FilmModal isOpen={filmOpen} onClose={() => setFilmOpen(false)} />
    </>
  );
}
