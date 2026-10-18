'use client';

import React, { useState } from 'react';
import { IOSTopBar } from '@/components/ios-top-bar';
import { IOSStatusBar } from '@/components/ios-status-bar';
import { IOSBottomNav } from '@/components/ios-bottom-nav';
import { ScenarioHub } from '@/components/scenario-hub';
import { ConversationView } from '@/components/conversation-view';
import { HangulGuide } from '@/components/hangul-guide';
import { UserProfileView } from '@/components/user-profile-view';
import { FalouLessonView } from '@/components/falou-lesson-view';
import { PWAInstallModal } from '@/components/pwa-install-modal';
import { MicrophonePermissionSheet } from '@/components/microphone-permission-sheet';
import { Scenario } from '@/lib/korean-data';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>('falou-srs');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  // Lazy state initializers
  const [streak, setStreak] = useState<number>(() => {
    if (typeof window === 'undefined') return 3;
    try {
      const saved = localStorage.getItem('hangultalk_streak');
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  const [xp, setXp] = useState<number>(() => {
    if (typeof window === 'undefined') return 210;
    try {
      const saved = localStorage.getItem('hangultalk_xp');
      return saved ? parseInt(saved, 10) : 210;
    } catch {
      return 210;
    }
  });

  const [completedScenarios, setCompletedScenarios] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['cafe-hongdae'];
    try {
      const saved = localStorage.getItem('hangultalk_completed');
      return saved ? JSON.parse(saved) : ['cafe-hongdae'];
    } catch {
      return ['cafe-hongdae'];
    }
  });

  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isMicSheetOpen, setIsMicSheetOpen] = useState(false);

  // Save changes to localStorage
  const saveStats = (newXp: number, newStreak: number, newCompleted: string[]) => {
    try {
      localStorage.setItem('hangultalk_xp', String(newXp));
      localStorage.setItem('hangultalk_streak', String(newStreak));
      localStorage.setItem('hangultalk_completed', JSON.stringify(newCompleted));
    } catch {}
  };

  const handleFinishScenario = (earnedXp: number) => {
    const nextXp = xp + earnedXp;
    let nextCompleted = completedScenarios;
    if (selectedScenario && !completedScenarios.includes(selectedScenario.id)) {
      nextCompleted = [...completedScenarios, selectedScenario.id];
      setCompletedScenarios(nextCompleted);
    }
    setXp(nextXp);
    saveStats(nextXp, streak, nextCompleted);
  };

  const handleEarnXP = (amount: number) => {
    const nextXp = xp + amount;
    setXp(nextXp);
    saveStats(nextXp, streak, completedScenarios);
  };

  const handleResetProgress = () => {
    setXp(0);
    setStreak(1);
    setCompletedScenarios([]);
    try {
      localStorage.removeItem('hangultalk_xp');
      localStorage.removeItem('hangultalk_streak');
      localStorage.removeItem('hangultalk_completed');
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

  // If in active Falou lesson view, give full-screen immersion
  const isFullScreenLesson = activeTab === 'falou-srs' && !selectedScenario;

  return (
    <div className="min-h-screen bg-[#0F1423] text-white flex flex-col justify-between selection:bg-[#00C3FF]/20">
      {/* If full-screen Falou lesson, render direct immersion matching the screenshots */}
      {isFullScreenLesson ? (
        <div className="w-full flex-1 flex flex-col">
          <IOSStatusBar />
          <FalouLessonView
            onCompleteLesson={(earned) => {
              handleEarnXP(earned);
              setActiveTab('conversas');
            }}
            onExit={() => setActiveTab('conversas')}
          />
        </div>
      ) : (
        /* Standard App Shell with Top Bar and Navigation */
        <div className="w-full max-w-4xl mx-auto flex flex-col flex-1 pb-20 md:pb-6">
          <IOSStatusBar />

          <IOSTopBar
            title={selectedScenario ? selectedScenario.title : undefined}
            subtitle={selectedScenario ? selectedScenario.koreanTitle : undefined}
            streak={streak}
            xp={xp}
            showBack={!!selectedScenario}
            onBack={() => setSelectedScenario(null)}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setSelectedScenario(null);
              setActiveTab(tab);
            }}
          />

          <main className="flex-1 w-full mt-2">
            {selectedScenario ? (
              <ConversationView
                scenario={selectedScenario}
                onFinishScenario={handleFinishScenario}
                onBackToScenarios={() => setSelectedScenario(null)}
                onRequestMicrophoneHelp={() => setIsMicSheetOpen(true)}
              />
            ) : activeTab === 'conversas' ? (
              <div className="space-y-4">
                {/* Banner CTA to jump into Falou SRS Mode */}
                <div className="max-w-2xl mx-auto px-4">
                  <div
                    onClick={() => setActiveTab('falou-srs')}
                    className="p-5 rounded-3xl bg-gradient-to-r from-[#00C3FF]/20 to-[#60A5FA]/20 border border-[#00C3FF]/30 cursor-pointer hover:border-[#00C3FF] transition active:scale-[0.99] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 bg-[#1A2234] rounded-2xl">⚡</span>
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#00C3FF] block">
                          Método Científico SRS
                        </span>
                        <h4 className="text-base font-bold text-white">
                          Praticar Frases Rápidas (Estilo Falou)
                        </h4>
                        <p className="text-xs text-slate-400">
                          Curva do esquecimento + ditado com letras verdes
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-2 rounded-xl bg-[#00C3FF] text-slate-950 font-bold text-xs shrink-0">
                      Iniciar
                    </span>
                  </div>
                </div>

                <ScenarioHub
                  onSelectScenario={(sc) => setSelectedScenario(sc)}
                  completedScenarioIds={completedScenarios}
                />
              </div>
            ) : activeTab === 'hangul' ? (
              <HangulGuide />
            ) : (
              <UserProfileView
                streak={streak}
                xp={xp}
                completedScenariosCount={completedScenarios.length}
                onOpenInstallModal={() => setIsInstallModalOpen(true)}
                onResetProgress={handleResetProgress}
              />
            )}
          </main>
        </div>
      )}

      {/* iOS Bottom Navigation Bar (Visible when not inside full-screen Falou lesson) */}
      {!isFullScreenLesson && !selectedScenario && (
        <IOSBottomNav
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setSelectedScenario(null);
            setActiveTab(tab);
          }}
        />
      )}

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
    </div>
  );
}
