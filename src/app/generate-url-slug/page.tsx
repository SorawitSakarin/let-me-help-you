'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function GenerateUrlSlugPage() {
  const [text, setText] = useState('');
  const [separator, setSeparator] = useState('-');

  const generatedSlug = useMemo(() => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, separator);
  }, [text, separator]);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">&lt; Back to Home</Link>
      </div>
      <div className="nes-container with-title w-full">
        <h2 className="title">URL Slug Generator</h2>
        <div className="mb-6">
          <label htmlFor="text_input">Text to slugify:</label>
          <input id="text_input" className="nes-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="mb-6 flex gap-4">
          <label>
            <input type="radio" className="nes-radio" name="separator" checked={separator === '-'} onChange={() => setSeparator('-')} />
            <span>Hyphen (-)</span>
          </label>
          <label>
            <input type="radio" className="nes-radio" name="separator" checked={separator === '_'} onChange={() => setSeparator('_')} />
            <span>Underscore (_)</span>
          </label>
        </div>
        <div className="mb-6">
          <label htmlFor="slug_output">Generated Slug:</label>
          <textarea id="slug_output" className="nes-textarea" readOnly value={generatedSlug} />
        </div>
        <div className="flex gap-4">
          <button className="nes-btn is-error" onClick={() => setText('')}>Clear</button>
          <button className="nes-btn is-primary" onClick={() => navigator.clipboard.writeText(generatedSlug)}>Copy Slug</button>
        </div>
      </div>
    </div>
  );
}
