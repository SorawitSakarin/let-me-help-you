"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function SortList() {
  const [inputList, setInputList] = useState('');
  const [sortedList, setSortedList] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSortAsc = () => {
    const lines = inputList.split('\n').filter(line => line.trim() !== '');
    lines.sort((a, b) => a.localeCompare(b));
    setSortedList(lines.join('\n'));
    setCopied(false);
  };

  const handleSortDesc = () => {
    const lines = inputList.split('\n').filter(line => line.trim() !== '');
    lines.sort((a, b) => b.localeCompare(a));
    setSortedList(lines.join('\n'));
    setCopied(false);
  };

  const handleSortLength = () => {
    const lines = inputList.split('\n').filter(line => line.trim() !== '');
    lines.sort((a, b) => a.length - b.length);
    setSortedList(lines.join('\n'));
    setCopied(false);
  };

  const handleRemoveDuplicates = () => {
    const lines = inputList.split('\n').filter(line => line.trim() !== '');
    const uniqueLines = Array.from(new Set(lines));
    setSortedList(uniqueLines.join('\n'));
    setCopied(false);
  };

  const handleCopy = () => {
    if (!sortedList) return;
    navigator.clipboard.writeText(sortedList).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setInputList('');
    setSortedList('');
    setCopied(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          List Sorter
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
          placeholder="Zebra\nApple\nBanana"
        ></textarea>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-4">
         <button type="button" className="nes-btn is-primary" onClick={handleSortAsc}>Sort A-Z</button>
         <button type="button" className="nes-btn is-success" onClick={handleSortDesc}>Sort Z-A</button>
         <button type="button" className="nes-btn is-warning" onClick={handleSortLength}>Sort Length</button>
         <button type="button" className="nes-btn is-error" onClick={handleRemoveDuplicates}>Remove Duplicates</button>
         <button type="button" className="nes-btn" onClick={handleClear}>Clear</button>
      </div>

      {sortedList && (
        <div className="nes-container with-title is-rounded bg-white">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Sorted Result</h3>
          <textarea
            className="nes-textarea w-full bg-white"
            rows={8}
            value={sortedList}
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
