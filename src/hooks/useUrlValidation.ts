import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

export const useUrlValidation = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const validateUrl = (url: string): boolean => {
    if (!url) {
      toast({
        title: t("error"),
        description: t("enterUrlToAnalyze"),
        variant: "destructive",
      });
      return false;
    }

    try {
      new URL(url);
      return true;
    } catch {
      toast({
        title: t("invalidUrl"),
        description: t("enterValidUrl"),
        variant: "destructive",
      });
      return false;
    }
  };

  return { validateUrl };
};
