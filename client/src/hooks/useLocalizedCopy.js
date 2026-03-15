import { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function useLocalizedCopy(copyByLanguage) {
  const { language } = useLanguage();

  return useMemo(() => {
    if (!copyByLanguage || typeof copyByLanguage !== "object") {
      return {};
    }

    return copyByLanguage[language] || copyByLanguage.ja || {};
  }, [copyByLanguage, language]);
}
