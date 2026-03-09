import type { PricingTier } from "./PricingSection.types";

export const PRICING_TIERS: PricingTier[] = [
  { quantity: "25", unitPrice: "$6.99", total: "$174.75", popular: false },
  { quantity: "50", unitPrice: "$5.99", total: "$299.50", popular: true },
  { quantity: "100", unitPrice: "$4.99", total: "$499.00", popular: false },
];
