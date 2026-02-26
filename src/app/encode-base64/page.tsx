'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Base64Encoder() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      // Robust UTF-8 handling
      const bytes = new TextEncoder().encode(inputText);
      const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
      const encoded = btoa(binString);
      setOutputText(encoded);
      setError('');
    } catch (err) {
      setError('Error encoding text. Ensure input is valid.');
      console.error(err);
    }
  };

  const handleDecode = () => {
    try {
      const binString = atob(inputText);
      const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
      const decoded = new TextDecoder().decode(bytes);
      setOutputText(decoded);
      setError('');
    } catch (err) {
      setError('Error decoding Base64. Input is not a valid Base64 string.');
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
        <h2 className="title">Base64 Encoder/Decoder</h2>
        <p className="mb-8">Convert text to Base64 format and vice versa.</p>

        <div className="flex flex-col gap-4">
          <div className="field">
            <label htmlFor="input_field">Input</label>
            <textarea
              id="input_field"
              className="nes-textarea"
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste text here..."
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
