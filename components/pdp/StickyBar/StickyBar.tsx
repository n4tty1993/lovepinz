"use client";

import { motion, useReducedMotion } from "motion/react";
import { useConfigurator } from "@/hooks/useConfigurator";
import { formatPrice } from "@/core/pricing";

export function StickyBar() {
  const shouldReduceMotion = useReducedMotion();
  const { state, derived } = useConfigurator();

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#2A7A6F]/20 px-4 py-3 shadow-lg shadow-black/10"
      initial={shouldReduceMotion ? false : { y: 100 }}
      animate={shouldReduceMotion ? undefined : { y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-[#7A6458]">{state.quantity} pins</p>
          <p className="text-lg font-bold text-[#2C1A0E]">
            {formatPrice(derived.totalPrice)}
          </p>
        </div>
        <button
          disabled={!derived.canAddToCart}
          onClick={() => {
            console.log("Add to cart", { state, derived });
          }}
          className="flex-1 max-w-[200px] py-3 rounded-full text-sm font-bold bg-[#F0C060] text-[#2C1A0E] hover:bg-[#D4972A] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
