import { motion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";

interface CTASectionProps {
  darkMode: boolean;
}

export function CTASection({ darkMode }: CTASectionProps) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="py-24 px-6"
      style={{ background: darkMode ? "#111" : "#fff" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center"
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #1e1612 0%, #2a1f14 50%, #1a1410 100%)"
              : "linear-gradient(135deg, #E8DCCF 0%, #D4C4B0 50%, #E8DCCF 100%)",
            border: darkMode ? "1px solid rgba(212,184,150,0.2)" : "1px solid rgba(196,168,130,0.3)",
          }}
        >
          {/* Decorative elements */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #C4A882 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-15 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #A07850 0%, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
          />

          {/* Germany flag decoration */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
            style={{
              background: darkMode ? "rgba(212,184,150,0.15)" : "rgba(255,255,255,0.5)",
              border: "1px solid rgba(196,168,130,0.4)",
              fontFamily: "Sora, sans-serif",
              color: darkMode ? "#D4B896" : "#8B6B4A",
            }}
          >
            🇩🇪 Pakistan → Germany
          </div>

          <h2
            className="mb-6 relative z-10"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 800,
              color: darkMode ? "#fff" : "#111",
              lineHeight: 1.2,
            }}
          >
            Start Your Study Abroad
            <br />
            <span
              style={{
                display: "inline-block",
                background: darkMode
                  ? "linear-gradient(135deg, #D4B896, #C4A882)"
                  : "linear-gradient(135deg, #8B6B4A, #6B4E32)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              Journey Today
            </span>
          </h2>

          <p
            className="mb-10 max-w-xl mx-auto relative z-10"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "0.95rem",
              color: darkMode ? "#bbb" : "#666",
              lineHeight: 1.7,
            }}
          >
            Join 500+ students who trusted Growth Bridge to navigate their path to Germany. Expert guidance, proven results.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => scrollTo("#consultation")}
              className="group flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#C4A882]/30 hover:-translate-y-1"
              style={{
                fontFamily: "Sora, sans-serif",
                background: "linear-gradient(135deg, #D4B896, #C4A882)",
                color: "#fff",
              }}
            >
              Book Consultation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-1"
              style={{
                fontFamily: "Sora, sans-serif",
                background: darkMode ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
                border: darkMode ? "1.5px solid rgba(255,255,255,0.15)" : "1.5px solid rgba(255,255,255,0.8)",
                color: darkMode ? "#E8DCCF" : "#555",
              }}
            >
              <MessageCircle className="w-4 h-4" style={{ color: "#25D366" }} />
              Contact Us
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 relative z-10">
            {["✅ 500+ Students Guided", "🎓 50+ Universities", "📞 Free First Consultation"].map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.8rem",
                  color: darkMode ? "#888" : "#888",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
