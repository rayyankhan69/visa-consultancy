import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface TestimonialsSectionProps {
  darkMode: boolean;
}

const testimonials = [
  {
    name: "Ahmed Raza",
    role: "Master's Student, TU Berlin",
    image: "https://images.unsplash.com/photo-1664845780736-88dc71de5be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHN0dWRlbnQlMjBzbWlsaW5nJTIwY29uZmlkZW50fGVufDF8fHx8MTc3MzA4MDUyOXww&ixlib=rb-4.1.0&q=80&w=400",
    quote:
      "AbroadAoo made my Germany application process smooth and stress-free. Their guidance on every step, from university selection to visa application, was invaluable.",
    rating: 5,
    flag: "🇩🇪",
  },
  {
    name: "Fatima Khan",
    role: "Ausbildung – Munich",
    image: "https://images.unsplash.com/photo-1765572144519-1dc1e6e07bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc3R1ZGVudCUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzMwNDMwMDZ8MA&ixlib=rb-4.1.0&q=80&w=400",
    quote:
      "They guided me step by step and helped me secure my Ausbildung opportunity in Germany. I couldn't have done it without AbroadAoo's expert support.",
    rating: 5,
    flag: "🇩🇪",
  },
  {
    name: "Bilal Mahmood",
    role: "IELTS Band 7.5 Achiever",
    image: "https://images.unsplash.com/photo-1762438136374-b2fe754053f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZ3JhZHVhdGlvbiUyMGNhcCUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzcyOTg3Njg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    quote:
      "The IELTS preparation classes helped me achieve my target band score. The instructor's personal feedback and mock tests were exactly what I needed.",
    rating: 5,
    flag: "🎓",
  },
  {
    name: "Usman Ali",
    role: "Bachelor's Student – Hamburg",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    quote:
      "AbroadAoo provided excellent guidance for choosing the right university and preparing my documents. Their support made the entire process easy.",
    rating: 5,
    flag: "🇩🇪",
  },
  {
    name: "Ayesha Noor",
    role: "Master's Student – Frankfurt",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    quote:
      "I was confused about the admission process, but AbroadAoo explained everything clearly. Thanks to them, I successfully received my admission letter.",
    rating: 5,
    flag: "🇩🇪",
  },
  {
    name: "Hamza Tariq",
    role: "Ausbildung – Stuttgart",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400",
    quote:
      "Their team helped me prepare for interviews and applications for Ausbildung programs. I am now working and studying in Germany.",
    rating: 5,
    flag: "🇩🇪",
  },
  {
    name: "Sana Malik",
    role: "IELTS Band 7 Achiever",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    quote:
      "The IELTS preparation sessions were very structured and helpful. The practice tests improved my confidence and helped me score well.",
    rating: 5,
    flag: "🎓",
  },
  {
    name: "Imran Shah",
    role: "Master's Student – Munich",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400",
    quote:
      "From shortlisting universities to visa interview preparation, AbroadAoo supported me throughout the journey. Highly recommended!",
    rating: 5,
    flag: "🇩🇪",
  },
  {
    name: "Zainab Bibi",
    role: "Bachelor's Student – Cologne",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    quote:
      "Their counseling sessions helped me understand my options in Germany. I am grateful for their honest and professional guidance.",
    rating: 5,
    flag: "🇩🇪",
  },
  {
    name: "Hassan Rauf",
    role: "Ausbildung – Berlin",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    quote:
      "AbroadAoo helped me prepare my CV and apply to Ausbildung companies. Their professional support made a huge difference.",
    rating: 5,
    flag: "🇩🇪",
  },
  {
    name: "Maryam Iqbal",
    role: "Master's Student – Leipzig",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    quote:
      "I really appreciated their quick responses and detailed guidance. They made studying abroad feel achievable.",
    rating: 5,
    flag: "🇩🇪",
  },
  {
    name: "Daniyal Khan",
    role: "IELTS Band 7 Achiever",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400",
    quote:
      "The IELTS instructors were very supportive and gave practical tips that helped me improve my speaking and writing scores.",
    rating: 5,
    flag: "🎓",
  },
  {
    name: "Noor Ul Amin",
    role: "Master's Student – Bonn",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    quote:
      "AbroadAoo handled my application process professionally. Their experience with German universities is impressive.",
    rating: 5,
    flag: "🇩🇪",
  },
  {
    name: "Hira Saeed",
    role: "Ausbildung – Düsseldorf",
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400",
    quote:
      "I highly recommend AbroadAoo to anyone looking for Ausbildung opportunities in Germany. Their guidance is genuine and effective.",
    rating: 5,
    flag: "🇩🇪",
  },
  {
    name: "Salman Ahmad",
    role: "Bachelor's Student – Bremen",
    image: "https://images.unsplash.com/photo-1502767089025-6572583495b4?auto=format&fit=crop&w=400&q=80",
    quote:
      "The team guided me through document preparation, application submission, and visa steps. Their support was outstanding.",
    rating: 5,
    flag: "🇩🇪",
  },
];

export function TestimonialsSection({ darkMode }: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="py-24 px-6"
      style={{ background: darkMode ? "#111" : "#fff" }}
    >
      <div className="max-w-4xl mx-auto">
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
            Student Stories
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
            What Our Students Say
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-8 md:p-12 rounded-3xl"
              style={{
                background: darkMode ? "#1a1a1a" : "#FAF7F4",
                border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(196,168,130,0.2)",
                boxShadow: darkMode
                  ? "0 20px 60px rgba(0,0,0,0.4)"
                  : "0 20px 60px rgba(196,168,130,0.12)",
              }}
            >
              {/* Quote icon */}
              <Quote
                className="w-10 h-10 mb-6"
                style={{ color: darkMode ? "rgba(212,184,150,0.3)" : "rgba(196,168,130,0.4)" }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current"
                    style={{ color: "#F5C842" }}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p
                className="mb-10"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  color: darkMode ? "#ddd" : "#444",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                }}
              >
                "{testimonials[current].quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-14 h-14 rounded-full object-cover"
                    style={{
                      border: "2px solid rgba(196,168,130,0.4)",
                    }}
                  />
                  <div
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                    style={{ background: darkMode ? "#1a1a1a" : "#FAF7F4" }}
                  >
                    {testimonials[current].flag}
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: darkMode ? "#fff" : "#111",
                    }}
                  >
                    {testimonials[current].name}
                  </p>
                  <p
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.8rem",
                      color: "#C4A882",
                    }}
                  >
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "8px",
                    background: i === current ? "#C4A882" : darkMode ? "rgba(255,255,255,0.15)" : "rgba(196,168,130,0.3)",
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-x-0.5"
                style={{
                  background: darkMode ? "rgba(255,255,255,0.07)" : "rgba(196,168,130,0.12)",
                  border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(196,168,130,0.25)",
                  color: darkMode ? "#E8DCCF" : "#8B6B4A",
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:translate-x-0.5"
                style={{
                  background: "linear-gradient(135deg, #D4B896, #C4A882)",
                  color: "#fff",
                }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
