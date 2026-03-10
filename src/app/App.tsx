import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { IELTSSection } from "./components/IELTSSection";
import { ConsultationSection } from "./components/ConsultationSection";
import { ProcessSection } from "./components/ProcessSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "Sora, sans-serif", transition: "background 0.3s, color 0.3s" }}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <HeroSection darkMode={darkMode} />
      <ServicesSection darkMode={darkMode} />
      <IELTSSection darkMode={darkMode} />
      <ConsultationSection darkMode={darkMode} />
      <ProcessSection darkMode={darkMode} />
      <TestimonialsSection darkMode={darkMode} />
      <FAQSection darkMode={darkMode} />
      <CTASection darkMode={darkMode} />
      <Footer darkMode={darkMode} />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, #D4B896, #C4A882)",
              color: "#fff",
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}