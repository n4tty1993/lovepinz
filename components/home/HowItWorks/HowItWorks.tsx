"use client";

import { motion, useReducedMotion } from "motion/react";
import { STEPS } from "./HowItWorks.constants";
import {
  EASE_EXPO_OUT,
  fadeUpVariants,
  staggerContainerVariants,
  scalePopVariants,
} from "@/constants/animations";

export function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="bg-[#EDF5EA] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Simple Process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Order in 3 Easy Steps
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line — draws in left to right */}
          <motion.div
            className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-[#2A7A6F]/20"
            initial={shouldReduceMotion ? false : { scaleX: 0, originX: 0 }}
            whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE_EXPO_OUT, delay: 0.4 }}
          />

          {/* Step cards stagger container */}
          <motion.div
            className="contents"
            variants={shouldReduceMotion ? undefined : staggerContainerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
          >
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={shouldReduceMotion ? undefined : fadeUpVariants}
                  className="flex flex-col items-center text-center gap-5 relative"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md shadow-teal-100/60 border border-[#2A7A6F]/20">
                      <Icon className="w-8 h-8 text-[#2A7A6F]" />
                    </div>
                    {/* Step number badge — spring pop */}
                    <motion.span
                      variants={shouldReduceMotion ? undefined : scalePopVariants}
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#2A7A6F] text-white text-xs font-bold flex items-center justify-center shadow-sm"
                    >
                      {step.number}
                    </motion.span>
                  </div>
                  <h3 className="text-xl font-bold text-[#2C1A0E]">{step.title}</h3>
                  <p className="text-[#7A6458] leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
