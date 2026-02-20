"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "./FAQSection.constants";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/constants/animations";

export function FAQSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="faq" className="bg-white py-24 border-t border-[#2A7A6F]/15">
      <div className="max-w-3xl mx-auto px-6">

        <motion.div
          className="text-center mb-16"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Got Questions?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.1 }}
        >
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {FAQ_ITEMS.map((faq, i) => (
              <motion.div
                key={i}
                variants={shouldReduceMotion ? undefined : fadeUpVariants}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border border-[#2C1A0E]/8 rounded-xl px-6 data-[state=open]:border-[#2A7A6F]/50 data-[state=open]:border-l-2 data-[state=open]:border-l-[#2A7A6F] data-[state=open]:bg-[#FFF9F4] transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold text-[#2C1A0E] hover:no-underline py-5 [&>svg]:text-[#2A7A6F]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#7A6458] leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
