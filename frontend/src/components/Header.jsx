import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded">
            ISO/IEC 27001:2022 — Control A.8.28
          </span>
          <h1 className="text-xl font-bold text-gray-100 mt-1">
            Laboratorio de Falsificación de Peticiones en Sitios Cruzados (CSRF)
          </h1>
        </div>

        {/* Selector de módulos */}
        <nav className="flex bg-gray-950 p-1 rounded-lg border border-gray-800">
          <button
            onClick={() => setActiveTab('vulnerable')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'vulnerable'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            1. Modo Vulnerable
          </button>

          <button
            onClick={() => setActiveTab('secure')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'secure'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            2. Modo Seguro (Anti-CSRF Token)
          </button>
        </nav>
      </div>
    </header>
  );
};