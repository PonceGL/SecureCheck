import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SecurityReport as ReportType } from "@/types/security";
import { useLanguage } from "@/hooks/useLanguage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SecurityReport } from "@/components/SecurityReport";
import { AnalysisActions } from "@/components/analysis/AnalysisActions";

export const ReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ReportType | null>(null);
  const { t } = useLanguage();

  const goToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    try {
      if (!id) {
        goToHome();
        throw new Error("No report ID provided");
      }

      const decodedReport = JSON.parse(atob(id)) as ReportType;
      setReport(decodedReport);
    } catch (err) {
      console.error("Error decoding report:", err);
      goToHome();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">
          {t("sharedReport")} - {report.url}
        </h1>
        <SecurityReport report={report} />
        <AnalysisActions onAnalyzeNew={goToHome} report={report} />
      </main>
      <Footer />
    </div>
  );
};
