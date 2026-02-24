"use client";

import { UploadStep } from "./UploadStep/UploadStep";
import { SizeStep } from "./SizeStep/SizeStep";
import { QuantityStep } from "./QuantityStep/QuantityStep";
import { FinishStep } from "./FinishStep/FinishStep";
import { PriceDisplay } from "./PriceDisplay/PriceDisplay";

export function Configurator() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-1">
          Custom Magnetic Pins
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#2C1A0E] tracking-tight">
          Design Your Pin
        </h1>
      </div>

      <UploadStep />
      <QuantityStep />
      <FinishStep />
      <SizeStep />
      <PriceDisplay />
    </div>
  );
}
