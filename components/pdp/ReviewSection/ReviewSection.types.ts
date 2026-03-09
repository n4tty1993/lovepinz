export interface Review {
  id: number;
  name: string;
  initials: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export type SortOption = "recent" | "highest" | "lowest" | "helpful";
export type FilterOption = "all" | "5" | "4" | "3" | "2" | "1";

export interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}
