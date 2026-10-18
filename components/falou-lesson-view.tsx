'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Pause,
  Volume2,
  HelpCircle,
  FastForward,
  Mic,
  Check,
  ArrowRight,
  RotateCcw,
  Trophy,
  Layers,
  BarChart3,
} from 'lucide-react';
import { CurriculumCard, getLevelCurriculumCards, LEVELS } from '@/lib/korean-curriculum';
import { FalouMascot } from '@/components/falou-mascot';
import { GrammarModal } from '@/components/grammar-modal';
import { LevelSelectorModal } from '@/components/level-selector-modal';
import { soundEffects } from '@/lib/sound-effects';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { useKoreanTTS } from '@/hooks/use-korean-tts';

interface FalouLessonViewProps {
  onCompleteLesson: (xp: number) => void;
  onExit?: () => void;
  onOpenStats?: () => void;
  initialLevel?: number;
}

type LessonPhase = 'intro' | 'recall' | 'retry' | 'success';

export const FalouLessonView: React.FC<FalouLessonViewProps> = ({
  onCompleteLesson,
  onExit,
  onOpenStats,
  initialLevel = 1,
}) => {
  const [level, setLevel] = useState<number>(initialLevel);
  const [queue, setQueue] = useState<CurriculumCard[]>(() => getLevelCurriculumCards(initialLevel));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<LessonPhase>('intro');
  const [revealedHint, setRevealedHint] = useState(false);
  const [isGrammarOpen, setIsGrammarOpen] = useState(false);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [lessonFinished, setLessonFinished] = useState(false);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentCard: CurriculumCard = queue[currentIndex] || queue[0];

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition('ko-KR');

  const { speak, isPlaying: isTTSPlaying } = useKoreanTTS();

  // Switch curriculum when level changes
  const handleSelectLevel = (newLevel: number) => {
    setLevel(newLevel);
    const newQueue = getLevelCurriculumCards(newLevel);
    setQueue(newQueue);
    setCurrentIndex(0);
    setPhase('intro');
    resetTranscript();
  };

  const progressPercent = Math.min(
    100,
    Math.round(((queue.length - (queue.length - currentIndex)) / queue.length) * 100)
  );

  /**
   * Online dynamic audio synthesis: zero manual saving needed.
   * Plays from /api/tts endpoint with automatic in-memory/disk caching for 0ms latency.
   * Fallback to Web Speech API if necessary.
   */
  const playCardAudio = useCallback(
    (slow: boolean = false) => {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      setIsPlayingAudio(true);
      const textToSpeak = currentCard.hangul;
      const ttsUrl = `/api/tts?text=${encodeURIComponent(textToSpeak)}&slow=${slow ? 'true' : 'false'}`;

      const audio = new Audio(ttsUrl);
      audioRef.current = audio;

      audio
        .play()
        .then(() => {
          audio.onended = () => setIsPlayingAudio(false);
        })
        .catch(() => {
          // Graceful fallback to client Web Speech API synthesis
          setIsPlayingAudio(false);
          speak(textToSpeak, slow ? 0.6 : 0.85);
        });
    },
    [currentCard?.hangul, speak]
  );

  // Auto-play audio when entering a new card in 'intro' phase
  useEffect(() => {
    if (phase === 'intro' && currentCard) {
      const timer = setTimeout(() => {
        playCardAudio(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, phase, currentCard, playCardAudio]);

  /**
   * ROBUST WORD & SYLLABLE MATCHING ALGORITHM:
   * Fixes the bug where only the first half of the sentence was colored.
   * Matches word tokens and syllables independently from transcript.
   */
  const wordTokens = useMemo(() => {
    if (!currentCard?.hangul) return [];
    return currentCard.hangul.split(' ').map((rawWord) => {
      const cleanWord = rawWord.replace(/[^\uAC00-\uD7A3a-zA-Z0-9]/g, '');
      return { raw: rawWord, clean: cleanWord };
    });
  }, [currentCard?.hangul]);

  const cleanSpoken = useMemo(() => {
    return (transcript || '').replace(/[^\uAC00-\uD7A3a-zA-Z0-9]/g, '');
  }, [transcript]);

  // Determine matched status per word token
  const matchedWordsStatus = useMemo(() => {
    if (phase === 'success') {
      return wordTokens.map(() => true);
    }
    if (!cleanSpoken) {
      return wordTokens.map(() => false);
    }

    return wordTokens.map((token) => {
      if (!token.clean) return true;
      // Exact substring match in spoken transcript
      if (cleanSpoken.includes(token.clean)) return true;

      // Partial syllable match for words >= 2 syllables (e.g. 70% threshold)
      const cleanChars = Array.from(token.clean);
      let matchedChars = 0;
      for (const ch of cleanChars) {
        if (cleanSpoken.includes(ch)) matchedChars++;
      }
      return cleanChars.length > 0 && matchedChars / cleanChars.length >= 0.65;
    });
  }, [wordTokens, cleanSpoken, phase]);

  const matchedWordsCount = matchedWordsStatus.filter(Boolean).length;
  const matchRatio = wordTokens.length > 0 ? matchedWordsCount / wordTokens.length : 0;

  // Trigger success once threshold (>= 60%) is reached
  useEffect(() => {
    if (matchRatio >= 0.6 && phase !== 'success' && isListening) {
      stopListening();
      soundEffects.playSuccess();

      // Record learned stats in localStorage for PhD Memory tracking
      try {
        const curLearned = parseInt(localStorage.getItem('hangultalk_learned_words') || '14', 10);
        const curPhrases = parseInt(localStorage.getItem('hangultalk_practiced_phrases') || '38', 10);
        localStorage.setItem('hangultalk_learned_words', String(curLearned + 1));
        localStorage.setItem('hangultalk_practiced_phrases', String(curPhrases + 1));
      } catch {}

      const timer = setTimeout(() => {
        setPhase('success');
        setTotalXpEarned((prev) => prev + 15);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [matchRatio, phase, isListening, stopListening]);

  // Toggle microphone dictation
  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  // Handle "Não lembro" button click (Scientific SRS decay trigger)
  const handleIDontRemember = () => {
    stopListening();
    soundEffects.playReviewHint();
    setRevealedHint(true);

    // Re-insert current card at the end of queue for reinforcement
    setQueue((prevQueue) => {
      const updated = [...prevQueue];
      updated.push({ ...currentCard });
      return updated;
    });

    // Speak audio slowly so user hears phonemes clearly
    playCardAudio(true);

    setTimeout(() => {
      setPhase('retry');
    }, 1200);
  };

  // Advance to next step / phase in the SRS loop
  const handleContinue = () => {
    resetTranscript();
    setRevealedHint(false);

    if (phase === 'intro') {
      // Step 2: Now test active recall without showing the Hangul!
      setPhase('recall');
    } else {
      // Completed the active recall! Move to next card
      if (currentIndex < queue.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setPhase('intro');
      } else {
        // Lesson completely mastered
        setLessonFinished(true);
        onCompleteLesson(totalXpEarned + 50);
      }
    }
  };

  // Skip current card
  const handleSkip = () => {
    stopListening();
    resetTranscript();
    if (currentIndex < queue.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setPhase('intro');
    } else {
      setLessonFinished(true);
      onCompleteLesson(totalXpEarned + 20);
    }
  };

  const isAudioActive = isPlayingAudio || isTTSPlaying;
  const currentLevelInfo = LEVELS.find((l) => l.level === level) || LEVELS[0];

  return (
    <div className="relative min-h-screen bg-[#0F1423] text-white flex flex-col justify-between select-none overflow-x-hidden font-sans">
      {/* Top Bar: Level Badge, Progress Bar & Actions */}
      <div className="w-full max-w-md mx-auto px-5 pt-4 pb-2 flex items-center justify-between gap-3">
        {/* Level Switcher Pill */}
        <button
          onClick={() => setIsLevelModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-xs font-black transition active:scale-95 shrink-0"
        >
          <span>{currentLevelInfo.badgeEmoji}</span>
          <span className="text-[#00C3FF]">Nível {level}</span>
          <Layers className="w-3 h-3 text-slate-400" />
        </button>

        {/* Neon Cyan Progress Bar */}
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00C3FF] to-[#00E5FF] rounded-full shadow-[0_0_12px_rgba(0,195,255,0.7)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        {/* Stats Button */}
        {onOpenStats && (
          <button
            onClick={onOpenStats}
            aria-label="Ver estatísticas de memória"
            className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 flex items-center justify-center transition active:scale-95 shrink-0"
          >
            <BarChart3 className="w-4 h-4 text-[#00C3FF]" />
          </button>
        )}

        {/* Pause Button */}
        {onExit && (
          <button
            onClick={onExit}
            aria-label="Pausar lição"
            className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 flex items-center justify-center transition active:scale-95 shrink-0"
          >
            <Pause className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Finished Screen */}
      {lessonFinished ? (
        <div className="flex-1 max-w-md mx-auto px-6 flex flex-col items-center justify-center text-center my-auto">
          <div className="w-24 h-24 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(245,158,11,0.4)]">
            <Trophy className="w-12 h-12 stroke-[2.2]" />
          </div>

          <h2 className="text-2xl font-black mb-2">대박! Memória Consolidada!</h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Você concluiu a rodada de <strong>Repetição Espaçada (SRS)</strong> do {currentLevelInfo.title}! As palavras e suas conexões foram fixadas na memória de curto prazo.
          </p>

          <div className="w-full bg-white/[0.05] border border-white/10 rounded-2xl p-4 mb-6 flex justify-around text-center">
            <div>
              <span className="text-xs text-slate-400 block">XP Ganho</span>
              <span className="text-xl font-black text-[#00C3FF]">+{totalXpEarned + 50} XP</span>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <span className="text-xs text-slate-400 block">Exercícios Feitos</span>
              <span className="text-xl font-black text-[#22C55E]">{queue.length}</span>
            </div>
          </div>

          <div className="w-full space-y-3">
            <button
              onClick={() => {
                setLessonFinished(false);
                setCurrentIndex(0);
                setQueue(getLevelCurriculumCards(level));
                setPhase('intro');
              }}
              className="w-full py-4 rounded-2xl bg-[#00C3FF] text-slate-950 font-black text-sm hover:bg-[#00b4eb] active:scale-95 transition shadow-lg shadow-cyan-500/25"
            >
              Treinar Novamente Este Nível
            </button>

            {level < 5 && (
              <button
                onClick={() => handleSelectLevel(level + 1)}
                className="w-full py-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-black text-sm active:scale-95 transition"
              >
                Avançar para Nível {level + 1} 🚀
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Main Exercise Content Area */
        <div className="flex-1 max-w-md w-full mx-auto px-5 py-3 flex flex-col justify-between">
          {/* Top Row: Cartoon Mascot + Speech Bubble */}
          <div className="flex items-start gap-3 my-2">
            <FalouMascot
              state={
                phase === 'success'
                  ? 'happy'
                  : isListening
                  ? 'listening'
                  : isAudioActive
                  ? 'speaking'
                  : 'idle'
              }
              className="shrink-0 -ml-2"
            />

            {/* Speech Bubble */}
            <div className="flex-1 bg-[#1A2234] border border-white/[0.08] rounded-3xl rounded-tl-sm p-4 shadow-md relative mt-4">
              <div className="flex items-center gap-1.5 mb-1">
                {phase === 'intro' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-wider uppercase text-[#F59E0B]">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    {currentCard.type === 'word' ? 'NOVA PALAVRA' : 'NOVA FRASE COMBINADA'}
                  </span>
                ) : phase === 'recall' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-wider uppercase text-[#00C3FF]">
                    <span className="w-2 h-2 rounded-full bg-[#00C3FF]" />
                    DESAFIO DE MEMÓRIA (RECALL)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-wider uppercase text-[#F97316]">
                    <RotateCcw className="w-3 h-3" />
                    TENTE NOVAMENTE
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white">
                {phase === 'recall' ? 'Traduza esta frase:' : 'Fale esta frase:'}
              </h3>
            </div>
          </div>

          {/* Visual Illustration Badge for Dual Coding Memory */}
          <div className="flex items-center justify-center my-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={currentCard.id}
              className="w-16 h-16 rounded-3xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-3xl shadow-inner shadow-white/5"
            >
              {currentCard.emoji || '🇰🇷'}
            </motion.div>
          </div>

          {/* Center: Phrase Display Area with FIX for character & word coloring */}
          <div className="flex-1 flex flex-col items-center justify-center text-center my-2 py-2">
            {phase === 'recall' && !revealedHint ? (
              /* Phase 2: Active Recall (Ebbinghaus Forgetting Curve test) */
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentCard.translation}.
                </h2>

                {/* Blank Slots Representing the Korean Words */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {currentCard.wordSlots.map((slot, i) => (
                    <div
                      key={i}
                      className="min-w-[60px] px-3.5 py-2.5 bg-[#1C2538] border border-white/10 rounded-xl flex items-center justify-center"
                    >
                      {matchedWordsCount > 0 ? (
                        <span className="text-base font-black text-[#22C55E]">{slot}</span>
                      ) : (
                        <span className="text-sm font-bold text-slate-500">_ _ _</span>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Resgate a palavra da sua memória de curto prazo e fale no microfone!
                </p>
              </div>
            ) : (
              /* Phase 1 & Retry: Full Visual Guide (Hangul colored per-word + Romanization + Translation) */
              <div className="space-y-2.5">
                {/* Large Korean Hangul with Live Green Animation per WORD TOKEN */}
                <h2 className="text-2xl sm:text-3xl font-black tracking-normal leading-snug flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                  {wordTokens.map((token, wordIdx) => {
                    const isMatched = matchedWordsStatus[wordIdx] || phase === 'success';

                    return (
                      <motion.span
                        key={wordIdx}
                        animate={isMatched ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.2 }}
                        className={`transition-colors duration-200 inline-block ${
                          isMatched
                            ? 'text-[#22C55E] drop-shadow-[0_0_10px_rgba(34,197,94,0.65)] font-black'
                            : 'text-[#F59E0B]'
                        }`}
                      >
                        {token.raw}
                      </motion.span>
                    );
                  })}
                </h2>

                {/* Romanization in Crisp Bold White */}
                <p className="text-base font-bold text-white tracking-wide">
                  {currentCard.romanization}
                </p>

                {/* Portuguese Translation in Gray Quotes */}
                <p className="text-sm font-medium text-slate-400">
                  &ldquo;{currentCard.translation}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 my-3">
            {/* Repetir Button (Normal speed via dynamic online API) */}
            <button
              onClick={() => playCardAudio(false)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-[#1A2234] border border-white/[0.08] text-[#00C3FF] flex items-center justify-center shadow-md group-hover:bg-[#202b42] active:scale-95 transition">
                <Volume2 className={`w-6 h-6 ${isAudioActive ? 'animate-pulse text-[#00E5FF]' : ''}`} />
              </div>
              <span className="text-xs font-semibold text-slate-300">Ouvir</span>
            </button>

            {/* Lento Button (Slow speed with turtle) */}
            <button
              onClick={() => playCardAudio(true)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-[#1A2234] border border-white/[0.08] text-[#38BDF8] flex items-center justify-center shadow-md group-hover:bg-[#202b42] active:scale-95 transition">
                <span className="text-xl sm:text-2xl">🐢</span>
              </div>
              <span className="text-xs font-semibold text-slate-300">Lento</span>
            </button>

            {/* Gramática Button */}
            <button
              onClick={() => setIsGrammarOpen(true)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-[#1A2234] border border-white/[0.08] text-[#60A5FA] flex items-center justify-center shadow-md group-hover:bg-[#202b42] active:scale-95 transition">
                <span className="text-xl sm:text-2xl">🐵</span>
              </div>
              <span className="text-xs font-semibold text-slate-300">Gramática</span>
            </button>

            {/* Pular OU Não Lembro Button */}
            {phase === 'recall' ? (
              <button
                onClick={handleIDontRemember}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-[#1A2234] border border-white/[0.08] text-[#F59E0B] flex items-center justify-center shadow-md group-hover:bg-[#202b42] active:scale-95 transition">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-slate-300">Não lembro</span>
              </button>
            ) : (
              <button
                onClick={handleSkip}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-[#1A2234] border border-white/[0.08] text-[#00C3FF] flex items-center justify-center shadow-md group-hover:bg-[#202b42] active:scale-95 transition">
                  <FastForward className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-slate-300">Pular</span>
              </button>
            )}
          </div>

          {/* Bottom Primary Button: Big Rounded Cyan Mic Button */}
          <div className="w-full pt-1 pb-5">
            <button
              onClick={handleToggleMic}
              aria-label={isListening ? 'Parar escuta' : 'Toque para falar'}
              className={`w-full h-16 rounded-3xl font-extrabold text-base flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] ${
                isListening
                  ? 'bg-red-500 text-white shadow-red-500/40 animate-pulse'
                  : 'bg-[#00C3FF] hover:bg-[#00b4eb] text-slate-950 shadow-[0_8px_24px_rgba(0,195,255,0.35)]'
              }`}
            >
              <Mic className="w-6 h-6" />
              <span>{isListening ? 'Ouvindo... Fale agora!' : 'Tap to speak'}</span>
            </button>

            <p className="text-[11px] text-center text-slate-400 mt-2">
              {isListening
                ? 'Dite a frase em coreano no microfone do iPhone'
                : transcript
                ? `Ouvido: "${transcript}"`
                : 'Toque para falar e veja as palavras ficarem verdes!'}
            </p>
          </div>

          {/* Success Bottom Sheet Banner */}
          <AnimatePresence>
            {phase === 'success' && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 260 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-[#162B28] border-t-2 border-[#22C55E] p-5 pb-safe shadow-2xl"
              >
                <div className="max-w-md mx-auto flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#22C55E] text-slate-950 flex items-center justify-center font-black shadow-md">
                      <Check className="w-7 h-7 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-white">Excelente! Pronúncia Nativa!</h4>
                      <p className="text-xs font-semibold text-[#4ADE80]">
                        +15 XP · Memória Fixada!
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleContinue}
                    className="py-3 px-6 rounded-2xl bg-[#22C55E] hover:bg-[#1ea34d] text-slate-950 font-black text-sm active:scale-95 transition shadow-lg shadow-emerald-500/30 flex items-center gap-1.5"
                  >
                    <span>Continuar</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grammar Modal */}
          <GrammarModal
            card={{
              id: currentCard.id,
              audioId: currentCard.id,
              hangul: currentCard.hangul,
              romanization: currentCard.romanization,
              translation: currentCard.translation,
              wordSlots: currentCard.wordSlots,
              grammar: {
                title: currentCard.grammarTip || 'Explicação Gramatical',
                explanation: currentCard.grammarTip || 'Prática de repetição espaçada focada em conversação.',
                breakdown: (currentCard.breakdown || []).map((b) => ({
                  korean: b.korean,
                  roman: b.roman,
                  role: b.meaning,
                })),
              },
              difficulty: 'fácil',
            }}
            isOpen={isGrammarOpen}
            onClose={() => setIsGrammarOpen(false)}
          />

          {/* Level Selector Modal */}
          <LevelSelectorModal
            isOpen={isLevelModalOpen}
            onClose={() => setIsLevelModalOpen(false)}
            currentLevel={level}
            onSelectLevel={handleSelectLevel}
          />
        </div>
      )}
    </div>
  );
};
