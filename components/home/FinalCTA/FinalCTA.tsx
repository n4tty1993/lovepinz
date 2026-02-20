import Link from "next/link";
import { TRUST_BULLETS } from "./FinalCTA.constants";

export function FinalCTA() {
  return (
    <section className="bg-[#0A0A0A] py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-12 h-1 bg-[#C9A84C] rounded mx-auto mb-10" />

        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
          Ready to Design Your{" "}
          <span className="text-[#C9A84C]">Magnetic Pins?</span>
        </h2>

        <Link
          href="/design"
          className="inline-flex items-center justify-center px-10 py-5 rounded-md text-lg font-bold bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#B8913A] transition-all hover:scale-[1.02] shadow-2xl shadow-[#C9A84C]/20 mb-10"
        >
          Start Designing
        </Link>

        <div className="flex flex-wrap justify-center gap-6 text-[#E5E5E5]/40 text-sm mt-4">
          {TRUST_BULLETS.map((bullet) => (
            <span key={bullet}>✓ {bullet}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
