'use client';

import React, { useState, useEffect } from 'react';
import { IOSStatusBar } from '@/components/ios-status-bar';
import { FalouLessonView } from '@/components/falou-lesson-view';
import { PWAInstallModal } from '@/components/pwa-install-modal';
import { MicrophonePermissionSheet } from '@/components/microphone-permission-sheet';
import { MemoryStatsModal } from '@/components/memory-stats-modal';
import { Smartphone, HelpCircle, Flame, Sparkles, Brain } from 'lucide-react';

export default function HomePage() {
  const [streak, setStreak] = useState<number>(3);
  const [xp, setXp] = useState<number>(210);
  const [learnedWordsCount, setLearnedWordsCount] = useState<number>(14);
  const [practicedPhrasesCount, setPracticedPhrasesCount] = useState<number>(42);

  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isMicSheetOpen, setIsMicSheetOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const savedStreak = localStorage.getItem('hangultalk_streak');
      const savedXp = localStorage.getItem('hangultalk_xp');
      const savedLearned = localStorage.getItem('hangultalk_learned_words');
      const savedPhrases = localStorage.getItem('hangultalk_practiced_phrases');

      if (savedStreak) setStreak(parseInt(savedStreak, 10));
      if (savedXp) setXp(parseInt(savedXp, 10));
      if (savedLearned) setLearnedWordsCount(parseInt(savedLearned, 10));
      if (savedPhrases) setPracticedPhrasesCount(parseInt(savedPhrases, 10));
    } catch {}
  }, []);

  const handleEarnXP = (amount: number) => {
    const nextXp = xp + amount;
    setXp(nextXp);
    try {
      localStorage.setItem('hangultalk_xp', String(nextXp));
      localStorage.setItem('hangultalk_streak', String(streak));
      setLearnedWordsCount((prev) => {
        const next = Math.min(100, prev + 2);
        localStorage.setItem('hangultalk_learned_words', String(next));
        return next;
      });
      setPracticedPhrasesCount((prev) => {
        const next = Math.min(1000, prev + 5);
        localStorage.setItem('hangultalk_practiced_phrases', String(next));
        return next;
      });
    } catch {}
  };

  const handleTestMicPermission = () => {
    if (typeof window !== 'undefined' && navigator?.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          stream.getTracks().forEach((t) => t.stop());
        })
        .catch((e) => {
          console.warn('Microphone permission request error:', e);
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1423] text-white flex flex-col justify-between selection:bg-[#00C3FF]/20 font-sans">
      {/* iOS App Shell */}
      <div className="w-full flex-1 flex flex-col">
        {/* iOS Native Status Bar */}
        <IOSStatusBar />

        {/* Minimal iOS Header with Quick Actions */}
        <header className="w-full max-w-md mx-auto px-5 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#00C3FF] text-slate-950 font-black text-xs flex items-center justify-center shadow-xs">
              한
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">
              HangulTalk
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Streak */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{streak} d</span>
            </div>

            {/* Memory & Stats Trigger Button */}
            <button
              onClick={() => setIsStatsModalOpen(true)}
              aria-label="Abrir estatísticas de memória"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-[#00C3FF] text-xs font-bold border border-cyan-500/20 transition active:scale-95"
            >
              <Brain className="w-3.5 h-3.5 text-[#00C3FF]" />
              <span>{learnedWordsCount}/100</span>
            </button>

            {/* XP */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-bold border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{xp}</span>
            </div>

            {/* Mic Help Sheet */}
            <button
              onClick={() => setIsMicSheetOpen(true)}
              aria-label="Ajuda com microfone"
              className="p-1.5 rounded-full text-slate-400 hover:text-white transition"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* PWA Install */}
            <button
              onClick={() => setIsInstallModalOpen(true)}
              aria-label="Instalar no iPhone"
              className="p-1.5 rounded-full text-slate-400 hover:text-[#00C3FF] transition"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Falou SRS Experience (100% focused) */}
        <main className="flex-1 w-full flex flex-col">
          <FalouLessonView
            onCompleteLesson={handleEarnXP}
            onOpenStats={() => setIsStatsModalOpen(true)}
          />
        </main>
      </div>

      {/* Modals and Sheets */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      <MicrophonePermissionSheet
        isOpen={isMicSheetOpen}
        onClose={() => setIsMicSheetOpen(false)}
        onTestPermission={handleTestMicPermission}
      />

      <MemoryStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        learnedWordsCount={learnedWordsCount}
        practicedPhrasesCount={practicedPhrasesCount}
        xp={xp}
        streak={streak}
        currentLevel={1}
      />
    </div>
  );
}
