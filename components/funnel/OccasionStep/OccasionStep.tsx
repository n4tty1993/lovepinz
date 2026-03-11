"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  fadeUpVariants,
  staggerContainerVariants,
  HOVER_SPRING,
} from "@/constants/animations";
import type {
  OccasionOption,
  OccasionSlide,
} from "@/components/funnel/FunnelFlow/FunnelFlow.types";
import { OCCASIONS } from "@/components/funnel/FunnelFlow/FunnelFlow.constants";

interface OccasionStepProps {
  onSelect: (occasionId: string) => void;
}

export function OccasionStep({ onSelect }: OccasionStepProps) {
  return (
    <div className="min-h-screen bg-[#fafafa] pb-10">
      <div className="px-6 pt-7 text-center">
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#e8f4f2] px-3.5 py-1.5 text-[13px] font-semibold text-[#2a7a6f]">
          📌 MagPin Studio
        </div>
        <motion.h1
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-2.5 text-[26px] font-extrabold leading-[1.25] tracking-tight text-[#1a1a1a]"
        >
          What would you like
          <br />
          to create?
        </motion.h1>
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-[15px] leading-normal text-[#888]"
        >
          Choose your occasion to get started
        </motion.p>
      </div>

      <motion.div
        className="mx-auto flex max-w-[480px] flex-col gap-3.5 px-4 pt-6"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {OCCASIONS.map((o) => (
          <OccasionCard key={o.id} occasion={o} onSelect={onSelect} />
        ))}
      </motion.div>

      <p className="mt-7 px-6 text-center text-xs text-[#bbb]">
        Free design preview · No credit card required
      </p>
    </div>
  );
}

function OccasionCard({
  occasion,
  onSelect,
}: {
  occasion: OccasionOption;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.div
      variants={fadeUpVariants}
      whileHover={{
        boxShadow: "0 6px 24px rgba(42,122,111,0.13)",
        transition: HOVER_SPRING,
      }}
      onClick={() => onSelect(occasion.id)}
      className="cursor-pointer overflow-hidden rounded-[20px] border-[2.5px] border-[#e8f4f2] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
    >
      <div className="px-3.5 pt-3.5" onClick={(e) => e.stopPropagation()}>
        <Carousel slides={occasion.slides} />
      </div>
      <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-3.5">
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-[11px] font-semibold text-[#2a7a6f]">
            {occasion.tag}
          </div>
          <div className="mb-1 whitespace-pre-line text-[15px] font-bold leading-[1.3] text-[#1a1a1a]">
            {occasion.title}
          </div>
          <div className="text-[13px] leading-[1.4] text-[#888]">
            {occasion.desc}
          </div>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-full bg-[#2a7a6f] px-[18px] py-[11px] text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(42,122,111,0.3)]"
        >
          Get Started
        </button>
      </div>
    </motion.div>
  );
}

function Carousel({ slides }: { slides: OccasionSlide[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pointerStartX = useRef<number | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      5000,
    );
  }, [slides.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const diff = pointerStartX.current - e.clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setCurrent((c) => (c + 1) % slides.length);
      else setCurrent((c) => (c - 1 + slides.length) % slides.length);
    }
    resetTimer();
    pointerStartX.current = null;
  };

  const slide = slides[current];

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={() => {
        pointerStartX.current = null;
      }}
      className="relative aspect-square w-full select-none overflow-hidden rounded-2xl touch-pan-y"
    >
      <div
        className="relative flex h-full items-center justify-center overflow-hidden transition-colors duration-300"
        style={{ background: slide.bg }}
      >
        {slide.image ? (
          <Image
            src={slide.image}
            alt={slide.label}
            fill
            className="object-cover"
            sizes="(max-width: 480px) 100vw, 480px"
          />
        ) : (
          <>
            {/* Decorative circles */}
            <div className="absolute -right-[30px] -top-[30px] h-[120px] w-[120px] rounded-full bg-white/45" />
            <div className="absolute -bottom-[20px] left-[10px] h-[70px] w-[70px] rounded-full bg-white/35" />

            {/* Emoji circle */}
            <div className="relative z-[1] flex h-[90px] w-[90px] items-center justify-center rounded-full border-[3px] border-white/90 bg-white text-[44px] shadow-[0_8px_32px_rgba(0,0,0,0.10)]">
              {slide.emoji}
              <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-[#c8a96e]" />
            </div>
          </>
        )}

        {/* Label pill – hidden when slide has an image */}
        {!slide.image && (
          <div className="absolute bottom-2.5 left-1/2 z-[2] -translate-x-1/2 whitespace-nowrap rounded-full bg-white/85 px-3 py-[3px] text-[11px] font-semibold text-[#444] backdrop-blur-[4px]">
            {slide.label}
          </div>
        )}
      </div>

      {/* Dot indicators */}
      <div className="absolute right-3 top-2.5 z-[3] flex gap-[5px]">
        {slides.map((_, i) => (
          <div
            key={i}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => {
              e.stopPropagation();
              setCurrent(i);
              resetTimer();
            }}
            className="cursor-pointer rounded-[3px] transition-all duration-300"
            style={{
              width: i === current ? 16 : 6,
              height: 6,
              background: i === current ? "#2a7a6f" : "rgba(255,255,255,0.75)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
