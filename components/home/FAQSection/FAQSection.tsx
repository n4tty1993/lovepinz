import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "./FAQSection.constants";

export function FAQSection() {
  return (
    <section id="faq" className="bg-white py-24 border-t border-[#F0C060]/15">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4972A] mb-3">
            Got Questions?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="flex flex-col gap-2">
          {FAQ_ITEMS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-[#2C1A0E]/8 rounded-xl px-6 data-[state=open]:border-[#F0C060]/50 data-[state=open]:border-l-2 data-[state=open]:border-l-[#F0C060] data-[state=open]:bg-[#FFF9F4] transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-[#2C1A0E] hover:no-underline py-5 [&>svg]:text-[#F0C060]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#7A6458] leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
