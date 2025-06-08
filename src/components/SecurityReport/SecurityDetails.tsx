import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Eye, CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { SSL, Privacy } from "@/types/security";

interface SecurityDetailsProps {
  ssl: SSL;
  privacy: Privacy;
}

export const SecurityDetails: React.FC<SecurityDetailsProps> = ({
  ssl,
  privacy,
}) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lock className="h-6 w-6 text-blue-400" />
            {t("sslSecurity")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">{t("sslEnabled")}</span>
            {ssl.enabled ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <XCircle className="h-5 w-5 text-red-400" />
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">{t("certificateValid")}</span>
            {ssl.valid ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <XCircle className="h-5 w-5 text-red-400" />
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">{t("sslGrade")}</span>
            <Badge
              className={
                ssl.grade === "A+"
                  ? "text-green-400 bg-green-400/20"
                  : "text-yellow-400 bg-yellow-400/20"
              }
            >
              {ssl.grade}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Eye className="h-6 w-6 text-purple-400" />
            {t("privacyAnalysis")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">{t("trackersFound")}</span>
            <Badge
              className={
                privacy.trackers > 5
                  ? "text-red-400 bg-red-400/20"
                  : "text-green-400 bg-green-400/20"
              }
            >
              {privacy.trackers}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">{t("cookies")}</span>
            <Badge className="text-blue-400 bg-blue-400/20">
              {privacy.cookieCount}
            </Badge>
          </div>
          <div className="space-y-1">
            <span className="text-slate-300 text-sm">
              {t("dataCollection")}
            </span>
            <div className="flex flex-wrap gap-1">
              {privacy.dataCollection.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs text-slate-400 border-slate-600"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
