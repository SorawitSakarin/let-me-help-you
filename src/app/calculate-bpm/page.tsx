"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function BPMTapperPage() {
  const [taps, setTaps] = useState<number[]>([]);
  const [bpm, setBpm] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTap = () => {
    const now = Date.now();
    const newTaps = [...taps, now];

    // Keep only the last 10 taps for average calculation
    if (newTaps.length > 10) {
      newTaps.shift();
    }

    setTaps(newTaps);

    if (newTaps.length > 1) {
      const intervals = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const averageInterval =
        intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const currentBpm = Math.round(60000 / averageInterval);
      setBpm(currentBpm);
    }

    // Reset after 3 seconds of inactivity
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setTaps([]);
      setBpm(0);
    }, 3000);
  };

  const handleReset = () => {
    setTaps([]);
    setBpm(0);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">BPM Tapper</h1>
        <Link href="/" className="nes-btn text-xs">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered">
        <h2 className="title">Tap Tap Tap</h2>

        <div className="flex flex-col items-center gap-8 py-8">
          <div className="text-6xl font-bold">{bpm}</div>
          <div className="text-sm">BPM</div>

          <button
            type="button"
            className="nes-btn is-primary is-large px-12 py-8 text-xl"
            onClick={handleTap}
            onMouseDown={(e) => e.preventDefault()}
          >
            TAP
          </button>

          <div className="text-xs text-gray-500">
            Tap {taps.length > 0 ? taps.length : 0} times
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button type="button" className="nes-btn is-error text-xs" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}