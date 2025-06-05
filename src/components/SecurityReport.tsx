
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Cookie, Lock, Globe, ExternalLink } from 'lucide-react';

interface SecurityReportProps {
  report: {
    url: string;
    overallScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    isSecure: boolean;
    threats: {
      malware: boolean;
      phishing: boolean;
      dataTheft: boolean;
      maliciousCookies: boolean;
      unsafeDownloads: boolean;
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
    }[];
  };
}

export const SecurityReport: React.FC<SecurityReportProps> = ({ report }) => {
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
              Security Analysis Report
            </div>
            <Badge className={getRiskColor(report.riskLevel)}>
              {report.riskLevel} RISK
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Security Score</span>
                <span className={`font-bold ${getScoreColor(report.overallScore)}`}>
                  {report.overallScore}/100
                </span>
              </div>
              <Progress value={report.overallScore} className="h-3" />
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Analyzed URL</div>
              <div className="text-white font-mono text-sm flex items-center gap-2">
                {report.url}
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Threat Detection Results */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="h-6 w-6 text-yellow-400" />
            Threat Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <span className="text-slate-300">Malware Detection</span>
              {report.threats.malware ? (
                <Badge className="text-red-400 bg-red-400/20">DETECTED</Badge>
              ) : (
                <Badge className="text-green-400 bg-green-400/20">CLEAN</Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <span className="text-slate-300">Phishing Attempt</span>
              {report.threats.phishing ? (
                <Badge className="text-red-400 bg-red-400/20">DETECTED</Badge>
              ) : (
                <Badge className="text-green-400 bg-green-400/20">SAFE</Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <span className="text-slate-300">Data Theft Risk</span>
              {report.threats.dataTheft ? (
                <Badge className="text-red-400 bg-red-400/20">HIGH RISK</Badge>
              ) : (
                <Badge className="text-green-400 bg-green-400/20">LOW RISK</Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <span className="text-slate-300">Malicious Cookies</span>
              {report.threats.maliciousCookies ? (
                <Badge className="text-red-400 bg-red-400/20">FOUND</Badge>
              ) : (
                <Badge className="text-green-400 bg-green-400/20">NONE</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SSL/TLS Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Lock className="h-6 w-6 text-blue-400" />
              SSL/TLS Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">SSL Enabled</span>
              {report.ssl.enabled ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Certificate Valid</span>
              {report.ssl.valid ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">SSL Grade</span>
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
              Privacy Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Trackers Found</span>
              <Badge className={report.privacy.trackers > 5 ? 'text-red-400 bg-red-400/20' : 'text-green-400 bg-green-400/20'}>
                {report.privacy.trackers}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Cookies</span>
              <Badge className="text-blue-400 bg-blue-400/20">
                {report.privacy.cookieCount}
              </Badge>
            </div>
            <div className="space-y-1">
              <span className="text-slate-300 text-sm">Data Collection:</span>
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

      {/* Detailed Issues */}
      {report.details.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="h-6 w-6 text-orange-400" />
              Detailed Security Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {report.details.map((detail, index) => (
                <div key={index} className="p-4 bg-slate-700 rounded-lg border-l-4 border-orange-400">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{detail.issue}</h4>
                    <Badge className={getRiskColor(detail.severity)}>
                      {detail.severity}
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm mb-1">{detail.description}</p>
                  <p className="text-slate-400 text-xs">Category: {detail.category}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
