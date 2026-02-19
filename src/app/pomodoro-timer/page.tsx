"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type TimerMode = "work" | "shortBreak" | "longBreak";

export default function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  // Settings
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update timer when mode or settings change, but only if not active (to prevent jumping)
  useEffect(() => {
    if (!isActive) {
      switch (mode) {
        case "work":
          setTimeLeft(workDuration * 60);
          break;
        case "shortBreak":
          setTimeLeft(shortBreakDuration * 60);
          break;
        case "longBreak":
          setTimeLeft(longBreakDuration * 60);
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, workDuration, shortBreakDuration, longBreakDuration]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Play sound or notification here
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  // Update document title
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    document.title = `${timeString} - Focus Timer`;

    return () => {
        document.title = "Daily Task Tool"; // Reset on unmount
    };
  }, [timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    switch (mode) {
      case "work":
        setTimeLeft(workDuration * 60);
        break;
      case "shortBreak":
        setTimeLeft(shortBreakDuration * 60);
        break;
      case "longBreak":
        setTimeLeft(longBreakDuration * 60);
        break;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    let totalSeconds = 0;
    switch (mode) {
      case "work":
        totalSeconds = workDuration * 60;
        break;
      case "shortBreak":
        totalSeconds = shortBreakDuration * 60;
        break;
      case "longBreak":
        totalSeconds = longBreakDuration * 60;
        break;
    }
    if (totalSeconds === 0) return 0;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  const getModeLabel = (m: TimerMode) => {
    switch (m) {
      case "work": return "Work Time";
      case "shortBreak": return "Short Break";
      case "longBreak": return "Long Break";
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Focus Timer</h2>

        {/* Timer Display */}
        <div className="mb-8 mt-4">
            <div className={`nes-container is-rounded ${mode === 'work' ? 'is-dark' : ''} mb-4`}>
                <h1 className="text-4xl md:text-6xl text-center font-bold tracking-widest">
                    {formatTime(timeLeft)}
                </h1>
                <p className="text-center mt-2">{getModeLabel(mode)}</p>
            </div>

            <progress
                className={`nes-progress ${mode === 'work' ? 'is-primary' : 'is-success'} h-6`}
                value={getProgress()}
                max="100"
            ></progress>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
            <button
                type="button"
                className={`nes-btn ${isActive ? 'is-warning' : 'is-primary'}`}
                onClick={toggleTimer}
            >
                {isActive ? "Pause" : "Start"}
            </button>
            <button
                type="button"
                className="nes-btn is-error"
                onClick={resetTimer}
            >
                Reset
            </button>
        </div>

        {/* Mode Selection */}
        <div className="nes-container is-rounded mb-8">
            <p className="title">Mode</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
                <button
                    type="button"
                    className={`nes-btn ${mode === 'work' ? 'is-primary' : ''}`}
                    onClick={() => { setMode('work'); setIsActive(false); }}
                >
                    Work
                </button>
                <button
                    type="button"
                    className={`nes-btn ${mode === 'shortBreak' ? 'is-success' : ''}`}
                    onClick={() => { setMode('shortBreak'); setIsActive(false); }}
                >
                    Short Break
                </button>
                <button
                    type="button"
                    className={`nes-btn ${mode === 'longBreak' ? 'is-warning' : ''}`}
                    onClick={() => { setMode('longBreak'); setIsActive(false); }}
                >
                    Long Break
                </button>
            </div>
        </div>

        {/* Settings */}
        <div className="nes-container is-rounded text-left">
            <p className="title">Settings (Minutes)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="nes-field">
                    <label htmlFor="work_duration">Work</label>
                    <input
                        type="number"
                        id="work_duration"
                        className="nes-input"
                        value={workDuration}
                        onChange={(e) => setWorkDuration(Number(e.target.value))}
                        min="1"
                    />
                </div>
                <div className="nes-field">
                    <label htmlFor="short_break">Short Break</label>
                    <input
                        type="number"
                        id="short_break"
                        className="nes-input"
                        value={shortBreakDuration}
                        onChange={(e) => setShortBreakDuration(Number(e.target.value))}
                        min="1"
                    />
                </div>
                <div className="nes-field">
                    <label htmlFor="long_break">Long Break</label>
                    <input
                        type="number"
                        id="long_break"
                        className="nes-input"
                        value={longBreakDuration}
                        onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                        min="1"
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="nes-container is-dark w-full text-center text-sm">
        <p>Tip: Focus for 25 minutes, then take a 5-minute break.</p>
      </div>
    </div>
  );
}
