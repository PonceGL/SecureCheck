import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { ReportDialog } from "@/components/ReportDialog";
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
            {t("securityAnalysis")}
          </div>
          <div className="flex items-center gap-3">
            <Badge className={getRiskColor(report.riskLevel)}>
              {report.riskLevel} {t("risk")}
            </Badge>
            <ReportDialog url={report.url} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
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
          <div className="text-right">
            <div className="text-sm text-slate-400">{t("analyzedUrl")}</div>
            <div className="text-white font-mono text-sm flex items-center gap-2">
              {report.url}
              <ExternalLink className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
