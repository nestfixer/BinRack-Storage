import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Configurator from "./components/Configurator";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import StickyCTA from "./components/StickyCTA";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-brand-primary selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Gallery />
        <Testimonials />
        <Configurator />
        <FAQ />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
