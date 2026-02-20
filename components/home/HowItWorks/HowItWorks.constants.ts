import { Upload, CheckCircle, Package } from "lucide-react";
import type { Step } from "./HowItWorks.types";

export const STEPS: Step[] = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Design",
    description:
      "Send us your artwork in PNG, AI, PDF, or any common format. Our team reviews every file.",
  },
  {
    number: "02",
    icon: CheckCircle,
    title: "Approve Your Proof",
    description:
      "We'll email you a free digital proof. No production starts until you've reviewed and approved.",
  },
  {
    number: "03",
    icon: Package,
    title: "Receive Your Pins",
    description:
      "Your custom magnetic pins ship free, straight to your door. Ready to wear.",
  },
];
