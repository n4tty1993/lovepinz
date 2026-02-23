"use client";

import { useConfigurator } from "@/hooks/useConfigurator";
import { FINISH_OPTIONS } from "../Configurator.constants";
import type { PinFinish } from "@/contexts/ConfiguratorContext";

export function FinishStep() {
  const { state, dispatch } = useConfigurator();

  return (
    <div>
      <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
        Select Finish
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {FINISH_OPTIONS.map((opt) => {
          const active = state.finish === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() =>
                dispatch({
                  type: "SET_FINISH",
                  finish: opt.value as PinFinish,
                })
              }
              className={`rounded-xl border px-4 py-3 text-sm font-semibold text-left transition-all ${
                active
                  ? "border-[#2A7A6F] bg-[#E8F5F3] ring-2 ring-[#2A7A6F]/30 text-[#2C1A0E]"
                  : "border-[#2A7A6F]/20 bg-white text-[#2C1A0E] hover:border-[#2A7A6F]/40"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
