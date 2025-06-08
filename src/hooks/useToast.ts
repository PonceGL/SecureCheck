import { Toast, useToastContext } from "@/components/ui/toast";

export function useToast() {
  const { show, dismiss } = useToastContext();

  return {
    show: (props: Toast) => show(props),
    dismiss,
  };
}
