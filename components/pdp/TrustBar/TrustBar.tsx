"use client";

import { Fragment, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { TRUST_ITEMS } from "./TrustBar.constants";
import {
  EASE_EXPO_OUT,
  tightStaggerContainerVariants,
  slideFromLeftItemVariants,
} from "@/constants/animations";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 opacity-50 transition-transform duration-200 ease-out"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function TrustBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="border-y border-[#F0D0BE] bg-[#FEF3EC]">
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-center"
        variants={
          shouldReduceMotion ? undefined : tightStaggerContainerVariants
        }
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.5 }}
      >
        {TRUST_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          const isLast = i === TRUST_ITEMS.length - 1;

          return (
            <Fragment key={item.label}>
              <motion.div
                variants={
                  shouldReduceMotion ? undefined : slideFromLeftItemVariants
                }
                className={`sm:flex-1 ${
                  !isLast && !isOpen
                    ? "border-b border-[#F0D0BE] sm:border-b-0"
                    : ""
                }`}
              >
                {/* Trigger row */}
                <button
                  onClick={() => toggle(i)}
                  className={`flex w-full items-center justify-between gap-2.5 px-5 py-3.5 sm:px-6 text-left transition-colors duration-200 ${
                    isOpen ? "bg-[#FDE8D8]" : "bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border bg-white text-[#2A7B6F] transition-colors duration-200 ${
                        isOpen ? "border-[#2A7B6F]" : "border-[#E8C9B8]"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-[13px] font-semibold leading-tight tracking-wide text-[#1F4F47]">
                      {item.label}
                    </span>
                  </div>
                  <ChevronIcon open={isOpen} />
                </button>

                {/* Expandable detail */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE_EXPO_OUT }}
                      className={`overflow-hidden ${
                        !isLast ? "border-b border-[#F0D0BE] sm:border-b-0" : ""
                      }`}
                    >
                      <p className="m-0 pb-5 pl-[59px] pr-5 pt-1.5 text-[12.5px] leading-relaxed text-[#4A7A72] sm:pr-6">
                        {item.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Desktop pipe divider */}
              {!isLast && (
                <div
                  className={`hidden sm:block w-px shrink-0 self-center bg-[#E8C9B8] transition-all duration-200 ${
                    openIndex !== null ? "h-0" : "h-5"
                  }`}
                />
              )}
            </Fragment>
          );
        })}
      </motion.div>
    </section>
  );
}
