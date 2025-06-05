
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Lock, ExternalLink, Info, Camera } from 'lucide-react';
import { ReportDialog } from '@/components/ReportDialog';
import { useLanguage } from '@/hooks/useLanguage';

interface SecurityReportProps {
  report: {
    url: string;
    overallScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    isSecure: boolean;
    threats: {
      malware: { detected: boolean; details?: any };
      phishing: { detected: boolean; details?: any };
      dataTheft: { detected: boolean; details?: any };
      maliciousCookies: { detected: boolean; details?: any };
      unsafeDownloads: { detected: boolean; details?: any };
    };
    ssl: {
      enabled: boolean;
      valid: boolean;
      grade: string;
    };
    privacy: {
      trackers: number;
      cookieCount: number;
      dataCollection: string[];
    };
    details: {
      category: string;
      issue: string;
      severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
      description: string;
      explanation?: string;
      risks?: string[];
      targetedInfo?: string[];
      consequences?: string;
      dataCollected?: string[];
      impact?: string;
    }[];
  };
}

export const SecurityReport: React.FC<SecurityReportProps> = ({ report }) => {
  const { t } = useLanguage();
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-green-400 bg-green-400/20';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-400/20';
      case 'HIGH': return 'text-orange-400 bg-orange-400/20';
      case 'CRITICAL': return 'text-red-400 bg-red-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  // Generate screenshot URL - using a service like htmlcsstoimage or similar
  const getScreenshotUrl = (url: string) => {
    // In a real implementation, you would use a screenshot service API
    // For demo purposes, we'll use a placeholder service
    const encodedUrl = encodeURIComponent(url);
    return `https://api.screenshotmachine.com/?key=demo&url=${encodedUrl}&dimension=1024x768`;
  };

  return (
    <div className="space-y-6">
      {/* Overall Security Score */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              {report.isSecure ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <XCircle className="h-6 w-6 text-red-400" />
              )}
              {t('securityAnalysis')}
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getRiskColor(report.riskLevel)}>
                {report.riskLevel} RISK
              </Badge>
              <ReportDialog url={report.url} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">{t('securityScore')}</span>
                <span className={`font-bold ${getScoreColor(report.overallScore)}`}>
                  {report.overallScore}/100
                </span>
              </div>
              <Progress value={report.overallScore} className="h-3" />
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">{t('analyzedUrl')}</div>
              <div className="text-white font-mono text-sm flex items-center gap-2">
                {report.url}
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Website Screenshot */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Camera className="h-6 w-6 text-blue-400" />
            {t('websiteScreenshot')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <img
              src={getScreenshotUrl(report.url)}
              alt={`Screenshot of ${report.url}`}
              className="w-full max-w-2xl mx-auto rounded-lg border border-slate-600"
              onError={(e) => {
                // Fallback to placeholder if screenshot service fails
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23374151'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%23D1D5DB' font-family='Arial' font-size='18'%3EScreenshot not available%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="absolute top-2 right-2">
              <Badge className="bg-slate-700 text-slate-300">
                Live Preview
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Threat Detection Results */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="h-6 w-6 text-yellow-400" />
            {t('threatDetection')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <span className="text-slate-300">{t('malwareDetection')}</span>
              {report.threats.malware.detected ? (
                <Badge className="text-red-400 bg-red-400/20">{t('detected')}</Badge>
              ) : (
                <Badge className="text-green-400 bg-green-400/20">{t('clean')}</Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <span className="text-slate-300">{t('phishingAttempt')}</span>
              {report.threats.phishing.detected ? (
                <Badge className="text-red-400 bg-red-400/20">{t('detected')}</Badge>
              ) : (
                <Badge className="text-green-400 bg-green-400/20">{t('safe')}</Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <span className="text-slate-300">{t('dataTheftRisk')}</span>
              {report.threats.dataTheft.detected ? (
                <Badge className="text-red-400 bg-red-400/20">{t('highRisk')}</Badge>
              ) : (
                <Badge className="text-green-400 bg-green-400/20">{t('lowRisk')}</Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <span className="text-slate-300">{t('maliciousCookies')}</span>
              {report.threats.maliciousCookies.detected ? (
                <Badge className="text-red-400 bg-red-400/20">{t('found')}</Badge>
              ) : (
                <Badge className="text-green-400 bg-green-400/20">{t('none')}</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SSL/TLS Security and Privacy Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Lock className="h-6 w-6 text-blue-400" />
              {t('sslSecurity')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">{t('sslEnabled')}</span>
              {report.ssl.enabled ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">{t('certificateValid')}</span>
              {report.ssl.valid ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">{t('sslGrade')}</span>
              <Badge className={report.ssl.grade === 'A+' ? 'text-green-400 bg-green-400/20' : 'text-yellow-400 bg-yellow-400/20'}>
                {report.ssl.grade}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Eye className="h-6 w-6 text-purple-400" />
              {t('privacyAnalysis')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">{t('trackersFound')}</span>
              <Badge className={report.privacy.trackers > 5 ? 'text-red-400 bg-red-400/20' : 'text-green-400 bg-green-400/20'}>
                {report.privacy.trackers}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">{t('cookies')}</span>
              <Badge className="text-blue-400 bg-blue-400/20">
                {report.privacy.cookieCount}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-slate-300 text-sm">{t('dataCollection')}</span>
              <div className="flex flex-wrap gap-1">
                {report.privacy.dataCollection.map((item, index) => (
                  <Badge key={index} variant="outline" className="text-xs text-slate-400 border-slate-600">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Security Issues */}
      {report.details.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Info className="h-6 w-6 text-blue-400" />
              {t('detailedAnalysis')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {report.details.map((detail, index) => (
                <div key={index} className="p-6 bg-slate-700 rounded-lg border-l-4 border-orange-400">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white text-lg">{detail.issue}</h4>
                    <Badge className={getRiskColor(detail.severity)}>
                      {detail.severity}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-slate-300 mb-2">What this means:</h5>
                      <p className="text-slate-200 text-sm leading-relaxed">{detail.description}</p>
                    </div>
                    
                    {detail.explanation && (
                      <div>
                        <h5 className="text-sm font-medium text-slate-300 mb-2">Why this matters:</h5>
                        <p className="text-slate-200 text-sm leading-relaxed">{detail.explanation}</p>
                      </div>
                    )}
                    
                    {detail.risks && detail.risks.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-slate-300 mb-2">Potential risks:</h5>
                        <ul className="list-disc list-inside text-slate-200 text-sm space-y-1">
                          {detail.risks.map((risk, riskIndex) => (
                            <li key={riskIndex}>{risk}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {detail.targetedInfo && detail.targetedInfo.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-slate-300 mb-2">Information being targeted:</h5>
                        <ul className="list-disc list-inside text-slate-200 text-sm space-y-1">
                          {detail.targetedInfo.map((info, infoIndex) => (
                            <li key={infoIndex}>{info}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {detail.dataCollected && detail.dataCollected.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-slate-300 mb-2">Data being collected:</h5>
                        <ul className="list-disc list-inside text-slate-200 text-sm space-y-1">
                          {detail.dataCollected.map((data, dataIndex) => (
                            <li key={dataIndex}>{data}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {detail.consequences && (
                      <div>
                        <h5 className="text-sm font-medium text-slate-300 mb-2">What could happen:</h5>
                        <p className="text-slate-200 text-sm leading-relaxed">{detail.consequences}</p>
                      </div>
                    )}
                    
                    <div className="pt-2 border-t border-slate-600">
                      <p className="text-slate-400 text-xs">Category: {detail.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
