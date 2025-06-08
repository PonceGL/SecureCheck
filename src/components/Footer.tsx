import React from "react";
import { Shield } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield
                data-testid="shield-icon"
                className="h-6 w-6 text-blue-400"
              />
              <span className="text-xl font-bold text-white">
                {t("secureCheckTitle")}
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              {t("secureCheckDescription")}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">
              {t("threatDetection")}
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• {t("malwareDetection")}</li>
              <li>• {t("phishingAttempt")}</li>
              <li>• {t("privacyAnalysis")}</li>
              <li>• {t("sslTlsCheck")}</li>
              <li>• {t("cookieInspection")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">
              {t("aboutSecureCheck")}
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              {t("secureCheckDescription")}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 {t("secureCheckTitle")}.
          </p>
        </div>
      </div>
    </footer>
  );
};
