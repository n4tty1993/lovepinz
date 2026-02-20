import { HeroSection } from "@/components/home/HeroSection/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip/TrustStrip";
import { HowItWorks } from "@/components/home/HowItWorks/HowItWorks";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <TrustStrip />
      <HowItWorks />
    </main>
  );
}
