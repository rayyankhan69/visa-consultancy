import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Phone, Video, CheckCircle, Sparkles, Languages, GraduationCap, User, Mail, PenLine, Image as ImageIcon } from "lucide-react";

interface BookPageProps {
  darkMode: boolean;
}

type ConsultationType = "voice" | "video";

const options: Array<{
  id: ConsultationType;
  title: string;
  duration: string;
  price: number;
  Icon: typeof Phone;
}> = [
  {
    id: "voice",
    title: "Voice Consultation",
    duration: "30 Minutes",
    price: 10,
    Icon: Phone,
  },
  {
    id: "video",
    title: "Video Consultation",
    duration: "45 Minutes",
    price: 25,
    Icon: Video,
  },
];

export function BookPage({ darkMode }: BookPageProps) {
  const appsScriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "";

  const paymentMethod = import.meta.env.VITE_PAYMENT_METHOD || "NayaPay";
  const paymentName = import.meta.env.VITE_PAYMENT_ACCOUNT_NAME || "Uzair Khan";
  const paymentAccount = import.meta.env.VITE_PAYMENT_ACCOUNT_NUMBER || "03428980297";
  const paymentIban = import.meta.env.VITE_PAYMENT_IBAN || "";

  const paymentNameDisplay = paymentName.toUpperCase();

  const [selected, setSelected] = useState<ConsultationType>("voice");

  const formRef = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [languageMedium, setLanguageMedium] = useState<"English" | "Urdu" | "Pashto">("English");
  const [qualification, setQualification] = useState("");
  const [extraNote, setExtraNote] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const [submitStatus, setSubmitStatus] = useState<
    | { state: "idle" }
    | { state: "submitting" }
    | { state: "success"; message: string }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const copyToClipboard = async (text: string) => {
    const value = text.trim();
    if (!value) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return;
      }
    } catch {
      // Fall through to legacy copy approach
    }

    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const handleCopyKeyDown = (event: React.KeyboardEvent, text: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      void copyToClipboard(text);
    }
  };

  const instructionSteps = useMemo(
    () => [
      "Fill the form with the correct details — we will contact you within 24 hours.",
      "Send the payment using the NayaPay account above.",
      "Upload your payment screenshot in the form.",
      "Click Done to complete your booking request.",
    ],
    []
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    if (type === "voice" || type === "video") {
      setSelected(type);
    }
  }, []);

  const selectedOption = useMemo(
    () => options.find((o) => o.id === selected) || options[0],
    [selected]
  );

  const formDisabled = submitStatus.state === "submitting" || submitStatus.state === "success";

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.onload = () => resolve(String(reader.result || ""));
      reader.readAsDataURL(file);
    });

  const normalizeWhatsappNumber = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "";

    // Keep leading +, strip everything else except digits.
    const cleaned = trimmed
      .replace(/\s+/g, "")
      .replace(/-/g, "")
      .replace(/(?!^)\+/g, "")
      .replace(/[^\d+]/g, "");

    // Already in +92...
    if (cleaned.startsWith("+92")) return cleaned;
    // 92...
    if (cleaned.startsWith("92")) return `+${cleaned}`;
    // 03XXXXXXXXX
    if (cleaned.startsWith("0") && cleaned.length >= 11) return `+92${cleaned.slice(1)}`;
    // 3XXXXXXXXX
    if (cleaned.startsWith("3") && cleaned.length >= 10) return `+92${cleaned}`;

    return trimmed;
  };

  const tryParseJson = (text: string) => {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  };

  const handleDone = async () => {
    if (formDisabled) return;

    if (formRef.current && !formRef.current.reportValidity()) {
      return;
    }

    if (!appsScriptUrl) {
      setSubmitStatus({
        state: "error",
        message: "Missing Google Apps Script URL. Set VITE_GOOGLE_APPS_SCRIPT_URL in .env and restart `npm run dev`.",
      });
      return;
    }

    if (!uploadedImage) {
      setSubmitStatus({ state: "error", message: "Please upload your payment screenshot." });
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    try {
      setSubmitStatus({ state: "submitting" });

      const dataUrl = await fileToBase64(uploadedImage);
      const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1] : dataUrl;

      const payload = {
        consultationType: selected,
        consultationTitle: selectedOption.title,
        consultationPrice: selectedOption.price,
        fullName,
        email,
        whatsapp: normalizeWhatsappNumber(whatsapp),
        languageMedium,
        qualification,
        extraNote,
        imageName: uploadedImage.name,
        imageMimeType: uploadedImage.type || "image/png",
        imageBase64: base64,
      };

      // Google Apps Script Web Apps often trigger CORS/preflight issues when using application/json.
      // Use text/plain to avoid preflight, and fall back to no-cors if the browser blocks reading the response.
      let response: Response | null = null;
      try {
        response = await fetch(appsScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
          redirect: "follow",
        });
      } catch {
        // Fallback: still sends the request, but response is opaque.
        await fetch(appsScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
          redirect: "follow",
        });
      }

      if (response) {
        // Apps Script sometimes returns HTML (login/permission page) when access is not "Anyone".
        const contentType = response.headers.get("content-type") || "";
        const rawText = await response.text();
        const result = tryParseJson(rawText);

        if (!response.ok) {
          const message = (result && (result.error || result.message)) || "Submission failed. Please try again.";
          throw new Error(message);
        }

        if (result && result.ok === false) {
          throw new Error(result.error || "Submission failed. Please try again.");
        }

        if (!result && !contentType.toLowerCase().includes("application/json")) {
          throw new Error(
            "Submission was blocked by Google Apps Script permissions. In Apps Script deployment, set 'Who has access' to 'Anyone' and redeploy."
          );
        }
      } else {
        // Opaque response (no-cors) — request was sent but we can't verify delivery.
        setSubmitStatus({
          state: "success",
          message:
            "Thank you! Your booking request was sent. If you don’t see it in the sheet, set your Apps Script Web App access to 'Anyone' and redeploy.",
        });
      }

      setSubmitStatus({
        state: "success",
        message: "Thank you! Your booking request has been received. We’ll contact you within 24 hours.",
      });

      // Reset the full form after success.
      setFullName("");
      setEmail("");
      setWhatsapp("");
      setLanguageMedium("English");
      setQualification("");
      setExtraNote("");
      setUploadedImage(null);
      // Reset native file input reliably by re-mounting it.
      setFileInputKey((k) => k + 1);

      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      setSubmitStatus({
        state: "error",
        message: String(err instanceof Error ? err.message : err),
      });

      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
            Booking
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
            Book Your Consultation
          </h1>
          <p
            className="mt-4 max-w-xl mx-auto"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "0.95rem",
              color: darkMode ? "#aaa" : "#777",
              lineHeight: 1.7,
            }}
          >
            Choose your preferred consultation type and complete the booking process.
          </p>
        </motion.div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {options.map((opt, i) => {
            const isSelected = opt.id === selected;
            const accent = "#C4A882";
            const gradient = opt.id === "video"
              ? "linear-gradient(135deg, #C4A882, #8B6B4A)"
              : "linear-gradient(135deg, #D4B896, #C4A882)";

            return (
              <motion.button
                key={opt.id}
                type="button"
                disabled={formDisabled}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(opt.id)}
                className="text-left rounded-3xl overflow-hidden border transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "Sora, sans-serif",
                  background: darkMode ? "#1a1a1a" : "#fff",
                  borderColor: isSelected
                    ? darkMode
                      ? "rgba(212,184,150,0.45)"
                      : "rgba(196,168,130,0.55)"
                    : darkMode
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(196,168,130,0.18)",
                  boxShadow: isSelected
                    ? darkMode
                      ? "0 10px 40px rgba(0,0,0,0.45)"
                      : "0 10px 40px rgba(196,168,130,0.18)"
                    : "none",
                }}
              >
                <div className="h-1.5 w-full" style={{ background: isSelected ? gradient : "rgba(196,168,130,0.18)" }} />
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: `${accent}18` }}
                      >
                        <opt.Icon className="w-5 h-5" style={{ color: accent }} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "1.02rem",
                            fontWeight: 800,
                            color: darkMode ? "#fff" : "#111",
                          }}
                        >
                          {opt.title}
                        </div>
                        <div
                          className="mt-1"
                          style={{
                            fontSize: "0.85rem",
                            color: darkMode ? "#aaa" : "#777",
                          }}
                        >
                          {opt.duration}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div
                        className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: gradient,
                          color: "#fff",
                        }}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Selected
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-end justify-between">
                    <div
                      className="text-sm"
                      style={{ color: darkMode ? "#bbb" : "#666" }}
                    >
                      Price
                    </div>
                    <div
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: 900,
                        color: darkMode ? "#E8DCCF" : "#8B6B4A",
                      }}
                    >
                      ${opt.price}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* User Details Form */}
        <form
          ref={formRef}
          className="rounded-3xl p-7 mb-10"
          style={{
            background: darkMode ? "#1a1a1a" : "#fff",
            border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(196,168,130,0.18)",
            boxShadow: darkMode ? "0 10px 40px rgba(0,0,0,0.35)" : "0 10px 40px rgba(196,168,130,0.12)",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            void handleDone();
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
            Your Details
          </div>

          {submitStatus.state === "success" ? (
            <div
              className="mt-4 rounded-2xl px-4 py-3"
              style={{
                background: darkMode ? "rgba(212,184,150,0.12)" : "rgba(212,184,150,0.25)",
                border: darkMode ? "1px solid rgba(212,184,150,0.25)" : "1px solid rgba(196,168,130,0.3)",
                fontFamily: "Sora, sans-serif",
                color: darkMode ? "#E8DCCF" : "#8B6B4A",
                fontSize: "0.9rem",
                lineHeight: 1.6,
              }}
            >
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-5 h-5" style={{ color: darkMode ? "#D4B896" : "#8B6B4A", marginTop: 1 }} />
                <div>{submitStatus.message}</div>
              </div>
            </div>
          ) : null}

          {submitStatus.state === "submitting" ? (
            <div
              className="mt-4 rounded-2xl px-4 py-3"
              style={{
                background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(250,247,244,0.85)",
                border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(196,168,130,0.18)",
                fontFamily: "Sora, sans-serif",
                color: darkMode ? "#ddd" : "#444",
                fontSize: "0.9rem",
                lineHeight: 1.6,
              }}
            >
              Submitting…
            </div>
          ) : null}

          {submitStatus.state === "error" ? (
            <div
              className="mt-4 rounded-2xl px-4 py-3"
              style={{
                background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(250,247,244,0.85)",
                border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(196,168,130,0.18)",
                fontFamily: "Sora, sans-serif",
                color: darkMode ? "#ddd" : "#444",
                fontSize: "0.9rem",
                lineHeight: 1.6,
              }}
            >
              {submitStatus.message}
            </div>
          ) : null}

          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullName"
                style={{ fontFamily: "Sora, sans-serif", fontSize: "0.85rem", color: darkMode ? "#bbb" : "#666" }}
              >
                Full Name
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <User className="w-4.5 h-4.5" style={{ color: darkMode ? "#bbb" : "#666" }} />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (submitStatus.state === "error") setSubmitStatus({ state: "idle" });
                  }}
                  className="w-full rounded-2xl pr-4 py-3 pl-11 text-sm outline-none"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                    border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
                    color: darkMode ? "#fff" : "#111",
                    height: "48px",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                style={{ fontFamily: "Sora, sans-serif", fontSize: "0.85rem", color: darkMode ? "#bbb" : "#666" }}
              >
                Email
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Mail className="w-4.5 h-4.5" style={{ color: darkMode ? "#bbb" : "#666" }} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (submitStatus.state === "error") setSubmitStatus({ state: "idle" });
                  }}
                  className="w-full rounded-2xl pr-4 py-3 pl-11 text-sm outline-none"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                    border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
                    color: darkMode ? "#fff" : "#111",
                    height: "48px",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="whatsapp"
                style={{ fontFamily: "Sora, sans-serif", fontSize: "0.85rem", color: darkMode ? "#bbb" : "#666" }}
              >
                WhatsApp Number
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Phone className="w-4.5 h-4.5" style={{ color: darkMode ? "#bbb" : "#666" }} />
                </div>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  pattern="^(?:\\+?92[\\s-]*|0)?3\\d{2}[\\s-]*\\d{7}$"
                  title="Enter a valid WhatsApp number (e.g., 3101234567, 03101234567, +923101234567, or +92 310 1234567)"
                  value={whatsapp}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setWhatsapp(e.target.value);
                    if (submitStatus.state === "error") setSubmitStatus({ state: "idle" });
                  }}
                  placeholder="e.g., +92 3XX XXXXXXX"
                  className="w-full rounded-2xl pr-4 py-3 pl-11 text-sm outline-none"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                    border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
                    color: darkMode ? "#fff" : "#111",
                    height: "48px",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="languageMedium"
                style={{ fontFamily: "Sora, sans-serif", fontSize: "0.85rem", color: darkMode ? "#bbb" : "#666" }}
              >
                Language Medium
              </label>
              <div className="relative mt-2">
                <div
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                >
                  <Languages className="w-4.5 h-4.5" style={{ color: darkMode ? "#bbb" : "#666" }} />
                </div>
                <select
                  id="languageMedium"
                  name="languageMedium"
                  required
                  value={languageMedium}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setLanguageMedium(e.target.value as "English" | "Urdu" | "Pashto");
                    if (submitStatus.state === "error") setSubmitStatus({ state: "idle" });
                  }}
                  className="w-full rounded-2xl pr-4 py-3 pl-11 text-sm outline-none appearance-none"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                    border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
                    color: darkMode ? "#fff" : "#111",
                    height: "48px",
                  }}
                >
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Pashto">Pashto</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="qualification"
                style={{ fontFamily: "Sora, sans-serif", fontSize: "0.85rem", color: darkMode ? "#bbb" : "#666" }}
              >
                Qualification
              </label>
              <div className="relative mt-2">
                <div
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                >
                  <GraduationCap className="w-4.5 h-4.5" style={{ color: darkMode ? "#bbb" : "#666" }} />
                </div>
                <select
                  id="qualification"
                  name="qualification"
                  required
                  value={qualification}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setQualification(e.target.value);
                    if (submitStatus.state === "error") setSubmitStatus({ state: "idle" });
                  }}
                  className="w-full rounded-2xl pr-4 py-3 pl-11 text-sm outline-none appearance-none"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                    border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
                    color: darkMode ? "#fff" : "#111",
                    height: "48px",
                  }}
                >
                  <option value="" disabled>
                    Select qualification
                  </option>
                  <option value="Matric">Matric</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Bachelors">Bachelors</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="extraNote"
                style={{ fontFamily: "Sora, sans-serif", fontSize: "0.85rem", color: darkMode ? "#bbb" : "#666" }}
              >
                Extra Note (Optional)
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-4" aria-hidden="true">
                  <PenLine className="w-4.5 h-4.5" style={{ color: darkMode ? "#bbb" : "#666" }} />
                </div>
                <textarea
                  id="extraNote"
                  name="extraNote"
                  value={extraNote}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setExtraNote(e.target.value);
                    if (submitStatus.state === "error") setSubmitStatus({ state: "idle" });
                  }}
                  className="w-full rounded-2xl pr-4 py-3 pl-11 text-sm outline-none min-h-[110px]"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
                    border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
                    color: darkMode ? "#fff" : "#111",
                    resize: "vertical",
                  }}
                />
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
              className="flex items-center gap-2"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 800,
                color: darkMode ? "#E8DCCF" : "#8B6B4A",
                marginBottom: 10,
              }}
            >
              <ImageIcon className="w-4.5 h-4.5" style={{ color: darkMode ? "#D4B896" : "#8B6B4A" }} />
              Upload Payment Screenshot
            </div>

            <input
              key={fileInputKey}
              ref={fileInputRef}
              type="file"
              accept="image/*"
              required
              disabled={formDisabled}
              onChange={(e) => {
                setUploadedImage(e.target.files?.[0] || null);
                if (submitStatus.state === "error") setSubmitStatus({ state: "idle" });
              }}
              className="block w-full text-sm"
              style={{
                fontFamily: "Sora, sans-serif",
                color: darkMode ? "#bbb" : "#666",
              }}
            />

            {uploadedImage ? (
              <div
                className="mt-3"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.85rem",
                  color: darkMode ? "#aaa" : "#777",
                }}
              >
                Selected: <span style={{ fontWeight: 800, color: darkMode ? "#fff" : "#111" }}>{uploadedImage.name}</span>
              </div>
            ) : null}

            <div
              className="mt-3"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "0.82rem",
                color: darkMode ? "#888" : "#777",
                lineHeight: 1.6,
              }}
            >
              Please upload a clear screenshot so we can verify your payment quickly.
            </div>
          </div>
        </form>

        {/* Summary + Payment */}
        <div className="grid lg:grid-cols-2 gap-6">
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
              Price Summary
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", color: darkMode ? "#aaa" : "#777" }}>
                  Selected Service
                </span>
                <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", fontWeight: 700, color: darkMode ? "#fff" : "#111" }}>
                  {selectedOption.title}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", color: darkMode ? "#aaa" : "#777" }}>
                  Total Price
                </span>
                <span style={{ fontFamily: "Sora, sans-serif", fontSize: "1.1rem", fontWeight: 900, color: darkMode ? "#E8DCCF" : "#8B6B4A" }}>
                  ${selectedOption.price}
                </span>
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
                }}
              >
                Payment Method
              </div>
              <div className="space-y-2" style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem" }}>
                <div className="flex items-center justify-between">
                  <span style={{ color: darkMode ? "#aaa" : "#777" }}>Method</span>
                  <span style={{ color: darkMode ? "#fff" : "#111", fontWeight: 700 }}>{paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: darkMode ? "#aaa" : "#777" }}>Name</span>
                  <span style={{ color: darkMode ? "#fff" : "#111", fontWeight: 700 }}>{paymentNameDisplay}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: darkMode ? "#aaa" : "#777" }}>Phone / Account</span>
                  <span
                    role="button"
                    tabIndex={0}
                    title="Click to copy"
                    aria-label="Copy phone or account number"
                    onClick={() => void copyToClipboard(paymentAccount)}
                    onKeyDown={(e) => handleCopyKeyDown(e, paymentAccount)}
                    style={{
                      color: darkMode ? "#fff" : "#111",
                      fontWeight: 700,
                      cursor: "pointer",
                      textDecoration: "underline",
                      textDecorationColor: "rgba(196,168,130,0.45)",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {paymentAccount}
                  </span>
                </div>
                {paymentIban ? (
                  <div className="flex items-center justify-between">
                    <span style={{ color: darkMode ? "#aaa" : "#777" }}>IBAN</span>
                    <span
                      role="button"
                      tabIndex={0}
                      title="Click to copy"
                      aria-label="Copy IBAN"
                      onClick={() => void copyToClipboard(paymentIban)}
                      onKeyDown={(e) => handleCopyKeyDown(e, paymentIban)}
                      style={{
                        color: darkMode ? "#fff" : "#111",
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                        textDecorationColor: "rgba(196,168,130,0.45)",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      {paymentIban}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

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
                Payment Instructions
              </div>

              <ol className="mt-5 space-y-3">
                {instructionSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: darkMode ? "rgba(212,184,150,0.15)" : "rgba(212,184,150,0.25)",
                        color: darkMode ? "#D4B896" : "#8B6B4A",
                        fontFamily: "Sora, sans-serif",
                        border: "1px solid rgba(196,168,130,0.25)",
                      }}
                    >
                      {index + 1}
                    </div>
                    <span
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "0.9rem",
                        color: darkMode ? "#aaa" : "#777",
                        lineHeight: 1.7,
                      }}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <button
              type="button"
              onClick={handleDone}
              disabled={formDisabled}
              className="flex items-center justify-center gap-3 w-full px-8 py-5 rounded-3xl text-sm font-semibold transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                fontFamily: "Sora, sans-serif",
                background: "linear-gradient(135deg, #D4B896, #C4A882)",
                color: "#fff",
                boxShadow: darkMode ? "0 14px 45px rgba(0,0,0,0.45)" : "0 14px 45px rgba(196,168,130,0.25)",
              }}
            >
              <CheckCircle className="w-5 h-5" />
              {submitStatus.state === "submitting" ? "Submitting..." : submitStatus.state === "success" ? "Submitted" : "Done"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
