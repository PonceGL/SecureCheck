export type SupportedLanguage =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "ru"
  | "zh"
  | "ja"
  | "ko";

export const translations = {
  en: {
    securityAnalysis: "URL Security Analysis",
    analyze: "Analyze",
    analyzing: "Analyzing...",
    enterUrl: "Enter URL to analyze (e.g., https://example.com)",
    analysisComplete: "Analysis Complete",
    analysisFailed: "Analysis Failed",
    securityScore: "Security Score",
    analyzedUrl: "Analyzed URL",
    threatDetection: "Threat Detection",
    malwareDetection: "Malware Detection",
    phishingAttempt: "Phishing Attempt",
    dataTheftRisk: "Data Theft Risk",
    maliciousCookies: "Malicious Cookies",
    detected: "DETECTED",
    clean: "CLEAN",
    safe: "SAFE",
    highRisk: "HIGH RISK",
    lowRisk: "LOW RISK",
    found: "FOUND",
    none: "NONE",
    sslSecurity: "SSL/TLS Security",
    sslEnabled: "SSL Enabled",
    certificateValid: "Certificate Valid",
    sslGrade: "SSL Grade",
    privacyAnalysis: "Privacy Analysis",
    trackersFound: "Trackers Found",
    cookies: "Cookies",
    dataCollection: "Data Collection:",
    detailedAnalysis: "Detailed Security Analysis",
    websiteScreenshot: "Website Screenshot",
    reportResult: "Report Result",
    disagreeWithResult: "Disagree with this result?",
    explainDisagreement: "Please explain why you disagree with this analysis:",
    submitReport: "Submit Report",
    cancel: "Cancel",
    reportSubmitted: "Report submitted successfully",
    aboutSecureCheck: "About SecureCheck",
    whatIsSecureCheck: "What is SecureCheck?",
    secureCheckDescription:
      "SecureCheck is an advanced URL security analyzer that helps protect users from malicious websites, data theft, and privacy violations. Our comprehensive analysis includes malware detection, phishing protection, privacy analysis, and SSL/TLS verification.",
    whyChooseSecureCheck: "Why choose SecureCheck?",
    whyChooseDescription:
      "• Real-time threat detection\n• Comprehensive privacy analysis\n• Easy-to-understand reports\n• Advanced SSL/TLS verification\n• No registration required",
    whatIsMaliciousLink: "What is a malicious link?",
    maliciousLinkDescription:
      "A malicious link is a URL that directs users to harmful websites designed to steal personal information, install malware, or perform other malicious activities. These links can appear in emails, messages, or websites and may look legitimate.",
    whyCheckLinks: "Why should you check links constantly?",
    whyCheckDescription:
      "Regular link checking is essential because:\n• Cyberthreats evolve constantly\n• New malicious websites appear daily\n• Legitimate websites can be compromised\n• Early detection prevents data theft\n• Protects your devices and personal information",
    // Textos del Index
    secureCheckTitle: "SecureCheck",
    secureCheckMainDescription:
      "Advanced URL security analyzer that identifies threats, malicious content, and data privacy risks",
  },
  es: {
    securityAnalysis: "Análisis de Seguridad de URL",
    analyze: "Analizar",
    analyzing: "Analizando...",
    enterUrl: "Ingrese URL para analizar (ej. https://ejemplo.com)",
    analysisComplete: "Análisis Completo",
    analysisFailed: "Análisis Fallido",
    securityScore: "Puntuación de Seguridad",
    analyzedUrl: "URL Analizada",
    threatDetection: "Detección de Amenazas",
    malwareDetection: "Detección de Malware",
    phishingAttempt: "Intento de Phishing",
    dataTheftRisk: "Riesgo de Robo de Datos",
    maliciousCookies: "Cookies Maliciosas",
    detected: "DETECTADO",
    clean: "LIMPIO",
    safe: "SEGURO",
    highRisk: "ALTO RIESGO",
    lowRisk: "BAJO RIESGO",
    found: "ENCONTRADO",
    none: "NINGUNO",
    sslSecurity: "Seguridad SSL/TLS",
    sslEnabled: "SSL Habilitado",
    certificateValid: "Certificado Válido",
    sslGrade: "Grado SSL",
    privacyAnalysis: "Análisis de Privacidad",
    trackersFound: "Rastreadores Encontrados",
    cookies: "Cookies",
    dataCollection: "Recolección de Datos:",
    detailedAnalysis: "Análisis Detallado de Seguridad",
    websiteScreenshot: "Captura del Sitio Web",
    reportResult: "Reportar Resultado",
    disagreeWithResult: "¿No está de acuerdo con este resultado?",
    explainDisagreement:
      "Por favor explique por qué no está de acuerdo con este análisis:",
    submitReport: "Enviar Reporte",
    cancel: "Cancelar",
    reportSubmitted: "Reporte enviado exitosamente",
    aboutSecureCheck: "Acerca de SecureCheck",
    whatIsSecureCheck: "¿Qué es SecureCheck?",
    secureCheckDescription:
      "SecureCheck es un analizador avanzado de seguridad de URL que ayuda a proteger a los usuarios de sitios web maliciosos, robo de datos y violaciones de privacidad.",
    whyChooseSecureCheck: "¿Por qué elegir SecureCheck?",
    whyChooseDescription:
      "• Detección de amenazas en tiempo real\n• Análisis integral de privacidad\n• Reportes fáciles de entender\n• Verificación avanzada SSL/TLS\n• No requiere registro",
    whatIsMaliciousLink: "¿Qué es un enlace malicioso?",
    maliciousLinkDescription:
      "Un enlace malicioso es una URL que dirige a los usuarios a sitios web dañinos diseñados para robar información personal, instalar malware o realizar otras actividades maliciosas.",
    whyCheckLinks: "¿Por qué debe verificar enlaces constantemente?",
    whyCheckDescription:
      "La verificación regular de enlaces es esencial porque:\n• Las amenazas cibernéticas evolucionan constantemente\n• Aparecen nuevos sitios web maliciosos diariamente\n• Los sitios web legítimos pueden ser comprometidos",
    // Textos del Index
    secureCheckTitle: "SecureCheck",
    secureCheckMainDescription:
      "Analizador avanzado de seguridad de URL que identifica amenazas, contenido malicioso y riesgos de privacidad de datos",
  },
};
