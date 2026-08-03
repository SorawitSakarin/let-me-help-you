"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ExtractIPs() {
  const [textInput, setTextInput] = useState("");
  const [ipsOutput, setIpsOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleExtract = () => {
    setError("");
    setIpsOutput("");
    setCopied(false);

    if (!textInput.trim()) {
      setError("Please enter some text to extract IP addresses from.");
      return;
    }

    // Regex for IPv4 and IPv6
    const ipv4Regex = /(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;
    // A simplified IPv6 regex to capture typical forms
    const ipv6Regex = /(?:(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,7}:|(?:[a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,5}(?::[a-fA-F0-9]{1,4}){1,2}|(?:[a-fA-F0-9]{1,4}:){1,4}(?::[a-fA-F0-9]{1,4}){1,3}|(?:[a-fA-F0-9]{1,4}:){1,3}(?::[a-fA-F0-9]{1,4}){1,4}|(?:[a-fA-F0-9]{1,4}:){1,2}(?::[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:(?::[a-fA-F0-9]{1,4}){1,6}|:(?::[a-fA-F0-9]{1,4}){1,7}|::)/g;

    const foundIpv4 = textInput.match(ipv4Regex) || [];
    const foundIpv6 = textInput.match(ipv6Regex) || [];

    // Filter out empty strings or match artifacts
    const allFound = [...foundIpv4, ...foundIpv6].filter(ip => ip.trim() !== "" && ip !== "::");

    if (allFound.length > 0) {
      const uniqueIps = Array.from(new Set(allFound));
      setIpsOutput(uniqueIps.join("\n"));
    } else {
      setError("No IP addresses found in the text.");
    }
  };

  const handleCopy = () => {
    if (!ipsOutput) return;
    navigator.clipboard.writeText(ipsOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const handleClear = () => {
    setTextInput("");
    setIpsOutput("");
    setError("");
    setCopied(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          IP Extractor
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
          placeholder="Paste text containing IP addresses here..."
        ></textarea>
      </div>

      {error && <p className="nes-text is-error text-center">{error}</p>}

      <div className="flex gap-4 justify-center mt-4">
        <button type="button" className="nes-btn is-primary" onClick={handleExtract}>Extract</button>
        <button type="button" className="nes-btn" onClick={handleClear}>Clear</button>
      </div>

      {ipsOutput && (
        <div className="nes-container with-title is-rounded bg-white mt-8">
          <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Extracted IPs ({ipsOutput.split("\n").length})</h3>
          <textarea
            className="nes-textarea w-full bg-white"
            rows={12}
            value={ipsOutput}
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
