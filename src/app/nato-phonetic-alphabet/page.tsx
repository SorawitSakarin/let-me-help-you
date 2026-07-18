"use client";

import React, { useState } from "react";
import Link from "next/link";

const natoAlphabet: Record<string, string> = {
  a: "Alfa", b: "Bravo", c: "Charlie", d: "Delta", e: "Echo", f: "Foxtrot",
  g: "Golf", h: "Hotel", i: "India", j: "Juliett", k: "Kilo", l: "Lima",
  m: "Mike", n: "November", o: "Oscar", p: "Papa", q: "Quebec", r: "Romeo",
  s: "Sierra", t: "Tango", u: "Uniform", v: "Victor", w: "Whiskey", x: "X-ray",
  y: "Yankee", z: "Zulu",
  "0": "Zero", "1": "One", "2": "Two", "3": "Three", "4": "Four",
  "5": "Five", "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine"
};

const reverseNatoAlphabet: Record<string, string> = Object.fromEntries(
  Object.entries(natoAlphabet).map(([k, v]) => [v.toLowerCase(), k])
);

export default function NatoPhoneticAlphabetPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleTranslateToNato = () => {
    let result = "";
    for (let char of inputText.toLowerCase()) {
      if (natoAlphabet[char]) {
        result += natoAlphabet[char] + " ";
      } else {
        result += char;
      }
    }
    setOutputText(result.trim().replace(/ +/g, " "));
    setCopied(false);
  };

  const handleTranslateFromNato = () => {
    const tokens = inputText.trim().split(/\s+/);
    let result = "";
    for (const token of tokens) {
       const stripped = token.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
       const prefix = token.match(/^[^a-zA-Z0-9]+/)?.[0] || "";
       const suffix = token.match(/[^a-zA-Z0-9]+$/)?.[0] || "";

       if (reverseNatoAlphabet[stripped]) {
           result += prefix + reverseNatoAlphabet[stripped] + suffix;
       } else {
           result += token + " ";
       }
    }
    setOutputText(result.trim());
    setCopied(false);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText).catch(console.error);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-4">
        <Link href="/" className="nes-btn text-xs">
          &lt; Back to Home
        </Link>
      </div>
      <h2 className="title mb-6">NATO Phonetic Alphabet</h2>
      <p className="mb-8">Translate text into the NATO phonetic alphabet and vice versa.</p>

      <div className="nes-container with-title is-centered mb-8">
        <p className="title">Input</p>
        <div className="nes-field">
          <textarea
            className="nes-textarea"
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type text or NATO alphabet words here..."
          />
        </div>
        <div className="flex gap-4 justify-center mt-4 flex-wrap">
          <button
            type="button"
            className="nes-btn is-primary text-xs sm:text-sm"
            onClick={handleTranslateToNato}
          >
            Text to NATO
          </button>
          <button
            type="button"
            className="nes-btn is-success text-xs sm:text-sm"
            onClick={handleTranslateFromNato}
          >
            NATO to Text
          </button>
          <button type="button" className="nes-btn is-warning text-xs sm:text-sm" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <div className="nes-container with-title is-centered">
        <p className="title">Output</p>
        <div className="nes-field mb-4">
          <textarea className="nes-textarea" rows={6} value={outputText} readOnly />
        </div>
        <button
          type="button"
          className={`nes-btn ${copied ? "is-success" : "is-primary"} text-xs sm:text-sm`}
          onClick={copyToClipboard}
          disabled={!outputText}
        >
          {copied ? "Copied!" : "Copy Result"}
        </button>
      </div>
    </div>
  );
}