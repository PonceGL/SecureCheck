import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Flag } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { useLanguage } from "@/hooks/useLanguage";

interface ReportDialogProps {
  url: string;
}

export const ReportDialog: React.FC<ReportDialogProps> = ({ url }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { show } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async () => {
    if (!explanation.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to submit report
    await new Promise((resolve) => setTimeout(resolve, 1000));

    show({
      type: "error",
      title: "Error",
      message: "No se pudo generar el reporte",
    });

    setIsOpen(false);
    setExplanation("");
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-orange-400 border-orange-400 hover:bg-orange-400/10"
        >
          <Flag className="h-4 w-4 mr-2" />
          {t("reportResult")}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {t("disagreeWithResult")}
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            {t("explainDisagreement")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Please provide details about why you disagree with this security analysis..."
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 min-h-[100px]"
            rows={4}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="text-slate-300 border-slate-600 hover:bg-slate-700"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!explanation.trim() || isSubmitting}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isSubmitting ? "Submitting..." : t("submitReport")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
