export type FunnelScreen =
  | "occasion"
  | "upload"
  | "processing"
  | "style"
  | "quantity"
  | "summary";

export interface OccasionSlide {
  emoji: string;
  bg: string;
  label: string;
  image?: string;
}

export interface OccasionOption {
  id: string;
  label: string;
  title: string;
  desc: string;
  tag: string;
  slides: OccasionSlide[];
}

export interface PinStyleOption {
  id: string;
  label: string;
  desc: string;
  badge: string;
  color: string;
  border: string;
  radius: string;
}

export interface TierOption {
  id: string;
  range: string;
  price: number;
  min: number;
  max: number;
  label: string;
  labelColor: string;
  badge?: boolean;
}

export interface TipItem {
  icon: string;
  text: string;
}

export interface FunnelState {
  screen: FunnelScreen;
  selectedId: string | null;
  uploadedImage: string | null;
  file: File | null;
  chosenStyle: PinStyleOption | null;
  chosenQty: number;
}
