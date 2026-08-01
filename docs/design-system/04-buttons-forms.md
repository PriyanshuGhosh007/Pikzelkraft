# 04 — Button & Form Systems

## 1. Button System

### Anatomy
- Height 44px (`h-11`) default, 36px (`h-9`) small, 52px (`h-13`) large.
- Padding `px-5` (comfort) / `px-4` (small); gap `space-2` icon↔label.
- Radius `md` (12px). Font: `text-button` (15px/600).
- Focus: `focus-visible:ring-2 ring-(--ring-focus) ring-offset-2 ring-offset-background`.

### Variants

| Variant | Default | Hover | Active | Notes |
|---------|---------|-------|--------|-------|
| **Primary** | `bg-primary-600 text-white` + subtle glow shadow | `bg-primary-700` + `shadow-glow` | `scale-[0.98]` | Default CTA; gradient option below |
| **Primary Gradient** | `bg-[--gradient-primary] text-white` | brightness-110 + glow | `scale-[0.98]` | Hero CTAs; `background-size` animated |
| **Secondary** | `bg-surface text-ink border border-border` | `border-strong bg-surface-muted` | `scale-[0.98]` | Neutral alternative |
| **Ghost** | `bg-transparent text-ink hover:bg-(--hover-subtle)` | subtle fill | `scale-[0.98]` | Toolbar, tertiary actions |
| **Outline** | `bg-transparent border-2 border-primary-600 text-primary-700` | `bg-primary-50` | `scale-[0.98]` | Alternative to primary in hero |
| **Danger** | `bg-error text-white` | `bg-(--error-text)` | `scale-[0.98]` | Destructive only |
| **Success** | `bg-success text-white` | `bg-(--success-text)` | `scale-[0.98]` | Confirm, "Pay now" |
| **Link** | `text-primary-700 underline-offset-4 decoration-2` | underline | — | Text link, arrow appears |
| **Icon** | 40px square, `bg-(--hover-subtle)` | fill + slight lift | `scale-95` | Toolbar, close, dropdown |
| **Floating** | 56px circle, `bg-primary-600 text-white shadow-floating` | `shadow-glow` | `scale-95` | FAB — bottom-right |

### States
- **Disabled:** `bg-(--disabled-bg) text-(--disabled-text) opacity-(--disabled-opacity) cursor-not-allowed` — no hover/focus; `aria-disabled` on real `<button>`.
- **Loading:** label hidden/`opacity-0`, spinner replaces icon: `<Loader2 className="animate-spin" />`; button `pointer-events-none`, keeps width (`min-w`) to avoid layout shift.
- **Focus:** visible `ring-2` always on keyboard focus (`:focus-visible`), never invisible focus.

### Animations
- **Hover lift:** `hover:-translate-y-0.5` + shadow transition 200ms — buttons only (cards use different motion).
- **Ripple:** a `.ripple` span scaling from click point (`keyframes ripple` 600ms ease-out, `pointer-events-none`). Ripple disabled when `prefers-reduced-motion`.
- **Magnetic** (hero/primary only): translate up to 6px toward cursor via spring; disabled on touch devices.
- **Transition spec:** `transition-[transform,background-color,box-shadow] duration-200 ease-out` — never all-properties.

---

## 2. Form System

### Field anatomy
Label (12px/600, `space-1` gap) → input → helper/error (13px). `space-5` vertical gap between fields. Fields full-width inside cards; labels always visible (no placeholder-as-label).

### Inputs / Textareas / Selects
- Height 44px; radius `md`; `border border-border bg-surface`; padding `px-4`.
- Default text `text-body-md`; placeholder `text-(--ink-faint)`.
- **Hover:** `border-strong`.
- **Focus:** `ring-2 ring-(--ring-focus) border-primary-600` (ring replaces border visually).
- **Error:** `border-error` + `ring-2 ring-(--error)/15`; helper text `text-error-text` with `AlertCircle` icon.
- **Success:** `border-success` + optional check icon; helper `text-success-text`.
- **Disabled:** `bg-(--disabled-bg) text-(--disabled-text) cursor-not-allowed`.
- **Icon-prefix inputs** (search, amount): leading `24px` icon in `--ink-faint`, text padding-left adjusted.

### Search
Rounded-full pill on marketing (`rounded-full`), rounded-md in dashboards; `⌘K` opens command palette; `Escape` clears focus; results panel `shadow-lg` with keyboard nav (ArrowUp/Down, Enter, Esc).

### Password
Toggle visibility button (`Eye`/`EyeOff`) inside trailing slot; `aria-label` announces state; caps-lock hint optional.

### OTP Input
`6` individual `48px` boxes; auto-advance on input; backspace to previous; `inputMode="numeric"` + `maxLength=1`; paste support across fields; focus ring on active box; container `role="group"` with `aria-label`.

### Date Picker
Native `<input type="date">` on mobile; custom calendar dropdown ≥640px with month grid, `aria-selected`, keyboard arrows; selected date `bg-primary-600 text-white`; today outlined.

### Checkbox / Radio
`18px` custom control; radius `sm` (checkbox) / full (radio); checked `bg-primary-600 border-primary-600` with white check/dot; focus `ring-2`; label 14px, clickable (wraps input); `aria-invalid` on error.

### Toggle
`44x24px` track, `20px` knob; checked `bg-primary-600`, knob translates 20px; `role="switch"` + `aria-checked`; transition 200ms; knob has `focus-visible:ring` on the track.

### Upload
Drag-and-drop zone: dashed `border-2 border-dashed border-border` radius `lg`, `48px` gap, icon + "Drop files or **browse**" — on drag `border-primary-600 bg-primary-50/50`; file list with size, status (`Uploading` spinner / `Done` check / error retry), remove button; hidden `<input type="file">`; validate type + size; `aria-describedby` for status; keyboard: zone is a focusable button.

### Validation behavior
- **On blur** for required/format fields; **on change** once touched (no live error before touch).
- Error message ≤ 2 lines: "What's wrong" + optional fix. Example: `Enter a valid email — name@company.com`.
- Submit shows button loading; on API error, inline alert at form top (`role="alert"`), field-level errors map to inputs.
- Honeypot field (marketing forms): visually hidden, `tabIndex={-1}`, `aria-hidden`; auto-filled bots are silently rejected server-side.

### Numeric input
`tabular-nums`; currency prefix (₹); group separators; clamp min/max; spinner-steppers optional (dashboard only).
