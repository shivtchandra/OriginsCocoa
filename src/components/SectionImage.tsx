import Image from "next/image";

interface SectionImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
  sizes?: string;
}

export function SectionImage({
  src,
  alt,
  aspectRatio = "aspect-video",
  className = "",
  objectPosition = "center",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: SectionImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-cream-200 border border-chocolate/10 rounded-sm ${aspectRatio} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ objectPosition }}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
