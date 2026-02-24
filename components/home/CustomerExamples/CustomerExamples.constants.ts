import type { ExampleItem } from "./CustomerExamples.types";

import logoImg from "@/public/assets/made-by-our-customers/logo.png";
import weddingImg from "@/public/assets/made-by-our-customers/wedding.png";
import clubImg from "@/public/assets/made-by-our-customers/club.png";
import merchImg from "@/public/assets/made-by-our-customers/merch.png";
import brandImg from "@/public/assets/made-by-our-customers/brand.png";
import partyImg from "@/public/assets/made-by-our-customers/party.png";

export const EXAMPLES: ExampleItem[] = [
  {
    label: "Logo Pin",
    category: "Small Brand",
    image: logoImg,
    bg: "bg-[#FFF0E8]",
  },
  {
    label: "Wedding Pin",
    category: "Event",
    image: weddingImg,
    bg: "bg-[#EDF5EA]",
  },
  {
    label: "Club Pin",
    category: "Organization",
    image: clubImg,
    bg: "bg-[#FFF0E8]",
  },
  {
    label: "Merch Drop",
    category: "Creator",
    image: merchImg,
    bg: "bg-[#EDF5EA]",
  },
  {
    label: "Brand Pin",
    category: "Small Brand",
    image: brandImg,
    bg: "bg-[#FFF0E8]",
  },
  {
    label: "Party Pin",
    category: "Event",
    image: partyImg,
    bg: "bg-[#EDF5EA]",
  },
];
