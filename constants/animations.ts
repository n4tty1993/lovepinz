// constants/animations.ts

export const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export const HOVER_SPRING = {
  type: "spring",
  stiffness: 400,
  damping: 25,
} as const;

// Standard fade-up — all section content, headers
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_EXPO_OUT },
  },
};

// Stagger wrapper — apply to parent, children use fadeUpVariants
export const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Slide from left — left-side cards in comparisons
export const slideLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_EXPO_OUT },
  },
};

// Slide from right — right-side cards in comparisons
export const slideRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_EXPO_OUT },
  },
};

// Scale pop — step number badges
export const scalePopVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 20, delay: 0.15 },
  },
};

// Subtle item stagger (tighter delay) — trust strip, list items
export const tightStaggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const slideFromLeftItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_EXPO_OUT },
  },
};
