import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { motion } from "motion/react";
import {
  AlertTriangle,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  ClipboardList,
  Flag,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Megaphone,
  Image as ImageIcon,
  PenLine,
  Phone,
  Plane,
  School,
  User,
  Users,
} from "lucide-react";

interface IletsFormPageProps {
  darkMode: boolean;
}

type SubmitStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

type TestPlanned = "IELTS" | "PTE" | "TOEFL" | "Other";

type EnglishLevel = "Beginner" | "Intermediate" | "Advanced";

type DifficultSkill = "Listening" | "Reading" | "Writing" | "Speaking";

type HeardAbout = "Social Media" | "Friend/Referral" | "Website" | "Other";

type CurrentStatus = "Student" | "Employed" | "Other";

type Gender = "Male" | "Female" | "Other";

type ProgramToJoin = "IELTS" | "PTE" | "TOEFL" | "IGCSE English" | "Crash Course" | "Other";
const PK_PHONE_PATTERN = "^(?:\\+?92[\\s-]*|0)?3\\d{2}[\\s-]*\\d{7}$";
const PK_PHONE_TITLE = "Enter a valid WhatsApp/contact number (e.g., 3101234567, 03101234567, +923101234567, or +92 310 1234567)";
const YEAR_PATTERN = "^\\d{4}$";
const YEAR_TITLE = "Enter a 4-digit year (e.g., 2023)";

const inputClass = "w-full rounded-2xl pr-4 py-3 pl-11 text-sm outline-none";
const selectClass = `${inputClass} appearance-none`;

function iconColor(darkMode: boolean) {
  return darkMode ? "#bbb" : "#666";
}

function fieldStyle(darkMode: boolean) {
  return {
    fontFamily: "Sora, sans-serif",
    background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(212,184,150,0.18)",
    border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.2)",
    color: darkMode ? "#fff" : "#111",
    height: "48px",
  } as const;
}

function labelStyle(darkMode: boolean) {
  return {
    fontFamily: "Sora, sans-serif",
    fontSize: "0.85rem",
    color: darkMode ? "#bbb" : "#666",
  } as const;
}

function sectionTitleStyle(darkMode: boolean) {
  return {
    fontFamily: "Sora, sans-serif",
    fontSize: "0.85rem",
    fontWeight: 800,
    color: darkMode ? "#E8DCCF" : "#8B6B4A",
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
  };
}

function tryParseJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function IletsFormPage({ darkMode }: IletsFormPageProps) {
  const appsScriptUrl =
    import.meta.env.VITE_IELTS_GOOGLE_APPS_SCRIPT_URL || import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "";

  const paymentMethod = import.meta.env.VITE_PAYMENT_METHOD || "NayaPay";
  const paymentName = import.meta.env.VITE_PAYMENT_ACCOUNT_NAME || "Uzair Khan";
  const paymentAccount = import.meta.env.VITE_PAYMENT_ACCOUNT_NUMBER || "03428980297";
  const paymentIban = import.meta.env.VITE_PAYMENT_IBAN || "";
  const paymentNameDisplay = String(paymentName).toUpperCase();

  const formRef = useRef<HTMLFormElement | null>(null);
  const submitLockRef = useRef(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };
  }, []);

  // 1) Personal Information
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // 2) Educational Background
  const [highestQualification, setHighestQualification] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [yearOfCompletion, setYearOfCompletion] = useState("");
  const [currentStatus, setCurrentStatus] = useState<CurrentStatus | "">("");

  // Program + Test Info
  const [programToJoin, setProgramToJoin] = useState<ProgramToJoin>("IELTS");
  const [testPlanned, setTestPlanned] = useState<TestPlanned>("IELTS");
  const [otherTestName, setOtherTestName] = useState("");
  const [ieltsType, setIeltsType] = useState<"Academic" | "General Training" | "">("");

  // 4) Previous Test History
  const [takenIeltsBefore, setTakenIeltsBefore] = useState<"Yes" | "No">("No");
  const [ieltsTestDate, setIeltsTestDate] = useState("");
  const [ieltsOverall, setIeltsOverall] = useState("");
  const [ieltsListening, setIeltsListening] = useState("");
  const [ieltsReading, setIeltsReading] = useState("");
  const [ieltsWriting, setIeltsWriting] = useState("");
  const [ieltsSpeaking, setIeltsSpeaking] = useState("");

  const [takenPteBefore, setTakenPteBefore] = useState<"Yes" | "No">("No");
  const [pteTestDate, setPteTestDate] = useState("");
  const [pteOverall, setPteOverall] = useState("");

  const [takenToeflBefore, setTakenToeflBefore] = useState<"Yes" | "No">("No");
  const [toeflTestDate, setToeflTestDate] = useState("");
  const [toeflOverall, setToeflOverall] = useState("");

  // 5) English Proficiency
  const [englishLevel, setEnglishLevel] = useState<EnglishLevel | "">("");
  const [difficultSkill, setDifficultSkill] = useState<DifficultSkill | "">("");

  // 6) Study Preferences
  const classType = "Online";
  const [preferredTiming, setPreferredTiming] = useState("");
  const [heardAboutUs, setHeardAboutUs] = useState<HeardAbout | "">("");
  const [heardAboutOther, setHeardAboutOther] = useState("");

  // 7) Study Abroad Plans
  const [preferredCountry, setPreferredCountry] = useState("");
  const [intendedIntake, setIntendedIntake] = useState("");
  const [preferredCourseField, setPreferredCourseField] = useState("");

  // 8) Additional Information
  const [requireVisaConsultancy, setRequireVisaConsultancy] = useState<"Yes" | "No" | "">("");
  const [concerns, setConcerns] = useState("");

  // 9) Declaration
  const [signatureName, setSignatureName] = useState("");
  const [signatureDate, setSignatureDate] = useState("");

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ state: "idle" });
  const formDisabled = submitStatus.state === "submitting" || submitStatus.state === "success";

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

  const handleCopyKeyDown = (event: KeyboardEvent, text: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      void copyToClipboard(text);
    }
  };

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.onload = () => resolve(String(reader.result || ""));
      reader.readAsDataURL(file);
    });

  const [uploadedPaymentImage, setUploadedPaymentImage] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const programPrice = useMemo(() => {
    const prices: Partial<Record<ProgramToJoin, number>> = {
      IELTS: 29999,
      TOEFL: 29999,
      PTE: 26999,
      "IGCSE English": 26999,
      "Crash Course": 9999,
    };

    return prices[programToJoin] ?? null;
  }, [programToJoin]);

  const programPriceLabel = useMemo(() => {
    if (programPrice == null) return "—";
    return `PKR ${programPrice.toLocaleString("en-PK")}`;
  }, [programPrice]);

  const programOptions = useMemo(
    () => ["IELTS", "PTE", "TOEFL", "IGCSE English", "Crash Course", "Other"] as const,
    []
  );

  const clearIdleOnChange = () => {
    if (submitStatus.state === "error") setSubmitStatus({ state: "idle" });
  };

  const resetFormFields = () => {
    setProgramToJoin("IELTS");
    setTestPlanned("IELTS");
    setOtherTestName("");
    setIeltsType("");

    setFullName("");
    setFatherName("");
    setGender("");
    setDateOfBirth("");
    setContactNumber("");
    setEmail("");
    setCurrentAddress("");
    setCity("");
    setCountry("");

    setHighestQualification("");
    setFieldOfStudy("");
    setInstituteName("");
    setYearOfCompletion("");
    setCurrentStatus("");

    setTakenIeltsBefore("No");
    setIeltsTestDate("");
    setIeltsOverall("");
    setIeltsListening("");
    setIeltsReading("");
    setIeltsWriting("");
    setIeltsSpeaking("");

    setTakenPteBefore("No");
    setPteTestDate("");
    setPteOverall("");

    setTakenToeflBefore("No");
    setToeflTestDate("");
    setToeflOverall("");

    setEnglishLevel("");
    setDifficultSkill("");

    setPreferredTiming("");
    setHeardAboutUs("");
    setHeardAboutOther("");

    setPreferredCountry("");
    setIntendedIntake("");
    setPreferredCourseField("");

    setRequireVisaConsultancy("");
    setConcerns("");

    setSignatureName("");
    setSignatureDate("");

    setUploadedPaymentImage(null);
    setFileInputKey((k) => k + 1);
  };

  const scheduleResetToIdle = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    resetTimerRef.current = setTimeout(() => {
      setSubmitStatus({ state: "idle" });
      submitLockRef.current = false;
      resetTimerRef.current = null;
    }, 5000);
  };

  const handleSuccess = (message: string) => {
    setSubmitStatus({ state: "success", message });
    resetFormFields();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    scheduleResetToIdle();
  };

  const handleSubmit = async () => {
    if (formDisabled || submitLockRef.current) return;
    submitLockRef.current = true;

    if (formRef.current && !formRef.current.reportValidity()) {
      submitLockRef.current = false;
      return;
    }

    if (!appsScriptUrl) {
      setSubmitStatus({
        state: "error",
        message:
          "Missing Google Apps Script URL. Set VITE_IELTS_GOOGLE_APPS_SCRIPT_URL in .env and restart `npm run dev`.",
      });
      submitLockRef.current = false;
      return;
    }

    if (!uploadedPaymentImage) {
      setSubmitStatus({ state: "error", message: "Please upload your payment screenshot." });
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      submitLockRef.current = false;
      return;
    }

    try {
      setSubmitStatus({ state: "submitting" });

      const dataUrl = await fileToBase64(uploadedPaymentImage);
      const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1] : dataUrl;

      const payload = {
        programPricePkr: programPrice,
        programToJoin,
        testPlanned,
        otherTestName: testPlanned === "Other" ? otherTestName : "",
        ieltsType: testPlanned === "IELTS" ? ieltsType : "",

        paymentImageName: uploadedPaymentImage.name,
        paymentImageMimeType: uploadedPaymentImage.type || "image/png",
        paymentImageBase64: base64,

        fullName,
        fatherName,
        gender,
        dateOfBirth,
        contactNumber,
        email,
        currentAddress,
        city,
        country,

        highestQualification,
        fieldOfStudy,
        instituteName,
        yearOfCompletion,
        currentStatus,

        takenIeltsBefore,
        ieltsTestDate: takenIeltsBefore === "Yes" ? ieltsTestDate : "",
        ieltsOverall: takenIeltsBefore === "Yes" ? ieltsOverall : "",
        ieltsListening: takenIeltsBefore === "Yes" ? ieltsListening : "",
        ieltsReading: takenIeltsBefore === "Yes" ? ieltsReading : "",
        ieltsWriting: takenIeltsBefore === "Yes" ? ieltsWriting : "",
        ieltsSpeaking: takenIeltsBefore === "Yes" ? ieltsSpeaking : "",

        takenPteBefore,
        pteTestDate: takenPteBefore === "Yes" ? pteTestDate : "",
        pteOverall: takenPteBefore === "Yes" ? pteOverall : "",

        takenToeflBefore,
        toeflTestDate: takenToeflBefore === "Yes" ? toeflTestDate : "",
        toeflOverall: takenToeflBefore === "Yes" ? toeflOverall : "",

        englishLevel,
        difficultSkill,

        classType,
        preferredTiming,
        heardAboutUs,
        heardAboutOther: heardAboutUs === "Other" ? heardAboutOther : "",

        preferredCountry,
        intendedIntake,
        preferredCourseField,

        requireVisaConsultancy,
        concerns,

        signatureName,
        signatureDate,
      };

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
        handleSuccess(
          "Thank you! Your registration was sent. If you don’t see it in the sheet, set your Apps Script Web App access to 'Anyone' and redeploy."
        );
        return;
      }

      handleSuccess("Thank you! Your registration has been received. We’ll contact you within 24 hours.");
    } catch (err) {
      setSubmitStatus({
        state: "error",
        message: String(err instanceof Error ? err.message : err),
      });

      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      submitLockRef.current = false;
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
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
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
            Student Registration
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
            AbroadAoo Consultancy — Registration Form
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
            Fill the form carefully for IELTS / PTE / TOEFL & other test preparation. You’ll choose your program first,
            then complete your details.
          </p>
        </motion.div>

        <form
          ref={formRef}
          className="rounded-3xl p-7"
          style={{
            background: darkMode ? "#1a1a1a" : "#fff",
            border: darkMode ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(196,168,130,0.18)",
            boxShadow: darkMode ? "0 10px 40px rgba(0,0,0,0.35)" : "0 10px 40px rgba(196,168,130,0.12)",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit();
          }}
        >
          {/* Status */}
          {submitStatus.state === "success" ? (
            <div
              className="rounded-2xl px-4 py-3"
              style={{
                background: darkMode ? "rgba(212,184,150,0.12)" : "rgba(212,184,150,0.25)",
                border: darkMode ? "1px solid rgba(212,184,150,0.25)" : "1px solid rgba(196,168,130,0.3)",
                fontFamily: "Sora, sans-serif",
                color: darkMode ? "#E8DCCF" : "#8B6B4A",
                fontSize: "0.9rem",
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5" style={{ color: darkMode ? "#D4B896" : "#8B6B4A", marginTop: 1 }} />
                <div>{submitStatus.message}</div>
              </div>
            </div>
          ) : null}

          {submitStatus.state === "error" ? (
            <div
              className="rounded-2xl px-4 py-3"
              style={{
                background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(250,247,244,0.85)",
                border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(196,168,130,0.18)",
                fontFamily: "Sora, sans-serif",
                color: darkMode ? "#ddd" : "#444",
                fontSize: "0.9rem",
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5" style={{ color: darkMode ? "#E8DCCF" : "#8B6B4A", marginTop: 1 }} />
                <div>{submitStatus.message}</div>
              </div>
            </div>
          ) : null}

          {/* Program Selection */}
          <div style={sectionTitleStyle(darkMode)}>Program to Join</div>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="programToJoin" style={labelStyle(darkMode)}>
                Choose Program
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <ClipboardList className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <select
                  id="programToJoin"
                  name="programToJoin"
                  required
                  value={programToJoin}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setProgramToJoin(e.target.value as ProgramToJoin);
                    clearIdleOnChange();
                  }}
                  className={selectClass}
                  style={fieldStyle(darkMode)}
                >
                  {programOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="programPrice" style={labelStyle(darkMode)}>
                Program Price
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <ClipboardList className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="programPrice"
                  name="programPrice"
                  value={programPriceLabel}
                  disabled
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>
          </div>

          {/* 1) Personal Information */}
          <div className="mt-10" style={sectionTitleStyle(darkMode)}>
            1. Personal Information
          </div>
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" style={labelStyle(darkMode)}>
                Full Name
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <User className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
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
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="fatherName" style={labelStyle(darkMode)}>
                Father’s Name
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Users className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="fatherName"
                  name="fatherName"
                  type="text"
                  required
                  value={fatherName}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setFatherName(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="gender" style={labelStyle(darkMode)}>
                Gender
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <User className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={gender}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setGender(e.target.value as Gender);
                    clearIdleOnChange();
                  }}
                  className={selectClass}
                  style={fieldStyle(darkMode)}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="dateOfBirth" style={labelStyle(darkMode)}>
                Date of Birth
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Calendar className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  value={dateOfBirth}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contactNumber" style={labelStyle(darkMode)}>
                Contact Number
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Phone className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  required
                  pattern={PK_PHONE_PATTERN}
                  title={PK_PHONE_TITLE}
                  value={contactNumber}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                  placeholder="e.g., +92 3XX XXXXXXX"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" style={labelStyle(darkMode)}>
                Email Address
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Mail className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
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
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="currentAddress" style={labelStyle(darkMode)}>
                Current Address
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <MapPin className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="currentAddress"
                  name="currentAddress"
                  type="text"
                  required
                  value={currentAddress}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setCurrentAddress(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="city" style={labelStyle(darkMode)}>
                City
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Building2 className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={city}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setCity(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="country" style={labelStyle(darkMode)}>
                Country
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Globe className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  value={country}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>
          </div>

          {/* 2) Educational Background */}
          <div className="mt-10" style={sectionTitleStyle(darkMode)}>
            2. Educational Background
          </div>
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="highestQualification" style={labelStyle(darkMode)}>
                Highest Qualification
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <GraduationCap className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="highestQualification"
                  name="highestQualification"
                  type="text"
                  required
                  value={highestQualification}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setHighestQualification(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                  placeholder="e.g., Matric / Intermediate / Bachelors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="fieldOfStudy" style={labelStyle(darkMode)}>
                Field of Study
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <BookOpen className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  type="text"
                  required
                  value={fieldOfStudy}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setFieldOfStudy(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="instituteName" style={labelStyle(darkMode)}>
                Institute / University Name
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <School className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="instituteName"
                  name="instituteName"
                  type="text"
                  required
                  value={instituteName}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setInstituteName(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="yearOfCompletion" style={labelStyle(darkMode)}>
                Year of Completion
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Calendar className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="yearOfCompletion"
                  name="yearOfCompletion"
                  type="text"
                  inputMode="numeric"
                  required
                  pattern={YEAR_PATTERN}
                  title={YEAR_TITLE}
                  value={yearOfCompletion}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setYearOfCompletion(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                  placeholder="e.g., 2023"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="currentStatus" style={labelStyle(darkMode)}>
                Current Status
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Briefcase className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <select
                  id="currentStatus"
                  name="currentStatus"
                  required
                  value={currentStatus}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setCurrentStatus(e.target.value as CurrentStatus);
                    clearIdleOnChange();
                  }}
                  className={selectClass}
                  style={fieldStyle(darkMode)}
                >
                  <option value="" disabled>
                    Select current status
                  </option>
                  <option value="Student">Student</option>
                  <option value="Employed">Employed</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3) Test Information */}
          <div className="mt-10" style={sectionTitleStyle(darkMode)}>
            3. Test Information
          </div>
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="testPlanned" style={labelStyle(darkMode)}>
                Which test are you planning to take?
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <ClipboardList className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <select
                  id="testPlanned"
                  name="testPlanned"
                  required
                  value={testPlanned}
                  disabled={formDisabled}
                  onChange={(e) => {
                    const v = e.target.value as TestPlanned;
                    setTestPlanned(v);
                    if (v !== "Other") setOtherTestName("");
                    if (v !== "IELTS") setIeltsType("");
                    clearIdleOnChange();
                  }}
                  className={selectClass}
                  style={fieldStyle(darkMode)}
                >
                  <option value="IELTS">IELTS</option>
                  <option value="PTE">PTE</option>
                  <option value="TOEFL">TOEFL</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {testPlanned === "Other" ? (
              <div>
                <label htmlFor="otherTestName" style={labelStyle(darkMode)}>
                  Other Test Name
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                    <PenLine className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                  </div>
                  <input
                    id="otherTestName"
                    name="otherTestName"
                    type="text"
                    required
                    value={otherTestName}
                    disabled={formDisabled}
                    onChange={(e) => {
                      setOtherTestName(e.target.value);
                      clearIdleOnChange();
                    }}
                    className={inputClass}
                    style={fieldStyle(darkMode)}
                    placeholder="Enter test name"
                  />
                </div>
              </div>
            ) : null}

            {testPlanned === "IELTS" ? (
              <div>
                <label htmlFor="ieltsType" style={labelStyle(darkMode)}>
                  Preferred Test Type (IELTS)
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                    <BookOpen className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                  </div>
                  <select
                    id="ieltsType"
                    name="ieltsType"
                    required
                    value={ieltsType}
                    disabled={formDisabled}
                    onChange={(e) => {
                      setIeltsType(e.target.value as "Academic" | "General Training");
                      clearIdleOnChange();
                    }}
                    className={selectClass}
                    style={fieldStyle(darkMode)}
                  >
                    <option value="" disabled>
                      Select IELTS type
                    </option>
                    <option value="Academic">Academic</option>
                    <option value="General Training">General Training</option>
                  </select>
                </div>
              </div>
            ) : null}
          </div>

          {/* 4) Previous Test History */}
          <div className="mt-10" style={sectionTitleStyle(darkMode)}>
            4. Previous Test History
          </div>
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="takenIeltsBefore" style={labelStyle(darkMode)}>
                Have you taken IELTS before?
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <ClipboardList className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <select
                  id="takenIeltsBefore"
                  name="takenIeltsBefore"
                  value={takenIeltsBefore}
                  disabled={formDisabled}
                  onChange={(e) => {
                    const v = e.target.value as "Yes" | "No";
                    setTakenIeltsBefore(v);
                    clearIdleOnChange();
                  }}
                  className={selectClass}
                  style={fieldStyle(darkMode)}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            {takenIeltsBefore === "Yes" ? (
              <div>
                <label htmlFor="ieltsTestDate" style={labelStyle(darkMode)}>
                  IELTS Test Date
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                    <Calendar className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                  </div>
                  <input
                    id="ieltsTestDate"
                    name="ieltsTestDate"
                    type="date"
                    required
                    value={ieltsTestDate}
                    disabled={formDisabled}
                    onChange={(e) => {
                      setIeltsTestDate(e.target.value);
                      clearIdleOnChange();
                    }}
                    className={inputClass}
                    style={fieldStyle(darkMode)}
                  />
                </div>
              </div>
            ) : null}

            {takenIeltsBefore === "Yes" ? (
              <>
                <div>
                  <label htmlFor="ieltsOverall" style={labelStyle(darkMode)}>
                    IELTS Overall Band Score
                  </label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                      <PenLine className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                    </div>
                    <input
                      id="ieltsOverall"
                      name="ieltsOverall"
                      type="text"
                      required
                      value={ieltsOverall}
                      disabled={formDisabled}
                      onChange={(e) => {
                        setIeltsOverall(e.target.value);
                        clearIdleOnChange();
                      }}
                      className={inputClass}
                      style={fieldStyle(darkMode)}
                      placeholder="e.g., 6.5"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 grid md:grid-cols-4 gap-4">
                  {[
                    { id: "ieltsListening", label: "Listening", value: ieltsListening, set: setIeltsListening },
                    { id: "ieltsReading", label: "Reading", value: ieltsReading, set: setIeltsReading },
                    { id: "ieltsWriting", label: "Writing", value: ieltsWriting, set: setIeltsWriting },
                    { id: "ieltsSpeaking", label: "Speaking", value: ieltsSpeaking, set: setIeltsSpeaking },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} style={labelStyle(darkMode)}>
                        {f.label}
                      </label>
                      <div className="relative mt-2">
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                          <PenLine className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                        </div>
                        <input
                          id={f.id}
                          name={f.id}
                          type="text"
                          required
                          value={f.value}
                          disabled={formDisabled}
                          onChange={(e) => {
                            f.set(e.target.value);
                            clearIdleOnChange();
                          }}
                          className={inputClass}
                          style={fieldStyle(darkMode)}
                          placeholder="e.g., 6.0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            <div>
              <label htmlFor="takenPteBefore" style={labelStyle(darkMode)}>
                Have you taken PTE before?
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <ClipboardList className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <select
                  id="takenPteBefore"
                  name="takenPteBefore"
                  value={takenPteBefore}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setTakenPteBefore(e.target.value as "Yes" | "No");
                    clearIdleOnChange();
                  }}
                  className={selectClass}
                  style={fieldStyle(darkMode)}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            {takenPteBefore === "Yes" ? (
              <div>
                <label htmlFor="pteTestDate" style={labelStyle(darkMode)}>
                  PTE Test Date
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                    <Calendar className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                  </div>
                  <input
                    id="pteTestDate"
                    name="pteTestDate"
                    type="date"
                    required
                    value={pteTestDate}
                    disabled={formDisabled}
                    onChange={(e) => {
                      setPteTestDate(e.target.value);
                      clearIdleOnChange();
                    }}
                    className={inputClass}
                    style={fieldStyle(darkMode)}
                  />
                </div>
              </div>
            ) : null}

            {takenPteBefore === "Yes" ? (
              <div>
                <label htmlFor="pteOverall" style={labelStyle(darkMode)}>
                  PTE Overall Score
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                    <PenLine className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                  </div>
                  <input
                    id="pteOverall"
                    name="pteOverall"
                    type="text"
                    required
                    value={pteOverall}
                    disabled={formDisabled}
                    onChange={(e) => {
                      setPteOverall(e.target.value);
                      clearIdleOnChange();
                    }}
                    className={inputClass}
                    style={fieldStyle(darkMode)}
                    placeholder="e.g., 58"
                  />
                </div>
              </div>
            ) : null}

            <div>
              <label htmlFor="takenToeflBefore" style={labelStyle(darkMode)}>
                Have you taken TOEFL before?
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <ClipboardList className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <select
                  id="takenToeflBefore"
                  name="takenToeflBefore"
                  value={takenToeflBefore}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setTakenToeflBefore(e.target.value as "Yes" | "No");
                    clearIdleOnChange();
                  }}
                  className={selectClass}
                  style={fieldStyle(darkMode)}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            {takenToeflBefore === "Yes" ? (
              <div>
                <label htmlFor="toeflTestDate" style={labelStyle(darkMode)}>
                  TOEFL Test Date
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                    <Calendar className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                  </div>
                  <input
                    id="toeflTestDate"
                    name="toeflTestDate"
                    type="date"
                    required
                    value={toeflTestDate}
                    disabled={formDisabled}
                    onChange={(e) => {
                      setToeflTestDate(e.target.value);
                      clearIdleOnChange();
                    }}
                    className={inputClass}
                    style={fieldStyle(darkMode)}
                  />
                </div>
              </div>
            ) : null}

            {takenToeflBefore === "Yes" ? (
              <div>
                <label htmlFor="toeflOverall" style={labelStyle(darkMode)}>
                  TOEFL Overall Score
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                    <PenLine className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                  </div>
                  <input
                    id="toeflOverall"
                    name="toeflOverall"
                    type="text"
                    required
                    value={toeflOverall}
                    disabled={formDisabled}
                    onChange={(e) => {
                      setToeflOverall(e.target.value);
                      clearIdleOnChange();
                    }}
                    className={inputClass}
                    style={fieldStyle(darkMode)}
                    placeholder="e.g., 85"
                  />
                </div>
              </div>
            ) : null}
          </div>

          {/* 5) English Proficiency */}
          <div className="mt-10" style={sectionTitleStyle(darkMode)}>
            5. English Proficiency
          </div>
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="englishLevel" style={labelStyle(darkMode)}>
                English Level
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Flag className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <select
                  id="englishLevel"
                  name="englishLevel"
                  required
                  value={englishLevel}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setEnglishLevel(e.target.value as EnglishLevel);
                    clearIdleOnChange();
                  }}
                  className={selectClass}
                  style={fieldStyle(darkMode)}
                >
                  <option value="" disabled>
                    Select level
                  </option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="difficultSkill" style={labelStyle(darkMode)}>
                Most Difficult Skill
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <ClipboardList className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <select
                  id="difficultSkill"
                  name="difficultSkill"
                  required
                  value={difficultSkill}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setDifficultSkill(e.target.value as DifficultSkill);
                    clearIdleOnChange();
                  }}
                  className={selectClass}
                  style={fieldStyle(darkMode)}
                >
                  <option value="" disabled>
                    Select skill
                  </option>
                  <option value="Listening">Listening</option>
                  <option value="Reading">Reading</option>
                  <option value="Writing">Writing</option>
                  <option value="Speaking">Speaking</option>
                </select>
              </div>
            </div>
          </div>

          {/* 6) Study Preferences */}
          <div className="mt-10" style={sectionTitleStyle(darkMode)}>
            6. Study Preferences
          </div>
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="preferredTiming" style={labelStyle(darkMode)}>
                Preferred Timing
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Clock className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="preferredTiming"
                  name="preferredTiming"
                  type="text"
                  required
                  value={preferredTiming}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setPreferredTiming(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                  placeholder="e.g., 7pm - 9pm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="heardAboutUs" style={labelStyle(darkMode)}>
                How did you hear about us?
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Megaphone className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <select
                  id="heardAboutUs"
                  name="heardAboutUs"
                  required
                  value={heardAboutUs}
                  disabled={formDisabled}
                  onChange={(e) => {
                    const v = e.target.value as HeardAbout;
                    setHeardAboutUs(v);
                    if (v !== "Other") setHeardAboutOther("");
                    clearIdleOnChange();
                  }}
                  className={selectClass}
                  style={fieldStyle(darkMode)}
                >
                  <option value="" disabled>
                    Select source
                  </option>
                  <option value="Social Media">Social Media</option>
                  <option value="Friend/Referral">Friend/Referral</option>
                  <option value="Website">Website</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {heardAboutUs === "Other" ? (
              <div className="md:col-span-2">
                <label htmlFor="heardAboutOther" style={labelStyle(darkMode)}>
                  Other (please specify)
                </label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                    <PenLine className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                  </div>
                  <input
                    id="heardAboutOther"
                    name="heardAboutOther"
                    type="text"
                    required
                    value={heardAboutOther}
                    disabled={formDisabled}
                    onChange={(e) => {
                      setHeardAboutOther(e.target.value);
                      clearIdleOnChange();
                    }}
                    className={inputClass}
                    style={fieldStyle(darkMode)}
                  />
                </div>
              </div>
            ) : null}
          </div>

          {/* 7) Study Abroad Plans */}
          <div className="mt-10" style={sectionTitleStyle(darkMode)}>
            7. Study Abroad Plans
          </div>
          <div className="mt-5 grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="preferredCountry" style={labelStyle(darkMode)}>
                Preferred Country
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Globe className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="preferredCountry"
                  name="preferredCountry"
                  type="text"
                  required
                  value={preferredCountry}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setPreferredCountry(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                  placeholder="e.g., UK / Canada"
                />
              </div>
            </div>

            <div>
              <label htmlFor="intendedIntake" style={labelStyle(darkMode)}>
                Intended Intake
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Plane className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="intendedIntake"
                  name="intendedIntake"
                  type="text"
                  required
                  value={intendedIntake}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setIntendedIntake(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                  placeholder="e.g., Fall 2026"
                />
              </div>
            </div>

            <div>
              <label htmlFor="preferredCourseField" style={labelStyle(darkMode)}>
                Preferred Course / Field
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <BookOpen className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="preferredCourseField"
                  name="preferredCourseField"
                  type="text"
                  required
                  value={preferredCourseField}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setPreferredCourseField(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>
          </div>

          {/* 8) Additional Information */}
          <div className="mt-10" style={sectionTitleStyle(darkMode)}>
            8. Additional Information
          </div>
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="requireVisaConsultancy" style={labelStyle(darkMode)}>
                Do you require visa consultancy?
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <ClipboardList className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <select
                  id="requireVisaConsultancy"
                  name="requireVisaConsultancy"
                  required
                  value={requireVisaConsultancy}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setRequireVisaConsultancy(e.target.value as "Yes" | "No");
                    clearIdleOnChange();
                  }}
                  className={selectClass}
                  style={fieldStyle(darkMode)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="concerns" style={labelStyle(darkMode)}>
                Any specific concerns or questions?
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-4" aria-hidden="true">
                  <PenLine className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <textarea
                  id="concerns"
                  name="concerns"
                  value={concerns}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setConcerns(e.target.value);
                    clearIdleOnChange();
                  }}
                  className="w-full rounded-2xl pr-4 py-3 pl-11 text-sm outline-none min-h-[120px]"
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

          {/* 9) Declaration */}
          <div className="mt-10" style={sectionTitleStyle(darkMode)}>
            9. Declaration
          </div>
          <div
            className="mt-4 rounded-2xl px-4 py-3"
            style={{
              background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(250,247,244,0.75)",
              border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(196,168,130,0.16)",
              fontFamily: "Sora, sans-serif",
              color: darkMode ? "#aaa" : "#777",
              fontSize: "0.9rem",
              lineHeight: 1.7,
            }}
          >
            I confirm that all the information provided is correct to the best of my knowledge.
          </div>

          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="signatureName" style={labelStyle(darkMode)}>
                Signature (Type your name)
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <PenLine className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="signatureName"
                  name="signatureName"
                  type="text"
                  required
                  value={signatureName}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setSignatureName(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="signatureDate" style={labelStyle(darkMode)}>
                Date
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                  <Calendar className="w-4.5 h-4.5" style={{ color: iconColor(darkMode) }} />
                </div>
                <input
                  id="signatureDate"
                  name="signatureDate"
                  type="date"
                  required
                  value={signatureDate}
                  disabled={formDisabled}
                  onChange={(e) => {
                    setSignatureDate(e.target.value);
                    clearIdleOnChange();
                  }}
                  className={inputClass}
                  style={fieldStyle(darkMode)}
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="mt-10" style={sectionTitleStyle(darkMode)}>
            Payment & Screenshot
          </div>

          <div
            className="mt-4 rounded-2xl p-5"
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

            <div
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "0.85rem",
                color: darkMode ? "#aaa" : "#777",
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              Amount: <span style={{ fontWeight: 900, color: darkMode ? "#fff" : "#111" }}>{programPriceLabel}</span>
            </div>

            <div className="space-y-2" style={{ fontFamily: "Sora, sans-serif", fontSize: "0.9rem", marginBottom: 12 }}>
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

            <input
              key={fileInputKey}
              type="file"
              accept="image/*"
              required
              disabled={formDisabled}
              onChange={(e) => {
                setUploadedPaymentImage(e.target.files?.[0] || null);
                clearIdleOnChange();
              }}
              className="block w-full text-sm"
              style={{
                fontFamily: "Sora, sans-serif",
                color: darkMode ? "#bbb" : "#666",
              }}
            />

            {uploadedPaymentImage ? (
              <div
                className="mt-3"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.85rem",
                  color: darkMode ? "#aaa" : "#777",
                }}
              >
                Selected: <span style={{ fontWeight: 800, color: darkMode ? "#fff" : "#111" }}>{uploadedPaymentImage.name}</span>
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <button
              type="button"
              disabled={formDisabled}
              onClick={() => {
                window.location.href = "/ilets-booking";
              }}
              className="w-full md:w-auto px-6 py-4 rounded-3xl text-sm font-semibold transition-all duration-300 disabled:opacity-70"
              style={{
                fontFamily: "Sora, sans-serif",
                background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(212,184,150,0.22)",
                border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(196,168,130,0.25)",
                color: darkMode ? "#fff" : "#111",
              }}
            >
              Back
            </button>

            <button
              type="submit"
              disabled={formDisabled}
              className="w-full md:flex-1 flex items-center justify-center px-8 py-5 rounded-3xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                fontFamily: "Sora, sans-serif",
                background: "linear-gradient(135deg, #D4B896, #C4A882)",
                color: "#fff",
                boxShadow: darkMode ? "0 14px 45px rgba(0,0,0,0.45)" : "0 14px 45px rgba(196,168,130,0.25)",
              }}
            >
              {submitStatus.state === "submitting"
                ? "Submitting…"
                : submitStatus.state === "success"
                  ? "Submitted"
                  : "Submit Registration"}
            </button>
          </div>

          <div
            className="mt-4 text-center"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "0.85rem",
              color: darkMode ? "#888" : "#888",
              lineHeight: 1.6,
            }}
          >
            After submission, we’ll contact you within 24 hours.
          </div>
        </form>

        {/* small footer note */}
        <div
          className="mt-6 text-center"
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "0.8rem",
            color: darkMode ? "#777" : "#777",
          }}
        >
          Office use (Counselor / Remarks / Batch) is filled by our team.
        </div>
      </div>
    </section>
  );
}
