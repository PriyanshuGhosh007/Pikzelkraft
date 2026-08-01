# 06 — Motion Design System (Framer Motion)

## 1. Principles

1. **Motion explains state, hierarchy, or progress.** Never decorative overload.
2. **One idea per view.** The hero animates; supporting sections use quiet reveals.
3. **Fast, confident, restrained.** Most transitions ≤ 300ms.
4. **GPU-only properties.** Animate `transform` and `opacity`; never `top/left/width/height/filter` in JS (CSS transitions may handle height via grid-template-rows trick).
5. **60fps.** Few concurrent animations; avoid animating large subtrees.
6. **`prefers-reduced-motion` respected** — via `useReducedMotion()` and CSS media query.

---

## 2. Global Specs

| Parameter | Value |
|-----------|-------|
| Base duration | 300ms |
| Fast | 150ms |
| Slow | 500ms |
| Display/hero | 700–900ms |
| Default easing | `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint-ish, "premium decelerate") |
| Enter easing | `[0.22, 1, 0.36, 1]` |
| Exit easing | `[0.4, 0, 1, 1]` |
| UI spring | `{ stiffness: 260, damping: 24 }` (buttons, chips) |
| Heavy spring | `{ stiffness: 90, damping: 18, mass: 1 }` (modals, drawers) |
| Scroll trigger | `viewport={{ once: true, amount: 0.2 }}` for sections, `0.3` for cards |
| Stagger | 60–80ms between siblings; 120ms between major blocks |
| Motion budget | max ~8 concurrent animated elements per viewport |

**Shared variants (in `lib/motion.ts`):**

```ts
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

export const stagger = (delay = 0.06) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

export const viewport = { once: true, amount: 0.2 };
```

---

## 3. Motion Catalog

### Directional / presence
| Motion | Spec | Used by |
|--------|------|---------|
| **Fade** | 400ms `fadeIn` | content swap, overlays |
| **Slide up** | `y: 24→0`, 600ms `fadeUp` | section reveal, cards |
| **Slide down** | `y: -24→0`, 400ms | dropdowns, sticky header content |
| **Slide left/right** | `x: ±32→0`, 500ms | panels, drawers, row reveals |
| **Scale** | `scale: 0.96→1`, 400ms | modals, popovers |
| **Rotate** | 180° chevrons, 250ms | accordions, expanders |

### Text reveal
| Motion | Spec |
|--------|------|
| **Line mask** | heading lines slide up from `y: 100%` inside `overflow-hidden`, 800ms stagger 100ms |
| **Word** | per-word `y: 40%→0` + opacity, 700ms stagger 60ms, premium display |
| **Letter** | per-letter `y: 60%→0`, 900ms stagger 24ms — hero display only (≤ 40 chars) |
| **Gradient sweep** | background-position of gradient-text, 3s ease infinite (CSS) |
| **Typewriter** | for terminal/terminal-style accents, mono font, 40ms/char |

### Numbers & counters
| Motion | Spec |
|--------|------|
| **Counter** | `useMotionValue` + `animate()` spring, 1.2s, `tabular-nums`, `format()` with ₹/%/K suffix |
| **Number swap** | billing toggle crossfade slide-up 250ms |

### Hover & gesture
| Motion | Spec |
|--------|------|
| **Hover lift** | `translateY(0→-4px)` 200ms ease-out (cards) |
| **Hover scale** | `scale 1→1.03` 300ms (images, pricing popular) |
| **Hover glow** | shadow/glow 200ms (buttons, feature tiles) |
| **Card elevation** | lift + `shadow-md` 250ms |
| **Card tilt** | 3D `rotateX/rotateY` ≤ 6deg, spring `{ stiffness: 150, damping: 15 }`, reset on leave; desktop + fine pointer only, off for `prefers-reduced-motion` and touch |
| **Image zoom** | `scale 1→1.08` 600ms inside `overflow-hidden` |
| **Magnetic** | translate ≤6px toward cursor, spring `{ stiffness: 120, damping: 15 }`; hero primary CTA only |
| **Mouse follow** | hero orbs translate ±20px opposite to cursor, spring `{ stiffness: 40, damping: 20 }`; disabled on touch |
| **Cursor glow** | 300px radial gradient following cursor (`position: fixed` div, spring), `pointer-events-none`, hidden on coarse pointers |

### Background & scroll
| Motion | Spec |
|--------|------|
| **Gradient animation** | `background-position` pan, 8–12s infinite ease-in-out (CSS, GPU-cheap) |
| **Parallax** | hero layer translate `useScroll` + `useTransform`, ±60px over first 600px scroll, `will-change: transform` |
| **Scroll progress** | top bar `scaleX` from `useScroll().scrollYProgress`, spring, 1px primary |
| **Navbar shrink** | height 64→56 + glass bg, `useScroll` 250ms; on scroll-up only (configurable) |

### Containers & structured
| Motion | Spec |
|--------|------|
| **Accordion** | `AnimatePresence`, height `0↔auto` 250ms ease, chevron rotate 250ms |
| **Tabs** | content fade + 8px slide 200ms; indicator `layoutId` 250ms spring |
| **Modal** | scrim fade 150ms, panel scale/translate 250ms; exit mirrored |
| **Drawer** | `x: ±100%→0` spring `{ stiffness: 260, damping: 30 }`, 300ms |
| **Toast** | in: slide-from-right+fade 250ms; out: slide-up+fade 250ms |
| **Skeleton** | CSS shimmer 1.8s infinite (paused under reduced-motion) |
| **Success check** | path draw 400ms + scale pop 250ms (spring) |
| **Error shake** | `x: 0,±6,∓6,0` 400ms on failed submit |

### Dashboard
| Motion | Spec |
|--------|------|
| **Widget** | `fadeUp` stagger 80ms on mount/in-view |
| **Progress** | width transition 600ms `cubic-bezier(0.22,1,0.36,1)` |
| **Chart** | pathLength 0→1 (1s), bar scaleY origin-bottom (500ms stagger 60ms), donut sweep 900ms |
| **Timeline** | node stagger 80ms; connector scaleY draw 400ms |
| **Table rows** | fade + 4px slide on page change 200ms (no stagger on >20 rows) |
| **Pagination** | content crossfade 200ms |

---

## 4. Page Transitions

- App Router: wrap route groups in `AnimatePresence mode="wait"` + `<motion.div key={pathname}>`.
- Transition: `opacity 0→1` + `y 8→0`, 300ms in / 200ms out; **fade-only** to keep LCP paint fast.
- Layout shifts guarded: never animate layout-affecting props; keep a stable top-level layout (navbar/footer static, only content fades).
- Loading screen (first visit only): branded logo draw + progress bar, max 1.2s, fades out 400ms; cached via session flag; skipped for `prefers-reduced-motion`.

---

## 5. Scroll Trigger Rules

- `viewport={{ once: true, amount: 0.2 }}` for most sections (reveal once).
- `amount: 0.3` for card grids to fire as a group; reserve per-card `whileInView` for sparse single-card layouts.
- Hero never waits for scroll — animate on mount with delays: heading 0s, sub 150ms, CTAs 300ms, trust 600ms, scroll-indicator 900ms.
- Below-fold sections: never pre-start animations before in-view (save CPU + avoid invisible animation).

---

## 6. Performance Optimization

- **GPU:** animate only `transform`/`opacity`; add `will-change: transform` to hero orbs + parallax layers only.
- **Lazy mount:** `lazyMotion` + `m` components (`framer-motion` `LazyMotion`/`domAnimation`) to code-split motion.
- **Batch:** group staggered children; max ~8 concurrent; pause heavy loops when tab hidden (`document.visibilitychange` → `motionState`).
- **Reduced data:** hero letter animation only on first mount, once.
- **Budget per viewport:** reveal ≥ 4 cards with one parent `whileInView` + stagger (not 4 independent observers).
- **Exit animations** only for modals/drawers/toasts; avoid AnimatePresence on whole lists.
- Verify with Performance panel: no long tasks >50ms caused by animation, FPS locked 60.
