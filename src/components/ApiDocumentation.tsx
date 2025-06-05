
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ApiDocumentation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const exampleRequest = `curl -X POST "${window.location.origin}/api/analyze" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com"}'`;

  const exampleResponse = `{
  "success": true,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "data": {
    "url": "https://example.com",
    "overallScore": 85,
    "riskLevel": "LOW",
    "isSecure": true,
    "threats": {
      "malware": { "detected": false },
      "phishing": { "detected": false },
      "dataTheft": { "detected": false },
      "maliciousCookies": { "detected": false },
      "unsafeDownloads": { "detected": false }
    },
    "ssl": {
      "enabled": true,
      "valid": true,
      "grade": "A+"
    },
    "privacy": {
      "trackers": 3,
      "cookieCount": 5,
      "dataCollection": ["Personal Info", "Cookies"]
    },
    "details": []
  }
}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="text-slate-400 border-slate-600"
        >
          <Code className="h-4 w-4 mr-2" />
          API Docs
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">API Documentation</h2>
            <Button
              onClick={() => setIsVisible(false)}
              variant="outline"
              size="sm"
            >
              Close
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Endpoint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-300 mb-2">POST /api/analyze</p>
                    <p className="text-slate-400 text-sm">
                      Analyzes a URL for security threats, privacy risks, and SSL/TLS configuration.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Request Body</h4>
                    <pre className="bg-slate-800 p-3 rounded text-sm text-slate-300 overflow-x-auto">
{`{
  "url": "https://example.com"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  Example Request
                  <Button
                    onClick={() => copyToClipboard(exampleRequest)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-800 p-3 rounded text-sm text-slate-300 overflow-x-auto">
                  {exampleRequest}
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  Example Response
                  <Button
                    onClick={() => copyToClipboard(exampleResponse)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-800 p-3 rounded text-sm text-slate-300 overflow-x-auto">
                  {exampleResponse}
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Response Fields</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-blue-400 font-mono">overallScore</span>
                    <span className="text-slate-300"> - Security score from 0-100</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-mono">riskLevel</span>
                    <span className="text-slate-300"> - Risk level: LOW, MEDIUM, HIGH, CRITICAL</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-mono">threats</span>
                    <span className="text-slate-300"> - Detected security threats</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-mono">ssl</span>
                    <span className="text-slate-300"> - SSL/TLS certificate information</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-mono">privacy</span>
                    <span className="text-slate-300"> - Privacy analysis results</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
