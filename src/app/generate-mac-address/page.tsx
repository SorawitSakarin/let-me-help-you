"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function GenerateMacAddress() {
  const [macAddress, setMacAddress] = useState('');
  const [format, setFormat] = useState('colon');
  const [uppercase, setUppercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateMac = () => {
    const hexDigits = "0123456789ABCDEF";
    let mac = "";
    for (let i = 0; i < 6; i++) {
      mac += hexDigits.charAt(Math.floor(Math.random() * 16));
      mac += hexDigits.charAt(Math.floor(Math.random() * 16));
      if (i !== 5) {
        mac += format === 'colon' ? ':' : (format === 'hyphen' ? '-' : '');
      }
    }
    setMacAddress(uppercase ? mac : mac.toLowerCase());
    setCopied(false);
  };

  const handleCopy = () => {
    if (!macAddress) return;
    navigator.clipboard.writeText(macAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      console.error('Failed to copy to clipboard');
    });
  };

  const handleClear = () => {
    setMacAddress('');
    setCopied(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-6xl mx-auto w-full">
      <div className="w-full flex justify-start">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">MAC Address Generator</h3>

        <div className="flex flex-col gap-4 text-left mt-4">
          <div className="flex flex-wrap gap-4 items-center justify-center">
             <label>
               <input type="radio" className="nes-radio" name="format" checked={format === 'colon'} onChange={() => setFormat('colon')} />
               <span>Colon (:)</span>
             </label>
             <label>
               <input type="radio" className="nes-radio" name="format" checked={format === 'hyphen'} onChange={() => setFormat('hyphen')} />
               <span>Hyphen (-)</span>
             </label>
              <label>
               <input type="radio" className="nes-radio" name="format" checked={format === 'none'} onChange={() => setFormat('none')} />
               <span>None</span>
             </label>
          </div>

          <div className="flex justify-center mt-2">
            <label>
              <input type="checkbox" className="nes-checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
              <span>Uppercase</span>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mt-6">
           <button type="button" className="nes-btn is-primary" onClick={generateMac}>Generate</button>
           <button type="button" className="nes-btn" onClick={handleClear}>Clear</button>
        </div>

        {macAddress && (
          <div className="mt-8">
            <textarea
              className="nes-textarea w-full bg-white text-center text-xl"
              rows={2}
              value={macAddress}
              readOnly
            ></textarea>
            <div className="flex justify-center mt-4">
                <button type="button" className={`nes-btn ${copied ? 'is-success' : ''}`} onClick={handleCopy}>
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
