import Link from "next/link";
import { TRUST_BULLETS } from "./FinalCTA.constants";

export function FinalCTA() {
  return (
    <section className="bg-[#2A7A6F] py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-12 h-1 bg-white/20 rounded mx-auto mb-10" />

        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
          Ready to Design Your{" "}
          <span className="underline decoration-white/40 decoration-wavy underline-offset-4">
            Magnetic Pins?
          </span>
        </h2>

        <Link
          href="/design"
          className="inline-flex items-center justify-center px-10 py-5 rounded-full text-lg font-bold bg-white text-[#2C1A0E] hover:bg-[#FFF9F4] transition-all hover:scale-[1.02] shadow-2xl shadow-teal-900/20 mb-10"
        >
          Start Designing
        </Link>

        <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm mt-4">
          {TRUST_BULLETS.map((bullet) => (
            <span key={bullet}>✓ {bullet}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
