"use client";

import {
  TIERS,
  getTier,
} from "@/components/funnel/FunnelFlow/FunnelFlow.constants";
import type { TierOption } from "@/components/funnel/FunnelFlow/FunnelFlow.types";
import { FunnelNav } from "@/components/funnel/FunnelNav/FunnelNav";

interface QuantityPickerStepProps {
  qty: number;
  onQtyChange: (qty: number) => void;
  onContinue: (qty: number) => void;
  onBack: () => void;
}

export function QuantityPickerStep({
  qty,
  onQtyChange,
  onContinue,
  onBack,
}: QuantityPickerStepProps) {
  const tier = getTier(qty);
  const nextTier: TierOption | undefined = TIERS.find((t) => t.min > tier.min);
  const toNext = nextTier ? nextTier.min - qty : 0;
  const savings = nextTier
    ? ((tier.price - nextTier.price) * nextTier.min).toFixed(0)
    : "0";

  const change = (delta: number) => onQtyChange(Math.max(10, qty + delta));
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    onQtyChange(Math.max(10, parseInt(e.target.value) || 10));

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5] font-sans">
      <FunnelNav step={3} total={4} label="Select Quantity" onBack={onBack} />

      <div className="mx-auto box-border flex w-full max-w-[480px] flex-1 flex-col gap-5 px-5 pb-8 pt-6">
        <h1 className="text-[22px] font-extrabold tracking-[-0.4px] text-[#1a1a1a]">
          Select Quantity
        </h1>

        {/* Stepper */}
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 px-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <div className="flex w-full items-center gap-2.5">
            <button
              type="button"
              onClick={() => change(-1)}
              className="flex h-[52px] w-[52px] shrink-0 cursor-pointer items-center justify-center rounded-xl border-[1.5px] border-[#e8e8e8] bg-[#f5f5f5] text-2xl font-bold text-[#555]"
            >
              −
            </button>
            <input
              type="number"
              value={qty}
              onChange={handleInput}
              className="h-[52px] min-w-0 flex-1 rounded-xl border-[1.5px] border-[#e8e8e8] bg-white text-center text-[22px] font-extrabold text-[#1a1a1a] outline-none"
            />
            <button
              type="button"
              onClick={() => change(1)}
              className="flex h-[52px] w-[52px] shrink-0 cursor-pointer items-center justify-center rounded-xl border-[1.5px] border-[#e8e8e8] bg-[#f5f5f5] text-2xl font-bold text-[#555]"
            >
              +
            </button>
          </div>
          <p className="text-xs text-[#aaa]">Minimum order: 10 pcs</p>
        </div>

        {/* Tier cards */}
        <div className="flex gap-2.5">
          {TIERS.map((t) => {
            const isCurrent = t.id === tier.id;
            return (
              <div
                key={t.id}
                onClick={() => onQtyChange(t.min)}
                className="relative flex flex-1 cursor-pointer flex-col items-center rounded-[14px] bg-white px-2 py-3 text-center transition-all duration-200"
                style={{
                  border: `2px solid ${isCurrent ? "#1a1a1a" : t.badge ? "#2a7a6f" : "#e8e8e8"}`,
                  boxShadow: isCurrent ? "0 2px 12px rgba(0,0,0,0.1)" : "none",
                }}
              >
                {t.badge && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[20px] bg-[#2a7a6f] px-2 py-[3px] text-[9px] font-extrabold text-white">
                    BEST VALUE
                  </div>
                )}
                {/* Radio circle */}
                <div className="mb-1 flex justify-center">
                  <div
                    className="flex h-[18px] w-[18px] items-center justify-center rounded-full transition-all duration-200"
                    style={{
                      border: `2px solid ${isCurrent ? "#1a1a1a" : "#ccc"}`,
                    }}
                  >
                    {isCurrent && (
                      <div className="h-2 w-2 rounded-full bg-[#1a1a1a]" />
                    )}
                  </div>
                </div>
                <div className="mb-0.5 text-[11px] text-[#888]">{t.range}</div>
                <div
                  className="text-xl font-extrabold leading-tight"
                  style={{ color: t.badge ? "#2a7a6f" : "#1a1a1a" }}
                >
                  ${t.price.toFixed(2)}
                </div>
                <div className="mb-1 text-[11px] text-[#aaa]">each</div>
                <div
                  className="text-[10px] font-extrabold tracking-[0.4px]"
                  style={{ color: t.labelColor }}
                >
                  {t.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Upsell banner */}
        {nextTier && toNext > 0 && (
          <div className="flex items-center gap-3 rounded-[14px] border-[1.5px] border-[#f5d97a] bg-[#fffbe8] p-3.5">
            <div className="flex-1">
              <p className="mb-1 text-sm font-bold text-[#1a1a1a]">
                Add {toNext} more — save $
                {(tier.price - nextTier.price).toFixed(2)}/unit
              </p>
              <p className="text-xs leading-[1.4] text-[#666]">
                At {nextTier.min} pcs you pay{" "}
                <strong>${nextTier.price.toFixed(2)}</strong> each — that&apos;s{" "}
                <strong className="text-[#2a7a6f]">${savings} saved</strong> on
                your order.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onQtyChange(nextTier.min)}
              className="shrink-0 whitespace-nowrap rounded-[10px] bg-[#f5c842] px-3.5 py-2.5 text-[13px] font-extrabold text-[#1a1a1a]"
            >
              Go to {nextTier.min}
            </button>
          </div>
        )}

        {/* Order total */}
        <div className="flex items-center justify-between rounded-[14px] bg-white p-3.5 px-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <span className="text-sm text-[#666]">
            {qty} pcs x ${tier.price.toFixed(2)}
          </span>
          <span className="text-lg font-extrabold text-[#1a1a1a]">
            ${(qty * tier.price).toFixed(2)}
          </span>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => onContinue(qty)}
          className="w-full rounded-full bg-[#2a7a6f] py-4 text-base font-bold text-white shadow-[0_4px_16px_rgba(42,122,111,0.3)]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
