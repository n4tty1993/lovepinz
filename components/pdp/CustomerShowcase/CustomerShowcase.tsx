"use client";

import { motion, useReducedMotion } from "motion/react";
import { SHOWCASE_ITEMS } from "./CustomerShowcase.constants";
import {
  fadeUpVariants,
  staggerContainerVariants,
  HOVER_SPRING,
} from "@/constants/animations";

export function CustomerShowcase() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#FFF0E8] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Social Proof
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Made by Our Customers
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          variants={shouldReduceMotion ? undefined : staggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
        >
          {SHOWCASE_ITEMS.map((item) => (
            <motion.div
              key={item.label}
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -8 }}
              transition={HOVER_SPRING}
              className={`aspect-square rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center border border-[#2A7A6F]/10 hover:shadow-md hover:shadow-teal-100/40 transition-shadow cursor-pointer`}
            >
              <span className="text-sm font-semibold text-[#2C1A0E]/60">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
