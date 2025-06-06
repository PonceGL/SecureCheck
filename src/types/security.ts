export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Threat {
  detected: boolean;
  details?: Record<string, unknown>;
}

export interface Threats {
  malware: Threat;
  phishing: Threat;
  dataTheft: Threat;
  maliciousCookies: Threat;
  unsafeDownloads: Threat;
}

export interface SSL {
  enabled: boolean;
  valid: boolean;
  grade: string;
}

export interface Privacy {
  trackers: number;
  cookieCount: number;
  dataCollection: string[];
}

export interface SecurityDetail {
  category: string;
  issue: string;
  severity: RiskLevel;
  description: string;
  explanation?: string;
  risks?: string[];
  targetedInfo?: string[];
  consequences?: string;
  dataCollected?: string[];
  impact?: string;
}

export interface SecurityReport {
  url: string;
  overallScore: number;
  riskLevel: RiskLevel;
  isSecure: boolean;
  threats: Threats;
  ssl: SSL;
  privacy: Privacy;
  details: SecurityDetail[];
}
