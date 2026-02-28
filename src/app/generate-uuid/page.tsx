'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UuidGenerator() {
  const [quantity, setQuantity] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generateUuids = () => {
    const newUuids = [];
    for (let i = 0; i < quantity; i++) {
      newUuids.push(crypto.randomUUID());
    }
    setUuids(newUuids);
    setCopiedAll(false);
    setCopiedIndex(null);
  };

  const copyUuid = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const clear = () => {
    setUuids([]);
    setCopiedAll(false);
    setCopiedIndex(null);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">UUID Generator</h2>
        <p className="mb-6">Generate random version 4 UUIDs.</p>

        <div className="flex flex-col gap-6">
          {/* Controls */}
          <div className="nes-field">
            <label htmlFor="quantity_range">Quantity: {quantity}</label>
            <input
              type="range"
              id="quantity_range"
              min="1"
              max="50"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="nes-range"
              style={{ width: '100%' }}
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button type="button" className="nes-btn is-primary" onClick={generateUuids}>
              Generate
            </button>
            <button
                type="button"
                className={`nes-btn ${uuids.length === 0 ? 'is-disabled' : 'is-success'}`}
                onClick={copyAll}
                disabled={uuids.length === 0}
            >
                {copiedAll ? 'Copied All!' : 'Copy All'}
            </button>
            <button type="button" className="nes-btn is-error" onClick={clear}>
              Clear
            </button>
          </div>

          {/* Output */}
          {uuids.length > 0 && (
            <div className="nes-container is-rounded text-left mt-4">
              <ul className="nes-list is-disc ml-4">
                {uuids.map((uuid, index) => (
                  <li key={index} className="flex flex-col md:flex-row items-center justify-between gap-2 mb-2">
                    <span className="text-xs break-all font-mono">{uuid}</span>
                    <button
                      type="button"
                      className={`nes-btn is-small ${copiedIndex === index ? 'is-success' : ''}`}
                      onClick={() => copyUuid(uuid, index)}
                      style={{ padding: '0px 8px', fontSize: '10px' }}
                    >
                      {copiedIndex === index ? 'Copied' : 'Copy'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
