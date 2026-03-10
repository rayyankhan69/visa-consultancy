import { motion } from "motion/react";
import { ArrowRight, Users, Building2, Clock, CheckCircle } from "lucide-react";

interface HeroProps {
  darkMode: boolean;
}

const stats = [
  { icon: Users, value: "500+", label: "Students Guided" },
  { icon: Building2, value: "50+", label: "Universities" },
  { icon: Clock, value: "7+", label: "Years Experience" },
  { icon: CheckCircle, value: "95%", label: "Visa Success Rate" },
];

export function HeroSection({ darkMode }: HeroProps) {
  const scrollTo = (href: string) => {
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
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #0e0e0e 0%, #1a1612 50%, #111 100%)"
          : "linear-gradient(135deg, #FAF7F4 0%, #F0E8DF 50%, #FAF7F4 100%)",
      }}
    >
      {/* Background decorative circles */}
      <div
        className="absolute top-20 right-10 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #D4B896 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-40 left-10 w-60 h-60 rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #C4A882 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-36 pb-20 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6"
              style={{
                background: darkMode ? "rgba(212,184,150,0.15)" : "rgba(212,184,150,0.3)",
                border: "1px solid rgba(196,168,130,0.4)",
                color: darkMode ? "#D4B896" : "#8B6B4A",
                fontFamily: "Sora, sans-serif",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4A882] animate-pulse" />
              Pakistan → Germany Study Abroad Consultancy
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: darkMode ? "#fff" : "#111",
              }}
            >
              Build Your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #C4A882, #A07850)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Future Abroad
              </span>
              <br />
              with Growth Bridge
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 max-w-lg"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: darkMode ? "#aaa" : "#666",
              }}
            >
              Helping students from Pakistan study, train, and succeed in Germany. Your journey to a world-class education starts here.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollTo("#services")}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#C4A882]/30 hover:-translate-y-0.5"
                style={{
                  fontFamily: "Sora, sans-serif",
                  background: "linear-gradient(135deg, #D4B896, #C4A882)",
                  color: "#fff",
                }}
              >
                Explore Programs
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo("#consultation")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  fontFamily: "Sora, sans-serif",
                  border: darkMode ? "1.5px solid rgba(212,184,150,0.5)" : "1.5px solid rgba(196,168,130,0.5)",
                  color: darkMode ? "#D4B896" : "#8B6B4A",
                  background: "transparent",
                }}
              >
                Book Consultation
              </button>
            </motion.div>
          </div>

          {/* Right: Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{
                boxShadow: darkMode
                  ? "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,184,150,0.1)"
                  : "0 40px 80px rgba(196,168,130,0.25), 0 0 0 1px rgba(196,168,130,0.1)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwYWJyb2FkJTIwdW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwxfHx8fDE3NzMwODA1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students studying abroad"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: darkMode
                    ? "linear-gradient(to top, rgba(17,17,17,0.6) 0%, transparent 60%)"
                    : "linear-gradient(to top, rgba(232,220,207,0.4) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 px-5 py-4 rounded-2xl shadow-xl"
              style={{
                background: darkMode
                  ? "rgba(30,24,20,0.9)"
                  : "rgba(255,255,255,0.92)",
                backdropFilter: "blur(20px)",
                border: darkMode ? "1px solid rgba(212,184,150,0.2)" : "1px solid rgba(196,168,130,0.2)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ background: "rgba(212,184,150,0.2)" }}
                >
                  🇩🇪
                </div>
                <div>
                  <p
                    className="text-xs font-semibold"
                    style={{ fontFamily: "Sora, sans-serif", color: darkMode ? "#fff" : "#111" }}
                  >
                    Germany Bound
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "Sora, sans-serif", color: darkMode ? "#888" : "#888" }}
                  >
                    2024 Intake Open
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -top-4 -right-4 px-4 py-3 rounded-2xl shadow-xl"
              style={{
                background: "linear-gradient(135deg, #D4B896, #C4A882)",
                color: "#fff",
              }}
            >
              <p className="text-xs font-semibold" style={{ fontFamily: "Sora, sans-serif" }}>
                ✅ 95% Visa Success
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: darkMode
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.7)",
                backdropFilter: "blur(10px)",
                border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
                boxShadow: darkMode ? "none" : "0 4px 20px rgba(196,168,130,0.1)",
              }}
            >
              <stat.icon className="w-6 h-6 mb-3" style={{ color: "#C4A882" }} />
              <span
                className="mb-1"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: darkMode ? "#E8DCCF" : "#8B6B4A",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.8rem",
                  color: darkMode ? "#888" : "#999",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}