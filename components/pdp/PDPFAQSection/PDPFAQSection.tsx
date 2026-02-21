"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PDP_FAQ_ITEMS } from "./PDPFAQSection.constants";
import { fadeUpVariants, EASE_EXPO_OUT } from "@/constants/animations";

export function PDPFAQSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Common Questions
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Frequently Asked
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {PDP_FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.question}
              variants={shouldReduceMotion ? undefined : fadeUpVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.5 }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 0.7, ease: EASE_EXPO_OUT, delay: i * 0.08 }
              }
            >
              <AccordionItem
                value={`faq-${i}`}
                className="rounded-xl border border-[#2A7A6F]/20 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-[#2C1A0E] font-semibold hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#7A6458] leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
