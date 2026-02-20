import { HeroSection } from "@/components/home/HeroSection/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip/TrustStrip";
import { HowItWorks } from "@/components/home/HowItWorks/HowItWorks";
import { WhyMagnetic } from "@/components/home/WhyMagnetic/WhyMagnetic";
import { CustomerExamples } from "@/components/home/CustomerExamples/CustomerExamples";
import { PricingSection } from "@/components/home/PricingSection/PricingSection";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <TrustStrip />
      <HowItWorks />
      <WhyMagnetic />
      <CustomerExamples />
      <PricingSection />
    </main>
  );
}
