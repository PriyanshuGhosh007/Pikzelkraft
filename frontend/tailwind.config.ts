import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "rgb(var(--primary-50) / <alpha-value>)",
          100: "rgb(var(--primary-100) / <alpha-value>)",
          200: "rgb(var(--primary-200) / <alpha-value>)",
          300: "rgb(var(--primary-300) / <alpha-value>)",
          400: "rgb(var(--primary-400) / <alpha-value>)",
          500: "rgb(var(--primary-500) / <alpha-value>)",
          600: "rgb(var(--primary-600) / <alpha-value>)",
          700: "rgb(var(--primary-700) / <alpha-value>)",
          800: "rgb(var(--primary-800) / <alpha-value>)",
          900: "rgb(var(--primary-900) / <alpha-value>)",
          950: "rgb(var(--primary-950) / <alpha-value>)",
        },
        neutral: {
          50: "rgb(var(--neutral-50) / <alpha-value>)",
          100: "rgb(var(--neutral-100) / <alpha-value>)",
          200: "rgb(var(--neutral-200) / <alpha-value>)",
          300: "rgb(var(--neutral-300) / <alpha-value>)",
          400: "rgb(var(--neutral-400) / <alpha-value>)",
          500: "rgb(var(--neutral-500) / <alpha-value>)",
          600: "rgb(var(--neutral-600) / <alpha-value>)",
          700: "rgb(var(--neutral-700) / <alpha-value>)",
          800: "rgb(var(--neutral-800) / <alpha-value>)",
          900: "rgb(var(--neutral-900) / <alpha-value>)",
          950: "rgb(var(--neutral-950) / <alpha-value>)",
        },
        background: {
          DEFAULT: "rgb(var(--background) / <alpha-value>)",
          alt: "rgb(var(--background-alt) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          muted: "rgb(var(--surface-muted) / <alpha-value>)",
          raised: "rgb(var(--surface-raised) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          muted: "rgb(var(--ink-muted) / <alpha-value>)",
          faint: "rgb(var(--ink-faint) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--success) / <alpha-value>)",
          soft: "rgb(var(--success-soft) / <alpha-value>)",
          text: "rgb(var(--success-text) / <alpha-value>)",
          border: "rgb(var(--success-border) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning) / <alpha-value>)",
          soft: "rgb(var(--warning-soft) / <alpha-value>)",
          text: "rgb(var(--warning-text) / <alpha-value>)",
          border: "rgb(var(--warning-border) / <alpha-value>)",
        },
        error: {
          DEFAULT: "rgb(var(--error) / <alpha-value>)",
          soft: "rgb(var(--error-soft) / <alpha-value>)",
          text: "rgb(var(--error-text) / <alpha-value>)",
          border: "rgb(var(--error-border) / <alpha-value>)",
        },
        info: {
          DEFAULT: "rgb(var(--info) / <alpha-value>)",
          soft: "rgb(var(--info-soft) / <alpha-value>)",
          text: "rgb(var(--info-text) / <alpha-value>)",
          border: "rgb(var(--info-border) / <alpha-value>)",
        },
        glass: {
          DEFAULT: "rgb(var(--glass-bg) / <alpha-value>)",
          border: "rgb(var(--glass-border) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 6vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em" },
        ],
        "display-l": [
          "clamp(2.25rem, 4.5vw, 3.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.025em" },
        ],
        h1: ["clamp(2rem, 3.75vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        h3: ["clamp(1.5rem, 2.25vw, 2rem)", { lineHeight: "1.18", letterSpacing: "-0.015em" }],
        h4: ["clamp(1.25rem, 1.75vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        h5: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h6: ["1.125rem", { lineHeight: "1.35" }],
        "body-lg": ["clamp(1.0625rem, 1.1vw, 1.1875rem)", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55" }],
        caption: ["0.8125rem", { lineHeight: "1.45" }],
        button: ["0.9375rem", { lineHeight: "1", letterSpacing: "0.01em" }],
        label: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.08em" }],
        nav: ["0.875rem", { lineHeight: "1" }],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(12 15 20 / 0.04), 0 4px 16px rgb(12 15 20 / 0.06)",
        md: "0 2px 4px rgb(12 15 20 / 0.05), 0 8px 24px rgb(12 15 20 / 0.08)",
        lg: "0 4px 8px rgb(12 15 20 / 0.06), 0 16px 40px rgb(12 15 20 / 0.12)",
        floating: "0 8px 16px rgb(12 15 20 / 0.08), 0 32px 64px rgb(12 15 20 / 0.18)",
        modal: "0 4px 12px rgb(12 15 20 / 0.12), 0 48px 96px rgb(12 15 20 / 0.28)",
        glow: "0 0 0 1px rgb(var(--primary-600) / 0.2), 0 0 24px rgb(var(--primary-600) / 0.25)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "20px",
        xl: "24px",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "scroll-dot": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.8s infinite",
        "fade-up": "fade-up 400ms cubic-bezier(0.22, 1, 0.36, 1)",
        float: "float 5s ease-in-out infinite",
        "scroll-dot": "scroll-dot 1.5s ease-out infinite",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
        },
        screens: {
          "2xl": "1280px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
