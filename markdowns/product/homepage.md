# Homepage

## Overview

The homepage (`app/page.tsx`) is a static marketing page composed of 9 section components,
all rendered server-side. Navbar and Footer are global and live in `components/shared/` —
they are not part of the homepage component tree.

## Section Order

| # | Component | Location | Background |
|---|-----------|----------|------------|
| 1 | HeroSection | `components/home/HeroSection/` | `#0A0A0A` dark |
| 2 | TrustStrip | `components/home/TrustStrip/` | `#111111` dark |
| 3 | HowItWorks | `components/home/HowItWorks/` | `#FAF9F7` light |
| 4 | WhyMagnetic | `components/home/WhyMagnetic/` | `#111111` dark |
| 5 | CustomerExamples | `components/home/CustomerExamples/` | `#FAF9F7` light |
| 6 | PricingSection | `components/home/PricingSection/` | `#0A0A0A` dark |
| 7 | UseCases | `components/home/UseCases/` | `#FAF9F7` light |
| 8 | FAQSection | `components/home/FAQSection/` | `#FFFFFF` white |
| 9 | FinalCTA | `components/home/FinalCTA/` | `#0A0A0A` dark |

## Brand Colors

| Token | Value | Usage |
|---|---|---|
| `--brand-gold` | `#C9A84C` | Primary accent, CTAs, icons |
| `--brand-gold-hover` | `#B8913A` | Hover state for gold elements |
| `--brand-dark` | `#0A0A0A` | Primary dark background |
| `--brand-dark-secondary` | `#111111` | Secondary dark sections |
| `--brand-light` | `#FAF9F7` | Light section background |

## Editing Content

All editable copy and data lives in `.constants.ts` files alongside each component:

| What to edit | File |
|---|---|
| Trust strip items | `components/home/TrustStrip/TrustStrip.constants.ts` |
| Process steps | `components/home/HowItWorks/HowItWorks.constants.ts` |
| Needle vs Magnetic comparison | `components/home/WhyMagnetic/WhyMagnetic.constants.ts` |
| Gallery examples | `components/home/CustomerExamples/CustomerExamples.constants.ts` |
| Pricing tiers | `components/home/PricingSection/PricingSection.constants.ts` |
| Use case cards | `components/home/UseCases/UseCases.constants.ts` |
| FAQ questions & answers | `components/home/FAQSection/FAQSection.constants.ts` |
| Final CTA trust bullets | `components/home/FinalCTA/FinalCTA.constants.ts` |
| Footer navigation links | `components/shared/Footer/Footer.constants.ts` |
| Navbar links | `components/shared/Navbar/Navbar.constants.ts` |

## Design Reference

Full design decisions documented in `docs/plans/2026-02-20-homepage-design.md`.
