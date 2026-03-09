export interface VideoSlide {
  id: number;
  type: "video";
  vimeoId: string;
  vimeoHash?: string;
  platform: "instagram" | "tiktok";
}

export type Slide = VideoSlide;
