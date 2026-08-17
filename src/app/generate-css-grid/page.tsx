'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CssGridGenerator() {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState(10);
  const [copied, setCopied] = useState(false);

  const cssCode = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${gap}px;
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => console.error('Failed to copy', err));
  };

  const handleClear = () => {
    setRows(3);
    setColumns(3);
    setGap(10);
    setCopied(false);
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto w-full">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">&lt; Back to Home</Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">CSS Grid Generator</h2>
        <p className="mb-8">Generate and preview CSS Grid layouts.</p>

        <div className="flex flex-col gap-4">
          <div className="field text-left">
            <label htmlFor="rows_input">Rows: {rows}</label>
            <input type="range" id="rows_input" min="1" max="10" value={rows} onChange={(e) => setRows(Number(e.target.value))} className="w-full" />
          </div>
          <div className="field text-left">
            <label htmlFor="columns_input">Columns: {columns}</label>
            <input type="range" id="columns_input" min="1" max="10" value={columns} onChange={(e) => setColumns(Number(e.target.value))} className="w-full" />
          </div>
          <div className="field text-left">
            <label htmlFor="gap_input">Gap (px): {gap}</label>
            <input type="range" id="gap_input" min="0" max="50" value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full" />
          </div>

          <div className="flex gap-4 mt-4">
            <button type="button" className={`nes-btn ${copied ? 'is-success' : 'is-primary'}`} onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy CSS'}
            </button>
            <button type="button" className="nes-btn" onClick={handleClear}>Clear</button>
          </div>
        </div>

      </div>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">Preview</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: `${gap}px`,
            width: '100%',
            minHeight: '200px'
          }}
        >
          {Array.from({ length: rows * columns }).map((_, i) => (
            <div key={i} style={{ border: '2px solid black', backgroundColor: '#d3d3d3', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50px' }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">CSS Output</h3>
        <textarea readOnly className="nes-textarea" rows={6} value={cssCode}></textarea>
      </div>
    </div>
  );
}
