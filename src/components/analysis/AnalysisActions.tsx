import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Share, Clipboard } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useIsMobile } from "@/hooks/use-mobile";
import { useShare } from "@/hooks/useShare";

interface AnalysisActionsProps {
  onAnalyzeNew: () => void;
  report: {
    url: string;
    overallScore: number;
  };
}

export const AnalysisActions: React.FC<AnalysisActionsProps> = ({
  onAnalyzeNew,
  report,
}) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { shareReport } = useShare();

  const handleShare = async () => {
    await shareReport(report);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center pt-4 border-t border-slate-700">
      <Button
        onClick={onAnalyzeNew}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        {t("analyzeNewUrl")}
      </Button>

      <Button
        onClick={handleShare}
        variant="outline"
        className="text-green-400 border-green-400 hover:bg-green-400/10"
      >
        {isMobile && navigator.share ? (
          <Share className="h-4 w-4 mr-2" />
        ) : (
          <Clipboard className="h-4 w-4 mr-2" />
        )}
        {t("shareResult")}
      </Button>
    </div>
  );
};
