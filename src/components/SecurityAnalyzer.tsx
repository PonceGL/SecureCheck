import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { SecurityReport } from "@/components/SecurityReport";
import { EducationalSection } from "@/components/EducationalSection";
import { analyzeUrlSecurity } from "@/utils/securityAnalyzer";
import { useLanguage } from "@/hooks/useLanguage";
import { trackEvent } from "@/lib/analytics";
import { AnalysisForm } from "@/components/AnalysisForm";
import { SecurityFeatures } from "@/components/SecurityFeatures";

export const SecurityAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Analytics tracking
  useEffect(() => {
    trackEvent("page_visit", { referrer: document.referrer });
    const startTime = Date.now();

    return () => {
      const timeSpent = Date.now() - startTime;
      trackEvent("session_duration", { duration: timeSpent });
    };
  }, []);

  const handleAnalyze = async () => {
    if (!url) {
      toast({
        title: t("error"),
        description: t("enterUrlToAnalyze"),
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(url);
    } catch {
      toast({
        title: t("invalidUrl"),
        description: t("enterValidUrl"),
        variant: "destructive",
      });
      return;
    }

    trackEvent("analysis_started", { url });

    setIsAnalyzing(true);
    setProgress(0);
    setReport(null);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      console.log("Starting security analysis for:", url);
      const analysisResult = await analyzeUrlSecurity(url);

      setProgress(100);
      setTimeout(() => {
        setReport(analysisResult);
        setIsAnalyzing(false);

        trackEvent("analysis_completed", {
          url,
          score: analysisResult.overallScore,
          riskLevel: analysisResult.riskLevel,
        });

        toast({
          title: t("analysisComplete"),
          description: t("securityScanCompleted", { url }),
        });
      }, 500);
    } catch (error) {
      console.error("Security analysis failed:", error);
      setIsAnalyzing(false);
      setProgress(0);

      trackEvent("analysis_failed", { url, error: error.message });

      toast({
        title: t("analysisFailed"),
        description: t("unableToCompleteAnalysis"),
        variant: "destructive",
      });
    }
  };

  const handleAnalyzeNew = () => {
    setUrl("");
    setReport(null);
    setProgress(0);
    trackEvent("analyze_new_clicked", {});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <AnalysisForm
        url={url}
        setUrl={setUrl}
        isAnalyzing={isAnalyzing}
        progress={progress}
        onAnalyze={handleAnalyze}
      />

      <SecurityFeatures />

      {report && (
        <SecurityReport report={report} onAnalyzeNew={handleAnalyzeNew} />
      )}

      <EducationalSection />
    </div>
  );
};
