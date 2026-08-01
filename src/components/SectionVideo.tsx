"use client";

interface SectionVideoProps {
  src: string;
  poster?: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
}

export function SectionVideo({
  src,
  poster,
  alt,
  aspectRatio = "aspect-[21/9]",
  className = "",
}: SectionVideoProps) {
  return (
    <div
      className={`relative overflow-hidden border border-chocolate/10 bg-cream-200 ${aspectRatio} ${className}`}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={alt}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/15 via-transparent to-cream/10" />
    </div>
  );
}
