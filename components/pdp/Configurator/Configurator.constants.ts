import type { SizeOption, FinishOption } from "./Configurator.types";

export const SIZE_OPTIONS: SizeOption[] = [
  { value: "1", label: "Small", diameter: '1"' },
  { value: "1.25", label: "Medium", diameter: '1.25"' },
  { value: "1.5", label: "Large", diameter: '1.5"' },
  { value: "2", label: "Extra Large", diameter: '2"' },
];

export const FINISH_OPTIONS: FinishOption[] = [
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "black-nickel", label: "Black Nickel" },
  { value: "rose-gold", label: "Rose Gold" },
];

export const ACCEPTED_FILE_TYPES = ".png,.jpg,.jpeg,.svg,.ai,.pdf";
export const ACCEPTED_FILE_TYPES_LABEL = "PNG, JPG, SVG, AI, PDF";
export const MAX_FILE_SIZE_MB = 25;
