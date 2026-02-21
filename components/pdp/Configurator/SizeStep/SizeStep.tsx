"use client";

import { useConfigurator } from "@/hooks/useConfigurator";
import { SIZE_OPTIONS } from "../Configurator.constants";
import type { PinSize } from "@/contexts/ConfiguratorContext";

export function SizeStep() {
  const { state, dispatch } = useConfigurator();

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#1F5C53]">
          2. Choose Size
        </h3>
        <div className="group relative">
          <span className="text-xs text-[#7A6458] underline decoration-dotted cursor-help">
            Size guide
          </span>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-xl bg-[#2C1A0E] text-white text-xs leading-relaxed opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10">
            Measured across the widest point of the pin. Most popular size is 1.25&quot;.
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2C1A0E]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {SIZE_OPTIONS.map((opt) => {
          const active = state.size === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() =>
                dispatch({ type: "SET_SIZE", size: opt.value as PinSize })
              }
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                active
                  ? "border-[#2A7A6F] bg-[#E8F5F3] ring-2 ring-[#2A7A6F]/30"
                  : "border-[#2A7A6F]/20 bg-white hover:border-[#2A7A6F]/40"
              }`}
            >
              <span className="text-sm font-semibold text-[#2C1A0E]">
                {opt.diameter}
              </span>
              <span className="text-xs text-[#7A6458]">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
