import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

interface FAQSectionProps {
  darkMode: boolean;
}

const faqs = [
  {
    question: "Do I need German language for studying in Germany?",
    answer:
      "Not necessarily. Many German universities offer programs entirely in English, especially at the Master's level. However, for undergraduate studies or Ausbildung programs taught in German, you will need at least a B2 level German proficiency. We help you identify the right program based on your language skills.",
  },
  {
    question: "What is a blocked account?",
    answer:
      "A blocked account (Sperrkonto) is a special bank account required for your German student visa. It shows you have enough funds to support yourself in Germany. Currently, you need to deposit €11,208 (€934/month for 12 months). Growth Bridge guides you through opening one with our trusted partners.",
  },
  {
    question: "Can I apply for Ausbildung from Pakistan?",
    answer:
      "Yes! Pakistani students can apply for Ausbildung (vocational training) directly from Pakistan. You'll need a minimum education qualification, basic German language skills (usually A2-B1), and a training contract from a German company. The best part is that no blocked account is required if you're applying directly. Our team helps you find and apply for Ausbildung positions.",
  },
  {
    question: "How long does the visa process take?",
    answer:
      "The German student visa process typically takes 3 to 6 months after submitting your complete application. This includes APS certification (which can take 4-6 weeks), the visa appointment at the German Embassy in Islamabad, and processing time. We recommend starting the process at least 6-8 months before your intended start date.",
  },
  {
    question: "What is APS and do I need it?",
    answer:
      "APS (Academic Evaluation Centre) certificate is a mandatory requirement for Pakistani students applying to German universities. It verifies your academic documents. The process takes around 4-6 weeks and costs approximately €120. Growth Bridge will guide you through every step of the APS process.",
  },
];

export function FAQSection({ darkMode }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 px-6"
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #141210 0%, #111 100%)"
          : "linear-gradient(135deg, #FAF7F4 0%, #F0E8DF 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
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
            Common Questions
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
            Frequently Asked Questions
          </h2>
          <p
            className="mt-4"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "0.95rem",
              color: darkMode ? "#888" : "#777",
              lineHeight: 1.7,
            }}
          >
            Got questions? We have answers.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: darkMode ? "#1a1a1a" : "#fff",
                border:
                  openIndex === i
                    ? darkMode
                      ? "1px solid rgba(212,184,150,0.35)"
                      : "1px solid rgba(196,168,130,0.45)"
                    : darkMode
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "1px solid rgba(196,168,130,0.18)",
                boxShadow:
                  openIndex === i
                    ? darkMode
                      ? "0 4px 20px rgba(212,184,150,0.1)"
                      : "0 4px 20px rgba(196,168,130,0.12)"
                    : "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left transition-all duration-200"
                style={{ cursor: "pointer" }}
              >
                <span
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    color: openIndex === i ? "#C4A882" : darkMode ? "#E8DCCF" : "#333",
                    flex: 1,
                    paddingRight: "1rem",
                    lineHeight: 1.5,
                  }}
                >
                  {faq.question}
                </span>
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background:
                      openIndex === i
                        ? "linear-gradient(135deg, #D4B896, #C4A882)"
                        : darkMode
                        ? "rgba(255,255,255,0.07)"
                        : "rgba(196,168,130,0.12)",
                    color: openIndex === i ? "#fff" : darkMode ? "#888" : "#999",
                    transform: openIndex === i ? "rotate(0deg)" : "rotate(0deg)",
                  }}
                >
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="px-6 pb-6"
                      style={{
                        borderTop: darkMode
                          ? "1px solid rgba(255,255,255,0.06)"
                          : "1px solid rgba(196,168,130,0.15)",
                        paddingTop: "16px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Sora, sans-serif",
                          fontSize: "0.85rem",
                          color: darkMode ? "#aaa" : "#666",
                          lineHeight: 1.75,
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
