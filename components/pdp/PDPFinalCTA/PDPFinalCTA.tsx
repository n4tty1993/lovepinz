"use client";

import { useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { fadeUpVariants, staggerContainerVariants } from "@/constants/animations";

export function PDPFinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 20 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (shouldReduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set((e.clientX - cx) * 0.3);
      rawY.set((e.clientY - cy) * 0.3);
    },
    [rawX, rawY, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const scrollToConfigurator = useCallback(() => {
    document
      .getElementById("configurator")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="bg-[#F0C060] py-32">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          className="flex flex-col items-center gap-6"
          variants={shouldReduceMotion ? undefined : staggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight"
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
          >
            Ready to Create Your
            <br />
            Magnetic Pins?
          </motion.h2>

          <motion.p
            className="text-lg text-[#2C1A0E]/70 max-w-md"
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
          >
            Upload your design and get a free digital proof — no commitment
            required.
          </motion.p>

          <motion.div variants={shouldReduceMotion ? undefined : fadeUpVariants}>
            <motion.button
              onClick={scrollToConfigurator}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={shouldReduceMotion ? undefined : { x, y }}
              className="inline-flex items-center justify-center px-10 py-5 rounded-full text-base font-bold bg-[#2C1A0E] text-white hover:bg-[#1a0f06] transition-colors shadow-2xl shadow-[#2C1A0E]/20"
            >
              Start Designing
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
