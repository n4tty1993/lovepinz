const WEBHOOK_URL =
  "https://hook.eu1.make.com/jh8wb6jc6wa0bt2glrfmsr1t28tjx8pf";

export function sendAddToCartWebhook(params: {
  quantity: number;
  size: string;
  finish: string;
  unitPrice: number;
  totalPrice: number;
  finalPrice: number;
  couponDiscount: number;
  hasCoupon: boolean;
  email: string | null;
}) {
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...params,
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {
    // Fire-and-forget — don't block the user flow
  });
}
