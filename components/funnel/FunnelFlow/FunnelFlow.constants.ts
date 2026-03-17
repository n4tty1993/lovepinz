import type {
  OccasionOption,
  PinStyleOption,
  FunnelScreen,
  TipItem,
  TierOption,
} from "./FunnelFlow.types";

export const OCCASIONS: OccasionOption[] = [
  {
    id: "pet",
    label: "My Pet",
    title: "Custom Enamel Pin\nfor My Pet",
    desc: "Immortalize your furry friend in pin form",
    tag: "Paw-fect Gift \ud83d\udc36",
    slides: [
      {
        emoji: "\ud83d\udc36",
        bg: "#fff5e0",
        label: "Dog",
        image: "/assets/pet/1.webp",
      },
      {
        emoji: "\ud83d\udc31",
        bg: "#f5f0ff",
        label: "Cat",
        image: "/assets/pet/2.webp",
      },
      {
        emoji: "\ud83d\udc30",
        bg: "#fff0f5",
        label: "Bunny",
        image: "/assets/pet/3.webp",
      },
      {
        emoji: "\ud83d\udc3e",
        bg: "#f0fff5",
        label: "Paw Print",
        image: "/assets/pet/4.webp",
      },
      {
        emoji: "\ud83e\udd9c",
        bg: "#f0f5ff",
        label: "Bird",
        image: "/assets/pet/5.webp",
      },
      {
        emoji: "\ud83d\udc20",
        bg: "#e8f8ff",
        label: "Fish",
        image: "/assets/pet/6.webp",
      },
    ],
  },
  {
    id: "wedding",
    label: "Wedding Guests",
    title: "Custom Enamel Pin\nfor Wedding Guests",
    desc: "Give every guest a keepsake they'll actually keep",
    tag: "Most Popular \ud83c\udf89",
    slides: [
      {
        emoji: "\ud83d\udc8d",
        bg: "#fff0f5",
        label: "Ring Design",
        image: "/assets/wedding/1.webp",
      },
      {
        emoji: "\ud83c\udf38",
        bg: "#fff5f0",
        label: "Floral",
        image: "/assets/wedding/2.webp",
      },
      {
        emoji: "\ud83d\udd4a\ufe0f",
        bg: "#f0f5ff",
        label: "Dove",
        image: "/assets/wedding/3.webp",
      },
      {
        emoji: "\ud83d\udcd2",
        bg: "#f5f0ff",
        label: "Chapel",
        image: "/assets/wedding/4.webp",
      },
    ],
  },
  // {
  //   id: "birthday",
  //   label: "Birthday Party",
  //   title: "Custom Enamel Pin\nfor Birthday Party",
  //   desc: "Turn the birthday star into a wearable icon",
  //   tag: "Fan Favorite \u2728",
  //   slides: [
  //     { emoji: "\ud83c\udf82", bg: "#fff5f0", label: "Cake" },
  //     { emoji: "\ud83c\udf88", bg: "#f5f0ff", label: "Balloon" },
  //     { emoji: "\ud83c\udf89", bg: "#fff0f5", label: "Confetti" },
  //     { emoji: "\ud83c\udf81", bg: "#f0fff5", label: "Gift" },
  //     { emoji: "\ud83d\udc51", bg: "#fffbe0", label: "Crown" },
  //     { emoji: "\ud83c\udf1f", bg: "#f0f5ff", label: "Star" },
  //   ],
  // },
];

export const PIN_STYLES: PinStyleOption[] = [
  {
    id: "classic",
    label: "Classic Round",
    desc: "Timeless circular shape",
    badge: "Most Popular",
    color: "#fff8e8",
    border: "#f5d88a",
    radius: "50%",
  },
  {
    id: "diecut",
    label: "Die-Cut Shape",
    desc: "Custom outline of your photo",
    badge: "Fan Favorite",
    color: "#f0fff8",
    border: "#8ae8c4",
    radius: "12px",
  },
  {
    id: "heart",
    label: "Heart Shape",
    desc: "Perfect for gifts & love",
    badge: "Trending",
    color: "#fff0f5",
    border: "#f5a0c0",
    radius: "50% 50% 0 0 / 60% 60% 0 0",
  },
];

export const TIERS: TierOption[] = [
  {
    id: "t1",
    range: "10-49 pcs",
    price: 9.99,
    min: 10,
    max: 49,
    label: "YOUR TIER",
    labelColor: "#1a1a1a",
  },
  {
    id: "t2",
    range: "50-99 pcs",
    price: 7.99,
    min: 50,
    max: 99,
    label: "POPULAR",
    labelColor: "#888",
  },
  {
    id: "t3",
    range: "100+ pcs",
    price: 5.99,
    min: 100,
    max: Infinity,
    label: "BEST VALUE",
    labelColor: "#2a7a6f",
    badge: true,
  },
];

export const TIPS: TipItem[] = [
  { icon: "\u2600\ufe0f", text: "Good lighting makes colors pop" },
  { icon: "\ud83c\udfaf", text: "Center your subject in the frame" },
  { icon: "\ud83d\udcd0", text: "Square or portrait works best" },
  { icon: "\ud83d\udeab", text: "Avoid blurry or dark photos" },
];

export const PROCESSING_STEPS = [
  "Analyzing your photo\u2026",
  "Detecting edges & shapes\u2026",
  "Generating pin designs\u2026",
  "Almost ready!",
];

export const FUNNEL_STEP_LABELS: Record<FunnelScreen, string> = {
  occasion: "Occasion",
  upload: "Upload Photo",
  processing: "Processing",
  style: "Pick Style",
  quantity: "Select Quantity",
  summary: "Order Summary",
};

export function getTier(qty: number): TierOption {
  return TIERS.find((t) => qty >= t.min && qty <= t.max) ?? TIERS[0];
}
