import { useState, useEffect } from "react";
import { translations, SupportedLanguage } from "@/constants/translations";

type TranslationParams = Record<string, string | number>;

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

  const t = (
    key: keyof typeof translations.en,
    params?: TranslationParams
  ): string => {
    let translation =
      translations[language]?.[key] || translations.en[key] || key;

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }

    return translation;
  };

  return { language, setLanguage, t };
};
