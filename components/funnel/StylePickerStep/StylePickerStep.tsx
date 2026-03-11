"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PinStyleOption } from "@/components/funnel/FunnelFlow/FunnelFlow.types";

interface StylePickerStepProps {
  images: string[][];
  onBack: () => void;
  onContinue: (style: PinStyleOption) => void;
}

export function StylePickerStep({
  images,
  onBack,
  onContinue,
}: StylePickerStepProps) {
  // Flatten nested arrays — each entry is [url] or [url1, url2], take first from each
  const flatImages = useMemo(
    () => images.map((group) => group[0]).filter(Boolean),
    [images],
  );

  const [current, setCurrent] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const diff = pointerStartX.current - e.clientX;
    if (Math.abs(diff) > 40) {
      setCurrent((c) =>
        diff > 0 ? Math.min(c + 1, flatImages.length - 1) : Math.max(c - 1, 0),
      );
    }
    pointerStartX.current = null;
  };

  const currentImage = flatImages[current] ?? null;

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5] font-sans">
      {/* Background — light gray with image shifted slightly up */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center bg-[#f5f5f5] pb-[60%]">
        <div className="relative aspect-square w-[90%] max-w-[420px]">
          {currentImage && (
            <Image
              src={currentImage}
              alt={`Option ${current + 1}`}
              fill
              className="block rounded-2xl object-cover"
              unoptimized
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 h-[30%] rounded-b-2xl bg-gradient-to-t from-[#f5f5f5]/40 to-transparent" />
        </div>
      </div>

      {/* Swipe overlay */}
      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={() => {
          pointerStartX.current = null;
        }}
        className="fixed inset-0 z-[1] cursor-grab touch-pan-y"
      />

      {/* Back button */}
      <div className="sticky top-0 z-10 px-5 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center rounded-full border-none bg-black/10 px-2.5 py-2 text-[#1a1a1a] backdrop-blur-[4px]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
      </div>

      <div className="flex-1" />

      {/* Bottom sheet */}
      <div className="sticky bottom-0 z-10 flex flex-col gap-4 rounded-t-[20px] bg-white px-5 pb-8 pt-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="text-center">
          <div className="flex justify-center gap-1.5">
            {flatImages.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className="cursor-pointer rounded transition-all duration-300"
                style={{
                  width: i === current ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? "#2a7a6f" : "#ddd",
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2.5">
          {flatImages.map((url, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "relative h-16 w-16 cursor-pointer overflow-hidden rounded-xl border-[3px] transition-all duration-200",
                i === current
                  ? "border-[#2a7a6f] shadow-[0_4px_12px_rgba(42,122,111,0.3)]"
                  : "border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.12)]",
              )}
            >
              <Image
                src={url}
                alt={`Option ${i + 1}`}
                fill
                className={cn(
                  "object-cover transition-opacity duration-200",
                  i === current ? "opacity-100" : "opacity-55",
                )}
                unoptimized
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            onContinue({
              id: `option-${current}`,
              label: `Option ${current + 1}`,
              desc: "",
              badge: "",
              color: "",
              border: "",
              radius: "",
            })
          }
          className="w-full rounded-[14px] bg-[#2a7a6f] py-[18px] text-base font-bold text-white shadow-[0_4px_16px_rgba(42,122,111,0.3)]"
        >
          Choose Option {current + 1}
        </button>
        <p className="text-center text-xs text-[#bbb]">
          swipe to browse · tap thumbnail to switch
        </p>
      </div>
    </div>
  );
}
