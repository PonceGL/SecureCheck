import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { analyzeUrlSecurity } from "@/utils/securityAnalyzer";
import { trackEvent } from "@/lib/analytics";

export const useSecurityAnalysis = () => {
  const [report, setReport] = useState(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const analyzeUrl = useCallback(
    async (url: string) => {
      try {
        console.log("Starting security analysis for:", url);
        const analysisResult = await analyzeUrlSecurity(url);

        trackEvent("analysis_completed", {
          url,
          score: analysisResult.overallScore,
          riskLevel: analysisResult.riskLevel,
        });

        toast({
          title: t("analysisComplete"),
          description: t("securityScanCompleted", { url }),
        });

        return analysisResult;
      } catch (error) {
        console.error("Security analysis failed:", error);
        trackEvent("analysis_failed", { url, error: error.message });

        toast({
          title: t("analysisFailed"),
          description: t("unableToCompleteAnalysis"),
          variant: "destructive",
        });

        throw error;
      }
    },
    [t, toast]
  );

  const resetAnalysis = useCallback(() => {
    setReport(null);
  }, []);

  return {
    report,
    setReport,
    analyzeUrl,
    resetAnalysis,
  };
};
