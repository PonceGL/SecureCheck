import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { SecurityDetail } from "@/types/security";
import { getRiskColor } from "./utils";

interface DetailedAnalysisProps {
  details: SecurityDetail[];
}

export const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({
  details,
}) => {
  const { t } = useLanguage();

  if (details.length === 0) return null;

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Info className="h-6 w-6 text-blue-400" />
          {t("detailedAnalysis")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {details.map((detail, index) => (
            <div
              key={index}
              className="p-6 bg-slate-700 rounded-lg border-l-4 border-orange-400"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white text-lg">
                  {detail.issue}
                </h4>
                <Badge className={getRiskColor(detail.severity)}>
                  {detail.severity}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium text-slate-300 mb-2">
                    {t("whatThisMeans")}
                  </h5>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {detail.description}
                  </p>
                </div>

                {detail.explanation && (
                  <div>
                    <h5 className="text-sm font-medium text-slate-300 mb-2">
                      {t("whyThisMatters")}
                    </h5>
                    <p className="text-slate-200 text-sm leading-relaxed">
                      {detail.explanation}
                    </p>
                  </div>
                )}

                {detail.risks && detail.risks.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-slate-300 mb-2">
                      {t("potentialRisks")}
                    </h5>
                    <ul className="list-disc list-inside text-slate-200 text-sm space-y-1">
                      {detail.risks.map((risk, riskIndex) => (
                        <li key={riskIndex}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {detail.targetedInfo && detail.targetedInfo.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-slate-300 mb-2">
                      {t("targetedInformation")}
                    </h5>
                    <ul className="list-disc list-inside text-slate-200 text-sm space-y-1">
                      {detail.targetedInfo.map((info, infoIndex) => (
                        <li key={infoIndex}>{info}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {detail.dataCollected && detail.dataCollected.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-slate-300 mb-2">
                      {t("dataBeingCollected")}
                    </h5>
                    <ul className="list-disc list-inside text-slate-200 text-sm space-y-1">
                      {detail.dataCollected.map((data, dataIndex) => (
                        <li key={dataIndex}>{data}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {detail.consequences && (
                  <div>
                    <h5 className="text-sm font-medium text-slate-300 mb-2">
                      {t("whatCouldHappen")}
                    </h5>
                    <p className="text-slate-200 text-sm leading-relaxed">
                      {detail.consequences}
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-600">
                  <p className="text-slate-400 text-xs">
                    {t("category")}: {detail.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
