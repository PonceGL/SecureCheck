
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Shield, Eye, Cookie, Lock } from 'lucide-react';
import { SecurityReport } from '@/components/SecurityReport';
import { EducationalSection } from '@/components/EducationalSection';
import { analyzeUrlSecurity } from '@/utils/securityAnalyzer';
import { useLanguage } from '@/hooks/useLanguage';

export const SecurityAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Analytics tracking
  useEffect(() => {
    // Track page visit
    trackAnalytics();
    
    // Track time spent on site
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Date.now() - startTime;
      trackEvent('session_duration', { duration: timeSpent });
    };
  }, []);

  const trackAnalytics = () => {
    const analytics = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      deviceType: getDeviceType(),
      browser: getBrowser(),
      userId: getUserId(),
      referrer: document.referrer,
      url: window.location.href,
      event: 'page_visit'
    };

    // Store in localStorage for now (in production, send to analytics service)
    const storedAnalytics = JSON.parse(localStorage.getItem('securecheck_analytics') || '[]');
    storedAnalytics.push(analytics);
    localStorage.setItem('securecheck_analytics', JSON.stringify(storedAnalytics));
    
    console.log('Analytics tracked:', analytics);
  };

  const trackEvent = (event: string, data: any = {}) => {
    const analytics = {
      timestamp: new Date().toISOString(),
      userId: getUserId(),
      event,
      data,
      url: window.location.href
    };

    const storedAnalytics = JSON.parse(localStorage.getItem('securecheck_analytics') || '[]');
    storedAnalytics.push(analytics);
    localStorage.setItem('securecheck_analytics', JSON.stringify(storedAnalytics));
  };

  const getDeviceType = () => {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';
    return 'desktop';
  };

  const getBrowser = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  };

  const getUserId = () => {
    let userId = localStorage.getItem('securecheck_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('securecheck_user_id', userId);
    }
    return userId;
  };

  const handleAnalyze = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL to analyze",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(url);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
      return;
    }

    trackEvent('analysis_started', { url });

    setIsAnalyzing(true);
    setProgress(0);
    setReport(null);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      console.log('Starting security analysis for:', url);
      const analysisResult = await analyzeUrlSecurity(url);
      
      setProgress(100);
      setTimeout(() => {
        setReport(analysisResult);
        setIsAnalyzing(false);
        
        trackEvent('analysis_completed', { 
          url, 
          score: analysisResult.overallScore,
          riskLevel: analysisResult.riskLevel 
        });
        
        toast({
          title: t('analysisComplete'),
          description: `Security scan completed for ${url}`,
        });
      }, 500);
      
    } catch (error) {
      console.error('Security analysis failed:', error);
      setIsAnalyzing(false);
      setProgress(0);
      
      trackEvent('analysis_failed', { url, error: error.message });
      
      toast({
        title: t('analysisFailed'),
        description: "Unable to complete security analysis. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAnalyzeNew = () => {
    setUrl('');
    setReport(null);
    setProgress(0);
    trackEvent('analyze_new_clicked');
  };

  // Track clicks
  const handleClick = (element: string) => {
    trackEvent('click', { element });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* URL Input Section */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="h-6 w-6 text-blue-400" />
            {t('securityAnalysis')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder={t('enterUrl')}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              disabled={isAnalyzing}
              onFocus={() => handleClick('url_input')}
            />
            <Button 
              onClick={() => {
                handleClick('analyze_button');
                handleAnalyze();
              }}
              disabled={isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              {isAnalyzing ? t('analyzing') : t('analyze')}
            </Button>
          </div>
          
          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Analyzing security threats...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Features Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700" onClick={() => handleClick('feature_malware')}>
          <CardContent className="p-6 text-center cursor-pointer">
            <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">{t('malwareDetection')}</h3>
            <p className="text-sm text-slate-400">Scans for malicious scripts and downloads</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700" onClick={() => handleClick('feature_privacy')}>
          <CardContent className="p-6 text-center cursor-pointer">
            <Eye className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">{t('privacyAnalysis')}</h3>
            <p className="text-sm text-slate-400">Checks for data tracking and collection</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700" onClick={() => handleClick('feature_cookies')}>
          <CardContent className="p-6 text-center cursor-pointer">
            <Cookie className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Cookie Inspection</h3>
            <p className="text-sm text-slate-400">Analyzes cookies for suspicious behavior</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700" onClick={() => handleClick('feature_ssl')}>
          <CardContent className="p-6 text-center cursor-pointer">
            <Lock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">SSL/TLS Check</h3>
            <p className="text-sm text-slate-400">Verifies encryption and certificates</p>
          </CardContent>
        </Card>
      </div>

      {/* Security Report */}
      {report && <SecurityReport report={report} onAnalyzeNew={handleAnalyzeNew} />}
      
      {/* Educational Section */}
      <EducationalSection />
    </div>
  );
};
