'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CssMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copyStatus, setCopyStatus] = useState<'copied' | null>(null);

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      // Basic CSS minification logic
      const minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\s*([\{\}\:\;\,])\s*/g, '$1') // Remove spaces around operators
        .replace(/;\}/g, '}') // Remove trailing semicolons in blocks
        .trim();
      setOutput(minified);
    } catch (err: any) {
      setOutput('');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-8">
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="nes-btn">
          &lt; Back
        </Link>
      </div>

      <section className="nes-container with-title is-rounded">
        <h2 className="title text-xl">CSS Minifier</h2>
        <p className="mb-6 text-sm">Minify your CSS code to reduce file size.</p>

        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="css-input" className="mb-2 block text-sm">Input CSS</label>
            <textarea
              id="css-input"
              className="nes-textarea text-xs"
              rows={8}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your CSS here..."
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleMinify}
              className="nes-btn is-primary"
              disabled={!input.trim()}
            >
              Minify CSS
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
               <label htmlFor="css-output" className="block text-sm">Minified CSS</label>
               {output && (
                <button
                    onClick={handleCopy}
                    className={`nes-btn is-small ${copyStatus === 'copied' ? 'is-success' : ''}`}
                >
                    {copyStatus === 'copied' ? 'Copied!' : 'Copy'}
                </button>
               )}
            </div>
            <textarea
              id="css-output"
              className="nes-textarea text-xs bg-gray-50"
              rows={8}
              value={output}
              readOnly
              placeholder="Minified CSS will appear here..."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
