import { ConfiguratorProvider } from "@/contexts/ConfiguratorContext";
import { PDPHero } from "@/components/pdp/PDPHero/PDPHero";
import { StickyBar } from "@/components/pdp/StickyBar/StickyBar";
import { TrustBar } from "@/components/pdp/TrustBar/TrustBar";
import { HowItWorksMini } from "@/components/pdp/HowItWorksMini/HowItWorksMini";
import { ProductSpecs } from "@/components/pdp/ProductSpecs/ProductSpecs";
import { MagnetStrength } from "@/components/pdp/MagnetStrength/MagnetStrength";
import { CustomerShowcase } from "@/components/pdp/CustomerShowcase/CustomerShowcase";
import { PDPFAQSection } from "@/components/pdp/PDPFAQSection/PDPFAQSection";
import { ArtworkGuidelines } from "@/components/pdp/ArtworkGuidelines/ArtworkGuidelines";
import { PDPFinalCTA } from "@/components/pdp/PDPFinalCTA/PDPFinalCTA";

export default function ProductPage() {
  return (
    <main className="pb-16 md:pb-0">
      {/* Interactive zone — wrapped in provider */}
      <ConfiguratorProvider>
        <PDPHero />
        <StickyBar />
      </ConfiguratorProvider>

      {/* Static educational zone — server-rendered */}
      <TrustBar />
      <HowItWorksMini />
      <ProductSpecs />
      <MagnetStrength />
      <CustomerShowcase />
      <PDPFAQSection />
      <ArtworkGuidelines />
      <PDPFinalCTA />
    </main>
  );
}
