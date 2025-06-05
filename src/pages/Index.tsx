
import React from 'react';
import { SecurityAnalyzer } from '@/components/SecurityAnalyzer';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Analytics } from '@/components/Analytics';
import { ApiDocumentation } from '@/components/ApiDocumentation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            SecureCheck
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Advanced URL security analyzer that identifies threats, malicious content, and data privacy risks
          </p>
        </div>
        <SecurityAnalyzer />
      </main>
      <Footer />
      <Analytics />
      <ApiDocumentation />
    </div>
  );
};

export default Index;
