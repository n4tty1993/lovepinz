"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/meta-pixel";

/**
 * Fires a Meta Pixel PageView on every client-side route change.
 *
 * The initial PageView is already fired by the inline base-code in layout.tsx.
 * This component handles subsequent SPA navigations that Next.js App Router
 * performs without a full page reload.
 */
export function MetaPixelPageView() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip the very first render — the inline script already fired PageView.
    // On subsequent navigations useEffect re-runs because pathname changed.
    trackPageView();
  }, [pathname]);

  return null;
}
