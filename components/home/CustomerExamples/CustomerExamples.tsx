"use client";

import { motion, useReducedMotion } from "motion/react";
import { EXAMPLES } from "./CustomerExamples.constants";
import {
  fadeUpVariants,
  staggerContainerVariants,
  HOVER_SPRING,
} from "@/constants/animations";

export function CustomerExamples() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          className="text-center mb-16"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Made by Our Customers
          </h2>
          <p className="text-[#7A6458] mt-4 max-w-md mx-auto">
            From weddings to brand launches — see what people are creating.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          variants={shouldReduceMotion ? undefined : staggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
        >
          {EXAMPLES.map((ex, i) => (
            <motion.div
              key={i}
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -10, scale: 1.03 }}
              transition={HOVER_SPRING}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm shadow-teal-100/40 border border-[#2A7A6F]/15"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${ex.gradient} transition-transform duration-300 group-hover:scale-[1.03]`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center shadow-sm">
                  <span className="text-2xl">📌</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#2C1A0E]/30 to-transparent">
                <p className="text-[#2C1A0E] font-semibold text-sm">{ex.label}</p>
                <p className="text-[#2C1A0E]/60 text-xs">{ex.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
