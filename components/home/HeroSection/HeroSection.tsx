import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0A0A0A] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#C9A84C08_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div className="flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="text-xs font-medium text-[#C9A84C] tracking-widest uppercase">
              Custom Enamel Pins
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
            Design Your Own{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#C9A84C]">Magnetic</span>
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#C9A84C]/40 rounded" />
            </span>{" "}
            Pins
          </h1>

          <p className="text-lg text-[#E5E5E5]/70 max-w-lg leading-relaxed">
            Custom enamel pins with strong magnetic backing.{" "}
            <span className="text-white font-medium">No holes. No fabric damage.</span>{" "}
            Minimum 25 pieces.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/design"
              className="inline-flex items-center justify-center px-8 py-4 rounded-md text-base font-bold bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#B8913A] transition-all hover:scale-[1.02] shadow-lg shadow-[#C9A84C]/20"
            >
              Start Designing
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-md text-base font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors"
            >
              Check our Pricing
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#0A0A0A] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📌</span>
              </div>
              <p className="text-white/30 text-sm">Lifestyle photo here</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#C9A84C]/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#C9A84C]/30 rounded-bl-lg" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
    </section>
  );
}
