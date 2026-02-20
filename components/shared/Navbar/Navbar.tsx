"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "./Navbar.constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A] border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-white font-bold text-lg tracking-tight">
            Magnetic<span className="text-[#C9A84C]">Pins</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/design"
          className="inline-flex items-center justify-center px-5 py-2 rounded-md text-sm font-semibold bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#B8913A] transition-colors"
        >
          Start Designing
        </Link>
      </div>
    </header>
  );
}
