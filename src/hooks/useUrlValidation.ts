import { useToast } from "@/hooks/useToast";
import { useLanguage } from "@/hooks/useLanguage";

export const useUrlValidation = () => {
  const { show } = useToast();
  const { t } = useLanguage();

  const validateUrl = (url: string): boolean => {
    if (!url) {
      show({
        type: "error",
        title: "Error",
        message: t("enterUrlToAnalyze"),
      });
      return false;
    }

    try {
      new URL(url);
      return true;
    } catch {
      show({
        type: "error",
        title: "Error",
        message: t("enterValidUrl"),
      });
      return false;
    }
  };

  return { validateUrl };
};
