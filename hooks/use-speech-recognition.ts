'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Declaration for Web Speech API SpeechRecognition
interface IWindowSpeechRecognition extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isSupported: boolean;
  hasPermission: boolean | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  setManualTranscript: (text: string) => void;
}

export function useSpeechRecognition(lang: string = 'ko-KR'): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const win = window as unknown as IWindowSpeechRecognition;
    return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
  });
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const win = window as unknown as IWindowSpeechRecognition;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        setHasPermission(true);
      };

      recognition.onresult = (event: any) => {
        let currentInterim = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript((prev) => (prev ? `${prev} ${finalTranscript}` : finalTranscript).trim());
        }
        setInterimTranscript(currentInterim);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setHasPermission(false);
          setError('Permissão do microfone negada. No iPhone: Ajustes > Safari > Microfone > Permitir.');
        } else if (event.error === 'no-speech') {
          // Normal timeout if user was quiet
        } else {
          setError(`Erro no reconhecimento: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e: unknown) {
      console.error('Failed to initialize SpeechRecognition:', e);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, [lang]);

  const startListening = useCallback(() => {
    setError(null);
    setTranscript('');
    setInterimTranscript('');

    if (!recognitionRef.current) {
      if (navigator?.mediaDevices?.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(() => setHasPermission(true))
          .catch(() => setHasPermission(false));
      }
      return;
    }

    try {
      recognitionRef.current.lang = lang;
      recognitionRef.current.start();
    } catch {
      try {
        recognitionRef.current.abort();
        setTimeout(() => {
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.error('Retry start error', e);
          }
        }, 150);
      } catch {}
    }
  }, [lang]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        recognitionRef.current.abort();
      }
    }
    setIsListening(false);
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  const setManualTranscript = useCallback((text: string) => {
    setTranscript(text);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    hasPermission,
    startListening,
    stopListening,
    resetTranscript,
    setManualTranscript,
  };
}
