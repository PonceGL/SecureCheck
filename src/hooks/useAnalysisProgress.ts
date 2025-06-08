import { useState, useCallback } from "react";

export const useAnalysisProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startProgress = useCallback(() => {
    setIsAnalyzing(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  const completeProgress = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 500);
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(0);
    setIsAnalyzing(false);
  }, []);

  return {
    progress,
    isAnalyzing,
    startProgress,
    completeProgress,
    resetProgress,
  };
};
