import { useForm } from "react-hook-form";
import { useLanguage } from "@/hooks/useLanguage";
import { useUrlValidation } from "@/hooks/useUrlValidation";
import { trackEvent } from "@/lib/analytics";

interface AnalysisFormData {
  url: string;
}

export const useAnalysisForm = (onAnalyze: (url: string) => void) => {
  const { t } = useLanguage();
  const { validateUrl } = useUrlValidation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AnalysisFormData>({
    mode: "onChange",
  });

  const handleClick = (element: string) => {
    trackEvent("click", { element });
  };

  const onSubmit = (data: AnalysisFormData) => {
    if (validateUrl(data.url)) {
      handleClick("analyze_button");
      onAnalyze(data.url);
    }
  };

  return {
    register,
    handleSubmit,
    reset,
    errors,
    onSubmit,
    handleClick,
  };
};
