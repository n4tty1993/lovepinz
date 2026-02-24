import { PDPHero } from "@/components/pdp/PDPHero/PDPHero";
import { PDPViewContent } from "@/components/pdp/PDPViewContent";
import { TrustBar } from "@/components/pdp/TrustBar/TrustBar";
import { HowItWorksMini } from "@/components/pdp/HowItWorksMini/HowItWorksMini";
import { ProductSpecs } from "@/components/pdp/ProductSpecs/ProductSpecs";
import { MagnetStrength } from "@/components/pdp/MagnetStrength/MagnetStrength";
import { CustomerExamples } from "@/components/home/CustomerExamples/CustomerExamples";
import { PDPFAQSection } from "@/components/pdp/PDPFAQSection/PDPFAQSection";
import { PDPFinalCTA } from "@/components/pdp/PDPFinalCTA/PDPFinalCTA";

export default function ProductPage() {
  return (
    <main>
      {/* Meta Pixel: ViewContent */}
      <PDPViewContent />

      {/* Interactive zone */}
      <PDPHero />

      {/* Static educational zone — server-rendered */}
      <TrustBar />
      <HowItWorksMini />
      <ProductSpecs />
      <MagnetStrength />
      <CustomerExamples />
      <PDPFAQSection />
      <PDPFinalCTA />
    </main>
  );
}
