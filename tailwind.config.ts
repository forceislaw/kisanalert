import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#F7F5F0",
          tint: "#FDFCFA",
          dark: "#EDEAE2",
          muted: "#D9D5CC",
        },
        charcoal: {
          DEFAULT: "#1C1917",
          tint: "#2A2522",
          dark: "#0D0B0A",
          muted: "#6B6560",
        },
        sage: {
          DEFAULT: "#4A5D23",
          tint: "#5B7230",
          dark: "#3A4A1C",
          muted: "#7A9450",
        },
        terra: {
          DEFAULT: "#E07A5F",
          tint: "#E89078",
          dark: "#C96A50",
          muted: "#F0A088",
        },
        ochre: {
          DEFAULT: "#C9973B",
          tint: "#D4A84F",
          dark: "#B08530",
          muted: "#E0BC6A",
        },
        stone: {
          DEFAULT: "#D1CCC3",
          tint: "#E3DFD8",
          dark: "#BFB9AE",
          muted: "#A8A296",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
        md: "4px",
        lg: "4px",
        xl: "4px",
        "2xl": "4px",
      },
      boxShadow: {
        editorial: "3px 3px 0px 0px #1C1917",
        "editorial-terra": "3px 3px 0px 0px #E07A5F",
        "editorial-sage": "3px 3px 0px 0px #4A5D23",
        "editorial-hover": "5px 5px 0px 0px #1C1917",
      },
    },
  },
  plugins: [],
} satisfies Config;
