import { X, Check } from "lucide-react";
import { NEEDLE_ITEMS, MAGNETIC_ITEMS } from "./WhyMagnetic.constants";

export function WhyMagnetic() {
  return (
    <section className="bg-[#FFF9F4] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            The Difference
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Why Magnetic Pins?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-[#2C1A0E]/8 bg-white p-8 shadow-sm shadow-teal-100/40">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-[#7A6458]">Needle Pins</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {NEEDLE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span className="text-[#7A6458]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#2A7A6F]/30 bg-[#FFF0E8] p-8 shadow-sm shadow-teal-100/40">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#2A7A6F]/15 flex items-center justify-center">
                <span className="text-base">🧲</span>
              </div>
              <h3 className="text-lg font-bold text-[#2A7A6F]">Magnetic Pins</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {MAGNETIC_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#2A7A6F] mt-0.5 shrink-0" />
                  <span className="text-[#2C1A0E]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-[#7A6458] text-sm mt-10">
          Strong neodymium magnets hold firmly through most fabric without any damage.
        </p>
      </div>
    </section>
  );
}
