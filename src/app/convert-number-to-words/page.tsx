'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function NumberToWords() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const numberToWords = (num: number): string => {
    if (num === 0) return 'zero';

    const belowTwenty = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const thousands = ['', 'thousand', 'million', 'billion', 'trillion'];

    let word = '';
    let isNegative = num < 0;
    num = Math.abs(num);

    const helper = (n: number): string => {
      if (n === 0) return '';
      else if (n < 20) return belowTwenty[n] + ' ';
      else if (n < 100) return tens[Math.floor(n / 10)] + ' ' + helper(n % 10);
      else return belowTwenty[Math.floor(n / 100)] + ' hundred ' + helper(n % 100);
    };

    let i = 0;
    while (num > 0) {
      if (num % 1000 !== 0) {
        word = helper(num % 1000) + thousands[i] + ' ' + word;
      }
      num = Math.floor(num / 1000);
      i++;
    }

    return (isNegative ? 'negative ' : '') + word.trim();
  };

  const handleConvert = () => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed)) {
      setOutput('Invalid number');
    } else {
      setOutput(numberToWords(parsed));
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = () => {
    if (output && output !== 'Invalid number') {
      navigator.clipboard.writeText(output).catch(console.error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto w-full">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>
      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Number to Words</h2>
        <p className="mb-6">Convert a number into English words.</p>

        <div className="nes-field mb-4 text-left">
          <label htmlFor="num-input">Number Input</label>
          <input
            type="number"
            id="num-input"
            className="nes-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 1234"
          />
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <button type="button" className="nes-btn is-primary" onClick={handleConvert}>
            Convert
          </button>
          <button type="button" className="nes-btn is-warning" onClick={handleClear}>
            Clear
          </button>
        </div>

        <div className="nes-field text-left mb-4">
          <label htmlFor="num-output">Words Output</label>
          <textarea
            id="num-output"
            className="nes-textarea"
            value={output}
            readOnly
            rows={4}
          />
        </div>

        <button
          type="button"
          className="nes-btn is-success"
          onClick={handleCopy}
          disabled={!output || output === 'Invalid number'}
        >
          Copy Result
        </button>
      </div>
    </div>
  );
}