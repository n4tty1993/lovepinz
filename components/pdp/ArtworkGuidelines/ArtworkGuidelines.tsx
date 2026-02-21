"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GUIDELINES } from "./ArtworkGuidelines.constants";
import { fadeUpVariants } from "@/constants/animations";

export function ArtworkGuidelines() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="artwork-guidelines" className="bg-[#FFF9F4] py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            File Requirements
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Artwork Guidelines
          </h2>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Accordion type="multiple" className="flex flex-col gap-3">
            {GUIDELINES.map((item, i) => (
              <AccordionItem
                key={item.title}
                value={`guide-${i}`}
                className="rounded-xl border border-[#2A7A6F]/20 px-6 overflow-hidden bg-white"
              >
                <AccordionTrigger className="text-left text-[#2C1A0E] font-semibold hover:no-underline py-5">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-[#7A6458] leading-relaxed pb-5">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
