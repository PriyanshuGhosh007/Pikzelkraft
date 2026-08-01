# 05 — Component Library

Every component: built from design tokens, accessible, has an empty/loading state, and one documented motion behavior (from `06-motion.md`).

---

## 1. Navbar

- Fixed/sticky; transparent on hero (over imagery) → **glass** once scrolled 8px (`shadow-soft` + `backdrop-blur-md`). Height 64px → 56px on scroll.
- Left: logo. Center/right: nav links (14px/500). Right: CTA button + mobile hamburger.
- Active link: primary text + 2px primary underline indicator (animated layoutId).
- Scroll-aware `bg` transition 250ms; shadow appears with scroll.
- **Mega menu** (Services): full-width glass panel `radius-xl`, 3-4 columns (service groups with icon, title, blurb), featured card at right; open on hover (desktop) with 120ms delay + click; close on Escape/outside. `aria-expanded`, `aria-controls`, `role="menu"` on the panel.
- Mobile: full-screen drawer, staggered link reveal, CTA at bottom.

---

## 2. Hero (see `07-hero-dashboard-responsive.md`)

---

## 3. Cards

**Base card:** `bg-surface border border-border rounded-xl shadow-soft p-6` — the default container everywhere. All cards share this DNA.

| Card | Radius | Extra |
|------|--------|-------|
| Feature card | `lg` | icon in `48px` rounded tile (primary-50 bg), hover `-translate-y-1 shadow-md` + icon tilt |
| Pricing card | `xl` | 3 tiers; middle = highlighted (`border-primary-600 shadow-floating` + badge); feature list with check icons |
| Portfolio card | `xl` | image `aspect-[4/3]` with overlay on hover (gradient + "View case study"), tags, category chip |
| Testimonial card | `lg` | `Quote` icon watermark, 5-star row, avatar+name+role footer |
| Stat card | `2xl` | JetBrains Mono number, delta arrow (up=success/down=error), sparkline optional |
| Profile card | `lg` | avatar, name, role, social icon row, CTA |
| Team card | `lg` | photo, hover overlay with role + socials, subtle zoom |
| Invoice card | `lg` | header row (invoice #, status badge), line items, total, "Download PDF" |

All cards: `overflow-hidden` when they contain media; hover motion = `hover-lift` unless it's a pricing card (`hover-scale`).

---

## 4. Pricing Card (marketing)

- Tiers: **Starter / Growth (popular) / Enterprise**. Popular tier visually larger (`lg:scale-[1.04]`) with gradient top border.
- Contents: name, price (`₹` in JetBrains Mono), billing note, feature list (check icons, non-included crossed out), CTA.
- Billing toggle (monthly/yearly) — switch component; price number animates (slide-up crossfade 250ms).
- "Most popular" badge: gradient pill top-center.
- Hover: `hover-scale` + glow shadow.

---

## 5. FAQ Accordion

- One open at a time by default; `border-b border-border` dividers; question = button (14px/600) with `ChevronDown` rotating 180°; panel animates height (`AnimatePresence` + `height: auto`, 250ms ease).
- Full keyboard support; `aria-expanded`; region `aria-controls`; question triggers stay in tab order.
- Category tabs above on mobile scrolls to groups on desktop.

---

## 6. Tabs

- Underline variant (marketing): pill `layoutId` indicator under active tab.
- Pill variant (dashboard): `bg-surface border` container, active tab `bg-primary-600 text-white`.
- Content fades/slides via `AnimatePresence` (`fadeIn` + 8px slide, 200ms).
- `role="tablist"` + arrow-key navigation, `aria-selected`, `tabindex` management.

---

## 7. Badges & Chips

- Sizes `h-6 px-2.5 text-caption` / `h-7 px-3 text-body-sm`. Radius `full`.
- Variants: neutral (`surface-muted`), primary (`primary-50 text-primary-700`), success/warning/error/info (soft pair), outline, gradient (premium/limited).
- Status semantics: Success=paid/active/completed; Warning=pending/in-progress; Error=failed/overdue; Info=new. Always icon+text for status chips (no color-only).

---

## 8. Modals

- `rounded-2xl shadow-modal`, max-w by context (sm 400 / md 480 / lg 640), header with title+description, close `Icon` button (top-right), footer action row right-aligned.
- Scrim: `bg-(--overlay)`, `backdrop-blur-sm`. Body scroll locked (`overflow-hidden` on html).
- Motion: fade scrim 150ms + scale/translate panel 250ms; exit mirrored.
- Focus trap + return focus to trigger; `role="dialog" aria-modal="true" aria-labelledby`.

---

## 9. Drawers

- From right (settings/filter) or left (mobile nav, dashboard sidebar).
- Width 320px mobile, 400px desktop; full-height; `rounded-l-2xl`; scrim `overlay-light`.
- Motion: `x: 100% → 0` spring (stiffness 260, damping 30), 300ms; slide-down variant for mobile sheets.
- Same a11y contract as modals.

---

## 10. Alerts (inline)

- `role="alert"`/`role="status"`; icon + title + optional description + dismiss (if dismissible). Radius `lg`, `border` with semantic border color, soft bg.
- Variants: success / warning / error / info per semantic token pair. No auto-dismiss for alerts (use toast).

---

## 11. Toasts

- Stack top-right (mobile: bottom, full-width minus gutters). `role="status"` (info/success) or `role="alert"` (error).
- Glass surface, `shadow-floating`, icon, message, optional action button.
- Motion: slide-in from right + fade 250ms; auto-dismiss 4s (errors persist); exit slide-up + fade. `aria-live` region for screen readers.
- Max 4 visible; new toasts queue.

---

## 12. Timeline (milestones / project progress)

- Vertical line with nodes; each node: status circle (completed=primary-600 check / current=primary-300 ring pulse / pending=neutral-300).
- Card rows with title, date, status chip, amount. Progress auto-calculated.
- Motion: nodes animate in sequentially (stagger 80ms); completed line draws (scaleY) 400ms.

---

## 13. Tables

- Header: 12px/600 uppercase, `text-(--ink-faint)`, `border-b border-border`. Rows: `border-b border-subtle`, hover `bg-(--hover-subtle)`.
- Cells `px-4 py-3 text-body-sm tabular-nums` for numerics. Status chips in cells. Action column: icon buttons (ghost).
- Sortable headers: arrow icon, `aria-sort`. Row selection: checkboxes + bulk bar. Empty: skeleton/empty state. Pagination below.
- Density: default 44px rows, compact 36px (`dense` prop) for admin lists.

---

## 14. Charts (dashboard)

- Line/area (revenue), bar (services), donut (leads by source), funnel (leads), sparklines (KPIs).
- Palette: primary-600, violet (`#8B5CF6`), success, warning, neutral-300 (grid).
- Grid lines neutral-200/40; axis text 12px `--ink-faint`; tooltip = glass card `shadow-md`.
- Motion: draw-in (pathLength 0→1, 1s) / bar rise (scaleY origin-bottom, 500ms stagger) / donut sweep; respect reduced-motion (render final state instantly).
- Empty: "No data" state with icon.

---

## 15. Progress Bars

- Track `h-2 bg-(--surface-muted) rounded-full`; fill `bg-primary-600` (gradient option). Value label JetBrains Mono 12px right-aligned.
- Animated width via `animate-progress` (width transition 600ms cubic-bezier). `role="progressbar" aria-valuenow`.

---

## 16. Skeletons

- Base: `bg-(--surface-muted)` with `animate-shimmer` (gradient sweep) OR `animate-pulse`.
- Shimmer via pseudo-element `background: linear-gradient(90deg, transparent, rgb(255 255 255/0.5), transparent)` — light/dark aware.
- Shape-matched skeletons for cards, tables (rows), charts (block), avatars (circle).
- Respect reduced-motion: fall back to static neutral fill.

---

## 17. Dashboard Widgets

- Stat card (KPI): label 12px, value Display 28px `tabular-nums`, delta chip, sparkline right.
- Activity feed: icon timeline rows (avatar/icon + text + time), "View all".
- Quick actions: ghost buttons grid. Calendar: month grid + event dots (primary). Notifications list: unread dot primary, read neutral.

---

## 18. Support Tickets / Notifications / Search (dashboards)

- **Ticket:** card rows with ID (`#PKZ-` + 5 digits, mono), subject, status chip, priority, assignee, updated time. Thread view: bubbles (user left, admin right), composer with attachment.
- **Notification:** grouped by day; row = icon/avatar, message, time; unread = primary dot + `bg-primary-50/40`; "Mark all read" + bell with count badge.
- **Search/Command palette:** `⌘K`; overlay glass panel; groups (Pages, Projects, Clients, Actions); arrow nav; `aria` combobox pattern.

---

## 19. States

| State | Pattern |
|-------|---------|
| **Empty** | centered icon in `48px` soft tile, title, description, CTA; `text-center` |
| **404** | giant "404" in Display 120px gradient-text, message, "Back home" primary CTA, subtle floating orbs |
| **Success** | check-circle animation (draw 400ms), title, summary, "Continue"/"Download" actions |
| **Error** | `AlertTriangle` red, title, retry + contact actions, safe to refresh |

---

## 20. Footer

- Background-alt; 4 columns (brand+blurb+socials / Services / Company / Contact); newsletter input; bottom bar: copyright, legal links, payment badges.
- **Reveal:** `fadeUp` on scroll with stagger 80ms. Brand column uses logo + tagline. Socials: icon ghost buttons.

---

## 21. Breadcrumb

- `nav aria-label="Breadcrumb"`; `text-body-sm text-(--ink-muted)`, separator `ChevronRight` 14px, current page `text-ink font-medium`. Trailing `/` via CSS per WCAG.

---

## 22. Pagination

- Buttons: 36px squares, active `bg-primary-600 text-white`, prev/next icon buttons, ellipsis `…`, `aria-current="page"`, first/last when large datasets.

---

## 23. Sidebar (dashboard)

- 264px fixed; collapsed 72px (icon-only). Sections with `Label` headings; items = icon + label, active `bg-primary-50 text-primary-700` + left indicator. Bottom: user card (avatar, name, role, logout).
- Motion: collapse width 250ms; active indicator slides (layoutId). Mobile: left drawer.
