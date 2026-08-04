'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function HtmlTagStripper() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleStrip = () => {
    const stripped = inputText.replace(/<[^>]*>?/gm, '');
    setOutputText(stripped);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText).catch(() => {});
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>
      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">HTML Tag Stripper</h2>
        <p className="mb-8">Remove all HTML tags from a text string easily.</p>
        <div className="flex flex-col gap-4">
          <div className="field">
            <label htmlFor="input_field">Input HTML</label>
            <textarea id="input_field" className="nes-textarea" rows={6} value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Paste your HTML here..."></textarea>
          </div>
          <div className="flex flex-wrap gap-4 justify-center my-4">
            <button type="button" className="nes-btn is-primary" onClick={handleStrip}>Strip HTML Tags</button>
            <button type="button" className="nes-btn is-warning" onClick={handleClear}>Clear</button>
          </div>
          <div className="field">
            <label htmlFor="output_field">Output Text</label>
            <textarea id="output_field" className="nes-textarea" rows={6} value={outputText} readOnly placeholder="Stripped text will appear here..."></textarea>
          </div>
          <div className="flex justify-center mt-2">
            <button type="button" className={`nes-btn ${!outputText ? 'is-disabled' : ''}`} onClick={handleCopy} disabled={!outputText}>Copy Result</button>
          </div>
        </div>
      </div>
    </div>
  );
}
