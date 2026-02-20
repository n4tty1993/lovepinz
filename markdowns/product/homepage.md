# Homepage

## Overview

The homepage (`app/page.tsx`) is a static marketing page composed of 9 section components,
all rendered server-side. Navbar and Footer are global and live in `components/shared/` —
they are not part of the homepage component tree.

## Section Order

| # | Component | Location | Background |
|---|-----------|----------|------------|
| 1 | HeroSection | `components/home/HeroSection/` | `#FFFFFF` white |
| 2 | TrustStrip | `components/home/TrustStrip/` | `#FFF0E8` peach |
| 3 | HowItWorks | `components/home/HowItWorks/` | `#EDF5EA` sage |
| 4 | WhyMagnetic | `components/home/WhyMagnetic/` | `#FFF9F4` cream |
| 5 | CustomerExamples | `components/home/CustomerExamples/` | `#FFFFFF` white |
| 6 | PricingSection | `components/home/PricingSection/` | `#FFF0E8` peach |
| 7 | UseCases | `components/home/UseCases/` | `#EDF5EA` sage |
| 8 | FAQSection | `components/home/FAQSection/` | `#FFFFFF` white |
| 9 | FinalCTA | `components/home/FinalCTA/` | `#F0C060` champagne |

## Brand Color Tokens

| Token | Value | Used In |
|---|---|---|
| White `--brand-white` | `#FFFFFF` | Hero, CustomerExamples, FAQ |
| Cream `--brand-cream` | `#FFF9F4` | WhyMagnetic, Footer |
| Peach `--brand-peach` | `#FFF0E8` | TrustStrip, Pricing, card accents |
| Sage `--brand-sage` | `#EDF5EA` | HowItWorks, UseCases |
| Champagne `--brand-champagne` | `#F0C060` | All CTAs, accents, FinalCTA bg |
| Champagne hover `--brand-champagne-hover` | `#D4972A` | Button hover, eyebrow labels |
| Text dark `--brand-text` | `#2C1A0E` | All body text, headlines |
| Text muted `--brand-muted` | `#7A6458` | Secondary text, descriptions |

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

Original design spec: `docs/plans/2026-02-20-homepage-design.md`
Redesign spec (Confetti Pop palette): `docs/plans/2026-02-20-homepage-redesign.md`
