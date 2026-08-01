# 08 — Implementation Guide: Accessibility, Performance, Tokens

Developer-facing rules for shipping the design system with quality. Covers accessibility (WCAG 2.2 AA), performance budgets, the token reference, reusable component classes, and launch checks.

---

## 1. Accessibility (WCAG 2.2 AA)

### Keyboard & focus
- Every interactive element is focusable and operable with the keyboard (Tab, Enter, Space, arrows).
- Visible focus everywhere: `:focus-visible` 2px ring in `--ring-focus` + 2px offset (base stylesheet). Never `outline: none` without replacement.
- Focus order follows DOM order; modals trap focus and return it to the trigger on close.
- Custom widgets (tabs, accordion, menu, combobox, switch, dialog) follow WAI-ARIA authoring patterns.

### ARIA essentials
| Component | Pattern |
|-----------|---------|
| Nav / mega menu | `aria-expanded`, `aria-controls`, `role="menu"` items `role="menuitem"` |
| Tabs | `role="tablist/tab/tabpanel"`, arrow-key nav, `aria-selected` |
| Accordion | button `aria-expanded` + `aria-controls`; panel `role="region" aria-labelledby` |
| Dialog/Drawer | `role="dialog" aria-modal="true" aria-labelledby`, focus trap, Esc close |
| Toast | live region `aria-live="polite"` (info) / `role="alert"` (error) |
| Progress | `role="progressbar" aria-valuemin/max/now` |
| Switch | `role="switch" aria-checked` |
| Table sort | `aria-sort` on headers |
| Icons | decorative → `aria-hidden="true"`; meaning-bearing → label |

### Contrast
- Body text: `--ink` on surfaces ≥ 4.5:1 (verified above).
- Muted text ≥ 4.5:1 at 14px+ (use `--ink-muted` for secondary only; never for body).
- Brand-600 fills used for **large text / UI components only**; text on white uses primary-700.
- Status never communicated by color alone — pair with icon + text label.

### Screen readers & semantics
- One `<h1>` per page; heading hierarchy without skips.
- Landmarks: `header`, `nav`, `main`, `footer`; skip-link "Skip to content" first in body.
- Forms: every input has a visible `<label>` (`htmlFor`), `aria-invalid` on error, `aria-describedby` for helper/error.
- Alt text on all meaningful images; empty `alt=""` for decorative.
- `lang` on `<html>`; valid, simplified structure.

### Reduced motion
- `useReducedMotion()` from Framer Motion for JS-driven animation (skip letter/word reveals, tilt, parallax, magnetic).
- Global CSS kill-switch for CSS animations/transitions (base stylesheet).
- Reduced-motion users see final states instantly (no empty-until-animated content).

### Automated checks
- CI: axe-core + Pa11y on 3 core pages (Home, Services, Dashboard) and the 404 page.
- Manual: keyboard-only pass over every view; VoiceOver/NVDA spot checks on auth + dashboard.

---

## 2. Performance

### Budgets (Lighthouse, mobile throttled)
| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| SEO | 100 |
| LCP | ≤ 2.0s |
| CLS | ≤ 0.05 |
| INP | ≤ 200ms |
| First JS bundle | ≤ 250KB gzip (route-split) |

### Rules
- **Fonts:** `next/font` self-hosted, `display: swap`, latin subset, preload both families; `font-size-adjust` not needed with stable pair. No render-blocking Google Fonts `<link>`.
- **Images:** `next/image` everywhere (AVIF/WebP, `sizes`, priority for LCP only). Portfolio = `fill` + aspect-ratio boxes → zero CLS. `loading="lazy"` below fold.
- **Motion:** LazyMotion + `m` (domAnimation); animate transform/opacity only; add `will-change` to hero orbs/parallax only; stop animation when tab hidden.
- **CLS guards:** reserve space (aspect ratios, min-heights) for hero, images, charts, tables; fixed button sizes (min-w) during loading; skeleton for async content.
- **Route splitting:** dashboard/admin code split via route groups + dynamic imports; charts loaded on interaction/route.
- **Rendering:** public marketing pages `static` (revalidate) or `ssr` only where needed; dashboard `client` with caching (react-query `staleTime`).
- **JS budget:** lucide-react tree-shaken; no animation lib beyond framer-motion; avoid recharts on marketing pages.
- **CSS:** one Tailwind build, purge via content globs; custom properties for tokens (no duplication).

---

## 3. Design Token Reference

All tokens in one place. Source of truth: `reference/globals.css` + `reference/tailwind.config.ts`.

| Category | Tokens |
|----------|--------|
| Color | `--primary-*`, `--neutral-*`, `--accent`, `--ink(-muted/faint)`, `--background(-alt)`, `--surface(-muted/raised)`, `--border(-strong/subtle/primary/focus)`, `--success/warning/error/info(-soft/-text/-border)`, `--gradient-*`, hover/disabled/overlay/ring |
| Typography | `--font-display/sans/mono`; sizes `display-xl … label`, `nav` |
| Spacing | `space-1 … space-24` (4–96px); containers `sm→2xl`, 1280px cap |
| Radius | `sm 8 / md 12 / lg 16 / xl 20 / 2xl 24 / full` |
| Shadow | `soft / md / lg / floating / modal / glass / glow` |
| Blur | `backdrop-blur-xs→xl` (2–24px) |
| Opacity | `--disabled-opacity: 0.5`; overlay 0.3/0.5/0.7 |
| Transition | `ease-premium` cubic-bezier(0.22,1,0.36,1); durations 150/250/300/500 |
| Animation | `gradient-x`, `shimmer`, `float`, `orb`, `ripple`, `scroll-dot`, `fade-up`, `pulse-soft` |
| Z-index | `base 0 / raised 10 / sticky 20 / dropdown 30 / overlay 40 / modal 50 / popover 60 / toast 70 / tooltip 80` |
| Breakpoints | `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536` |

---

## 4. Reusable Component Classes

Compose via Tailwind `@apply` to keep markup clean. Base set in `globals.css`:

```css
@layer components {
  .btn { /* base: inline-flex items-center justify-center gap-2 rounded-md font-sans text-button ... */ }
  .btn-primary { /* gradient + glow, hover lift + shadow-glow */ }
  .btn-secondary { /* surface + border */ }
  .btn-ghost { /* hover-subtle fill */ }
  .btn-outline { /* 2px primary border */ }
  .btn-danger { /* error fill */ }
  .btn-success { /* success fill */ }
  .btn-icon { /* 40px square ghost */ }
  .btn-lg / .btn-sm { /* height variants 52 / 36 */ }

  .card { /* surface, border, radius-lg, shadow-soft, p-6 */ }
  .card-hover { /* hover:-translate-y-1 hover:shadow-md transition */ }

  .badge { /* pill, text-caption, px-2.5 py-1 */ }
  .badge-primary / .badge-success / .badge-warning / .badge-error / .badge-info / .badge-neutral

  .chip { /* h-7 pill, surface-muted, text-body-sm */ }

  .section-header { /* eyebrow (Label) + title (h2) + lede (body-lg muted) */ }

  .field-label { /* text-label text-ink-muted */ }
  .field-error / .field-helper { /* 13px */ }
}
```

Semantic components (Button, Input, Card, Badge) wrap these in React components (`components/ui/*`) with a `variant`/`size` prop API — components, not string concatenation, are the public surface.

---

## 5. Launch Checks

- [ ] Fonts self-hosted + preloaded; no third-party font requests
- [ ] Lighthouse ≥ 90/95/100 on Home, Services, Dashboard; CLS ≤ 0.05
- [ ] Keyboard-only pass on all flows; axe + Pa11y clean; AA contrast verified
- [ ] `prefers-reduced-motion` respected (JS + CSS)
- [ ] Dark mode toggle works everywhere; no hardcoded colors
- [ ] Skeleton + empty states on every async surface
- [ ] Hero/parallax/magnetic disabled on touch; no scroll jank
- [ ] Mobile widths 320/375/390 verified; touch targets ≥ 44px
- [ ] `npm run build` + `next build` clean; bundle budget met
- [ ] Design tokens exported from the same source the app consumes
