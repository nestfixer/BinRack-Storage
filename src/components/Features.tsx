import { motion } from "motion/react";
import { Box, Shield, Hammer, Layers, ChevronRight } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "FITS 27-GALLON TOTES",
      description: "We standardly design for Home Depot's 27-gallon HDX bins. However, if you already have bins, we can customize the shelving to fit your specific needs.",
      icon: <Box size={24} />,
      color: "text-brand-primary",
      bg: "bg-brand-primary/10",
    },
    {
      title: "BUILT TO LAST",
      description: "Crafted from high-quality pine lumber and durable deck screws. Precisely measured and cut for a perfect, long-lasting fit.",
      icon: <Shield size={24} />,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      title: "BUILD EXPERIENCE",
      description: "With hundreds of shelves built, our skilled team ensures a smooth process, turning your storage ideas into reality.",
      icon: <Hammer size={24} />,
      color: "text-zinc-400",
      bg: "bg-zinc-400/10",
    },
    {
      title: "MODULAR & CUSTOMIZABLE",
      description: "Customize the size and configuration to fit any space. Mix and match components to create your perfect storage solution.",
      icon: <Layers size={24} />,
      color: "text-white",
      bg: "bg-white/10",
    },
  ];

  return (
    <section id="features" className="relative py-24 bg-surface-dark text-white overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-primary/8 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-brand-secondary/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/carbon-fibre.png')] opacity-10" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-4 block"
          >
            Why Choose BinRack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6 text-gradient-light"
          >
            ENGINEERED FOR <br />
            <span className="text-zinc-500">GARAGE TOTE SHELVING.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={{ rotateX: 4, rotateY: -4, scale: 1.03, z: 40 }}
              style={{ transformPerspective: 800, transformStyle: "preserve-3d" }}
              className="group p-8 glass-dark rounded-3xl hover:bg-white/10 transition-colors duration-500 border border-white/5 hover:border-white/10 cursor-default"
            >
              <div className={`w-12 h-12 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight text-white">{feature.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                {feature.description}
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
