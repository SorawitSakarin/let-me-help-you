'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TextToHexConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      const hex = inputText
        .split('')
        .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(' ');
      setOutputText(hex);
      setError('');
    } catch (err) {
      setError('Error encoding text.');
      console.error(err);
    }
  };

  const handleDecode = () => {
    try {
      if (!inputText.trim()) {
        setOutputText('');
        setError('');
        return;
      }
      const hexArray = inputText.trim().split(/\s+/);
      const text = hexArray
        .map((hex) => String.fromCharCode(parseInt(hex, 16)))
        .join('');
      if (text.includes('NaN') || text.includes('\u0000')) {
        throw new Error('Invalid Hex');
      }
      setOutputText(text);
      setError('');
    } catch (err) {
      setError('Error decoding Hex. Ensure input is valid hex separated by spaces.');
      console.error(err);
    }
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText).catch(console.error);
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
        <h2 className="title">Text to Hex Converter</h2>
        <p className="mb-8">Convert text to Hexadecimal format and vice versa.</p>

        <div className="flex flex-col gap-4">
          <div className="field">
            <label htmlFor="input_field">Input</label>
            <textarea
              id="input_field"
              className="nes-textarea"
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste text or hex here..."
            ></textarea>
          </div>

          <div className="flex flex-wrap gap-4 justify-center my-4">
            <button type="button" className="nes-btn is-primary" onClick={handleEncode}>
              To Hex
            </button>
            <button type="button" className="nes-btn is-success" onClick={handleDecode}>
              To Text
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
