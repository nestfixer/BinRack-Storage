import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

export default function StickyCTA() {
  const [show, setShow] = useState(false);
  const [nearQuote, setNearQuote] = useState(false);

  // Show after scrolling past the hero (~600px)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide when the quote section is visible (no need to float a button if form is on screen)
  useEffect(() => {
    const quoteSection = document.getElementById("quote");
    if (!quoteSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearQuote(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(quoteSection);
    return () => observer.disconnect();
  }, []);

  const visible = show && !nearQuote;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#quote"
          initial={{ opacity: 0, y: 28, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.85 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.93 }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-4 bg-brand-primary text-surface-dark font-black rounded-2xl shadow-2xl shadow-brand-primary/40 uppercase text-sm tracking-widest"
        >
          Get a Quote <ChevronRight size={18} strokeWidth={3} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
