'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRightLeft, Copy, Check, Trash2, Binary } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-cyan-600 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
             <Binary className="w-6 h-6" />
             <h1 className="text-2xl font-bold">Binary Translator</h1>
          </div>
          <p className="text-cyan-100 mt-2">Translate text to binary code and back instantly.</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Text Input */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label htmlFor="text_input" className="text-sm font-medium text-gray-700">Text Input</label>
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
                    copyStatus === 'text'
                      ? 'bg-green-50 text-green-600 border-green-200'
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => copyToClipboard(text, 'text')}
                >
                  {copyStatus === 'text' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copyStatus === 'text' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <textarea
                id="text_input"
                className="w-full h-64 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-sans text-gray-800 leading-relaxed"
                value={text}
                onChange={handleTextChange}
                placeholder="Type text here..."
              />
            </div>

            {/* Binary Input */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label htmlFor="binary_input" className="text-sm font-medium text-gray-700">Binary Output</label>
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
                    copyStatus === 'binary'
                      ? 'bg-green-50 text-green-600 border-green-200'
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => copyToClipboard(binary, 'binary')}
                >
                  {copyStatus === 'binary' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copyStatus === 'binary' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <textarea
                id="binary_input"
                className="w-full h-64 p-4 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-mono text-sm text-gray-600 leading-relaxed"
                value={binary}
                onChange={handleBinaryChange}
                placeholder="01001000 01100101 01101100 01101100 01101111"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8 pt-8 border-t border-gray-100">
            <button
                type="button"
                className="flex items-center gap-2 px-6 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                onClick={clearAll}
            >
                <Trash2 className="w-4 h-4" />
                Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
