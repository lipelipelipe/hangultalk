'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useKoreanTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVoice, setHasVoice] = useState(() => {
    if (typeof window === 'undefined') return true;
    return 'speechSynthesis' in window;
  });
  const [speed, setSpeed] = useState<number>(1.0); // 1.0 (normal) or 0.75 (slow for beginners)
  const currentTextRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const koreanVoices = voices.filter(
        v => v.lang.includes('ko') || v.lang.includes('KO') || v.lang.toLowerCase().startsWith('ko')
      );
      setHasVoice(koreanVoices.length > 0 || voices.length > 0);
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = checkVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback(
    (text: string, customSpeed?: number) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = customSpeed ?? speed;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const koreanVoice =
        voices.find(v => (v.name.includes('Yuna') || v.name.includes('Siri') || v.name.includes('Korean')) && v.lang.startsWith('ko')) ||
        voices.find(v => v.lang.startsWith('ko') || v.lang.includes('KO')) ||
        null;

      if (koreanVoice) {
        utterance.voice = koreanVoice;
      }

      currentTextRef.current = text;
      setIsPlaying(true);

      utterance.onend = () => {
        setIsPlaying(false);
        currentTextRef.current = null;
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        setIsPlaying(false);
        currentTextRef.current = null;
      };

      window.speechSynthesis.speak(utterance);
    },
    [speed]
  );

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    currentTextRef.current = null;
  }, []);

  return {
    isPlaying,
    hasVoice,
    speed,
    setSpeed,
    speak,
    stop,
  };
}
