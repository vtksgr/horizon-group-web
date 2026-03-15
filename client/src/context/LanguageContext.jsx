import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SUPPORTED_LANGUAGES = ["ja", "en"];

const LanguageContext = createContext(null);

function getInitialLanguage() {
  const saved = localStorage.getItem("site_language");
  if (SUPPORTED_LANGUAGES.includes(saved)) {
    return saved;
  }
  return "ja";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem("site_language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, supportedLanguages: SUPPORTED_LANGUAGES }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
