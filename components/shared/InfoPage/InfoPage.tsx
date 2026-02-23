import React from "react";

interface InfoPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function InfoPage({ title, subtitle, children }: InfoPageProps) {
  return (
    <div className="bg-[#FFF9F4] min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          {subtitle && (
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
              {subtitle}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight mb-6">
            {title}
          </h1>
          <div className="h-1 w-20 bg-[#2A7A6F]/20 rounded-full" />
        </div>
        <div className="prose prose-stone prose-teal max-w-none text-[#7A6458] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
