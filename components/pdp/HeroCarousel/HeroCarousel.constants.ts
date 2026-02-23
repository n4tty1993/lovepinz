export interface CarouselSlide {
  id: number;
  tag: string;
  headline: string;
  sub: string;
  bg: string;
  accent: string;
  pins: { size: number; color: string; x: number; y: number }[];
  emoji: string;
  stat: string;
}

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    tag: "Brand Identity",
    headline: "Turn Your Logo Into a Pin",
    sub: "Perfect for staff uniforms, events & branded merch",
    bg: "linear-gradient(135deg, #1e1e2e 0%, #1e5c55 100%)",
    accent: "#b2d8d4",
    pins: [
      { size: 64, color: "#D4A843", x: 18, y: 30 },
      { size: 46, color: "#C9856B", x: 62, y: 55 },
      { size: 36, color: "#A8A9AD", x: 78, y: 22 },
    ],
    emoji: "🏷️",
    stat: "500k+ pins shipped",
  },
  {
    id: 2,
    tag: "Events & Conferences",
    headline: "Make Every Attendee a Brand Ambassador",
    sub: "Bulk pricing from 25 pcs · Free proof included",
    bg: "linear-gradient(135deg, #0f2027 0%, #1e5c55 100%)",
    accent: "#7ed4cc",
    pins: [
      { size: 72, color: "#A8A9AD", x: 20, y: 25 },
      { size: 48, color: "#2C2C2C", x: 65, y: 45 },
      { size: 40, color: "#D4A843", x: 75, y: 15 },
    ],
    emoji: "🎪",
    stat: "No needle. No fabric damage.",
  },
  {
    id: 3,
    tag: "Creator Merch",
    headline: "Your Art. On a Magnetic Pin.",
    sub: "Illustration, photography, typography — any design works",
    bg: "linear-gradient(135deg, #2a7a6f 0%, #1e1e2e 100%)",
    accent: "#f0bf60",
    pins: [
      { size: 56, color: "#C9856B", x: 15, y: 40 },
      { size: 68, color: "#D4A843", x: 60, y: 20 },
      { size: 38, color: "#A8A9AD", x: 80, y: 58 },
    ],
    emoji: "🎨",
    stat: "4 premium finishes available",
  },
  {
    id: 4,
    tag: "Customer Designs",
    headline: "Real Pins. Made by Real People.",
    sub: "Join thousands of happy customers worldwide",
    bg: "linear-gradient(135deg, #1e5c55 0%, #1e1e2e 100%)",
    accent: "#a8d8a8",
    pins: [
      { size: 52, color: "#D4A843", x: 22, y: 35 },
      { size: 44, color: "#C9856B", x: 70, y: 50 },
      { size: 60, color: "#2C2C2C", x: 55, y: 18 },
    ],
    emoji: "⭐",
    stat: "4.9 / 5 average rating",
  },
];
