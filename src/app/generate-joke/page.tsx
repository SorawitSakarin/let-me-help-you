'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Joke {
  setup: string;
  punchline: string;
}

export default function GenerateJokePage() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    setIsLoading(true);
    setError(null);
    setJoke(null);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }
      const data = await response.json();
      setJoke({ setup: data.setup, punchline: data.punchline });
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full pb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl md:text-2xl mb-2">Joke Generator</h1>
          <p className="text-sm text-gray-600">
            Generate a random programming or general joke to lighten your mood.
          </p>
        </div>
        <Link href="/" className="nes-btn is-error px-3 py-1 text-sm shrink-0">
          Back
        </Link>
      </div>

      <div className="nes-container with-title is-centered p-4 md:p-8">
        <h2 className="title" style={{ background: 'var(--surface)' }}>Have a Laugh</h2>

        <div className="flex flex-col gap-8 items-center mt-4">
          <div className="min-h-[150px] flex flex-col justify-center items-center text-center w-full">
            {isLoading && <p>Loading a funny joke...</p>}
            {error && <p className="nes-text is-error">{error}</p>}
            {joke && !isLoading && (
              <div className="flex flex-col gap-4">
                <p className="text-lg font-bold nes-text is-primary">{joke.setup}</p>
                <p className="text-xl mt-4 animate-bounce nes-text is-success">{joke.punchline}</p>
              </div>
            )}
            {!joke && !isLoading && !error && (
              <p>Click the button below to generate a random joke.</p>
            )}
          </div>

          <button
            type="button"
            className={`nes-btn w-full md:w-auto ${isLoading ? 'is-disabled' : 'is-primary'}`}
            onClick={fetchJoke}
            disabled={isLoading}
          >
            {isLoading ? 'Fetching...' : 'Tell me a Joke!'}
          </button>
        </div>
      </div>
    </div>
  );
}