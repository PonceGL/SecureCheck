import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";
// import { ReportDialog } from "@/components/ReportDialog";
import { useLanguage } from "@/hooks/useLanguage";
import { SecurityReport } from "@/types/security";
import { getRiskColor, getScoreColor } from "./utils";

interface OverallScoreProps {
  report: SecurityReport;
}

export const OverallScore: React.FC<OverallScoreProps> = ({ report }) => {
  const { t } = useLanguage();

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            {report.isSecure ? (
              <CheckCircle className="h-6 w-6 text-green-400" />
            ) : (
              <XCircle className="h-6 w-6 text-red-400" />
            )}
            {t("securityAnalysis").replace("de URL", "")}
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`${getRiskColor(report.riskLevel)}`}>
              <p className="w-full text-center">
                {report.riskLevel} {t("risk")}
              </p>
            </Badge>
            {/* <ReportDialog url={report.url} /> */}
          </div>
        </CardTitle>
        <Badge className={`${getRiskColor(report.riskLevel)} md:hidden`}>
          <p className="w-full text-center">
            {report.riskLevel} {t("risk")}
          </p>
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 grid-rows-2 items-center justify-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">{t("securityScore")}</span>
              <span
                className={`font-bold ${getScoreColor(report.overallScore)}`}
              >
                {report.overallScore}/100
              </span>
            </div>
            <Progress value={report.overallScore} className="h-3" />
          </div>
          <div className="text-left">
            <div className="text-sm text-slate-400">{t("analyzedUrl")}</div>
            <a href={report.url} target="_blank" className="w-full flex gap-2">
              <p className="text-white font-mono text-sm truncate">
                {report.url}
              </p>
              <ExternalLink className="h-4 w-4 text-slate-400" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
