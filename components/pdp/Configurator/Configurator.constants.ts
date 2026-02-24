import type { SizeOption, FinishOption } from "./Configurator.types";

export const SIZE_OPTIONS: SizeOption[] = [
  { value: "1", label: "Subtle", diameter: '1"' },
  { value: "1.25", label: "Classic", diameter: '1.25"' },
  { value: "1.5", label: "Bold", diameter: '1.5"' },
  { value: "2", label: "Statement", diameter: '2"' },
];

export const FINISH_OPTIONS: FinishOption[] = [
  { value: "gold", label: "Gold", color: "#D4A843" },
  { value: "silver", label: "Silver", color: "#A8A9AD" },
  { value: "black-nickel", label: "Black Nickel", color: "#2C2C2C" },
  { value: "rose-gold", label: "Rose Gold", color: "#C9856B" },
];

export const ACCEPTED_FILE_TYPES = ".jpg,.jpeg,.png";
export const ACCEPTED_FILE_TYPES_LABEL = "JPG, JPEG, PNG";
export const MAX_FILE_SIZE_MB = 25;

export const WIZARD_STEPS = [
  "upload",
  "processing",
  "choose",
  "result",
] as const;
export const WIZARD_STEP_LABELS: Record<string, string> = {
  upload: "Upload",
  processing: "Processing",
  choose: "Choose Style",
  result: "Done",
};

export const PROCESSING_LABELS = [
  "Noise reduction",
  "Color mapping",
  "Style analysis",
  "Finalizing",
];
