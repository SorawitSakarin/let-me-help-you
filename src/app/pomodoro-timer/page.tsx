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
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(4);

  // Session Tracking (1 session = 1 work period)
  // Current logic: Work -> Short Break -> Work -> Short Break -> Work -> Short Break -> Work -> Long Break
  // This means 4 Work sessions complete a cycle.
  const [completedSessions, setCompletedSessions] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const alarmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Initialize Audio Context on user interaction (to adhere to browser policies)
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playAlarm = () => {
    initAudio();
    if (audioContextRef.current) {
      const osc = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(440, audioContextRef.current.currentTime); // A4
      osc.frequency.setValueAtTime(880, audioContextRef.current.currentTime + 0.1); // A5
      osc.frequency.setValueAtTime(440, audioContextRef.current.currentTime + 0.2); // A4
      osc.frequency.setValueAtTime(880, audioContextRef.current.currentTime + 0.3); // A5

      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5);

      osc.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      osc.start();
      osc.stop(audioContextRef.current.currentTime + 0.5);

      // Loop alarm
      oscillatorRef.current = osc;
      // We can use setInterval for a loop if needed, but for now a single burst repeated is better handled in a loop
      // Let's make it loop every 1 second
    }
  };

  const startAlarmLoop = () => {
      // Simple loop using setInterval for the beep sound
      if (timerRef.current) clearInterval(timerRef.current); // Stop the countdown timer

      if (alarmIntervalRef.current) clearInterval(alarmIntervalRef.current);

      alarmIntervalRef.current = setInterval(() => {
          playAlarm();
      }, 1000);
  };

  const stopAlarmLoop = () => {
      if (alarmIntervalRef.current) {
          clearInterval(alarmIntervalRef.current);
          alarmIntervalRef.current = null;
      }
  };

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
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      handleTimerComplete();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  // Cleanup alarm on unmount
  useEffect(() => {
      return () => {
          stopAlarmLoop();
          if (audioContextRef.current) {
              audioContextRef.current.close();
          }
      };
  }, []);

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

  const handleTimerComplete = () => {
      startAlarmLoop();
      setShowModal(true);
  };

  const handleNextSession = () => {
      stopAlarmLoop();
      setShowModal(false);

      // Determine next mode
      if (mode === 'work') {
          const newCompleted = completedSessions + 1;
          setCompletedSessions(newCompleted);

          if (newCompleted % sessionsBeforeLongBreak === 0) {
              setMode('longBreak');
              setTimeLeft(longBreakDuration * 60);
          } else {
              setMode('shortBreak');
              setTimeLeft(shortBreakDuration * 60);
          }
      } else {
          // If break is over, go back to work
          setMode('work');
          setTimeLeft(workDuration * 60);
      }
      setIsActive(true);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) initAudio(); // Ensure audio context is ready on user interaction
  };

  const resetTimer = () => {
    setIsActive(false);
    stopAlarmLoop();
    setShowModal(false);
    setCompletedSessions(0);
    setMode('work'); // Reset to start of cycle
    setTimeLeft(workDuration * 60);
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

      <div className="nes-container with-title is-centered w-full relative">
        <h2 className="title">Focus Timer</h2>

        {/* Modal Overlay */}
        {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="nes-dialog is-light is-rounded bg-white p-6 max-w-sm w-full mx-4 border-4 border-black text-center shadow-lg">
                    <p className="title mb-4">Time's Up!</p>
                    <p className="mb-6">
                        {mode === 'work'
                            ? (completedSessions + 1) % sessionsBeforeLongBreak === 0
                                ? "Great job! Take a long break."
                                : "Good work! Take a short break."
                            : "Break over! Ready to focus?"}
                    </p>
                    <button type="button" className="nes-btn is-primary w-full" onClick={handleNextSession}>
                        {mode === 'work' ? "Start Break" : "Start Focus"}
                    </button>
                </div>
            </div>
        )}

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
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="nes-field flex-1 flex flex-col justify-end">
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
                    <div className="nes-field flex-1 flex flex-col justify-end">
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
                    <div className="nes-field flex-1 flex flex-col justify-end">
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
                <div className="nes-field">
                    <label htmlFor="sessions_count">Work Sessions before Long Break</label>
                    <input
                        type="number"
                        id="sessions_count"
                        className="nes-input w-full"
                        value={sessionsBeforeLongBreak}
                        onChange={(e) => setSessionsBeforeLongBreak(Number(e.target.value))}
                        min="1"
                        max="8"
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="nes-container is-dark w-full text-center text-sm">
        <p>Tip: Focus for {workDuration} minutes, then take a break.</p>
        <p className="mt-2 text-xs text-gray-400">Session {completedSessions % sessionsBeforeLongBreak + 1}/{sessionsBeforeLongBreak}</p>
      </div>
    </div>
  );
}
