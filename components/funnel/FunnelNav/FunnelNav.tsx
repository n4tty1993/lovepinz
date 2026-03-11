"use client";

interface FunnelNavProps {
  step: number;
  total: number;
  label: string;
  onBack: () => void;
}

export function FunnelNav({ step, total, label, onBack }: FunnelNavProps) {
  return (
    <div className="px-5">
      <button
        type="button"
        onClick={onBack}
        className="flex cursor-pointer items-center border-none bg-transparent p-1 text-[#1a1a1a]"
        aria-label="Go back"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </button>
      <div className="mt-3.5 h-1 overflow-hidden rounded-full bg-[#f0f0f0]">
        <div
          className="h-full rounded-full bg-[#2a7a6f] transition-[width] duration-400 ease-in-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between">
        <span className="text-[11px] font-semibold text-[#2a7a6f]">
          Step {step} of {total}
        </span>
        <span className="text-[11px] text-[#aaa]">{label}</span>
      </div>
    </div>
  );
}
