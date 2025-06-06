import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface WebsiteScreenshotProps {
  url: string;
}

export const WebsiteScreenshot: React.FC<WebsiteScreenshotProps> = ({
  url,
}) => {
  const { t } = useLanguage();

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Camera className="h-6 w-6 text-blue-400" />
          {t("websiteScreenshot")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <img
            src={`https://api.microlink.io/screenshot?url=${encodeURIComponent(
              url
            )}&viewport.width=1200&viewport.height=800`}
            alt={t("screenshotAlt", { url })}
            className="w-full max-w-2xl mx-auto rounded-lg border border-slate-600"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23374151'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%23D1D5DB' font-family='Arial' font-size='18'%3EScreenshot not available%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-slate-700 text-slate-300">
              {t("livePreview")}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
