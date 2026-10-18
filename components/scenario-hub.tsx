'use client';

import React, { useState } from 'react';
import { SCENARIOS, Scenario } from '@/lib/korean-data';
import { Play, Sparkles, MapPin, ChevronRight } from 'lucide-react';

interface ScenarioHubProps {
  onSelectScenario: (scenario: Scenario) => void;
  completedScenarioIds: string[];
}

export const ScenarioHub: React.FC<ScenarioHubProps> = ({
  onSelectScenario,
  completedScenarioIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos os Diálogos' },
    { id: 'dia-a-dia', label: 'Dia a Dia' },
    { id: 'compras', label: 'Lojas & Café' },
    { id: 'viagem', label: 'Transporte & Metrô' },
    { id: 'social', label: 'Amizades' },
  ];

  const filteredScenarios = SCENARIOS.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 space-y-6">
      {/* Hero Banner with Korean Aesthetic */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#007AFF] via-[#0055D4] to-[#1C1C1E] p-6 text-white shadow-sm">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Versão Beta · Foco em Pronúncia</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Fale Coreano no iPhone
          </h2>
          <p className="text-white/85 text-sm leading-relaxed max-w-md">
            Pratique conversações reais com áudio nativo e receba feedback fonético em tempo real usando o ditado de voz.
          </p>
        </div>

        {/* Decorative Hangul Watermark Graphic in Background */}
        <div className="absolute -right-6 -bottom-8 select-none pointer-events-none opacity-15 font-black text-9xl text-white">
          한글
        </div>
      </div>

      {/* Category Segmented Control (Functional Buttons as per Frontend Design Guidelines) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition active:scale-95 min-h-[38px] ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-[#1C1C1E] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Scenarios List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>{filteredScenarios.length} situações disponíveis</span>
          <span>Nível Iniciante A1</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-1">
          {filteredScenarios.map((scenario) => {
            const isCompleted = completedScenarioIds.includes(scenario.id);

            return (
              <div
                key={scenario.id}
                onClick={() => onSelectScenario(scenario)}
                className="group relative bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 border border-black/[0.06] dark:border-white/[0.08] shadow-xs hover:border-[#007AFF]/40 transition active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    {/* Emoji Card Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition">
                      {scenario.badgeEmoji}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#007AFF] transition">
                          {scenario.title}
                        </h3>
                        {isCompleted && (
                          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                            ✓ Feito
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-[#007AFF] mb-1.5">
                        {scenario.koreanTitle}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        {scenario.description}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{scenario.location}</span>
                        </span>
                        <span>·</span>
                        <span>{scenario.dialogue.length} turnos de fala</span>
                      </div>
                    </div>
                  </div>

                  {/* Play Action Trigger */}
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-[#007AFF] flex items-center justify-center shrink-0 group-hover:bg-[#007AFF] group-hover:text-white transition shadow-xs">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
