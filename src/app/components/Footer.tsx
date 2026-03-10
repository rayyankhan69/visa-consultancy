import { Globe, Instagram, Facebook, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";

interface FooterProps {
  darkMode: boolean;
}

const footerLinks = {
  Programs: [
    { label: "Masters Germany", href: "#services" },
    { label: "Ausbildung", href: "#services" },
    { label: "Bachelor Route", href: "#services" },
  ],
  Support: [
    { label: "IELTS Classes", href: "#ielts" },
    { label: "Consultation", href: "#consultation" },
    { label: "Visa Guidance", href: "#process" },
  ],
};

export function Footer({ darkMode }: FooterProps) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: darkMode ? "#0a0a0a" : "#111",
        borderTop: darkMode ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#E8DCCF] flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#6B5744]" />
              </div>
              <span
                className="font-bold"
                style={{ fontFamily: "Sora, sans-serif", fontSize: "1.1rem", color: "#fff" }}
              >
                Growth<span style={{ color: "#C4A882" }}>Bridge</span>
              </span>
            </div>
            <p
              className="mb-6 max-w-xs"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "0.82rem",
                color: "#666",
                lineHeight: 1.7,
              }}
            >
              Helping Pakistani students build their future in Germany through expert guidance and proven pathways.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "#", color: "#E1306C" },
                { icon: Facebook, label: "Facebook", href: "#", color: "#1877F2" },
                { icon: Linkedin, label: "LinkedIn", href: "#", color: "#0A66C2" },
              ].map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = `${color}33`)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                >
                  <Icon className="w-4 h-4" style={{ color: "#aaa" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Programs & Support */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="mb-5"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#E8DCCF",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollTo(href)}
                      className="text-left transition-colors duration-200 hover:text-[#C4A882]"
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "0.83rem",
                        color: "#666",
                      }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4
              className="mb-5"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#E8DCCF",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@growthbridge.pk"
                  className="flex items-center gap-2.5 transition-colors duration-200 hover:text-[#C4A882] group"
                >
                  <Mail className="w-4 h-4 text-[#C4A882] flex-shrink-0" />
                  <span
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.83rem",
                      color: "#666",
                    }}
                  >
                    info@growthbridge.pk
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+923001234567"
                  className="flex items-center gap-2.5 transition-colors duration-200 hover:text-[#C4A882]"
                >
                  <Phone className="w-4 h-4 text-[#C4A882] flex-shrink-0" />
                  <span
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.83rem",
                      color: "#666",
                    }}
                  >
                    +92 300 1234567
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors duration-200 hover:text-[#C4A882]"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#25D366" }} />
                  <span
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: "0.83rem",
                      color: "#666",
                    }}
                  >
                    WhatsApp Us
                  </span>
                </a>
              </li>
            </ul>

            {/* Country info */}
            <div
              className="mt-6 px-3 py-2 rounded-lg inline-flex items-center gap-2"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <span className="text-base">🇵🇰</span>
              <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.75rem", color: "#555" }}>
                Pakistan
              </span>
              <span style={{ color: "#333" }}>→</span>
              <span className="text-base">🇩🇪</span>
              <span style={{ fontFamily: "Sora, sans-serif", fontSize: "0.75rem", color: "#555" }}>
                Germany
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "0.78rem",
              color: "#444",
            }}
          >
            © 2026 GrowthBridge. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors duration-200 hover:text-[#C4A882]"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "0.78rem",
                  color: "#444",
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
