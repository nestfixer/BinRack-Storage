import { motion } from "motion/react";
import { Facebook, Mail, Phone, MapPin, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-24 bg-surface-dark relative overflow-hidden text-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-16 items-start">
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-surface-dark rounded-sm" />
            </div>
            <span className="text-2xl font-display font-black tracking-tighter">BINRACK</span>
          </motion.div>
          <p className="text-lg text-zinc-400 max-w-sm leading-relaxed">
            Premium custom garage shelving solutions designed for 27-gallon totes. Heavy-duty, modular, and locally built storage systems.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/profile.php?id=61587181026574" aria-label="Follow BinRack on Facebook" className="w-12 h-12 glass-dark rounded-2xl flex items-center justify-center text-white hover:bg-brand-primary hover:text-surface-dark transition-all">
              <Facebook size={20} />
            </a>
            <a href="mailto:binrackokc@gmail.com" aria-label="Email BinRack" className="w-12 h-12 glass-dark rounded-2xl flex items-center justify-center text-white hover:bg-brand-primary hover:text-surface-dark transition-all">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-4">
            {["Features", "Gallery", "Quote", "FAQ", "Contact"].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="text-sm font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight size={14} className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Contact Us</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 glass-dark rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-1">Call Us</span>
                <a href="tel:+14052964892" className="text-sm font-bold text-white hover:text-brand-primary transition-colors">(405) 296-4892</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 glass-dark rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-1">Location</span>
                <span className="text-sm font-bold text-white">Serving the Greater OKC, Oklahoma Area</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          © {new Date().getFullYear()} BINRACK. All Rights Reserved.
        </span>
        <div className="flex items-center gap-8">
          <a href="#" className="text-xs font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
