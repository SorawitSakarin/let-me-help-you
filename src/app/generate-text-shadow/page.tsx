'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CSSTextShadowGenerator() {
  const [offsetX, setOffsetX] = useState(2);
  const [offsetY, setOffsetY] = useState(2);
  const [blur, setBlur] = useState(4);
  const [color, setColor] = useState('#000000');
  const [copyMessage, setCopyMessage] = useState('');

  const textShadowCSS = `${offsetX}px ${offsetY}px ${blur}px ${color}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`text-shadow: ${textShadowCSS};`).catch(() => {});
    setCopyMessage('Copied to clipboard!');
    setTimeout(() => setCopyMessage(''), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Text Shadow Generator</h2>
        <p className="mb-8">Create and preview CSS text shadows.</p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-4">
            <div className="nes-field text-left">
              <label htmlFor="offsetX">Offset X: {offsetX}px</label>
              <input
                type="range"
                id="offsetX"
                min="-50"
                max="50"
                value={offsetX}
                onChange={(e) => setOffsetX(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div className="nes-field text-left">
              <label htmlFor="offsetY">Offset Y: {offsetY}px</label>
              <input
                type="range"
                id="offsetY"
                min="-50"
                max="50"
                value={offsetY}
                onChange={(e) => setOffsetY(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div className="nes-field text-left">
              <label htmlFor="blur">Blur Radius: {blur}px</label>
              <input
                type="range"
                id="blur"
                min="0"
                max="50"
                value={blur}
                onChange={(e) => setBlur(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div className="nes-field text-left">
              <label htmlFor="color">Shadow Color</label>
              <input
                type="color"
                id="color"
                className="nes-input"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ height: '50px', padding: '0.2rem' }}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="nes-field flex-1 flex flex-col items-center justify-center text-left" style={{ minHeight: '250px' }}>
              <label className="w-full">Preview</label>
              <div
                style={{
                  textShadow: textShadowCSS,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '1rem',
                  marginTop: '1rem',
                  fontSize: '2rem'
                }}
              >
                Text Shadow Preview
              </div>
            </div>

            <div className="nes-field text-left mt-4">
              <label htmlFor="output_field">CSS Output</label>
              <textarea
                id="output_field"
                className="nes-textarea"
                rows={2}
                readOnly
                value={`text-shadow: ${textShadowCSS};`}
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
