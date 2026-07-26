'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ROT13Encoder() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const rot13 = (str: string) => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const base = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
    });
  };

  const handleEncodeDecode = () => {
    setOutputText(rot13(inputText));
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText).catch(() => {});
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">ROT13 Encoder/Decoder</h2>
        <p className="mb-8">Encode and decode text using the ROT13 cipher.</p>

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
            <button type="button" className="nes-btn is-primary" onClick={handleEncodeDecode}>
              Encode/Decode
            </button>
            <button type="button" className="nes-btn is-warning" onClick={handleClear}>
              Clear
            </button>
          </div>

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
