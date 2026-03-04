import { useState } from "react";
import { FaFacebookF, FaTiktok, FaXTwitter } from "react-icons/fa6";

const LANGUAGES = [
  { code: "eng", label: "Eng" },
  { code: "ja", label: "\u65e5\u672c\u8a9e" },
];

export default function TopBar() {
  const [currentLang, setCurrentLang] = useState("ja");

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === "eng" ? "ja" : "eng"));
  };

  const languageLabel =
    LANGUAGES.find((lang) => lang.code === currentLang)?.label || "Eng";

  return (
    <div className="bg-[#00B1E6] text-white text-sm flex justify-between items-center h-9 px-4 md:px-8 fixed top-0 left-0 w-full z-[1001]">
      {/* Left */}
      <div className="flex gap-6">
        <span>info@horizongroup.co.jp</span>
        <span className="hidden md:block">03-5497-8734</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <a
          href="#"
          aria-label="Facebook"
          className="hover:opacity-80 hidden md:block"
        >
          <FaFacebookF />
        </a>

        <a
          href="#"
          aria-label="TikTok"
          className="hover:opacity-80 hidden md:block"
        >
          <FaTiktok />
        </a>

        <a
          href="#"
          aria-label="Twitter/X"
          className="hover:opacity-80 hidden md:block"
        >
          <FaXTwitter />
        </a>

        <button
          onClick={toggleLanguage}
          className="w-14 text-center hover:underline whitespace-nowrap shrink-0"
        >
          {languageLabel}
        </button>
      </div>
    </div>
  );
}
