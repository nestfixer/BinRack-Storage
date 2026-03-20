import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Send, CheckCircle2, ClipboardList, Wrench, ShieldCheck, Check, ChevronLeft } from "lucide-react";

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Request a Quote",
    description: "Fill out the form with your rack size and contact info. We'll follow up within 24–48 hours.",
  },
  {
    step: "02",
    icon: Wrench,
    title: "We Build It",
    description: "Our team custom builds your BinRack to your exact specs — heavy-duty, locally made.",
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "We Install It",
    description: "We show up and install everything. You get a perfectly organized garage, done right.",
  },
];

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  postalCode: "",
  totesWide: "",
  totesTall: "",
  hasBins: "",
  additionalInfo: "",
  consentNonMarketing: false,
  consentMarketing: false,
};

const inputClass =
  "w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-primary transition-colors text-sm";

const labelClass = "block text-xs font-black uppercase tracking-widest text-zinc-400 mb-1";

const WIDE_OPTIONS = [1, 2, 3, 4, 5, 6];
const TALL_OPTIONS = [1, 2, 3, 4, 5, 6];

const phoneRegex = /^[\d\s\-()+]{7,15}$/;

const STEP_LABELS = ["Contact", "Your Rack", "Finish Up"];

// Slide direction variants
const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEP_LABELS.map((label, i) => {
        const num = i + 1;
        const active = num === step;
        const done = num < step;
        return (
          <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                  done
                    ? "bg-brand-primary text-surface-dark"
                    : active
                    ? "bg-brand-primary text-surface-dark ring-4 ring-brand-primary/20"
                    : "bg-white/10 text-zinc-500"
                }`}
              >
                {done ? <Check size={12} strokeWidth={3} /> : num}
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-widest hidden sm:block transition-colors duration-300 ${
                  active ? "text-white" : done ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`flex-1 h-px transition-all duration-500 ${done ? "bg-brand-primary" : "bg-white/10"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ToteGrid({
  selectedWide,
  selectedTall,
  onSelect,
}: {
  selectedWide: number | null;
  selectedTall: number | null;
  onSelect: (wide: number, tall: number) => void;
}) {
  const [hoverWide, setHoverWide] = useState<number | null>(null);
  const [hoverTall, setHoverTall] = useState<number | null>(null);

  const previewWide = hoverWide ?? selectedWide;
  const previewTall = hoverTall ?? selectedTall;

  return (
    <div>
      <label className={labelClass}>
        Rack Size (Wide × Tall) <span className="text-brand-primary">*</span>
      </label>
      <p className="text-xs text-zinc-500 mb-4">
        {selectedWide && selectedTall
          ? `${selectedWide} wide × ${selectedTall} tall — ${selectedWide * selectedTall} totes`
          : "Click a cell to select your rack size"}
      </p>
      <div className="inline-grid grid-cols-6 gap-1.5">
        {[...TALL_OPTIONS].reverse().map((tall) =>
          WIDE_OPTIONS.map((wide) => {
            const isSelected =
              selectedWide !== null && selectedTall !== null && wide <= selectedWide && tall <= selectedTall;
            const isHovered =
              previewWide !== null && previewTall !== null && wide <= previewWide && tall <= previewTall;
            return (
              <motion.button
                key={`${wide}-${tall}`}
                type="button"
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => { setHoverWide(wide); setHoverTall(tall); }}
                onMouseLeave={() => { setHoverWide(null); setHoverTall(null); }}
                onClick={() => onSelect(wide, tall)}
                className={`w-7 h-7 rounded transition-all duration-100 border ${
                  isSelected
                    ? "bg-brand-primary border-brand-primary"
                    : isHovered
                    ? "bg-brand-primary/40 border-brand-primary/60"
                    : "bg-white/5 border-white/10 hover:border-white/30"
                }`}
              />
            );
          })
        )}
      </div>
      <div className="flex gap-1.5 mt-1.5">
        {WIDE_OPTIONS.map((w) => (
          <span key={w} className="w-7 text-center text-[10px] text-zinc-600">{w}</span>
        ))}
      </div>
      <p className="text-[10px] text-zinc-600 mt-1">← wide</p>
    </div>
  );
}

export default function Configurator() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward
  const [formData, setFormData] = useState(EMPTY_FORM);

  const set = (field: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handlePhoneChange = (value: string) => {
    set("phone", value);
    setPhoneError(value.length > 0 && !phoneRegex.test(value));
  };

  const selectedWide = formData.totesWide ? parseInt(formData.totesWide) : null;
  const selectedTall = formData.totesTall ? parseInt(formData.totesTall) : null;

  // Per-step validation — gates the Next button
  const step1Valid =
    !!formData.firstName &&
    !!formData.lastName &&
    !!formData.phone &&
    !phoneError &&
    !!formData.email &&
    !!formData.postalCode;

  const step2Valid = !!formData.totesWide && !!formData.totesTall && !!formData.hasBins;

  const canAdvance = step === 1 ? step1Valid : step === 2 ? step2Valid : true;

  const goTo = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (phoneError) return;
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit:", err);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAll = () => {
    setSubmitted(false);
    setStep(1);
    setDir(1);
    setPhoneError(false);
    setSubmitError(false);
    setFormData(EMPTY_FORM);
  };

  return (
    <section id="quote" className="py-24 pb-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-4 block">
            Design Your Setup
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-8 text-text-dark">
            REQUEST A <br />
            <span className="text-brand-primary">CUSTOM QUOTE.</span>
          </h2>
          <p className="text-lg text-text-muted mb-10 leading-relaxed max-w-md">
            Fill out the form and we'll get back to you within 24–48 hours with a custom quote for your garage setup.
          </p>

          {/* How It Works */}
          <div className="mt-2">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6 block">
              How It Works
            </span>
            <div className="relative space-y-0">
              <div className="absolute left-[23px] top-10 bottom-10 w-px bg-gradient-to-b from-brand-primary via-brand-primary/40 to-transparent" />
              {HOW_IT_WORKS.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="flex items-start gap-5 pb-8 last:pb-0"
                >
                  <div className="relative z-10 shrink-0 w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                    <item.icon size={20} className="text-surface-dark" strokeWidth={2.5} />
                  </div>
                  <div className="pt-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-[10px] font-black tracking-widest text-brand-primary uppercase">{item.step}</span>
                      <h4 className="font-black text-text-dark tracking-tight">{item.title}</h4>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right panel — multi-step form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface-dark p-10 rounded-[40px] border border-white/10 shadow-2xl shadow-black/50 text-white"
        >
          <AnimatePresence mode="wait">
            {/* ── SUCCESS SCREEN ── */}
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-20 h-20 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black tracking-tighter">QUOTE REQUESTED!</h3>
                <p className="text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  Thanks {formData.firstName}! We've received your request and will be in touch within 24–48 hours.
                </p>
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-8 py-4 glass-dark text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10"
                >
                  Start Over
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="multistep"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
              >
                {/* Step indicator */}
                <StepIndicator step={step} />

                {/* Step content — slides between steps */}
                <div className="overflow-hidden">
                  <AnimatePresence mode="wait" custom={dir}>
                    {/* ── STEP 1: Contact Info ── */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        custom={dir}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="space-y-6"
                      >
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-6">
                          Step 1 — Tell us who you are
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>First Name <span className="text-brand-primary">*</span></label>
                            <input
                              type="text"
                              placeholder="First"
                              value={formData.firstName}
                              onChange={(e) => set("firstName", e.target.value)}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Last Name <span className="text-brand-primary">*</span></label>
                            <input
                              type="text"
                              placeholder="Last"
                              value={formData.lastName}
                              onChange={(e) => set("lastName", e.target.value)}
                              className={inputClass}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>Phone <span className="text-brand-primary">*</span></label>
                          <input
                            type="tel"
                            placeholder="(405) 000-0000"
                            value={formData.phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            className={`${inputClass} ${phoneError ? "border-red-500 focus:border-red-500" : ""}`}
                          />
                          {phoneError && (
                            <p className="text-xs text-red-400 mt-1">Please enter a valid phone number.</p>
                          )}
                        </div>
                        <div>
                          <label className={labelClass}>Email <span className="text-brand-primary">*</span></label>
                          <input
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => set("email", e.target.value)}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Postal Code <span className="text-brand-primary">*</span></label>
                          <input
                            type="text"
                            placeholder="73101"
                            value={formData.postalCode}
                            onChange={(e) => set("postalCode", e.target.value)}
                            className={inputClass}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 2: Your Rack ── */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        custom={dir}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="space-y-8"
                      >
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-6">
                          Step 2 — Configure your rack
                        </p>
                        <ToteGrid
                          selectedWide={selectedWide}
                          selectedTall={selectedTall}
                          onSelect={(wide, tall) => {
                            set("totesWide", String(wide));
                            set("totesTall", String(tall));
                          }}
                        />
                        <div>
                          <label className={labelClass}>
                            Do you already have 27 gal storage bins?{" "}
                            <span className="text-brand-primary">*</span>
                          </label>
                          <div className="flex gap-4 mt-3">
                            {["Yes", "No"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => set("hasBins", opt)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest border transition-all ${
                                  formData.hasBins === opt
                                    ? "bg-brand-primary text-surface-dark border-brand-primary"
                                    : "border-white/20 text-zinc-400 hover:border-white/40"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 3: Finish Up ── */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        custom={dir}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="space-y-6"
                      >
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-6">
                          Step 3 — Almost done
                        </p>
                        <div>
                          <label className={labelClass}>Additional Information</label>
                          <textarea
                            placeholder="Questions, special requests, odd wall dimensions..."
                            value={formData.additionalInfo}
                            onChange={(e) => set("additionalInfo", e.target.value)}
                            rows={3}
                            className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-primary transition-colors text-sm resize-none"
                          />
                        </div>
                        <div className="space-y-4 pt-2">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.consentNonMarketing}
                              onChange={(e) => set("consentNonMarketing", e.target.checked)}
                              className="mt-0.5 w-4 h-4 accent-brand-primary shrink-0"
                            />
                            <span className="text-xs text-zinc-500 leading-relaxed">
                              By checking this box, I consent to receive non-marketing text messages from{" "}
                              <span className="font-bold text-brand-primary">BINRACK</span> about{" "}
                              <span className="font-bold">MY QUOTE REQUEST</span>. Message frequency varies, message &amp; data rates may apply.
                              Text HELP for assistance, reply <span className="font-bold">STOP</span> to opt out.
                            </span>
                          </label>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.consentMarketing}
                              onChange={(e) => set("consentMarketing", e.target.checked)}
                              className="mt-0.5 w-4 h-4 accent-brand-primary shrink-0"
                            />
                            <span className="text-xs text-zinc-500 leading-relaxed">
                              By checking this box, I consent to receive marketing and promotional messages including special offers,
                              discounts, new product updates among others from{" "}
                              <span className="font-bold text-brand-primary">BINRACK</span> at the phone number provided. Frequency may
                              vary. Message &amp; data rates may apply. Text HELP for assistance, reply{" "}
                              <span className="font-bold">STOP</span> to opt out.
                            </span>
                          </label>
                        </div>
                        {submitError && (
                          <p className="text-sm text-red-400 text-center">Something went wrong. Please try again.</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation buttons */}
                <div className={`flex gap-3 mt-8 ${step > 1 ? "justify-between" : "justify-end"}`}>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => goTo(step - 1)}
                      className="flex items-center gap-2 px-5 py-3 glass-dark text-zinc-400 font-bold rounded-2xl hover:text-white hover:bg-white/10 transition-all border border-white/10 text-sm"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  )}

                  {step < 3 ? (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => goTo(step + 1)}
                      disabled={!canAdvance}
                      className="flex-1 py-4 bg-brand-primary text-surface-dark font-black rounded-2xl hover:bg-brand-secondary transition-all uppercase tracking-wide text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next — {STEP_LABELS[step]}
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      disabled={isSubmitting}
                      className="flex-1 py-4 bg-brand-primary text-surface-dark font-black rounded-2xl hover:bg-brand-secondary transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : <><span>Submit Request</span><Send size={16} /></>}
                    </motion.button>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Diagonal divider — transitions into the dark FAQ section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none">
        <svg viewBox="0 0 1440 96" className="w-full h-full" preserveAspectRatio="none">
          <polygon points="0,0 1440,96 0,96" fill="#121212" />
        </svg>
      </div>
    </section>
  );
}
