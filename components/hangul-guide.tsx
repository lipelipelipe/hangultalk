'use client';

import React, { useState } from 'react';
import { HANGUL_ALPHABET, HangulCharacter } from '@/lib/korean-data';
import { useKoreanTTS } from '@/hooks/use-korean-tts';
import { Volume2, Sparkles, BookOpen } from 'lucide-react';

export const HangulGuide: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'consonant' | 'vowel' | 'double_consonant'>('all');
  const [activeChar, setActiveChar] = useState<HangulCharacter | null>(HANGUL_ALPHABET[0]);
  const { speak, isPlaying } = useKoreanTTS();

  const filteredList = HANGUL_ALPHABET.filter((item) => {
    if (selectedType === 'all') return true;
    return item.type === selectedType;
  });

  const handleSelectChar = (item: HangulCharacter) => {
    setActiveChar(item);
    speak(item.char);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#007AFF]" />
          <span>Guia Fonético do Hangul (한글)</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Toque em qualquer letra para ouvir o som nativo e ver a dica de articulação para brasileiros.
        </p>
      </div>

      {/* Type Selector (Segmented buttons) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-800 rounded-2xl">
        <button
          onClick={() => setSelectedType('all')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-medium transition min-h-[36px] ${
            selectedType === 'all'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setSelectedType('consonant')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-medium transition min-h-[36px] ${
            selectedType === 'consonant'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Consoantes
        </button>
        <button
          onClick={() => setSelectedType('vowel')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-medium transition min-h-[36px] ${
            selectedType === 'vowel'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Vogais
        </button>
        <button
          onClick={() => setSelectedType('double_consonant')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-medium transition min-h-[36px] ${
            selectedType === 'double_consonant'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Duplas (Tensas)
        </button>
      </div>

      {/* Active Selected Character Detail Card */}
      {activeChar && (
        <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-extrabold text-[#007AFF] bg-blue-50 dark:bg-blue-950/40 w-16 h-16 rounded-2xl flex items-center justify-center">
                {activeChar.char}
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {activeChar.name}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Romanização: <strong>{activeChar.romanization}</strong>
                </span>
              </div>
            </div>

            <button
              onClick={() => speak(activeChar.char)}
              className="p-3 rounded-full bg-[#007AFF] text-white hover:bg-blue-600 active:scale-95 transition shadow-xs min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/30 text-xs text-amber-950 dark:text-amber-200 mb-3">
            <span className="font-semibold block mb-0.5">Dica de Som para Brasileiros:</span>
            <span>{activeChar.brazilianSoundHint}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Exemplo em palavra:
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                {activeChar.exampleWord}
              </span>
              <span className="text-slate-500 text-xs ml-2">({activeChar.exampleMeaning})</span>
            </div>
            <button
              onClick={() => speak(activeChar.exampleWord)}
              className="text-[#007AFF] font-medium text-xs hover:underline flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ouvir</span>
            </button>
          </div>
        </div>
      )}

      {/* Grid of Characters */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
        {filteredList.map((item) => {
          const isSelected = activeChar?.char === item.char;

          return (
            <button
              key={item.char}
              onClick={() => handleSelectChar(item)}
              className={`p-3 rounded-2xl border transition flex flex-col items-center justify-center min-h-[64px] active:scale-95 ${
                isSelected
                  ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-sm'
                  : 'bg-white dark:bg-[#1C1C1E] text-slate-900 dark:text-white border-black/[0.06] dark:border-white/[0.08] hover:border-slate-300'
              }`}
            >
              <span className="text-2xl font-black">{item.char}</span>
              <span
                className={`text-[10px] mt-0.5 ${
                  isSelected ? 'text-white/80' : 'text-slate-400'
                }`}
              >
                {item.romanization}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
