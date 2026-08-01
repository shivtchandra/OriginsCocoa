"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MediaPlaceholder } from "./MediaPlaceholder";

interface FilmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilmModal({ isOpen, onClose }: FilmModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-chocolate/90 backdrop-blur-sm p-4 md:p-12"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Brand film"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-12 right-0 nav-link text-xs uppercase tracking-[0.2em] text-cream/70 hover:text-cream transition-colors"
              aria-label="Close"
            >
              Close
            </button>

            <MediaPlaceholder
              label="Brand Film — film-web-1080-h264.mp4"
              aspectRatio="aspect-video"
              className="border-cream/20"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
