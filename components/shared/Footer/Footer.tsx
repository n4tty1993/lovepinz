import Link from "next/link";
import { NAV_LINKS, POLICY_LINKS } from "./Footer.constants";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-white font-bold text-xl mb-3">
              Magnetic<span className="text-[#C9A84C]">Pins</span>
            </p>
            <p className="text-[#E5E5E5]/40 text-sm leading-relaxed max-w-xs">
              The easiest way to create custom magnetic pins — no holes, no fabric damage.
            </p>
          </div>

          <div>
            <p className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#E5E5E5]/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-5">
              Policies
            </p>
            <ul className="flex flex-col gap-3">
              {POLICY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#E5E5E5]/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#E5E5E5]/30 text-xs">
            © {new Date().getFullYear()} MagneticPins. All rights reserved.
          </p>
          <p className="text-[#E5E5E5]/20 text-xs">Made in the USA 🇺🇸</p>
        </div>
      </div>
    </footer>
  );
}
