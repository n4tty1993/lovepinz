import { type ReactNode } from "react";

export interface TrustItem {
  icon: ReactNode;
  label: string;
  detail: string;
}

export const TRUST_ITEMS: TrustItem[] = [
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    label: "Free Shipping",
    detail:
      "We offer free shipping on all orders — no minimum spend, no hidden fees. Allow 7 business days for production, plus up to 14 days for delivery depending on your location.",
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    label: "No Fabric Damage",
    detail:
      "Our magnetic pins attach without needles, glue, or heat — so your fabrics, uniforms, and garments stay in perfect condition. Safe on all materials including delicate weaves and professional attire.",
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
        <line x1="4" y1="3" x2="8" y2="3" />
        <line x1="16" y1="3" x2="20" y2="3" />
      </svg>
    ),
    label: "Super Strong N52 Magnets",
    detail:
      "Our pins use Grade N52 neodymium magnets — the strongest commercially available. They hold firmly through thick fabrics, uniforms, and layered materials without slipping or rotating, yet release cleanly in seconds.",
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    label: "Secure Checkout",
    detail:
      "All transactions are protected with 256-bit SSL encryption. We accept all major credit cards, PayPal, and Shop Pay. Your payment details are never stored on our servers.",
  },
];
