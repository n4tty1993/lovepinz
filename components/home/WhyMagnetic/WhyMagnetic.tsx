import { X, Check } from "lucide-react";
import { NEEDLE_ITEMS, MAGNETIC_ITEMS } from "./WhyMagnetic.constants";

export function WhyMagnetic() {
  return (
    <section className="bg-[#111111] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-3">
            The Difference
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Why Magnetic Pins?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white/60">Needle Pins</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {NEEDLE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span className="text-[#E5E5E5]/50">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/5 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                <span className="text-base">🧲</span>
              </div>
              <h3 className="text-lg font-bold text-[#C9A84C]">Magnetic Pins</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {MAGNETIC_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                  <span className="text-[#E5E5E5]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-[#E5E5E5]/40 text-sm mt-10">
          Strong neodymium magnets hold firmly through most fabric without any damage.
        </p>
      </div>
    </section>
  );
}
