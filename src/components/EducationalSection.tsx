
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Eye, Info } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const EducationalSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white text-center mb-8">{t('aboutSecureCheck')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-6 w-6 text-blue-400" />
              {t('whatIsSecureCheck')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('secureCheckDescription')}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Eye className="h-6 w-6 text-green-400" />
              {t('whyChooseSecureCheck')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {t('whyChooseDescription')}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              {t('whatIsMaliciousLink')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('maliciousLinkDescription')}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Info className="h-6 w-6 text-purple-400" />
              {t('whyCheckLinks')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {t('whyCheckDescription')}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
