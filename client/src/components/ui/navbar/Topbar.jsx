import { FaFacebookF, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { useLanguage } from "../../../context/LanguageContext";

const LANGUAGES = [
  { code: "ja", label: "\u65e5\u672c\u8a9e" },
  { code: "en", label: "English" },
];

export default function Topbar() {
  const { language, setLanguage } = useLanguage();
  const selectorLabel = language === "en" ? "Language selector" : "言語選択";

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

        <select
          aria-label={selectorLabel}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded border border-white/30 bg-transparent px-2 py-0.5 text-xs text-white focus:outline-none"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code} className="text-slate-900">
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
