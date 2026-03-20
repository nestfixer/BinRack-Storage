import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "What size bins do you design for?",
      answer: "We standardly design for Home Depot's 27-gallon HDX bins. However, if you already have bins, we can customize the shelving to fit your specific needs.",
    },
    {
      question: "How much weight can the shelves hold?",
      answer: "Our heavy-duty pine construction is designed to hold a significant amount of weight per shelf when properly installed and loaded with standard 27-gallon totes.",
    },
    {
      question: "Do you provide the bins?",
      answer: "Yes, we provide the bins! We use Home Depot's 27-gallon HDX bins for the best fit and durability.",
    },
    {
      question: "How long does installation take?",
      answer: "Most standard installations are completed within 1–3 hours on-site. Larger custom systems may take a full day.",
    },
    {
      question: "Is there a warranty?",
      answer: "Yes, we offer a 1-year warranty on all workmanship. We build our shelves to last a lifetime.",
    },
    {
      question: "Can I use them in a business or warehouse?",
      answer: "Absolutely. They're great for commercial spaces, workshops, garages, and more.",
    },
    {
      question: "Are the racks easy to install?",
      answer: "Yes! Because we install it for you.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 bg-surface-dark text-white overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/carbon-fibre.png')] opacity-10" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-3xl flex items-center justify-center mx-auto mb-6"
          >
            <HelpCircle size={32} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black tracking-tighter mb-4 text-gradient-light"
          >
            GARAGE SHELVING <br />
            <span className="text-zinc-500">FAQ.</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.45, ease: "easeOut" }}
              className="glass-dark rounded-3xl overflow-hidden border border-white/5"
            >
              <button
                type="button"
                className="w-full p-8 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              >
                <span className="text-lg font-bold text-white">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ml-4 ${activeIndex === i ? "bg-brand-primary text-surface-dark" : "bg-white/10 text-white"}`}>
                  {activeIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-8"
                  >
                    <p className="text-zinc-400 leading-relaxed pt-2 border-t border-white/5">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
