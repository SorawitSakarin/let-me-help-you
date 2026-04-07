'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const JOKES = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
  "Why don't skeletons fight each other? They don't have the guts.",
  "What do you call a fake noodle? An impasta!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "What do you call a cheese that isn't yours? Nacho cheese.",
  "Why couldn't the bicycle stand up by itself? It was two tired.",
  "What do you get when you cross a snowman and a vampire? Frostbite.",
  "Why did the math book look sad? Because it had too many problems.",
  "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
  "What do you call a bear with no teeth? A gummy bear.",
  "How does a penguin build its house? Igloos it together.",
  "Why did the cookie go to the hospital? Because it felt crummy.",
  "What do you call a factory that makes okay products? A satisfactory.",
  "I'm reading a book on anti-gravity. I just can't put it down!",
  "I used to play piano by ear, but now I use my hands.",
  "Parallel lines have so much in common. It's a shame they'll never meet.",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "I threw a boomerang a few years ago. I now live in constant fear.",
  "Why did the invisible man turn down the job offer? He couldn't see himself doing it.",
  "I invented a new word! Plagiarism!",
  "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
  "Did you hear about the claustrophobic astronaut? He just needed a little space.",
  "Why are ghosts such bad liars? Because they are easy to see through.",
];

export default function TellAJokePage() {
  const [joke, setJoke] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Generate an initial joke on client mount to avoid hydration mismatch
  useEffect(() => {
    generateJoke();
  }, []);

  const generateJoke = () => {
    setIsGenerating(true);

    // Slight delay for effect, maintaining 8-bit vibe
    setTimeout(() => {
      // Use pseudo-random number generator
      const randomIndex = Math.floor(Math.random() * JOKES.length);
      setJoke(JOKES[randomIndex]);
      setIsGenerating(false);
    }, 500);
  };

  const copyJoke = async () => {
    if (!joke) return;
    try {
      await navigator.clipboard.writeText(joke);
      // We could add a toast or similar feedback here, but a simple console.log or silent success works for now
    } catch (err) {
      // catch error but ignore, following TS rules
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full max-w-2xl">
        <h2 className="title">Tell a Joke</h2>

        <div className="flex flex-col items-center gap-6 py-4">
          <p className="text-sm">Click the button below to get a random joke!</p>

          <div className="nes-container is-rounded w-full bg-gray-50 min-h-[150px] flex items-center justify-center p-6 relative">
             <i className="nes-icon is-large like absolute top-[-24px] right-[-24px] transform rotate-12 bg-white rounded-full"></i>
             {isGenerating ? (
               <div className="flex flex-col items-center">
                 <i className="nes-icon star is-large animate-spin"></i>
                 <span className="mt-4 text-sm blink">Thinking...</span>
               </div>
             ) : (
               <p className="text-lg md:text-xl text-center leading-relaxed">
                 {joke || 'Ready for a laugh?'}
               </p>
             )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
             <button
                type="button"
                className={`nes-btn w-full sm:w-auto ${isGenerating ? 'cursor-not-allowed opacity-50 is-disabled' : 'is-primary'}`}
                onClick={generateJoke}
             >
               {isGenerating ? 'Wait...' : 'Another Joke!'}
             </button>

             <button
                type="button"
                className={`nes-btn w-full sm:w-auto ${!joke || isGenerating ? 'cursor-not-allowed opacity-50 is-disabled' : 'is-success'}`}
                onClick={copyJoke}
             >
               Copy Joke
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
