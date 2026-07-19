'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function RepeatTextPage() {
  const [text, setText] = useState('');
  const [repetitions, setRepetitions] = useState(1);
  const [separator, setSeparator] = useState('');
  const [copyStatus, setCopyStatus] = useState<'copied' | null>(null);

  const result = useMemo(() => {
    if (!text) return '';
    return Array(repetitions).fill(text).join(separator);
  }, [text, repetitions, separator]);

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
        <h2 className="title">Text Repeater</h2>
        <div className="mb-6">
          <label htmlFor="input_text">Text to repeat:</label>
          <textarea
            id="input_text"
            className="nes-textarea w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Enter text here..."
          ></textarea>
        </div>
        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <label htmlFor="repetitions_input">Repetitions:</label>
            <input
              id="repetitions_input"
              type="number"
              min="1"
              max="10000"
              className="nes-input w-full"
              value={repetitions}
              onChange={(e) => setRepetitions(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="separator_input">Separator (e.g. space, newline):</label>
            <input
              id="separator_input"
              type="text"
              className="nes-input w-full"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              placeholder="Leave empty for none"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="output_text">Output Text:</label>
          <textarea
            id="output_text"
            className="nes-textarea w-full"
            value={result}
            readOnly
            rows={6}
          ></textarea>
        </div>
        <div className="flex gap-4">
          <button
            className="nes-btn is-error"
            onClick={() => { setText(''); setRepetitions(1); setSeparator(''); setCopyStatus(null); }}
          >
            Clear
          </button>
          <button
            className={`nes-btn ${copyStatus === 'copied' ? 'is-success' : 'is-primary'}`}
            onClick={handleCopy}
          >
            {copyStatus === 'copied' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}