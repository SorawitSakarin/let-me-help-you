'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function AddPrefixSuffixPage() {
  const [text, setText] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [copyStatus, setCopyStatus] = useState<'copied' | null>(null);

  const result = useMemo(() => {
    if (!text) return '';
    return text
      .split('\n')
      .map(line => `${prefix}${line}${suffix}`)
      .join('\n');
  }, [text, prefix, suffix]);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result).catch(() => {});
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>
      <div className="nes-container with-title w-full">
        <h2 className="title">Add Prefix & Suffix</h2>
        <div className="mb-6">
          <label htmlFor="input_text">Input Text:</label>
          <textarea
            id="input_text"
            className="nes-textarea w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Enter your lines here..."
          ></textarea>
        </div>
        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <label htmlFor="prefix_input">Prefix:</label>
            <input
              id="prefix_input"
              type="text"
              className="nes-input w-full"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="e.g. - "
            />
          </div>
          <div className="flex-1">
            <label htmlFor="suffix_input">Suffix:</label>
            <input
              id="suffix_input"
              type="text"
              className="nes-input w-full"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              placeholder="e.g. ,"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="output_text">Output Text:</label>
          <textarea
            id="output_text"
            className="nes-textarea w-full"
            value={result}
            readOnly
            rows={6}
          ></textarea>
        </div>
        <div className="flex gap-4">
          <button
            className="nes-btn is-error"
            onClick={() => { setText(''); setPrefix(''); setSuffix(''); setCopyStatus(null); }}
          >
            Clear
          </button>
          <button
            className={`nes-btn ${copyStatus === 'copied' ? 'is-success' : 'is-primary'}`}
            onClick={handleCopy}
          >
            {copyStatus === 'copied' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
