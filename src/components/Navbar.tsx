import { motion } from "motion/react";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Gallery", href: "#gallery" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-dark py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-black rounded-sm" />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter">BINRACK</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`text-sm font-medium transition-colors ${scrolled ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-black"}`}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="#quote"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2 bg-brand-primary text-surface-dark text-sm font-bold rounded-full hover:bg-brand-secondary transition-colors flex items-center gap-2"
          >
            Get Quote <ChevronRight size={16} />
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" aria-label={isOpen ? "Close menu" : "Open menu"} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 glass-dark border-t border-white/5 p-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-zinc-400 hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#quote"
            onClick={() => setIsOpen(false)}
            className="w-full py-4 bg-brand-primary text-black text-center font-bold rounded-xl"
          >
            Get a Custom Quote
          </a>
        </motion.div>
      )}
    </nav>
  );
}
