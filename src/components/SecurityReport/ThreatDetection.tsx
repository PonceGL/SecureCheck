import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Threats } from "@/types/security";

interface ThreatDetectionProps {
  threats: Threats;
}

export const ThreatDetection: React.FC<ThreatDetectionProps> = ({
  threats,
}) => {
  const { t } = useLanguage();

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <AlertTriangle className="h-6 w-6 text-yellow-400" />
          {t("threatDetection")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
            <span className="text-slate-300">{t("malwareDetection")}</span>
            {threats.malware.detected ? (
              <Badge className="text-red-400 bg-red-400/20">
                <p className="w-full text-center">{t("detected")}</p>
              </Badge>
            ) : (
              <Badge className="text-green-400 bg-green-400/20">
                <p className="w-full text-center">{t("clean")}</p>
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
            <span className="text-slate-300">{t("phishingAttempt")}</span>
            {threats.phishing.detected ? (
              <Badge className="text-red-400 bg-red-400/20">
                <p className="w-full text-center">{t("detected")}</p>
              </Badge>
            ) : (
              <Badge className="text-green-400 bg-green-400/20">
                <p className="w-full text-center">{t("safe")}</p>
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
            <span className="text-slate-300">{t("dataTheftRisk")}</span>
            {threats.dataTheft.detected ? (
              <Badge className="text-red-400 bg-red-400/20">
                <p className="w-full text-center">{t("highRisk")}</p>
              </Badge>
            ) : (
              <Badge className="text-green-400 bg-green-400/20">
                <p className="w-full text-center">{t("lowRisk")}</p>
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
            <span className="text-slate-300">{t("maliciousCookies")}</span>
            {threats.maliciousCookies.detected ? (
              <Badge className="text-red-400 bg-red-400/20">
                <p className="w-full text-center">{t("found")}</p>
              </Badge>
            ) : (
              <Badge className="text-green-400 bg-green-400/20">
                <p className="w-full text-center">{t("none")}</p>
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
