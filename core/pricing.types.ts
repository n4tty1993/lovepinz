export interface PricingTier {
  minQuantity: number;
  unitPrice: number;
}

export interface PricingResult {
  unitPrice: number;
  totalPrice: number;
  activeTier: PricingTier;
}
