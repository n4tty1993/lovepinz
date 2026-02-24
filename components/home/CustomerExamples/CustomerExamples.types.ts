import type { StaticImageData } from "next/image";

export interface ExampleItem {
  label: string;
  category: string;
  image: StaticImageData;
  bg: string;
}
