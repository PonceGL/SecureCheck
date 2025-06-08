import { RiskLevel, SecurityReport } from "@/types/security";

export const getRiskColor = (level: RiskLevel) => {
  switch (level) {
    case "LOW":
      return "text-green-400 bg-green-400/20";
    case "MEDIUM":
      return "text-yellow-400 bg-yellow-400/20";
    case "HIGH":
      return "text-orange-400 bg-orange-400/20";
    case "CRITICAL":
      return "text-red-400 bg-red-400/20";
    default:
      return "text-slate-400 bg-slate-400/20";
  }
};

export const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
};

export const generateShareableUrl = (report: SecurityReport) => {
  const reportData = encodeURIComponent(JSON.stringify(report));
  const baseUrl = window.location.origin;
  return `${baseUrl}/report/${btoa(reportData)}`;
};
