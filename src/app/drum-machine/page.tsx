'use client';

import React from 'react';
import FloatingElement from '@/components/FloatingElement';

export default function DrumMachinePage() {
  const playSound = (freq: number, type: OscillatorType) => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <FloatingElement>
          <i className="nes-icon star is-large"></i>
        </FloatingElement>
        <h1 className="title text-2xl md:text-3xl">Drum Machine</h1>
        <p className="text-gray-600">Create simple 8-bit beats.</p>
      </div>

      <div className="nes-container with-title is-rounded">
        <p className="title">Controls</p>
        <div className="flex flex-wrap gap-4 justify-center py-4">
          <button type="button" className="nes-btn is-primary" onClick={() => playSound(150, 'sine')}>Kick</button>
          <button type="button" className="nes-btn is-success" onClick={() => playSound(300, 'square')}>Snare</button>
          <button type="button" className="nes-btn is-warning" onClick={() => playSound(800, 'sawtooth')}>Hi-Hat</button>
        </div>
      </div>
    </div>
  );
}