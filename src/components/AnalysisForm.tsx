import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useUrlValidation } from "@/hooks/useUrlValidation";
import { trackEvent } from "@/lib/analytics";

interface AnalysisFormData {
  url: string;
}

interface AnalysisFormProps {
  isAnalyzing: boolean;
  progress: number;
  onAnalyze: (url: string) => void;
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({
  isAnalyzing,
  progress,
  onAnalyze,
}) => {
  const { t } = useLanguage();
  const { validateUrl } = useUrlValidation();
  const {
    register,
    handleSubmit,
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

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Shield className="h-6 w-6 text-blue-400" />
          {t("securityAnalysis")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                {...register("url", {
                  required: t("enterUrlToAnalyze"),
                  pattern: {
                    value:
                      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                    message: t("enterValidUrl"),
                  },
                })}
                type="url"
                placeholder={t("enterUrl")}
                className="w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                disabled={isAnalyzing}
                onFocus={() => handleClick("url_input")}
              />
              {errors.url && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.url.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              {isAnalyzing ? t("analyzing") : t("analyze")}
            </Button>
          </div>
        </form>

        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-300">
              <span>{t("analyzingSecurityThreats")}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
