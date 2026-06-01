"use client";

import React, { useState } from "react";

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [hash, setHash] = useState("");

  const generateHash = async () => {
    if (!input) {
      setHash("");
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    setHash(hashHex);
  };

  const copyToClipboard = () => {
    if (hash) {
      navigator.clipboard.writeText(hash);
    }
  };

  const clear = () => {
    setInput("");
    setHash("");
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="title mb-6">Hash Generator</h2>
      <p className="mb-8">Generate cryptographic hashes from text data.</p>

      <div className="nes-container with-title is-centered mb-8">
        <p className="title">Input</p>
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
          <div className="nes-field">
            <label htmlFor="algorithm_select">Algorithm</label>
            <div className="nes-select">
              <select
                required
                id="algorithm_select"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
              >
                <option value="SHA-1">SHA-1</option>
                <option value="SHA-256">SHA-256</option>
                <option value="SHA-384">SHA-384</option>
                <option value="SHA-512">SHA-512</option>
              </select>
            </div>
          </div>

          <div className="nes-field">
            <label htmlFor="input_field">Text Input</label>
            <textarea
              id="input_field"
              className="nes-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              placeholder="Enter text to hash..."
            ></textarea>
          </div>

          <div className="flex gap-4 justify-center mt-4">
            <button type="button" className="nes-btn is-primary" onClick={generateHash}>
              Generate
            </button>
            <button type="button" className="nes-btn" onClick={clear}>
              Clear
            </button>
          </div>
        </div>
      </div>

      {hash && (
        <div className="nes-container is-dark with-title is-centered">
          <p className="title">Result ({algorithm})</p>
          <p className="break-all mb-4 text-sm">{hash}</p>
          <button type="button" className="nes-btn is-success" onClick={copyToClipboard}>
            Copy Hash
          </button>
        </div>
      )}
    </div>
  );
}
