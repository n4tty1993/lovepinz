"use client";

import { motion, useReducedMotion } from "motion/react";
import { USE_CASES } from "./UseCases.constants";
import {
  EASE_EXPO_OUT,
  fadeUpVariants,
  HOVER_SPRING,
} from "@/constants/animations";

export function UseCases() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#EDF5EA] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          className="text-center mb-16"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Who Orders From Us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Perfect For
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 0.7, ease: EASE_EXPO_OUT, delay: i * 0.08 }
              }
              whileHover={shouldReduceMotion ? undefined : { y: -8 }}
              className="group relative rounded-2xl border border-[#2A7A6F]/20 bg-white p-8 hover:border-[#2A7A6F]/40 hover:shadow-md hover:shadow-teal-100/40 overflow-hidden"
            >
              {/* Teal bottom border accent — animates in on hover */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2A7A6F]"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={shouldReduceMotion ? undefined : { scaleX: 1 }}
                transition={{ duration: 0.3, ease: EASE_EXPO_OUT }}
              />

              <div className="w-12 h-12 rounded-full bg-[#FFF0E8] flex items-center justify-center mb-5 text-2xl">
                {uc.icon}
              </div>
              <h3 className="text-lg font-bold text-[#2C1A0E] mb-2 group-hover:text-[#2A7A6F] transition-colors">
                {uc.title}
              </h3>
              <p className="text-[#7A6458] text-sm leading-relaxed">
                {uc.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
