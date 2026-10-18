'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sparkles, Layers } from 'lucide-react';
import { LEVELS, LevelInfo } from '@/lib/korean-curriculum';

interface LevelSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: number;
  onSelectLevel: (lvl: number) => void;
}

export const LevelSelectorModal: React.FC<LevelSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLevel,
  onSelectLevel,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="w-full max-w-md bg-[#131B2E] border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#00C3FF]/20 text-[#00C3FF] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Níveis de Aprendizado</h3>
                <p className="text-xs text-slate-400">Do Zero Absoluto à Fluência Prática</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Level List */}
          <div className="space-y-3 py-4 flex-1">
            {LEVELS.map((lvl) => {
              const isSelected = currentLevel === lvl.level;

              return (
                <button
                  key={lvl.level}
                  onClick={() => {
                    onSelectLevel(lvl.level);
                    onClose();
                  }}
                  className={`w-full p-4 rounded-2xl border text-left transition-all relative flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#00C3FF] shadow-[0_0_20px_rgba(0,195,255,0.2)]'
                      : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/15'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{ backgroundColor: `${lvl.color}20` }}
                  >
                    {lvl.badgeEmoji}
                  </div>

                  <div className="flex-1 pr-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-black text-white">{lvl.title}</span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full bg-[#00C3FF] text-slate-950 font-black text-[10px]">
                          ATIVO
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mb-2">{lvl.subtitle}</p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 font-semibold text-white">
                        <span>📚</span> {lvl.wordCount} Palavras
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-semibold text-[#00C3FF]">
                        <span>⚡</span> +{lvl.phraseCombinationsCount} Frases do Dia a Dia
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute right-4 top-4 w-6 h-6 rounded-full bg-[#00C3FF] text-slate-950 flex items-center justify-center font-bold">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-center text-[11px] text-slate-500 pt-2">
            💡 As palavras de níveis anteriores continuam sendo reforçadas no algoritmo SRS.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
