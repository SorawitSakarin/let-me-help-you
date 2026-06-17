"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ShuffleList() {
  const [inputList, setInputList] = useState('');
  const [shuffledList, setShuffledList] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShuffle = () => {
    const lines = inputList.split('\n').filter(line => line.trim() !== '');
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setShuffledList(lines.join('\n'));
    setCopied(false);
  };

  const handleCopy = () => {
    if (!shuffledList) return;
    navigator.clipboard.writeText(shuffledList).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setInputList('');
    setShuffledList('');
    setCopied(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          List Shuffler
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Input List (One item per line)</h3>
        <textarea
          className="nes-textarea w-full"
          rows={8}
          value={inputList}
          onChange={(e) => setInputList(e.target.value)}
          placeholder="Item 1\nItem 2\nItem 3"
        ></textarea>
      </div>

      <div className="flex gap-4 justify-center mt-4">
         <button type="button" className="nes-btn is-primary" onClick={handleShuffle}>Shuffle List</button>
         <button type="button" className="nes-btn" onClick={handleClear}>Clear</button>
      </div>

      {shuffledList && (
        <div className="nes-container with-title is-rounded bg-white">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Shuffled Result</h3>
          <textarea
            className="nes-textarea w-full bg-white"
            rows={8}
            value={shuffledList}
            readOnly
          ></textarea>
          <div className="flex gap-4 justify-center mt-4">
              <button type="button" className={`nes-btn ${copied ? 'is-success' : ''}`} onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
          </div>
        </div>
      )}
    </div>
  );
}
