"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { CLOTHING_EXAMPLES } from "./MagnetStrength.constants";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/constants/animations";

export function MagnetStrength() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Magnet Quality
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            How Strong Are The Magnets?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="rounded-3xl overflow-hidden aspect-square relative"
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src="/assets/how-strong-our-magnets/strong.webp"
              alt="Close-up of dual neodymium magnet backing"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            variants={shouldReduceMotion ? undefined : staggerContainerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className="text-lg leading-relaxed text-[#7A6458]"
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
            >
              Our pins use dual neodymium magnets that hold firmly through
              standard fabrics. The two-point attachment prevents spinning and
              keeps your pin exactly where you place it.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-3"
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
            >
              {CLOTHING_EXAMPLES.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-xl bg-[#EDF5EA] px-4 py-3"
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-xs font-medium text-[#2C1A0E]">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
