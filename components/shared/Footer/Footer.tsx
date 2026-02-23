import Link from "next/link";
import { NAV_LINKS, POLICY_LINKS } from "./Footer.constants";

export function Footer() {
  return (
    <footer className="bg-[#FFF9F4] border-t border-[#2A7A6F]/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-[#2C1A0E] font-extrabold text-xl mb-3">
              LovePinz
            </p>
            <p className="text-[#7A6458] text-sm leading-relaxed max-w-xs">
              The easiest way to create custom magnetic pins — no holes, no
              fabric damage.
            </p>
          </div>

          <div>
            <p className="text-[#7A6458] text-xs font-semibold tracking-widest uppercase mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#7A6458] hover:text-[#1F5C53] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[#7A6458] text-xs font-semibold tracking-widest uppercase mb-5">
              Policies
            </p>
            <ul className="flex flex-col gap-3">
              {POLICY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#7A6458] hover:text-[#1F5C53] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2A7A6F]/10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#7A6458] text-xs">
            © {new Date().getFullYear()} LovePinz. All rights reserved.
          </p>
          <p className="text-[#7A6458] text-xs">Made in the USA 🇺🇸</p>
        </div>
      </div>
    </footer>
  );
}
