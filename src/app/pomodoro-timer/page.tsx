"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Pause, RotateCcw, Timer, Coffee, Moon } from "lucide-react";

type TimerMode = "work" | "shortBreak" | "longBreak";

// Constants for Audio Alarm
export const ALARM_FREQUENCY_A4 = 440;
export const ALARM_FREQUENCY_A5 = 880;
export const ALARM_NOTE_DURATION = 0.1;
export const ALARM_SEQUENCE_DURATION = 0.5;
export const ALARM_GAIN_VALUE = 0.1;

export default function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  // Settings
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(4);

  // Session Tracking
  const [completedSessions, setCompletedSessions] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const alarmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Initialize Audio Context on user interaction
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
      osc.frequency.setValueAtTime(ALARM_FREQUENCY_A4, audioContextRef.current.currentTime);
      osc.frequency.setValueAtTime(ALARM_FREQUENCY_A5, audioContextRef.current.currentTime + ALARM_NOTE_DURATION);
      osc.frequency.setValueAtTime(ALARM_FREQUENCY_A4, audioContextRef.current.currentTime + (ALARM_NOTE_DURATION * 2));
      osc.frequency.setValueAtTime(ALARM_FREQUENCY_A5, audioContextRef.current.currentTime + (ALARM_NOTE_DURATION * 3));

      gainNode.gain.setValueAtTime(ALARM_GAIN_VALUE, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + ALARM_SEQUENCE_DURATION);

      osc.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      osc.start();
      osc.stop(audioContextRef.current.currentTime + ALARM_SEQUENCE_DURATION);
    }
  };

  const startAlarmLoop = () => {
      if (timerRef.current) clearInterval(timerRef.current);
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

  useEffect(() => {
      return () => {
          stopAlarmLoop();
          if (audioContextRef.current) {
              audioContextRef.current.close();
          }
      };
  }, []);

  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    document.title = `${timeString} - Focus Timer`;

    return () => {
        document.title = "Daily Task Tool";
    };
  }, [timeLeft]);

  const handleTimerComplete = () => {
      startAlarmLoop();
      setShowModal(true);
  };

  const handleNextSession = () => {
      stopAlarmLoop();
      setShowModal(false);

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
          setMode('work');
          setTimeLeft(workDuration * 60);
      }
      setIsActive(true);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) initAudio();
  };

  const resetTimer = () => {
    setIsActive(false);
    stopAlarmLoop();
    setShowModal(false);
    setCompletedSessions(0);
    setMode('work');
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

  const getThemeColor = () => {
      switch (mode) {
          case 'work': return 'text-red-500 bg-red-500 border-red-500';
          case 'shortBreak': return 'text-green-500 bg-green-500 border-green-500';
          case 'longBreak': return 'text-blue-500 bg-blue-500 border-blue-500';
      }
  };

  const getBgColor = () => {
      switch (mode) {
          case 'work': return 'bg-red-50';
          case 'shortBreak': return 'bg-green-50';
          case 'longBreak': return 'bg-blue-50';
      }
  };

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
        {/* Modal Overlay */}
        {showModal && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in-up">
                <div className="text-center max-w-sm w-full">
                    <div className="mb-6 flex justify-center">
                        {mode === 'work' ? <Coffee className="w-16 h-16 text-green-500 animate-bounce" /> : <Timer className="w-16 h-16 text-red-500 animate-pulse" />}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Time's Up!</h3>
                    <p className="text-gray-600 mb-8">
                        {mode === 'work'
                            ? (completedSessions + 1) % sessionsBeforeLongBreak === 0
                                ? "Great job! Take a long break."
                                : "Good work! Take a short break."
                            : "Break over! Ready to focus?"}
                    </p>
                    <button
                        type="button"
                        className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                        onClick={handleNextSession}
                    >
                        {mode === 'work' ? "Start Break" : "Start Focus"}
                    </button>
                </div>
            </div>
        )}

        <div className={`p-8 md:p-12 text-center transition-colors duration-500 ${getBgColor()}`}>

            {/* Mode Selection Tabs */}
            <div className="flex justify-center gap-2 mb-12">
                <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === 'work' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => { setMode('work'); setIsActive(false); }}
                >
                    <span className="flex items-center gap-2"><Timer className="w-4 h-4" /> Work</span>
                </button>
                <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === 'shortBreak' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => { setMode('shortBreak'); setIsActive(false); }}
                >
                    <span className="flex items-center gap-2"><Coffee className="w-4 h-4" /> Short Break</span>
                </button>
                <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === 'longBreak' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => { setMode('longBreak'); setIsActive(false); }}
                >
                    <span className="flex items-center gap-2"><Moon className="w-4 h-4" /> Long Break</span>
                </button>
            </div>

            {/* Timer Display */}
            <div className="relative mb-12">
                <div className="text-[6rem] leading-none font-bold text-gray-900 font-mono tracking-tighter">
                    {formatTime(timeLeft)}
                </div>
                <div className="mt-4 flex justify-center">
                    <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ease-linear ${mode === 'work' ? 'bg-red-500' : mode === 'shortBreak' ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${100 - getProgress()}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    type="button"
                    className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-3 ${
                        isActive
                            ? 'bg-white text-gray-900 border border-gray-200'
                            : 'bg-gray-900 text-white'
                    }`}
                    onClick={toggleTimer}
                >
                    {isActive ? <><Pause className="w-5 h-5 fill-current" /> Pause</> : <><Play className="w-5 h-5 fill-current" /> Start</>}
                </button>
                <button
                    type="button"
                    className="p-4 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-100 transition-all active:scale-95"
                    onClick={resetTimer}
                    aria-label="Reset Timer"
                >
                    <RotateCcw className="w-6 h-6" />
                </button>
            </div>
        </div>

        {/* Settings Panel */}
        <div className="bg-white p-8 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Timer Settings (Minutes)</h4>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-xs text-gray-500 mb-2">Work</label>
                    <input
                        type="number"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-mono focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                        value={workDuration}
                        onChange={(e) => setWorkDuration(Number(e.target.value))}
                        min="1"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-2">Short Break</label>
                    <input
                        type="number"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-mono focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                        value={shortBreakDuration}
                        onChange={(e) => setShortBreakDuration(Number(e.target.value))}
                        min="1"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-2">Long Break</label>
                    <input
                        type="number"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-mono focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                        value={longBreakDuration}
                        onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                        min="1"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <span className="text-sm text-gray-600">Sessions before Long Break</span>
                <div className="flex items-center gap-3">
                    <input
                        type="number"
                        className="w-16 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-mono focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                        value={sessionsBeforeLongBreak}
                        onChange={(e) => setSessionsBeforeLongBreak(Number(e.target.value))}
                        min="1"
                        max="8"
                    />
                </div>
            </div>

            <div className="mt-4 text-center text-xs text-gray-400">
                Session {completedSessions % sessionsBeforeLongBreak + 1} of {sessionsBeforeLongBreak}
            </div>
        </div>
      </div>
    </div>
  );
}
