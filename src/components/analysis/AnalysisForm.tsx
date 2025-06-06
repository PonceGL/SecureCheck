import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/useLanguage";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";

interface AnalysisFormData {
  url: string;
}

interface AnalysisFormProps {
  isAnalyzing: boolean;
  register: UseFormRegister<AnalysisFormData>;
  handleSubmit: UseFormHandleSubmit<AnalysisFormData>;
  errors: FieldErrors<AnalysisFormData>;
  onSubmit: (data: AnalysisFormData) => void;
  onFocus: () => void;
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({
  isAnalyzing,
  register,
  handleSubmit,
  errors,
  onSubmit,
  onFocus,
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
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
              onFocus={onFocus}
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-500">{errors.url.message}</p>
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
    </div>
  );
};
