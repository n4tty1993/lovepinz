export interface Guideline {
  title: string;
  description: string;
}

export const GUIDELINES: Guideline[] = [
  {
    title: "Vector files preferred",
    description:
      "AI, SVG, or EPS files give the best results. They scale perfectly to any pin size without losing quality.",
  },
  {
    title: "Minimum 300 DPI for raster images",
    description:
      "If you're uploading a PNG or JPG, make sure it's at least 300 DPI at the final pin size. Low-resolution images may appear blurry.",
  },
  {
    title: "Avoid very small text",
    description:
      "Text smaller than 6pt may not be legible on a pin. Keep text clear and bold for the best results at small sizes.",
  },
  {
    title: "Color mode",
    description:
      "CMYK or Pantone colors are preferred for accurate color matching. RGB files will be converted, which may shift colors slightly.",
  },
];
