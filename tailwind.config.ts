import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#EFE7D6",
          50: "#F7F2E9",
          100: "#EFE7D6",
          200: "#E6DAC4",
          300: "#DACDB3",
        },
        chocolate: {
          DEFAULT: "#2D1B14",
          link: "#452B2B",
          50: "#F5F0ED",
          100: "#E8DDD6",
          200: "#C9B5A8",
          300: "#A68B7A",
          400: "#7A5C47",
          500: "#5C4536",
          600: "#4A3629",
          700: "#3D2B22",
          800: "#33231C",
          900: "#2D1B14",
          950: "#1A0F0A",
        },
        cocoa: {
          950: "#0f0a08",
          900: "#1a120e",
          800: "#2a1f18",
          700: "#3d2e24",
          600: "#5c4536",
          500: "#7a5c47",
          400: "#a07858",
          300: "#c4a07a",
          200: "#e0c9a8",
          100: "#f2e8d8",
          50: "#faf6f0",
        },
        earth: {
          green: "#2d4a3e",
          gold: "#8B6914",
          rust: "#8b4a3b",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-space-grotesk)",
          "system-ui",
          "sans-serif",
        ],
        presto: [
          "var(--font-cormorant)",
          '"Ivy Presto"',
          '"Cormorant Garamond"',
          '"Playfair Display"',
          "Georgia",
          "serif",
        ],
        "presto-display": [
          "var(--font-fraunces)",
          '"ivypresto-display"',
          '"Ivy Presto"',
          '"Cormorant Garamond"',
          '"Playfair Display"',
          "Georgia",
          "serif",
        ],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
