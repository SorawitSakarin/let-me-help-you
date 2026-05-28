'use client';

import { useState } from 'react';
import Link from 'next/link';
import { generateAsciiArt } from './actions';

export default function AsciiArtGenerator() {
  const [inputText, setInputText] = useState('Hello');
  const [font, setFont] = useState('Standard');
  const [output, setOutput] = useState('');

  const generateArt = async () => {
    if (!inputText) return;
    try {
        const art = await generateAsciiArt(inputText);
        setOutput(art);
    } catch(e) {
        console.error(e);
        alert('Failed to generate ASCII art.');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutput('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          ASCII Art Generator
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      {/* Input Area */}
      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Input String</h3>
        <textarea
          className="nes-textarea w-full"
          rows={3}
          placeholder="Enter text to convert to ASCII art..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          aria-label="Input Text"
        />
      </div>

       <div className="flex justify-center w-full">
            <button
                type="button"
                className={`nes-btn is-primary ${!inputText ? 'is-disabled' : ''}`}
                onClick={generateArt}
                disabled={!inputText}
            >
                Generate ASCII Art
            </button>
        </div>


      {/* Output Area */}
      <div className="nes-container with-title is-rounded bg-white overflow-x-auto">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>ASCII Art</h3>
         <pre className="whitespace-pre overflow-x-auto p-4 bg-gray-100 rounded text-sm min-h-[150px]">
            {output}
          </pre>
      </div>


      {/* Utility Actions */}
      <div className="flex gap-4 justify-end">
        <button type="button" className="nes-btn is-error" onClick={handleClear}>Clear</button>
        <button type="button" className="nes-btn is-success" onClick={handleCopy} disabled={!output}>Copy</button>
      </div>
    </div>
  );
}
