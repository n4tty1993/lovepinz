"use client";

import { motion, useReducedMotion } from "motion/react";
import { SPECS } from "./ProductSpecs.constants";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/constants/animations";

export function ProductSpecs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#FFF9F4] py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Product Details
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Built to Last
          </h2>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-[#2A7A6F]/20 bg-white overflow-hidden"
          variants={shouldReduceMotion ? undefined : staggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
        >
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
              className={`flex items-center justify-between px-6 py-4 ${
                i < SPECS.length - 1 ? "border-b border-[#2A7A6F]/10" : ""
              }`}
            >
              <span className="text-sm font-medium text-[#7A6458]">
                {spec.label}
              </span>
              <span className="text-sm font-semibold text-[#2C1A0E]">
                {spec.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
