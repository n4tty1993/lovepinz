"use client";

import { useState, useRef, useEffect } from "react";
import { useConfigurator } from "@/hooks/useConfigurator";
import { SIZE_OPTIONS, FINISH_OPTIONS } from "../Configurator.constants";
import type { PinSize } from "@/contexts/ConfiguratorContext";

const SIZE_PX: Record<string, number> = {
  "1": 32,
  "1.25": 44,
  "1.5": 56,
  "2": 72,
};

export function SizeStep() {
  const { state, dispatch } = useConfigurator();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const selectedFinish = FINISH_OPTIONS.find((f) => f.value === state.finish);
  const finishColor = selectedFinish?.color ?? "#D4A843";

  useEffect(() => {
    if (!tooltipOpen) return;
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setTooltipOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [tooltipOpen]);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="font-bold text-base">Choose Size</span>
        <div ref={tooltipRef} className="relative">
          <button
            type="button"
            onClick={() => setTooltipOpen((v) => !v)}
            className="w-[18px] h-[18px] rounded-full bg-[#2A7A6F] text-white text-[10px] font-extrabold border-none cursor-pointer leading-[18px] p-0"
          >
            ?
          </button>
          {tooltipOpen && (
            <>
              <div
                className="fixed inset-0 z-[98]"
                onClick={() => setTooltipOpen(false)}
              />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[26px] bg-[#1e1e2e] text-white rounded-[11px] px-3.5 py-3 w-[195px] z-[99] shadow-[0_8px_28px_rgba(0,0,0,0.25)] text-xs">
                <div className="font-bold mb-1.5">Size Guide</div>
                {[
                  '1" — Collar / lapel',
                  '1.25" — Most popular',
                  '1.5" — Bold statement',
                  '2" — Maximum impact',
                ].map((s) => (
                  <div key={s} className="mb-1 opacity-85">
                    • {s}
                  </div>
                ))}
                <div className="absolute left-1/2 -translate-x-1/2 rotate-45 -bottom-1 w-2 h-2 bg-[#1e1e2e]" />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-end justify-around mb-1.5">
        {SIZE_OPTIONS.map((opt) => {
          const px = SIZE_PX[opt.value];
          const active = state.size === opt.value;

          return (
            <div
              key={opt.value}
              onClick={() =>
                dispatch({ type: "SET_SIZE", size: opt.value as PinSize })
              }
              className="cursor-pointer text-center flex-1"
            >
              <div className="flex justify-center items-end h-[84px] mb-2.5">
                <div
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: px,
                    height: px,
                    background: active ? finishColor : "#e5e7eb",
                    border: `3px solid ${active ? finishColor : "transparent"}`,
                    boxShadow: active
                      ? `0 0 0 4px ${finishColor}33, 0 4px 14px ${finishColor}44`
                      : "none",
                  }}
                />
              </div>
              <div
                className={`text-sm mb-0.5 transition-colors duration-200 ${
                  active
                    ? "font-extrabold text-[#2A7A6F]"
                    : "font-semibold text-[#999]"
                }`}
              >
                {opt.diameter}
              </div>
              <div
                className={`text-[10px] font-semibold transition-colors duration-200 ${
                  active ? "text-[#b2d8d4]" : "text-[#ccc]"
                }`}
              >
                {opt.label}
              </div>
              <div
                className="w-1.5 h-1.5 rounded-full mx-auto mt-2 transition-colors duration-200"
                style={{
                  background: active ? "#2A7A6F" : "transparent",
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#f0f0f0] mt-2 pt-3.5 flex items-center justify-between">
        <div className="text-xs text-[#aaa]">Selected size</div>
        <div className="flex items-center gap-2">
          <div
            className="w-3.5 h-3.5 rounded-full"
            style={{
              background: finishColor,
              boxShadow: `0 0 0 2px ${finishColor}44`,
            }}
          />
          <span className="text-[13px] font-extrabold text-[#1e1e2e]">
            {SIZE_OPTIONS.find((o) => o.value === state.size)?.diameter} Pin
          </span>
          <span className="text-[11px] text-[#aaa]">·</span>
          <span className="text-[11px] text-[#888]">
            {selectedFinish?.label} finish
          </span>
        </div>
      </div>
    </div>
  );
}
