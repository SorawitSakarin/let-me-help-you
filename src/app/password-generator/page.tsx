'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      alert('Please select at least one option.');
      return;
    }

    let generatedPassword = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generatedPassword += charset[array[i] % charset.length];
    }
    setPassword(generatedPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
      <Link href="/" className="nes-btn">
        &lt; Back to Home
      </Link>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">Password Generator</h3>

        <div className="flex flex-col gap-6 p-4">

          {/* Generated Password Display */}
          <div className="nes-field">
            <label htmlFor="password_field">Generated Password:</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="password_field"
                className="nes-input"
                value={password}
                readOnly
                placeholder="Click Generate!"
              />
              <button
                type="button"
                className={`nes-btn ${copied ? 'is-success' : 'is-primary'}`}
                onClick={copyToClipboard}
                disabled={!password}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="nes-container is-rounded">
            <p>Options</p>

            {/* Length Slider */}
            <div className="mb-4">
              <label htmlFor="length_range">Length: {length}</label>
              <input
                type="range"
                id="length_range"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="nes-range"
                style={{ width: '100%' }}
              />
            </div>

            {/* Checkboxes */}
             <div className="flex flex-col gap-4 text-left">
              <label>
                <input
                  type="checkbox"
                  className="nes-checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                <span>Uppercase (A-Z)</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  className="nes-checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                <span>Lowercase (a-z)</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  className="nes-checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                <span>Numbers (0-9)</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  className="nes-checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                <span>Symbols (!@#$)</span>
              </label>
            </div>
          </div>

          <button
            type="button"
            className="nes-btn is-error w-full"
            onClick={generatePassword}
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}
