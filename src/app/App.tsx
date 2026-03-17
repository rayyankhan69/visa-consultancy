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
import { BookPage } from "./pages/BookPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsOfServicePage } from "./pages/TermsOfServicePage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { IletsBookingPage } from "./pages/IletsBookingPage";
import { IletsFormPage } from "./pages/IletsFormPage";

export default function App() {
  const isBookPage = typeof window !== "undefined" && window.location.pathname === "/book";
  const isIletsBookingPage = typeof window !== "undefined" && window.location.pathname === "/ilets-booking";
  const isIletsFormPage = typeof window !== "undefined" && window.location.pathname === "/ilets-form";
  const isPrivacyPolicyPage = typeof window !== "undefined" && window.location.pathname === "/privacy-policy";
  const isTermsOfServicePage = typeof window !== "undefined" && window.location.pathname === "/terms-of-service";
  const isAboutUsPage = typeof window !== "undefined" && window.location.pathname === "/about-us";

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setDarkMode(event.matches);
    };

    handleChange(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

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

  useEffect(() => {
    let cancelled = false;

    const scrollToHash = (attempt = 0) => {
      if (cancelled) return;
      if (window.location.pathname !== "/") return;

      const hash = window.location.hash;
      if (!hash || !hash.startsWith("#")) return;

      if (hash === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const el = document.querySelector(hash);
      if (!el) {
        if (attempt < 20) {
          window.setTimeout(() => scrollToHash(attempt + 1), 50);
        }
        return;
      }

      const nav = document.querySelector("nav");
      const navHeight = nav ? Math.ceil(nav.getBoundingClientRect().height) : 80;
      // Sections already have generous top padding (py-24 ~ 96px).
      const offset = Math.max(0, navHeight - 96);
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    };

    // Run after initial render and whenever hash changes.
    scrollToHash(0);
    const onHashChange = () => scrollToHash(0);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isBookPage) {
    return (
      <div style={{ fontFamily: "Sora, sans-serif", transition: "background 0.3s, color 0.3s" }}>
        <Navbar darkMode={darkMode} />
        <BookPage darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    );
  }

  if (isIletsBookingPage) {
    return (
      <div style={{ fontFamily: "Sora, sans-serif", transition: "background 0.3s, color 0.3s" }}>
        <Navbar darkMode={darkMode} />
        <IletsBookingPage darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    );
  }

  if (isIletsFormPage) {
    return (
      <div style={{ fontFamily: "Sora, sans-serif", transition: "background 0.3s, color 0.3s" }}>
        <Navbar darkMode={darkMode} />
        <IletsFormPage darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    );
  }

  if (isPrivacyPolicyPage) {
    return (
      <div style={{ fontFamily: "Sora, sans-serif", transition: "background 0.3s, color 0.3s" }}>
        <Navbar darkMode={darkMode} />
        <PrivacyPolicyPage darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    );
  }

  if (isTermsOfServicePage) {
    return (
      <div style={{ fontFamily: "Sora, sans-serif", transition: "background 0.3s, color 0.3s" }}>
        <Navbar darkMode={darkMode} />
        <TermsOfServicePage darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    );
  }

  if (isAboutUsPage) {
    return (
      <div style={{ fontFamily: "Sora, sans-serif", transition: "background 0.3s, color 0.3s" }}>
        <Navbar darkMode={darkMode} />
        <AboutUsPage darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Sora, sans-serif", transition: "background 0.3s, color 0.3s" }}>
      <Navbar darkMode={darkMode} />
      <div id="top" />
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