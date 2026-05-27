"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function StopwatchPage() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleStartStop = () => setIsRunning(!isRunning);

  const handleLap = () => setLaps([...laps, time]);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Stopwatch</h2>

        <div className="mb-8 mt-4">
          <div className="nes-container is-rounded is-dark mb-4">
            <h1 className="text-4xl md:text-6xl text-center font-bold tracking-widest">
              {formatTime(time)}
            </h1>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            type="button"
            className={`nes-btn ${isRunning ? 'is-error' : 'is-primary'}`}
            onClick={handleStartStop}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            type="button"
            className="nes-btn is-warning"
            onClick={handleLap}
            disabled={!isRunning}
          >
            Lap
          </button>
          <button
            type="button"
            className="nes-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {laps.length > 0 && (
          <div className="nes-container is-rounded w-full text-left">
             <p className="title">Laps</p>
             <ul className="nes-list is-circle">
                {laps.map((lap, index) => (
                   <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
                ))}
             </ul>
          </div>
        )}
      </div>
    </div>
  );
}
