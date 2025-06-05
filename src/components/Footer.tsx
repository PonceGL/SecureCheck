
import React from 'react';
import { Shield, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">SecureCheck</span>
            </div>
            <p className="text-slate-400 text-sm">
              Advanced URL security analysis to protect users from malicious websites, 
              data theft, and privacy violations.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Security Features</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Malware Detection</li>
              <li>• Phishing Protection</li>
              <li>• Privacy Analysis</li>
              <li>• SSL/TLS Verification</li>
              <li>• Cookie Inspection</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <p className="text-slate-400 text-sm mb-4">
              SecureCheck helps users identify potential security threats and privacy risks 
              before visiting websites.
            </p>
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>for web security</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 SecureCheck. Protecting users from web threats.
          </p>
        </div>
      </div>
    </footer>
  );
};
