import { motion } from "motion/react";
import { MessageCircle, UserCheck, FileText, Stamp, Plane } from "lucide-react";

interface ProcessSectionProps {
  darkMode: boolean;
}

const steps = [
  {
    number: "01",
    emoji: "💬",
    icon: MessageCircle,
    title: "Consultation",
    description: "Discuss your goals, background, and study options with our expert advisors.",
    color: "#D4B896",
  },
  {
    number: "02",
    emoji: "👤",
    icon: UserCheck,
    title: "Profile Evaluation",
    description: "We assess your academic profile to find the best-fit programs for you.",
    color: "#C4A882",
  },
  {
    number: "03",
    emoji: "📄",
    icon: FileText,
    title: "University / Ausbildung Applications",
    description: "We help you prepare and submit applications to German universities or companies.",
    color: "#B09070",
  },
  {
    number: "04",
    emoji: "🛂",
    icon: Stamp,
    title: "Visa Guidance",
    description: "Step-by-step support for blocked account, APS, and German student visa.",
    color: "#A07850",
  },
  {
    number: "05",
    emoji: "✈️",
    icon: Plane,
    title: "Pre-Departure Support",
    description: "Final preparation: accommodation, health insurance, and arrival tips.",
    color: "#8B6B4A",
  },
];

export function ProcessSection({ darkMode }: ProcessSectionProps) {
  return (
    <section
      id="process"
      className="py-24 px-6"
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #141210 0%, #111 100%)"
          : "linear-gradient(135deg, #FAF7F4 0%, #F0E8DF 100%)",
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
              background: darkMode ? "rgba(212,184,150,0.12)" : "rgba(212,184,150,0.3)",
              color: darkMode ? "#D4B896" : "#8B6B4A",
              fontFamily: "Sora, sans-serif",
              border: "1px solid rgba(196,168,130,0.3)",
            }}
          >
            How It Works
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
            Your Journey with Growth Bridge
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
            A proven 5-step process to take you from Pakistan to Germany.
          </p>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connector line */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-0.5" style={{ background: darkMode ? "rgba(255,255,255,0.08)" : "rgba(196,168,130,0.25)" }}>
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #D4B896, #8B6B4A)" }}
            />
          </div>

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Circle */}
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  className="relative w-[52px] h-[52px] rounded-full flex items-center justify-center mb-6 transition-shadow duration-300 group-hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}33, ${step.color}55)`,
                    border: `2.5px solid ${step.color}`,
                    boxShadow: `0 0 0 0px ${step.color}33`,
                  }}
                >
                  <span className="text-xl">{step.emoji}</span>
                  {/* Step number badge */}
                  <div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: step.color,
                      color: "#fff",
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.6rem",
                    }}
                  >
                    {i + 1}
                  </div>
                </motion.div>

                {/* Content */}
                <div
                  className="p-5 rounded-2xl w-full transition-all duration-300 group-hover:-translate-y-2"
                  style={{
                    background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
                    border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(196,168,130,0.18)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <h4
                    className="mb-2"
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: darkMode ? "#E8DCCF" : "#333",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.72rem",
                      color: darkMode ? "#888" : "#888",
                      lineHeight: 1.5,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5"
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: `${step.color}25`,
                    border: `2px solid ${step.color}`,
                  }}
                >
                  {step.emoji}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="w-0.5 flex-1 mt-2"
                    style={{ background: `${step.color}30`, minHeight: "40px" }}
                  />
                )}
              </div>
              <div
                className="flex-1 p-5 rounded-2xl mb-2"
                style={{
                  background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
                  border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(196,168,130,0.18)",
                }}
              >
                <span
                  className="block mb-1"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "0.7rem",
                    color: step.color,
                    fontWeight: 600,
                  }}
                >
                  Step {i + 1}
                </span>
                <h4
                  className="mb-1"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: darkMode ? "#fff" : "#111",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "0.8rem",
                    color: darkMode ? "#888" : "#777",
                    lineHeight: 1.6,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
