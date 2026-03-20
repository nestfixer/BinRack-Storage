import { motion } from "motion/react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Marcus T.",
    location: "Edmond, OK",
    rating: 5,
    text: "Absolutely transformed my garage. I went from barely being able to walk in to having every bin labeled and accessible. The build quality is seriously impressive — solid pine, no wobble whatsoever.",
    bins: "4×5 System",
  },
  {
    name: "Jennifer R.",
    location: "Yukon, OK",
    rating: 5,
    text: "I was skeptical at first but BinRack delivered beyond my expectations. The guys were in and out in under two hours and left everything spotless. My husband keeps going to the garage just to look at it.",
    bins: "3×6 System",
  },
  {
    name: "Derek S.",
    location: "Mustang, OK",
    rating: 5,
    text: "Worth every penny. I've tried other storage solutions but nothing compares to having shelves literally built around your bins. Custom sizing made all the difference in my awkward garage layout.",
    bins: "5×4 System",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-brand-primary text-brand-primary" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-24 pb-32 bg-surface-dark text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-primary/6 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-4 block"
          >
            What Customers Say
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-black tracking-tighter text-gradient-light"
          >
            REAL GARAGES. <br />
            <span className="text-zinc-500">REAL RESULTS.</span>
          </motion.h2>

          {/* Aggregate rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 mt-8 px-6 py-3 glass-dark rounded-2xl border border-white/10"
          >
            <StarRow count={5} />
            <span className="text-white font-black text-sm">4.9 / 5</span>
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">· 100+ customers</span>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: "easeOut" }}
              className="flex flex-col gap-6 p-8 glass-dark rounded-3xl border border-white/5 hover:border-brand-primary/20 transition-colors duration-500"
            >
              {/* Stars */}
              <StarRow count={t.rating} />

              {/* Quote */}
              <p className="text-zinc-300 leading-relaxed text-sm flex-1">
                "{t.text}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                  <p className="font-black text-white text-sm">{t.name}</p>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-0.5">{t.location}</p>
                </div>
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest px-3 py-1.5 bg-brand-primary/10 rounded-xl">
                  {t.bins}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Diagonal divider — transitions into the white Configurator section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none">
        <svg viewBox="0 0 1440 96" className="w-full h-full" preserveAspectRatio="none">
          <polygon points="0,96 1440,0 1440,96" fill="white" />
        </svg>
      </div>
    </section>
  );
}
