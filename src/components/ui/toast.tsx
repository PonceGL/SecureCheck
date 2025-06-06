import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export type Toast = {
  type?: ToastType;
  title?: string;
  message?: string;
  duration?: number;
};

export interface ToastContextType {
  toasts: Toast;
  show: (toast: Toast) => void;
  dismiss: () => void;
}

const DEFAULT_TIME = 3 * 1000;

const ToastContext = createContext<ToastContextType | null>(null);

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

const DEFAULT_TOATS: Toast = {
  type: "success",
  duration: DEFAULT_TIME,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast>(DEFAULT_TOATS);
  const [showToasts, setShowToasts] = useState<boolean>(false);

  const dismiss = useCallback(() => {
    setShowToasts(false);
    setToasts(DEFAULT_TOATS);
  }, []);

  const show = useCallback(
    (config: Toast) => {
      setToasts({
        ...toasts,
        ...config,
      });
      setShowToasts(true);
      setTimeout(() => {
        dismiss();
      }, toasts.duration ?? DEFAULT_TIME);
    },
    [dismiss, toasts]
  );

  const icon = useMemo(() => {
    if (toasts?.type === "success") {
      return "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z";
    }
    if (toasts?.type === "error") {
      return "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z";
    }
    if (toasts?.type === "warning") {
      return "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z";
    }
    return "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z";
  }, [toasts]);

  const color = useMemo(() => {
    if (toasts?.type === "success") {
      return "bg-green-800 text-green-200";
    }
    if (toasts?.type === "error") {
      return "text-red-500 bg-red-100";
    }
    if (toasts?.type === "warning") {
      return "text-orange-500 bg-orange-100";
    }
    return "bg-gray-500 text-gray-50";
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toasts, show, dismiss }}>
      {showToasts && (
        <div
          id={`toast-${toasts?.type ?? "success"}`}
          className="w-fit grid grid-cols-[1fr_8fr_1fr] items-center justify-center gap-x-2.5 min-w-80 max-w-[100vw] p-4 rounded-lg shadow-md text-gray-400 bg-gray-700 fixed z-50 md:bottom-4 md:right-4 md:max-w-96"
          role="alert"
        >
          <div
            className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${color}`}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d={icon} />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="w-full flex-col gap-2">
            {toasts.title && (
              <p className="text-sm font-semibold line-clamp-1">
                {toasts.title}
              </p>
            )}
            {toasts.message && (
              <p className="text-sm font-normal line-clamp-2">
                {toasts.message}
              </p>
            )}
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
            onClick={dismiss}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      {children}
    </ToastContext.Provider>
  );
}
