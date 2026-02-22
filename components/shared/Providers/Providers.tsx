"use client";

import type { ReactNode } from "react";
import { ConfiguratorProvider } from "@/contexts/ConfiguratorContext";

export function Providers({ children }: { children: ReactNode }) {
  return <ConfiguratorProvider>{children}</ConfiguratorProvider>;
}
