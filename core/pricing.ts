import type { PricingTier, PricingResult } from "./pricing.types";

export const PRICING_TIERS: PricingTier[] = [
  { minQuantity: 100, unitPrice: 2.2 },
  { minQuantity: 50, unitPrice: 2.6 },
  { minQuantity: 25, unitPrice: 3.0 },
];

export const MIN_QUANTITY = 25;

export function calculatePricing(quantity: number): PricingResult {
  const tier =
    PRICING_TIERS.find((t) => quantity >= t.minQuantity) ??
    PRICING_TIERS[PRICING_TIERS.length - 1];

  return {
    unitPrice: tier.unitPrice,
    totalPrice: +(tier.unitPrice * quantity).toFixed(2),
    activeTier: tier,
  };
}

export function formatPrice(cents: number): string {
  return `$${cents.toFixed(2)}`;
}
