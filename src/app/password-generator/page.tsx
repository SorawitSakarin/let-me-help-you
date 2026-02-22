'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, RefreshCw, Key } from 'lucide-react';

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
    <div className="max-w-2xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-amber-500 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
             <Key className="w-6 h-6" />
             <h1 className="text-2xl font-bold">Password Generator</h1>
          </div>
          <p className="text-amber-100 mt-2">Generate strong, secure passwords instantly.</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Generated Password Display */}
          <div>
            <label htmlFor="password_field" className="block text-sm font-medium text-gray-700 mb-2">Generated Password</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="password_field"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 font-mono focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                value={password}
                readOnly
                placeholder="Click Generate!"
              />
              <button
                type="button"
                className={`flex items-center justify-center px-6 rounded-lg font-medium transition-all shadow-sm active:scale-95 ${
                  copied
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                onClick={copyToClipboard}
                disabled={!password}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-6">
            <h3 className="font-semibold text-gray-900">Configuration</h3>

            {/* Length Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="length_range" className="text-sm font-medium text-gray-700">Length</label>
                <span className="text-sm font-mono bg-white px-2 py-1 rounded border border-gray-200">{length}</span>
              </div>
              <input
                type="range"
                id="length_range"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Checkboxes */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-amber-600 rounded border-gray-300 focus:ring-amber-500 cursor-pointer"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                <span className="text-gray-700 group-hover:text-gray-900">Uppercase (A-Z)</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-amber-600 rounded border-gray-300 focus:ring-amber-500 cursor-pointer"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                <span className="text-gray-700 group-hover:text-gray-900">Lowercase (a-z)</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-amber-600 rounded border-gray-300 focus:ring-amber-500 cursor-pointer"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                <span className="text-gray-700 group-hover:text-gray-900">Numbers (0-9)</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-amber-600 rounded border-gray-300 focus:ring-amber-500 cursor-pointer"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                <span className="text-gray-700 group-hover:text-gray-900">Symbols (!@#$)</span>
              </label>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-4 bg-amber-500 text-white font-bold rounded-xl shadow-lg hover:bg-amber-600 hover:shadow-xl focus:ring-4 focus:ring-amber-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            onClick={generatePassword}
          >
            <RefreshCw className="w-5 h-5" />
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}
