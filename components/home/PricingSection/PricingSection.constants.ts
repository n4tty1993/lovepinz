import type { PricingTier } from "./PricingSection.types";

export const PRICING_TIERS: PricingTier[] = [
  { quantity: "25", unitPrice: "$3.00", total: "$75.00", popular: false },
  { quantity: "50", unitPrice: "$2.60", total: "$130.00", popular: true },
  { quantity: "100", unitPrice: "$2.20", total: "$220.00", popular: false },
];
