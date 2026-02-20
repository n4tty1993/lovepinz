import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "./FAQSection.constants";

export function FAQSection() {
  return (
    <section id="faq" className="bg-white py-24 border-t border-[#0A0A0A]/5">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-3">
            Got Questions?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="flex flex-col gap-2">
          {FAQ_ITEMS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-[#0A0A0A]/10 rounded-xl px-6 data-[state=open]:border-[#C9A84C]/40 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-[#0A0A0A] hover:no-underline py-5 [&>svg]:text-[#C9A84C]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#0A0A0A]/60 leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
