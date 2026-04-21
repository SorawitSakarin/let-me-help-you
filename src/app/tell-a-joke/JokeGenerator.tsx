'use client';
import { useState, useEffect } from 'react';

export default function JokeGenerator() {
  const [joke, setJoke] = useState<{setup: string, punchline: string} | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPunchline, setShowPunchline] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setShowPunchline(false);
    try {
      const res = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await res.json();
      setJoke({ setup: data.setup, punchline: data.punchline });
    } catch (err: unknown) {
      // handle error silently
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      {loading ? (
        <p>Loading joke...</p>
      ) : joke ? (
        <div className="nes-balloon from-left w-full text-left" style={{ color: 'black' }}>
          <p>{joke.setup}</p>
          {showPunchline && <p className="mt-4 font-bold">{joke.punchline}</p>}
        </div>
      ) : (
        <p>Could not load joke.</p>
      )}

      <div className="flex gap-4 mt-4">
        {joke && !showPunchline && (
          <button type="button" className="nes-btn is-primary" onClick={() => setShowPunchline(true)}>
            Tell me!
          </button>
        )}
        <button type="button" className="nes-btn is-success" onClick={fetchJoke}>
          New Joke
        </button>
      </div>
    </div>
  );
}
