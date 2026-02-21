"use client";

import { motion, useReducedMotion } from "motion/react";
import { TRUST_ITEMS } from "./TrustBar.constants";
import {
  tightStaggerContainerVariants,
  slideFromLeftItemVariants,
} from "@/constants/animations";

export function TrustBar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#FFF0E8] py-4">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
          variants={
            shouldReduceMotion ? undefined : tightStaggerContainerVariants
          }
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          {TRUST_ITEMS.map((item) => (
            <motion.div
              key={item}
              variants={
                shouldReduceMotion ? undefined : slideFromLeftItemVariants
              }
              className="flex items-center gap-1.5"
            >
              <span className="text-[#2A7A6F] font-bold text-sm">✓</span>
              <span className="text-sm font-medium text-[#7A6458]">
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
