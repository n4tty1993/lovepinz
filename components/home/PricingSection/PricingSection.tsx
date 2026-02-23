"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { PRICING_TIERS } from "./PricingSection.constants";
import {
  fadeUpVariants,
  staggerContainerVariants,
  HOVER_SPRING,
} from "@/constants/animations";

export function PricingSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="bg-[#FFF0E8] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Simple, Volume-Based Pricing
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10"
          variants={shouldReduceMotion ? undefined : staggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.2 }}
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div
              key={tier.quantity}
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -8 }}
              transition={HOVER_SPRING}
              className={`relative rounded-2xl p-8 border bg-white shadow-sm ${
                tier.popular
                  ? "ring-2 ring-[#2A7A6F] border-[#2A7A6F]/30 shadow-teal-100/60"
                  : "border-[#2A7A6F]/20 hover:border-[#2A7A6F]/40 hover:shadow-md hover:shadow-teal-100/40"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#2A7A6F] text-white text-xs font-bold shadow-sm">
                  Most Popular
                </div>
              )}
              <p className="text-[#7A6458] text-sm mb-2">
                {tier.quantity} pieces
              </p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-[#2C1A0E]">
                  {tier.unitPrice}
                </span>
                <span className="text-[#7A6458] text-sm">/each</span>
              </div>
              <p className="text-[#2A7A6F] text-sm font-medium">
                Total: {tier.total}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-[#7A6458] text-sm mb-8">
            Final price depends on size &amp; finish selected.
          </p>
          <Link
            href="/product"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-[#2A7A6F] text-white hover:bg-[#1F5C53] transition-all hover:scale-[1.02] shadow-lg shadow-teal-100/60"
          >
            Calculate My Price
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
