import { TRUST_ITEMS } from "./TrustStrip.constants";

export function TrustStrip() {
  return (
    <div className="bg-[#FFF0E8] border-y border-[#2A7A6F]/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="text-[#2A7A6F] font-bold text-base">✓</span>
              <span className="text-sm font-medium text-[#2C1A0E]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
