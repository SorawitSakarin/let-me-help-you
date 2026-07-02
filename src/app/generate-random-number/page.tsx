"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generate = () => {
    setError('');
    const minVal = parseInt(String(min));
    const maxVal = parseInt(String(max));
    const countVal = parseInt(String(count));

    if (isNaN(minVal) || isNaN(maxVal) || isNaN(countVal)) {
      setError('Please enter valid numbers.');
      return;
    }

    if (minVal > maxVal) {
      setError('Min cannot be greater than Max.');
      return;
    }

    if (countVal < 1) {
      setError('Count must be at least 1.');
      return;
    }

    if (!allowDuplicates && countVal > (maxVal - minVal + 1)) {
      setError('Count cannot exceed the range size when duplicates are not allowed.');
      return;
    }

    const newResults: number[] = [];
    if (allowDuplicates) {
      for (let i = 0; i < countVal; i++) {
        newResults.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
      }
    } else {
          if (maxVal - minVal > 1000000) {
              setError('Range is too large when duplicates are not allowed. Max range size is 1,000,000.');
              return;
          }
      const pool = [];
      for (let i = minVal; i <= maxVal; i++) pool.push(i);
      for (let i = 0; i < countVal; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        newResults.push(pool[idx]);
        pool.splice(idx, 1);
      }
    }
    setResults(newResults);
  };

  const handleCopy = () => {
    if (results.length === 0) return;
    navigator.clipboard.writeText(results.join(', ')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(console.error);
  };

  const handleClear = () => {
    setResults([]);
    setError('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon coin is-medium"></i>
          Random Number
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title bg-white">
        <h3 className="title bg-white text-sm" style={{ marginBottom: 0 }}>Options</h3>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label>Min</label>
              <input type="number" className="nes-input" value={min} onChange={e => setMin(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <label>Max</label>
              <input type="number" className="nes-input" value={max} onChange={e => setMax(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <label>Count</label>
              <input type="number" className="nes-input" value={count} onChange={e => setCount(Number(e.target.value))} min="1" />
            </div>
          </div>
          <div>
            <label>
              <input type="checkbox" className="nes-checkbox" checked={allowDuplicates} onChange={e => setAllowDuplicates(e.target.checked)} />
              <span>Allow Duplicates</span>
            </label>
          </div>
          <div className="flex gap-4">
            <button className="nes-btn is-primary" onClick={generate}>Generate</button>
            <button className="nes-btn" onClick={handleClear}>Clear</button>
          </div>
          {error && <p className="nes-text is-error">{error}</p>}
        </div>
      </div>

      <div className="nes-container with-title bg-white">
        <h3 className="title bg-white text-sm" style={{ marginBottom: 0 }}>Results</h3>
        <div className="flex flex-col gap-4 mt-4">
          <textarea className="nes-textarea min-h-[100px] text-lg" readOnly value={results.join(', ')}></textarea>
          <div className="flex justify-end">
            <button className={`nes-btn ${copied ? 'is-success' : ''}`} onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy Results'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}