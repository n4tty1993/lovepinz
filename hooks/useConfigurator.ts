"use client";

import { useContext } from "react";
import { ConfiguratorContext } from "@/contexts/ConfiguratorContext";

export function useConfigurator() {
  const ctx = useContext(ConfiguratorContext);
  if (!ctx) {
    throw new Error("useConfigurator must be used within ConfiguratorProvider");
  }
  return ctx;
}
