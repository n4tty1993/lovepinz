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
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-[#2C1A0E] font-extrabold text-xl tracking-tight"
        >
          LovePinz
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#7A6458] hover:text-[#2C1A0E] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/product"
          className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-[#2A7A6F] text-white hover:bg-[#1F5C53] transition-colors"
        >
          Start Designing
        </Link>
      </div>
    </header>
  );
}
