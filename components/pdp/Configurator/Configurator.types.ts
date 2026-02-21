import type { PinSize, PinFinish } from "@/contexts/ConfiguratorContext";

export interface SizeOption {
  value: PinSize;
  label: string;
  diameter: string;
}

export interface FinishOption {
  value: PinFinish;
  label: string;
}
