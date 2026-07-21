'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function VaporwaveTextGenerator() {
  const [inputText, setInputText] = useState('');

  const generateVaporwave = (text: string) => {
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 33 && code <= 126) {
        return String.fromCharCode(code + 65248);
      } else if (code === 32) {
        return String.fromCharCode(12288);
      }
      return char;
    }).join('');
  };

  const outputText = generateVaporwave(inputText);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const handleClear = () => {
    setInputText('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Vaporwave Text Gen
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Input Text</h3>
        <textarea
          className="nes-textarea w-full"
          rows={5}
          placeholder="Enter text to make it a e s t h e t i c..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Vaporwave Output</h3>
        <textarea
          className="nes-textarea w-full"
          rows={5}
          value={outputText}
          readOnly
        />
      </div>

      <div className="flex gap-4 justify-end">
        <button type="button" className="nes-btn is-error" onClick={handleClear}>Clear</button>
        <button type="button" className="nes-btn is-success" onClick={handleCopy}>Copy</button>
      </div>
    </div>
  );
}
