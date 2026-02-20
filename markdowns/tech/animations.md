# Animation Guidelines

This document defines how animations are implemented across the site. The goal is a **bold, dynamic** feel — fast reveals with momentum, strong hover interactions, and parallax depth.

## Library

**`motion` (Motion v12, formerly Framer Motion)** — installed as `motion`.

```bash
npm install motion
```

Import from `motion/react`:

```ts
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "motion/react";
```

## Hybrid Strategy

| Effect type | Tool |
|---|---|
| Scroll-linked parallax | Motion (`useScroll` + `useTransform`) |
| Scroll-triggered reveals | Motion (`whileInView`) |
| Staggered children | Motion (`variants` + `staggerChildren`) |
| Mount/unmount transitions | Motion (`AnimatePresence`) |
| Gesture hover/tap (cards, CTAs) | Motion (`whileHover`, `whileTap`) |
| Simple button hover scale | Tailwind (`hover:scale-[1.02] transition-all`) |
| Color transitions | Tailwind (`hover:bg-* transition-colors`) |

**Rule:** If an animation requires JS (scroll position, physics, sequencing, enter/exit), use Motion. If it's a pure CSS state change, use Tailwind.

## Shared Constants

All animation constants live in `constants/animations.ts`. Never inline easing arrays or variant objects in JSX.

```ts
// constants/animations.ts

// Bold expo-out: fast in, smooth landing
export const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const;

// Standard fade-up reveal — used by all section content
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_EXPO_OUT },
  },
};

// Stagger wrapper — apply to parent, children use fadeUpVariants
export const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Slide in from left (e.g. left card in a comparison)
export const slideLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_EXPO_OUT } },
};

// Slide in from right
export const slideRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_EXPO_OUT } },
};

// Spring config for hover interactions
export const HOVER_SPRING = { type: "spring", stiffness: 400, damping: 25 } as const;
```

## Section Trigger Rules

All `whileInView` animations must use:

```ts
<motion.div
  variants={staggerContainerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
```

- `once: true` — never replays on scroll-back
- `amount: 0.2` — triggers when 20% of element is in view (adjust per section if needed)

## Parallax Pattern

Use `useScroll` scoped to the section's `ref` — never the global page scroll.

```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

<section ref={ref}>
  <motion.div style={{ y }}>...</motion.div>
</section>
```

## Hover Lift Pattern (Cards)

```tsx
<motion.div
  whileHover={{ y: -8, scale: 1.02 }}
  transition={HOVER_SPRING}
>
```

## Accordion / Expand Pattern

Use `AnimatePresence` with a `motion.div` wrapping the expandable content:

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      key="content"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE_EXPO_OUT }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  )}
</AnimatePresence>
```

## Reduced Motion

Every animated component must respect the user's reduced motion preference:

```tsx
const shouldReduceMotion = useReducedMotion();

<motion.div
  initial={shouldReduceMotion ? false : "hidden"}
  whileInView={shouldReduceMotion ? false : "visible"}
  variants={shouldReduceMotion ? undefined : fadeUpVariants}
>
```

## Per-Section Summary

| Section | Animation type | Motion used |
|---|---|---|
| HeroSection | Mount stagger + background parallax | `variants`, `staggerChildren`, `useScroll` |
| TrustStrip | `whileInView` stagger | `variants`, `staggerChildren` |
| HowItWorks | `whileInView` stagger + step pop + connector draw | `variants`, spring, `pathLength` |
| WhyMagnetic | Slide-in from sides + header parallax | `slideLeftVariants`, `slideRightVariants`, `useTransform` |
| CustomerExamples | `whileInView` stagger + hover lift | `variants`, `whileHover` |
| PricingSection | `whileInView` stagger + popular card pulse + hover lift | `variants`, `animate` loop, `whileHover` |
| UseCases | Diagonal stagger + hover border reveal | `variants`, `whileHover` scaleX |
| FAQSection | `whileInView` stagger + accordion expand | `variants`, `AnimatePresence` |
| FinalCTA | `whileInView` reveal + magnetic CTA button | `variants`, `useMotionValue`, `useTransform` |

## Performance Notes

- Prefer `transform` and `opacity` animations — they run on the compositor thread and never cause layout reflow
- Avoid animating `width`, `height`, `top`, `left` directly — use `scaleX/Y` + `transform` equivalents instead (exception: accordion height with `AnimatePresence`)
- `will-change: transform` is applied automatically by Motion where appropriate
- Keep `staggerChildren` ≤ `0.15s` — longer stagger makes the page feel slow on mobile
