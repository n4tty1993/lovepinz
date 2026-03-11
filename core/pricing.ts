import type { PricingTier, PricingResult } from "./pricing.types";

export const PRICING_TIERS: PricingTier[] = [
  { minQuantity: 100, unitPrice: 4.99 },
  { minQuantity: 50, unitPrice: 5.99 },
  { minQuantity: 10, unitPrice: 6.99 },
];

export const MIN_QUANTITY = 10;

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
