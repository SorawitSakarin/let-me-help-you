'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function FindAndReplace() {
  const [inputText, setInputText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [matchCase, setMatchCase] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [copyStatus, setCopyStatus] = useState<'copied' | null>(null);

  const handleReplace = () => {
    if (!findText) {
      setOutputText(inputText);
      return;
    }

    try {
      let result = '';
      if (useRegex) {
        const flags = matchCase ? 'g' : 'gi';
        const regex = new RegExp(findText, flags);
        result = inputText.replace(regex, replaceText);
      } else {
        if (matchCase) {
          result = inputText.split(findText).join(replaceText);
        } else {
          const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(escapeRegExp(findText), 'gi');
          result = inputText.replace(regex, replaceText);
        }
      }
      setOutputText(result);
    } catch (err: any) {
      setOutputText('Invalid Regular Expression: ' + err.message);
    }
  };

  const handleClear = () => {
    setInputText('');
    setFindText('');
    setReplaceText('');
    setOutputText('');
    setCopyStatus(null);
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText).catch(err => console.error(err));
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-6xl mx-auto w-full">
      <div className="w-full flex justify-start">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">Find and Replace</h3>
        <p className="mb-6 text-sm">Find and replace text with match case and regex options.</p>

        <div className="flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-2">
            <label className="text-left text-sm">Input Text</label>
            <textarea
              className="nes-textarea w-full"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text here..."
              rows={5}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-left text-sm">Find</label>
              <input
                type="text"
                className="nes-input w-full"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                placeholder="Text to find"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-left text-sm">Replace with</label>
              <input
                type="text"
                className="nes-input w-full"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Replacement text"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <label className="text-left text-sm">
              <input
                type="checkbox"
                className="nes-checkbox"
                checked={matchCase}
                onChange={(e) => setMatchCase(e.target.checked)}
              />
              <span>Match Case</span>
            </label>
            <label className="text-left text-sm">
              <input
                type="checkbox"
                className="nes-checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
              />
              <span>Use Regex</span>
            </label>
          </div>

          <div className="flex gap-2 mt-2">
             <button type="button" className="nes-btn is-primary flex-1 text-xs sm:text-sm" onClick={handleReplace}>Replace</button>
             <button type="button" className="nes-btn is-error flex-1 text-xs sm:text-sm" onClick={handleClear}>Clear</button>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-left text-sm">Output Text</label>
            <textarea
              className="nes-textarea bg-gray-50 w-full"
              value={outputText}
              readOnly
              placeholder="Result will appear here..."
              rows={5}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                type="button"
                className={`nes-btn ${copyStatus === 'copied' ? 'is-success' : ''} text-sm`}
                onClick={handleCopy}
                disabled={!outputText}
              >
                {copyStatus === 'copied' ? 'Copied!' : 'Copy Output'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
