'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Trophy
} from 'lucide-react';
import { SRSCard, SRS_LESSON_CARDS } from '@/lib/srs-learning-data';
import { FalouMascot } from '@/components/falou-mascot';
import { GrammarModal } from '@/components/grammar-modal';
import { soundEffects } from '@/lib/sound-effects';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { useKoreanTTS } from '@/hooks/use-korean-tts';

interface FalouLessonViewProps {
  onCompleteLesson: (xp: number) => void;
  onExit?: () => void;
}

type LessonPhase = 'intro' | 'recall' | 'retry' | 'success';

export const FalouLessonView: React.FC<FalouLessonViewProps> = ({
  onCompleteLesson,
  onExit,
}) => {
  const [queue, setQueue] = useState<SRSCard[]>([...SRS_LESSON_CARDS]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<LessonPhase>('intro');
  const [revealedHint, setRevealedHint] = useState(false);
  const [isGrammarOpen, setIsGrammarOpen] = useState(false);
  const [lessonFinished, setLessonFinished] = useState(false);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  const currentCard: SRSCard = queue[currentIndex] || SRS_LESSON_CARDS[0];

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition('ko-KR');

  const { speak, isPlaying: isTTSPlaying } = useKoreanTTS();

  const progressPercent = Math.min(
    100,
    Math.round(((SRS_LESSON_CARDS.length - queue.length + currentIndex) / SRS_LESSON_CARDS.length) * 100)
  );

  // Play crisp, pure Korean audio (no English prefixes!)
  const playCardAudio = useCallback(
    (slow: boolean = false) => {
      speak(currentCard.hangul, slow ? 0.75 : 1.0);
    },
    [currentCard.hangul, speak]
  );

  // Play audio when entering a new card in 'intro' phase
  useEffect(() => {
    if (phase === 'intro' && currentCard) {
      const timer = setTimeout(() => {
        playCardAudio(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, phase, currentCard, playCardAudio]);

  // Clean Hangul string for comparison
  const cleanTarget = useMemo(
    () => currentCard.hangul.replace(/[^\uAC00-\uD7A3a-zA-Z0-9]/g, ''),
    [currentCard.hangul]
  );

  // Derive matched characters count directly from transcript during render
  const matchedCharsCount = useMemo(() => {
    if (!transcript) return 0;
    const cleanSpoken = transcript.replace(/[^\uAC00-\uD7A3a-zA-Z0-9]/g, '');
    let matched = 0;
    for (let i = 0; i < cleanTarget.length; i++) {
      if (cleanSpoken.includes(cleanTarget[i])) {
        matched++;
      }
    }
    return matched;
  }, [transcript, cleanTarget]);

  const matchRatio = cleanTarget.length > 0 ? matchedCharsCount / cleanTarget.length : 0;

  // Trigger success once threshold is reached asynchronously
  useEffect(() => {
    if (matchRatio >= 0.65 && phase !== 'success' && isListening) {
      stopListening();
      soundEffects.playSuccess();
      const timer = setTimeout(() => {
        setPhase('success');
        setTotalXpEarned((prev) => prev + 15);
      }, 60);
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

    // Speak audio slow and clean so the user hears it again
    playCardAudio(true);

    // Switch to retry phase so they can try again with visual guide
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

  return (
    <div className="relative min-h-screen bg-[#0F1423] text-white flex flex-col justify-between select-none overflow-x-hidden font-sans">
      {/* Top Bar: Progress Bar & Pause Button */}
      <div className="w-full max-w-md mx-auto px-5 pt-4 pb-2 flex items-center justify-between gap-4">
        {/* Neon Cyan Progress Bar */}
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00C3FF] to-[#00E5FF] rounded-full shadow-[0_0_12px_rgba(0,195,255,0.7)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        {/* Pause Button */}
        {onExit && (
          <button
            onClick={onExit}
            aria-label="Pausar lição"
            className="w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 flex items-center justify-center transition active:scale-95"
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

          <h2 className="text-2xl font-black mb-2">
            대박! Memória Consolidada!
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Você completou a sequência de <strong>Repetição Espaçada (SRS)</strong>! As 10 frases foram fixadas na sua memória de longo prazo com pronúncia limpa em coreano.
          </p>

          <div className="w-full bg-white/[0.05] border border-white/10 rounded-2xl p-4 mb-6 flex justify-around text-center">
            <div>
              <span className="text-xs text-slate-400 block">XP Ganho</span>
              <span className="text-xl font-black text-[#00C3FF]">+{totalXpEarned + 50} XP</span>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <span className="text-xs text-slate-400 block">Frases Fixadas</span>
              <span className="text-xl font-black text-[#22C55E]">{SRS_LESSON_CARDS.length}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setLessonFinished(false);
              setCurrentIndex(0);
              setQueue([...SRS_LESSON_CARDS]);
              setPhase('intro');
            }}
            className="w-full py-4 rounded-2xl bg-[#00C3FF] text-slate-950 font-black text-sm hover:bg-[#00b4eb] active:scale-95 transition shadow-lg shadow-cyan-500/25"
          >
            Treinar Novamente
          </button>
        </div>
      ) : (
        /* Main Exercise Content Area */
        <div className="flex-1 max-w-md w-full mx-auto px-5 py-3 flex flex-col justify-between">
          {/* Top Row: Cartoon Mascot + Speech Bubble */}
          <div className="flex items-start gap-3 my-2">
            {/* Mascot */}
            <FalouMascot
              state={
                phase === 'success'
                  ? 'happy'
                  : isListening
                  ? 'listening'
                  : isTTSPlaying
                  ? 'speaking'
                  : 'idle'
              }
              className="shrink-0 -ml-2"
            />

            {/* Speech Bubble */}
            <div className="flex-1 bg-[#1A2234] border border-white/[0.08] rounded-3xl rounded-tl-sm p-4 shadow-md relative mt-4">
              {/* Badge */}
              <div className="flex items-center gap-1.5 mb-1">
                {phase === 'intro' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-wider uppercase text-[#F59E0B]">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    NOVA PALAVRA
                  </span>
                ) : phase === 'recall' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-wider uppercase text-[#00C3FF]">
                    <span className="w-2 h-2 rounded-full bg-[#00C3FF]" />
                    DESAFIO DE MEMÓRIA
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-wider uppercase text-[#F97316]">
                    <RotateCcw className="w-3 h-3" />
                    TENTE NOVAMENTE
                  </span>
                )}
              </div>

              {/* Instruction */}
              <h3 className="text-base font-bold text-white">
                {phase === 'recall' ? 'Traduza esta frase:' : 'Fale esta frase:'}
              </h3>
            </div>
          </div>

          {/* Center: Phrase Display Area */}
          <div className="flex-1 flex flex-col items-center justify-center text-center my-4 py-2">
            {phase === 'recall' && !revealedHint ? (
              /* Phase 2: Active Recall (Ebbinghaus Forgetting Curve test) */
              <div className="space-y-4">
                {/* Portuguese Prompt in Large White Text */}
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  {currentCard.translation}.
                </h2>

                {/* Blank Slots Representing the Korean Words */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  {currentCard.wordSlots.map((slot, i) => (
                    <div
                      key={i}
                      className="min-w-[64px] px-4 py-3 bg-[#1C2538] border border-white/10 rounded-xl flex items-center justify-center"
                    >
                      {matchedCharsCount > 0 ? (
                        <span className="text-lg font-black text-[#22C55E]">
                          {slot}
                        </span>
                      ) : (
                        <span className="text-sm font-bold text-slate-500">
                          _ _ _
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Resgate a palavra da sua memória de curto prazo e fale no microfone!
                </p>
              </div>
            ) : (
              /* Phase 1 & Retry: Full Visual Guide (Hangul in Gold + Romanization + Translation) */
              <div className="space-y-2">
                {/* Large Korean Hangul with Live Green Animation */}
                <h2 className="text-3xl sm:text-4xl font-black tracking-normal leading-snug">
                  {Array.from(currentCard.hangul).map((char, index) => {
                    const isMatched = index < matchedCharsCount || phase === 'success';

                    return (
                      <motion.span
                        key={index}
                        animate={isMatched ? { color: '#22C55E', scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 0.25 }}
                        className={`transition-colors duration-200 inline-block ${
                          isMatched
                            ? 'text-[#22C55E] drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] font-black'
                            : 'text-[#F59E0B]'
                        }`}
                      >
                        {char}
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
          <div className="flex items-center justify-center gap-6 my-4">
            {/* Repetir Button (Audio play) */}
            <button
              onClick={() => playCardAudio(false)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-16 h-16 rounded-3xl bg-[#1A2234] border border-white/[0.08] text-[#00C3FF] flex items-center justify-center shadow-md group-hover:bg-[#202b42] active:scale-95 transition">
                <Volume2 className={`w-6 h-6 ${isTTSPlaying ? 'animate-pulse text-[#00E5FF]' : ''}`} />
              </div>
              <span className="text-xs font-semibold text-slate-300">
                Repetir
              </span>
            </button>

            {/* Gramática Button (Monkey/Book character icon) */}
            <button
              onClick={() => setIsGrammarOpen(true)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-16 h-16 rounded-3xl bg-[#1A2234] border border-white/[0.08] text-[#60A5FA] flex items-center justify-center shadow-md group-hover:bg-[#202b42] active:scale-95 transition">
                <span className="text-2xl">🐵</span>
              </div>
              <span className="text-xs font-semibold text-slate-300">
                Gramática
              </span>
            </button>

            {/* Pular OU Não Lembro Button */}
            {phase === 'recall' ? (
              <button
                onClick={handleIDontRemember}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-16 h-16 rounded-3xl bg-[#1A2234] border border-white/[0.08] text-[#F59E0B] flex items-center justify-center shadow-md group-hover:bg-[#202b42] active:scale-95 transition">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-slate-300">
                  Não lembro
                </span>
              </button>
            ) : (
              <button
                onClick={handleSkip}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-16 h-16 rounded-3xl bg-[#1A2234] border border-white/[0.08] text-[#00C3FF] flex items-center justify-center shadow-md group-hover:bg-[#202b42] active:scale-95 transition">
                  <FastForward className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-slate-300">
                  Pular
                </span>
              </button>
            )}
          </div>

          {/* Bottom Primary Button: Big Rounded Cyan Pill Button */}
          <div className="w-full pt-2 pb-6">
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

            {/* Dictation Status Subtitle */}
            <p className="text-[11px] text-center text-slate-400 mt-2">
              {isListening
                ? 'Dite a frase em coreano no microfone do iPhone'
                : transcript
                ? `Ouvido: "${transcript}"`
                : 'Toque para falar e veja as letras ficarem verdes!'}
            </p>
          </div>

          {/* Success Bottom Sheet Banner (Appears when phrase is matched!) */}
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
                      <h4 className="text-base font-black text-white">
                        Excelente! Pronúncia Nativa!
                      </h4>
                      <p className="text-xs font-semibold text-[#4ADE80]">
                        +15 XP · Memória Consolidada
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
            card={currentCard}
            isOpen={isGrammarOpen}
            onClose={() => setIsGrammarOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
