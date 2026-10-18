'use client';

import React from 'react';
import {
  Flame,
  Sparkles,
  Trophy,
  Smartphone,
  Volume2,
  CheckCircle2,
  Share2,
  RotateCcw
} from 'lucide-react';
import { useKoreanTTS } from '@/hooks/use-korean-tts';

interface UserProfileViewProps {
  streak: number;
  xp: number;
  completedScenariosCount: number;
  onOpenInstallModal: () => void;
  onResetProgress: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  streak,
  xp,
  completedScenariosCount,
  onOpenInstallModal,
  onResetProgress,
}) => {
  const { speak, isPlaying } = useKoreanTTS();

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 border border-black/[0.06] dark:border-white/[0.08] shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#007AFF] to-[#34C759] flex items-center justify-center text-3xl shadow-sm">
          🇰🇷
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Estudante de Coreano
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Focado em Conversação & Pronúncia Prática
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 border border-black/[0.06] dark:border-white/[0.08] shadow-xs flex flex-col items-center text-center">
          <Flame className="w-6 h-6 text-amber-500 fill-amber-500 mb-1" />
          <span className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            {streak}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Dias Seguidos</span>
        </div>

        <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 border border-black/[0.06] dark:border-white/[0.08] shadow-xs flex flex-col items-center text-center">
          <Sparkles className="w-6 h-6 text-[#007AFF] mb-1" />
          <span className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            {xp}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Pontos XP</span>
        </div>

        <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 border border-black/[0.06] dark:border-white/[0.08] shadow-xs flex flex-col items-center text-center">
          <Trophy className="w-6 h-6 text-emerald-500 mb-1" />
          <span className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            {completedScenariosCount}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Diálogos Feitos</span>
        </div>
      </div>

      {/* iPhone PWA Native Experience Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-3xl p-5 border border-blue-200/50 dark:border-blue-900/40">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#007AFF] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Usar como App Nativo no iPhone
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Fixe o HangulTalk na Tela de Início do seu iPhone para remover barras de navegação do Safari e ter acesso direto com tela cheia.
            </p>
            <button
              onClick={onOpenInstallModal}
              className="py-2.5 px-4 rounded-xl bg-[#007AFF] text-white text-xs font-semibold hover:bg-blue-600 active:scale-95 transition shadow-xs flex items-center gap-1.5 min-h-[40px]"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Ver Guia de Instalação no iPhone</span>
            </button>
          </div>
        </div>
      </div>

      {/* Test Native Voice */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
          Teste do Mecanismo de Voz Nativo (ko-KR)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          O app utiliza a síntese de voz nativa da Apple / navegador com sotaque de Seul.
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => speak('안녕하세요! 만나서 반갑습니다.')}
            className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-200 active:scale-95 transition"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#007AFF]" />
            <span>Testar Frase Padrão</span>
          </button>

          <button
            onClick={() => speak('아이스 아메리카노 한 잔 주세요.', 0.75)}
            className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-200 active:scale-95 transition"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Testar Frase Lenta (0.75x)</span>
          </button>
        </div>
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="pt-2">
        <button
          onClick={() => {
            if (confirm('Tem certeza de que deseja reiniciar seu progresso e XP?')) {
              onResetProgress();
            }
          }}
          className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 mx-auto py-2 transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reiniciar dados de treino</span>
        </button>
      </div>
    </div>
  );
};
