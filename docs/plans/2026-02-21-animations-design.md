# Animation System Design — Custom Magnetic Pins Homepage

**Date:** 2026-02-21
**Status:** Approved

## Overview

Add a rich, bold animation layer to the homepage using Motion (v11) alongside existing Tailwind CSS utilities. The goal is a high-energy, conversion-focused experience — fast reveals with momentum, dramatic parallax depth, and strong hover interactions.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Animation library | `motion` (Motion v12) | Best-in-class React animation, scroll-linked support, gesture support |
| Strategy | Hybrid (Motion + Tailwind) | Motion for complex effects; Tailwind for simple micro-interactions |
| Approach | Section-by-section Motion wrapping | Modular, self-contained, easy to maintain |
| Personality | Bold & dynamic | Fast reveals, strong hover lifts, dramatic parallax |

## System Foundation

### Installation

```bash
npm install motion
```

### Core Easing

```ts
// Bold expo-out: fast in, smooth landing
export const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const;
```

### Reusable Variants

```ts
// Fade up reveal — used by all section headers and content blocks
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO_OUT } },
};

// Stagger container — wraps lists of children
export const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Slide from left / right — used for side-by-side comparisons
export const slideLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_EXPO_OUT } },
};

export const slideRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_EXPO_OUT } },
};
```

### Hover Spring Config

```ts
export const HOVER_SPRING = { type: "spring", stiffness: 400, damping: 25 } as const;
```

### Tailwind stays for

- Button `hover:scale-[1.02] transition-all`
- `hover:bg-*` color transitions
- `transition-colors` on links

---

## Per-Section Animation Specs

### 1. HeroSection

**Trigger:** Mount (no scroll trigger — it's the first section)

- Badge, H1, paragraph, buttons, trust items: sequential stagger (`y: 40, opacity: 0` → `y: 0, opacity: 1`), `staggerChildren: 0.1`
- Product image: `scale: 0.95, opacity: 0` → `scale: 1, opacity: 1` with `delay: 0.2` after text stagger completes
- Corner decorative lines: SVG `pathLength: 0` → `1` on mount
- Background radial gradient layer: `useScroll` + `useTransform` drift `y: 0 → 30px` (subtle depth as user begins scrolling)

### 2. TrustStrip

**Trigger:** `whileInView`, `once: true`, `amount: 0.3`

- Trust items stagger left→right: `x: -20, opacity: 0` → `x: 0, opacity: 1`, `staggerChildren: 0.08`

### 3. HowItWorks

**Trigger:** `whileInView`, `once: true`, `amount: 0.2`

- Step cards: `y: 60, opacity: 0` → `y: 0, opacity: 1`, staggered
- Step number circles: `scale: 0` → `scale: 1` spring pop after card arrives (`delay: 0.15`)
- Connector lines between steps: `scaleX: 0` → `scaleX: 1` after preceding card animates in

### 4. WhyMagnetic

**Trigger:** `whileInView`, `once: true`, `amount: 0.2`

- Section header: parallax drift `y: -20px` as section scrolls through viewport
- Needle card: `x: -60, opacity: 0` → `x: 0, opacity: 1`
- Magnetic card: `x: +60, opacity: 0` → `x: 0, opacity: 1`
- List items inside each card: stagger in `delay: 0.15` after parent card arrives

### 5. CustomerExamples

**Trigger:** `whileInView`, `once: true`, `amount: 0.15`

- Cards: `y: 50, opacity: 0` → `y: 0, opacity: 1`, `staggerChildren: 0.1`
- `whileHover`: `y: -10, scale: 1.03`, spring physics
- Box-shadow intensification on hover via CSS variable driven by `useMotionValue`

### 6. PricingSection

**Trigger:** `whileInView`, `once: true`, `amount: 0.2`

- Cards stagger in: `y: 50, opacity: 0` → `y: 0, opacity: 1`
- Popular card: continuous breathing pulse `scale: 1 → 1.01`, `repeat: Infinity, repeatType: "reverse"`, `duration: 2`
- All cards: `whileHover: { y: -8 }`, spring

### 7. UseCases

**Trigger:** `whileInView`, `once: true`, `amount: 0.15`

- Grid cards: row-based stagger delay for diagonal feel
- `whileHover`: teal bottom-border reveal via `scaleX: 0 → 1` on a `motion.div` inside the card

### 8. FAQSection

**Trigger:** `whileInView`, `once: true`, `amount: 0.2`

- FAQ items stagger in: `y: 30, opacity: 0` → `y: 0, opacity: 1`
- Accordion content: `AnimatePresence` + `motion.div` with `height: 0 → "auto"` + `opacity: 0 → 1` for smooth open/close

### 9. FinalCTA

**Trigger:** `whileInView`, `once: true`, `amount: 0.3`

- Background burst shape: `scale: 0.8, opacity: 0` → `scale: 1, opacity: 1`
- Headline: bold `y: 60, opacity: 0` → `y: 0, opacity: 1`
- CTA button: `whileHover` magnetic pull effect tracking mouse offset via `useMotionValue` + `useTransform`

---

## File Organization

Animation constants live in a shared file:

```
constants/
  animations.ts   ← EASE_EXPO_OUT, fadeUpVariants, staggerContainerVariants, HOVER_SPRING, etc.
```

Each section component imports only the variants it uses. No animation logic lives inline in JSX.

## Performance Notes

- All `whileInView` use `once: true` — animations do not replay on scroll-back
- Parallax uses `useScroll({ target: ref })` scoped to each section — no global scroll listeners
- `will-change: transform` applied automatically by Motion where needed
- Reduced motion: wrap all `motion.*` usage with `useReducedMotion()` check — fall back to instant opacity transitions
