import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";

// Editorial masonry grid layout (4-column, auto-rows on desktop)
// Row 1-2: [Full Wall 2×2] [Workbench 1×2] [Family] / [5x6]
// Row 3:   [3x6] [3x5 Shed 2×1] [3x3]
// Row 4:   [Tote Rack — full width 4×1]
const GRID_SPANS = [
  "lg:col-span-2 lg:row-span-2", // Full Wall — hero feature
  "lg:col-span-1 lg:row-span-2", // Workbench — tall
  "lg:col-span-1 lg:row-span-1", // Family — small
  "lg:col-span-1 lg:row-span-1", // 5×6 — small
  "lg:col-span-1 lg:row-span-1", // 3×6 — small
  "lg:col-span-2 lg:row-span-1", // 3×5 Shed — wide
  "lg:col-span-1 lg:row-span-1", // 3×3 — small
  "lg:col-span-4 lg:row-span-1", // Tote Rack — full-width banner
];

const galleryItems = [
  { src: "/photos/full wall system.png",    title: "Full Wall System",       alt: "Full wall custom garage shelving system with 27-gallon storage totes" },
  { src: "/photos/workbench combo.jpg",     title: "Workbench Combo",        alt: "BinRack garage workbench and tote shelving combo unit" },
  { src: "/photos/family organization.jpg", title: "Family Organization",    alt: "Family garage organization with modular BinRack tote shelving" },
  { src: "/photos/5x6.webp",               title: "5\u00d76 Maximum Storage",    alt: "5 wide by 6 tall heavy-duty garage tote rack holding 30 bins" },
  { src: "/photos/3x6.webp",               title: "3\u00d76 Tall Configuration", alt: "3 wide by 6 tall custom pine tote shelving for garage storage" },
  { src: "/photos/3x5 in shed.jpg",        title: "3\u00d75 Shed Install",       alt: "3x5 BinRack custom tote shelving installed in a shed" },
  { src: "/photos/3x3.webp",               title: "3\u00d73 Compact System",     alt: "Compact 3x3 garage tote storage rack for small spaces" },
  { src: "/photos/Tote rack system.png",   title: "Tote Rack System",       alt: "Complete BinRack tote rack system with HDX 27-gallon bins" },
];

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-zinc-800 animate-pulse rounded-[32px]" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}

export default function Gallery() {
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blob1Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="gallery" ref={sectionRef} className="relative py-24 bg-surface-dark text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div style={{ y: blob1Y }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full" />
        <motion.div style={{ y: blob2Y }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/carbon-fibre.png')] opacity-10" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-4 block"
          >
            Our Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-black tracking-tighter text-gradient-light"
          >
            CUSTOM SHELVING <br />
            <span className="text-zinc-500">INSTALLATIONS.</span>
          </motion.h2>
        </div>
        <p className="text-zinc-400 max-w-sm mb-2">
          Browse our recent installations and see how BinRack can transform your cluttered garage into an organized workspace.
        </p>
      </div>

      {/* Masonry grid: 4-col on desktop, 2-col on mobile */}
      {/* Layout: [Full Wall 2×2][Workbench 1×2][Family][5x6] / [3x6][3x5 Shed 2×1][3x3] / [Tote Rack full-width] */}
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px] gap-4">
        {galleryItems.map((item, i) => (
          <motion.div
            key={item.src}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.02, boxShadow: "0 32px 64px rgba(0,0,0,0.6), 0 0 40px rgba(255,184,0,0.1)" }}
            className={`group relative aspect-[4/3] lg:aspect-auto rounded-[24px] lg:rounded-[32px] overflow-hidden cursor-pointer ${GRID_SPANS[i]}`}
            onClick={() => setSelected({ src: item.src, alt: item.alt })}
          >
            <GalleryImage src={item.src} alt={item.alt} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 lg:p-8">
              <h4 className="text-lg lg:text-xl font-bold text-white mb-1">{item.title}</h4>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-widest">
                <Maximize2 size={14} /> View Full Size
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            aria-label="Close lightbox"
            className="absolute top-8 right-8 text-white hover:text-brand-primary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(null);
            }}
          >
            <X size={32} />
          </button>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={selected.src}
            alt={selected.alt}
            className="max-w-full max-h-full rounded-3xl shadow-2xl"
          />
        </div>
      )}
      </div>

    </section>
  );
}
