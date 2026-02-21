"use client";

import { useCallback } from "react";
import { Minus, Plus } from "lucide-react";
import { useConfigurator } from "@/hooks/useConfigurator";
import { MIN_QUANTITY, PRICING_TIERS, formatPrice } from "@/core/pricing";

export function QuantityStep() {
  const { state, dispatch } = useConfigurator();

  const setQuantity = useCallback(
    (qty: number) => {
      const clamped = Math.max(MIN_QUANTITY, qty);
      dispatch({ type: "SET_QUANTITY", quantity: clamped });
    },
    [dispatch]
  );

  return (
    <div>
      <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
        3. Select Quantity
      </h3>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setQuantity(state.quantity - 25)}
          disabled={state.quantity <= MIN_QUANTITY}
          className="w-10 h-10 rounded-full border border-[#2A7A6F]/20 flex items-center justify-center text-[#2A7A6F] hover:bg-[#E8F5F3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>

        <input
          type="number"
          min={MIN_QUANTITY}
          value={state.quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || MIN_QUANTITY)}
          className="w-20 text-center text-lg font-bold text-[#2C1A0E] border border-[#2A7A6F]/20 rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-[#2A7A6F]/30 bg-white"
        />

        <button
          onClick={() => setQuantity(state.quantity + 25)}
          className="w-10 h-10 rounded-full border border-[#2A7A6F]/20 flex items-center justify-center text-[#2A7A6F] hover:bg-[#E8F5F3] transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        {PRICING_TIERS.slice()
          .reverse()
          .map((tier) => {
            const active = state.quantity >= tier.minQuantity;
            return (
              <div
                key={tier.minQuantity}
                className={`flex items-center justify-between text-xs px-3 py-1.5 rounded-lg transition-colors ${
                  active
                    ? "bg-[#E8F5F3] text-[#1F5C53] font-semibold"
                    : "text-[#7A6458]"
                }`}
              >
                <span>{tier.minQuantity}+ pieces</span>
                <span>{formatPrice(tier.unitPrice)} each</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
