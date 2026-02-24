"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import heroImg from "@/public/assets/home-page/hero.webp";
import { TRUST_ITEMS } from "@/components/home/TrustStrip/TrustStrip.constants";
import {
  EASE_EXPO_OUT,
  fadeUpVariants,
  staggerContainerVariants,
} from "@/constants/animations";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Note: hooks must run unconditionally per React rules; values are only
  // applied in style props when shouldReduceMotion is false.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Gradient drifts UP (negative) as you scroll — true parallax direction
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  // Image card drifts UP slower than text — creates depth between columns
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white flex items-center overflow-hidden"
    >
      {/* Parallax background gradient — extends beyond bounds so upward drift doesn't reveal gaps */}
      <motion.div
        className="absolute -top-20 -bottom-20 left-0 right-0 bg-[radial-gradient(ellipse_at_top_right,_#FFF0E8_0%,_transparent_60%)] pointer-events-none"
        style={shouldReduceMotion ? undefined : { y: bgY }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* Text stagger container */}
        <motion.div
          className="flex flex-col gap-8"
          variants={shouldReduceMotion ? undefined : staggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-[#2A7A6F]/30 bg-[#E8F5F3]"
          >
            <span className="w-2 h-2 rounded-full bg-[#2A7A6F] animate-pulse" />
            <span className="text-xs font-semibold text-[#1F5C53] tracking-widest uppercase">
              Custom Enamel Pins
            </span>
          </motion.div>

          <motion.h1
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2C1A0E] leading-[1.05] tracking-tight"
          >
            Design Your Own{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#2A7A6F]">Magnetic</span>
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#2A7A6F]/40 rounded" />
            </span>{" "}
            Pins
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="text-lg text-[#7A6458] max-w-lg leading-relaxed"
          >
            Custom enamel pins with strong magnetic backing.{" "}
            <span className="text-[#2C1A0E] font-semibold">
              No holes. No fabric damage.
            </span>{" "}
            Minimum 25 pieces.
          </motion.p>

          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/product"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-[#2A7A6F] text-white hover:bg-[#1F5C53] transition-all hover:scale-[1.02] shadow-lg shadow-teal-100/60"
            >
              Start Designing
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold border border-[#2A7A6F]/30 text-[#2C1A0E] bg-[#E8F5F3] hover:bg-[#D0EDE9] transition-colors"
            >
              Check our Pricing
            </Link>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="flex flex-wrap gap-x-5 gap-y-2 pt-2"
          >
            {TRUST_ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="text-[#2A7A6F] font-bold text-sm">✓</span>
                <span className="text-sm text-[#7A6458]">{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Product image — delayed entrance + scroll parallax (drifts up slower than text) */}
        <Link href="/product" className="block">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#2A7A6F]/20 shadow-xl shadow-teal-100/40">
            <Image
              src={heroImg}
              alt="Custom magnetic enamel pins"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              placeholder="blur"
              priority
              preload
            />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#2A7A6F]/30 rounded-tr-2xl" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#2A7A6F]/30 rounded-bl-2xl" />
          </div>
        </Link>
      </div>
    </section>
  );
}
