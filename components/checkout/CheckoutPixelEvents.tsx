"use client";

import { useEffect } from "react";
import { useConfigurator } from "@/hooks/useConfigurator";
import { trackInitiateCheckout } from "@/lib/meta-pixel";

/**
 * Fires Meta Pixel InitiateCheckout when the checkout page mounts.
 */
export function CheckoutPixelEvents() {
  const { state, derived } = useConfigurator();

  useEffect(() => {
    trackInitiateCheckout({
      contentIds: ["custom-magnetic-pin"],
      contentType: "product",
      value: derived.totalPrice,
      currency: "USD",
      numItems: state.quantity,
    });
    // Fire once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
