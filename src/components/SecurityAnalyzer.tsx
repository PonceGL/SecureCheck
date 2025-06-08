import React, { useEffect } from "react";
import { SecurityReport } from "@/components/SecurityReport";
import { EducationalSection } from "@/components/EducationalSection";
import { trackEvent } from "@/lib/analytics";
import { SecurityFeatures } from "@/components/SecurityFeatures";
import { useUrlValidation } from "@/hooks/useUrlValidation";
import { useAnalysisProgress } from "@/hooks/useAnalysisProgress";
import { useSecurityAnalysis } from "@/hooks/useSecurityAnalysis";
import { AnalysisCard } from "@/components/analysis/AnalysisCard";

export const SecurityAnalyzer = () => {
  const { validateUrl } = useUrlValidation();
  const {
    progress,
    isAnalyzing,
    startProgress,
    completeProgress,
    resetProgress,
  } = useAnalysisProgress();
  const { report, setReport, analyzeUrl, resetAnalysis } =
    useSecurityAnalysis();

  // Analytics tracking
  useEffect(() => {
    trackEvent("page_visit", { referrer: document.referrer });
    const startTime = Date.now();

    return () => {
      const timeSpent = Date.now() - startTime;
      trackEvent("session_duration", { duration: timeSpent });
    };
  }, []);

  const handleAnalyze = async (urlToAnalyze: string) => {
    if (!validateUrl(urlToAnalyze)) {
      return;
    }

    trackEvent("analysis_started", { url: urlToAnalyze });
    const cleanup = startProgress();

    try {
      const analysisResult = await analyzeUrl(urlToAnalyze);
      setReport(analysisResult);
      completeProgress();
    } catch {
      resetProgress();
    } finally {
      cleanup?.();
    }
  };

  const handleAnalyzeNew = () => {
    resetAnalysis();
    resetProgress();
    trackEvent("analyze_new_clicked", {});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <AnalysisCard
        isAnalyzing={isAnalyzing}
        progress={progress}
        onAnalyze={handleAnalyze}
        report={report}
        onAnalyzeNew={handleAnalyzeNew}
      />

      {!report && <SecurityFeatures />}

      {report && <SecurityReport report={report} />}

      <EducationalSection />
    </div>
  );
};
