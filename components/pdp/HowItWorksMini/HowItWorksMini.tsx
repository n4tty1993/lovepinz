"use client";

import { motion, useReducedMotion } from "motion/react";
import { MINI_STEPS } from "./HowItWorksMini.constants";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/constants/animations";

export function HowItWorksMini() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#EDF5EA] py-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.p
          className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-8"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          How It Works
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={shouldReduceMotion ? undefined : staggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
        >
          {MINI_STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#2A7A6F]/10 flex items-center justify-center">
                <step.icon className="w-5 h-5 text-[#2A7A6F]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#2A7A6F]">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-[#2C1A0E]">
                  {step.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
