import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackEvent } from "@/lib/analytics";
import { SecurityReport } from "@/types/security";

export const useShare = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const copyToClipboard = async (url: string, report?: SecurityReport) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: t("linkCopied"),
        description: t("linkCopiedDescription"),
      });

      trackEvent("share_copy", {
        url: report?.url,
        score: report?.overallScore,
      });
    } catch {
      toast({
        title: t("copyFailed"),
        description: t("copyFailedDescription"),
        variant: "destructive",
      });
    }
  };

  const shareReport = async (report: SecurityReport) => {
    const shareableUrl = `${window.location.origin}/report/${btoa(
      JSON.stringify(report)
    )}`;

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: t("shareTitle", { url: report.url }),
          text: t("shareText", { score: report.overallScore }),
          url: shareableUrl,
        });

        trackEvent("share_mobile", {
          url: report.url,
          score: report.overallScore,
        });
      } catch (error) {
        console.log("Share failed:", error);
        await copyToClipboard(shareableUrl, report);
      }
    } else {
      await copyToClipboard(shareableUrl, report);
    }
  };

  return { shareReport };
};
