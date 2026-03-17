import { motion } from "motion/react";
import umairImage from "../../../assets/images/pictures/umair.png";
import certificateImage from "../../../assets/images/pictures/certificate.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

interface IletsBookingPageProps {
  darkMode: boolean;
}

export function IletsBookingPage({ darkMode }: IletsBookingPageProps) {
  const whatsappUrl = import.meta.env.VITE_CONTACT_WHATSAPP_URL || "https://wa.link/5pb1om";

  const trustTags = [
    "Batch 12",
    "Guarantee: Trusted Support",
    "Certificate Preview",
    "Transparent Pricing",
  ];

  return (
    <section
      className="min-h-screen px-6 py-24"
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #141210 0%, #111 100%)"
          : "linear-gradient(135deg, #FAF7F4 0%, #F0E8DF 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
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
            IELTS Booking
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
            IELTS Booking — Batch 12
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
            Review instructor content and complete your payment to confirm your seat.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {trustTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  fontFamily: "Sora, sans-serif",
                  background: darkMode ? "rgba(212,184,150,0.12)" : "rgba(212,184,150,0.22)",
                  border: "1px solid rgba(196,168,130,0.3)",
                  color: darkMode ? "#E8DCCF" : "#8B6B4A",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Main */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Details + Payment */}
          <div
            className="rounded-3xl p-7"
            style={{
              background: darkMode ? "#1a1a1a" : "#fff",
              border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(196,168,130,0.18)",
              boxShadow: darkMode ? "0 10px 40px rgba(0,0,0,0.35)" : "0 10px 40px rgba(196,168,130,0.12)",
            }}
          >
            <div
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 800,
                color: darkMode ? "#E8DCCF" : "#8B6B4A",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Program Details
            </div>

            <div
              className="mt-5 rounded-2xl p-5"
              style={{
                background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex-shrink-0"
                  style={{
                    background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(196,168,130,0.14)",
                    border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(196,168,130,0.22)",
                  }}
                  aria-label="Instructor image"
                >
                  <img
                    src={umairImage}
                    alt="Umair Khan"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <div
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.8rem",
                      color: darkMode ? "#aaa" : "#777",
                    }}
                  >
                    Instructor
                  </div>
                  <div
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "1.05rem",
                      fontWeight: 900,
                      color: darkMode ? "#fff" : "#111",
                    }}
                  >
                    Umair Khan
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.82rem",
                      color: darkMode ? "#888" : "#888",
                    }}
                  >
                    Certificate included — Master’s in English – United Kingdom • Certified English Instructor – United Kingdom
                  </div>
                </div>
              </div>
            </div>

            <div
              className="mt-6 rounded-2xl p-5"
              style={{
                background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
              }}
            >
              <div
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: darkMode ? "#E8DCCF" : "#8B6B4A",
                  marginBottom: 10,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Description
              </div>
              <p
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.9rem",
                  color: darkMode ? "#aaa" : "#777",
                  lineHeight: 1.75,
                }}
              >
                Umair Khan holds both a Bachelor’s degree and a Master’s degree in English from Manchester Metropolitan University, UK. He is an IELTS Band 8 achiever and an experienced ESL (English as a Second Language) instructor with a strong background in teaching international students. Through his structured teaching methods and practical exam strategies, he has successfully helped many students improve their English proficiency and achieve high scores in international English language tests.
              </p>
            </div>

            <div
              className="mt-4 rounded-2xl p-5"
              style={{
                background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
              }}
            >
              <div
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: darkMode ? "#E8DCCF" : "#8B6B4A",
                  marginBottom: 10,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Courses We Offer
              </div>
              <div
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.9rem",
                  color: darkMode ? "#aaa" : "#777",
                  lineHeight: 1.75,
                }}
              >
                <div style={{ fontWeight: 800, color: darkMode ? "#fff" : "#111" }}>
                  Courses & Test Preparation Offered
                </div>
                <ul className="mt-3 space-y-2 list-disc pl-5">
                  <li>International English Language Testing System (IELTS) – Academic & General Training</li>
                  <li>Pearson Test of English (PTE)</li>
                  <li>Test of English as a Foreign Language (TOEFL)</li>
                  <li>Cambridge International GCSE (IGCSE) English</li>
                </ul>
              </div>
            </div>

            <div
              className="mt-4 rounded-2xl p-5"
              style={{
                background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
              }}
            >
              <div
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: darkMode ? "#E8DCCF" : "#8B6B4A",
                  marginBottom: 10,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                What You’ll Get
              </div>

              <ul
                className="space-y-2 list-disc pl-5"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.9rem",
                  color: darkMode ? "#aaa" : "#777",
                  lineHeight: 1.75,
                }}
              >
                <li>Structured course plan with clear weekly goals</li>
                <li>Practice materials and exam-focused strategies</li>
                <li>Mock-style practice and improvement guidance</li>
                <li>Support on WhatsApp for questions and updates</li>
              </ul>
            </div>
          </div>

          {/* Media placeholders */}
          <div className="space-y-6">
            <div
              className="rounded-3xl p-7"
              style={{
                background: darkMode ? "#1a1a1a" : "#fff",
                border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(196,168,130,0.18)",
                boxShadow: darkMode ? "0 10px 40px rgba(0,0,0,0.35)" : "0 10px 40px rgba(196,168,130,0.12)",
              }}
            >
              <div
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: darkMode ? "#E8DCCF" : "#8B6B4A",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Having Doubt Watch this!
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.14)",
                      border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
                    }}
                    aria-label="Video placeholder"
                  >
                    <div className="aspect-video" />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{
                background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
              }}
            >
              <div
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: darkMode ? "#E8DCCF" : "#8B6B4A",
                  marginBottom: 10,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Certificate
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="group w-full rounded-2xl overflow-hidden text-left"
                    aria-label="Open certificate full preview"
                    style={{
                      background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(250,247,244,0.75)",
                      border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.16)",
                    }}
                  >
                    <div className="relative aspect-[4/3]">
                      <img
                        src={certificateImage}
                        alt="Certificate"
                        className="absolute inset-0 w-full h-full object-contain p-3"
                        loading="lazy"
                      />

                      {/* Desktop hover overlay + mobile always-visible affordance */}
                      <div
                        className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                        style={{
                          background: darkMode ? "rgba(0,0,0,0.45)" : "rgba(17,17,17,0.35)",
                        }}
                      >
                        <span
                          className="px-4 py-2 rounded-full text-xs font-semibold"
                          style={{
                            fontFamily: "Sora, sans-serif",
                            background: darkMode ? "rgba(212,184,150,0.16)" : "rgba(212,184,150,0.28)",
                            border: "1px solid rgba(196,168,130,0.3)",
                            color: darkMode ? "#E8DCCF" : "#8B6B4A",
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          Full Preview
                        </span>
                      </div>
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent
                  className="sm:max-w-4xl rounded-3xl p-0 border-0 overflow-hidden"
                  style={{
                    background: darkMode ? "#1a1a1a" : "#fff",
                    border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(196,168,130,0.18)",
                    boxShadow: darkMode ? "0 18px 70px rgba(0,0,0,0.65)" : "0 18px 70px rgba(17,17,17,0.16)",
                  }}
                >
                  <div
                    className="p-7"
                    style={{
                      background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(212,184,150,0.14)",
                      borderBottom: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.16)",
                    }}
                  >
                    <DialogHeader className="text-left">
                      <DialogTitle
                        style={{
                          fontFamily: "Sora, sans-serif",
                          fontSize: "1.2rem",
                          fontWeight: 900,
                          color: darkMode ? "#fff" : "#111",
                        }}
                      >
                        Certificate Preview
                      </DialogTitle>
                      <DialogDescription
                        style={{
                          fontFamily: "Sora, sans-serif",
                          color: darkMode ? "#aaa" : "#777",
                          lineHeight: 1.7,
                        }}
                      >
                        Tap or click outside to close.
                      </DialogDescription>
                    </DialogHeader>
                  </div>

                  <div className="p-7">
                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{
                        background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(250,247,244,0.75)",
                        border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.16)",
                      }}
                    >
                      <img
                        src={certificateImage}
                        alt="Certificate full preview"
                        className="w-full h-auto"
                        style={{ maxHeight: "70vh", objectFit: "contain" }}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{
                background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      color: darkMode ? "#E8DCCF" : "#8B6B4A",
                      marginBottom: 8,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    1-on-1 Conversation
                  </div>
                  <p
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.9rem",
                      color: darkMode ? "#aaa" : "#777",
                      lineHeight: 1.7,
                    }}
                  >
                    Want personalized guidance before joining? Book a consultation and we’ll help you pick the right program and next steps.
                  </p>
                </div>

                <button
                  onClick={() => {
                    window.location.href = "/book";
                  }}
                  className="flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-md"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    background: "linear-gradient(135deg, #D4B896, #C4A882)",
                    color: "#fff",
                  }}
                >
                  Book
                </button>
              </div>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{
                background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
              }}
            >
              <div
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: darkMode ? "#E8DCCF" : "#8B6B4A",
                  marginBottom: 10,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Pricing
              </div>

              <div
                className="rounded-2xl p-4"
                style={{
                  background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(250,247,244,0.75)",
                  border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.16)",
                }}
              >
                <ul
                  className="space-y-2"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "0.9rem",
                    color: darkMode ? "#aaa" : "#777",
                    lineHeight: 1.7,
                  }}
                >
                  {[
                    { label: "IELTS (Academic & General)", price: "PKR 29,999" },
                    { label: "PTE", price: "PKR 26,999" },
                    { label: "TOEFL", price: "PKR 29,999" },
                    { label: "IGCSE English", price: "PKR 26,999" },
                  ].map((course) => (
                    <li key={course.label} className="flex items-start justify-between gap-4">
                      <span>{course.label}</span>
                      <span style={{ fontWeight: 900, color: darkMode ? "#fff" : "#111" }}>{course.price}</span>
                    </li>
                  ))}
                  <li
                    className="pt-3 mt-3 flex items-start justify-between gap-4"
                    style={{ borderTop: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.16)" }}
                  >
                    <span>Crash Course (1 week)</span>
                    <span style={{ fontWeight: 900, color: darkMode ? "#E8DCCF" : "#8B6B4A" }}>PKR 9,999</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Join button */}
        <div className="mt-8">
          <a
            href="/ilets-form"
            className="flex items-center justify-center w-full px-8 py-5 rounded-3xl text-sm font-semibold transition-all duration-300 hover:-translate-y-1"
            style={{
              fontFamily: "Sora, sans-serif",
              background: "linear-gradient(135deg, #D4B896, #C4A882)",
              color: "#fff",
              boxShadow: darkMode ? "0 14px 45px rgba(0,0,0,0.45)" : "0 14px 45px rgba(196,168,130,0.25)",
            }}
          >
            Join IELTS Batch 12
          </a>

          <div
            className="mt-3 text-center"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "0.85rem",
              color: darkMode ? "#888" : "#888",
              lineHeight: 1.6,
            }}
          >
            Questions? Message us on WhatsApp — fast replies, transparent guidance, and real support from start to finish.
          </div>
        </div>
      </div>
    </section>
  );
}
