# Homepage Redesign — Confetti Pop Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the existing dark-black-and-gold homepage with a light, joyful "Confetti Pop" palette — warm whites, soft peach, sage, cream, and champagne accents — so the site feels celebratory and wedding-ready.

**Architecture:** All changes are style-only — no new files, no new components, no logic changes. Every task modifies exactly one component file (and its `.constants.ts` where needed). The brand tokens in `globals.css` change first so all components can reference them.

**Tech Stack:** Next.js 16, Tailwind CSS v4 (arbitrary value classes `bg-[#hex]`), Geist Sans, shadcn/ui Accordion.

**Design spec:** `docs/plans/2026-02-20-homepage-redesign.md`

---

## Color Reference (use these hex values throughout)

| Name | Hex | Used for |
|---|---|---|
| White | `#FFFFFF` | Primary section bg |
| Cream | `#FFF9F4` | Alternating section bg, footer |
| Peach | `#FFF0E8` | Trust Strip, Pricing bg |
| Sage | `#EDF5EA` | HowItWorks, UseCases bg |
| Champagne | `#F0C060` | Primary CTA, accents, badges |
| Champagne hover | `#D4972A` | Button hover |
| Text dark | `#2C1A0E` | All body text (warm brown, replaces pure black) |
| Text muted | `#7A6458` | Secondary/muted text |

---

## Task 1: Update brand tokens in globals.css

**Files:**
- Modify: `app/globals.css`

**Step 1: Replace the 5 brand CSS variables inside `:root`**

Find this block (lines 83–87):
```css
  --brand-gold: #C9A84C;
  --brand-gold-hover: #B8913A;
  --brand-dark: #0A0A0A;
  --brand-dark-secondary: #111111;
  --brand-light: #FAF9F7;
```

Replace with:
```css
  --brand-champagne: #F0C060;
  --brand-champagne-hover: #D4972A;
  --brand-white: #FFFFFF;
  --brand-cream: #FFF9F4;
  --brand-peach: #FFF0E8;
  --brand-sage: #EDF5EA;
  --brand-text: #2C1A0E;
  --brand-muted: #7A6458;
```

**Step 2: Commit**
```bash
git add app/globals.css
git commit -m "style: replace dark/gold brand tokens with confetti pop palette"
```

---

## Task 2: Update Navbar

**Files:**
- Modify: `components/shared/Navbar/Navbar.tsx`

**Step 1: Replace the entire file content**

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "./Navbar.constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[#2C1A0E] font-bold text-lg tracking-tight">
            Magnetic<span className="text-[#F0C060]">Pins</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#7A6458] hover:text-[#2C1A0E] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/design"
          className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#F0C060] text-[#2C1A0E] hover:bg-[#D4972A] transition-colors"
        >
          Start Designing
        </Link>
      </div>
    </header>
  );
}
```

**Step 2: Commit**
```bash
git add components/shared/Navbar/Navbar.tsx
git commit -m "style: navbar — white bg, champagne pill CTA, warm-brown text"
```

---

## Task 3: Update Footer

**Files:**
- Modify: `components/shared/Footer/Footer.tsx`

**Step 1: Replace the entire file content**

```tsx
import Link from "next/link";
import { NAV_LINKS, POLICY_LINKS } from "./Footer.constants";

export function Footer() {
  return (
    <footer className="bg-[#FFF9F4] border-t border-[#F0C060]/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-[#2C1A0E] font-bold text-xl mb-3">
              Magnetic<span className="text-[#F0C060]">Pins</span>
            </p>
            <p className="text-[#7A6458] text-sm leading-relaxed max-w-xs">
              The easiest way to create custom magnetic pins — no holes, no fabric damage.
            </p>
          </div>

          <div>
            <p className="text-[#7A6458] text-xs font-semibold tracking-widest uppercase mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#7A6458] hover:text-[#D4972A] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[#7A6458] text-xs font-semibold tracking-widest uppercase mb-5">
              Policies
            </p>
            <ul className="flex flex-col gap-3">
              {POLICY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#7A6458] hover:text-[#D4972A] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#F0C060]/10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#7A6458] text-xs">
            © {new Date().getFullYear()} MagneticPins. All rights reserved.
          </p>
          <p className="text-[#7A6458] text-xs">Made in the USA 🇺🇸</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**
```bash
git add components/shared/Footer/Footer.tsx
git commit -m "style: footer — cream bg, warm-brown text, champagne hover links"
```

---

## Task 4: Update HeroSection

**Files:**
- Modify: `components/home/HeroSection/HeroSection.tsx`

**Step 1: Replace the entire file content**

```tsx
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#FFF0E8_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div className="flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-[#F0C060]/40 bg-[#FFF0E8]">
            <span className="w-2 h-2 rounded-full bg-[#F0C060] animate-pulse" />
            <span className="text-xs font-semibold text-[#D4972A] tracking-widest uppercase">
              Custom Enamel Pins
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2C1A0E] leading-[1.05] tracking-tight">
            Design Your Own{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#F0C060]">Magnetic</span>
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#F0C060]/50 rounded" />
            </span>{" "}
            Pins
          </h1>

          <p className="text-lg text-[#7A6458] max-w-lg leading-relaxed">
            Custom enamel pins with strong magnetic backing.{" "}
            <span className="text-[#2C1A0E] font-semibold">No holes. No fabric damage.</span>{" "}
            Minimum 25 pieces.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/design"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-[#F0C060] text-[#2C1A0E] hover:bg-[#D4972A] transition-all hover:scale-[1.02] shadow-lg shadow-amber-200/60"
            >
              Start Designing
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold border border-[#F0C060]/40 text-[#2C1A0E] bg-[#FFF0E8] hover:bg-[#FFE4CC] transition-colors"
            >
              Check our Pricing
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#F0C060]/30 shadow-xl shadow-amber-100/60">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0E8] via-[#FFE4CC] to-[#FFDAB0] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/70 border border-[#F0C060]/40 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-3xl">📌</span>
              </div>
              <p className="text-[#7A6458] text-sm">Lifestyle photo here</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#F0C060]/40 rounded-tr-2xl" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#F0C060]/40 rounded-bl-2xl" />
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add components/home/HeroSection/HeroSection.tsx
git commit -m "style: hero — white bg, peach gradient, champagne accent text & CTAs"
```

---

## Task 5: Update TrustStrip

**Files:**
- Modify: `components/home/TrustStrip/TrustStrip.tsx`

**Step 1: Replace the entire file content**

```tsx
import { TRUST_ITEMS } from "./TrustStrip.constants";

export function TrustStrip() {
  return (
    <div className="bg-[#FFF0E8] border-y border-[#F0C060]/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="text-[#F0C060] font-bold text-base">✓</span>
              <span className="text-sm font-medium text-[#2C1A0E]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**
```bash
git add components/home/TrustStrip/TrustStrip.tsx
git commit -m "style: trust strip — peach bg, champagne checkmarks, warm text"
```

---

## Task 6: Update HowItWorks

**Files:**
- Modify: `components/home/HowItWorks/HowItWorks.tsx`

**Step 1: Replace the entire file content**

```tsx
import { STEPS } from "./HowItWorks.constants";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#EDF5EA] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4972A] mb-3">
            Simple Process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Order in 3 Easy Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-[#F0C060]/30" />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center gap-5 relative"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md shadow-amber-100/80 border border-[#F0C060]/20">
                    <Icon className="w-8 h-8 text-[#F0C060]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#F0C060] text-[#2C1A0E] text-xs font-bold flex items-center justify-center shadow-sm">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#2C1A0E]">{step.title}</h3>
                <p className="text-[#7A6458] leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add components/home/HowItWorks/HowItWorks.tsx
git commit -m "style: how it works — sage bg, white step cards, champagne numbers"
```

---

## Task 7: Update WhyMagnetic

**Files:**
- Modify: `components/home/WhyMagnetic/WhyMagnetic.tsx`

**Step 1: Replace the entire file content**

```tsx
import { X, Check } from "lucide-react";
import { NEEDLE_ITEMS, MAGNETIC_ITEMS } from "./WhyMagnetic.constants";

export function WhyMagnetic() {
  return (
    <section className="bg-[#FFF9F4] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4972A] mb-3">
            The Difference
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Why Magnetic Pins?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-[#2C1A0E]/8 bg-white p-8 shadow-sm shadow-amber-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-[#7A6458]">Needle Pins</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {NEEDLE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span className="text-[#7A6458]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#F0C060]/40 bg-[#FFF0E8] p-8 shadow-sm shadow-amber-100/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#F0C060]/20 flex items-center justify-center">
                <span className="text-base">🧲</span>
              </div>
              <h3 className="text-lg font-bold text-[#D4972A]">Magnetic Pins</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {MAGNETIC_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#F0C060] mt-0.5 shrink-0" />
                  <span className="text-[#2C1A0E]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-[#7A6458] text-sm mt-10">
          Strong neodymium magnets hold firmly through most fabric without any damage.
        </p>
      </div>
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add components/home/WhyMagnetic/WhyMagnetic.tsx
git commit -m "style: why magnetic — cream bg, white/peach comparison cards, warm text"
```

---

## Task 8: Update CustomerExamples

**Files:**
- Modify: `components/home/CustomerExamples/CustomerExamples.constants.ts`
- Modify: `components/home/CustomerExamples/CustomerExamples.tsx`

**Step 1: Update the gradients in the constants file**

Replace entire file:
```ts
import type { ExampleItem } from "./CustomerExamples.types";

export const EXAMPLES: ExampleItem[] = [
  { label: "Logo Pin", category: "Small Brand", gradient: "from-[#FFF0E8] to-[#FFD9C0]" },
  { label: "Wedding Pin", category: "Event", gradient: "from-[#EDF5EA] to-[#C8E6C0]" },
  { label: "Club Pin", category: "Organization", gradient: "from-[#FFF9F4] to-[#FFE8D0]" },
  { label: "Merch Drop", category: "Creator", gradient: "from-[#EDF5EA] to-[#D4E8C2]" },
  { label: "Brand Pin", category: "Small Brand", gradient: "from-[#FFF0E8] to-[#FFDCC8]" },
  { label: "Party Pin", category: "Event", gradient: "from-[#FFF9F4] to-[#FFE4B8]" },
];
```

**Step 2: Update CustomerExamples.tsx**

Replace entire file:
```tsx
import { EXAMPLES } from "./CustomerExamples.constants";

export function CustomerExamples() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4972A] mb-3">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Made by Our Customers
          </h2>
          <p className="text-[#7A6458] mt-4 max-w-md mx-auto">
            From weddings to brand launches — see what people are creating.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {EXAMPLES.map((ex, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm shadow-amber-100/60 border border-[#F0C060]/15"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${ex.gradient} transition-transform duration-300 group-hover:scale-105`}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Commit**
```bash
git add components/home/CustomerExamples/CustomerExamples.constants.ts components/home/CustomerExamples/CustomerExamples.tsx
git commit -m "style: customer examples — white bg, warm palette gradients, light overlay"
```

---

## Task 9: Update PricingSection

**Files:**
- Modify: `components/home/PricingSection/PricingSection.tsx`

**Step 1: Replace the entire file content**

```tsx
import Link from "next/link";
import { PRICING_TIERS } from "./PricingSection.constants";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-[#FFF0E8] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4972A] mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Simple, Volume-Based Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.quantity}
              className={`relative rounded-2xl p-8 border bg-white transition-all hover:scale-[1.02] shadow-sm ${
                tier.popular
                  ? "ring-2 ring-[#F0C060] border-[#F0C060]/40 shadow-amber-100/80"
                  : "border-[#F0C060]/20 hover:border-[#F0C060]/50 hover:shadow-md hover:shadow-amber-100/60"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#F0C060] text-[#2C1A0E] text-xs font-bold shadow-sm">
                  Most Popular
                </div>
              )}
              <p className="text-[#7A6458] text-sm mb-2">{tier.quantity} pieces</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-[#2C1A0E]">{tier.unitPrice}</span>
                <span className="text-[#7A6458] text-sm">/each</span>
              </div>
              <p className="text-[#D4972A] text-sm font-medium">Total: {tier.total}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-[#7A6458] text-sm mb-8">
            Final price depends on size &amp; finish selected.
          </p>
          <Link
            href="/design"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-[#F0C060] text-[#2C1A0E] hover:bg-[#D4972A] transition-all hover:scale-[1.02] shadow-lg shadow-amber-200/50"
          >
            Calculate My Price
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add components/home/PricingSection/PricingSection.tsx
git commit -m "style: pricing — peach bg, white cards, champagne ring on popular tier"
```

---

## Task 10: Update UseCases

**Files:**
- Modify: `components/home/UseCases/UseCases.tsx`

**Step 1: Replace the entire file content**

```tsx
import { USE_CASES } from "./UseCases.constants";

export function UseCases() {
  return (
    <section className="bg-[#EDF5EA] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4972A] mb-3">
            Who Orders From Us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Perfect For
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES.map((uc) => (
            <div
              key={uc.title}
              className="rounded-2xl border border-[#F0C060]/20 bg-white p-8 hover:border-[#F0C060]/50 hover:shadow-md hover:shadow-amber-100/60 hover:scale-[1.03] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#FFF0E8] flex items-center justify-center mb-5 text-2xl">
                {uc.icon}
              </div>
              <h3 className="text-lg font-bold text-[#2C1A0E] mb-2 group-hover:text-[#D4972A] transition-colors">
                {uc.title}
              </h3>
              <p className="text-[#7A6458] text-sm leading-relaxed">
                {uc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add components/home/UseCases/UseCases.tsx
git commit -m "style: use cases — sage bg, white cards, peach icon wells, hover scale"
```

---

## Task 11: Update FAQSection

**Files:**
- Modify: `components/home/FAQSection/FAQSection.tsx`

**Step 1: Replace the entire file content**

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "./FAQSection.constants";

export function FAQSection() {
  return (
    <section id="faq" className="bg-white py-24 border-t border-[#F0C060]/15">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4972A] mb-3">
            Got Questions?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="flex flex-col gap-2">
          {FAQ_ITEMS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-[#2C1A0E]/8 rounded-xl px-6 data-[state=open]:border-[#F0C060]/50 data-[state=open]:bg-[#FFFCF7] transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-[#2C1A0E] hover:no-underline py-5 [&>svg]:text-[#F0C060]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#7A6458] leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add components/home/FAQSection/FAQSection.tsx
git commit -m "style: FAQ — white bg, champagne accordion indicator, warm open state tint"
```

---

## Task 12: Update FinalCTA

**Files:**
- Modify: `components/home/FinalCTA/FinalCTA.tsx`

**Step 1: Replace the entire file content**

```tsx
import Link from "next/link";
import { TRUST_BULLETS } from "./FinalCTA.constants";

export function FinalCTA() {
  return (
    <section className="bg-[#F0C060] py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-12 h-1 bg-[#2C1A0E]/20 rounded mx-auto mb-10" />

        <h2 className="text-4xl md:text-6xl font-bold text-[#2C1A0E] tracking-tight leading-[1.1] mb-8">
          Ready to Design Your{" "}
          <span className="underline decoration-[#2C1A0E]/30 decoration-wavy underline-offset-4">
            Magnetic Pins?
          </span>
        </h2>

        <Link
          href="/design"
          className="inline-flex items-center justify-center px-10 py-5 rounded-full text-lg font-bold bg-white text-[#2C1A0E] hover:bg-[#FFF9F4] transition-all hover:scale-[1.02] shadow-2xl shadow-amber-600/20 mb-10"
        >
          Start Designing
        </Link>

        <div className="flex flex-wrap justify-center gap-6 text-[#2C1A0E]/60 text-sm mt-4">
          {TRUST_BULLETS.map((bullet) => (
            <span key={bullet}>✓ {bullet}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add components/home/FinalCTA/FinalCTA.tsx
git commit -m "style: final CTA — champagne bg burst, white inverted button, wavy underline"
```

---

## Task 13: Build & Lint Verification

**Step 1: Run build**
```bash
npm run build
```
Expected: exits with code 0, no errors. TypeScript errors or missing imports will surface here.

**Step 2: Run lint**
```bash
npm run lint
```
Expected: "No ESLint warnings or errors" or exits with code 0.

**Step 3: If either fails**
Read the error message carefully. The most common issues will be:
- A Tailwind class with a typo (check hex values are quoted correctly inside `[]`)
- A missing import
Fix the specific file that errored and re-run.

**Step 4: Commit if clean**
```bash
git add -A
git commit -m "chore: verify build & lint pass after confetti pop redesign"
```
(Only commit if there were uncommitted fixup changes from Step 3. If build passed with no extra changes, skip this commit.)

---

## Task 14: Update design documentation

**Files:**
- Modify: `markdowns/product/homepage.md`

**Step 1: Update the color tokens table in the homepage doc**

Open `markdowns/product/homepage.md`. Find the Brand Color Tokens section and replace the table with:

```markdown
## Brand Color Tokens

| Token | Value | Used In |
|---|---|---|
| White | `#FFFFFF` | Hero, CustomerExamples, FAQ |
| Cream `--brand-cream` | `#FFF9F4` | WhyMagnetic, Footer |
| Peach `--brand-peach` | `#FFF0E8` | TrustStrip, Pricing, HowItWorks cards |
| Sage `--brand-sage` | `#EDF5EA` | HowItWorks, UseCases |
| Champagne `--brand-champagne` | `#F0C060` | All CTAs, accents, FinalCTA bg |
| Champagne hover `--brand-champagne-hover` | `#D4972A` | Button hover, eyebrow labels |
| Text dark `--brand-text` | `#2C1A0E` | All body text, headlines |
| Text muted `--brand-muted` | `#7A6458` | Secondary text, descriptions |
```

**Step 2: Commit**
```bash
git add markdowns/product/homepage.md
git commit -m "docs: update homepage color token table to confetti pop palette"
```
