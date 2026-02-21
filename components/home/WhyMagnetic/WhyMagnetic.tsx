"use client";

import { useRef } from "react";
import { X, Check } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { NEEDLE_ITEMS, MAGNETIC_ITEMS } from "./WhyMagnetic.constants";
import {
  slideLeftVariants,
  slideRightVariants,
  fadeUpVariants,
  staggerContainerVariants,
} from "@/constants/animations";

export function WhyMagnetic() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Note: hooks must run unconditionally per React rules; headerY is only
  // applied in the style prop when shouldReduceMotion is false.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="bg-[#FFF9F4] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header with parallax drift */}
        <motion.div
          className="text-center mb-16"
          style={shouldReduceMotion ? undefined : { y: headerY }}
        >
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.5 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
              The Difference
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
              Why Magnetic Pins?
            </h2>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* Needle card — slides from left */}
          <motion.div
            variants={shouldReduceMotion ? undefined : slideLeftVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl border border-[#2C1A0E]/8 bg-white p-8 shadow-sm shadow-teal-100/40"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-[#7A6458]">Needle Pins</h3>
            </div>
            <motion.ul
              className="flex flex-col gap-4"
              variants={shouldReduceMotion ? undefined : staggerContainerVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.3 }}
            >
              {NEEDLE_ITEMS.map((item) => (
                <motion.li
                  key={item}
                  variants={shouldReduceMotion ? undefined : fadeUpVariants}
                  className="flex items-start gap-3"
                >
                  <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span className="text-[#7A6458]">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Magnetic card — slides from right */}
          <motion.div
            variants={shouldReduceMotion ? undefined : slideRightVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl border border-[#2A7A6F]/30 bg-[#FFF0E8] p-8 shadow-sm shadow-teal-100/40"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#2A7A6F]/15 flex items-center justify-center">
                <span className="text-base">🧲</span>
              </div>
              <h3 className="text-lg font-bold text-[#2A7A6F]">Magnetic Pins</h3>
            </div>
            <motion.ul
              className="flex flex-col gap-4"
              variants={shouldReduceMotion ? undefined : staggerContainerVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.3 }}
            >
              {MAGNETIC_ITEMS.map((item) => (
                <motion.li
                  key={item}
                  variants={shouldReduceMotion ? undefined : fadeUpVariants}
                  className="flex items-start gap-3"
                >
                  <Check className="w-4 h-4 text-[#2A7A6F] mt-0.5 shrink-0" />
                  <span className="text-[#2C1A0E]">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-[#7A6458] text-sm mt-10"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          Strong neodymium magnets hold firmly through most fabric without any damage.
        </motion.p>
      </div>
    </section>
  );
}
