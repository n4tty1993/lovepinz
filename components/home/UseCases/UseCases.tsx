import { USE_CASES } from "./UseCases.constants";

export function UseCases() {
  return (
    <section className="bg-[#EDF5EA] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1F5C53] mb-3">
            Who Orders From Us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1A0E] tracking-tight">
            Perfect For
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES.map((uc) => (
            <div
              key={uc.title}
              className="rounded-2xl border border-[#2A7A6F]/20 bg-white p-8 hover:border-[#2A7A6F]/40 hover:shadow-md hover:shadow-teal-100/40 hover:scale-[1.03] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#FFF0E8] flex items-center justify-center mb-5 text-2xl">
                {uc.icon}
              </div>
              <h3 className="text-lg font-bold text-[#2C1A0E] mb-2 group-hover:text-[#2A7A6F] transition-colors">
                {uc.title}
              </h3>
              <p className="text-[#7A6458] text-sm leading-relaxed">
                {uc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
