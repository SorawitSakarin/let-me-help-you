'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function WordCounterPage() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return {
        words: 0,
        chars: 0,
        charsNoSpace: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
      };
    }

    const words = trimmedText.split(/\s+/).length;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;
    const readingTime = Math.ceil(words / 200); // 200 words per minute

    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime };
  }, [text]);

  const handleClear = () => {
    setText('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      {/* Back Button */}
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      {/* Main Container */}
      <div className="nes-container with-title w-full">
        <h2 className="title">Word Counter</h2>

        {/* Text Input Area */}
        <div className="mb-6">
          <label htmlFor="textarea_field">Enter your text below:</label>
          <textarea
            id="textarea_field"
            className="nes-textarea w-full min-h-[300px]"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
            <button type="button" className="nes-btn is-error" onClick={handleClear}>
                Clear
            </button>
            <button type="button" className="nes-btn is-primary" onClick={handleCopy}>
                Copy Text
            </button>
        </div>

        {/* Statistics Grid */}
        <div className="nes-container with-title is-centered">
            <h3 className="title">Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                <div className="p-2">
                    <p className="text-gray-500 text-sm">Words</p>
                    <p className="text-2xl">{stats.words}</p>
                </div>
                <div className="p-2">
                    <p className="text-gray-500 text-sm">Characters</p>
                    <p className="text-2xl">{stats.chars}</p>
                </div>
                <div className="p-2">
                    <p className="text-gray-500 text-sm">Chars (no space)</p>
                    <p className="text-2xl">{stats.charsNoSpace}</p>
                </div>
                <div className="p-2">
                    <p className="text-gray-500 text-sm">Sentences</p>
                    <p className="text-2xl">{stats.sentences}</p>
                </div>
                <div className="p-2">
                    <p className="text-gray-500 text-sm">Paragraphs</p>
                    <p className="text-2xl">{stats.paragraphs}</p>
                </div>
                <div className="p-2">
                    <p className="text-gray-500 text-sm">Read Time</p>
                    <p className="text-2xl">~{stats.readingTime} min</p>
                </div>
            </div>
        </div>

      </div>

      {/* Tips Section */}
      <div className="nes-container is-dark w-full">
        <p>Tip: Writing clear and concise text improves readability. Aim for shorter sentences!</p>
      </div>
    </div>
  );
}
