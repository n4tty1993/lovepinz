"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { TRUST_BULLETS } from "./FinalCTA.constants";
import {
  EASE_EXPO_OUT,
  fadeUpVariants,
  staggerContainerVariants,
} from "@/constants/animations";

function MagneticButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 20 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || shouldReduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    rawY.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={shouldReduceMotion ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#2A7A6F] py-32 overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center"
        variants={shouldReduceMotion ? undefined : staggerContainerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          className="w-12 h-1 bg-white/20 rounded mx-auto mb-10"
        />

        <motion.h2
          variants={
            shouldReduceMotion
              ? undefined
              : {
                  hidden: { opacity: 0, y: 60 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: EASE_EXPO_OUT },
                  },
                }
          }
          className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8"
        >
          Ready to Design Your{" "}
          <span className="underline decoration-white/40 decoration-wavy underline-offset-4">
            Magnetic Pins?
          </span>
        </motion.h2>

        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          className="mb-10"
        >
          <MagneticButton
            href="/product"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full text-lg font-bold bg-white text-[#2C1A0E] hover:bg-[#FFF9F4] transition-colors shadow-2xl shadow-teal-900/20"
          >
            Start Designing
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          className="flex flex-wrap justify-center gap-6 text-white/70 text-sm"
        >
          {TRUST_BULLETS.map((bullet) => (
            <span key={bullet}>✓ {bullet}</span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
