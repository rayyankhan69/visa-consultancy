import { motion } from "motion/react";
import { Award, BookOpen, Mic, PenLine, Headphones, Target, MessageSquare, ClipboardCheck, ArrowRight } from "lucide-react";

interface IELTSSectionProps {
  darkMode: boolean;
}

const weeks = [
  { week: "Week 1", topic: "Listening", icon: Headphones, color: "#C4A882" },
  { week: "Week 2", topic: "Reading", icon: BookOpen, color: "#A07850" },
  { week: "Week 3", topic: "Writing", icon: PenLine, color: "#8B6B4A" },
  { week: "Week 4", topic: "Speaking", icon: Mic, color: "#C4A882" },
];

const features = [
  { icon: ClipboardCheck, label: "Mock Tests", desc: "Full-length practice exams" },
  { icon: MessageSquare, label: "Personal Feedback", desc: "Detailed analysis per task" },
  { icon: Target, label: "Target Band 6/7/8+", desc: "Goal-oriented preparation" },
];

export function IELTSSection({ darkMode }: IELTSSectionProps) {
  return (
    <section
      id="ielts"
      className="py-24 px-6"
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #141210 0%, #111 100%)"
          : "linear-gradient(135deg, #FAF7F4 0%, #F0E8DF 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
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
              IELTS Preparation
            </span>

            <h2
              className="mb-6"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: darkMode ? "#fff" : "#111",
                lineHeight: 1.2,
              }}
            >
              IELTS Preparation
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #C4A882, #A07850)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Program
              </span>
            </h2>

            {/* Instructor credentials */}
            <div
              className="p-5 rounded-2xl mb-8"
              style={{
                background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
                border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(196,168,130,0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                  style={{ background: "rgba(196,168,130,0.2)" }}
                >
                  👨‍🏫
                </div>
                <div>
                  <p
                    className="font-semibold"
                    style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", color: darkMode ? "#fff" : "#111" }}
                  >
                    Expert Instructor
                  </p>
                  <p
                    style={{ fontFamily: "Sora, sans-serif", fontSize: "0.78rem", color: "#C4A882" }}
                  >
                    Band 8 Certified IELTS Trainer
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Award, text: "IELTS Band 8 Overall" },
                  { icon: BookOpen, text: "Master's in English — MMU UK" },
                  { icon: Award, text: "Bachelor's in English" },
                  { icon: Target, text: "7 Years Teaching Experience" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-2">
                    <Icon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#C4A882" }} />
                    <span
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "0.75rem",
                        color: darkMode ? "#aaa" : "#666",
                        lineHeight: 1.4,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {features.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="p-4 rounded-2xl text-center"
                  style={{
                    background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
                    border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.18)",
                  }}
                >
                  <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: "#C4A882" }} />
                  <p
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: darkMode ? "#E8DCCF" : "#8B6B4A",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.65rem",
                      color: darkMode ? "#888" : "#999",
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="group flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#C4A882]/30 hover:-translate-y-0.5"
              style={{
                fontFamily: "Sora, sans-serif",
                background: "linear-gradient(135deg, #D4B896, #C4A882)",
                color: "#fff",
              }}
            >
              Join IELTS Program
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              className="p-8 rounded-3xl"
              style={{
                background: darkMode ? "#1a1a1a" : "#fff",
                border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(196,168,130,0.2)",
                boxShadow: darkMode ? "0 20px 60px rgba(0,0,0,0.3)" : "0 20px 60px rgba(196,168,130,0.12)",
              }}
            >
              <h3
                className="mb-8"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: darkMode ? "#fff" : "#111",
                }}
              >
                📅 4-Week Course Structure
              </h3>

              <div className="space-y-4">
                {weeks.map(({ week, topic, icon: Icon, color }, i) => (
                  <motion.div
                    key={week}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    className="flex items-center gap-5 p-4 rounded-2xl transition-all duration-300 hover:-translate-x-1"
                    style={{
                      background: darkMode ? "rgba(255,255,255,0.04)" : `rgba(196,168,130,0.07)`,
                      border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.15)",
                    }}
                  >
                    {/* Step number */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${color}33, ${color}55)`,
                        border: `2px solid ${color}`,
                        color: color,
                        fontFamily: "Sora, sans-serif",
                      }}
                    >
                      {i + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p
                        style={{
                          fontFamily: "Sora, sans-serif",
                          fontSize: "0.78rem",
                          color: darkMode ? "#888" : "#aaa",
                        }}
                      >
                        {week}
                      </p>
                      <p
                        style={{
                          fontFamily: "Sora, sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          color: darkMode ? "#E8DCCF" : "#333",
                        }}
                      >
                        {topic}
                      </p>
                    </div>

                    {/* Icon */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Progress bar decoration */}
              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.75rem",
                      color: darkMode ? "#888" : "#999",
                    }}
                  >
                    Course Progress
                  </span>
                  <span
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.75rem",
                      color: "#C4A882",
                    }}
                  >
                    4 Weeks
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: darkMode ? "rgba(255,255,255,0.08)" : "rgba(196,168,130,0.15)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #D4B896, #C4A882)" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
