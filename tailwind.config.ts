import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    // Aether radius family: 8px, 12px, pill.
    borderRadius: {
      none: "0",
      sm: "6px",
      DEFAULT: "8px",
      md: "8px",
      lg: "8px",
      xl: "12px",
      "2xl": "12px",
      "3xl": "12px",
      full: "9999px",
    },
    extend: {
      colors: {
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          raised: "rgb(var(--surface-raised) / <alpha-value>)",
          overlay: "rgb(var(--surface-overlay) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          muted: "rgb(var(--ink-muted) / <alpha-value>)",
          faint: "rgb(var(--ink-faint) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
        },
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "monospace"],
        mono: ["var(--font-body)", "monospace"],
        display: ["var(--font-display)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 10px 0 rgb(var(--accent) / 0.45)",
        "glow-sm": "0 0 8px 0 rgb(var(--accent) / 0.3)",
        hairline: "inset 0 0 0 1px rgb(var(--line))",
      },
      letterSpacing: {
        tightest: "-0.025em",
        label: "1.8px",
      },
      maxWidth: {
        measure: "68ch",
      },
      spacing: {
        "3.5": "14px",
      },
    },
  },
  plugins: [],
};

export default config;
