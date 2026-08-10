'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Animal {
  name: string;
  emoji: string;
  fact: string;
}

const ANIMALS: Animal[] = [
  { name: 'Dog', emoji: '🐶', fact: 'Dogs have an incredible sense of smell and can detect some diseases.' },
  { name: 'Cat', emoji: '🐱', fact: 'Cats spend 70% of their lives sleeping.' },
  { name: 'Elephant', emoji: '🐘', fact: 'Elephants are the only animals that cannot jump.' },
  { name: 'Penguin', emoji: '🐧', fact: 'Penguins can drink sea water because they have a special gland.' },
  { name: 'Lion', emoji: '🦁', fact: 'A lion\'s roar can be heard from up to 5 miles away.' },
  { name: 'Tiger', emoji: '🐯', fact: 'No two tigers have the same stripes.' },
  { name: 'Bear', emoji: '🐻', fact: 'Bears have an excellent sense of smell, better than dogs.' },
  { name: 'Koala', emoji: '🐨', fact: 'Koalas sleep up to 22 hours a day.' },
  { name: 'Kangaroo', emoji: '🦘', fact: 'Kangaroos cannot walk backwards.' },
  { name: 'Dolphin', emoji: '🐬', fact: 'Dolphins sleep with one eye open.' },
  { name: 'Whale', emoji: '🐋', fact: 'The blue whale is the largest animal ever known to have lived on Earth.' },
  { name: 'Octopus', emoji: '🐙', fact: 'Octopuses have three hearts.' },
  { name: 'Turtle', emoji: '🐢', fact: 'Some turtles can live for over 100 years.' },
  { name: 'Crocodile', emoji: '🐊', fact: 'Crocodiles can hold their breath underwater for up to two hours.' },
  { name: 'Snake', emoji: '🐍', fact: 'Snakes do not have eyelids.' },
  { name: 'Frog', emoji: '🐸', fact: 'Frogs absorb water through their skin so they do not need to drink.' },
  { name: 'Monkey', emoji: '🐒', fact: 'Monkeys can understand basic mathematics.' },
  { name: 'Gorilla', emoji: '🦍', fact: 'Gorillas can catch human colds and other illnesses.' },
  { name: 'Sloth', emoji: '🦥', fact: 'Sloths only defecate once a week.' },
  { name: 'Flamingo', emoji: '🦩', fact: 'Flamingos are pink because of their diet of shrimp and algae.' },
];

export default function GenerateRandomAnimal() {
  const [animal, setAnimal] = useState<Animal | null>(null);

  const generateAnimal = () => {
    const randomIndex = Math.floor(Math.random() * ANIMALS.length);
    setAnimal(ANIMALS[randomIndex]);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Random Animal
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <p className="title text-sm bg-white mb-4">Discover an Animal</p>

        <div className="flex flex-col items-center gap-6">
          <button type="button" className="nes-btn is-primary" onClick={generateAnimal}>
            Get a Random Animal
          </button>

          {animal && (
            <div className="nes-container is-rounded w-full text-center">
              <div className="text-6xl mb-4">{animal.emoji}</div>
              <h3 className="text-2xl font-bold mb-4">{animal.name}</h3>
              <p className="text-sm">{animal.fact}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
