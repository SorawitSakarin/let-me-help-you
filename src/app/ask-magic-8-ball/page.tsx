'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const MAGIC_8_BALL_RESPONSES = [
  // Affirmative Answers
  'It is certain.',
  'It is decidedly so.',
  'Without a doubt.',
  'Yes – definitely.',
  'You may rely on it.',
  'As I see it, yes.',
  'Most likely.',
  'Outlook good.',
  'Yes.',
  'Signs point to yes.',
  // Non-committal Answers
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  'Cannot predict now.',
  'Concentrate and ask again.',
  // Negative Answers
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Outlook not so good.',
  'Very doubtful.',
];

export default function Magic8BallPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const handleAsk = () => {
    if (!question.trim()) return;

    setIsShaking(true);
    setAnswer(null);

    // Simulate thinking/shaking delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * MAGIC_8_BALL_RESPONSES.length);
      setAnswer(MAGIC_8_BALL_RESPONSES[randomIndex]);
      setIsShaking(false);
    }, 1000);
  };

  const handleClear = () => {
    setQuestion('');
    setAnswer(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAsk();
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full pb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl md:text-2xl mb-2">Magic 8-Ball</h1>
          <p className="text-sm text-gray-600">
            Ask a yes/no question to reveal your fate.
          </p>
        </div>
        <Link href="/" className="nes-btn is-error px-3 py-1 text-sm shrink-0">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered p-4 md:p-8">
        <h2 className="title" style={{ background: 'var(--surface)' }}>The Mystic Ball</h2>

        <div className="flex flex-col gap-8 items-center mt-4">

          {/* Magic 8-Ball Visual */}
          <div
            className={`
              relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-black flex items-center justify-center
              shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.2),10px_10px_20px_rgba(0,0,0,0.5)]
              ${isShaking ? 'animate-[wiggle_0.3s_ease-in-out_infinite]' : ''}
              transition-transform duration-300
            `}
          >
            {/* White inner circle */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center shadow-[inset_0px_5px_10px_rgba(0,0,0,0.3)]">
               {/* Answer Triangle Display */}
               {answer ? (
                 <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-900 rounded-full flex items-center justify-center p-2 relative overflow-hidden">
                    {/* Dark blue triangle approximation via CSS */}
                    <div
                       className="absolute text-[8px] md:text-[10px] text-blue-200 text-center leading-tight flex items-center justify-center break-words z-10 w-full h-full p-3 font-sans"
                       style={{ textShadow: '0 0 2px rgba(255,255,255,0.5)' }}
                    >
                      {answer.toUpperCase()}
                    </div>
                    {/* Triangle background shape */}
                    <div className="w-0 h-0 border-l-[30px] border-l-transparent border-t-[50px] border-t-blue-800 border-r-[30px] border-r-transparent md:border-l-[40px] md:border-t-[70px] md:border-r-[40px] opacity-80 rotate-180 absolute"></div>
                 </div>
               ) : (
                 <span className="text-black text-4xl md:text-6xl font-bold">8</span>
               )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 max-w-md">
            <div className="nes-field">
              <label htmlFor="questionInput" className="text-sm">Your Question</label>
              <input
                type="text"
                id="questionInput"
                className="nes-input text-sm"
                placeholder="Will I win the lottery?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isShaking}
                autoComplete="off"
              />
            </div>

            <div className="flex gap-4 justify-center mt-2">
              <button
                type="button"
                className={`nes-btn w-full md:w-auto ${
                   isShaking || !question.trim() ? 'is-disabled' : 'is-primary'
                }`}
                onClick={handleAsk}
                disabled={isShaking || !question.trim()}
              >
                Ask the 8-Ball
              </button>
              <button
                type="button"
                className="nes-btn is-warning w-full md:w-auto"
                onClick={handleClear}
                disabled={isShaking || (!question && !answer)}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}