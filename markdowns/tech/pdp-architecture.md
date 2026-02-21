# PDP — System Architecture

## Overview

The PDP is a modular, state-driven configuration system embedded within a marketing-optimized product page. It separates presentation, configuration state, pricing logic, media processing, and external integrations.

## Architectural Layers

### 1. Presentation Layer

Responsible for layout rendering, visual state, animations, and accessibility. Remains stateless — consumes derived state from the configuration engine.

- Mobile-first responsive grid
- Two-column desktop layout (preview left, configurator right)
- Stacked layout on mobile
- Same animation system as homepage (Motion + Tailwind hybrid)

### 2. Configuration Engine Layer

The primary source of truth for all interactive configuration data.

Manages:
- Design wizard flow (upload → processing → style → confirmation)
- Product selection inputs (size, quantity, finish, enamel type)
- Derived pricing data
- Design readiness state

### 3. Pricing Engine

Deterministic, UI-decoupled pricing calculation.

Responsibilities:
- Tier-based price resolution
- Unit price determination
- Order total calculation
- Future extensibility for modifiers (rush fees, premium finishes)

Location: `core/pricing.ts` — shared between PDP and homepage pricing display.

### 4. Media Processing Layer

Handles uploaded artwork and preview generation.

v1 behavior:
- Client-side preview generation (thumbnail from uploaded file)
- Simulated processing state

Future:
- Backend image processing API integration
- Style application (mockup on blazer, etc.)

### 5. Integration Boundary

Defines handoff points to external systems:

| System | Integration |
|--------|-------------|
| Cart | Add configured product to cart state |
| Checkout | Navigate to checkout with cart data |
| Media API | Future — artwork processing service |
| Analytics | Track configuration steps and conversions |

## Component Tree

```
app/product/page.tsx
├── PDPHero/                    # Two-column hero (preview + configurator)
│   ├── DesignPreview/          # Left column — live preview + size reference
│   └── Configurator/           # Right column — 4-step wizard
│       ├── UploadStep/         # Step 1 — drag & drop upload
│       ├── SizeStep/           # Step 2 — radio button size selection
│       ├── QuantityStep/       # Step 3 — quantity selector with tier pricing
│       ├── FinishStep/         # Step 4 — finish + optional enamel type
│       └── PriceDisplay/       # Live price summary + Add to Cart CTA
│
├── TrustBar/                   # Horizontal trust strip
├── HowItWorksMini/             # 3-step abbreviated process
├── ProductSpecs/               # Material/backing/finish specs
├── MagnetStrength/             # Magnet explanation + clothing examples
├── CustomerShowcase/           # UGC grid — "Made by our customers"
├── PDPFAQSection/              # Purchase-objection FAQs
├── ArtworkGuidelines/          # Collapsible file requirements
├── PDPFinalCTA/                # Bottom CTA — scrolls to configurator
└── StickyBar/                  # Mobile-only persistent bottom bar
```

## State Domains

### Design State

```typescript
interface DesignState {
  file: File | null;
  previewUrl: string | null;
  processingPhase: "idle" | "uploading" | "processing" | "complete";
  isReady: boolean;
}
```

### Product State

```typescript
interface ProductState {
  size: "1" | "1.25" | "1.5" | "2";
  quantity: number;
  finish: "gold" | "silver" | "black-nickel" | "rose-gold";
  enamelType: "hard" | "soft";
}
```

### Derived State

```typescript
interface DerivedState {
  unitPrice: number;
  totalPrice: number;
  activeTier: PricingTier;
  isDesignReady: boolean;
  canAddToCart: boolean;
}
```

Derived state is always computed from base state — never stored independently.

## Data Flow

1. User interacts with configurator controls
2. Base state updates in configuration engine (React state / context)
3. Pricing engine recalculates derived values
4. Presentation layer re-renders dependent modules
5. Sticky bar mirrors updated pricing state
6. No module independently calculates pricing or duplicates state

## State Management Strategy

For v1, use React Context + `useReducer` for the configurator state:

- `ConfiguratorProvider` wraps the PDP page
- All configurator sub-components consume state via `useConfigurator()` hook
- Pricing logic lives in `core/pricing.ts` as pure functions
- Derived state computed via `useMemo` from base state

Location: `contexts/ConfiguratorContext.tsx`

## File Structure

```
app/
└── product/
    └── page.tsx                    # PDP page (composes all sections)

components/
└── pdp/                            # PDP-specific section components
    ├── PDPHero/
    │   ├── PDPHero.tsx
    │   └── PDPHero.types.ts
    ├── DesignPreview/
    │   ├── DesignPreview.tsx
    │   └── DesignPreview.types.ts
    ├── Configurator/
    │   ├── Configurator.tsx
    │   ├── Configurator.constants.ts
    │   ├── Configurator.types.ts
    │   ├── UploadStep/
    │   ├── SizeStep/
    │   ├── QuantityStep/
    │   ├── FinishStep/
    │   └── PriceDisplay/
    ├── TrustBar/
    ├── HowItWorksMini/
    ├── ProductSpecs/
    ├── MagnetStrength/
    ├── CustomerShowcase/
    ├── PDPFAQSection/
    ├── ArtworkGuidelines/
    ├── PDPFinalCTA/
    └── StickyBar/

contexts/
└── ConfiguratorContext.tsx          # Configurator state provider

core/
└── pricing.ts                      # Pure pricing calculation functions

hooks/
└── useConfigurator.ts              # Hook to consume configurator context
```

## Open Architecture Questions

1. Should "Add to Cart" require a completed design upload, or allow adding without artwork?
2. Will finish types introduce pricing modifiers in future iterations?
3. Will media processing occur client-side, server-side, or hybrid?
4. What analytics events are needed across configuration steps?
5. Should configurator state persist across page refresh (localStorage)?
6. Should pricing tiers be shared constants or fetched from an API?