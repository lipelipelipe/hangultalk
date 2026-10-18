'use client';

import React from 'react';
import { MessageSquare, BookOpen, Zap, User } from 'lucide-react';

interface IOSBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const IOSBottomNav: React.FC<IOSBottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: 'conversas',
      label: 'Diálogos',
      icon: MessageSquare,
    },
    {
      id: 'hangul',
      label: 'Guia Hangul',
      icon: BookOpen,
    },
    {
      id: 'pratica',
      label: 'Frases Diárias',
      icon: Zap,
    },
    {
      id: 'perfil',
      label: 'Meu Perfil',
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="Navegação inferior principal"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/92 dark:bg-[#1C1C1E]/92 backdrop-blur-xl border-t border-black/[0.08] dark:border-white/[0.08] pb-safe"
    >
      <div className="grid grid-cols-4 items-center h-14 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center justify-center h-full min-h-[44px] transition-transform active:scale-95 group focus:outline-hidden"
            >
              <div
                className={`transition-colors duration-150 ${
                  isActive ? 'text-[#007AFF]' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 transition-colors duration-150 ${
                  isActive
                    ? 'font-semibold text-[#007AFF]'
                    : 'font-normal text-slate-500 dark:text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
