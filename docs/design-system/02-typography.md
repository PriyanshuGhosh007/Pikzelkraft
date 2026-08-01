# 02 — Typography System

## 1. Font Pairing (Google Fonts)

**Display / Headings: Space Grotesk** — geometric, characterful, modern; signals technology without feeling cold. Perfect for a premium agency.
**Body / UI: Inter** — neutral, highly readable at every size, the industry standard for premium SaaS.
**Mono (optional): JetBrains Mono** — reserved for numbers, stats, code snippets, invoice figures, and tech accents.

| Role | Font | Why |
|------|------|-----|
| Display & headings | `Space Grotesk` (400, 500, 600, 700) | Distinct, modern, premium |
| Body & UI | `Inter` (400, 500, 600, 700) | Readability, neutrality |
| Numeric accents | `JetBrains Mono` (500, 700) | Precision, tech credibility |

**Font stacks**

```css
--font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
--font-sans:    "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, "SF Mono", "Cascadia Code", monospace;
```

**Load via `next/font/google`** (self-hosted, `display: "swap"`, `preload` both). Do not use a `<link>` to Google Fonts in production — self-hosting removes the third-party request and layout shift. Subset to latin; only load the weights actually used (400/500/600/700; drop 600 from Space Grotesk if unused).

**Numbers:** enable `font-variant-numeric: tabular-nums` on JetBrains Mono and on any tables/stats to prevent table jitter.

---

## 2. Type Scale

Fluid via `clamp()` — smooth scaling between mobile and desktop, no awkward breakpoint jumps. All headings use Space Grotesk; all body/caption/label use Inter.

| Token | Family | Weight | Size (mobile → desktop) | Line-Height | Letter-Spacing | Case |
|-------|--------|--------|--------------------------|-------------|----------------|------|
| **Display XL** | Display | 600 | `clamp(2.75rem, 6vw, 4.5rem)` (44→72px) | 1.05 | `-0.03em` | Normal |
| **Display L** | Display | 600 | `clamp(2.25rem, 4.5vw, 3.5rem)` (36→56px) | 1.08 | `-0.025em` | Normal |
| **H1** | Display | 600 | `clamp(2rem, 3.75vw, 3rem)` (32→48px) | 1.1 | `-0.02em` | Normal |
| **H2** | Display | 600 | `clamp(1.75rem, 3vw, 2.5rem)` (28→40px) | 1.12 | `-0.02em` | Normal |
| **H3** | Display | 600 | `clamp(1.5rem, 2.25vw, 2rem)` (24→32px) | 1.18 | `-0.015em` | Normal |
| **H4** | Display | 600 | `clamp(1.25rem, 1.75vw, 1.5rem)` (20→24px) | 1.25 | `-0.01em` | Normal |
| **H5** | Display | 600 | `1.25rem` (20px) | 1.3 | `-0.01em` | Normal |
| **H6** | Display | 500 | `1.125rem` (18px) | 1.35 | `0` | Normal |
| **Body Large** | Inter | 400 | `clamp(1.0625rem, 1.1vw, 1.1875rem)` (17→19px) | 1.6 | `-0.01em` | Normal |
| **Body Medium** | Inter | 400 | `1rem` (16px) | 1.6 | `0` | Normal |
| **Body Small** | Inter | 400 | `0.875rem` (14px) | 1.55 | `0` | Normal |
| **Caption** | Inter | 400 | `0.8125rem` (13px) | 1.45 | `0` | Normal |
| **Button** | Inter | 600 | `0.9375rem` (15px) | 1 | `0.01em` | Normal |
| **Label** | Inter | 600 | `0.75rem` (12px) | 1.2 | `0.08em` | Uppercase |
| **Navigation** | Inter | 500 | `0.875rem` (14px) | 1 | `0` | Normal |

---

## 3. Usage Rules

- **One Display + one Body** in most views. Headings are Space Grotesk; everything else is Inter.
- **Prose line length:** max `65ch` (`max-w-prose`) for body copy. Shorten for feature blurbs (40ch).
- **Headings:** tight tracking, never uppercase (uppercase breaks the geometric feel). If a short eyebrow needs caps, use **Label**.
- **Buttons:** 15px/600 weight is the only bold-in-UI exception — it lifts contrast on the primary-600 fill (see colors doc).
- **Numerals in marketing (stats, results):** JetBrains Mono with `tabular-nums`, or Space Grotesk for display numbers — pick per component, stay consistent within a section.
- **Gradient text (`--gradient-text`):** large display sizes only (≥ H2), never for body. Add `background-clip: text; color: transparent;`.
- **Links inline:** primary-600 (light) / primary-400 (dark); underline on hover with `decoration-2 underline-offset-4`.

---

## 4. Responsive Behavior

- Headings and display text use `clamp()` — they scale continuously; no discrete breakpoint steps needed.
- Below 640px: H1/H2 drop toward the floor of their clamp; section leading (padding) also shrinks (see spacing doc).
- Body text stays at a fixed 16px minimum — never below 14px anywhere (accessibility).
- Tables: 13–14px with `tabular-nums`; dense dashboards may use 13px minimum.

---

## 5. Implementation (Tailwind)

```ts
fontFamily: {
  display: ["var(--font-display)"],
  sans: ["var(--font-sans)"],
  mono: ["var(--font-mono)"],
},
fontSize: {
  "display-xl": ["clamp(2.75rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
  "display-l": ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
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
```

**In markup:** `font-display text-h2` or `text-body-lg leading-relaxed`. Prefer semantic size tokens over bare `text-4xl` so the scale stays governed.
