# Homepage Animations Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add bold, dynamic Motion animations to all 9 homepage sections — scroll-triggered reveals, parallax, hover lifts, stagger sequences, and a magnetic CTA button.

**Architecture:** Hybrid approach — Motion (v11) for all orchestrated/scroll/gesture effects; Tailwind utilities stay for simple button hover states. Each section is a self-contained `"use client"` component. All animation constants live in `constants/animations.ts`.

**Tech Stack:** `motion` (v11), Next.js App Router, React 19, TypeScript 5, Tailwind CSS v4

**Design doc:** `docs/plans/2026-02-21-animations-design.md`
**Animation guidelines:** `markdowns/tech/animations.md`

---

## Task 1: Install motion and create shared animation constants

**Files:**
- Install: `motion` package
- Create: `constants/animations.ts`

**Step 1: Install the package**

```bash
npm install motion
```

Expected: motion added to `package.json` dependencies.

**Step 2: Create `constants/animations.ts`**

```ts
// constants/animations.ts

export const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export const HOVER_SPRING = {
  type: "spring",
  stiffness: 400,
  damping: 25,
} as const;

// Standard fade-up — all section content, headers
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

// Slide from left — left-side cards in comparisons
export const slideLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_EXPO_OUT },
  },
};

// Slide from right — right-side cards in comparisons
export const slideRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_EXPO_OUT },
  },
};

// Scale pop — step number badges
export const scalePopVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 20, delay: 0.15 },
  },
};

// Subtle item stagger (tighter delay) — trust strip, list items
export const tightStaggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const slideFromLeftItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_EXPO_OUT },
  },
};
```

**Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 4: Commit**

```bash
git add constants/animations.ts package.json package-lock.json
git commit -m "feat: install motion and add shared animation constants"
```

---

## Task 2: Animate HeroSection

**Files:**
- Modify: `components/home/HeroSection/HeroSection.tsx`

**Context:** HeroSection is the first section — animations fire on mount, not on scroll. The text content stagger reveals sequentially. The image animates in slightly after. The background gradient layer has a subtle parallax drift as the user begins scrolling. Must add `"use client"` directive.

**Step 1: Rewrite `HeroSection.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { TRUST_ITEMS } from "@/components/home/TrustStrip/TrustStrip.constants";
import {
  EASE_EXPO_OUT,
  fadeUpVariants,
  staggerContainerVariants,
} from "@/constants/animations";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white flex items-center overflow-hidden"
    >
      {/* Parallax background gradient */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#FFF0E8_0%,_transparent_60%)] pointer-events-none"
        style={shouldReduceMotion ? undefined : { y: bgY }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

        {/* Text stagger container */}
        <motion.div
          className="flex flex-col gap-8"
          variants={shouldReduceMotion ? undefined : staggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-[#2A7A6F]/30 bg-[#E8F5F3]"
          >
            <span className="w-2 h-2 rounded-full bg-[#2A7A6F] animate-pulse" />
            <span className="text-xs font-semibold text-[#1F5C53] tracking-widest uppercase">
              Custom Enamel Pins
            </span>
          </motion.div>

          <motion.h1
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2C1A0E] leading-[1.05] tracking-tight"
          >
            Design Your Own{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#2A7A6F]">Magnetic</span>
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#2A7A6F]/40 rounded" />
            </span>{" "}
            Pins
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="text-lg text-[#7A6458] max-w-lg leading-relaxed"
          >
            Custom enamel pins with strong magnetic backing.{" "}
            <span className="text-[#2C1A0E] font-semibold">No holes. No fabric damage.</span>{" "}
            Minimum 25 pieces.
          </motion.p>

          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/design"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-[#2A7A6F] text-white hover:bg-[#1F5C53] transition-all hover:scale-[1.02] shadow-lg shadow-teal-100/60"
            >
              Start Designing
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold border border-[#2A7A6F]/30 text-[#2C1A0E] bg-[#E8F5F3] hover:bg-[#D0EDE9] transition-colors"
            >
              Check our Pricing
            </Link>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="flex flex-wrap gap-x-5 gap-y-2 pt-2"
          >
            {TRUST_ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="text-[#2A7A6F] font-bold text-sm">✓</span>
                <span className="text-sm text-[#7A6458]">{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Product image — delayed entrance after text */}
        <motion.div
          className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#2A7A6F]/20 shadow-xl shadow-teal-100/40"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE_EXPO_OUT, delay: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0E8] via-[#FFE4CC] to-[#FFDAB0] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/70 border border-[#2A7A6F]/30 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-3xl">📌</span>
              </div>
              <p className="text-[#7A6458] text-sm">Lifestyle photo here</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#2A7A6F]/30 rounded-tr-2xl" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#2A7A6F]/30 rounded-bl-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Visually verify in browser**

Run `npm run dev`, visit `http://localhost:3000`. On page load, the badge, heading, paragraph, buttons, and trust items should stagger in from below. The image should fade/scale in slightly after. Scroll down slowly — the background gradient should drift upward.

**Step 4: Commit**

```bash
git add components/home/HeroSection/HeroSection.tsx
git commit -m "feat(animations): hero section — mount stagger + parallax background"
```

---

## Task 3: Animate TrustStrip

**Files:**
- Modify: `components/home/TrustStrip/TrustStrip.tsx`

**Step 1: Rewrite `TrustStrip.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { TRUST_ITEMS } from "./TrustStrip.constants";
import {
  tightStaggerContainerVariants,
  slideFromLeftItemVariants,
} from "@/constants/animations";

export function TrustStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-[#FFF0E8] border-y border-[#2A7A6F]/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <motion.div
          className="flex flex-wrap justify-center md:justify-between items-center gap-4"
          variants={shouldReduceMotion ? undefined : tightStaggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {TRUST_ITEMS.map((item) => (
            <motion.div
              key={item}
              variants={shouldReduceMotion ? undefined : slideFromLeftItemVariants}
              className="flex items-center gap-2"
            >
              <span className="text-[#2A7A6F] font-bold text-base">✓</span>
              <span className="text-sm font-medium text-[#2C1A0E]">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
```

**Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add components/home/TrustStrip/TrustStrip.tsx
git commit -m "feat(animations): trust strip — whileInView stagger left-to-right"
```

---

## Task 4: Animate HowItWorks

**Files:**
- Modify: `components/home/HowItWorks/HowItWorks.tsx`

**Context:** Step cards stagger in vertically. The step number badge pops in with a spring after the card. The horizontal connector line between steps draws in from left to right.

**Step 1: Rewrite `HowItWorks.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { STEPS } from "./HowItWorks.constants";
import {
  EASE_EXPO_OUT,
  fadeUpVariants,
  staggerContainerVariants,
  scalePopVariants,
} from "@/constants/animations";

export function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="bg-[#EDF5EA] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Simple Process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Order in 3 Easy Steps
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line — draws in left to right */}
          <motion.div
            className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-[#2A7A6F]/20"
            initial={shouldReduceMotion ? false : { scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE_EXPO_OUT, delay: 0.4 }}
          />

          {/* Step cards stagger container */}
          <motion.div
            className="contents"
            variants={shouldReduceMotion ? undefined : staggerContainerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={shouldReduceMotion ? undefined : fadeUpVariants}
                  className="flex flex-col items-center text-center gap-5 relative"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md shadow-teal-100/60 border border-[#2A7A6F]/20">
                      <Icon className="w-8 h-8 text-[#2A7A6F]" />
                    </div>
                    {/* Step number badge — spring pop */}
                    <motion.span
                      variants={shouldReduceMotion ? undefined : scalePopVariants}
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#2A7A6F] text-white text-xs font-bold flex items-center justify-center shadow-sm"
                    >
                      {step.number}
                    </motion.span>
                  </div>
                  <h3 className="text-xl font-bold text-[#2C1A0E]">{step.title}</h3>
                  <p className="text-[#7A6458] leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**Note on `className="contents"`:** Using `contents` on the stagger wrapper preserves the CSS grid layout while still allowing Motion to stagger the children. The `motion.div` with `contents` is invisible to the grid — its children become direct grid items.

**Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add components/home/HowItWorks/HowItWorks.tsx
git commit -m "feat(animations): how it works — step stagger, badge pop, connector draw"
```

---

## Task 5: Animate WhyMagnetic

**Files:**
- Modify: `components/home/WhyMagnetic/WhyMagnetic.tsx`

**Context:** The section header has a parallax drift as it scrolls. The Needle card slides in from the left, the Magnetic card from the right. List items inside each card stagger in after their parent.

**Step 1: Rewrite `WhyMagnetic.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { X, Check } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { NEEDLE_ITEMS, MAGNETIC_ITEMS } from "./WhyMagnetic.constants";
import {
  slideLeftVariants,
  slideRightVariants,
  fadeUpVariants,
  staggerContainerVariants,
} from "@/constants/animations";

export function WhyMagnetic() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={sectionRef} className="bg-[#FFF9F4] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header with parallax drift */}
        <motion.div
          className="text-center mb-16"
          style={shouldReduceMotion ? undefined : { y: headerY }}
        >
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
              The Difference
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
              Why Magnetic Pins?
            </h2>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* Needle card — slides from left */}
          <motion.div
            variants={shouldReduceMotion ? undefined : slideLeftVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl border border-[#2C1A0E]/8 bg-white p-8 shadow-sm shadow-teal-100/40"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-[#7A6458]">Needle Pins</h3>
            </div>
            <motion.ul
              className="flex flex-col gap-4"
              variants={shouldReduceMotion ? undefined : staggerContainerVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {NEEDLE_ITEMS.map((item) => (
                <motion.li
                  key={item}
                  variants={shouldReduceMotion ? undefined : fadeUpVariants}
                  className="flex items-start gap-3"
                >
                  <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span className="text-[#7A6458]">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Magnetic card — slides from right */}
          <motion.div
            variants={shouldReduceMotion ? undefined : slideRightVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl border border-[#2A7A6F]/30 bg-[#FFF0E8] p-8 shadow-sm shadow-teal-100/40"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#2A7A6F]/15 flex items-center justify-center">
                <span className="text-base">🧲</span>
              </div>
              <h3 className="text-lg font-bold text-[#2A7A6F]">Magnetic Pins</h3>
            </div>
            <motion.ul
              className="flex flex-col gap-4"
              variants={shouldReduceMotion ? undefined : staggerContainerVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {MAGNETIC_ITEMS.map((item) => (
                <motion.li
                  key={item}
                  variants={shouldReduceMotion ? undefined : fadeUpVariants}
                  className="flex items-start gap-3"
                >
                  <Check className="w-4 h-4 text-[#2A7A6F] mt-0.5 shrink-0" />
                  <span className="text-[#2C1A0E]">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-[#7A6458] text-sm mt-10"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Strong neodymium magnets hold firmly through most fabric without any damage.
        </motion.p>
      </div>
    </section>
  );
}
```

**Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add components/home/WhyMagnetic/WhyMagnetic.tsx
git commit -m "feat(animations): why magnetic — slide from sides + header parallax"
```

---

## Task 6: Animate CustomerExamples

**Files:**
- Modify: `components/home/CustomerExamples/CustomerExamples.tsx`

**Context:** Cards stagger in from below. Replace the existing CSS `group-hover:scale-[1.03]` with a Motion `whileHover` lift. The inner gradient div keeps its CSS transition.

**Step 1: Rewrite `CustomerExamples.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { EXAMPLES } from "./CustomerExamples.constants";
import {
  fadeUpVariants,
  staggerContainerVariants,
  HOVER_SPRING,
} from "@/constants/animations";

export function CustomerExamples() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          className="text-center mb-16"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Made by Our Customers
          </h2>
          <p className="text-[#7A6458] mt-4 max-w-md mx-auto">
            From weddings to brand launches — see what people are creating.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          variants={shouldReduceMotion ? undefined : staggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {EXAMPLES.map((ex, i) => (
            <motion.div
              key={i}
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -10, scale: 1.03 }}
              transition={HOVER_SPRING}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm shadow-teal-100/40 border border-[#2A7A6F]/15"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${ex.gradient} transition-transform duration-300 group-hover:scale-[1.03]`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center shadow-sm">
                  <span className="text-2xl">📌</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#2C1A0E]/30 to-transparent">
                <p className="text-[#2C1A0E] font-semibold text-sm">{ex.label}</p>
                <p className="text-[#2C1A0E]/60 text-xs">{ex.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add components/home/CustomerExamples/CustomerExamples.tsx
git commit -m "feat(animations): customer examples — stagger reveal + hover lift"
```

---

## Task 7: Animate PricingSection

**Files:**
- Modify: `components/home/PricingSection/PricingSection.tsx`

**Context:** Cards stagger in. The popular card has a continuous breathing pulse. All cards get Motion hover lift (remove existing Tailwind `hover:scale-[1.02]` from card `className`).

**Step 1: Rewrite `PricingSection.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { PRICING_TIERS } from "./PricingSection.constants";
import {
  fadeUpVariants,
  staggerContainerVariants,
  HOVER_SPRING,
} from "@/constants/animations";

export function PricingSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="bg-[#FFF0E8] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          className="text-center mb-16"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Simple, Volume-Based Pricing
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10"
          variants={shouldReduceMotion ? undefined : staggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div
              key={tier.quantity}
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -8 }}
              transition={HOVER_SPRING}
              // Popular card gets a breathing pulse animation
              animate={
                tier.popular && !shouldReduceMotion
                  ? { scale: [1, 1.01, 1] }
                  : undefined
              }
              {...(tier.popular && !shouldReduceMotion
                ? {
                    transition: {
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      },
                    },
                  }
                : {})}
              className={`relative rounded-2xl p-8 border bg-white shadow-sm ${
                tier.popular
                  ? "ring-2 ring-[#2A7A6F] border-[#2A7A6F]/30 shadow-teal-100/60"
                  : "border-[#2A7A6F]/20 hover:border-[#2A7A6F]/40 hover:shadow-md hover:shadow-teal-100/40"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#2A7A6F] text-white text-xs font-bold shadow-sm">
                  Most Popular
                </div>
              )}
              <p className="text-[#7A6458] text-sm mb-2">{tier.quantity} pieces</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-[#2C1A0E]">{tier.unitPrice}</span>
                <span className="text-[#7A6458] text-sm">/each</span>
              </div>
              <p className="text-[#2A7A6F] text-sm font-medium">Total: {tier.total}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-[#7A6458] text-sm mb-8">
            Final price depends on size &amp; finish selected.
          </p>
          <Link
            href="/design"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-[#2A7A6F] text-white hover:bg-[#1F5C53] transition-all hover:scale-[1.02] shadow-lg shadow-teal-100/60"
          >
            Calculate My Price
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add components/home/PricingSection/PricingSection.tsx
git commit -m "feat(animations): pricing — stagger reveal, popular card pulse, hover lift"
```

---

## Task 8: Animate UseCases

**Files:**
- Modify: `components/home/UseCases/UseCases.tsx`

**Context:** Cards stagger in with a row-based diagonal feel (row 0: delay 0, row 1: delay 0.1, etc. using index). Remove existing Tailwind `hover:scale-[1.03] transition-all`. On hover, a teal bottom-border accent animates in via `scaleX`.

**Step 1: Rewrite `UseCases.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { USE_CASES } from "./UseCases.constants";
import {
  EASE_EXPO_OUT,
  fadeUpVariants,
  HOVER_SPRING,
} from "@/constants/animations";

export function UseCases() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#EDF5EA] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          className="text-center mb-16"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Who Orders From Us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Perfect For
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: EASE_EXPO_OUT,
                delay: shouldReduceMotion ? 0 : i * 0.08,
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -8 }}
              {...(!shouldReduceMotion ? { transition: HOVER_SPRING } : {})}
              className="group relative rounded-2xl border border-[#2A7A6F]/20 bg-white p-8 hover:border-[#2A7A6F]/40 hover:shadow-md hover:shadow-teal-100/40 overflow-hidden"
            >
              {/* Teal bottom border accent — animates in on hover */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2A7A6F]"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={shouldReduceMotion ? undefined : { scaleX: 1 }}
                transition={{ duration: 0.3, ease: EASE_EXPO_OUT }}
              />

              <div className="w-12 h-12 rounded-full bg-[#FFF0E8] flex items-center justify-center mb-5 text-2xl">
                {uc.icon}
              </div>
              <h3 className="text-lg font-bold text-[#2C1A0E] mb-2 group-hover:text-[#2A7A6F] transition-colors">
                {uc.title}
              </h3>
              <p className="text-[#7A6458] text-sm leading-relaxed">
                {uc.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add components/home/UseCases/UseCases.tsx
git commit -m "feat(animations): use cases — diagonal stagger + hover border reveal"
```

---

## Task 9: Animate FAQSection

**Files:**
- Modify: `components/home/FAQSection/FAQSection.tsx`

**Context:** The existing shadcn/ui Accordion handles expand/collapse — keep it. Add `whileInView` stagger to the list of accordion items so they animate in sequentially on scroll. The Accordion itself stays untouched.

**Step 1: Rewrite `FAQSection.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "./FAQSection.constants";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/constants/animations";

export function FAQSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="faq" className="bg-white py-24 border-t border-[#2A7A6F]/15">
      <div className="max-w-3xl mx-auto px-6">

        <motion.div
          className="text-center mb-16"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Got Questions?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {FAQ_ITEMS.map((faq, i) => (
              <motion.div
                key={i}
                variants={shouldReduceMotion ? undefined : fadeUpVariants}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border border-[#2C1A0E]/8 rounded-xl px-6 data-[state=open]:border-[#2A7A6F]/50 data-[state=open]:border-l-2 data-[state=open]:border-l-[#2A7A6F] data-[state=open]:bg-[#FFF9F4] transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold text-[#2C1A0E] hover:no-underline py-5 [&>svg]:text-[#2A7A6F]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#7A6458] leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add components/home/FAQSection/FAQSection.tsx
git commit -m "feat(animations): faq — whileInView stagger of accordion items"
```

---

## Task 10: Animate FinalCTA

**Files:**
- Modify: `components/home/FinalCTA/FinalCTA.tsx`

**Context:** Bold entrance reveal for the whole section. The CTA button has a magnetic pull effect — it follows the mouse cursor slightly on hover, then snaps back on leave.

**Step 1: Create `FinalCTA.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { TRUST_BULLETS } from "./FinalCTA.constants";
import {
  EASE_EXPO_OUT,
  fadeUpVariants,
  staggerContainerVariants,
} from "@/constants/animations";

function MagneticLink({ href, children, className }: { href: string; children: React.ReactNode; className: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 20 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || shouldReduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    rawY.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={shouldReduceMotion ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#2A7A6F] py-32">
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center"
        variants={shouldReduceMotion ? undefined : staggerContainerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          className="w-12 h-1 bg-white/20 rounded mx-auto mb-10"
        />

        <motion.h2
          variants={shouldReduceMotion ? undefined : {
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_EXPO_OUT } },
          }}
          className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8"
        >
          Ready to Design Your{" "}
          <span className="underline decoration-white/40 decoration-wavy underline-offset-4">
            Magnetic Pins?
          </span>
        </motion.h2>

        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          className="mb-10"
        >
          <MagneticLink
            href="/design"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full text-lg font-bold bg-white text-[#2C1A0E] hover:bg-[#FFF9F4] transition-colors shadow-2xl shadow-teal-900/20"
          >
            Start Designing
          </MagneticLink>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          className="flex flex-wrap justify-center gap-6 text-white/70 text-sm"
        >
          {TRUST_BULLETS.map((bullet) => (
            <span key={bullet}>✓ {bullet}</span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
```

**Step 2: Verify and commit**

```bash
npx tsc --noEmit
git add components/home/FinalCTA/FinalCTA.tsx
git commit -m "feat(animations): final CTA — bold stagger reveal + magnetic button"
```

---

## Task 11: Final verification

**Step 1: Full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 2: Build check**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 3: Visual walkthrough**

Run `npm run dev` and verify each section:

| Section | What to check |
|---|---|
| Hero | Text stagger on load; image scales in; background gradient drifts on scroll |
| TrustStrip | Items slide in left→right on scroll |
| HowItWorks | Cards stagger in; number badges pop; connector line draws |
| WhyMagnetic | Cards slide from opposite sides; header drifts on scroll |
| CustomerExamples | Cards stagger in; hover lifts cards |
| Pricing | Cards stagger in; popular card breathes; hover lifts |
| UseCases | Diagonal stagger; teal border draws on hover |
| FAQ | Items stagger in on scroll |
| FinalCTA | Bold stagger entrance; button follows cursor on hover |

**Step 4: Check reduced motion**

In Chrome DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. All animations should be instant/disabled.

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat(animations): complete homepage animation system"
```
