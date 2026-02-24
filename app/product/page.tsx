import { PDPHero } from "@/components/pdp/PDPHero/PDPHero";
import { PDPViewContent } from "@/components/pdp/PDPViewContent";
import { StickyBar } from "@/components/pdp/StickyBar/StickyBar";
import { TrustBar } from "@/components/pdp/TrustBar/TrustBar";
import { HowItWorksMini } from "@/components/pdp/HowItWorksMini/HowItWorksMini";
import { ProductSpecs } from "@/components/pdp/ProductSpecs/ProductSpecs";
import { MagnetStrength } from "@/components/pdp/MagnetStrength/MagnetStrength";
import { CustomerExamples } from "@/components/home/CustomerExamples/CustomerExamples";
import { PDPFAQSection } from "@/components/pdp/PDPFAQSection/PDPFAQSection";
import { ArtworkGuidelines } from "@/components/pdp/ArtworkGuidelines/ArtworkGuidelines";
import { PDPFinalCTA } from "@/components/pdp/PDPFinalCTA/PDPFinalCTA";

export default function ProductPage() {
  return (
    <main className="pb-16 md:pb-0">
      {/* Meta Pixel: ViewContent */}
      <PDPViewContent />

      {/* Interactive zone */}
      <PDPHero />
      <StickyBar />

      {/* Static educational zone — server-rendered */}
      <TrustBar />
      <HowItWorksMini />
      <ProductSpecs />
      <MagnetStrength />
      <CustomerExamples />
      <PDPFAQSection />
      <ArtworkGuidelines />
      <PDPFinalCTA />
    </main>
  );
}
