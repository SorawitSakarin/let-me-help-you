'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Trash2, Type } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-purple-600 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
             <Type className="w-6 h-6" />
             <h1 className="text-2xl font-bold">Word Counter</h1>
          </div>
          <p className="text-purple-100 mt-2">Count words, characters, and reading time instantly.</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Text Input Area */}
          <div className="relative">
            <textarea
                className="w-full h-80 p-6 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none font-sans text-gray-800 leading-relaxed text-lg"
                placeholder="Type or paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={handleClear}
                    title="Clear Text"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors"
                    onClick={handleCopy}
                    title="Copy Text"
                >
                    <Copy className="w-5 h-5" />
                </button>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <StatCard label="Words" value={stats.words} />
            <StatCard label="Characters" value={stats.chars} />
            <StatCard label="Chars (no space)" value={stats.charsNoSpace} />
            <StatCard label="Sentences" value={stats.sentences} />
            <StatCard label="Paragraphs" value={stats.paragraphs} />
            <StatCard label="Reading Time" value={`~${stats.readingTime} min`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: string | number }) {
    return (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center hover:bg-purple-50 hover:border-purple-100 transition-colors">
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">{label}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
    );
}
