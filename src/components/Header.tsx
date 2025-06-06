import React from "react";
import { Shield } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">SecureCheck</h1>
                <p className="text-sm text-slate-400">URL Security Analyzer</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};
