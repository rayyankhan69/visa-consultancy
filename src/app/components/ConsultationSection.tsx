import { motion } from "motion/react";
import { Phone, Video, Clock, CheckCircle, ArrowRight } from "lucide-react";

interface ConsultationSectionProps {
  darkMode: boolean;
}

const plans = [
  {
    icon: Phone,
    emoji: "📞",
    title: "1-on-1 Consultation Call",
    description: "Private session to discuss study options, eligibility, and visa pathway.",
    duration: "30 minutes",
    price: "$25",
    badge: null,
    cta: "Book Now",
    features: [
      "Study option discussion",
      "Eligibility assessment",
      "Visa pathway overview",
      "Q&A session",
    ],
    gradient: "linear-gradient(135deg, #D4B896, #C4A882)",
    accentColor: "#C4A882",
  },
  {
    icon: Video,
    emoji: "🎥",
    title: "Face-to-Face Video Consultation",
    description: "Personalized video session to plan your Germany study pathway.",
    duration: "45 minutes",
    price: "$40",
    badge: "Most Popular",
    cta: "Schedule Video Call",
    features: [
      "Personalized study plan",
      "University selection help",
      "Document checklist",
      "Detailed visa guidance",
    ],
    gradient: "linear-gradient(135deg, #C4A882, #8B6B4A)",
    accentColor: "#A07850",
  },
];

export function ConsultationSection({ darkMode }: ConsultationSectionProps) {
  return (
    <section
      id="consultation"
      className="py-24 px-6"
      style={{
        background: darkMode ? "#111" : "#fff",
      }}
    >
      <div className="max-w-5xl mx-auto">
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
            Book a Session
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
            Choose Your Consultation
          </h2>
          <p
            className="mt-4 max-w-lg mx-auto"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "0.95rem",
              color: darkMode ? "#888" : "#777",
              lineHeight: 1.7,
            }}
          >
            Get expert guidance tailored to your goals. Book your session today.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="relative flex flex-col rounded-3xl overflow-hidden cursor-pointer group"
              style={{
                background: darkMode ? "#1a1a1a" : "#fff",
                border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(196,168,130,0.2)",
                boxShadow: darkMode
                  ? "0 8px 40px rgba(0,0,0,0.4)"
                  : "0 8px 40px rgba(196,168,130,0.15)",
              }}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div
                  className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: plan.gradient,
                    color: "#fff",
                    fontFamily: "Sora, sans-serif",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Gradient top bar */}
              <div
                className="h-1.5 w-full transition-all duration-300 group-hover:h-2"
                style={{ background: plan.gradient }}
              />

              <div className="p-8 flex flex-col flex-1">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${plan.accentColor}18` }}
                >
                  {plan.emoji}
                </div>

                {/* Title & Description */}
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: darkMode ? "#fff" : "#111",
                    lineHeight: 1.3,
                  }}
                >
                  {plan.title}
                </h3>
                <p
                  className="mb-5"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "0.83rem",
                    color: darkMode ? "#888" : "#777",
                    lineHeight: 1.6,
                  }}
                >
                  {plan.description}
                </p>

                {/* Duration & Price */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" style={{ color: plan.accentColor }} />
                    <span
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "0.8rem",
                        color: darkMode ? "#aaa" : "#888",
                      }}
                    >
                      {plan.duration}
                    </span>
                  </div>
                  <div
                    className="px-3 py-1 rounded-lg text-sm font-bold"
                    style={{
                      background: `${plan.accentColor}18`,
                      color: plan.accentColor,
                      fontFamily: "Sora, sans-serif",
                    }}
                  >
                    {plan.price}
                  </div>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-2.5 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: plan.accentColor }} />
                      <span
                        style={{
                          fontFamily: "Sora, sans-serif",
                          fontSize: "0.82rem",
                          color: darkMode ? "#aaa" : "#666",
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className="group/btn flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 w-full justify-center hover:shadow-lg"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    background: plan.gradient,
                    color: "#fff",
                  }}
                >
                  {plan.cta}
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
