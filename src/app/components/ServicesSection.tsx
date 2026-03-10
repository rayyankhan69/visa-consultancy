import { motion } from "motion/react";
import { GraduationCap, Wrench, BookOpen, Check, ArrowRight } from "lucide-react";

interface ServicesSectionProps {
  darkMode: boolean;
}

const services = [
  {
    icon: GraduationCap,
    emoji: "🎓",
    title: "Master's Programs in Germany",
    color: "#C4A882",
    bgColor: "rgba(196,168,130,0.12)",
    features: [
      "16 years of education required (Bachelor's degree)",
      "IELTS or TOEFL required",
      "Many English-taught programs available",
      "German not required for many courses",
      "No tuition fees in most public universities",
    ],
    cta: "Learn More",
  },
  {
    icon: Wrench,
    emoji: "🛠️",
    title: "Ausbildung in Germany",
    color: "#A07850",
    bgColor: "rgba(160,120,80,0.12)",
    features: [
      "Dual vocational training program",
      "Duration: 2 – 3.5 years",
      "Work in a company while studying",
      "Monthly stipend €800 – €1000",
      "No blocked account required if applying directly",
    ],
    cta: "Explore Ausbildung",
  },
  {
    icon: BookOpen,
    emoji: "🎓",
    title: "Direct Bachelor's Route",
    color: "#8B6B4A",
    bgColor: "rgba(139,107,74,0.12)",
    features: [
      "After 2 semesters of Bachelor's in Pakistan",
      "Skip Studienkolleg – apply directly",
      "English Programs: IELTS 6.0+",
      "German Programs: B2 German level",
      "Blocked account €11,208 | Visa wait 3–6 months",
    ],
    cta: "Check Eligibility",
  },
];

export function ServicesSection({ darkMode }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="py-24 px-6"
      style={{
        background: darkMode ? "#111" : "#fff",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4"
            style={{
              background: darkMode ? "rgba(212,184,150,0.12)" : "rgba(212,184,150,0.25)",
              color: darkMode ? "#D4B896" : "#8B6B4A",
              fontFamily: "Sora, sans-serif",
              border: "1px solid rgba(196,168,130,0.3)",
            }}
          >
            Our Programs
          </span>
          <h2
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: darkMode ? "#fff" : "#111",
              lineHeight: 1.2,
            }}
          >
            Programs We Offer
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "0.95rem",
              color: darkMode ? "#888" : "#777",
              lineHeight: 1.7,
            }}
          >
            Choose the study pathway that fits your background and goals. We guide you through every step.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative flex flex-col rounded-3xl overflow-hidden cursor-pointer"
              style={{
                background: darkMode ? "#1a1a1a" : "#fff",
                border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.18)",
                boxShadow: darkMode
                  ? "0 4px 30px rgba(0,0,0,0.3)"
                  : "0 4px 30px rgba(196,168,130,0.12)",
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${service.color}, transparent)`,
                }}
              />

              <div className="p-8 flex flex-col flex-1">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: service.bgColor }}
                >
                  {service.emoji}
                </div>

                {/* Title */}
                <h3
                  className="mb-6"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: darkMode ? "#fff" : "#111",
                    lineHeight: 1.3,
                  }}
                >
                  {service.title}
                </h3>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: service.color }}
                      />
                      <span
                        style={{
                          fontFamily: "Sora, sans-serif",
                          fontSize: "0.83rem",
                          color: darkMode ? "#aaa" : "#666",
                          lineHeight: 1.5,
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className="group/btn flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 w-full justify-center hover:shadow-md"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    background: `linear-gradient(135deg, ${service.color}22, ${service.color}33)`,
                    border: `1.5px solid ${service.color}55`,
                    color: darkMode ? "#E8DCCF" : service.color,
                  }}
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
