import {
  Threat,
  Threats,
  SSL,
  Privacy,
  SecurityDetail,
  RiskLevel,
  SecurityReport,
} from "@/types/security";
import { SupportedLanguage, translations } from "@/constants/translations";

type TranslationParams = {
  [key: string]: string | number | boolean;
};

type TranslationObject = {
  [key: string]: string | TranslationObject;
};

const getNestedTranslation = (
  obj: TranslationObject,
  path: string
): string | undefined => {
  return path.split(".").reduce((acc, part) => acc?.[part], obj) as
    | string
    | undefined;
};

export const analyzeUrlSecurity = async (
  url: string,
  language: SupportedLanguage = "en"
): Promise<SecurityReport> => {
  const t = (key: string, params?: TranslationParams) => {
    const browserLang = navigator?.language?.split("-")[0] as SupportedLanguage;
    const langTranslations = translations[browserLang ?? language];
    const fallbackTranslations = translations.es;

    const translation =
      getNestedTranslation(langTranslations, key) ||
      getNestedTranslation(fallbackTranslations, key) ||
      key;

    if (params) {
      return Object.entries(params).reduce(
        (acc, [key, value]) => acc.replace(`{${key}}`, String(value)),
        translation
      );
    }
    return translation;
  };

  // Simulate analysis delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Parse URL for analysis
  const urlObj = new URL(url);
  const domain = urlObj.hostname;
  const isHttps = urlObj.protocol === "https:";

  // Simulate various security checks with detailed results
  const threats = {
    malware: checkForMalware(domain, t),
    phishing: checkForPhishing(domain, t),
    dataTheft: checkForDataTheft(domain, t),
    maliciousCookies: checkForMaliciousCookies(domain, t),
    unsafeDownloads: checkForUnsafeDownloads(domain, t),
  };

  const ssl = {
    enabled: isHttps,
    valid: isHttps && !domain.includes("test") && !domain.includes("localhost"),
    grade: isHttps ? (Math.random() > 0.3 ? "A+" : "B") : "F",
  };

  const privacy = {
    trackers: Math.floor(Math.random() * 15),
    cookieCount: Math.floor(Math.random() * 25) + 1,
    dataCollection: generateDataCollectionTypes(t),
  };

  // Calculate overall security score
  let score = 100;

  // Deduct points for threats
  if (threats.malware.detected) score -= 30;
  if (threats.phishing.detected) score -= 25;
  if (threats.dataTheft.detected) score -= 20;
  if (threats.maliciousCookies.detected) score -= 15;
  if (threats.unsafeDownloads.detected) score -= 10;

  // Deduct points for SSL issues
  if (!ssl.enabled) score -= 20;
  if (!ssl.valid) score -= 10;
  if (ssl.grade === "B") score -= 5;
  if (ssl.grade === "F") score -= 15;

  // Deduct points for privacy issues
  if (privacy.trackers > 10) score -= 15;
  if (privacy.trackers > 5) score -= 10;
  if (privacy.cookieCount > 20) score -= 5;

  score = Math.max(0, Math.min(100, score));

  const riskLevel = getRiskLevel(score, threats);
  const isSecure =
    score >= 70 && !threats.malware.detected && !threats.phishing.detected;

  const details = generateSecurityDetails(threats, ssl, privacy, domain, t);

  return {
    url,
    overallScore: score,
    riskLevel,
    isSecure,
    threats,
    ssl,
    privacy,
    details,
  };
};

const checkForMalware = (
  domain: string,
  t: (key: string, params?: TranslationParams) => string
): Threat => {
  const suspiciousDomains = [
    "malware",
    "virus",
    "hack",
    "phish",
    "scam",
    "fake",
  ];
  const detected =
    suspiciousDomains.some((suspicious) =>
      domain.toLowerCase().includes(suspicious)
    ) || Math.random() < 0.1;

  if (!detected) {
    return { detected: false };
  }

  const malwareTypes = [
    {
      type: t("security.malware.trojan"),
      description: t("security.malware.trojanDesc"),
      risks: [
        t("security.malware.risks.identity"),
        t("security.malware.risks.financial"),
        t("security.malware.risks.privacy"),
      ],
    },
    {
      type: t("security.malware.spyware"),
      description: t("security.malware.spywareDesc"),
      risks: [
        t("security.malware.risks.data"),
        t("security.malware.risks.keystroke"),
        t("security.malware.risks.screen"),
      ],
    },
    {
      type: t("security.malware.ransomware"),
      description: t("security.malware.ransomwareDesc"),
      risks: [
        t("security.malware.risks.encryption"),
        t("security.malware.risks.data"),
        t("security.malware.risks.extortion"),
      ],
    },
    {
      type: t("security.malware.botnet"),
      description: t("security.malware.botnetDesc"),
      risks: [
        t("security.malware.risks.unauthorized"),
        t("security.malware.risks.performance"),
        t("security.malware.risks.legal"),
      ],
    },
  ];

  const selectedMalware =
    malwareTypes[Math.floor(Math.random() * malwareTypes.length)];

  return {
    detected: true,
    details: selectedMalware,
  };
};

const checkForPhishing = (
  domain: string,
  t: (key: string, params?: TranslationParams) => string
): Threat => {
  const phishingPatterns = [
    "secure-bank",
    "paypal-secure",
    "amazon-login",
    "google-auth",
  ];
  const detected =
    phishingPatterns.some((pattern) =>
      domain.toLowerCase().includes(pattern)
    ) || Math.random() < 0.05;

  if (!detected) {
    return { detected: false };
  }

  const phishingTypes = [
    {
      type: t("security.phishing.banking"),
      description: t("security.phishing.bankingDesc"),
      targetedInfo: [
        t("security.phishing.targetedInfo.banking"),
        t("security.phishing.targetedInfo.account"),
        t("security.phishing.targetedInfo.ssn"),
      ],
      consequences: t("security.phishing.consequences.banking"),
    },
    {
      type: t("security.phishing.social"),
      description: t("security.phishing.socialDesc"),
      targetedInfo: [
        t("security.phishing.targetedInfo.social"),
        t("security.phishing.targetedInfo.messages"),
        t("security.phishing.targetedInfo.contacts"),
      ],
      consequences: t("security.phishing.consequences.social"),
    },
    {
      type: t("security.phishing.shopping"),
      description: t("security.phishing.shoppingDesc"),
      targetedInfo: [
        t("security.phishing.targetedInfo.creditCard"),
        t("security.phishing.targetedInfo.billing"),
        t("security.phishing.targetedInfo.phone"),
      ],
      consequences: t("security.phishing.consequences.shopping"),
    },
    {
      type: t("security.phishing.email"),
      description: t("security.phishing.emailDesc"),
      targetedInfo: [
        t("security.phishing.targetedInfo.email"),
        t("security.phishing.targetedInfo.contacts"),
        t("security.phishing.targetedInfo.personal"),
      ],
      consequences: t("security.phishing.consequences.email"),
    },
  ];

  const selectedPhishing =
    phishingTypes[Math.floor(Math.random() * phishingTypes.length)];

  return {
    detected: true,
    details: selectedPhishing,
  };
};

const checkForDataTheft = (
  domain: string,
  t: (key: string, params?: TranslationParams) => string
): Threat => {
  const detected = domain.includes("data-collector") || Math.random() < 0.15;

  if (!detected) {
    return { detected: false };
  }

  const dataTheftTypes = [
    {
      type: t("security.dataTheft.personal"),
      description: t("security.dataTheft.personalDesc"),
      dataCollected: [
        t("security.dataTheft.dataCollected.personal"),
        t("security.dataTheft.dataCollected.phone"),
        t("security.dataTheft.dataCollected.email"),
        t("security.dataTheft.dataCollected.browsing"),
      ],
      risks: t("security.dataTheft.risks.personal"),
    },
    {
      type: t("security.dataTheft.financial"),
      description: t("security.dataTheft.financialDesc"),
      dataCollected: [
        t("security.dataTheft.dataCollected.income"),
        t("security.dataTheft.dataCollected.shopping"),
        t("security.dataTheft.dataCollected.payment"),
        t("security.dataTheft.dataCollected.credit"),
      ],
      risks: t("security.dataTheft.risks.financial"),
    },
    {
      type: t("security.dataTheft.behavioral"),
      description: t("security.dataTheft.behavioralDesc"),
      dataCollected: [
        t("security.dataTheft.dataCollected.websites"),
        t("security.dataTheft.dataCollected.searches"),
        t("security.dataTheft.dataCollected.time"),
        t("security.dataTheft.dataCollected.device"),
      ],
      risks: t("security.dataTheft.risks.behavioral"),
    },
  ];

  const selectedDataTheft =
    dataTheftTypes[Math.floor(Math.random() * dataTheftTypes.length)];

  return {
    detected: true,
    details: selectedDataTheft,
  };
};

const checkForMaliciousCookies = (
  domain: string,
  t: (key: string, params?: TranslationParams) => string
): Threat => {
  const detected = Math.random() < 0.12;

  if (!detected) {
    return { detected: false };
  }

  const cookieIssues = [
    {
      type: t("security.cookies.tracking"),
      description: t("security.cookies.trackingDesc"),
      impact: t("security.cookies.impact.tracking"),
      privacy_risk: t("security.cookies.privacyRisk.tracking"),
    },
    {
      type: t("security.cookies.crossSite"),
      description: t("security.cookies.crossSiteDesc"),
      impact: t("security.cookies.impact.crossSite"),
      privacy_risk: t("security.cookies.privacyRisk.crossSite"),
    },
    {
      type: t("security.cookies.persistent"),
      description: t("security.cookies.persistentDesc"),
      impact: t("security.cookies.impact.persistent"),
      privacy_risk: t("security.cookies.privacyRisk.persistent"),
    },
  ];

  const selectedCookie =
    cookieIssues[Math.floor(Math.random() * cookieIssues.length)];

  return {
    detected: true,
    details: selectedCookie,
  };
};

const checkForUnsafeDownloads = (
  domain: string,
  t: (key: string, params?: TranslationParams) => string
): Threat => {
  const detected = domain.includes("download") && Math.random() < 0.2;

  if (!detected) {
    return { detected: false };
  }

  const downloadThreats = [
    {
      type: t("security.downloads.fake"),
      description: t("security.downloads.fakeDesc"),
      risks: [
        t("security.downloads.risks.infection"),
        t("security.downloads.risks.theft"),
        t("security.downloads.risks.damage"),
      ],
      warning: t("security.downloads.warning.fake"),
    },
    {
      type: t("security.downloads.bundled"),
      description: t("security.downloads.bundledDesc"),
      risks: [
        t("security.downloads.risks.unwanted"),
        t("security.downloads.risks.slowdown"),
        t("security.downloads.risks.privacy"),
      ],
      warning: t("security.downloads.warning.bundled"),
    },
    {
      type: t("security.downloads.corrupted"),
      description: t("security.downloads.corruptedDesc"),
      risks: [
        t("security.downloads.risks.corruption"),
        t("security.downloads.risks.instability"),
        t("security.downloads.risks.loss"),
      ],
      warning: t("security.downloads.warning.corrupted"),
    },
  ];

  const selectedDownload =
    downloadThreats[Math.floor(Math.random() * downloadThreats.length)];

  return {
    detected: true,
    details: selectedDownload,
  };
};

const generateDataCollectionTypes = (
  t: (key: string, params?: TranslationParams) => string
): string[] => {
  const allTypes = [
    t("security.dataCollection.personal"),
    t("security.dataCollection.location"),
    t("security.dataCollection.browsing"),
    t("security.dataCollection.device"),
    t("security.dataCollection.cookies"),
    t("security.dataCollection.ip"),
    t("security.dataCollection.email"),
    t("security.dataCollection.phone"),
  ];
  const count = Math.floor(Math.random() * 5) + 1;
  return allTypes.sort(() => 0.5 - Math.random()).slice(0, count);
};

const getRiskLevel = (
  score: number,
  threats: { malware: Threat; phishing: Threat }
): RiskLevel => {
  if (threats.malware.detected || threats.phishing.detected) return "CRITICAL";
  if (score < 40) return "HIGH";
  if (score < 70) return "MEDIUM";
  return "LOW";
};

const generateSecurityDetails = (
  threats: Threats,
  ssl: SSL,
  privacy: Privacy,
  domain: string,
  t: (key: string, params?: TranslationParams) => string
): SecurityDetail[] => {
  const details: SecurityDetail[] = [];

  if (threats.malware.detected && threats.malware.details) {
    const malwareDetails = threats.malware.details as {
      type: string;
      description: string;
      risks: string[];
    };
    details.push({
      category: t("security.categories.malware"),
      issue: t("security.issues.detected", { type: malwareDetails.type }),
      severity: "CRITICAL" as const,
      description: malwareDetails.description,
      risks: malwareDetails.risks,
      explanation: t("security.explanations.dangerous", {
        risks: malwareDetails.risks.join(", "),
      }),
    });
  }

  if (threats.phishing.detected && threats.phishing.details) {
    const phishingDetails = threats.phishing.details as {
      type: string;
      description: string;
      targetedInfo: string[];
      consequences: string;
    };
    details.push({
      category: t("security.categories.phishing"),
      issue: t("security.issues.attempt", { type: phishingDetails.type }),
      severity: "CRITICAL" as const,
      description: phishingDetails.description,
      targetedInfo: phishingDetails.targetedInfo,
      consequences: phishingDetails.consequences,
      explanation: t("security.explanations.phishing", {
        info: phishingDetails.targetedInfo.join(", "),
        consequences: phishingDetails.consequences,
      }),
    });
  }

  if (!ssl.enabled) {
    details.push({
      category: t("security.categories.encryption"),
      issue: t("security.issues.noProtection"),
      severity: "HIGH" as const,
      description: t("security.encryption.description"),
      explanation: t("security.explanations.encryption"),
      risks: [
        t("security.encryption.risks.password"),
        t("security.encryption.risks.creditCard"),
        t("security.encryption.risks.personal"),
      ],
    });
  }

  if (threats.dataTheft.detected && threats.dataTheft.details) {
    const dataTheftDetails = threats.dataTheft.details as {
      type: string;
      description: string;
      dataCollected: string[];
      risks: string;
    };
    details.push({
      category: t("security.categories.privacy"),
      issue: dataTheftDetails.type,
      severity: "HIGH" as const,
      description: dataTheftDetails.description,
      dataCollected: dataTheftDetails.dataCollected,
      explanation: t("security.explanations.dataCollection", {
        data: dataTheftDetails.dataCollected.join(", "),
        risks: dataTheftDetails.risks,
      }),
    });
  }

  if (privacy.trackers > 10) {
    details.push({
      category: t("security.categories.tracking"),
      issue: t("security.issues.surveillance"),
      severity: "MEDIUM" as const,
      description: t("security.tracking.description", {
        count: privacy.trackers,
      }),
      explanation: t("security.explanations.tracking"),
    });
  }

  if (threats.maliciousCookies.detected && threats.maliciousCookies.details) {
    const cookieDetails = threats.maliciousCookies.details as {
      type: string;
      description: string;
      impact: string;
      privacy_risk: string;
    };
    details.push({
      category: t("security.categories.cookies"),
      issue: cookieDetails.type,
      severity: "MEDIUM" as const,
      description: cookieDetails.description,
      impact: cookieDetails.impact,
      explanation: t("security.explanations.cookies", {
        risk: cookieDetails.privacy_risk,
      }),
    });
  }

  if (threats.unsafeDownloads.detected && threats.unsafeDownloads.details) {
    const downloadDetails = threats.unsafeDownloads.details as {
      type: string;
      description: string;
      risks: string[];
      warning: string;
    };
    details.push({
      category: t("security.categories.downloads"),
      issue: downloadDetails.type,
      severity: "HIGH" as const,
      description: downloadDetails.description,
      risks: downloadDetails.risks,
      explanation: t("security.explanations.downloads", {
        warning: downloadDetails.warning,
      }),
    });
  }

  return details;
};
