'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JokePage() {
  const [joke, setJoke] = useState<{setup: string, punchline: string} | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await res.json();
      setJoke(data);
    } catch (error) {
      console.error("Failed to fetch joke", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/" className="nes-btn is-error text-xs md:text-sm">
          &lt; Back
        </Link>
        <h1 className="text-lg md:text-xl md:mb-0">Random Joke</h1>
      </div>
      <div className="nes-container with-title is-centered">
        <p className="title">Get a Joke</p>
        <div className="min-h-[150px] flex flex-col items-center justify-center p-4">
          {loading ? (
            <p>Loading...</p>
          ) : joke ? (
            <>
              <p className="text-sm md:text-base mb-4">{joke.setup}</p>
              <p className="text-sm md:text-base font-bold text-blue-600">{joke.punchline}</p>
            </>
          ) : (
            <p>Failed to load joke.</p>
          )}
        </div>
        <button onClick={fetchJoke} className="nes-btn is-primary mt-6">
          Get Another Joke
        </button>
      </div>
    </div>
  );
}
