import { STEPS } from "./HowItWorks.constants";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#FAF9F7] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-3">
            Simple Process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tight">
            Order in 3 Easy Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-[#C9A84C]/20" />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center gap-5 relative"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#0A0A0A] flex items-center justify-center shadow-lg">
                    <Icon className="w-8 h-8 text-[#C9A84C]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#C9A84C] text-[#0A0A0A] text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A]">{step.title}</h3>
                <p className="text-[#0A0A0A]/60 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
