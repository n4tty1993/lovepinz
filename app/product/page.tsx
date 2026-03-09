import { PDPHero } from "@/components/pdp/PDPHero/PDPHero";
import { UGCCarousel } from "@/components/pdp/UGCCarousel/UGCCarousel";
import { PDPViewContent } from "@/components/pdp/PDPViewContent";
import { TrustBar } from "@/components/pdp/TrustBar/TrustBar";
import { HowItWorksMini } from "@/components/pdp/HowItWorksMini/HowItWorksMini";
import { ProductSpecs } from "@/components/pdp/ProductSpecs/ProductSpecs";
import { MagnetStrength } from "@/components/pdp/MagnetStrength/MagnetStrength";
import { CustomerExamples } from "@/components/home/CustomerExamples/CustomerExamples";
import { ReviewSection } from "@/components/pdp/ReviewSection/ReviewSection";
import { PDPFAQSection } from "@/components/pdp/PDPFAQSection/PDPFAQSection";
import { PDPFinalCTA } from "@/components/pdp/PDPFinalCTA/PDPFinalCTA";

export default function ProductPage() {
  return (
    <main>
      {/* Meta Pixel: ViewContent */}
      <PDPViewContent />
      <ReviewSection />

      {/* Interactive zone */}
      <PDPHero />

      {/* UGC social proof */}
      <UGCCarousel />

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
