"use client";

import { DesignPreview } from "@/components/pdp/DesignPreview/DesignPreview";
import { Configurator } from "@/components/pdp/Configurator/Configurator";

export function PDPHero() {
  return (
    <section id="configurator" className="bg-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="order-2 md:order-1">
            <DesignPreview />
          </div>

          <div className="order-1 md:order-2">
            <Configurator />
          </div>
        </div>
      </div>
    </section>
  );
}
