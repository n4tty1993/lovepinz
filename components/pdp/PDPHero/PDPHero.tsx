"use client";

import { HeroCarousel } from "@/components/pdp/HeroCarousel/HeroCarousel";
import { Configurator } from "@/components/pdp/Configurator/Configurator";

export function PDPHero() {
  return (
    <section id="configurator" className="bg-[#f7f7fb] pt-16 md:pt-20">
      {/* Mobile: carousel full-width above everything */}
      <div className="md:hidden -mx-0">
        <HeroCarousel />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-start">
          {/* Desktop: carousel on the left */}
          <div className="hidden md:block">
            <HeroCarousel />
          </div>

          <div>
            <Configurator />
          </div>
        </div>
      </div>
    </section>
  );
}
