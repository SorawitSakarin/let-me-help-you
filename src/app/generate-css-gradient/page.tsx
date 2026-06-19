'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CSSGradientGenerator() {
  const [color1, setColor1] = useState('#ff0000');
  const [color2, setColor2] = useState('#0000ff');
  const [direction, setDirection] = useState('to right');
  const [copyMessage, setCopyMessage] = useState('');

  const gradientCSS = `linear-gradient(${direction}, ${color1}, ${color2})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`background: ${gradientCSS};`);
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
        <h2 className="title">CSS Gradient Generator</h2>
        <p className="mb-8">Create and preview beautiful CSS gradients.</p>

        <div className="flex flex-col gap-4">
          <div className="field">
            <label htmlFor="color1">Color 1</label>
            <input
              type="color"
              id="color1"
              className="nes-input"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="color2">Color 2</label>
            <input
              type="color"
              id="color2"
              className="nes-input"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="direction">Direction</label>
            <div className="nes-select">
              <select
                id="direction"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              >
                <option value="to right">To Right</option>
                <option value="to left">To Left</option>
                <option value="to bottom">To Bottom</option>
                <option value="to top">To Top</option>
                <option value="to bottom right">To Bottom Right</option>
                <option value="to bottom left">To Bottom Left</option>
                <option value="to top right">To Top Right</option>
                <option value="to top left">To Top Left</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Preview</label>
            <div
              style={{ background: gradientCSS, height: '150px', border: '4px solid black' }}
            ></div>
          </div>

          <div className="field">
            <label htmlFor="output_field">CSS Output</label>
            <textarea
              id="output_field"
              className="nes-textarea"
              rows={2}
              readOnly
              value={`background: ${gradientCSS};`}
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
  );
}
