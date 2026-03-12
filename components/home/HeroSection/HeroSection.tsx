import Link from "next/link";
import {
  HERO_CARDS,
  HERO_TRUST_ITEMS,
  HERO_STATS,
} from "@/components/home/HeroSection/HeroSection.constants";

export function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="flex flex-col items-center gap-10">
          {/* Product Cards */}
          <div className="flex justify-center gap-4 md:gap-6 w-full max-w-md md:max-w-lg">
            {HERO_CARDS.map((card, i) => (
              <Link
                key={card.title}
                href="/funnel"
                className={`group relative flex-1 rounded-2xl p-4 md:p-5 ${card.bgColor} text-white transition-transform hover:scale-[1.03] ${
                  i === 0 ? "-rotate-3" : "rotate-3"
                }`}
              >
                <p className="text-[10px] md:text-xs font-semibold tracking-widest uppercase opacity-70">
                  {card.label}
                </p>

                <div className="flex justify-center my-4 md:my-5">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">{card.emoji}</span>
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-bold">{card.title}</h3>
                <p className="text-xs md:text-sm opacity-70 mt-0.5">
                  {card.subtitle}
                </p>

                <div className="mt-3">
                  <span
                    className={`inline-block text-[10px] md:text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-md ${card.badgeColor}`}
                  >
                    {card.badge}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Heading */}
          <div className="text-center max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C1A0E] leading-[1.1] tracking-tight">
              Create a custom enamel pin in{" "}
              <span className="text-[#2A7A6F]">2 minutes</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-[#7A6458] leading-relaxed">
              Turn anyone into the star of their own wearable keepsake
            </p>
          </div>

          {/* CTA */}
          <div className="w-full max-w-md">
            <Link
              href="/funnel"
              className="flex items-center justify-center w-full px-8 py-4 rounded-full text-lg font-bold bg-[#2A7A6F] text-white hover:bg-[#1F5C53] transition-all hover:scale-[1.02] shadow-lg shadow-teal-100/60"
            >
              Create Your Pin
            </Link>
          </div>

          {/* Trust Items */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full max-w-md">
            {HERO_TRUST_ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="text-[#2A7A6F] font-bold text-sm">✓</span>
                <span className="text-sm text-[#7A6458]">{item}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-0 w-full max-w-md pt-4">
            {HERO_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex-1 text-center ${
                  i > 0 ? "border-l border-[#2A7A6F]/20" : ""
                }`}
              >
                <p className="text-2xl md:text-3xl font-bold text-[#2A7A6F]">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-[#7A6458] mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
