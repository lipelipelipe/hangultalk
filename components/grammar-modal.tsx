'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Lightbulb, Volume2 } from 'lucide-react';
import { SRSCard } from '@/lib/srs-learning-data';
import { useKoreanTTS } from '@/hooks/use-korean-tts';

interface GrammarModalProps {
  card: SRSCard | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GrammarModal: React.FC<GrammarModalProps> = ({ card, isOpen, onClose }) => {
  const { speak } = useKoreanTTS();

  if (!isOpen || !card) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-0 sm:p-4">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative w-full max-w-md bg-[#182032] text-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-white/[0.08] z-10 max-h-[85vh] overflow-y-auto"
        >
          {/* iOS Sheet drag handle */}
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-[#00C3FF] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {card.grammar.title}
              </h3>
              <p className="text-xs text-slate-400">
                Gramática e Estrutura Coreana
              </p>
            </div>
          </div>

          {/* Explanation */}
          <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-white/5 p-3 rounded-2xl border border-white/5">
            {card.grammar.explanation}
          </p>

          {/* Breakdown Rows */}
          <div className="space-y-2.5 mb-5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Composição da Frase:
            </span>

            {card.grammar.breakdown.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-[#F59E0B]">
                      {item.korean}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      ({item.roman})
                    </span>
                  </div>
                  <span className="text-xs text-slate-300 block mt-0.5">
                    {item.role}
                  </span>
                </div>

                <button
                  onClick={() => speak(item.korean)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
                >
                  <Volume2 className="w-4 h-4 text-[#00C3FF]" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#00C3FF] text-slate-950 font-bold text-xs hover:bg-[#00b4eb] active:scale-95 transition min-h-[44px]"
          >
            Entendido! Continuar Treino
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
