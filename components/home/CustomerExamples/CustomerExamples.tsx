import { EXAMPLES } from "./CustomerExamples.constants";

export function CustomerExamples() {
  return (
    <section className="bg-[#FAF9F7] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-3">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] tracking-tight">
            Made by Our Customers
          </h2>
          <p className="text-[#0A0A0A]/50 mt-4 max-w-md mx-auto">
            From weddings to brand launches — see what people are creating.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {EXAMPLES.map((ex, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${ex.gradient} transition-transform duration-300 group-hover:scale-105`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-2xl">📌</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-semibold text-sm">{ex.label}</p>
                <p className="text-white/60 text-xs">{ex.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
