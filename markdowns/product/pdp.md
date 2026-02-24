# Product Detail Page (PDP)

## Overview

The PDP (`app/product/page.tsx`) is a single-page product configurator and purchase flow for custom magnetic pins. It combines a real-time design preview with a step-by-step configuration engine, educational content, and conversion-focused CTAs. The page shares the same design system, color palette, typography, and animation patterns as the homepage.

## Page Structure

The PDP is organized into four experience zones:

### Zone 1 — Configuration (Hero)

Two-column layout on desktop, stacked on mobile.

| Column    | Content                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------- |
| **Left**  | Live design preview (placeholder when no upload), size reference visual, optional blazer mockup |
| **Right** | Full configurator (4-step wizard + live pricing + Add to Cart CTA)                              |

### Zone 2 — Trust & Process

| #   | Component      | Description                                          |
| --- | -------------- | ---------------------------------------------------- |
| 1   | TrustBar       | Horizontal reassurance strip near the buy area       |
| 2   | HowItWorksMini | 3-step abbreviated process (Upload → Approve → Ship) |

### Zone 3 — Validation & Education

| #   | Component         | Description                                                                |
| --- | ----------------- | -------------------------------------------------------------------------- |
| 3   | ProductSpecs      | Concise material/backing/finish/thickness specs                            |
| 4   | MagnetStrength    | Close-up image, strength explanation, clothing examples, transparency note |
| 5   | CustomerShowcase  | UGC-style grid — "Made by our customers"                                   |
| 6   | PDPFAQSection     | Purchase-objection FAQs only                                               |
| 7   | ArtworkGuidelines | Collapsible accordion with file requirements                               |

### Zone 4 — Conversion Reinforcement

| #   | Component          | Description                                                     |
| --- | ------------------ | --------------------------------------------------------------- |
| 8   | PDPFinalCTA        | "Ready to create your magnetic pins?" — scrolls to configurator |
| 9   | StickyBar (mobile) | Persistent bottom bar with live total + Add to Cart             |

## Section Backgrounds

Follow the same alternating-warmth pattern from the homepage:

| #   | Component           | Background          |
| --- | ------------------- | ------------------- |
| —   | Hero / Configurator | `#FFFFFF` white     |
| 1   | TrustBar            | `#FFF0E8` peach     |
| 2   | HowItWorksMini      | `#EDF5EA` sage      |
| 3   | ProductSpecs        | `#FFF9F4` cream     |
| 4   | MagnetStrength      | `#FFFFFF` white     |
| 5   | CustomerShowcase    | `#FFF0E8` peach     |
| 6   | PDPFAQSection       | `#FFFFFF` white     |
| 7   | ArtworkGuidelines   | `#FFF9F4` cream     |
| 8   | PDPFinalCTA         | `#F0C060` champagne |

## Configurator Steps

### Step 1 — Upload Design

- Drag & drop zone with dashed border
- Shows thumbnail preview after upload
- Accepted file types note (PNG, JPG, SVG, AI, PDF)
- "Need help with artwork?" link (scrolls to Artwork Guidelines section)
- File validation: min 300 DPI recommended, max file size TBD

### Step 2 — Choose Size

Radio button group:

| Size  | Label       |
| ----- | ----------- |
| 1"    | Small       |
| 1.25" | Medium      |
| 1.5"  | Large       |
| 2"    | Extra Large |

Include a small size guide tooltip with visual reference.

### Step 3 — Select Quantity

Dropdown or stepper input. Minimum order: 25 pieces.

Tier pricing displayed inline:

| Quantity | Price/Unit | Total   |
| -------- | ---------- | ------- |
| 25       | $3.00      | $75.00  |
| 50       | $2.60      | $130.00 |
| 100      | $2.20      | $220.00 |

Price updates instantly when quantity changes.

### Step 4 — Select Finish

Radio button group:

| Finish       |
| ------------ |
| Gold         |
| Silver       |
| Black Nickel |
| Rose Gold    |

Optional: Enamel type selector (Hard / Soft enamel).

## Live Price Display

Visible at all times within the configurator:

```
Price per unit:  $X.XX
Total:           $XXX.XX
─────────────────────────
Includes free digital proof.
```

## Add to Cart CTA

- Large champagne button: **Add to Cart**
- Below button: "Delivery in 25 business days after proof approval"

## Trust & Risk Reversal Bar

Horizontal strip near the buy area:

- Free Digital Proof Before Production
- No Fabric Damage
- Secure Checkout

## How It Works (Mini)

Abbreviated 3-step flow to reduce anxiety:

1. Upload your design
2. Approve your proof
3. We produce & ship

## Product Specs

Concise, non-technical:

| Spec       | Value                 |
| ---------- | --------------------- |
| Material   | Iron / zinc alloy     |
| Backing    | Dual magnetic backing |
| Finish     | Premium plating       |
| Thickness  | TBD mm                |
| Attachment | No needle puncture    |

## Magnet Strength Section

**Title:** "How Strong Are The Magnets?"

Content:

- Close-up magnet image
- Short plain-language explanation of hold strength
- Clothing examples: blazer, coat, tote bag
- Transparency note: "Not recommended for very thick winter coats."

## Customer Showcase (UGC)

**Title:** "Made by our customers"

Grid of real customer pin examples. Builds social proof that custom designs look great.

## FAQ (PDP Version)

Only purchase-blocking objections:

1. What if my artwork isn't high quality?
2. Can I revise my proof?
3. How long does production take?
4. What if I need changes after ordering?
5. Do magnets fall off?

## Artwork Guidelines (Collapsed)

Expandable accordion:

- Vector files preferred (AI, SVG, EPS)
- Minimum 300 DPI for raster images
- Avoid text smaller than X pt
- Keep fine details above X mm
- Color mode: CMYK or Pantone preferred

## Final CTA

**Heading:** "Ready to create your magnetic pins?"
**Button:** "Start Designing" — smooth-scrolls to configurator at top of page.

## Sticky Conversion Bar (Mobile)

Persistent bottom bar visible during scroll:

- Live quantity summary (e.g., "50 pins")
- Order total (e.g., "$130.00")
- "Add to Cart" button
- Must not obstruct page content (proper bottom padding)

## Editing Content

All editable copy and data lives in `.constants.ts` files alongside each component:

| What to edit              | File                                                              |
| ------------------------- | ----------------------------------------------------------------- |
| Configurator size options | `components/pdp/Configurator/Configurator.constants.ts`           |
| Pricing tiers             | `constants/pricing.ts` (shared with homepage)                     |
| Finish options            | `components/pdp/Configurator/Configurator.constants.ts`           |
| Trust bar items           | `components/pdp/TrustBar/TrustBar.constants.ts`                   |
| Product specs             | `components/pdp/ProductSpecs/ProductSpecs.constants.ts`           |
| Magnet strength content   | `components/pdp/MagnetStrength/MagnetStrength.constants.ts`       |
| PDP FAQ items             | `components/pdp/PDPFAQSection/PDPFAQSection.constants.ts`         |
| Artwork guidelines        | `components/pdp/ArtworkGuidelines/ArtworkGuidelines.constants.ts` |
| Final CTA copy            | `components/pdp/PDPFinalCTA/PDPFinalCTA.constants.ts`             |
