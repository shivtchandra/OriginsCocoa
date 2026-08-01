interface MediaPlaceholderProps {
  label: string;
  aspectRatio?: string;
  className?: string;
  overlay?: boolean;
}

export function MediaPlaceholder({
  label,
  aspectRatio = "aspect-video",
  className = "",
  overlay = false,
}: MediaPlaceholderProps) {
  return (
    <div
      className={`media-placeholder ${aspectRatio} ${className}`}
      role="img"
      aria-label={label}
    >
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-cream/60 via-transparent to-transparent" />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <div className="w-12 h-px bg-chocolate/15" />
        <span className="nav-link text-xs uppercase tracking-[0.25em] text-chocolate/40">
          {label}
        </span>
        <div className="w-12 h-px bg-chocolate/15" />
      </div>
    </div>
  );
}
