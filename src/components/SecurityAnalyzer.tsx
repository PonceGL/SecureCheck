import React, { useState, useEffect } from "react";
import { SecurityReport } from "@/components/SecurityReport";
import { EducationalSection } from "@/components/EducationalSection";
import { useLanguage } from "@/hooks/useLanguage";
import { trackEvent } from "@/lib/analytics";
import { AnalysisForm } from "@/components/AnalysisForm";
import { SecurityFeatures } from "@/components/SecurityFeatures";
import { useUrlValidation } from "@/hooks/useUrlValidation";
import { useAnalysisProgress } from "@/hooks/useAnalysisProgress";
import { useSecurityAnalysis } from "@/hooks/useSecurityAnalysis";

export const SecurityAnalyzer = () => {
  const [url, setUrl] = useState("");
  const { t } = useLanguage();
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
    } catch (error) {
      resetProgress();
    } finally {
      cleanup?.();
    }
  };

  const handleAnalyzeNew = () => {
    setUrl("");
    resetAnalysis();
    resetProgress();
    trackEvent("analyze_new_clicked", {});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <AnalysisForm
        isAnalyzing={isAnalyzing}
        progress={progress}
        onAnalyze={handleAnalyze}
        report={report}
        onAnalyzeNew={handleAnalyzeNew}
      />

      <SecurityFeatures />

      {report && (
        <SecurityReport report={report} onAnalyzeNew={handleAnalyzeNew} />
      )}

      <EducationalSection />
    </div>
  );
};
