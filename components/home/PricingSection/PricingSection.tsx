import Link from "next/link";
import { PRICING_TIERS } from "./PricingSection.constants";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-[#FFF0E8] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4972A] mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Simple, Volume-Based Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.quantity}
              className={`relative rounded-2xl p-8 border bg-white transition-all hover:scale-[1.02] shadow-sm ${
                tier.popular
                  ? "ring-2 ring-[#F0C060] border-[#F0C060]/40 shadow-amber-100/80"
                  : "border-[#F0C060]/20 hover:border-[#F0C060]/50 hover:shadow-md hover:shadow-amber-100/60"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#F0C060] text-[#2C1A0E] text-xs font-bold shadow-sm">
                  Most Popular
                </div>
              )}
              <p className="text-[#7A6458] text-sm mb-2">{tier.quantity} pieces</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-[#2C1A0E]">{tier.unitPrice}</span>
                <span className="text-[#7A6458] text-sm">/each</span>
              </div>
              <p className="text-[#D4972A] text-sm font-medium">Total: {tier.total}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-[#7A6458] text-sm mb-8">
            Final price depends on size &amp; finish selected.
          </p>
          <Link
            href="/design"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-[#F0C060] text-[#2C1A0E] hover:bg-[#D4972A] transition-all hover:scale-[1.02] shadow-lg shadow-amber-200/50"
          >
            Calculate My Price
          </Link>
        </div>
      </div>
    </section>
  );
}
