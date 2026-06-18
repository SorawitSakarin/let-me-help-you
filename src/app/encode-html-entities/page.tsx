'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HtmlEntityEncoder() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      // Basic HTML entity encoding
      const encoded = inputText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      setOutputText(encoded);
      setError('');
    } catch (err) {
      setError('Error encoding HTML entities.');
      console.error(err);
    }
  };

  const handleDecode = () => {
    try {
      // Basic HTML entity decoding
      const decoded = inputText
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&apos;/g, "'");
      setOutputText(decoded);
      setError('');
    } catch (err) {
      setError('Error decoding HTML entities.');
      console.error(err);
    }
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError('');
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">HTML Entity Encoder</h2>
        <p className="mb-8">Safely encode and decode HTML entities.</p>

        <div className="flex flex-col gap-4">
          <div className="field">
            <label htmlFor="input_field">Input</label>
            <textarea
              id="input_field"
              className="nes-textarea"
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste HTML/text here..."
            ></textarea>
          </div>

          <div className="flex flex-wrap gap-4 justify-center my-4">
            <button type="button" className="nes-btn is-primary" onClick={handleEncode}>
              Encode
            </button>
            <button type="button" className="nes-btn is-success" onClick={handleDecode}>
              Decode
            </button>
            <button type="button" className="nes-btn is-warning" onClick={handleClear}>
              Clear
            </button>
          </div>

          {error && (
            <div className="nes-text is-error text-center mb-4">
              {error}
            </div>
          )}

          <div className="field">
            <label htmlFor="output_field">Output</label>
            <textarea
              id="output_field"
              className="nes-textarea"
              rows={4}
              value={outputText}
              readOnly
              placeholder="Result will appear here..."
            ></textarea>
          </div>

          <div className="flex justify-center mt-2">
            <button
              type="button"
              className={`nes-btn ${!outputText ? 'is-disabled' : ''}`}
              onClick={handleCopy}
              disabled={!outputText}
            >
              Copy Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
