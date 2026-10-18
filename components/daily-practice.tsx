'use client';

import React, { useState } from 'react';
import { DAILY_PHRASES } from '@/lib/korean-data';
import { useKoreanTTS } from '@/hooks/use-korean-tts';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { Volume2, Mic, CheckCircle2, RotateCcw, Zap, Sparkles } from 'lucide-react';

interface DailyPracticeProps {
  onEarnXP: (xp: number) => void;
}

export const DailyPractice: React.FC<DailyPracticeProps> = ({ onEarnXP }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [evaluation, setEvaluation] = useState<{ score: number; tip: string } | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const { speak, isPlaying } = useKoreanTTS();
  const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition('ko-KR');

  const currentPhrase = DAILY_PHRASES[currentIndex];

  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
      setTimeout(async () => {
        setIsEvaluating(true);
        try {
          const res = await fetch('/api/evaluate-speech', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              expectedKorean: currentPhrase.korean,
              spokenText: transcript,
              romanization: currentPhrase.romanization,
              portugueseTranslation: currentPhrase.translation,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            setEvaluation({ score: data.score, tip: data.phoneticAdvice });
            if (data.score >= 70) {
              onEarnXP(25);
            }
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsEvaluating(false);
        }
      }, 300);
    } else {
      resetTranscript();
      setEvaluation(null);
      startListening();
    }
  };

  const handleNext = () => {
    setEvaluation(null);
    resetTranscript();
    if (currentIndex < DAILY_PHRASES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span>Frases Essenciais do Dia</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Treine as frases mais importantes da língua coreana com gravação diária e ganhe XP.
        </p>
      </div>

      {/* Flashcard Card */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 border border-black/[0.06] dark:border-white/[0.08] shadow-xs flex flex-col items-center text-center">
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
          Frase {currentIndex + 1} de {DAILY_PHRASES.length}
        </span>

        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">
          {currentPhrase.korean}
        </h3>

        <p className="text-sm font-semibold text-[#007AFF] mb-1">
          {currentPhrase.romanization}
        </p>

        <p className="text-base text-slate-700 dark:text-slate-300 mb-2">
          &ldquo;{currentPhrase.translation}&rdquo;
        </p>

        <span className="text-xs text-slate-400 max-w-xs mb-6">
          {currentPhrase.context}
        </span>

        {/* Listen Button */}
        <button
          onClick={() => speak(currentPhrase.korean)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 active:scale-95 transition mb-6 min-h-[40px]"
        >
          <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-[#007AFF]' : ''}`} />
          <span>Ouvir Pronúncia Nativa</span>
        </button>

        {/* Dictation Area */}
        <div className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 mb-4">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleToggleMic}
              disabled={isEvaluating}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition active:scale-95 shadow-md ${
                isListening ? 'bg-red-500 scale-105' : 'bg-[#007AFF] hover:bg-blue-600'
              }`}
            >
              <Mic className="w-6 h-6" />
            </button>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {isListening
              ? 'Ouvindo... Repita a frase agora!'
              : transcript
              ? `Detectado: "${transcript}"`
              : 'Toque no microfone e diga a frase em coreano'}
          </p>

          {isEvaluating && (
            <span className="text-xs text-[#007AFF] font-medium block mt-1 animate-pulse">
              Avaliando pronúncia com IA...
            </span>
          )}

          {evaluation && (
            <div className="mt-3 p-3 rounded-xl bg-white dark:bg-slate-800 text-left border border-slate-200/60 dark:border-slate-700">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Nota de Pronúncia: {evaluation.score}%
                </span>
                {evaluation.score >= 70 ? (
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    +25 XP!
                  </span>
                ) : (
                  <span className="text-[11px] text-amber-600">Tente novamente</span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {evaluation.tip}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 active:scale-95 transition min-h-[44px]"
        >
          Próxima Frase
        </button>
      </div>
    </div>
  );
};
