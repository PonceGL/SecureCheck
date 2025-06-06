import { useState, useEffect } from "react";
import { translations, SupportedLanguage } from "@/constants/translations";

export const useLanguage = () => {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  useEffect(() => {
    const detectLanguage = () => {
      const browserLang = navigator.language.split("-")[0] as SupportedLanguage;
      if (translations[browserLang]) {
        setLanguage(browserLang);
      }
    };

    detectLanguage();
  }, []);

  const t = (key: keyof typeof translations.en): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return { language, setLanguage, t };
};
