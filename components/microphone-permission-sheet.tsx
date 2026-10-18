'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, CheckCircle, Settings, X, Keyboard } from 'lucide-react';

interface MicrophonePermissionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onTestPermission: () => void;
}

export const MicrophonePermissionSheet: React.FC<MicrophonePermissionSheetProps> = ({
  isOpen,
  onClose,
  onTestPermission,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-md bg-white dark:bg-[#1C1C1E] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-black/[0.08] dark:border-white/[0.08] z-10"
        >
          {/* iOS Sheet drag handle */}
          <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4 sm:hidden" />

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#007AFF] to-[#34C759] text-white flex items-center justify-center shadow-xs">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Permissão de Microfone no iPhone
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Igual aos apps Falou e Duolingo
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Para avaliar sua pronúncia coreana e dar notas em tempo real, o aplicativo precisa de acesso ao microfone do seu iPhone.
          </p>

          <div className="space-y-3 mb-5">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3 text-xs">
              <CheckCircle className="w-4 h-4 text-[#34C759] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  1. Autorizar na notificação do Safari
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  Quando o iPhone exibir a mensagem &ldquo;Deseja permitir o uso do microfone?&rdquo;, toque em <strong>Permitir</strong>.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3 text-xs">
              <Settings className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  2. Se foi negado anteriormente
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  Abra os <strong>Ajustes do iPhone</strong> &gt; <strong>Safari</strong> &gt; <strong>Microfone</strong> &gt; marque <strong>Permitir</strong>.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3 text-xs">
              <Keyboard className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  3. Dica: Ditado nativo do teclado iOS
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  Você também pode tocar em &ldquo;Usar ditado do teclado&rdquo; e usar o ícone de microfone ao lado da barra de espaço do seu teclado!
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onTestPermission();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-[#007AFF] text-white text-xs font-semibold hover:bg-blue-600 active:scale-95 transition shadow-sm min-h-[44px]"
            >
              Testar e Ativar Microfone Agora
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 active:scale-95 transition min-h-[44px]"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
