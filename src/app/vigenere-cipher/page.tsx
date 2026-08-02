'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function VigenereCipher() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleTransform = () => {
    if (!keyword) {
      setError('Please provide a keyword.');
      return;
    }
    const cleanKeyword = keyword.replace(/[^A-Za-z]/g, '').toUpperCase();
    if (!cleanKeyword) {
      setError('Keyword must contain at least one letter.');
      return;
    }
    setError('');

    let output = '';
    let keywordIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      const isUpper = c >= 65 && c <= 90;
      const isLower = c >= 97 && c <= 122;

      if (isUpper || isLower) {
        const base = isUpper ? 65 : 97;
        const shift = cleanKeyword.charCodeAt(keywordIndex % cleanKeyword.length) - 65;

        let newChar;
        if (mode === 'encode') {
          newChar = ((c - base + shift) % 26) + base;
        } else {
          newChar = ((c - base - shift + 26) % 26) + base;
        }

        output += String.fromCharCode(newChar);
        keywordIndex++;
      } else {
        output += text.charAt(i);
      }
    }
    setResult(output);
  };

  const handleClear = () => {
    setText('');
    setKeyword('');
    setResult('');
    setMode('encode');
    setError('');
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto w-full">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">&lt; Back to Home</Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Vigenère Cipher</h2>
        <p className="mb-8">Encode and decode text using the Vigenère cipher algorithm.</p>

        <div className="flex flex-col gap-4">
          <div className="field text-left">
            <label htmlFor="text_field">Text</label>
            <textarea id="text_field" className="nes-textarea" rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text here..."></textarea>
          </div>
          <div className="field text-left">
            <label htmlFor="keyword_field">Keyword</label>
            <input type="text" id="keyword_field" className="nes-input" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g., SECRET" />
          </div>
          <div className="mb-6 flex gap-4">
             <label>
               <input type="radio" className="nes-radio" name="mode" checked={mode === 'encode'} onChange={() => setMode('encode')} />
               <span>Encode</span>
             </label>
             <label>
               <input type="radio" className="nes-radio" name="mode" checked={mode === 'decode'} onChange={() => setMode('decode')} />
               <span>Decode</span>
             </label>
          </div>

          {error && <div className="nes-text is-error">{error}</div>}

          <div className="mb-6 flex gap-4">
            <button type="button" className="nes-btn is-primary" onClick={handleTransform}>Transform</button>
            <button type="button" className="nes-btn" onClick={handleClear}>Clear</button>
          </div>
        </div>
      </div>

      {result && (
        <div className="nes-container with-title is-centered w-full">
          <h3 className="title">Result</h3>
          <textarea readOnly className="nes-textarea" rows={4} value={result}></textarea>
        </div>
      )}
    </div>
  );
}