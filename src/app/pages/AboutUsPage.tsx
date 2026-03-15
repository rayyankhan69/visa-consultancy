import { motion } from "motion/react";

interface AboutUsPageProps {
  darkMode: boolean;
}

type AboutCard = {
  title: string;
  body: string[];
};

const aboutCards: AboutCard[] = [
  {
    title: "Who We Are",
    body: [
      "At Abroadaoo, we believe that every successful study abroad journey begins with the right guidance.",
      "That’s why our process starts with a complete assessment of your academic profile, qualifications, and future goals.",
    ],
  },
  {
    title: "Profile Assessment & University Selection",
    body: [
      "By carefully analyzing your background, we identify the universities and courses that best match your profile, ensuring that your chances of admission are strong and aligned with your career ambitions.",
    ],
  },
  {
    title: "End-to-End Admission Support",
    body: [
      "Once the right options are selected, our team assists you through the entire admission process.",
      "From preparing and submitting university applications to organizing required documentation, we make sure every step is handled professionally and efficiently.",
    ],
  },
  {
    title: "IELTS Preparation (If Required)",
    body: [
      "If your chosen university requires IELTS, we’ve got you covered.",
      "Abroadaoo provides IELTS preparation tailored to the specific score and module you need.",
      "Our preparation includes proven strategies, practice sessions, and expert guidance to help you perform confidently and achieve your target band score.",
    ],
  },
  {
    title: "Visa, Accommodation & Pre-Departure",
    body: [
      "Our support doesn’t stop at admission.",
      "We guide you through accommodation applications, embassy requirements, visa documentation, and pre-departure preparation.",
      "From the moment you start your application until the day you travel, we stay by your side to ensure a smooth and stress-free experience.",
    ],
  },
  {
    title: "Our Goal",
    body: [
      "At Abroadaoo, our goal is simple: to manage your study abroad journey from A to Z while you focus on building your future.",
      "Abroadaoo — From Here to Germany.",
    ],
  },
];

export function AboutUsPage({ darkMode }: AboutUsPageProps) {
  return (
    <section
      className="min-h-screen px-6 py-24"
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #141210 0%, #111 100%)"
          : "linear-gradient(135deg, #FAF7F4 0%, #F0E8DF 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
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
            About
          </span>
          <h1
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: 800,
              color: darkMode ? "#fff" : "#111",
              lineHeight: 1.15,
            }}
          >
            About Us
          </h1>
          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "0.95rem",
              color: darkMode ? "#aaa" : "#777",
              lineHeight: 1.7,
            }}
          >
            Abroadaoo helps you plan, apply, prepare, and move forward—step by step.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-6">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.03 }}
              className="rounded-3xl p-7"
              style={{
                background: darkMode ? "#1a1a1a" : "#fff",
                border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(196,168,130,0.18)",
                boxShadow: darkMode ? "0 10px 40px rgba(0,0,0,0.35)" : "0 10px 40px rgba(196,168,130,0.12)",
              }}
            >
              <h2
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 900,
                  color: darkMode ? "#E8DCCF" : "#8B6B4A",
                  marginBottom: 10,
                }}
              >
                {card.title}
              </h2>
              <div className="space-y-3">
                {card.body.map((p) => (
                  <p
                    key={p}
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.92rem",
                      color: darkMode ? "#aaa" : "#777",
                      lineHeight: 1.75,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
