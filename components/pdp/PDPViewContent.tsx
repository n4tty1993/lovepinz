"use client";

import { useEffect } from "react";
import { useConfigurator } from "@/hooks/useConfigurator";
import { trackViewContent } from "@/lib/meta-pixel";

/**
 * Fires Meta Pixel ViewContent when the PDP mounts.
 * Uses the current configurator state (default values) for event params.
 */
export function PDPViewContent() {
  const { derived } = useConfigurator();

  useEffect(() => {
    trackViewContent({
      contentName: "Custom Magnetic Pin",
      contentCategory: "Magnetic Pins",
      contentIds: ["custom-magnetic-pin"],
      contentType: "product",
      value: derived.totalPrice,
      currency: "USD",
    });
    // Fire once on mount — do NOT re-fire when derived changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
