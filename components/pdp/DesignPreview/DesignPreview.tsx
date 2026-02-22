"use client";

import Image from "next/image";
import { useConfigurator } from "@/hooks/useConfigurator";

export function DesignPreview() {
  const { state } = useConfigurator();

  return (
    <div className="sticky top-24">
      {state.previewUrl ? (
        <div className="rounded-3xl border border-[#2A7A6F]/20 overflow-hidden shadow-lg shadow-teal-100/40">
          <Image
            src={state.previewUrl}
            alt="Your design preview"
            width={400}
            height={400}
            unoptimized
            className="w-full aspect-square object-contain bg-white p-8"
          />
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[#2A7A6F]/20 bg-gradient-to-br from-[#FFF0E8] via-[#FFE4CC] to-[#FFDAB0] aspect-square flex flex-col items-center justify-center gap-4 p-8">
          <div className="w-20 h-20 rounded-full bg-white/60 flex items-center justify-center">
            <span className="text-3xl">📌</span>
          </div>
          <p className="text-sm font-medium text-[#7A6458] text-center">
            Your custom pin preview
            <br />
            will appear here
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-3">
        <p className="text-xs text-[#7A6458]">Selected size:</p>
        <span className="text-sm font-bold text-[#2C1A0E]">
          {state.size}&quot;
        </span>
      </div>
    </div>
  );
}
