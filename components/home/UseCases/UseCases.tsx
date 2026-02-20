import { USE_CASES } from "./UseCases.constants";

export function UseCases() {
  return (
    <section className="bg-[#FAF9F7] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-3">
            Who Orders From Us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tight">
            Perfect For
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES.map((uc) => (
            <div
              key={uc.title}
              className="rounded-2xl border border-[#0A0A0A]/10 bg-white p-8 hover:border-[#C9A84C]/40 hover:shadow-md transition-all group"
            >
              <div className="text-4xl mb-5">{uc.icon}</div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2 group-hover:text-[#C9A84C] transition-colors">
                {uc.title}
              </h3>
              <p className="text-[#0A0A0A]/55 text-sm leading-relaxed">
                {uc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
