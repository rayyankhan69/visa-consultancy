import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoWithoutBg from "../../../assets/images/logo/logo_without_bg.png";

interface NavbarProps {
  darkMode: boolean;
}

export function Navbar({ darkMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#services" },
    { label: "IELTS", href: "#ielts" },
    { label: "Consultation", href: "#consultation" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "About Us", href: "/about-us" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);

    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }

    if (href.startsWith("#") && window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      const offset = 80; // Navbar height
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? "bg-[#111]/90 backdrop-blur-xl shadow-lg shadow-black/20"
            : "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            if (window.location.pathname !== "/") {
              window.location.href = "/";
              return;
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <img
              src={logoWithoutBg}
              alt="AbroadAoo logo"
              className="h-10 w-10 object-contain"
            />
          </div>
          <span
            className="font-bold tracking-tight"
            style={{ fontFamily: "Sora, sans-serif", fontSize: "1.1rem", color: darkMode ? "#fff" : "#111" }}
          >
            Abroad<span style={{ color: "#C4A882" }}>Aoo</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={`text-sm transition-colors duration-200 hover:text-[#C4A882] ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              window.location.href = "/book";
            }}
            className="hidden md:block px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md"
            style={{
              fontFamily: "Sora, sans-serif",
              background: "linear-gradient(135deg, #D4B896, #C4A882)",
              color: "#fff",
            }}
          >
            Book Now
          </button>
          <button
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
            style={{ color: darkMode ? "#fff" : "#111" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden border-t overflow-hidden ${
              darkMode ? "bg-[#111] border-[#222]" : "bg-white border-gray-100"
            }`}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left text-sm py-1 transition-colors hover:text-[#C4A882] ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  window.location.href = "/book";
                }}
                className="mt-2 w-full py-2.5 rounded-full text-sm font-medium"
                style={{
                  fontFamily: "Sora, sans-serif",
                  background: "linear-gradient(135deg, #D4B896, #C4A882)",
                  color: "#fff",
                }}
              >
                Book Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}