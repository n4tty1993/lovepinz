/**
 * Meta Pixel helper — type-safe wrappers around fbq() standard events.
 *
 * The base pixel script is loaded in app/layout.tsx.
 * These helpers fire browser-side events with the parameters Meta recommends
 * for e-commerce: https://developers.facebook.com/docs/meta-pixel/reference
 */

type FbqStandard = (
  method: "track",
  event: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    fbq?: FbqStandard & { callMethod?: unknown; queue?: unknown[] };
  }
}

function fbq(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}

/** Fires on every page / route change. */
export function trackPageView() {
  fbq("PageView");
}

/** Fires when a user views a product (PDP). */
export function trackViewContent(params: {
  contentName: string;
  contentCategory: string;
  contentIds: string[];
  contentType: "product";
  value: number;
  currency: string;
}) {
  fbq("ViewContent", {
    content_name: params.contentName,
    content_category: params.contentCategory,
    content_ids: params.contentIds,
    content_type: params.contentType,
    value: params.value,
    currency: params.currency,
  });
}

/** Fires when a user clicks "Add to Cart". */
export function trackAddToCart(params: {
  contentName: string;
  contentIds: string[];
  contentType: "product";
  value: number;
  currency: string;
  quantity: number;
}) {
  fbq("AddToCart", {
    content_name: params.contentName,
    content_ids: params.contentIds,
    content_type: params.contentType,
    value: params.value,
    currency: params.currency,
    num_items: params.quantity,
  });
}

/** Fires when a user lands on the checkout page. */
export function trackInitiateCheckout(params: {
  contentIds: string[];
  contentType: "product";
  value: number;
  currency: string;
  numItems: number;
}) {
  fbq("InitiateCheckout", {
    content_ids: params.contentIds,
    content_type: params.contentType,
    value: params.value,
    currency: params.currency,
    num_items: params.numItems,
  });
}

/** Fires after a successful purchase / order confirmation. */
export function trackPurchase(params: {
  contentIds: string[];
  contentType: "product";
  value: number;
  currency: string;
  numItems: number;
}) {
  fbq("Purchase", {
    content_ids: params.contentIds,
    content_type: params.contentType,
    value: params.value,
    currency: params.currency,
    num_items: params.numItems,
  });
}
