'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

type TestMode = 'quotes' | 'code' | 'pangrams';
type TestDuration = 15 | 30 | 60;
type TestState = 'idle' | 'typing' | 'finished';

interface ScoreEntry {
  wpm: number;
  accuracy: number;
  mode: string;
  duration: number;
  date: string;
  rank: string;
}

const GAME_QUOTES = [
  "It's dangerous to go alone! Take this.",
  "Thank you Mario! But our princess is in another castle.",
  "All your base are belong to us. Make your time.",
  "A man chooses, a slave obeys. Obey!",
  "Do a barrel roll! Press Z or R twice.",
  "What is a man? A miserable little pile of secrets.",
  "The cake is a lie. But there is still science.",
  "War. War never changes. Or does it?",
  "Stay awhile and listen! The story begins now.",
  "Finish him! Fatality! Flawless victory.",
  "It's time to kick ass and chew bubble gum.",
  "I am the great mighty poo and I'm going to throw my...",
  "Hey! Listen! Watch out! Look!",
  "A sword wields no strength unless the hand that holds it has courage."
];

const CODE_SNIPPETS = [
  "const add = (a, b) => a + b; console.log(add(5, 10));",
  "function isEven(num) { return num % 2 === 0; }",
  "import React, { useState } from 'react';",
  "for (let i = 0; i < 10; i++) { console.log(i); }",
  "<div className=\"nes-container\"><p>Hello!</p></div>",
  "struct Point { x: i32, y: i32 } impl Point { fn new() {} }",
  "def fib(n): return n if n < 2 else fib(n-1) + fib(n-2)",
  "const [count, setCount] = useState<number>(0);",
  "interface User { id: number; name: string; isAdmin: boolean; }",
  "const greet = (name: string): string => `Hello, ${name}!`;"
];

const PANGRAMS = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump!",
  "Sphinx of black quartz, judge my vow.",
  "Jackdaws love my big sphinx of quartz.",
  "The five boxing wizards jump quickly.",
  "Crazy Fredrick bought many very exquisite opal jewels."
];

const getRank = (wpm: number): { name: string; desc: string } => {
  if (wpm >= 80) return { name: 'S', desc: 'Chiptune Overlord' };
  if (wpm >= 60) return { name: 'A', desc: 'Console Cowboy' };
  if (wpm >= 40) return { name: 'B', desc: 'Byte Broker' };
  if (wpm >= 25) return { name: 'C', desc: 'Pixel Plodder' };
  return { name: 'F', desc: 'Glitched Controller' };
};

export default function TypingSpeedTestPage() {
  const [mode, setMode] = useState<TestMode>('quotes');
  const [duration, setDuration] = useState<TestDuration>(30);
  const [testState, setTestState] = useState<TestState>('idle');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [text, setText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);

  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Load scores
  useEffect(() => {
    const saved = localStorage.getItem('retro_typing_scores');
    if (saved) {
      try {
        setLeaderboard(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Set initial text when mode changes or game is reset
  const generateNewText = useCallback((selectedMode: TestMode) => {
    let pool = GAME_QUOTES;
    if (selectedMode === 'code') pool = CODE_SNIPPETS;
    if (selectedMode === 'pangrams') pool = PANGRAMS;

    // Pick 3 random phrases and join them to ensure long enough text for high speed typers
    const selected: string[] = [];
    const tempPool = [...pool];
    const phraseCount = selectedMode === 'code' ? 2 : 3;

    for (let i = 0; i < phraseCount; i++) {
      if (tempPool.length === 0) break;
      const idx = Math.floor(Math.random() * tempPool.length);
      selected.push(tempPool[idx]);
      tempPool.splice(idx, 1);
    }

    setText(selected.join(' '));
  }, []);

  useEffect(() => {
    if (testState === 'idle') {
      generateNewText(mode);
    }
  }, [mode, testState, generateNewText]);

  // Audio Synthesizer for Mechanical Keyboard Clacks
  const playKeySound = useCallback((isSpace = false, isBackspace = false) => {
    if (!soundEnabled || typeof window === 'undefined') return;

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      
      if (isSpace) {
        // Spacebar - lower pitch, slightly longer decay
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      } else if (isBackspace) {
        // Backspace - muted pop
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      } else {
        // Standard Key - sharp mechanical click
        const pitch = 300 + Math.random() * 100;
        osc.frequency.setValueAtTime(pitch, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
      }

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Audio context blocked or not supported
    }
  }, [soundEnabled]);

  // End the test
  const endTest = useCallback((finalTyped: string) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTestState('finished');

    // Calculate final stats
    let correct = 0;
    for (let i = 0; i < finalTyped.length; i++) {
      if (finalTyped[i] === text[i]) {
        correct++;
      }
    }

    const elapsed = duration - timeLeft;
    const finalElapsed = elapsed > 0 ? elapsed : duration;
    const minutes = finalElapsed / 60;
    const finalWpm = minutes > 0 ? Math.round((correct / 5) / minutes) : 0;
    const finalAcc = finalTyped.length > 0 ? Math.round((correct / finalTyped.length) * 100) : 100;

    const rankInfo = getRank(finalWpm);

    const newScore: ScoreEntry = {
      wpm: finalWpm,
      accuracy: finalAcc,
      mode: mode.toUpperCase(),
      duration: duration,
      date: new Date().toLocaleDateString(),
      rank: rankInfo.name
    };

    setLeaderboard((prev) => {
      const updated = [...prev, newScore]
        .sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy)
        .slice(0, 5); // Keep top 5
      localStorage.setItem('retro_typing_scores', JSON.stringify(updated));
      return updated;
    });
  }, [text, duration, timeLeft, mode]);

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    
    // Safety check: don't allow typing beyond the text length
    if (val.length > text.length) return;

    // Detect if key was backspace or space for sound
    const isBackspace = val.length < typedText.length;
    const isSpace = val.endsWith(' ') && !isBackspace;
    playKeySound(isSpace, isBackspace);

    if (testState === 'idle') {
      setTestState('typing');
      startTimeRef.current = Date.now();
      setTimeLeft(duration);

      // Start timer
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            endTest(val);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    setTypedText(val);
    setTotalTyped(val.length);

    // Calculate accuracy real-time
    let correct = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === text[i]) {
        correct++;
      }
    }
    setCorrectCount(correct);

    // End test immediately if the user completes the entire text early
    if (val.length === text.length) {
      endTest(val);
    }
  };

  // Reset Test
  const resetTest = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTestState('idle');
    setTypedText('');
    setTimeLeft(duration);
    setCorrectCount(0);
    setTotalTyped(0);
    generateNewText(mode);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 50);
  };

  // Focus input when clicking terminal
  const focusTerminal = () => {
    if (testState !== 'finished' && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Calculate live WPM and Accuracy
  const timeElapsed = duration - timeLeft;
  const liveWpm = timeElapsed > 0 ? Math.round((correctCount / 5) / (timeElapsed / 60)) : 0;
  const liveAccuracy = totalTyped > 0 ? Math.round((correctCount / totalTyped) * 100) : 100;

  // Render text helper to highlight correct/incorrect letters
  const renderTextCharacters = () => {
    return text.split('').map((char, index) => {
      let charClass = 'text-white/60 font-semibold'; // Untyped - dimmed white for clear distinction
      let charStyle: React.CSSProperties = {};
      const isCurrent = index === typedText.length;

      if (index < typedText.length) {
        if (typedText[index] === char) {
          charClass = 'text-[#39ff14] font-bold'; // Correct - bright green
          charStyle = { textShadow: '0 0 4px rgba(57,255,20,0.6)' };
        } else {
          charClass = 'text-[#ff4d4d] line-through bg-red-950/40 font-bold'; // Incorrect - red
        }
      }

      return (
        <span key={index} className={`relative text-sm md:text-base tracking-wide ${charClass}`} style={charStyle}>
          {isCurrent && (
            <span className="absolute left-0 right-0 h-[1.2em] bg-white/90 animate-pulse z-10" style={{ bottom: '-1px' }}></span>
          )}
          {char}
        </span>
      );
    });
  };

  // Clear Leaderboard
  const clearLeaderboard = () => {
    localStorage.removeItem('retro_typing_scores');
    setLeaderboard([]);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn text-xs">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title w-full">
        <h2 className="title text-sm md:text-base">Retro Speed Typer</h2>

        <div className="flex flex-col gap-6 py-2">
          <p className="text-xs text-gray-600 text-center">
            Type the code or quotes below as fast as possible. Features Web Audio synthesizer key clicks!
          </p>

          {/* Test Parameters Settings (Only visible in idle state) */}
          {testState === 'idle' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border-4 border-dashed border-gray-300">
              {/* Mode Selection */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase">Mode:</span>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-2 text-[10px] cursor-pointer">
                    <input
                      type="radio"
                      className="nes-radio"
                      name="mode"
                      checked={mode === 'quotes'}
                      onChange={() => setMode('quotes')}
                    />
                    <span>Game Quotes</span>
                  </label>
                  <label className="flex items-center gap-2 text-[10px] cursor-pointer">
                    <input
                      type="radio"
                      className="nes-radio"
                      name="mode"
                      checked={mode === 'code'}
                      onChange={() => setMode('code')}
                    />
                    <span>Code Snippets</span>
                  </label>
                  <label className="flex items-center gap-2 text-[10px] cursor-pointer">
                    <input
                      type="radio"
                      className="nes-radio"
                      name="mode"
                      checked={mode === 'pangrams'}
                      onChange={() => setMode('pangrams')}
                    />
                    <span>Pangrams</span>
                  </label>
                </div>
              </div>

              {/* Duration Settings */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase">Time limit:</span>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-2 text-[10px] cursor-pointer">
                    <input
                      type="radio"
                      className="nes-radio"
                      name="duration"
                      checked={duration === 15}
                      onChange={() => {
                        setDuration(15);
                        setTimeLeft(15);
                      }}
                    />
                    <span>15 Seconds</span>
                  </label>
                  <label className="flex items-center gap-2 text-[10px] cursor-pointer">
                    <input
                      type="radio"
                      className="nes-radio"
                      name="duration"
                      checked={duration === 30}
                      onChange={() => {
                        setDuration(30);
                        setTimeLeft(30);
                      }}
                    />
                    <span>30 Seconds</span>
                  </label>
                  <label className="flex items-center gap-2 text-[10px] cursor-pointer">
                    <input
                      type="radio"
                      className="nes-radio"
                      name="duration"
                      checked={duration === 60}
                      onChange={() => {
                        setDuration(60);
                        setTimeLeft(60);
                      }}
                    />
                    <span>60 Seconds</span>
                  </label>
                </div>
              </div>

              {/* Sound Options */}
              <div className="flex flex-col gap-2 justify-center">
                <label className="flex items-center gap-2 text-[10px] cursor-pointer">
                  <input
                    type="checkbox"
                    className="nes-checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                  />
                  <span>Keyboard Sound</span>
                </label>
              </div>
            </div>
          )}

          {/* Test Running States */}
          {testState !== 'finished' ? (
            <div className="flex flex-col gap-4">
              {/* Real-time stats display */}
              <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
                <div className="text-[10px] font-bold">
                  TIME: <span className="text-red-600">{timeLeft}s</span>
                </div>
                <div className="text-[10px] font-bold">
                  WPM: <span className="text-blue-600">{liveWpm}</span>
                </div>
                <div className="text-[10px] font-bold">
                  ACC: <span className="text-green-600">{liveAccuracy}%</span>
                </div>
              </div>

              {/* The Retro CRT Monitor Screen */}
              <div
                role="button"
                tabIndex={0}
                onClick={focusTerminal}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    focusTerminal();
                  }
                }}
                className="relative w-full min-h-[160px] p-6 rounded border-4 border-black select-none overflow-hidden cursor-text flex flex-wrap gap-y-1 align-content-start"
                style={{
                  backgroundColor: '#000000',
                  boxShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.03), 0 0 10px rgba(0, 0, 0, 0.2)',
                  fontFamily: 'Courier New, Courier, monospace',
                }}
              >
                <div className="w-full flex flex-wrap gap-y-2 leading-relaxed z-10">
                  {renderTextCharacters()}
                </div>

                {/* Floating click prompt in idle mode */}
                {testState === 'idle' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/75 z-30 pointer-events-none">
                    <span className="text-[10px] md:text-xs text-white font-bold tracking-wider uppercase animate-pulse">
                      &gt; Click here to begin typing &lt;
                    </span>
                  </div>
                )}
              </div>

              <textarea
                ref={inputRef}
                value={typedText}
                onChange={handleInputChange}
                className="absolute opacity-0 -z-50 pointer-events-none h-0 w-0"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />

              <div className="text-center mt-2">
                <button type="button" className="nes-btn is-error text-xs" onClick={resetTest}>
                  Reset Test
                </button>
              </div>
            </div>
          ) : (
            // Results Display Screen
            <div className="flex flex-col items-center gap-6 p-4">
              <div className="nes-container is-rounded is-centered w-full max-w-md bg-white border-4 border-black">
                <h3 className="text-sm font-bold text-red-600 mb-4 uppercase">TEST RESULTS</h3>
                
                <div className="flex flex-col gap-3 text-left">
                  <div className="flex justify-between border-b-2 border-dashed border-gray-300 pb-1">
                    <span className="text-[10px] font-bold">SPEED:</span>
                    <span className="text-xs font-bold text-blue-600">{liveWpm} WPM</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-dashed border-gray-300 pb-1">
                    <span className="text-[10px] font-bold">ACCURACY:</span>
                    <span className="text-xs font-bold text-green-600">{liveAccuracy}%</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-dashed border-gray-300 pb-1">
                    <span className="text-[10px] font-bold">KEYSTROKES:</span>
                    <span className="text-[10px] font-bold">{totalTyped} ({correctCount} correct)</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-dashed border-gray-300 pb-1">
                    <span className="text-[10px] font-bold">MODE:</span>
                    <span className="text-[10px] font-bold uppercase">{mode} ({duration}s)</span>
                  </div>
                  
                  {/* Badge Rank Display */}
                  <div className="flex flex-col items-center justify-center p-3 mt-2 bg-gray-50 border-2 border-black">
                    <div className="text-[10px] text-gray-500 uppercase">Retro Rank</div>
                    <div className="text-3xl font-black text-black my-1">{getRank(liveWpm).name}</div>
                    <div className="text-[8px] text-gray-700 font-bold uppercase tracking-wider text-center">{getRank(liveWpm).desc}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button type="button" className="nes-btn is-primary text-xs" onClick={resetTest}>
                  Try Again
                </button>
                <button 
                  type="button" 
                  className="nes-btn text-xs" 
                  onClick={() => {
                    setTestState('idle');
                    setTypedText('');
                    setTimeLeft(duration);
                    setCorrectCount(0);
                    setTotalTyped(0);
                  }}
                >
                  Configure
                </button>
              </div>
            </div>
          )}

          {/* Leaderboard Section */}
          <div className="nes-container with-title is-rounded mt-4">
            <h3 className="title text-xs">High Scores</h3>
            <div className="flex flex-col gap-2">
              {leaderboard.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr className="border-b-2 border-black text-[8px] md:text-[10px]">
                        <th className="pb-1 uppercase">Rank</th>
                        <th className="pb-1 uppercase">WPM</th>
                        <th className="pb-1 uppercase">ACC</th>
                        <th className="pb-1 uppercase">Mode</th>
                        <th className="pb-1 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((score, index) => (
                        <tr key={index} className="border-b border-gray-200 text-[8px] md:text-[10px]">
                          <td className="py-2 flex items-center gap-1 font-bold">
                            <span className="text-red-500">#{index + 1}</span> 
                            <span className="bg-black text-white px-1 text-[7px] font-bold rounded">{score.rank}</span>
                          </td>
                          <td className="py-2 text-blue-600 font-bold">{score.wpm}</td>
                          <td className="py-2 text-green-600 font-bold">{score.accuracy}%</td>
                          <td className="py-2 uppercase text-gray-500">{score.mode} ({score.duration}s)</td>
                          <td className="py-2 text-gray-400">{score.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-right mt-4">
                    <button type="button" className="nes-btn is-error text-[8px] p-1.5" onClick={clearLeaderboard}>
                      Clear High Scores
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-center text-gray-500 m-0 py-2">
                  No scores recorded yet. Complete a test to make history!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
