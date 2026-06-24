"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function CaesarCipher() {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [result, setResult] = useState('');

  const handleTransform = () => {
    const shiftAmount = mode === 'encode' ? shift : (26 - (shift % 26)) % 26;
    let output = '';

    for (let i = 0; i < text.length; i++) {
      let c = text.charCodeAt(i);

      if (c >= 65 && c <= 90) {
        output += String.fromCharCode(((c - 65 + shiftAmount) % 26) + 65);
      } else if (c >= 97 && c <= 122) {
        output += String.fromCharCode(((c - 97 + shiftAmount) % 26) + 97);
      } else {
        output += text.charAt(i);
      }
    }
    setResult(output);
  };

  const handleClear = () => {
    setText('');
    setResult('');
    setShift(3);
    setMode('encode');
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto w-full">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">&lt; Back to Home</Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Caesar Cipher</h2>
        <p className="mb-8">Encode and decode text using the classic Caesar cipher algorithm.</p>

        <div className="flex flex-col gap-4">
          <div className="field text-left">
            <label htmlFor="text_field">Text</label>
            <textarea id="text_field" className="nes-textarea" rows={4} value={text} onChange={(e) => setText(e.target.value)}></textarea>
          </div>
          <div className="field text-left">
            <label htmlFor="shift_field">Shift Amount</label>
            <input type="number" id="shift_field" className="nes-input" value={shift} onChange={(e) => setShift(Number(e.target.value))} />
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
