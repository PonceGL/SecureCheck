import { useState, useCallback } from "react";
import { useToast } from "@/hooks/useToast";
import { useLanguage } from "@/hooks/useLanguage";
import { analyzeUrlSecurity } from "@/utils/securityAnalyzer";
import { trackEvent } from "@/lib/analytics";

export const useSecurityAnalysis = () => {
  const [report, setReport] = useState(null);
  const { show } = useToast();
  const { t } = useLanguage();

  const analyzeUrl = useCallback(
    async (url: string) => {
      try {
        const analysisResult = await analyzeUrlSecurity(url);

        trackEvent("analysis_completed", {
          url,
          score: analysisResult.overallScore,
          riskLevel: analysisResult.riskLevel,
        });

        show({
          title: t("analysisComplete"),
          message: t("securityScanCompleted", { url }),
        });

        return analysisResult;
      } catch (error) {
        console.error("Security analysis failed:", error);
        trackEvent("analysis_failed", { url, error: error.message });

        show({
          type: "error",
          title: "Error",
          message: "No se pudo realizar el análisis de seguridad",
        });

        throw error;
      }
    },
    [t, show]
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
