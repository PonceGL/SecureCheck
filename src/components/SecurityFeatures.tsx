import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Cookie, Lock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { trackEvent } from "@/lib/analytics";

interface SecurityFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  elementId: string;
}

export const SecurityFeatures: React.FC = () => {
  const { t } = useLanguage();

  const features: SecurityFeature[] = [
    {
      icon: <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />,
      title: t("malwareDetection"),
      description: t("malwareDetectionDescription"),
      elementId: "feature_malware",
    },
    {
      icon: <Eye className="h-8 w-8 text-yellow-400 mx-auto mb-2" />,
      title: t("privacyAnalysis"),
      description: t("privacyAnalysisDescription"),
      elementId: "feature_privacy",
    },
    {
      icon: <Cookie className="h-8 w-8 text-orange-400 mx-auto mb-2" />,
      title: t("cookieInspection"),
      description: t("cookieInspectionDescription"),
      elementId: "feature_cookies",
    },
    {
      icon: <Lock className="h-8 w-8 text-blue-400 mx-auto mb-2" />,
      title: t("sslTlsCheck"),
      description: t("sslTlsCheckDescription"),
      elementId: "feature_ssl",
    },
  ];

  const handleClick = (elementId: string) => {
    trackEvent("click", { element: elementId });
  };

  return (
    <div
      data-testid="security-features"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {features.map((feature) => (
        <Card
          key={feature.elementId}
          className="bg-slate-800 border-slate-700"
          onClick={() => handleClick(feature.elementId)}
        >
          <CardContent className="p-6 text-center cursor-pointer">
            {feature.icon}
            <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
            <p className="text-sm text-slate-400">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
