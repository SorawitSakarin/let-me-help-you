'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'copied' | null>(null);

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setCopyStatus(null);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-6xl mx-auto w-full">
      <div className="w-full flex justify-start">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">JSON Formatter</h3>

        <p className="mb-6 text-sm">Validate, format, and minify your JSON data.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* Input Section */}
          <div className="flex flex-col gap-2">
            <label htmlFor="json-input" className="text-left text-sm">Input JSON</label>
            <textarea
              id="json-input"
              className={`nes-textarea w-full h-96 ${error ? 'is-error' : ''}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"key": "value"}'
              spellCheck={false}
              style={{ minHeight: '400px' }}
            ></textarea>
            {error && (
              <span className="nes-text is-error text-xs text-left break-all">{error}</span>
            )}
            <div className="flex gap-2 mt-2">
               <button type="button" className="nes-btn is-primary flex-1 text-xs sm:text-sm" onClick={handleFormat}>Format</button>
               <button type="button" className="nes-btn is-warning flex-1 text-xs sm:text-sm" onClick={handleMinify}>Minify</button>
               <button type="button" className="nes-btn is-error flex-1 text-xs sm:text-sm" onClick={handleClear}>Clear</button>
            </div>
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-2">
            <label htmlFor="json-output" className="text-left text-sm">Output JSON</label>
            <textarea
              id="json-output"
              className="nes-textarea w-full h-96 bg-gray-50"
              value={output}
              readOnly
              placeholder="Result will appear here..."
              spellCheck={false}
              style={{ minHeight: '400px' }}
            ></textarea>
             <div className="flex justify-end mt-2">
               <button
                type="button"
                className={`nes-btn ${copyStatus === 'copied' ? 'is-success' : ''} w-full text-sm`}
                onClick={handleCopy}
                disabled={!output}
               >
                 {copyStatus === 'copied' ? 'Copied!' : 'Copy Output'}
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
