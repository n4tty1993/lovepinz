"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { Footer } from "@/components/shared/Footer/Footer";
import { FunnelNavbar } from "@/components/funnel/FunnelNavbar/FunnelNavbar";

const FUNNEL_ROUTES = ["/funnel"];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFunnel = FUNNEL_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <>
      {isFunnel ? <FunnelNavbar /> : <Navbar />}
      {children}
      {!isFunnel && <Footer />}
    </>
  );
}
