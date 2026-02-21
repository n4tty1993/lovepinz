import { Upload, CheckCircle, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface MiniStep {
  icon: LucideIcon;
  label: string;
}

export const MINI_STEPS: MiniStep[] = [
  { icon: Upload, label: "Upload your design" },
  { icon: CheckCircle, label: "Approve your proof" },
  { icon: Package, label: "We produce & ship" },
];
