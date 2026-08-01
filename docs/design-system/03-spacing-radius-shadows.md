# 03 — Spacing, Layout, Radius, Shadows, Glassmorphism

## 1. Spacing Scale

Base unit **4px**. Use scale values only — never ad-hoc px in components.

| Token | px | Typical use |
|-------|----|-------------|
| `space-0` | 0 | Reset |
| `space-1` | 4 | Icon gaps, dot separators, tight inner padding |
| `space-2` | 8 | Icon-to-label, table cell padding, small gaps |
| `space-3` | 12 | Input padding (comfort), button icon gaps, chips |
| `space-4` | 16 | Default component padding, card padding (compact) |
| `space-5` | 20 | Card padding, form field spacing |
| `space-6` | 24 | Card padding (default), list gaps, section inner |
| `space-8` | 32 | Between major blocks, modal padding |
| `space-10` | 40 | Hero spacing, feature grouping |
| `space-12` | 48 | Section bottom margins, large card gutters |
| `space-16` | 64 | Section padding, big vertical rhythm |
| `space-20` | 80 | Major section separation |
| `space-24` | 96 | Page hero padding, full-bleed section rhythm |

**Responsive rules**
- Mobile default: halve section paddings (`py-16` → `py-12` below 768px).
- Use `sm:`/`md:`/`lg:` prefixes; never write separate mobile/desktop components just for spacing.
- Component spacing is designed mobile-first: tight on mobile, open on desktop.

---

## 2. Container Widths

| Token | Width | Usage |
|-------|-------|-------|
| `container-sm` | 640px | Forms, small prose, modals inner |
| `container-md` | 768px | Single column prose, auth cards |
| `container-lg` | 1024px | Two-column content, dashboards |
| `container-xl` | 1200px | Default marketing content |
| `container-2xl` | 1280px | Full marketing pages, hero |
| `container-full` | 100% | Full-bleed hero/feature sections |

Default: `container-xl` centered with responsive gutters:
`px-4` (mobile) → `px-6` (≥640) → `px-8` (≥1024). Max width 1280px. Never exceed 1600px line of content.

**Gutters**
| Breakpoint | Gutter |
|------------|--------|
| <640px | 16px |
| 640–1023 | 24px |
| ≥1024 | 32px |

---

## 3. Section Spacing

Vertical rhythm for marketing sections (Tailwind):

| Token | Mobile | Desktop |
|-------|--------|---------|
| `section-xs` | `py-10` (40px) | `py-16` (64px) |
| `section-sm` | `py-12` (48px) | `py-20` (80px) |
| `section-md` | `py-16` (64px) | `py-24` (96px) |
| `section-lg` | `py-20` (80px) | `py-32` (128px) |
| `section-hero` | `pt-24 pb-16` | `pt-40 pb-32` |

Rule: every marketing section uses one of these five; adjacent sections never both use `lg`. Add hairline dividers via `border-t border-subtle` when background alternates (background ↔ background-alt).

---

## 4. Grid System

- **12-column** grid at ≥1024px; 6 effective columns 640–1023; 4 at <640.
- Fluid, gap-based: `gap-6` (24px) default; `gap-8` for large cards.
- Columns collapse: cards reflow, two-column features stack below `lg`.
- Dashboard: `grid-cols-1 md:grid-cols-2 xl:grid-cols-4` for stat cards; content area `grid-cols-12` with `col-span-*`.
- Use `auto-rows` + `dense` sparingly; prefer explicit spans for predictable reading order.
- Never use fixed px widths for columns; always fluid fractions (`lg:grid-cols-3`).

---

## 5. Border Radius

Premium but restrained — soft corners, nothing pill-shaped except badges/pills/avatars.

| Token | Radius | Component |
|-------|--------|-----------|
| `radius-sm` | 8px | Checkboxes, radio dots, small badges, tooltips |
| `radius-md` | 12px | Buttons, inputs, selects, toggles, segmented controls |
| `radius-lg` | 16px | Default cards, feature cards, dropdown menus |
| `radius-xl` | 20px | Large cards, pricing cards, portfolio cards |
| `radius-2xl` | 24px | Modals, drawers, hero feature panels, stat cards |
| `radius-full` | 999px | Pills, avatars, badges, round icon buttons |

Rules: one radius family per component type (no mixing lg on a button). Hover elevation changes shadow, never radius. Radius does not shrink below `md` on mobile except density-constrained tables/inputs may use `md`.

---

## 6. Shadow System

Three-plus-two tiers. Only transform/opacity/box-shadow animate — never `filter` (blur) on hover (jank).

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-soft` | `0 1px 2px rgb(12 15 20 / 0.04), 0 4px 16px rgb(12 15 20 / 0.06)` | Default cards at rest |
| `shadow-md` | `0 2px 4px rgb(12 15 20 / 0.05), 0 8px 24px rgb(12 15 20 / 0.08)` | Dropdowns, popovers, subtle emphasis |
| `shadow-lg` | `0 4px 8px rgb(12 15 20 / 0.06), 0 16px 40px rgb(12 15 20 / 0.12)` | Large cards, pricing highlight |
| `shadow-floating` | `0 8px 16px rgb(12 15 20 / 0.08), 0 32px 64px rgb(12 15 20 / 0.18)` | Hover elevation, hero floating cards |
| `shadow-modal` | `0 4px 12px rgb(12 15 20 / 0.12), 0 48px 96px rgb(12 15 20 / 0.28)` | Modals, drawers, lightbox |
| `shadow-glass` | `0 8px 32px rgb(0 102 255 / 0.12), inset 0 1px 0 var(--glass-highlight)` | Glass surfaces (paired with blur) |
| `shadow-glow` | `0 0 0 1px rgb(0 102 255 / 0.2), 0 0 24px rgb(0 102 255 / 0.25)` | Primary hover glow (buttons, focus CTAs) |

Dark mode shadows: increase opacity of `rgb(0 0 0)` base (e.g., `/0.4`) — light shadows look wrong on dark.

---

## 7. Glassmorphism Guidelines

Premium glass: soft blur + subtle border + inner highlight. Used for navbars, floating hero cards, stat chips, modals on imagery.

```css
.glass {
  background: rgb(var(--glass-bg));
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  backdrop-filter: blur(20px) saturate(1.8);
  border: 1px solid rgb(var(--glass-border));
  box-shadow: var(--shadow-glass);
}
.glass::before { /* top edge highlight */
  content: "";
  position: absolute; inset-inline: 8px; top: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgb(var(--glass-highlight)), transparent);
}
```

| Spec | Value |
|------|-------|
| Backdrop blur | 20–24px (`blur(20px)` surfaces, 24px heavy) |
| Transparency | light: 62% bg / dark: 58% bg |
| Saturation boost | `saturate(1.8)` for vibrancy |
| Border | 1px translucent (`white/55` light, `white/10` dark) |
| Inner highlight | 1px top-edge light gradient |
| Shadow | `shadow-glass` |

**Fallback**
```css
@supports not (backdrop-filter: blur(1px)) {
  .glass { background: rgb(var(--surface) / 0.98); border-color: rgb(var(--border)); }
}
```

**Performance considerations**
- Glass only over still or slow-moving content. Avoid glass over full-viewport scrolling imagery (blur cost).
- Limit live glass layers to ~2 per viewport; hero orbs should be *behind* solid sections, not under glass everywhere.
- Prefer `backdrop-blur-md/lg` utilities; use `will-change: backdrop-filter` only during entry animations, remove after.
- On Safari <16.4 test `saturate` — a known crash trigger; keep glass simple on iOS.
- Reduced-motion: keep glass, but skip the entry blur transition.

**When NOT to use glass:** body copy readability (use solid surface), dense dashboard tables, anywhere behind it scrolls with interactive content.
