export interface VideoSlide {
  id: number;
  type: "video";
  vimeoId: string;
  vimeoHash?: string;
  username: string;
  platform: "instagram" | "tiktok";
}

export interface PlaceholderSlide {
  id: number;
  type: "placeholder";
  bg: [string, string];
  accent: string;
  emoji: string;
  label: string;
  username: string;
  platform: "instagram" | "tiktok";
}

export type Slide = VideoSlide | PlaceholderSlide;
