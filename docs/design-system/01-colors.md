# 01 — Color System

Primary `#0066FF` · Secondary `#FFFFFF` · Accent `#0A0A0A`

All tokens are CSS variables (RGB triplets so Tailwind can apply alpha). Light and dark themes swap values at the same variable names — components never hardcode colors.

---

## 1. Primary — Brand Blue (hue 216)

The brand signature. Use for primary actions, links, active states, and gradient starts.

| Token | Value |
|-------|-------|
| `--primary-50`  | `240 246 255`  `#F0F6FF` |
| `--primary-100` | `223 235 255`  `#DFEBFF` |
| `--primary-200` | `190 215 255`  `#BED7FF` |
| `--primary-300` | `146 188 255`  `#92BCFF` |
| `--primary-400` | `95 156 255`   `#5F9CFF` |
| `--primary-500` | `46 127 255`   `#2E7FFF` |
| `--primary-600` | `0 102 255`    `#0066FF` |
| `--primary-700` | `0 82 209`     `#0052D1` |
| `--primary-800` | `0 67 168`     `#0043A8` |
| `--primary-900` | `6 55 127`     `#06377F` |
| `--primary-950` | `4 35 79`      `#04234F` |

**Usage rules**
- `primary-600` — buttons, gradients, active/focus, large text, UI emphasis.
- `primary-700` — body-size text on white (AA contrast: ~6.6:1). **Never use 600 for body text.**
- `primary-500` — links on dark surfaces; hover of primary-600 buttons.
- `primary-50–200` — soft fills, selection, focus rings, tinted backgrounds.

---

## 2. Neutral Scale — Slate with a cool hint

Structure and hierarchy. The cool tint keeps it technology-focused next to the brand blue.

| Token | Value |
|-------|-------|
| `--neutral-50`  | `248 249 251`  `#F8F9FB` |
| `--neutral-100` | `238 241 246`  `#EEF1F6` |
| `--neutral-200` | `226 231 239`  `#E2E7EF` |
| `--neutral-300` | `203 211 224`  `#CBD3E0` |
| `--neutral-400` | `156 168 186`  `#9CA8BA` |
| `--neutral-500` | `110 122 142`  `#6E7A8E` |
| `--neutral-600` | `80 91 109`    `#505B6D` |
| `--neutral-700` | `61 70 84`     `#3D4654` |
| `--neutral-800` | `39 46 57`     `#272E39` |
| `--neutral-900` | `24 29 37`     `#181D25` |
| `--neutral-950` | `12 15 20`     `#0C0F14` |

---

## 3. Accent & Ink

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--accent` | `10 10 10` `#0A0A0A` | `255 255 255` | Brand accent — headings, logo, dark CTA surfaces |
| `--ink` | `24 29 37` `#181D25` | `247 248 250` | Primary text color |
| `--ink-muted` | `110 122 142` `#6E7A8E` | `156 168 186` | Secondary text (AA on surface) |
| `--ink-faint` | `156 168 186` `#9CA8BA` | `110 122 142` | Placeholder, captions, disabled text |

---

## 4. Surfaces & Backgrounds

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | `255 255 255` | `10 11 13` `#0A0B0D` | Page background |
| `--background-alt` | `246 248 252` `#F6F8FC` | `15 17 20` `#0F1114` | Alternating sections, subtle fills |
| `--surface` | `255 255 255` | `20 22 28` `#14161C` | Cards, panels, dropdowns |
| `--surface-muted` | `248 249 251` | `28 30 36` `#1C1E24` | Subtle card fill, table striping, hover fills |
| `--surface-raised` | `255 255 255` | `26 29 36` `#1A1D24` | Modals, floating menus, elevated cards |

---

## 5. Glass Backgrounds

| Token | Light | Dark |
|-------|-------|------|
| `--glass-bg` | `255 255 255` @ 0.62 | `20 22 28` @ 0.58 |
| `--glass-border` | `255 255 255` @ 0.55 | `255 255 255` @ 0.10 |
| `--glass-highlight` | `255 255 255` @ 0.8 (top edge) | `255 255 255` @ 0.06 (top edge) |

Apply via the `.glass` utility (see `03-spacing-radius-shadows.md`).

---

## 6. Borders & Dividers

| Token | Light | Dark |
|-------|-------|------|
| `--border` | `226 231 239` `#E2E7EF` | `42 47 58` `#2A2F3A` |
| `--border-strong` | `203 211 224` `#CBD3E0` | `58 64 78` `#3A404E` |
| `--border-subtle` | `238 241 246` `#EEF1F6` | `26 29 36` `#1A1D24` |
| `--border-primary` | `190 215 255` `#BED7FF` | `46 127 255` @ 0.4 |
| `--border-focus` | `0 102 255` @ 0.5 | `95 156 255` @ 0.6 |

---

## 7. Semantic Colors

| Token | Value | Soft BG | Text (AA) |
|-------|-------|---------|-----------|
| `--success` | `16 185 129` `#10B981` | `236 253 245` `#ECFDF5` | `4 120 87` `#047857` |
| `--warning` | `245 158 11` `#F59E0B` | `255 251 235` `#FFFBEB` | `180 83 9` `#B45309` |
| `--error` | `239 68 68` `#EF4444` | `254 242 242` `#FEF2F2` | `185 28 28` `#B91C1C` |
| `--info` | `59 130 246` `#3B82F6` | `239 246 255` `#EFF6FF` | `29 78 216` `#1D4ED8` |

Dark-mode semantic text tokens switch to the bright 400-values for contrast. Semantic components always pair a soft fill + dark text, never rely on the raw 500 value alone.

**Token set per semantic:** `--success` (500), `--success-soft`, `--success-text`, `--success-border`. Same pattern for `warning`, `error`, `info`.

---

## 8. Gradients

| Token | Value | Usage |
|-------|-------|-------|
| `--gradient-primary` | `linear-gradient(135deg, #0066FF 0%, #00C2FF 100%)` | Primary CTAs, hero orbs, progress fills |
| `--gradient-violet` | `linear-gradient(135deg, #0066FF 0%, #8B5CF6 100%)` | Secondary accents, feature highlights |
| `--gradient-warm` | `linear-gradient(135deg, #F59E0B 0%, #FF6B6B 100%)` | Warnings / promotions (rare) |
| `--gradient-text` | `linear-gradient(120deg, #0066FF, #00C2FF)` | Animated headline highlights (large text only) |
| `--gradient-mesh` | radial-combination (see hero) | Hero background mesh |

---

## 9. Hover, Disabled, Overlay, Focus

| Token | Value | Usage |
|-------|-------|-------|
| `--hover-primary` | `primary-700` / dark: `primary-500` | Primary button hover |
| `--hover-subtle` | `neutral-100` / dark: `neutral-800` | Ghost/secondary hover fill |
| `--disabled-bg` | `neutral-200` / dark: `neutral-800` | Disabled controls |
| `--disabled-text` | `neutral-400` / dark: `neutral-600` | Disabled text |
| `--disabled-opacity` | `0.5` | Additional disabled opacity |
| `--overlay` | `10 10 10` @ 0.5 | Modal scrim |
| `--overlay-light` | `10 10 10` @ 0.3 | Menu / drawer scrim |
| `--overlay-heavy` | `10 10 10` @ 0.7 | Lightbox / image view |
| `--ring-focus` | `0 102 255` @ 0.25 | `2px` focus ring + `2px` offset |

---

## 10. Dark Mode Mapping

Dark mode is **token inversion**, not a different palette. The brand blue stays the same; surfaces, neutrals, and text swap. Toggle via `data-theme="dark"` on `<html>` (class strategy in Tailwind).

**Dark surface hierarchy (light → dark):**
- background: white → `#0A0B0D`
- surface: white → `#14161C`
- surface-raised: white → `#1A1D24`
- border: `#E2E7EF` → `#2A2F3A`

---

## 11. Contrast & Accessible Usage

- Primary body text: `#181D25` on white — AA (13.9:1).
- Muted text: `#6E7A8E` on white — AA at 14px+ (4.6:1). Use for secondary only.
- Primary-600 `#0066FF` on white — 3.5:1 → **large text (24px+/18.5px bold) and UI graphics only.** Body text uses primary-700 `#0052D1` (6.6:1).
- White on primary-600 — 3.5:1 → button text is 15px medium (bumped to 600 weight + 0.01em) per WCAG UI-component exception; **large CTAs use primary-700 or the 600→700 hover gradient** to exceed 4.5:1.
- Semantic states never communicate by color alone — always pair an icon and/or label.

---

## 12. CSS Variables (root + dark)

```css
:root {
  /* Primary */
  --primary-50: 240 246 255;  --primary-100: 223 235 255;
  --primary-200: 190 215 255; --primary-300: 146 188 255;
  --primary-400: 95 156 255;  --primary-500: 46 127 255;
  --primary-600: 0 102 255;   --primary-700: 0 82 209;
  --primary-800: 0 67 168;    --primary-900: 6 55 127;
  --primary-950: 4 35 79;

  /* Neutral */
  --neutral-50: 248 249 251;  --neutral-100: 238 241 246;
  --neutral-200: 226 231 239; --neutral-300: 203 211 224;
  --neutral-400: 156 168 186; --neutral-500: 110 122 142;
  --neutral-600: 80 91 109;   --neutral-700: 61 70 84;
  --neutral-800: 39 46 57;    --neutral-900: 24 29 37;
  --neutral-950: 12 15 20;

  /* Ink & accent */
  --accent: 10 10 10;
  --ink: 24 29 37;
  --ink-muted: 110 122 142;
  --ink-faint: 156 168 186;

  /* Surfaces */
  --background: 255 255 255;
  --background-alt: 246 248 252;
  --surface: 255 255 255;
  --surface-muted: 248 249 251;
  --surface-raised: 255 255 255;

  /* Borders */
  --border: 226 231 239;
  --border-strong: 203 211 224;
  --border-subtle: 238 241 246;
  --border-primary: 190 215 255;
  --border-focus: 0 102 255 0.5;

  /* Semantic */
  --success: 16 185 129;   --success-soft: 236 253 245;  --success-text: 4 120 87;   --success-border: 110 231 183;
  --warning: 245 158 11;   --warning-soft: 255 251 235;  --warning-text: 180 83 9;   --warning-border: 252 211 77;
  --error: 239 68 68;      --error-soft: 254 242 242;    --error-text: 185 28 28;    --error-border: 252 165 165;
  --info: 59 130 246;      --info-soft: 239 246 255;     --info-text: 29 78 216;     --info-border: 147 197 253;

  /* Glass */
  --glass-bg: 255 255 255 0.62;
  --glass-border: 255 255 255 0.55;
  --glass-highlight: 255 255 255 0.8;

  /* Hover / disabled / overlay */
  --hover-primary: 0 82 209;
  --hover-subtle: 238 241 246;
  --disabled-bg: 226 231 239;
  --disabled-text: 156 168 186;
  --disabled-opacity: 0.5;
  --overlay: 10 10 10 0.5;
  --overlay-light: 10 10 10 0.3;
  --overlay-heavy: 10 10 10 0.7;
  --ring-focus: 0 102 255 0.25;
}

[data-theme="dark"] {
  --accent: 255 255 255;
  --ink: 247 248 250;
  --ink-muted: 156 168 186;
  --ink-faint: 110 122 142;

  --background: 10 11 13;
  --background-alt: 15 17 20;
  --surface: 20 22 28;
  --surface-muted: 28 30 36;
  --surface-raised: 26 29 36;

  --border: 42 47 58;
  --border-strong: 58 64 78;
  --border-subtle: 26 29 36;
  --border-primary: 46 127 255 0.4;
  --border-focus: 95 156 255 0.6;

  --glass-bg: 20 22 28 0.58;
  --glass-border: 255 255 255 0.10;
  --glass-highlight: 255 255 255 0.06;

  --hover-primary: 46 127 255;
  --hover-subtle: 39 46 57;
  --disabled-bg: 39 46 57;
  --disabled-text: 110 122 142;

  --success-text: 52 211 153; --success-soft: 6 33 26;
  --warning-text: 251 191 36; --warning-soft: 36 27 4;
  --error-text: 248 113 113;  --error-soft: 38 8 8;
  --info-text: 96 165 250;    --info-soft: 8 23 46;
}
```

Gradients are defined in `reference/globals.css` as CSS properties and consumed by the `.bg-gradient-*` utilities in the Tailwind config.
