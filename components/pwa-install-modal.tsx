'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share, PlusSquare, X, Smartphone, CheckCircle } from 'lucide-react';
import { usePWAInstall } from '@/hooks/use-pwa-install';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, install } = usePWAInstall();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-md bg-white dark:bg-[#1C1C1E] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-black/[0.08] dark:border-white/[0.08] z-10"
        >
          {/* iOS Sheet drag handle bar */}
          <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4 sm:hidden" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#007AFF] text-white flex items-center justify-center font-bold text-xl shadow-xs">
              한
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Instalar no seu iPhone
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Aparência 100% nativa sem barra do Safari
              </p>
            </div>
          </div>

          <div className="space-y-4 my-5">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-[#007AFF] flex items-center justify-center shrink-0 font-bold text-xs">
                1
              </div>
              <div className="text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  Toque no botão Compartilhar do Safari
                </span>
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                  Procure pelo ícone <Share className="w-3.5 h-3.5 text-[#007AFF] inline" /> na barra inferior do Safari.
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-[#007AFF] flex items-center justify-center shrink-0 font-bold text-xs">
                2
              </div>
              <div className="text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  Selecione &ldquo;Adicionar à Tela de Início&rdquo;
                </span>
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                  Role a lista e clique em <PlusSquare className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 inline" /> &ldquo;Adicionar à Tela de Início&rdquo;.
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-[#007AFF] flex items-center justify-center shrink-0 font-bold text-xs">
                3
              </div>
              <div className="text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  Pronto! Abra o ícone na tela
                </span>
                <span className="text-slate-500 dark:text-slate-400 block mt-1">
                  O app abrirá em tela cheia como se tivesse sido baixado da App Store!
                </span>
              </div>
            </div>
          </div>

          {/* If browser supports direct install prompt (e.g. Chrome / Edge / Android) */}
          {isInstallable && (
            <button
              onClick={async () => {
                await install();
                onClose();
              }}
              className="w-full py-3 mb-2 rounded-xl bg-[#007AFF] text-white text-xs font-semibold hover:bg-blue-600 active:scale-95 transition shadow-sm min-h-[44px]"
            >
              Instalar Automaticamente
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 active:scale-95 transition min-h-[44px]"
          >
            Entendi
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
