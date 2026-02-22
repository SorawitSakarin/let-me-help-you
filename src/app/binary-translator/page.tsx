'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BinaryTranslator() {
  const [text, setText] = useState('');
  const [binary, setBinary] = useState('');
  const [copyStatus, setCopyStatus] = useState<'text' | 'binary' | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    const newBinary = newText
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
    setBinary(newBinary);
  };

  const handleBinaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBinary = e.target.value;
    setBinary(newBinary);

    // Clean input for processing: remove non-binary chars (except spaces), normalize spaces
    const cleanBinary = newBinary.replace(/[^01\s]/g, '').replace(/\s+/g, ' ').trim();

    if (!cleanBinary) {
        if (newBinary.trim() === '') {
            setText('');
        }
        return;
    }

    try {
      const newText = cleanBinary
        .split(' ')
        .map((bin) => {
            if (bin.length === 0) return '';
            const code = parseInt(bin, 2);
            return isNaN(code) ? '' : String.fromCharCode(code);
        })
        .join('');
      setText(newText);
    } catch (err) {
      console.error(err);
      // Ignore errors during typing
    }
  };

  const copyToClipboard = (content: string, type: 'text' | 'binary') => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const clearAll = () => {
    setText('');
    setBinary('');
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto px-4">
      <Link href="/" className="nes-btn">
        &lt; Back to Home
      </Link>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">Binary Translator</h3>

        <div className="flex flex-col gap-8 p-4">
          <p className="text-center mb-4">
            Translate text to binary code and back instantly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Text Input */}
            <div className="flex flex-col gap-4">
              <label htmlFor="text_input" className="mb-2">Text Input</label>
              <textarea
                id="text_input"
                className="nes-textarea min-h-[200px]"
                value={text}
                onChange={handleTextChange}
                placeholder="Type text here..."
              />
              <div className="flex gap-2 justify-end">
                 <button
                  type="button"
                  className={`nes-btn is-small ${copyStatus === 'text' ? 'is-success' : ''}`}
                  onClick={() => copyToClipboard(text, 'text')}
                >
                  {copyStatus === 'text' ? 'Copied!' : 'Copy Text'}
                </button>
              </div>
            </div>

            {/* Binary Input */}
            <div className="flex flex-col gap-4">
              <label htmlFor="binary_input" className="mb-2">Binary Output</label>
              <textarea
                id="binary_input"
                className="nes-textarea min-h-[200px]"
                value={binary}
                onChange={handleBinaryChange}
                placeholder="01001000 01100101 01101100 01101100 01101111"
              />
               <div className="flex gap-2 justify-end">
                 <button
                  type="button"
                  className={`nes-btn is-small ${copyStatus === 'binary' ? 'is-success' : ''}`}
                  onClick={() => copyToClipboard(binary, 'binary')}
                >
                  {copyStatus === 'binary' ? 'Copied!' : 'Copy Binary'}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="button" className="nes-btn is-error" onClick={clearAll}>
                Clear All
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
