'use client';

import { useState } from 'react';
import Link from 'next/link';

const MORSE_CODE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/'
};

const REVERSE_MORSE_CODE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_CODE_MAP).map(([key, value]) => [value, key])
);

export default function MorseCodeTranslator() {
  const [text, setText] = useState('');
  const [morse, setMorse] = useState('');
  const [copyStatus, setCopyStatus] = useState<'text' | 'morse' | null>(null);
  const [activeTab, setActiveTab] = useState<'letters' | 'numbers' | 'special'>('letters');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    const newMorse = newText
      .toUpperCase()
      .split('')
      .map((char) => MORSE_CODE_MAP[char] || char)
      .join(' ');
    setMorse(newMorse);
  };

  const handleMorseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMorse = e.target.value;
    setMorse(newMorse);

    const newText = newMorse
      .split(' ')
      .map((code) => REVERSE_MORSE_CODE_MAP[code] || (code === '' ? '' : code))
      .join('')
      .replace(/\//g, ' ');

    setText(newText.toLowerCase());
  };

  const copyToClipboard = (content: string, type: 'text' | 'morse') => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const clearAll = () => {
    setText('');
    setMorse('');
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Morse Code Translator</h2>

        <div className="flex flex-col gap-8 p-4">
          <p className="text-center mb-4">
            Translate text to Morse code and back instantly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

            <div className="flex flex-col gap-4">
              <label htmlFor="morse_input" className="mb-2">Morse Code</label>
              <textarea
                id="morse_input"
                className="nes-textarea min-h-[200px]"
                value={morse}
                onChange={handleMorseChange}
                placeholder="... --- ..."
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className={`nes-btn is-small ${copyStatus === 'morse' ? 'is-success' : ''}`}
                  onClick={() => copyToClipboard(morse, 'morse')}
                >
                  {copyStatus === 'morse' ? 'Copied!' : 'Copy Morse'}
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

      {/* Morse Code Reference */}
      <div className="nes-container with-title is-rounded w-full bg-white mt-4">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Morse Code Reference</h3>
        <div className="p-2 md:p-4">
          <div className="flex gap-2 justify-center mb-6 flex-wrap">
            <button
              type="button"
              className={`nes-btn is-small ${activeTab === 'letters' ? 'is-primary' : ''}`}
              onClick={() => setActiveTab('letters')}
            >
              Letters
            </button>
            <button
              type="button"
              className={`nes-btn is-small ${activeTab === 'numbers' ? 'is-primary' : ''}`}
              onClick={() => setActiveTab('numbers')}
            >
              Numbers
            </button>
            <button
              type="button"
              className={`nes-btn is-small ${activeTab === 'special' ? 'is-primary' : ''}`}
              onClick={() => setActiveTab('special')}
            >
              Punctuation
            </button>
          </div>

          {activeTab === 'letters' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="nes-table-responsive">
                <table className="nes-table is-compact is-bordered is-centered w-[90%] text-xs">
                  <thead>
                    <tr>
                      <th>Char</th>
                      <th>Morse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(MORSE_CODE_MAP)
                      .filter(([char]) => char >= 'A' && char <= 'M')
                      .map(([char, code]) => (
                        <tr key={char}>
                          <td>{char}</td>
                          <td className="font-mono">{code}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="nes-table-responsive">
                <table className="nes-table is-compact is-bordered is-centered w-[90%] text-xs">
                  <thead>
                    <tr>
                      <th>Char</th>
                      <th>Morse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(MORSE_CODE_MAP)
                      .filter(([char]) => char >= 'N' && char <= 'Z')
                      .map(([char, code]) => (
                        <tr key={char}>
                          <td>{char}</td>
                          <td className="font-mono">{code}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'numbers' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="nes-table-responsive">
                <table className="nes-table is-compact is-bordered is-centered w-[90%] text-xs">
                  <thead>
                    <tr>
                      <th>Char</th>
                      <th>Morse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(MORSE_CODE_MAP)
                      .filter(([char]) => char >= '0' && char <= '4')
                      .map(([char, code]) => (
                        <tr key={char}>
                          <td>{char}</td>
                          <td className="font-mono">{code}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="nes-table-responsive">
                <table className="nes-table is-compact is-bordered is-centered w-[90%] text-xs">
                  <thead>
                    <tr>
                      <th>Char</th>
                      <th>Morse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(MORSE_CODE_MAP)
                      .filter(([char]) => char >= '5' && char <= '9')
                      .map(([char, code]) => (
                        <tr key={char}>
                          <td>{char}</td>
                          <td className="font-mono">{code}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'special' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="nes-table-responsive">
                <table className="nes-table is-compact is-bordered is-centered w-[90%] text-xs">
                  <thead>
                    <tr>
                      <th>Char</th>
                      <th>Morse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(MORSE_CODE_MAP)
                      .filter(([char]) => !(char >= 'A' && char <= 'Z') && !(char >= '0' && char <= '9') && char !== ' ')
                      .slice(0, 9)
                      .map(([char, code]) => (
                        <tr key={char}>
                          <td>{char}</td>
                          <td className="font-mono">{code}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="nes-table-responsive">
                <table className="nes-table is-compact is-bordered is-centered w-[90%] text-xs">
                  <thead>
                    <tr>
                      <th>Char</th>
                      <th>Morse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(MORSE_CODE_MAP)
                      .filter(([char]) => !(char >= 'A' && char <= 'Z') && !(char >= '0' && char <= '9') && char !== ' ')
                      .slice(9)
                      .map(([char, code]) => (
                        <tr key={char}>
                          <td>{char}</td>
                          <td className="font-mono">{code}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}