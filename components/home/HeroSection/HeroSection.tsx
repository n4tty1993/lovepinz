import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#FFF0E8_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div className="flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-[#F0C060]/40 bg-[#FFF0E8]">
            <span className="w-2 h-2 rounded-full bg-[#F0C060] animate-pulse" />
            <span className="text-xs font-semibold text-[#D4972A] tracking-widest uppercase">
              Custom Enamel Pins
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2C1A0E] leading-[1.05] tracking-tight">
            Design Your Own{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#F0C060]">Magnetic</span>
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#F0C060]/50 rounded" />
            </span>{" "}
            Pins
          </h1>

          <p className="text-lg text-[#7A6458] max-w-lg leading-relaxed">
            Custom enamel pins with strong magnetic backing.{" "}
            <span className="text-[#2C1A0E] font-semibold">No holes. No fabric damage.</span>{" "}
            Minimum 25 pieces.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/design"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-[#F0C060] text-[#2C1A0E] hover:bg-[#D4972A] transition-all hover:scale-[1.02] shadow-lg shadow-amber-200/60"
            >
              Start Designing
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold border border-[#F0C060]/40 text-[#2C1A0E] bg-[#FFF0E8] hover:bg-[#FFE4CC] transition-colors"
            >
              Check our Pricing
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#F0C060]/30 shadow-xl shadow-amber-100/60">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0E8] via-[#FFE4CC] to-[#FFDAB0] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/70 border border-[#F0C060]/40 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-3xl">📌</span>
              </div>
              <p className="text-[#7A6458] text-sm">Lifestyle photo here</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#F0C060]/40 rounded-tr-2xl" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#F0C060]/40 rounded-bl-2xl" />
        </div>
      </div>
    </section>
  );
}
