'use client';

import React from 'react';
import { Flame, Sparkles, Smartphone, ArrowLeft } from 'lucide-react';

interface IOSTopBarProps {
  title?: string;
  subtitle?: string;
  streak: number;
  xp: number;
  showBack?: boolean;
  onBack?: () => void;
  onOpenInstallModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const IOSTopBar: React.FC<IOSTopBarProps> = ({
  title,
  subtitle,
  streak,
  xp,
  showBack,
  onBack,
  onOpenInstallModal,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-[#1C1C1E]/85 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand or Back Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          {showBack ? (
            <button
              onClick={onBack}
              aria-label="Voltar"
              className="flex items-center gap-1 text-sm font-medium text-[#007AFF] hover:opacity-80 active:scale-95 transition-all min-h-[44px] pr-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#007AFF] to-[#0055D4] flex items-center justify-center text-white font-bold text-sm shadow-xs">
                한
              </div>
              <div className="leading-tight">
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white block">
                  HangulTalk
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Center: Desktop Navigation Links / Mobile Title */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setActiveTab('conversas')}
            className={`text-sm font-medium transition-colors whitespace-nowrap min-h-[44px] flex items-center ${
              activeTab === 'conversas'
                ? 'text-[#007AFF] font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Diálogos
          </button>
          <button
            onClick={() => setActiveTab('hangul')}
            className={`text-sm font-medium transition-colors whitespace-nowrap min-h-[44px] flex items-center ${
              activeTab === 'hangul'
                ? 'text-[#007AFF] font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Guia Hangul
          </button>
          <button
            onClick={() => setActiveTab('pratica')}
            className={`text-sm font-medium transition-colors whitespace-nowrap min-h-[44px] flex items-center ${
              activeTab === 'pratica'
                ? 'text-[#007AFF] font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Frases do Dia
          </button>
          <button
            onClick={() => setActiveTab('perfil')}
            className={`text-sm font-medium transition-colors whitespace-nowrap min-h-[44px] flex items-center ${
              activeTab === 'perfil'
                ? 'text-[#007AFF] font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Meu Progresso
          </button>
        </div>

        {/* Mobile Center Title if in a detail sub-view */}
        {title && (
          <div className="md:hidden flex-1 text-center truncate px-2">
            <h1 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Right: Gamification Badges & PWA Install Button */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Streak Flame */}
          <div
            title="Dias seguidos de treino"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-semibold"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="tabular-nums">{streak} d</span>
          </div>

          {/* XP Score */}
          <div
            title="Pontos de experiência"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#007AFF] text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
            <span className="tabular-nums">{xp} XP</span>
          </div>

          {/* Install on iPhone Button */}
          <button
            onClick={onOpenInstallModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 active:scale-95 transition min-h-[36px]"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>App no iPhone</span>
          </button>
        </div>
      </div>
    </header>
  );
};
