import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, Shield, Zap } from "lucide-react";

const STATS = [
  { value: 100, suffix: "+", label: "Shelves Built", decimal: false },
  { value: 4.9, suffix: "/5", label: "Customer Rating", decimal: true },
  { value: 24, suffix: "h", label: "Response Time", decimal: false },
];

function StatCounter({
  value,
  suffix,
  label,
  decimal = false,
}: {
  value: number;
  suffix: string;
  label: string;
  decimal?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.8 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1600;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - t) ** 3; // cubic ease-out
      setCount(decimal ? Math.round(value * eased * 10) / 10 : Math.round(value * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, value, decimal]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="text-2xl font-bold text-white tabular-nums">
        {decimal ? count.toFixed(1) : count}{suffix}
      </span>
      <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{label}</span>
    </div>
  );
}

export default function Hero() {
  const heroImage = "/photos/Tote rack system.png";
  const { scrollY } = useScroll();
  const blob1Y = useTransform(scrollY, [0, 600], [0, -180]);
  const blob2Y = useTransform(scrollY, [0, 600], [0, 120]);
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const imageY = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-surface-dark text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: blob1Y }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full" />
        <motion.div style={{ y: blob2Y }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/carbon-fibre.png')] opacity-10 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-bold text-brand-primary uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(255,184,0,0.1)]"
          >
            <Zap size={12} /> Organize your storage
          </motion.div>
          <h1 className="font-display font-black leading-none tracking-tighter mb-8">
            <span className="text-4xl md:text-5xl lg:text-6xl block mb-3 text-gradient-light">
              CLUTTERED SPACE <br />
              MAKING YOU FEEL
            </span>
            <span className="text-brand-primary text-5xl md:text-6xl lg:text-7xl block">
              OVERWHELMED?
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed">
            Maximize your garage storage with locally built, heavy-duty tote rack shelving designed specifically for 27-gallon bins. Custom-built, professionally installed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#quote"
              className="px-8 py-4 bg-brand-primary text-surface-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20 uppercase"
            >
              Get a Quote <ChevronRight size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#gallery"
              className="px-8 py-4 glass-dark text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
            >
              View Gallery
            </motion.a>
          </div>

          {/* Mobile-only product image — shown between CTAs and stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 block lg:hidden rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/40 aspect-[16/9]"
          >
            <img
              src={heroImage}
              alt="BinRack custom garage shelving system loaded with 27-gallon HDX storage totes"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="mt-12 flex items-center gap-8 border-t border-white/5 pt-8">
            {STATS.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 aspect-[4/5] bg-zinc-900 flex items-center justify-center">
            <img
              src={heroImage}
              alt="BinRack custom garage shelving system loaded with 27-gallon HDX storage totes"
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-2xl">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-black">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Heavy-Duty Pine</h4>
                  <p className="text-xs text-zinc-400">Built to withstand 500+ lbs</p>
                </div>
              </div>
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
