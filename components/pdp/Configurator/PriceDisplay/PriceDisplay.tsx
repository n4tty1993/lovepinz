"use client";

import { useRouter } from "next/navigation";
import { useConfigurator } from "@/hooks/useConfigurator";
import { formatPrice } from "@/core/pricing";
import {
  STYLE_OPTIONS,
  SIZE_OPTIONS,
  FINISH_OPTIONS,
} from "../Configurator.constants";

export function PriceDisplay() {
  const router = useRouter();
  const { state, derived } = useConfigurator();

  const styleName = state.selectedStyle
    ? (STYLE_OPTIONS.find((o) => o.id === state.selectedStyle)?.label ?? "—")
    : null;
  const sizeDiameter =
    SIZE_OPTIONS.find((o) => o.value === state.size)?.diameter ?? `${state.size}"`;
  const finishLabel =
    FINISH_OPTIONS.find((o) => o.value === state.finish)?.label ?? state.finish;

  const rows: {
    label: string;
    value: string;
    warn?: boolean;
    highlight?: boolean;
    green?: boolean;
  }[] = [
    {
      label: "Design style",
      value: styleName ?? "Not selected yet",
      warn: !styleName,
    },
    { label: "Pin size", value: `${sizeDiameter} pin` },
    { label: "Finish", value: finishLabel },
    { label: "Quantity", value: `${state.quantity} pieces` },
    {
      label: "Price per pin",
      value: formatPrice(derived.unitPrice),
      highlight: true,
    },
    { label: "Production", value: "10–14 business days" },
    { label: "Shipping", value: "FREE", green: true },
  ];

  return (
    <div>
      {/* Order Summary card */}
      <div className="rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.07)] border-[1.5px] border-[#b2d8d4]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1e1e2e] to-[#1e5c55] px-[18px] py-3.5">
          <span className="text-white font-extrabold text-sm">
            Order Summary
          </span>
        </div>

        {/* Rows */}
        <div className="bg-white">
          {rows.map(({ label, value, warn, highlight, green }) => (
            <div
              key={label}
              className="flex items-center justify-between px-[18px] py-[11px] border-b border-[#f3f4f6]"
            >
              <span className="text-[13px] text-[#777]">{label}</span>
              <span
                className={`text-[13px] ${
                  warn
                    ? "text-amber-500 font-semibold"
                    : highlight
                      ? "text-[#2A7A6F] font-extrabold"
                      : green
                        ? "text-green-600 font-semibold"
                        : "text-[#1e1e2e] font-semibold"
                }`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="bg-white border-t-[1.5px] border-[#b2d8d4]">
          <div className="flex items-center justify-between px-[18px] py-3.5">
            <span className="text-[15px] font-extrabold text-[#2A7A6F]">
              Total
            </span>
            <span className="text-[22px] font-black text-[#2A7A6F] tracking-tight">
              {formatPrice(derived.totalPrice)}
            </span>
          </div>

          {/* Delivery estimate */}
          <div className="mx-3 mb-3 bg-[#edf5ea] rounded-[10px] px-3.5 py-2.5 flex items-center gap-2.5">
            <span className="text-base">🚚</span>
            <span className="text-xs text-[#555]">
              Estimated delivery in{" "}
              <strong className="text-[#1e1e2e]">10–14 business days</strong>{" "}
              after proof approval
            </span>
          </div>
        </div>
      </div>

      {/* Add to Cart button */}
      <button
        disabled={!derived.canAddToCart}
        onClick={() => router.push("/checkout")}
        className="w-full mt-3 py-4 rounded-2xl text-[17px] font-extrabold bg-[#F0C060] text-[#1e1e2e] hover:bg-[#d4a030] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_14px_rgba(240,192,96,0.6)]"
      >
        Add to Cart
      </button>

      {!derived.isDesignReady && (
        <p className="text-xs text-[#777] text-center mt-2">
          Upload your design to continue
        </p>
      )}
    </div>
  );
}
