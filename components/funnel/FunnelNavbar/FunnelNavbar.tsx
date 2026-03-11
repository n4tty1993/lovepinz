import Link from "next/link";

export function FunnelNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-6">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-[#2C1A0E]"
        >
          LovePinz
        </Link>
      </div>
    </header>
  );
}
