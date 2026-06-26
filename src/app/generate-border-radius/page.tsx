'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function BorderRadiusGenerator() {
  const [sameForAll, setSameForAll] = useState(true);
  const [allRadius, setAllRadius] = useState(10);
  const [topLeft, setTopLeft] = useState(10);
  const [topRight, setTopRight] = useState(10);
  const [bottomRight, setBottomRight] = useState(10);
  const [bottomLeft, setBottomLeft] = useState(10);
  const [copyMessage, setCopyMessage] = useState('');

  const borderRadiusCSS = sameForAll
    ? `${allRadius}px`
    : `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`border-radius: ${borderRadiusCSS};`).then(() => {
      setCopyMessage('Copied to clipboard!');
      setTimeout(() => setCopyMessage(''), 2000);
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
      setCopyMessage('Failed to copy');
      setTimeout(() => setCopyMessage(''), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto w-full">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">&lt; Back to Home</Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Border Radius Generator</h2>
        <p className="mb-8">Create and preview CSS border radii.</p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-4">
            <div className="nes-field text-left mb-4">
              <label>
                <input
                  type="checkbox"
                  className="nes-checkbox"
                  checked={sameForAll}
                  onChange={(e) => setSameForAll(e.target.checked)}
                />
                <span>Same for all corners</span>
              </label>
            </div>

            {sameForAll ? (
              <div className="nes-field text-left">
                <label htmlFor="allRadius">All Corners: {allRadius}px</label>
                <input
                  type="range"
                  id="allRadius"
                  min="0"
                  max="200"
                  value={allRadius}
                  onChange={(e) => setAllRadius(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            ) : (
              <>
                <div className="nes-field text-left">
                  <label htmlFor="topLeft">Top Left: {topLeft}px</label>
                  <input
                    type="range"
                    id="topLeft"
                    min="0"
                    max="200"
                    value={topLeft}
                    onChange={(e) => setTopLeft(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="nes-field text-left">
                  <label htmlFor="topRight">Top Right: {topRight}px</label>
                  <input
                    type="range"
                    id="topRight"
                    min="0"
                    max="200"
                    value={topRight}
                    onChange={(e) => setTopRight(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="nes-field text-left">
                  <label htmlFor="bottomRight">Bottom Right: {bottomRight}px</label>
                  <input
                    type="range"
                    id="bottomRight"
                    min="0"
                    max="200"
                    value={bottomRight}
                    onChange={(e) => setBottomRight(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="nes-field text-left">
                  <label htmlFor="bottomLeft">Bottom Left: {bottomLeft}px</label>
                  <input
                    type="range"
                    id="bottomLeft"
                    min="0"
                    max="200"
                    value={bottomLeft}
                    onChange={(e) => setBottomLeft(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="nes-field flex-1 flex flex-col items-center justify-center text-left" style={{ minHeight: '250px' }}>
              <label className="w-full">Preview</label>
              <div
                style={{
                  borderRadius: borderRadiusCSS,
                  width: '12rem',
                  height: '12rem',
                  backgroundColor: 'black',
                  border: '4px solid black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '1rem',
                  marginTop: '1rem',
                  color: 'white'
                }}
              >
                Preview
              </div>
            </div>

            <div className="nes-field text-left mt-4">
              <label htmlFor="output_field">CSS Output</label>
              <textarea
                id="output_field"
                className="nes-textarea"
                rows={2}
                readOnly
                value={`border-radius: ${borderRadiusCSS};`}
              />
            </div>

            <div className="flex justify-center mt-2">
              <button
                type="button"
                className="nes-btn is-primary"
                onClick={handleCopy}
              >
                {copyMessage || 'Copy CSS'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
