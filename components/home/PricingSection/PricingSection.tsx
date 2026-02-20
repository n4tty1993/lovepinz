import Link from "next/link";
import { PRICING_TIERS } from "./PricingSection.constants";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-[#0A0A0A] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Simple, Volume-Based Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.quantity}
              className={`relative rounded-2xl p-8 border transition-all hover:scale-[1.02] ${
                tier.popular
                  ? "border-[#C9A84C] bg-[#C9A84C]/5"
                  : "border-white/10 bg-white/[0.03] hover:border-[#C9A84C]/40"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C9A84C] text-[#0A0A0A] text-xs font-bold">
                  Most Popular
                </div>
              )}
              <p className="text-[#E5E5E5]/50 text-sm mb-2">{tier.quantity} pieces</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-white">{tier.unitPrice}</span>
                <span className="text-[#E5E5E5]/40 text-sm">/each</span>
              </div>
              <p className="text-[#C9A84C] text-sm font-medium">Total: {tier.total}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-[#E5E5E5]/40 text-sm mb-8">
            Final price depends on size &amp; finish selected.
          </p>
          <Link
            href="/design"
            className="inline-flex items-center justify-center px-8 py-4 rounded-md text-base font-bold bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#B8913A] transition-all hover:scale-[1.02] shadow-lg shadow-[#C9A84C]/20"
          >
            Calculate My Price
          </Link>
        </div>
      </div>
    </section>
  );
}
