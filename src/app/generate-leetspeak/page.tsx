'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

const BASIC_MAP: Record<string, string> = {
  a: '4', b: '8', e: '3', g: '6', i: '1', o: '0', s: '5', t: '7', z: '2'
};

const ADVANCED_MAP: Record<string, string> = {
  a: '4', b: '8', c: '(', d: '|)', e: '3', f: 'ph', g: '6', h: '#', i: '1',
  j: '_|', k: '|<', l: '1', m: '|\\/|', n: '|\\|', o: '0', p: '|*', q: '9',
  r: '|2', s: '5', t: '7', u: '|_|', v: '\\/', w: '\\/\\/', x: '><', y: '`/', z: '2'
};

export default function LeetspeakGenerator() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'basic' | 'advanced'>('basic');
  const [copyStatus, setCopyStatus] = useState<'copied' | null>(null);

  const result = useMemo(() => {
    if (!text) return '';
    const map = mode === 'basic' ? BASIC_MAP : ADVANCED_MAP;
    return text.split('').map(char => {
      const lowerChar = char.toLowerCase();
      // preserve case for basic mode if unmapped? actually leetspeak is usually all numbers/symbols, but if unmapped, preserve case.
      if (map[lowerChar] !== undefined) {
          return map[lowerChar];
      }
      return char;
    }).join('');
  }, [text, mode]);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result).catch(() => {});
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>
      <div className="nes-container with-title w-full">
        <h2 className="title">Leetspeak Generator</h2>
        <p className="mb-4">Convert your text into 1337 5p34k!</p>

        <div className="mb-6 flex gap-4">
          <label>
            <input
              type="radio"
              className="nes-radio"
              name="mode"
              checked={mode === 'basic'}
              onChange={() => setMode('basic')}
            />
            <span>Basic</span>
          </label>
          <label>
            <input
              type="radio"
              className="nes-radio"
              name="mode"
              checked={mode === 'advanced'}
              onChange={() => setMode('advanced')}
            />
            <span>Advanced</span>
          </label>
        </div>

        <div className="mb-6">
          <label htmlFor="input_text">Input Text:</label>
          <textarea
            id="input_text"
            className="nes-textarea w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Type something here..."
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="output_text">Leetspeak:</label>
          <textarea
            id="output_text"
            className="nes-textarea w-full"
            value={result}
            readOnly
            rows={4}
          ></textarea>
        </div>
        <div className="flex gap-4">
          <button
            className="nes-btn is-error"
            onClick={() => { setText(''); setCopyStatus(null); }}
          >
            Clear
          </button>
          <button
            className={`nes-btn ${copyStatus === 'copied' ? 'is-success' : 'is-primary'}`}
            onClick={handleCopy}
            disabled={!result}
          >
            {copyStatus === 'copied' ? 'Copied!' : 'Copy Output'}
          </button>
        </div>
      </div>
    </div>
  );
}