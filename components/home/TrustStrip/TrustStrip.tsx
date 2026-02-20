import { TRUST_ITEMS } from "./TrustStrip.constants";

export function TrustStrip() {
  return (
    <div className="bg-[#111111] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="text-[#C9A84C] font-bold text-base">✓</span>
              <span className="text-sm font-medium text-[#E5E5E5]/80">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
