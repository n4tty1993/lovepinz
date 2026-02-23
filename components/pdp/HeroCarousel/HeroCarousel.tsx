"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useConfigurator } from "@/hooks/useConfigurator";
import { STYLE_OPTIONS } from "@/components/pdp/Configurator/Configurator.constants";
import { CAROUSEL_SLIDES } from "./HeroCarousel.constants";

function CarouselSlide({ slide }: { slide: (typeof CAROUSEL_SLIDES)[number] }) {
  return (
    <div
      className="h-[300px] md:h-full md:min-h-[420px] select-none flex-[0_0_100%]"
      style={{ background: slide.bg }}
    />
  );
}

function DesignPreviewSlide({ onCTA }: { onCTA: () => void }) {
  const { state } = useConfigurator();
  const selectedStyle = STYLE_OPTIONS.find((o) => o.id === state.selectedStyle);
  const designReady = state.wizardStep === "result";

  return (
    <div className="relative min-h-[290px] md:min-h-[420px] overflow-hidden bg-[#111] flex items-center justify-center flex-[0_0_100%]">
      <Image
        src={state.previewUrl!}
        alt="Your design"
        width={320}
        height={320}
        unoptimized
        className="max-h-[240px] md:max-h-[320px] max-w-full object-contain rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] p-5 transition-[filter] duration-300"
        style={{ filter: selectedStyle?.filter ?? "none" }}
      />

      {designReady && selectedStyle && (
        <div className="absolute top-3 right-4 bg-white/[0.12] backdrop-blur-lg text-white rounded-full px-3 py-1 text-[11px] font-bold border border-white/20">
          ✦ {selectedStyle.label}
        </div>
      )}

      <button
        onClick={onCTA}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-lg text-white rounded-full px-4 py-1.5 text-xs font-bold border border-white/15 cursor-pointer whitespace-nowrap hover:bg-black/60 transition-colors"
      >
        Continue configuring ↓
      </button>
    </div>
  );
}

export function HeroCarousel() {
  const { state } = useConfigurator();
  const hasPreview = !!state.previewUrl;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    if (hasPreview) {
      emblaApi.plugins().autoplay?.stop();
    } else {
      emblaApi.plugins().autoplay?.play();
    }
  }, [emblaApi, hasPreview]);

  const scrollToConfigurator = () => {
    document
      .getElementById("configurator")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  if (hasPreview) {
    return (
      <div className="md:sticky md:top-24 md:rounded-2xl overflow-hidden">
        <DesignPreviewSlide onCTA={scrollToConfigurator} />
      </div>
    );
  }

  return (
    <div className="md:sticky md:top-24 md:rounded-2xl overflow-hidden">
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {CAROUSEL_SLIDES.map((slide) => (
              <CarouselSlide key={slide.id} slide={slide} />
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-[3]">
          {CAROUSEL_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="rounded-full h-1.5 transition-all duration-300 cursor-pointer border-none p-0"
              style={{
                width: i === selectedIndex ? 22 : 6,
                background:
                  i === selectedIndex
                    ? CAROUSEL_SLIDES[selectedIndex].accent
                    : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
