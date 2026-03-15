/**
 * Microsoft Clarity helper — manual custom-event wrappers.
 *
 * Clarity is loaded via GTM. These helpers call window.clarity("event", …)
 * so smart events show up even when auto-detection misses them.
 * https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
 */

declare global {
  interface Window {
    clarity?: (method: string, ...args: string[]) => void;
  }
}

function clarityEvent(name: string) {
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("event", name);
  }
}

/** Fires when a user uploads a design image. */
export function clarityUploadImage() {
  clarityEvent("upload_image");
}

/** Fires when a user clicks "Add to Cart". */
export function clarityAddToCart() {
  clarityEvent("add_to_cart");
}

/** Fires when a user lands on the checkout page. */
export function clarityInitiateCheckout() {
  clarityEvent("initiate_checkout");
}

/** Fires after a successful purchase / order confirmation. */
export function clarityPurchase() {
  clarityEvent("purchase");
}
