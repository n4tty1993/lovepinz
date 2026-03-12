import { HeroSection } from "@/components/home/HeroSection/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks/HowItWorks";
import { WhyMagnetic } from "@/components/home/WhyMagnetic/WhyMagnetic";
import { CustomerExamples } from "@/components/home/CustomerExamples/CustomerExamples";
import { PricingSection } from "@/components/home/PricingSection/PricingSection";
import { UseCases } from "@/components/home/UseCases/UseCases";
import { FAQSection } from "@/components/home/FAQSection/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA/FinalCTA";
import { UGCCarousel } from "@/components/pdp/UGCCarousel/UGCCarousel";
import { ReviewSection } from "@/components/pdp/ReviewSection/ReviewSection";
import { TrustBar } from "@/components/pdp/TrustBar/TrustBar";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <UGCCarousel />
      <ReviewSection />
      <TrustBar />
      <HowItWorks />
      <WhyMagnetic />
      <CustomerExamples />
      <PricingSection />
      <UseCases />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
