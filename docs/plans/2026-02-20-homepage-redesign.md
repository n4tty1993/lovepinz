# Homepage Redesign — Confetti Pop Visual Language

**Date:** 2026-02-20
**Status:** Approved

---

## Overview

Full visual redesign of the existing homepage. Replaces the dark black + gold theme with a light, joyful, celebratory "Confetti Pop" palette. Goal: make the site feel like a celebration — perfect for weddings, events, and creative merch drops — while remaining clean, readable, and scalable to all future pages.

This design document serves as the visual language spec for the entire site going forward.

---

## Visual Language

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--brand-white` | `#FFFFFF` | Primary section backgrounds |
| `--brand-cream` | `#FFF9F4` | Alternating section tint, footer |
| `--brand-peach` | `#FFF0E8` | Warm accent sections (Trust Strip, Pricing) |
| `--brand-sage` | `#EDF5EA` | Soft contrast sections (How It Works, Use Cases) |
| `--brand-champagne` | `#F0C060` | Primary CTA color, accents, highlights |
| `--brand-champagne-hover` | `#D4972A` | Button hover, strong accent |
| `--brand-text` | `#2C1A0E` | Dark warm-brown body text (replaces pure black) |
| `--brand-muted` | `#7A6458` | Secondary / muted text |

### Typography

- **Font:** Geist Sans (already installed via `next/font/google`)
- **Headlines:** `font-bold tracking-tight` — large sizes read playful and confident
- **Key accent words** in headlines: champagne text (`text-[#F0C060]`) or champagne underline bar
- **Body:** Regular weight, `text-[#2C1A0E]` warm brown — warmer than pure black

### Component Style

- **Border radius:** `rounded-2xl` (16px) on cards; `rounded-full` on badges/pills/icon wells
- **Shadows:** `shadow-sm` with `shadow-amber-100/60` tint — warm, soft glow
- **Hover on cards:** `hover:scale-[1.03] transition-transform duration-200`
- **Hover on buttons:** `hover:bg-[#D4972A]` champagne darkens to amber

---

## Section Rhythm

Sections alternate backgrounds so no two neighbors share the same color:

| # | Section | Background |
|---|---|---|
| — | Navbar | White `#FFFFFF` (subtle shadow on scroll) |
| 1 | Hero | White `#FFFFFF` |
| 2 | Trust Strip | Peach `#FFF0E8` |
| 3 | How It Works | Sage `#EDF5EA` |
| 4 | Why Magnetic | Cream `#FFF9F4` |
| 5 | Customer Examples | White `#FFFFFF` |
| 6 | Pricing | Peach `#FFF0E8` |
| 7 | Use Cases | Sage `#EDF5EA` |
| 8 | FAQ | White `#FFFFFF` |
| 9 | Final CTA | **Champagne `#F0C060`** — bold color burst |
| — | Footer | Cream `#FFF9F4` |

---

## Section Specs

### Navbar
- White background from the start (no dark transparent phase)
- On scroll: subtle `shadow-sm` appears (no background color change needed)
- Logo: "Magnetic**Pins**" — warm brown text, bold last word
- Nav links: warm brown, champagne underline on hover
- CTA button: champagne filled (`bg-[#F0C060]`), warm-brown text, `rounded-full`

### 1. Hero Section
- White background, `min-h-screen`
- Eyebrow badge: peach pill `bg-[#FFF0E8]` with champagne border, small icon + "Custom Magnetic Pins"
- Headline: `"Design Your Own Magnetic Pins"` — warm brown, bold, large. "Magnetic" in champagne text
- Subheadline: warm muted brown `text-[#7A6458]`
- CTAs: primary = champagne filled `rounded-full` large; secondary = peach outlined `rounded-full`
- Image placeholder: warm peach gradient `from-[#FFF0E8] to-[#FFE0C8]`, `rounded-3xl`, decorative champage-tinted border

### 2. Trust Strip
- Peach `bg-[#FFF0E8]` band
- 4 items with champagne checkmark icons (`text-[#F0C060]`)
- Warm brown text

### 3. How It Works
- Sage `bg-[#EDF5EA]` section
- 3 white cards `bg-white rounded-2xl shadow-sm shadow-amber-100/60`
- Step number: champagne filled circle `bg-[#F0C060] rounded-full`
- Icon inside white circle above the number
- Step title: warm brown bold; description: muted

### 4. Why Magnetic
- Cream `bg-[#FFF9F4]` section
- Two comparison cards `bg-white rounded-2xl`
- Needle Pins: red/pink `text-red-400` X marks
- Magnetic Pins: champagne `text-[#F0C060]` check marks

### 5. Customer Examples
- White section
- 6-cell grid, `rounded-2xl` cards
- Placeholder gradients using the brand palette:
  - Peach-to-cream, sage-to-white, champagne-tint, etc.
- Hover: `scale-[1.03]`

### 6. Pricing Section
- Peach `bg-[#FFF0E8]` section
- 3 white cards `bg-white rounded-2xl`
- Popular tier: champagne ring `ring-2 ring-[#F0C060]` + "Most Popular" champagne badge
- CTA: champagne button

### 7. Use Cases
- Sage `bg-[#EDF5EA]` section
- 4 white `rounded-2xl` cards
- Icon wells: champagne tinted `bg-[#FFF0E8]` circle, icon in champagne
- Card hover: `scale-[1.03]`

### 8. FAQ Section
- White section
- shadcn Accordion
- Expand indicator: champagne `text-[#F0C060]`
- Open state: champagne left border `border-l-2 border-[#F0C060]`

### 9. Final CTA Section
- **Champagne background `bg-[#F0C060]`** — the bold color pop
- Headline and body text in warm brown `text-[#2C1A0E]`
- CTA button: **white** `bg-white text-[#2C1A0E] hover:bg-[#FFF9F4]` (inverted)
- Trust bullets with warm brown checkmarks

### Footer
- Cream `bg-[#FFF9F4]`
- Warm brown text, champagne hover on links
- Top border: `border-t border-[#F0C060]/20`

---

## Responsive Behavior

Unchanged from previous design — all multi-column grids collapse to 1–2 columns on mobile, hero stacks vertically, trust strip scrolls horizontally on very small screens.

---

## Accessibility

- All text on champagne backgrounds uses warm-brown `#2C1A0E` — passes WCAG AA (contrast ratio ~7:1)
- All text on peach/sage/cream backgrounds uses `#2C1A0E` — high contrast
- Champagne on white (`#F0C060` on `#FFFFFF`) is **decorative only** (icons, borders) — never body text
- Interactive elements remain keyboard-navigable
