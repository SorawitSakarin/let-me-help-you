"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function JWTDecoderPage() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [error, setError] = useState("");

  const decodeJWT = () => {
    setError("");
    setHeader(null);
    setPayload(null);

    if (!jwt.trim()) {
      return;
    }

    const parts = jwt.split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT format. Must contain 3 parts separated by dots.");
      return;
    }

    try {
      const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      setHeader(decodedHeader);
      setPayload(decodedPayload);
    } catch (err) {
      setError("Failed to decode JWT. Invalid Base64 string.");
    }
  };

  const handleClear = () => {
    setJwt("");
    setHeader(null);
    setPayload(null);
    setError("");
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          JWT Decoder
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Input JWT</h3>
        <textarea
          className="nes-textarea w-full"
          rows={5}
          placeholder="Paste JWT here (e.g. eyJhbGci...)"
          value={jwt}
          onChange={(e) => {
            setJwt(e.target.value);
            if (e.target.value === "") {
              handleClear();
            }
          }}
          onBlur={decodeJWT}
          aria-label="Input JWT"
        />
        <div className="flex gap-4 justify-end mt-4">
          <button type="button" className="nes-btn is-error" onClick={handleClear}>Clear</button>
          <button type="button" className="nes-btn is-primary" onClick={decodeJWT}>Decode</button>
        </div>
      </div>

      {error && (
        <div className="nes-container is-rounded bg-red-100">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {(header || payload) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Header</h3>
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-all">
              {JSON.stringify(header, null, 2)}
            </pre>
          </div>
          <div className="nes-container with-title is-rounded bg-white">
            <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Payload</h3>
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-all">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
