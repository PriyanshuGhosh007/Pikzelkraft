# 07 — Hero, Dashboards, Responsive Rules, Icons

## 1. Hero Section (world-class spec)

### Layout
- Full-bleed, centered (or 60/40 split with a product visual on `xl`). Section padding: `section-hero` (`pt-40 pb-32` desktop).
- Stack: eyebrow → headline → subheadline → CTA row → trust strip → stats. Content `max-w-[720px]` centered, `text-center`.

### Elements

| Element | Spec |
|---------|------|
| **Eyebrow** | `Label` (12px/600 uppercase, 0.08em), `px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200` |
| **Headline** | `text-display-xl`; word-mask reveal, 800ms stagger 100ms; key phrase uses `bg-[--gradient-text] bg-clip-text text-transparent` |
| **Subheadline** | `text-body-lg text-(--ink-muted) max-w-[560px] mx-auto`, fadeUp 600ms @150ms |
| **Primary CTA** | Primary-gradient button, magnetic + ripple + arrow-slide icon |
| **Secondary CTA** | Outline button, "See our work" → portfolio |
| **Trust badges** | Below CTAs: "Trusted by 120+ brands" + client logo row (grayscale → color on hover); `fadeUp` @600ms |
| **Statistics** | 3–4 JetBrains Mono counters (e.g., 120+ clients, 98% retention, 15 yrs, 4.9 rating) — count-up 1.2s spring, `tabular-nums` |
| **Background** | `--gradient-mesh`: radial `primary-500/25` + `violet-500/15` + `cyan-400/20` blurred blobs, 40vw, drifting 8–12s; fine grid pattern overlay `bg-[linear-gradient(...)]` at 3% opacity |
| **Floating elements** | 2 glass stat/card chips floating with `y` ±12px 5s alternate; positioned clear of text; `pointer-events-none`, hidden below `lg` |
| **Mouse parallax** | orbs/visual translate ±20px via `useScroll`+`useTransform`, spring `{stiffness:40,damping:20}` |
| **Scroll indicator** | centered bottom: mouse outline + animated dot (`y 0→8px` 1.5s infinite) or thin line `scaleY`; hidden below `md` |

### Motion sequencing (mount)
Heading 0ms · sub 150ms · CTAs 300ms · trust 600ms · stats 750ms · scroll-indicator 900ms.

### Performance
Orbs `will-change: transform`; gradient mesh as `::before` (single paint); all blur static (no animated blur); reduced-motion renders final static frame instantly.

---

## 2. Dashboard Design System

### Shell
- Sidebar 264px (collapsible 72px) | top bar 64px (breadcrumb/global search/bell/avatar) | content area `bg-background` with `p-6 lg:p-8`.
- Client vs Admin share the shell; differ in nav items + widgets.

### Navigation (differences)
| Client | Admin |
|--------|-------|
| Overview, My Projects, Payments, Invoices, Support, Notifications, Settings | Analytics, Clients, Leads, Projects, Services, Portfolio, Pricing, FAQs, Contact Forms, Support, Settings |

### Layout grid
- **KPI row:** `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6`.
- **Main + aside:** content `xl:grid-cols-[1fr_360px]` — main panel (table/chart) + aside (activity/notifications/quick actions).
- **Charts:** `h-64` area chart, `h-72` bar chart; cards `rounded-2xl border shadow-soft`.

### KPI / stat card
Label 12px muted · value `text-3xl font-semibold font-mono tabular-nums` · delta chip (`↑ 12.4%` success / `↓ 3.1%` error) · sparkline right.

### Widgets inventory
Revenue graph · leads funnel · projects by status (donut) · top services (bars) · recent activity timeline · notifications panel · upcoming milestones (calendar dots) · payment history table · support ticket queue · client table (search/filter/paginate) · quick actions.

### Interaction patterns
- Global search `⌘K` command palette (Pages + Projects + Clients + Actions).
- Tables: sort, filter chips, bulk select bar, pagination.
- Row actions in ghost icon menu (`MoreHorizontal`).
- Filters panel in right drawer (`SlidersHorizontal`).
- Status changes via inline chip dropdown (admin).

### Empty/loading states
Every widget ships skeleton + empty state. Payments empty → "No payments yet" + "Make a payment" CTA.

---

## 3. Responsive Design Rules

### Breakpoints
| Name | Min-width | Layout behavior |
|------|-----------|-----------------|
| `xs` | — (<640) | Mobile-first; single column; nav → drawer; section padding halved |
| `sm` | 640px | 2-col stat grids; forms widen to 448px |
| `md` | 768px | Nav full (mega menu available); 2-col features |
| `lg` | 1024px | 3-col grids; sidebar visible on dashboards; hero 60/40 split |
| `xl` | 1280px | 4-col stat grids; content max container-2xl |
| `2xl` | 1536px | Container capped 1280px; larger display type via clamp |
| `landscape` | `@media (orientation: landscape) and (max-height: 480px)` | Reduce hero `pt`, ensure content fits viewport without scroll; compact nav |
| `huge` | ≥1920px | Center content, keep 1280px container; ambient bg fills viewport |

### Universal rules
- Mobile-first authoring; every component verified at 375px.
- Touch targets ≥ 44px (44x44 hit area) — `p-3` buttons if icon-only.
- Fluid type via `clamp` (no step jumps); fluid spacing via scale tokens + breakpoint overrides.
- Dashboards: tables → horizontal scroll (`overflow-x-auto`) below `lg`, never squeeze; sidebar → drawer below `lg`.
- Hero floating elements + parallax disabled below `lg`; magnetic/tilt disabled on touch (`(pointer: coarse)`).
- Test matrix: 320 / 375 / 390 / 768 / 1024 / 1280 / 1440 / 1920.

---

## 4. Icons (Lucide React)

| Rule | Value |
|------|-------|
| Library | `lucide-react` only (tree-shaken, consistent) |
| Default size | `20px` (dashboard UI + buttons) |
| Marketing emphasis | `24px` |
| Small/dense | `16px` (tables, badges, breadcrumbs, toggles) |
| Stroke width | `1.75` default, `2` for 16px dense, `2.5` for filled state icons (none used) |
| Corners | `stroke-linecap="round" stroke-linejoin="round"` (Lucide default) |
| Icon+label gap | `8px` (`gap-2`) |
| Icon button | 40px box, icon 20px, ghost fill on hover |
| Alignment | icons vertically center with text (`inline-flex items-center`) |
| Semantic | status icons use semantic colors; informational icons `--ink-muted` |

Usage rules: one icon per action; no icon in inline body text except bullets; decorative icons `aria-hidden="true"`; meaning-bearing icons paired with visible labels (no icon-only meaning).
