'use client';

import { useState } from 'react';
import Link from 'next/link';
import { generateLoremIpsum, LoremUnit } from '@/utils/lorem';

export default function LoremIpsumPage() {
  const [count, setCount] = useState<number>(5);
  const [unit, setUnit] = useState<LoremUnit>('paragraphs');
  const [text, setText] = useState<string>('');
  const [copyStatus, setCopyStatus] = useState<boolean>(false);

  const handleGenerate = () => {
    const generated = generateLoremIpsum(count, unit);
    setText(generated);
    setCopyStatus(false);
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleClear = () => {
    setText('');
    setCopyStatus(false);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      {/* Back Button */}
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      {/* Main Container */}
      <div className="nes-container with-title w-full">
        <h2 className="title">Lorem Ipsum Generator</h2>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-6 items-end">
          <div className="flex-1 w-full">
            <label htmlFor="count_field">Count</label>
            <input
              type="number"
              id="count_field"
              className="nes-input"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 0)}
              min="1"
              max="100"
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="unit_select">Unit</label>
            <div className="nes-select">
              <select
                required
                id="unit_select"
                value={unit}
                onChange={(e) => setUnit(e.target.value as LoremUnit)}
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>
          </div>
          <div className="flex-none">
            <button
              type="button"
              className="nes-btn is-primary"
              onClick={handleGenerate}
            >
              Generate
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="mb-6">
          <label htmlFor="output_field">Result:</label>
          <textarea
            id="output_field"
            className="nes-textarea w-full min-h-[300px]"
            value={text}
            readOnly
            placeholder="Generated text will appear here..."
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            className="nes-btn is-error"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            type="button"
            className={`nes-btn ${copyStatus ? 'is-success' : 'is-warning'}`}
            onClick={handleCopy}
            disabled={!text}
          >
            {copyStatus ? 'Copied!' : 'Copy Text'}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="nes-container is-dark w-full">
        <p>
          Use this tool to generate placeholder text for your mockups and designs.
        </p>
      </div>
    </div>
  );
}
