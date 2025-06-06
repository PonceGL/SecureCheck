import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { trackEvent } from "@/lib/analytics";

interface AnalysisFormProps {
  url: string;
  setUrl: (url: string) => void;
  isAnalyzing: boolean;
  progress: number;
  onAnalyze: () => void;
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({
  url,
  setUrl,
  isAnalyzing,
  progress,
  onAnalyze,
}) => {
  const { t } = useLanguage();

  const handleClick = (element: string) => {
    trackEvent("click", { element });
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
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder={t("enterUrl")}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
            disabled={isAnalyzing}
            onFocus={() => handleClick("url_input")}
          />
          <Button
            onClick={() => {
              handleClick("analyze_button");
              onAnalyze();
            }}
            disabled={isAnalyzing}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            {isAnalyzing ? t("analyzing") : t("analyze")}
          </Button>
        </div>

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
