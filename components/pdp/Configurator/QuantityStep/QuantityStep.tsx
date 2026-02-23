"use client";

import { useCallback } from "react";
import { useConfigurator } from "@/hooks/useConfigurator";
import { MIN_QUANTITY } from "@/core/pricing";

const TIERS = [
  { min: 25, max: 49, price: 3.0, label: "25–49" },
  { min: 50, max: 99, price: 2.6, label: "50–99" },
  { min: 100, max: 999, price: 2.2, label: "100+" },
];

function getPricePerUnit(qty: number) {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (qty >= TIERS[i].min) return TIERS[i].price;
  }
  return TIERS[0].price;
}

export function QuantityStep() {
  const { state, dispatch } = useConfigurator();

  const setQuantity = useCallback(
    (qty: number) => {
      const clamped = Math.max(MIN_QUANTITY, qty);
      dispatch({ type: "SET_QUANTITY", quantity: clamped });
    },
    [dispatch],
  );

  const qty = state.quantity;
  const pricePerUnit = getPricePerUnit(qty);

  // Upsell logic
  const nextTier = TIERS.find((t) => qty < t.min);
  const isMaxTier = qty >= 100;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="font-bold text-base">Select Quantity</span>
      </div>

      {/* +/- input */}
      <div className="flex items-center gap-3 mb-3.5">
        <button
          onClick={() => setQuantity(qty - 25)}
          disabled={qty <= MIN_QUANTITY}
          className="w-11 h-11 rounded-[11px] border-[1.5px] border-[#e5e7eb] bg-white text-xl font-bold text-[#1e1e2e] cursor-pointer flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          −
        </button>
        <input
          type="number"
          min={MIN_QUANTITY}
          value={qty}
          onChange={(e) =>
            setQuantity(parseInt(e.target.value) || MIN_QUANTITY)
          }
          className="min-w-0 flex-1 h-11 text-center border-[1.5px] border-[#e5e7eb] rounded-[11px] text-[17px] font-extrabold text-[#1e1e2e] outline-none"
        />
        <button
          onClick={() => setQuantity(qty + 25)}
          className="w-11 h-11 rounded-[11px] border-[1.5px] border-[#e5e7eb] bg-white text-xl font-bold text-[#1e1e2e] cursor-pointer flex items-center justify-center shrink-0"
        >
          +
        </button>
      </div>

      <div className="text-[11px] text-[#aaa] text-center mb-3">
        Minimum order: {MIN_QUANTITY} pcs
      </div>

      {/* Tier cards */}
      <div className="grid grid-cols-3 gap-2 mb-2.5 pt-2">
        {TIERS.map((t) => {
          const active = qty >= t.min && qty <= t.max;
          const isBest = t.label === "100+";
          return (
            <div
              key={t.label}
              onClick={() => setQuantity(t.min)}
              className="relative bg-white text-center cursor-pointer transition-all duration-200 rounded-xl py-3 px-2"
              style={{
                border: `2px solid ${isBest ? "#16a34a" : active ? "#1a1a1a" : "#e5e7eb"}`,
              }}
            >
              {isBest && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap tracking-wide">
                  BEST VALUE
                </div>
              )}
              <div className="text-[10px] text-[#aaa] mb-0.5">
                {t.label} pcs
              </div>
              <div
                className={`font-black text-[17px] ${isBest ? "text-green-600" : "text-[#1a1a1a]"}`}
              >
                ${t.price.toFixed(2)}
              </div>
              <div className="text-[10px] text-[#bbb] mb-1">each</div>
              {t.label === "50–99" && !active && (
                <div className="text-[9px] text-[#aaa] font-bold">POPULAR</div>
              )}
              {active && (
                <div
                  className={`text-[9px] font-bold ${isBest ? "text-green-600" : "text-[#1a1a1a]"}`}
                >
                  {isBest ? "YOUR TIER ✓" : "YOUR TIER"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upsell / congrats banner */}
      {isMaxTier ? (
        <div className="bg-green-50 border-[1.5px] border-green-300 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
          <span className="text-lg">🎉</span>
          <div>
            <div className="text-xs font-extrabold text-green-600">
              You&apos;re getting the best price!
            </div>
            <div className="text-[11px] text-green-400">
              Saving <strong>${((3.0 - 2.2) * qty).toFixed(2)}</strong> vs.
              buying 25 pcs — great choice.
            </div>
          </div>
        </div>
      ) : nextTier ? (
        <div className="bg-amber-50 border-[1.5px] border-amber-300 rounded-xl px-3.5 py-2.5">
          <div className="flex items-start justify-between gap-2.5">
            <div>
              <div className="text-xs font-extrabold text-amber-800 mb-0.5">
                💡 Add {nextTier.min - qty} more → save $
                {(pricePerUnit - nextTier.price).toFixed(2)}/unit
              </div>
              <div className="text-[11px] text-amber-700 leading-relaxed">
                At {nextTier.min} pcs you pay{" "}
                <strong>${nextTier.price.toFixed(2)}</strong> each — that&apos;s{" "}
                <strong>
                  ${((pricePerUnit - nextTier.price) * nextTier.min).toFixed(2)}{" "}
                  saved
                </strong>{" "}
                on your order.
              </div>
            </div>
            <button
              onClick={() => setQuantity(nextTier.min)}
              className="bg-[#f0bf60] text-[#1e1e2e] border-none rounded-lg px-3 py-1.5 text-[11px] font-extrabold cursor-pointer whitespace-nowrap shrink-0"
            >
              Go to {nextTier.min}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
