// Painterly "colourful strokes" transition — layered organic brush marks in the theme palette.
export function BrushDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="block w-full h-10 md:h-14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* earth green */}
        <path
          d="M-20 46 C 180 30, 360 58, 560 44 S 940 30, 1220 48"
          stroke="#2d4a3e"
          strokeOpacity="0.55"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* rust */}
        <path
          d="M-20 52 C 200 66, 420 40, 640 54 S 980 66, 1220 50"
          stroke="#8b4a3b"
          strokeOpacity="0.5"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* gold */}
        <path
          d="M-20 40 C 240 52, 480 34, 720 46 S 1000 40, 1220 42"
          stroke="#8B6914"
          strokeOpacity="0.5"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* copper accent, dashed like scattered pigment */}
        <path
          d="M-20 58 C 260 46, 520 64, 780 52 S 1040 58, 1220 56"
          stroke="#a86b3c"
          strokeOpacity="0.45"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="2 14"
        />
      </svg>
    </div>
  );
}
