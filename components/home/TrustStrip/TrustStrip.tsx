"use client";

import { motion, useReducedMotion } from "motion/react";
import { TRUST_ITEMS } from "./TrustStrip.constants";
import {
  tightStaggerContainerVariants,
  slideFromLeftItemVariants,
} from "@/constants/animations";

export function TrustStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-[#FFF0E8] border-y border-[#2A7A6F]/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <motion.div
          className="flex flex-wrap justify-center md:justify-between items-center gap-4"
          variants={shouldReduceMotion ? undefined : tightStaggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          {TRUST_ITEMS.map((item) => (
            <motion.div
              key={item}
              variants={shouldReduceMotion ? undefined : slideFromLeftItemVariants}
              className="flex items-center gap-2"
            >
              <span className="text-[#2A7A6F] font-bold text-base">✓</span>
              <span className="text-sm font-medium text-[#2C1A0E]">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
