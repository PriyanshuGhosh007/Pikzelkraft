# Pikzelkraft Design System

Enterprise-grade UI/UX design system for **Pikzelkraft** — a premium Digital Marketing & IT Solutions company.

**Stack:** Next.js (TypeScript) · Tailwind CSS · Framer Motion · Lucide React
**Benchmark quality:** Apple, Stripe, Vercel, Linear, Framer, Webflow, Notion, Figma
**Principles:** Premium · Minimal · Trustworthy · Interactive · Conversion-focused · Performant

---

## Document Map

| File | Covers |
|------|--------|
| `README.md` | Brand guidelines, usage, implementation notes, consistency rules, scalability |
| `01-colors.md` | Complete color system + all CSS variables |
| `02-typography.md` | Font pairing + full type scale |
| `03-spacing-radius-shadows.md` | Spacing scale, grids, radius, shadows, glassmorphism |
| `04-buttons-forms.md` | Button system + form system |
| `05-component-library.md` | All UI components |
| `06-motion.md` | Motion language + animation specifications |
| `07-hero-dashboard-responsive.md` | Hero, dashboards, responsive rules, icons |
| `reference/tailwind.config.ts` | Production Tailwind config |
| `reference/globals.css` | CSS variables + base styles + utilities |

---

## 1. Brand Identity

### Name & story
**Pikzelkraft** = *Pixel* + *Kraft* (German for "strength/skill"). The brand is built on the idea of **pixel-perfect craftsmanship** — every pixel intentional, every pixel engineered to perform. This is the narrative that threads through the entire design system: precision meets artistry.

### Taglines
- Primary: **"Digital Excellence, Crafted."**
- Alternate: **"We Craft Digital Growth."**
- Micro: **"Pixel-perfect. Business-driven."**

### Brand personality
Premium · Professional · Modern · Innovative · Trustworthy · Minimal · Technology-focused · Creative · Elegant · User-centric

### Voice & tone
- **Confident, not loud.** Assertive statements, no hype or exclamation marks.
- **Precise.** Concrete numbers, results, and outcomes over adjectives.
- **Human.** Second-person, approachable; plain language, no jargon walls.
- **Calm luxury.** White space, restrained color, deliberate pacing.

### Do / Don't
| Do | Don't |
|----|-------|
| Use whitespace generously | Crowd sections or fill every gap |
| One accent idea per view | Rainbow gradients or many accents |
| Lead with outcomes | Lead with features alone |
| Micro-copy that feels human | Generic "Submit", "Learn More" everywhere |
| Numbers that prove value | Unsubstantiated claims |

### Logo usage
- Primary lockup on light and dark surfaces.
- Keep clear-space = height of the "P".
- Minimum width 32px (favicon) — hide wordmark below 320px viewport.
- Icon-only mode: the "P" mark with a 4x4 pixel-grid motif.

---

## 2. Design Principles

1. **Clarity over cleverness.** The user always knows where they are and what to do next.
2. **One primary action per screen.** Every view has a single hero CTA.
3. **Motion with meaning.** Animation explains state, hierarchy, or progress — never decoration alone.
4. **Consistency is trust.** Reused tokens, shared components, predictable patterns.
5. **Accessibility is not optional.** AA contrast, full keyboard support, reduced-motion respected.
6. **Performance is a feature.** 90+ Lighthouse, 60fps, minimal CLS.

---

## 3. Implementation Notes

### How to consume
1. Copy `reference/globals.css` into `frontend/src/app/globals.css`.
2. Copy `reference/tailwind.config.ts` into `frontend/tailwind.config.ts`.
3. Install `framer-motion` and `lucide-react` in `frontend`.
4. Load fonts in `app/layout.tsx` (see `02-typography.md`).
5. Add `data-theme="light|dark"` on `<html>`; toggle via class.
6. Import shared motion variants from `src/lib/motion.ts`.

### Token convention
- CSS variables define the truth; Tailwind maps them via `rgb(var(--token) / <alpha-value>)` for runtime opacity support.
- Use Tailwind utility classes in markup (`bg-primary-600`), never raw hex inline.
- Semantic tokens (`bg-surface`, `text-ink`) preferred over raw scale tokens in components, so dark mode is automatic.

### Directory structure (frontend)
```
src/
├── app/
├── components/
│   ├── ui/            # buttons, inputs, cards, modal, etc.
│   ├── marketing/     # navbar, hero, pricing, footer, ...
│   └── dashboard/     # sidebar, stat-card, charts, ...
├── lib/
│   ├── motion.ts      # shared Framer Motion variants
│   ├── utils.ts       # cn() class merge
│   └── theme.ts
└── styles/globals.css
```

### File header convention
Every component file starts with a JSDoc block: purpose, props summary, a11y notes, motion budget.

---

## 4. UI Consistency Rules

1. **Spacing** — use scale values only; never ad-hoc px. 8px base rhythm, 4px micro step.
2. **Radius** — semantic: `sm` controls (checkboxes), `md` inputs/buttons, `lg` cards, `2xl` modals.
3. **Shadows** — 3 tiers max per view: soft (rest), floating (hover), modal (overlay).
4. **Motion** — 300ms default; durations from the motion table only; reduced-motion respected.
5. **Icons** — Lucide only; 20px default; strokeWidth 1.75; stroke-linecap round.
6. **Text** — max line-length 65ch for prose; headings tight tracking, never uppercase body.
7. **Buttons** — one primary per view; secondary/ghost for everything else; danger only for destructive.
8. **Empty/loading** — never raw blank; always skeleton or empty state (per `05-component-library.md`).
9. **Dark mode** — token-driven; no hardcoded colors in components.
10. **Responsive** — mobile-first; breakpoints from `07-hero-dashboard-responsive.md`.

---

## 5. Future Scalability

- **Token-driven theming:** all values flow from `globals.css` variables — a white-label or client-branded variant is a variable swap, not a refactor.
- **Component registry:** UI primitives are framework-agnostic; document with Storybook (CSF 3) so props/variants are self-documenting.
- **Multi-product readiness:** dashboard tokens are scoped (`dashboard-*`) so a future second product (e.g., mobile app, client portal v2) extends without colliding.
- **Motion library:** centralized variants in `lib/motion.ts` keep choreography consistent as the app grows; new patterns get added to the motion table first.
- **Testing hooks:** every token exported as CSS variable + JS constant (`tokens.ts`) to power visual regression (Chromatic/Percy) and a11y checks (axe, Pa11y) in CI.
- **Design ops:** tokens auto-published from Figma via Style Dictionary when the brand evolves — the CSS/TS files in this package are the single source of truth until then.
