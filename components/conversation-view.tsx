'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Mic,
  MicOff,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Info,
  Trophy,
  Loader2,
  Keyboard,
  HelpCircle
} from 'lucide-react';
import { Scenario, DialogTurn } from '@/lib/korean-data';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { useKoreanTTS } from '@/hooks/use-korean-tts';

interface ConversationViewProps {
  scenario: Scenario;
  onFinishScenario: (xpEarned: number) => void;
  onBackToScenarios: () => void;
  onRequestMicrophoneHelp: () => void;
}

interface EvaluationResult {
  score: number;
  accuracyLevel: 'perfect' | 'great' | 'needs_practice';
  detectedMatch: string;
  syllableAnalysis: Array<{
    char: string;
    status: 'correct' | 'close' | 'incorrect';
    note?: string;
  }>;
  phoneticAdvice: string;
  encouragement: string;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  scenario,
  onFinishScenario,
  onBackToScenarios,
  onRequestMicrophoneHelp,
}) => {
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [showSlowTTS, setShowSlowTTS] = useState(false);
  const [completedTurns, setCompletedTurns] = useState<number[]>([]);
  const [scenarioCompleted, setScenarioCompleted] = useState(false);

  const {
    isListening,
    transcript,
    interimTranscript,
    error: speechError,
    hasPermission,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition('ko-KR');

  const { isPlaying, speed, setSpeed, speak, stop: stopTTS } = useKoreanTTS();

  const currentTurn: DialogTurn = scenario.dialogue[currentTurnIndex];
  const progressPercent = Math.round(((currentTurnIndex) / scenario.dialogue.length) * 100);

  // Play audio automatically when a native speaker turn opens
  useEffect(() => {
    if (currentTurn.speaker === 'native') {
      const timer = setTimeout(() => {
        speak(currentTurn.korean, 1.0);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentTurnIndex, currentTurn.speaker, currentTurn.korean, speak]);

  // Handle evaluation request when transcript arrives
  const handleEvaluateSpeech = async (spokenTextToEval?: string) => {
    const textToAnalyze = spokenTextToEval || transcript || manualInput;
    if (!textToAnalyze.trim()) return;

    setIsEvaluating(true);
    try {
      const response = await fetch('/api/evaluate-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expectedKorean: currentTurn.korean,
          spokenText: textToAnalyze,
          romanization: currentTurn.romanization,
          portugueseTranslation: currentTurn.translation,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setEvaluation(data);
        if (!completedTurns.includes(currentTurnIndex)) {
          setCompletedTurns((prev) => [...prev, currentTurnIndex]);
        }
      }
    } catch (err) {
      console.error('Failed to evaluate speech:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Toggle voice recording
  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
      // After stopping, analyze the transcript
      setTimeout(() => {
        handleEvaluateSpeech();
      }, 300);
    } else {
      resetTranscript();
      setEvaluation(null);
      startListening();
    }
  };

  // Move to next turn
  const handleNextTurn = () => {
    stopTTS();
    setEvaluation(null);
    resetTranscript();
    setManualInput('');
    setShowManualInput(false);

    if (currentTurnIndex < scenario.dialogue.length - 1) {
      setCurrentTurnIndex((prev) => prev + 1);
    } else {
      setScenarioCompleted(true);
      onFinishScenario(100);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-3 flex flex-col min-h-[calc(100vh-8.5rem)]">
      {/* Top Header: Scenario Title & Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {scenario.badgeEmoji} {scenario.title}
          </span>
          <span className="tabular-nums font-semibold">
            {currentTurnIndex + 1} de {scenario.dialogue.length}
          </span>
        </div>

        {/* iOS Smooth Progress Bar */}
        <div className="w-full h-2 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#007AFF] to-[#34C759] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Completion View if finished */}
      {scenarioCompleted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm my-auto"
        >
          <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-500 mb-4 shadow-inner">
            <Trophy className="w-10 h-10 stroke-[2.2]" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            대박! Diálogo Concluído!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mb-6">
            Você praticou a conversação completa de <strong>{scenario.title}</strong> e destravou +100 XP de fluência em coreano!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <button
              onClick={() => {
                setScenarioCompleted(false);
                setCurrentTurnIndex(0);
                setCompletedTurns([]);
                setEvaluation(null);
              }}
              className="flex-1 py-3 px-4 rounded-xl font-medium text-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition min-h-[44px]"
            >
              Repetir Treino
            </button>
            <button
              onClick={onBackToScenarios}
              className="flex-1 py-3 px-4 rounded-xl font-medium text-sm bg-[#007AFF] text-white hover:bg-[#0062cc] active:scale-95 transition shadow-sm min-h-[44px]"
            >
              Outros Diálogos
            </button>
          </div>
        </motion.div>
      ) : (
        /* Conversation Interactive Turn */
        <div className="flex-1 flex flex-col justify-between space-y-4">
          {/* Speaker Card / Dialogue Bubble */}
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
            {/* Header: Speaker Avatar & Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                  {currentTurn.speakerAvatar}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {currentTurn.speakerName}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {currentTurn.speaker === 'native' ? 'Interlocutor Nativo' : 'Sua Vez de Falar'}
                  </span>
                </div>
              </div>

              {/* TTS Speed Toggle & Speaker button */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    const nextSpeed = speed === 1.0 ? 0.75 : 1.0;
                    setSpeed(nextSpeed);
                    setShowSlowTTS(nextSpeed === 0.75);
                  }}
                  title="Alterar velocidade de áudio (1x ou 0.75x)"
                  className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition min-h-[36px] flex items-center ${
                    speed === 0.75
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {speed === 0.75 ? '🐢 0.75x Lento' : '⚡ 1.0x Normal'}
                </button>

                <button
                  onClick={() => speak(currentTurn.korean)}
                  aria-label="Ouvir pronúncia nativa"
                  className={`p-2.5 rounded-full transition active:scale-90 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    isPlaying
                      ? 'bg-[#007AFF] text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                </button>
              </div>
            </div>

            {/* Korean Phrase in Big Hangul Typography */}
            <div className="my-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-normal text-slate-900 dark:text-white mb-2 leading-snug">
                {currentTurn.korean}
              </h2>
              <p className="text-sm font-medium text-[#007AFF] mb-1">
                {currentTurn.romanization}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                &ldquo;{currentTurn.translation}&rdquo;
              </p>
            </div>

            {/* Phonetic Tip Box */}
            {currentTurn.pronunciationTip && (
              <div className="mt-4 p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/30 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-0.5">Dica de Pronúncia Coreana:</span>
                  <span>{currentTurn.pronunciationTip}</span>
                </div>
              </div>
            )}

            {/* Word by word breakdown */}
            {currentTurn.phoneticBreakdown && currentTurn.phoneticBreakdown.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Vocabulário da Frase
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentTurn.phoneticBreakdown.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => speak(item.part)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-800 dark:text-slate-200 hover:border-[#007AFF] transition active:scale-95"
                    >
                      <span className="font-bold">{item.part}</span>
                      <span className="text-slate-400 text-[10px]">({item.meaning})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Zone: If turn is user speaker, show mic / dictation */}
          {currentTurn.speaker === 'user' ? (
            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 border border-black/[0.06] dark:border-white/[0.08] shadow-xs flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Ditado de Voz & Prática de Fala
              </span>

              {/* Dictation Transcription Preview */}
              <div className="w-full min-h-[48px] bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-3 border border-slate-200/70 dark:border-slate-800 flex items-center justify-center text-center mb-4 transition-all">
                {isListening ? (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-medium text-[#007AFF] flex items-center gap-1.5 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-[#007AFF]" />
                      Ouvindo seu coreano no iPhone... Fale agora!
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {interimTranscript || transcript || '...'}
                    </span>
                  </div>
                ) : transcript ? (
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[11px] text-slate-400">Texto detectado pelo ditado:</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      {transcript}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400">
                    Toque no microfone abaixo e repita a frase em voz alta
                  </span>
                )}
              </div>

              {/* Error or Permission Warning */}
              {speechError && (
                <div className="w-full p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 text-xs flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{speechError}</span>
                  </div>
                  <button
                    onClick={onRequestMicrophoneHelp}
                    className="underline text-[11px] font-semibold shrink-0"
                  >
                    Como Permitir
                  </button>
                </div>
              )}

              {/* Big Apple-Style Dictation Button */}
              <div className="flex items-center justify-center gap-4 my-2">
                <button
                  onClick={handleToggleMic}
                  disabled={isEvaluating}
                  aria-label={isListening ? 'Parar gravação' : 'Iniciar ditado de voz'}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:opacity-50 ${
                    isListening
                      ? 'bg-red-500 text-white shadow-red-500/40 scale-105'
                      : 'bg-gradient-to-tr from-[#007AFF] to-[#0055D4] text-white shadow-blue-500/30 hover:shadow-blue-500/50'
                  }`}
                >
                  {isListening && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-red-400"
                      animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  {isEvaluating ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : isListening ? (
                    <MicOff className="w-8 h-8" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </button>
              </div>

              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">
                {isListening ? 'Toque para finalizar e avaliar' : 'Toque para falar em coreano'}
              </span>

              {/* Alternative: Manual Text / Keyboard Dictation */}
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => setShowManualInput(!showManualInput)}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 py-1 px-2 rounded-lg"
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>{showManualInput ? 'Ocultar teclado' : 'Usar ditado do teclado / digitar'}</span>
                </button>

                <button
                  onClick={onRequestMicrophoneHelp}
                  className="text-xs text-[#007AFF] hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Ajuda de áudio</span>
                </button>
              </div>

              {/* Expandable Manual Input for quiet situations */}
              {showManualInput && (
                <div className="w-full mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Digite ou dite pelo microfone do teclado do iPhone..."
                    className="flex-1 px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#007AFF]"
                  />
                  <button
                    onClick={() => handleEvaluateSpeech(manualInput)}
                    disabled={!manualInput.trim() || isEvaluating}
                    className="px-4 py-2 bg-[#007AFF] text-white rounded-xl text-xs font-medium hover:bg-blue-600 disabled:opacity-40"
                  >
                    Avaliar
                  </button>
                </div>
              )}

              {/* Evaluation Feedback Card */}
              <AnimatePresence>
                {evaluation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            evaluation.score >= 85
                              ? 'bg-[#34C759]'
                              : evaluation.score >= 65
                              ? 'bg-[#FF9500]'
                              : 'bg-[#FF3B30]'
                          }`}
                        />
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {evaluation.score >= 85
                            ? '🎉 Pronúncia Excelente!'
                            : evaluation.score >= 65
                            ? '👏 Muito Bom!'
                            : '💪 Vamos Ajustar!'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-xs font-bold shadow-xs">
                        <span className="text-slate-400">Precisão:</span>
                        <span className="tabular-nums text-[#007AFF]">{evaluation.score}%</span>
                      </div>
                    </div>

                    {/* Syllable Accuracy Visualizer */}
                    <div className="mb-3">
                      <span className="text-[11px] text-slate-400 block mb-1">
                        Análise Sílaba por Sílaba:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {evaluation.syllableAnalysis.map((syl, i) => (
                          <div
                            key={i}
                            title={syl.note || syl.status}
                            className={`px-2.5 py-1 rounded-lg text-sm font-bold flex flex-col items-center border ${
                              syl.status === 'correct'
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                                : syl.status === 'close'
                                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                                : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
                            }`}
                          >
                            <span>{syl.char}</span>
                            <span className="text-[9px] font-normal opacity-80">
                              {syl.status === 'correct' ? '✓' : syl.status === 'close' ? '≈' : '✕'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pedagogical Advice */}
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2 bg-white dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                      <strong>Dica da IA:</strong> {evaluation.phoneticAdvice}
                    </p>

                    <p className="text-[11px] text-[#007AFF] font-medium mb-3">
                      {evaluation.encouragement}
                    </p>

                    {/* Actions: Retry or Continue */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          setEvaluation(null);
                          resetTranscript();
                          setManualInput('');
                        }}
                        className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white active:scale-95 transition flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Falar de Novo</span>
                      </button>

                      <button
                        onClick={handleNextTurn}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#34C759] text-white text-xs font-semibold hover:bg-emerald-600 active:scale-95 transition shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <span>Próxima Frase</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Native Speaker Turn: Action Button to Continue to reply */
            <div className="p-4 bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Ouça a fala do atendente e prepare sua resposta</span>
              </div>

              <button
                onClick={handleNextTurn}
                className="py-3 px-5 rounded-xl bg-[#007AFF] text-white font-medium text-xs hover:bg-blue-600 active:scale-95 transition shadow-sm flex items-center gap-1.5 shrink-0 min-h-[44px]"
              >
                <span>Responder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
