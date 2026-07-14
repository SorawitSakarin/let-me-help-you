"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const MALE_NAMES = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"];
const FEMALE_NAMES = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

export default function RandomNameGenerator() {
  const [generatedName, setGeneratedName] = useState("");
  const [gender, setGender] = useState<"any" | "male" | "female">("any");

  const generateName = () => {
    let firstNames = [];
    if (gender === "male") firstNames = MALE_NAMES;
    else if (gender === "female") firstNames = FEMALE_NAMES;
    else firstNames = [...MALE_NAMES, ...FEMALE_NAMES];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    setGeneratedName(`${firstName} ${lastName}`);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>
      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Random Name Generator</h2>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                className="nes-radio"
                name="gender"
                checked={gender === "any"}
                onChange={() => setGender("any")}
              />
              <span>Any</span>
            </label>
            <label>
              <input
                type="radio"
                className="nes-radio"
                name="gender"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              <span>Male</span>
            </label>
            <label>
              <input
                type="radio"
                className="nes-radio"
                name="gender"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
              <span>Female</span>
            </label>
          </div>
          <button className="nes-btn is-primary w-full" onClick={generateName}>
            Generate Name
          </button>
          {generatedName && (
            <div className="mt-4 p-4 nes-container w-full text-center text-lg">
              {generatedName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}