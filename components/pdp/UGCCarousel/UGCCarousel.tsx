"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  Volume2,
  VolumeX,
} from "lucide-react";
import { fadeUpVariants } from "@/constants/animations";
import { SLIDES } from "./UGCCarousel.constants";
import type { VideoSlide } from "./UGCCarousel.types";

function TikTokIcon({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
    </svg>
  );
}

function VimeoCard({
  slide,
  isCenter,
  muted,
  onToggleMute,
}: {
  slide: VideoSlide;
  isCenter: boolean;
  muted: boolean;
  onToggleMute: () => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const ready = useRef(false);

  const hashParam = slide.vimeoHash ? `&h=${slide.vimeoHash}` : "";
  const src = `https://player.vimeo.com/video/${slide.vimeoId}?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&transparent=0${hashParam}`;

  const sendVolume = useCallback((vol: number) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method: "setVolume", value: vol }),
      "https://player.vimeo.com",
    );
  }, []);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== "https://player.vimeo.com") return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === "ready") {
          ready.current = true;
          sendVolume(muted ? 0 : 1);
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ method: "addEventListener", value: "play" }),
            "https://player.vimeo.com",
          );
        }
      } catch {
        /* ignore non-JSON messages */
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [muted, sendVolume]);

  useEffect(() => {
    if (ready.current) sendVolume(muted ? 0 : 1);
  }, [muted, sendVolume]);

  useEffect(() => {
    if (!ready.current) return;
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method: isCenter ? "play" : "pause" }),
      "https://player.vimeo.com",
    );
  }, [isCenter]);

  return (
    <div className="relative h-full w-full">
      <iframe
        ref={iframeRef}
        src={src}
        allow="autoplay; fullscreen; picture-in-picture"
        className="block h-full w-full rounded-[20px] border-0"
        title={`UGC video by ${slide.vimeoId}`}
      />

      {/* Bottom overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between rounded-b-[20px] bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-6">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          {slide.platform === "instagram" ? (
            <Instagram size={14} className="text-white" />
          ) : (
            <TikTokIcon size={14} className="text-white" />
          )}
        </div>
      </div>

      {/* Mute toggle */}
      {isCenter && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          aria-label={muted ? "Unmute" : "Mute"}
          className="absolute left-2.5 top-2.5 z-20 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
        >
          {muted ? (
            <VolumeX size={14} className="text-white" />
          ) : (
            <Volume2 size={14} className="text-white" />
          )}
        </button>
      )}
    </div>
  );
}

export function UGCCarousel() {
  const shouldReduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const isSwiping = useRef(false);
  const n = SLIDES.length;

  const prev = () => setCurrent((c) => (c - 1 + n) % n);
  const next = () => setCurrent((c) => (c + 1) % n);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      dragStartX.current = e.touches[0].clientX;
      isSwiping.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (dragStartX.current === null) return;
      const dx = e.touches[0].clientX - dragStartX.current;
      if (Math.abs(dx) > 10) {
        isSwiping.current = true;
        e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (dragStartX.current === null) return;
      const dx = dragStartX.current - e.changedTouches[0].clientX;
      if (isSwiping.current && Math.abs(dx) > 40) {
        dx > 0 ? next() : prev();
      }
      dragStartX.current = null;
      isSwiping.current = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [n]);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[600px]">
        {/* Title */}
        <motion.div
          className="mb-8 px-5 text-center"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-teal-hover)]">
            Real Customers
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-[var(--brand-text)] md:text-5xl">
            Happy Customers
          </h2>
          <p className="mt-2 text-sm text-[var(--brand-muted)]">
            Real people, real results
          </p>
        </motion.div>

        {/* Track */}
        <div
          ref={trackRef}
          className="relative h-[320px] overflow-hidden"
          style={{ touchAction: "pan-y pinch-zoom" }}
        >
          {SLIDES.map((slide, i) => {
            let pos = i - current;
            if (pos > n / 2) pos -= n;
            if (pos < -n / 2) pos += n;

            const isCenter = pos === 0;
            const isAdjacent = Math.abs(pos) === 1;
            const isHidden = Math.abs(pos) >= 2;

            return (
              <div
                key={slide.id}
                onClick={
                  isCenter ? undefined : () => (pos < 0 ? prev() : next())
                }
                className="absolute left-1/2 top-1/2 h-[300px] w-[200px] overflow-hidden rounded-[20px]"
                style={{
                  transform: `translate(calc(-50% + ${pos * 230}px), -50%) scale(${isCenter ? 1 : isAdjacent ? 0.88 : 0.78})`,
                  opacity: isCenter ? 1 : isAdjacent ? 0.7 : 0,
                  zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  cursor: isCenter ? "default" : "pointer",
                  pointerEvents: isHidden ? "none" : "auto",
                }}
              >
                <VimeoCard
                  slide={slide}
                  isCenter={isCenter}
                  muted={muted}
                  onToggleMute={() => setMuted((m) => !m)}
                />
                {/* Transparent overlay to capture touch events over iframes */}
                <div className="absolute inset-0 z-10 md:hidden" />
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full p-0 transition-all duration-200 hover:scale-130"
              style={{
                width: i === current ? 22 : 7,
                height: 7,
                background: i === current ? "var(--brand-teal)" : "#b2d8d4",
                opacity: i === current ? 1 : 0.5,
                border: "none",
              }}
            />
          ))}
        </div>

        {/* Nav arrows */}
        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[var(--brand-text)] shadow-sm transition-transform hover:scale-110"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[var(--brand-text)] shadow-sm transition-transform hover:scale-110"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
