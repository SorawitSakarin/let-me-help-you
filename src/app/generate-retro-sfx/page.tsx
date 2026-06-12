"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SoundParams {
  waveform: 'square' | 'sawtooth' | 'triangle' | 'sine' | 'noise';
  startFreq: number;
  endFreq: number;
  duration: number;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  vibratoDepth: number;
  vibratoSpeed: number;
  filterCutoff: number;
  filterDecay: number;
  noiseResolution: number;
  volume: number;
  specialPreset?: 'coin' | 'powerup';
}

const PRESETS: Record<string, SoundParams> = {
  laser: {
    waveform: 'square',
    startFreq: 1200,
    endFreq: 100,
    duration: 0.25,
    attack: 0.0,
    decay: 0.18,
    sustain: 0.1,
    release: 0.05,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    filterCutoff: 8000,
    filterDecay: -4000,
    noiseResolution: 1,
    volume: 0.5,
  },
  explosion: {
    waveform: 'noise',
    startFreq: 400,
    endFreq: 50,
    duration: 0.65,
    attack: 0.0,
    decay: 0.5,
    sustain: 0.05,
    release: 0.1,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    filterCutoff: 1500,
    filterDecay: -1200,
    noiseResolution: 8,
    volume: 0.5,
  },
  jump: {
    waveform: 'triangle',
    startFreq: 180,
    endFreq: 800,
    duration: 0.28,
    attack: 0.02,
    decay: 0.1,
    sustain: 0.3,
    release: 0.1,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    filterCutoff: 5000,
    filterDecay: 0,
    noiseResolution: 1,
    volume: 0.5,
  },
  coin: {
    waveform: 'square',
    startFreq: 988,
    endFreq: 1318,
    duration: 0.38,
    attack: 0.0,
    decay: 0.1,
    sustain: 0.6,
    release: 0.15,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    filterCutoff: 8000,
    filterDecay: 0,
    noiseResolution: 1,
    volume: 0.5,
    specialPreset: 'coin',
  },
  powerup: {
    waveform: 'triangle',
    startFreq: 330,
    endFreq: 880,
    duration: 0.38,
    attack: 0.0,
    decay: 0.15,
    sustain: 0.5,
    release: 0.1,
    vibratoDepth: 20,
    vibratoSpeed: 15,
    filterCutoff: 6000,
    filterDecay: 0,
    noiseResolution: 1,
    volume: 0.5,
    specialPreset: 'powerup',
  },
  hit: {
    waveform: 'noise',
    startFreq: 250,
    endFreq: 30,
    duration: 0.15,
    attack: 0.0,
    decay: 0.1,
    sustain: 0.1,
    release: 0.05,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    filterCutoff: 2500,
    filterDecay: -2000,
    noiseResolution: 4,
    volume: 0.5,
  },
  blip: {
    waveform: 'square',
    startFreq: 880,
    endFreq: 880,
    duration: 0.08,
    attack: 0.0,
    decay: 0.05,
    sustain: 0.0,
    release: 0.03,
    vibratoDepth: 0,
    vibratoSpeed: 0,
    filterCutoff: 5000,
    filterDecay: 0,
    noiseResolution: 1,
    volume: 0.4,
  },
};

export default function RetroSFXPage() {
  const [params, setParams] = useState<SoundParams>(PRESETS.laser);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const activeSourceRef = useRef<OscillatorNode | AudioBufferSourceNode | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Initialize Web Audio context and canvas visualizer
  useEffect(() => {
    return () => {
      // Cleanup visualizer animation and audio on unmount
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      
      const analyser = audioCtxRef.current.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      if (canvasRef.current) {
        startVisualizer(canvasRef.current, analyser);
      }
    }
    
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    
    return {
      ctx: audioCtxRef.current,
      analyser: analyserRef.current!,
    };
  };

  const startVisualizer = (canvas: HTMLCanvasElement, analyser: AnalyserNode) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationFrameIdRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      // Clear canvas with black
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = '#142514';
      ctx.lineWidth = 1;
      
      const gridSpacing = 20;
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw green center lines
      ctx.strokeStyle = '#1d3e1d';
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Draw the waveform
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#00ff00';
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow
    };

    draw();
  };

  const createAudioGraph = (ctx: BaseAudioContext, currentParams: SoundParams, vol: number) => {
    const now = ctx.currentTime;
    const attack = currentParams.attack;
    const decay = currentParams.decay;
    const sustain = currentParams.sustain;
    const release = currentParams.release;
    const duration = currentParams.duration;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    
    // Envelope ADSR
    const attackEnd = now + attack;
    gainNode.gain.linearRampToValueAtTime(vol, attackEnd);
    
    const decayEnd = attackEnd + decay;
    gainNode.gain.linearRampToValueAtTime(vol * sustain, decayEnd);
    
    const releaseStart = Math.max(decayEnd, now + duration - release);
    gainNode.gain.setValueAtTime(vol * sustain, releaseStart);
    
    const totalDuration = releaseStart + release - now;
    gainNode.gain.linearRampToValueAtTime(0, now + totalDuration);

    let sourceNode: OscillatorNode | AudioBufferSourceNode;

    if (currentParams.waveform === 'noise') {
      const sampleRate = ctx.sampleRate;
      const bufferSize = sampleRate * totalDuration;
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);
      
      let lastVal = 0;
      const step = currentParams.noiseResolution || 1;
      
      for (let i = 0; i < bufferSize; i++) {
        if (i % step === 0) {
          lastVal = Math.random() * 2 - 1;
        }
        data[i] = lastVal;
      }
      
      const bufferSource = ctx.createBufferSource();
      bufferSource.buffer = buffer;
      sourceNode = bufferSource;
    } else {
      const osc = ctx.createOscillator();
      osc.type = currentParams.waveform;

      if (currentParams.specialPreset === 'coin') {
        osc.frequency.setValueAtTime(currentParams.startFreq, now);
        osc.frequency.setValueAtTime(currentParams.endFreq, now + 0.08);
      } else if (currentParams.specialPreset === 'powerup') {
        const notes = [330, 440, 550, 660, 880];
        const stepTime = 0.06;
        notes.forEach((freq, idx) => {
          osc.frequency.setValueAtTime(freq, now + idx * stepTime);
        });
      } else {
        osc.frequency.setValueAtTime(currentParams.startFreq, now);
        osc.frequency.linearRampToValueAtTime(currentParams.endFreq, now + duration);
        
        // Vibrato
        if (currentParams.vibratoDepth > 0 && currentParams.vibratoSpeed > 0) {
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          
          lfo.frequency.setValueAtTime(currentParams.vibratoSpeed, now);
          lfoGain.gain.setValueAtTime(currentParams.vibratoDepth, now);
          
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          
          lfo.start(now);
          lfo.stop(now + totalDuration);
        }
      }

      sourceNode = osc;
    }

    const filterNode = ctx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.Q.setValueAtTime(1.0, now);
    
    const startCutoff = currentParams.filterCutoff;
    const endCutoff = Math.max(100, currentParams.filterCutoff + currentParams.filterDecay);
    
    filterNode.frequency.setValueAtTime(startCutoff, now);
    filterNode.frequency.linearRampToValueAtTime(endCutoff, now + duration);

    sourceNode.connect(filterNode);
    filterNode.connect(gainNode);

    return { sourceNode, filterNode, gainNode, totalDuration };
  };

  const handlePlaySound = () => {
    try {
      if (activeSourceRef.current) {
        activeSourceRef.current.stop();
        activeSourceRef.current.disconnect();
      }
    } catch {}

    const { ctx, analyser } = getAudioContext();
    const now = ctx.currentTime;

    const { sourceNode, gainNode, totalDuration } = createAudioGraph(ctx, params, params.volume);
    
    gainNode.connect(analyser);
    analyser.connect(ctx.destination);

    setIsPlaying(true);
    sourceNode.start(now);
    sourceNode.stop(now + totalDuration);
    activeSourceRef.current = sourceNode;

    setTimeout(() => {
      setIsPlaying(false);
    }, totalDuration * 1000);
  };

  const handleStopSound = () => {
    try {
      if (activeSourceRef.current) {
        activeSourceRef.current.stop();
        activeSourceRef.current.disconnect();
        activeSourceRef.current = null;
      }
    } catch {}
    setIsPlaying(false);
  };

  const handleLoadPreset = (key: keyof typeof PRESETS) => {
    const p = PRESETS[key];
    setParams(p);
    // Play immediately on load (good UX for sound design)
    setTimeout(() => {
      const { ctx, analyser } = getAudioContext();
      const now = ctx.currentTime;
      const { sourceNode, gainNode, totalDuration } = createAudioGraph(ctx, p, p.volume);
      gainNode.connect(analyser);
      analyser.connect(ctx.destination);
      sourceNode.start(now);
      sourceNode.stop(now + totalDuration);
      activeSourceRef.current = sourceNode;
    }, 50);
  };

  const handleRandomize = () => {
    const waveforms: ('square' | 'sawtooth' | 'triangle' | 'sine' | 'noise')[] = [
      'square', 'sawtooth', 'triangle', 'sine', 'noise'
    ];
    const randomWave = waveforms[Math.floor(Math.random() * waveforms.length)];
    
    const rParams: SoundParams = {
      waveform: randomWave,
      startFreq: Math.floor(Math.random() * 1400) + 100,
      endFreq: Math.floor(Math.random() * 1400) + 100,
      duration: Math.round((Math.random() * 0.6 + 0.1) * 100) / 100,
      attack: Math.round(Math.random() * 0.15 * 100) / 100,
      decay: Math.round((Math.random() * 0.3 + 0.05) * 100) / 100,
      sustain: Math.round(Math.random() * 0.7 * 100) / 100,
      release: Math.round((Math.random() * 0.3 + 0.05) * 100) / 100,
      vibratoDepth: Math.random() > 0.6 ? Math.floor(Math.random() * 80) : 0,
      vibratoSpeed: Math.random() > 0.6 ? Math.floor(Math.random() * 25) : 0,
      filterCutoff: Math.floor(Math.random() * 7000) + 1000,
      filterDecay: Math.floor(Math.random() * 6000) - 3000,
      noiseResolution: Math.floor(Math.random() * 12) + 1,
      volume: params.volume,
    };
    
    setParams(rParams);
    
    // Play the randomized sound
    setTimeout(() => {
      const { ctx, analyser } = getAudioContext();
      const now = ctx.currentTime;
      const { sourceNode, gainNode, totalDuration } = createAudioGraph(ctx, rParams, rParams.volume);
      gainNode.connect(analyser);
      analyser.connect(ctx.destination);
      sourceNode.start(now);
      sourceNode.stop(now + totalDuration);
      activeSourceRef.current = sourceNode;
    }, 50);
  };

  const handleMutate = () => {
    const mutateVal = (val: number, range: number, min: number, max: number) => {
      const change = (Math.random() * 2 - 1) * range;
      return Math.max(min, Math.min(max, Math.round((val + change) * 100) / 100));
    };

    const mParams: SoundParams = {
      ...params,
      startFreq: Math.round(mutateVal(params.startFreq, 150, 40, 2000)),
      endFreq: Math.round(mutateVal(params.endFreq, 150, 40, 2000)),
      duration: mutateVal(params.duration, 0.1, 0.05, 1.5),
      attack: mutateVal(params.attack, 0.05, 0.0, 0.5),
      decay: mutateVal(params.decay, 0.08, 0.01, 1.0),
      sustain: mutateVal(params.sustain, 0.15, 0.0, 1.0),
      release: mutateVal(params.release, 0.08, 0.01, 1.0),
      vibratoDepth: params.waveform !== 'noise' ? Math.round(mutateVal(params.vibratoDepth, 20, 0, 150)) : 0,
      vibratoSpeed: params.waveform !== 'noise' ? Math.round(mutateVal(params.vibratoSpeed, 5, 0, 35)) : 0,
      filterCutoff: Math.round(mutateVal(params.filterCutoff, 800, 200, 9500)),
      filterDecay: Math.round(mutateVal(params.filterDecay, 800, -4000, 4000)),
      noiseResolution: params.waveform === 'noise' ? Math.max(1, Math.min(32, params.noiseResolution + (Math.random() > 0.5 ? 1 : -1))) : 1,
    };
    
    // Clear special preset triggers
    if (mParams.specialPreset) {
      delete mParams.specialPreset;
    }

    setParams(mParams);

    // Play the mutated sound
    setTimeout(() => {
      const { ctx, analyser } = getAudioContext();
      const now = ctx.currentTime;
      const { sourceNode, gainNode, totalDuration } = createAudioGraph(ctx, mParams, mParams.volume);
      gainNode.connect(analyser);
      analyser.connect(ctx.destination);
      sourceNode.start(now);
      sourceNode.stop(now + totalDuration);
      activeSourceRef.current = sourceNode;
    }, 50);
  };

  const bufferToWav = (buffer: AudioBuffer): Blob => {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const bufferArr = new ArrayBuffer(length);
    const view = new DataView(bufferArr);
    const channels: Float32Array[] = [];
    let sample;
    let offset = 0;
    let pos = 0;

    const writeUint16 = (data: number) => {
      view.setUint16(pos, data, true);
      pos += 2;
    };

    const writeUint32 = (data: number) => {
      view.setUint32(pos, data, true);
      pos += 4;
    };

    writeUint32(0x46464952); // "RIFF"
    writeUint32(length - 8); // file length - 8
    writeUint32(0x45564157); // "WAVE"
    
    writeUint32(0x20746d66); // "fmt " chunk
    writeUint32(16);         // chunk length
    writeUint16(1);          // sample format (raw PCM)
    writeUint16(numOfChan);
    writeUint32(buffer.sampleRate);
    writeUint32(buffer.sampleRate * 2 * numOfChan); // byte rate
    writeUint16(numOfChan * 2); // block align
    writeUint16(16);         // bits per sample
    
    writeUint32(0x61746164); // "data" chunk
    writeUint32(length - pos - 4); // chunk length

    for (let i = 0; i < numOfChan; i++) {
      channels.push(buffer.getChannelData(i));
    }

    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    return new Blob([view], { type: 'audio/wav' });
  };

  const handleDownloadWav = () => {
    const sampleRate = 44100;
    const decayEnd = params.attack + params.decay;
    const releaseStart = Math.max(decayEnd, params.duration - params.release);
    const totalDuration = releaseStart + params.release;

    const offlineCtx = new OfflineAudioContext(1, sampleRate * totalDuration, sampleRate);
    
    const { sourceNode, gainNode } = createAudioGraph(offlineCtx, params, params.volume);
    
    gainNode.connect(offlineCtx.destination);
    
    if (sourceNode instanceof OscillatorNode) {
      sourceNode.start(0);
      sourceNode.stop(totalDuration);
    } else if (sourceNode instanceof AudioBufferSourceNode) {
      sourceNode.start(0);
      sourceNode.stop(totalDuration);
    }

    offlineCtx.startRendering().then((renderedBuffer) => {
      const blob = bufferToWav(renderedBuffer);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `retro_sfx_${params.waveform}_${Date.now()}.wav`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const getAudioCode = () => {
    let sourceSetup = '';
    
    if (params.specialPreset === 'coin') {
      sourceSetup = `const osc = ctx.createOscillator();
  osc.type = "${params.waveform}";
  osc.frequency.setValueAtTime(${params.startFreq}, now);
  osc.frequency.setValueAtTime(${params.endFreq}, now + 0.08);
  sourceNode = osc;`;
    } else if (params.specialPreset === 'powerup') {
      sourceSetup = `const osc = ctx.createOscillator();
  osc.type = "${params.waveform}";
  const notes = [330, 440, 550, 660, 880];
  const stepTime = 0.06;
  notes.forEach((freq, idx) => {
    osc.frequency.setValueAtTime(freq, now + idx * stepTime);
  });
  sourceNode = osc;`;
    } else if (params.waveform === 'noise') {
      sourceSetup = `const bufferSize = ctx.sampleRate * totalDuration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastVal = 0;
  const step = ${params.noiseResolution || 1};
  for (let i = 0; i < bufferSize; i++) {
    if (i % step === 0) {
      lastVal = Math.random() * 2 - 1;
    }
    data[i] = lastVal;
  }
  sourceNode = ctx.createBufferSource();
  sourceNode.buffer = buffer;`;
    } else {
      sourceSetup = `const osc = ctx.createOscillator();
  osc.type = "${params.waveform}";
  osc.frequency.setValueAtTime(${params.startFreq}, now);
  osc.frequency.linearRampToValueAtTime(${params.endFreq}, now + ${params.duration});
  
  if (${params.vibratoDepth} > 0 && ${params.vibratoSpeed} > 0) {
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(${params.vibratoSpeed}, now);
    lfoGain.gain.setValueAtTime(${params.vibratoDepth}, now);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start(now);
    lfo.stop(now + totalDuration);
  }
  sourceNode = osc;`;
    }

    return `function playRetroSFX() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();
  const now = ctx.currentTime;
  const volume = ${params.volume};
  
  const decayEnd = ${params.attack} + ${params.decay};
  const releaseStart = Math.max(decayEnd, ${params.duration} - ${params.release});
  const totalDuration = releaseStart + ${params.release};

  // ADSR Gain Envelope Node
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + ${params.attack});
  gainNode.gain.linearRampToValueAtTime(volume * ${params.sustain}, now + ${params.attack} + ${params.decay});
  gainNode.gain.setValueAtTime(volume * ${params.sustain}, now + releaseStart);
  gainNode.gain.linearRampToValueAtTime(0, now + totalDuration);

  // Source Node
  let sourceNode;
  ${sourceSetup}

  // Low Pass Filter Node
  const filterNode = ctx.createBiquadFilter();
  filterNode.type = "lowpass";
  filterNode.Q.setValueAtTime(1.0, now);
  filterNode.frequency.setValueAtTime(${params.filterCutoff}, now);
  filterNode.frequency.linearRampToValueAtTime(
    Math.max(100, ${params.filterCutoff} + ${params.filterDecay}),
    now + ${params.duration}
  );

  // Connect & Play
  sourceNode.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(ctx.destination);

  sourceNode.start(now);
  sourceNode.stop(now + totalDuration);
}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getAudioCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const updateParam = (key: keyof SoundParams, value: number | string) => {
    setParams(prev => {
      const next = { ...prev, [key]: value };
      // Clear specialPreset flag if user modifies key sweep sliders manually
      if ((key === 'startFreq' || key === 'endFreq' || key === 'waveform') && next.specialPreset) {
        delete next.specialPreset;
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon trophy is-medium"></i>
          Retro SFX Generator
        </h2>
        <Link href="/" className="nes-btn text-xs md:text-sm">
          Back
        </Link>
      </div>

      {/* Preset Sound Buttons */}
      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
          Presets
        </h3>
        <div className="flex flex-wrap gap-2 justify-center py-1">
          <button type="button" className="nes-btn is-primary text-xs" onClick={() => handleLoadPreset('laser')}>
            🚀 Laser
          </button>
          <button type="button" className="nes-btn is-warning text-xs" onClick={() => handleLoadPreset('explosion')}>
            💥 Explosion
          </button>
          <button type="button" className="nes-btn is-success text-xs" onClick={() => handleLoadPreset('jump')}>
            🦘 Jump
          </button>
          <button type="button" className="nes-btn is-error text-xs" onClick={() => handleLoadPreset('coin')}>
            🪙 Coin
          </button>
          <button type="button" className="nes-btn is-primary text-xs" onClick={() => handleLoadPreset('powerup')}>
            ⚡ Powerup
          </button>
          <button type="button" className="nes-btn is-warning text-xs" onClick={() => handleLoadPreset('hit')}>
            🤕 Hit/Hurt
          </button>
          <button type="button" className="nes-btn is-success text-xs" onClick={() => handleLoadPreset('blip')}>
            💬 Blip
          </button>
          <button type="button" className="nes-btn text-xs" onClick={handleRandomize}>
            🎲 Random
          </button>
          <button type="button" className="nes-btn text-xs" onClick={handleMutate}>
            🧪 Mutate
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Parameters Sliders (8 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
              Oscillator & Waveform
            </h3>

            <div className="flex flex-col gap-4">
              {/* Waveform Selector */}
              <div>
                <label className="block text-xs font-bold mb-2">Waveform:</label>
                <div className="flex flex-wrap gap-4">
                  {(['square', 'sawtooth', 'triangle', 'sine', 'noise'] as const).map((wave) => (
                    <label key={wave} className="flex items-center gap-2 text-xs cursor-pointer select-none">
                      <input
                        type="radio"
                        className="nes-radio"
                        name="waveform"
                        checked={params.waveform === wave}
                        onChange={() => updateParam('waveform', wave)}
                      />
                      <span className="capitalize">{wave}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pitch Sweep controls */}
              {params.waveform !== 'noise' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="font-bold">Start Freq:</span>
                      <span className="font-mono">{params.startFreq} Hz</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="2000"
                      step="10"
                      value={params.startFreq}
                      onChange={(e) => updateParam('startFreq', parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="font-bold">End Freq (Sweep):</span>
                      <span className="font-mono">{params.endFreq} Hz</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="2000"
                      step="10"
                      value={params.endFreq}
                      onChange={(e) => updateParam('endFreq', parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="font-bold">Noise Resolution (Sample-and-Hold):</span>
                    <span className="font-mono">{params.noiseResolution === 1 ? '1 (White Noise)' : `${params.noiseResolution} (8-Bit Crunch)`}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="32"
                    step="1"
                    value={params.noiseResolution}
                    onChange={(e) => updateParam('noiseResolution', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                  />
                </div>
              )}

              {/* Sound Duration */}
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold">Sound Duration:</span>
                  <span className="font-mono">{params.duration} s</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.5"
                  step="0.01"
                  value={params.duration}
                  onChange={(e) => updateParam('duration', parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                />
              </div>
            </div>
          </div>

          {/* Volume Envelope ADSR */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
              Volume Envelope (ADSR)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold">Attack Time:</span>
                  <span className="font-mono">{params.attack} s</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.01"
                  value={params.attack}
                  onChange={(e) => updateParam('attack', parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold">Decay Time:</span>
                  <span className="font-mono">{params.decay} s</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="1.0"
                  step="0.01"
                  value={params.decay}
                  onChange={(e) => updateParam('decay', parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold">Sustain Level:</span>
                  <span className="font-mono">{Math.round(params.sustain * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.0"
                  step="0.05"
                  value={params.sustain}
                  onChange={(e) => updateParam('sustain', parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold">Release Time:</span>
                  <span className="font-mono">{params.release} s</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="1.0"
                  step="0.01"
                  value={params.release}
                  onChange={(e) => updateParam('release', parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                />
              </div>
            </div>
          </div>

          {/* Vibrato & LPF Filter */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
              Modulation & Filter
            </h3>

            <div className="flex flex-col gap-4">
              {/* Low Pass Filter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="font-bold">Filter Cutoff:</span>
                    <span className="font-mono">{params.filterCutoff} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="10000"
                    step="100"
                    value={params.filterCutoff}
                    onChange={(e) => updateParam('filterCutoff', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="font-bold">Filter Sweep:</span>
                    <span className="font-mono">{params.filterDecay >= 0 ? `+${params.filterDecay}` : params.filterDecay} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="-5000"
                    max="5000"
                    step="100"
                    value={params.filterDecay}
                    onChange={(e) => updateParam('filterDecay', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                  />
                </div>
              </div>

              {/* LFO Vibrato (Frequency Modulation) */}
              {params.waveform !== 'noise' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-dashed border-gray-300 pt-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="font-bold">Vibrato Depth:</span>
                      <span className="font-mono">{params.vibratoDepth} Hz</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="150"
                      step="5"
                      value={params.vibratoDepth}
                      onChange={(e) => updateParam('vibratoDepth', parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="font-bold">Vibrato Speed:</span>
                      <span className="font-mono">{params.vibratoSpeed} Hz</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="1"
                      value={params.vibratoSpeed}
                      onChange={(e) => updateParam('vibratoSpeed', parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Oscilloscope, Playback controls, Exports (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Neon Oscilloscope Visualizer Screen */}
          <div className="nes-container is-dark is-rounded flex flex-col p-3">
            <h4 className="text-xs uppercase font-bold tracking-wider mb-2 text-center text-[#00ff00]">Oscilloscope Visualizer</h4>
            <div className="border-4 border-black bg-black rounded overflow-hidden relative">
              <canvas
                ref={canvasRef}
                width={360}
                height={200}
                className="w-full h-[200px] block"
              />
              {/* Scanline CRT simulation */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
            </div>
          </div>

          {/* Live Playback Controls */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
              Playback
            </h3>

            <div className="flex flex-col gap-4">
              {/* Volume Master Slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold">Master Volume:</span>
                  <span className="font-mono">{Math.round(params.volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.0"
                  step="0.05"
                  value={params.volume}
                  onChange={(e) => updateParam('volume', parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-200 border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full">
                <button
                  type="button"
                  onClick={handlePlaySound}
                  className={`nes-btn ${isPlaying ? 'is-disabled' : 'is-error'} flex-grow text-xs`}
                  disabled={isPlaying}
                >
                  {isPlaying ? '⚡ PLAYING...' : '🔊 PLAY SOUND'}
                </button>
                <button
                  type="button"
                  onClick={handleStopSound}
                  className="nes-btn text-xs px-3"
                  disabled={!isPlaying}
                >
                  🛑
                </button>
              </div>
            </div>
          </div>

          {/* Export Code / File */}
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
              Export Asset
            </h3>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="nes-btn is-success w-full text-xs"
                onClick={handleDownloadWav}
              >
                💾 Download WAV File
              </button>

              <button
                type="button"
                className="nes-btn is-primary w-full text-xs"
                onClick={handleCopyCode}
              >
                {copied ? '✔️ COPIED CODE!' : '📋 Copy Web Audio JS'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded documentation & how to use */}
      <div className="nes-container with-title is-rounded bg-white mt-4">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>
          Developer Usage
        </h3>
        <p className="text-xs leading-relaxed mb-4">
          Modify sliders to customize sound parameters or load predefined 8-bit retro sound presets. 
          Use the <strong>Download WAV</strong> button to get clean PCM audio assets for games or video projects. 
          Use the <strong>Copy Web Audio JS</strong> button to copy a zero-dependency JavaScript function that synthesizes this sound natively in the browser without loading heavy audio assets.
        </p>

        <div className="relative">
          <label className="text-[10px] font-bold block mb-1">Preview Code:</label>
          <pre className="border-4 border-black bg-gray-50 p-3 text-[9px] font-mono rounded overflow-x-auto whitespace-pre leading-relaxed select-all max-h-[200px]">
            {getAudioCode()}
          </pre>
        </div>
      </div>
    </div>
  );
}
