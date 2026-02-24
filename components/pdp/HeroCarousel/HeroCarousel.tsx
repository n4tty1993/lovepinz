"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { CAROUSEL_SLIDES } from "./HeroCarousel.constants";

function CarouselSlide({
  slide,
  priority,
}: {
  slide: (typeof CAROUSEL_SLIDES)[number];
  priority: boolean;
}) {
  return (
    <div className="aspect-square select-none flex-[0_0_100%] relative">
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

export function HeroCarousel() {
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

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <div className="md:sticky md:top-24 md:rounded-2xl overflow-hidden">
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {CAROUSEL_SLIDES.map((slide, i) => (
              <CarouselSlide key={slide.id} slide={slide} priority={i === 0} />
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
