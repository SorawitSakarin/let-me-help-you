import { Metadata } from 'next';
import JokeGenerator from './JokeGenerator';

export const metadata: Metadata = {
  title: 'Random Joke Generator | Daily Task Tool',
  description: 'Generate random jokes for a quick laugh. A fun display of humour with a setup and punchline.',
};

export default function TellAJokePage() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div className="nes-container with-title is-centered">
        <h1 className="title text-xl mb-4 text-3xl">Random Joke</h1>
        <p className="mb-4">Need a laugh? Get a random joke instantly!</p>
        <JokeGenerator />
      </div>
    </div>
  );
}
