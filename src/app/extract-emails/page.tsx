"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ExtractEmails() {
  const [textInput, setTextInput] = useState("");
  const [emailsOutput, setEmailsOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleExtract = () => {
    setError("");
    setEmailsOutput("");
    setCopied(false);

    if (!textInput.trim()) {
      setError("Please enter some text to extract emails from.");
      return;
    }

    const emailRegex = /([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const foundEmails = textInput.match(emailRegex);

    if (foundEmails) {
      const uniqueEmails = Array.from(new Set(foundEmails));
      setEmailsOutput(uniqueEmails.join("\n"));
    } else {
      setError("No email addresses found in the text.");
    }
  };

  const handleCopy = () => {
    if (!emailsOutput) return;
    navigator.clipboard.writeText(emailsOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setTextInput("");
    setEmailsOutput("");
    setError("");
    setCopied(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Email Extractor
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Input Text</h3>
        <textarea
          className="nes-textarea w-full"
          rows={8}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Paste text containing emails here..."
        ></textarea>
      </div>

      {error && <p className="nes-text is-error text-center">{error}</p>}

      <div className="flex gap-4 justify-center mt-4">
        <button type="button" className="nes-btn is-primary" onClick={handleExtract}>Extract</button>
        <button type="button" className="nes-btn" onClick={handleClear}>Clear</button>
      </div>

      {emailsOutput && (
        <div className="nes-container with-title is-rounded bg-white mt-8">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Extracted Emails ({emailsOutput.split("\n").length})</h3>
          <textarea
            className="nes-textarea w-full bg-white"
            rows={12}
            value={emailsOutput}
            readOnly
          ></textarea>
          <div className="flex gap-4 justify-center mt-4">
            <button type="button" className={`nes-btn ${copied ? "is-success" : ""}`} onClick={handleCopy}>
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
