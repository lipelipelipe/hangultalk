'use client';

// Web Audio API Synthesizer for instant, zero-latency feedback (Falou & Duolingo style)
class SoundEffects {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Triumphant chime when phrase is pronounced correctly (C5 -> E5 -> G5 -> C6 arpeggio)
  playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime + i * 0.08);

      gain.gain.setValueAtTime(0, startTime + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, startTime + i * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + i * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + i * 0.08);
      osc.stop(startTime + i * 0.08 + 0.4);
    });
  }

  // Soft pop when a single syllable or word is matched in green
  playSyllablePop() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  }

  // Gentle encouraging chord when "Não lembro" is tapped
  playReviewHint() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [440, 392]; // A4, G4
    const startTime = ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + i * 0.12);

      gain.gain.setValueAtTime(0.15, startTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + i * 0.12 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + i * 0.12);
      osc.stop(startTime + i * 0.12 + 0.35);
    });
  }
}

export const soundEffects = new SoundEffects();
