'use client';

import { useState } from 'react';
import Link from 'next/link';

const MAGIC_8_BALL_RESPONSES = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful."
];

export default function AskMagic8BallPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const handleAsk = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!question.trim()) {
      return;
    }

    setIsShaking(true);
    setAnswer(null);

    // Simulate shaking delay
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

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Magic 8-Ball</h2>

        <div className="flex flex-col items-center gap-6 py-4">
          <p className="text-sm md:text-base text-center">
            Ask the Magic 8-Ball any yes or no question and reveal your fortune.
          </p>

          <form onSubmit={handleAsk} className="w-full flex flex-col gap-4">
            <div className="nes-field w-full">
              <label htmlFor="question_input">Your Question:</label>
              <input
                type="text"
                id="question_input"
                className="nes-input"
                placeholder="e.g. Will I win the lottery?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={200}
                disabled={isShaking}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
               <button
                 type="submit"
                 className={`nes-btn is-primary ${!question.trim() || isShaking ? 'cursor-not-allowed opacity-90' : ''}`}
                 disabled={!question.trim() || isShaking}
               >
                 {isShaking ? 'Asking...' : 'Ask the 8-Ball'}
               </button>
               <button
                 type="button"
                 className="nes-btn is-error"
                 onClick={handleClear}
                 disabled={isShaking}
               >
                 Clear
               </button>
            </div>
          </form>

          {/* 8-Ball visual */}
          <div className={`mt-6 w-48 h-48 md:w-64 md:h-64 rounded-full bg-black flex items-center justify-center border-4 border-gray-800 shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.2)] ${isShaking ? 'animate-wiggle' : ''}`}>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center border-4 border-gray-300">
               {answer ? (
                 <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center bg-blue-600 rounded-full clip-path-triangle p-2 text-center text-[10px] md:text-xs text-white break-words animate-fade-in-up">
                    <span className="drop-shadow-md z-10 px-2 leading-tight">{answer}</span>
                 </div>
               ) : (
                 <span className="text-4xl md:text-6xl font-bold text-black drop-shadow-sm">8</span>
               )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
