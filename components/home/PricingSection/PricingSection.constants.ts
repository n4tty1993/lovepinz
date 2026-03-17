import type { PricingTier } from "./PricingSection.types";

export const PRICING_TIERS: PricingTier[] = [
  { quantity: "10", unitPrice: "$9.99", total: "$99.90", popular: false },
  { quantity: "50", unitPrice: "$7.99", total: "$399.50", popular: true },
  { quantity: "100", unitPrice: "$5.99", total: "$599.00", popular: false },
];
