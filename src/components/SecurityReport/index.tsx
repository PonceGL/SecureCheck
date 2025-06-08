import React from "react";
import { SecurityReport as SecurityReportType } from "@/types/security";
import { OverallScore } from "./OverallScore";
import { WebsiteScreenshot } from "./WebsiteScreenshot";
import { ThreatDetection } from "./ThreatDetection";
import { SecurityDetails } from "./SecurityDetails";
import { DetailedAnalysis } from "./DetailedAnalysis";

interface SecurityReportProps {
  report: SecurityReportType;
}

export const SecurityReport: React.FC<SecurityReportProps> = ({ report }) => {
  return (
    <div data-testid="security-report" className="space-y-6">
      <OverallScore report={report} />
      <WebsiteScreenshot url={report.url} />
      <ThreatDetection threats={report.threats} />
      <SecurityDetails ssl={report.ssl} privacy={report.privacy} />
      <DetailedAnalysis details={report.details} />
    </div>
  );
};
