import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/useLanguage";
import { AnalysisHeader } from "./AnalysisHeader";
import { AnalysisForm } from "./AnalysisForm";
import { AnalysisActions } from "./AnalysisActions";
import { useAnalysisForm } from "@/hooks/useAnalysisForm";
import { SecurityReport } from "@/types/security";

interface AnalysisCardProps {
  isAnalyzing: boolean;
  progress: number;
  onAnalyze: (url: string) => void;
  onAnalyzeNew?: () => void;
  report?: SecurityReport;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({
  isAnalyzing,
  progress,
  onAnalyze,
  onAnalyzeNew,
  report,
}) => {
  const { t } = useLanguage();
  const { register, handleSubmit, reset, errors, onSubmit, handleClick } =
    useAnalysisForm(onAnalyze);

  const handleAnalyzeNew = () => {
    reset();
    onAnalyzeNew?.();
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <AnalysisHeader />
      <CardContent className="space-y-4">
        <AnalysisForm
          isAnalyzing={isAnalyzing}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          onFocus={() => handleClick("url_input")}
        />

        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-300">
              <span>{t("analyzingSecurityThreats")}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {report && onAnalyzeNew && (
          <AnalysisActions onAnalyzeNew={handleAnalyzeNew} report={report} />
        )}
      </CardContent>
    </Card>
  );
};
