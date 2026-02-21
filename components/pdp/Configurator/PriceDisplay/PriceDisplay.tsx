"use client";

import { useConfigurator } from "@/hooks/useConfigurator";
import { formatPrice } from "@/core/pricing";

export function PriceDisplay() {
  const { state, derived } = useConfigurator();

  return (
    <div className="rounded-2xl border border-[#2A7A6F]/20 bg-[#FFF9F4] p-6">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-sm text-[#7A6458]">Price per unit</span>
        <span className="text-lg font-bold text-[#2C1A0E]">
          {formatPrice(derived.unitPrice)}
        </span>
      </div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-sm text-[#7A6458]">
          Total ({state.quantity} pins)
        </span>
        <span className="text-2xl font-bold text-[#2C1A0E]">
          {formatPrice(derived.totalPrice)}
        </span>
      </div>
      <p className="text-xs text-[#2A7A6F] mb-5">
        Includes free digital proof.
      </p>

      <button
        disabled={!derived.canAddToCart}
        onClick={() => {
          console.log("Add to cart", { state, derived });
        }}
        className="w-full py-4 rounded-full text-base font-bold bg-[#F0C060] text-[#2C1A0E] hover:bg-[#D4972A] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] shadow-lg shadow-[#F0C060]/30"
      >
        Add to Cart
      </button>

      {!derived.isDesignReady && (
        <p className="text-xs text-[#7A6458] text-center mt-2">
          Upload your design to continue
        </p>
      )}

      <p className="text-xs text-[#7A6458] text-center mt-3">
        Production time: 10-14 business days after proof approval
      </p>
    </div>
  );
}
