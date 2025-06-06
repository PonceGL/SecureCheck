import { getUserId } from "@/lib/user";

// Tipos base para los eventos
export interface BaseAnalyticsEvent {
  timestamp: string;
  userId: string;
  url: string;
  userAgent: string;
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string;
}

// Tipos específicos para cada evento
export interface SessionDurationEvent extends BaseAnalyticsEvent {
  event: "session_duration";
  data: {
    duration: number;
  };
}

export interface AnalysisStartedEvent extends BaseAnalyticsEvent {
  event: "analysis_started";
  data: {
    url: string;
  };
}

export interface AnalysisCompletedEvent extends BaseAnalyticsEvent {
  event: "analysis_completed";
  data: {
    url: string;
    score: number;
    riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  };
}

export interface AnalysisFailedEvent extends BaseAnalyticsEvent {
  event: "analysis_failed";
  data: {
    url: string;
    error: string;
  };
}

export interface AnalyzeNewClickedEvent extends BaseAnalyticsEvent {
  event: "analyze_new_clicked";
  data: Record<string, never>;
}

export interface ClickEvent extends BaseAnalyticsEvent {
  event: "click";
  data: {
    element: string;
  };
}

export interface ShareMobileEvent extends BaseAnalyticsEvent {
  event: "share_mobile";
  data: {
    url: string;
    score: number;
  };
}

export interface ShareCopyEvent extends BaseAnalyticsEvent {
  event: "share_copy";
  data: {
    url: string;
    score: number;
  };
}

export interface PageVisitEvent extends BaseAnalyticsEvent {
  event: "page_visit";
  data: {
    referrer: string;
  };
}

// Unión de todos los tipos de eventos
export type AnalyticsEvent =
  | PageVisitEvent
  | SessionDurationEvent
  | AnalysisStartedEvent
  | AnalysisCompletedEvent
  | AnalysisFailedEvent
  | AnalyzeNewClickedEvent
  | ClickEvent
  | ShareMobileEvent
  | ShareCopyEvent;

// Función para obtener el tipo de dispositivo
const getDeviceType = (): "desktop" | "mobile" | "tablet" => {
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return "tablet";
  if (
    /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(
      userAgent
    )
  )
    return "mobile";
  return "desktop";
};

// Función para obtener el navegador
const getBrowser = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  return "Other";
};

// Función principal para registrar eventos
export const trackEvent = <T extends AnalyticsEvent["event"]>(
  event: T,
  data: Extract<AnalyticsEvent, { event: T }>["data"]
): void => {
  const analytics: AnalyticsEvent = {
    timestamp: new Date().toISOString(),
    userId: getUserId(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    deviceType: getDeviceType(),
    browser: getBrowser(),
    event,
    data,
  } as AnalyticsEvent;

  // Almacenar en localStorage
  const storedAnalytics = JSON.parse(
    localStorage.getItem("securecheck_analytics") || "[]"
  );
  storedAnalytics.push(analytics);
  localStorage.setItem(
    "securecheck_analytics",
    JSON.stringify(storedAnalytics)
  );

  console.log("Analytics event tracked:", analytics);
};
