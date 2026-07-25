"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function RemoveDuplicateLinesPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });

  const handleRemoveDuplicates = () => {
    if (!inputText) {
        setOutputText("");
        setStats({ original: 0, unique: 0, removed: 0 });
        return;
    }
    const lines = inputText.split("\n");
    const uniqueLines = [...new Set(lines)];
    setOutputText(uniqueLines.join("\n"));
    setStats({
      original: lines.length,
      unique: uniqueLines.length,
      removed: lines.length - uniqueLines.length,
    });
    setCopied(false);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setStats({ original: 0, unique: 0, removed: 0 });
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
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>
      <div className="nes-container with-title w-full">
        <h2 className="title">Remove Duplicate Lines</h2>

        <div className="mb-6">
            <p className="mb-8">Instantly filter out duplicate lines from your text, lists, or code snippets.</p>
            <p className="title">Input</p>
            <textarea
                className="nes-textarea w-full min-h-[300px]"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your lines of text here..."
            />
        </div>
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            className="nes-btn is-primary"
            onClick={handleRemoveDuplicates}
          >
            Remove Duplicates
          </button>
          <button type="button" className="nes-btn is-warning" onClick={handleClear}>
            Clear
          </button>
        </div>

        <div className="nes-container with-title is-centered mb-8">
            <h3 className="title">Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                <div className="p-2">
                    <p className="text-gray-500 text-sm">Original Lines</p>
                    <p className="text-2xl">{stats.original}</p>
                </div>
                <div className="p-2">
                    <p className="text-gray-500 text-sm">Unique Lines</p>
                    <p className="text-2xl">{stats.unique}</p>
                </div>
                <div className="p-2">
                    <p className="text-gray-500 text-sm">Removed</p>
                    <p className="text-2xl">{stats.removed}</p>
                </div>
            </div>
        </div>

        <div className="nes-container with-title w-full">
            <p className="title">Output</p>
            <div className="nes-field mb-4">
            <textarea className="nes-textarea w-full min-h-[300px]" value={outputText} readOnly />
            </div>
            <button
            type="button"
            className={`nes-btn ${copied ? "is-success" : "is-primary"}`}
            onClick={copyToClipboard}
            disabled={!outputText}
            >
            {copied ? "Copied!" : "Copy Result"}
            </button>
        </div>
      </div>
    </div>
  );
}
