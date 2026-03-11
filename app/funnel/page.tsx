import type { Metadata } from "next";
import { FunnelFlow } from "@/components/funnel/FunnelFlow/FunnelFlow";

export const metadata: Metadata = {
  title: "Create Your Custom Pin | LovePinz",
  description:
    "Design your own custom magnetic enamel pin in minutes. Upload a photo, choose your style, and order — it's that easy.",
};

export default function FunnelPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] pt-16">
      <FunnelFlow />
    </main>
  );
}
