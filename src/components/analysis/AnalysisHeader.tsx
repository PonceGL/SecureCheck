import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const AnalysisHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-white">
        <Shield className="hidden md:flex h-6 w-6 text-blue-400" />
        {t("securityAnalysis")}
      </CardTitle>
    </CardHeader>
  );
};
