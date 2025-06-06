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
    analyzingSecurityThreats: "Analyzing security threats...",
    malwareDetectionDescription: "Scans for malicious scripts and downloads",
    privacyAnalysisDescription: "Checks for data tracking and collection",
    cookieInspection: "Cookie Inspection",
    cookieInspectionDescription: "Analyzes cookies for suspicious behavior",
    sslTlsCheck: "SSL/TLS Check",
    sslTlsCheckDescription: "Verifies encryption and certificates",
    error: "Error",
    enterUrlToAnalyze: "Please enter a URL to analyze",
    invalidUrl: "Invalid URL",
    enterValidUrl: "Please enter a valid URL (e.g., https://example.com)",
    securityScanCompleted: "Security scan completed for {url}",
    unableToCompleteAnalysis:
      "Unable to complete security analysis. Please try again.",
    risk: "RISK",
    screenshotAlt: "Screenshot of {url}",
    livePreview: "Live Preview",
    whatThisMeans: "What this means:",
    whyThisMatters: "Why this matters:",
    potentialRisks: "Potential risks:",
    targetedInformation: "Information being targeted:",
    dataBeingCollected: "Data being collected:",
    whatCouldHappen: "What could happen:",
    category: "Category",
    shareTitle: "Security Report for {url}",
    shareText: "Security analysis result: {score}/100",
    linkCopied: "Link Copied!",
    linkCopiedDescription:
      "The shareable URL has been copied to your clipboard.",
    copyFailed: "Copy Failed",
    copyFailedDescription: "Unable to copy to clipboard. Please copy manually.",
    analyzeNewUrl: "Analyze New URL",
    shareResult: "Share Result",
    sharedReport: "Shared Security Report",
    invalidReport: "Invalid or corrupted report",
    security: {
      malware: {
        trojan: "Trojan Horse",
        trojanDesc:
          "This website may try to install software that looks harmless but secretly steals your personal information like passwords, credit card numbers, or private photos.",
        spyware: "Spyware",
        spywareDesc:
          "This website contains software that watches what you do on your computer and sends that information to criminals without your permission.",
        ransomware: "Ransomware",
        ransomwareDesc:
          "This website may install software that locks your computer files and demands money to unlock them.",
        botnet: "Botnet Malware",
        botnetDesc:
          "This website may secretly use your computer to send spam emails or attack other websites without you knowing.",
        risks: {
          identity: "Identity theft",
          financial: "Financial loss",
          privacy: "Privacy invasion",
          data: "Personal data theft",
          keystroke: "Keystroke logging",
          screen: "Screen monitoring",
          encryption: "File encryption",
          extortion: "Financial extortion",
          unauthorized: "Unauthorized computer use",
          performance: "Slow performance",
          legal: "Legal liability",
        },
      },
      phishing: {
        banking: "Banking Fraud",
        bankingDesc:
          "This website is pretending to be your bank to steal your login details and empty your bank account.",
        social: "Social Media Impersonation",
        socialDesc:
          "This website looks like a popular social media site but is fake, designed to steal your login information.",
        shopping: "Shopping Scam",
        shoppingDesc:
          "This website pretends to sell products but will steal your credit card information and never send you anything.",
        email: "Email Account Theft",
        emailDesc:
          "This website is designed to look like your email provider to steal your email password.",
      },
      dataTheft: {
        personal: "Personal Information Harvesting",
        personalDesc:
          "This website collects way more personal information than it needs and may sell it to other companies without telling you.",
        financial: "Financial Data Mining",
        financialDesc:
          "This website tries to gather information about your income, spending habits, and financial situation.",
        behavioral: "Behavioral Tracking",
        behavioralDesc:
          "This website secretly tracks everything you do online to build a detailed profile about you.",
      },
      cookies: {
        tracking: "Tracking Cookies",
        trackingDesc:
          "This website places invisible trackers on your computer that follow you around the internet to see what you do.",
        crossSite: "Cross-Site Tracking",
        crossSiteDesc:
          "This website shares your information with many other websites so they can all track you together.",
        persistent: "Persistent Tracking",
        persistentDesc:
          "This website uses advanced techniques to track you even when you try to delete cookies or use private browsing.",
      },
      downloads: {
        fake: "Fake Software Downloads",
        fakeDesc:
          "This website offers downloads that look like legitimate software but actually contain harmful programs.",
        bundled: "Bundled Malware",
        bundledDesc:
          "Downloads from this website come with hidden malicious software that installs automatically.",
        corrupted: "Corrupted Files",
        corruptedDesc:
          "This website provides downloads that may be infected or modified to harm your computer.",
      },
      categories: {
        malware: "Malware",
        phishing: "Phishing",
        encryption: "Encryption",
        privacy: "Privacy",
        tracking: "Tracking",
        cookies: "Cookies",
        downloads: "Downloads",
      },
      issues: {
        detected: "{type} Detected",
        attempt: "{type} Attempt",
        noProtection: "No Security Protection",
        surveillance: "Heavy Online Surveillance",
      },
      explanations: {
        dangerous:
          "This is extremely dangerous because it could lead to: {risks}. You should never visit this website.",
        phishing:
          "This website is trying to trick you into giving away: {info}. {consequences}",
        encryption:
          "Think of it like sending a postcard instead of a sealed letter - anyone who intercepts it can read your passwords, personal information, or credit card numbers.",
        dataCollection: "This website collects: {data}. {risks}",
        tracking:
          "Imagine having multiple people following you around all day, writing down everything you do. That's what these trackers do online - they watch where you go, what you click, and how long you stay on pages.",
        cookies:
          "{risk} This means companies know more about you than you might be comfortable with.",
        downloads: "{warning} Avoid downloading anything from this website.",
      },
    },
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
    analyzingSecurityThreats: "Analizando amenazas de seguridad...",
    malwareDetectionDescription: "Escanea scripts y descargas maliciosas",
    privacyAnalysisDescription:
      "Verifica el seguimiento y recopilación de datos",
    cookieInspection: "Inspección de Cookies",
    cookieInspectionDescription:
      "Analiza cookies por comportamiento sospechoso",
    sslTlsCheck: "Verificación SSL/TLS",
    sslTlsCheckDescription: "Verifica el cifrado y certificados",
    error: "Error",
    enterUrlToAnalyze: "Por favor ingrese una URL para analizar",
    invalidUrl: "URL inválida",
    enterValidUrl: "Por favor ingrese una URL válida (ej. https://ejemplo.com)",
    securityScanCompleted: "Análisis de seguridad completado para {url}",
    unableToCompleteAnalysis:
      "No se pudo completar el análisis de seguridad. Por favor intente nuevamente.",
    risk: "RIESGO",
    screenshotAlt: "Captura de pantalla de {url}",
    livePreview: "Vista Previa",
    whatThisMeans: "Qué significa esto:",
    whyThisMatters: "Por qué es importante:",
    potentialRisks: "Riesgos potenciales:",
    targetedInformation: "Información siendo objetivo:",
    dataBeingCollected: "Datos siendo recolectados:",
    whatCouldHappen: "Qué podría suceder:",
    category: "Categoría",
    shareTitle: "Reporte de Seguridad para {url}",
    shareText: "Resultado del análisis de seguridad: {score}/100",
    linkCopied: "¡Enlace Copiado!",
    linkCopiedDescription:
      "La URL compartible ha sido copiada al portapapeles.",
    copyFailed: "Error al Copiar",
    copyFailedDescription:
      "No se pudo copiar al portapapeles. Por favor copie manualmente.",
    analyzeNewUrl: "Analizar Nueva URL",
    shareResult: "Compartir Resultado",
    sharedReport: "Reporte de Seguridad Compartido",
    invalidReport: "Reporte inválido o corrupto",
    security: {
      malware: {
        trojan: "Caballo de Troya",
        trojanDesc:
          "Este sitio web puede intentar instalar software que parece inofensivo pero que secretamente roba su información personal como contraseñas, números de tarjetas de crédito o fotos privadas.",
        spyware: "Software Espía",
        spywareDesc:
          "Este sitio web contiene software que observa lo que hace en su computadora y envía esa información a criminales sin su permiso.",
        ransomware: "Ransomware",
        ransomwareDesc:
          "Este sitio web puede instalar software que bloquea los archivos de su computadora y exige dinero para desbloquearlos.",
        botnet: "Malware Botnet",
        botnetDesc:
          "Este sitio web puede usar secretamente su computadora para enviar correos electrónicos no deseados o atacar otros sitios web sin que usted lo sepa.",
        risks: {
          identity: "Robo de identidad",
          financial: "Pérdida financiera",
          privacy: "Invasión de privacidad",
          data: "Robo de datos personales",
          keystroke: "Registro de pulsaciones",
          screen: "Monitoreo de pantalla",
          encryption: "Encriptación de archivos",
          extortion: "Extorsión financiera",
          unauthorized: "Uso no autorizado de la computadora",
          performance: "Rendimiento lento",
          legal: "Responsabilidad legal",
        },
      },
      phishing: {
        banking: "Fraude Bancario",
        bankingDesc:
          "Este sitio web se hace pasar por su banco para robar sus datos de inicio de sesión y vaciar su cuenta bancaria.",
        social: "Suplantación de Redes Sociales",
        socialDesc:
          "Este sitio web parece una red social popular pero es falso, diseñado para robar su información de inicio de sesión.",
        shopping: "Estafa de Compras",
        shoppingDesc:
          "Este sitio web finge vender productos pero robará la información de su tarjeta de crédito y nunca le enviará nada.",
        email: "Robo de Cuenta de Correo",
        emailDesc:
          "Este sitio web está diseñado para parecer su proveedor de correo electrónico para robar su contraseña.",
      },
      dataTheft: {
        personal: "Recolección de Información Personal",
        personalDesc:
          "Este sitio web recopila mucha más información personal de la necesaria y puede venderla a otras empresas sin informarle.",
        financial: "Minería de Datos Financieros",
        financialDesc:
          "Este sitio web intenta recopilar información sobre sus ingresos, hábitos de gasto y situación financiera.",
        behavioral: "Seguimiento de Comportamiento",
        behavioralDesc:
          "Este sitio web rastrea secretamente todo lo que hace en línea para crear un perfil detallado sobre usted.",
      },
      cookies: {
        tracking: "Cookies de Rastreo",
        trackingDesc:
          "Este sitio web coloca rastreadores invisibles en su computadora que lo siguen por Internet para ver lo que hace.",
        crossSite: "Rastreo Entre Sitios",
        crossSiteDesc:
          "Este sitio web comparte su información con muchos otros sitios web para que todos puedan rastrearlo juntos.",
        persistent: "Rastreo Persistente",
        persistentDesc:
          "Este sitio web utiliza técnicas avanzadas para rastrearlo incluso cuando intenta eliminar cookies o usar navegación privada.",
      },
      downloads: {
        fake: "Descargas de Software Falso",
        fakeDesc:
          "Este sitio web ofrece descargas que parecen software legítimo pero que en realidad contienen programas dañinos.",
        bundled: "Malware Incluido",
        bundledDesc:
          "Las descargas de este sitio web vienen con software malicioso oculto que se instala automáticamente.",
        corrupted: "Archivos Corruptos",
        corruptedDesc:
          "Este sitio web proporciona descargas que pueden estar infectadas o modificadas para dañar su computadora.",
      },
      categories: {
        malware: "Malware",
        phishing: "Phishing",
        encryption: "Encriptación",
        privacy: "Privacidad",
        tracking: "Rastreo",
        cookies: "Cookies",
        downloads: "Descargas",
      },
      issues: {
        detected: "{type} Detectado",
        attempt: "Intento de {type}",
        noProtection: "Sin Protección de Seguridad",
        surveillance: "Vigilancia Online Severa",
      },
      explanations: {
        dangerous:
          "Esto es extremadamente peligroso porque puede llevar a: {risks}. Nunca debe visitar este sitio web.",
        phishing:
          "Este sitio web está intentando engañarlo para que proporcione: {info}. {consequences}",
        encryption:
          "Piense en ello como enviar una postal en lugar de una carta sellada - cualquiera que la intercepte puede leer sus contraseñas, información personal o números de tarjetas de crédito.",
        dataCollection: "Este sitio web recopila: {data}. {risks}",
        tracking:
          "Imagine tener múltiples personas siguiéndolo todo el día, anotando todo lo que hace. Eso es lo que hacen estos rastreadores en línea - observan a dónde va, en qué hace clic y cuánto tiempo permanece en las páginas.",
        cookies:
          "{risk} Esto significa que las empresas saben más sobre usted de lo que podría ser cómodo.",
        downloads:
          "{warning} Evite descargar cualquier cosa de este sitio web.",
      },
    },
  },
};
