"use client";

import React, { useState } from 'react';

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section className="nes-container with-title relative">
      <h3 className="title text-lg md:text-xl">About & Usage</h3>

      {!isExpanded ? (
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <p className="text-center text-sm max-w-2xl">
            A collection of pixel-perfect tools to streamline your daily tasks.
            Simple, efficient, and free.
          </p>
          <button
            type="button"
            className="nes-btn is-primary text-sm px-4 py-2"
            onClick={toggleExpand}
          >
            Show Usage Guide
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              <div className="p-2">
                  <h4 className="mb-2 text-base underline">QR Generator</h4>
                  <ul className="nes-list is-disc ml-4 text-xs">
                      <li>Enter text or URL.</li>
                      <li>Customize with an icon.</li>
                      <li>Download instantly.</li>
                  </ul>
              </div>
              <div className="p-2">
                  <h4 className="mb-2 text-base underline">Slot Machine</h4>
                  <ul className="nes-list is-disc ml-4 text-xs">
                      <li>List your options.</li>
                      <li>Spin to decide.</li>
                      <li>Great for raffles.</li>
                  </ul>
              </div>
              <div className="p-2">
                  <h4 className="mb-2 text-base underline">Text to Speech</h4>
                  <ul className="nes-list is-disc ml-4 text-xs">
                      <li>Type English text.</li>
                      <li>Adjust pitch & speed.</li>
                      <li>Listen on demand.</li>
                  </ul>
              </div>
              <div className="p-2">
                  <h4 className="mb-2 text-base underline">Password Gen</h4>
                  <ul className="nes-list is-disc ml-4 text-xs">
                      <li>Select length (8-32).</li>
                      <li>Toggle complexity.</li>
                      <li>Secure & random.</li>
                  </ul>
              </div>
              <div className="p-2">
                  <h4 className="mb-2 text-base underline">Unit Converter</h4>
                  <ul className="nes-list is-disc ml-4 text-xs">
                      <li>Weight, Length, Temp.</li>
                      <li>Bi-directional.</li>
                      <li>Real-time results.</li>
                  </ul>
              </div>
              <div className="p-2">
                  <h4 className="mb-2 text-base underline">Currency Exchange</h4>
                  <ul className="nes-list is-disc ml-4 text-xs">
                      <li>150+ currencies.</li>
                      <li>Live exchange rates.</li>
                      <li>Easy search.</li>
                  </ul>
              </div>
              <div className="p-2">
                  <h4 className="mb-2 text-base underline">Focus Timer</h4>
                  <ul className="nes-list is-disc ml-4 text-xs">
                      <li>Pomodoro technique.</li>
                      <li>Custom intervals.</li>
                      <li>Boost productivity.</li>
                  </ul>
              </div>
              <div className="p-2">
                  <h4 className="mb-2 text-base underline">Word Counter</h4>
                  <ul className="nes-list is-disc ml-4 text-xs">
                      <li>Count words & chars.</li>
                      <li>Reading time calc.</li>
                      <li>Analyze text.</li>
                  </ul>
              </div>
              <div className="p-2">
                  <h4 className="mb-2 text-base underline">Binary Translator</h4>
                  <ul className="nes-list is-disc ml-4 text-xs">
                      <li>Text to Binary.</li>
                      <li>Binary to Text.</li>
                      <li>Instant conversion.</li>
                  </ul>
              </div>
              <div className="p-2">
                  <h4 className="mb-2 text-base underline">Lorem Ipsum</h4>
                  <ul className="nes-list is-disc ml-4 text-xs">
                      <li>Generate placeholders.</li>
                      <li>Words or sentences.</li>
                      <li>Copy with one click.</li>
                  </ul>
              </div>
              <div className="p-2">
                  <h4 className="mb-2 text-base underline">Base64 Encoder</h4>
                  <ul className="nes-list is-disc ml-4 text-xs">
                      <li>Encode & Decode.</li>
                      <li>UTF-8 support.</li>
                      <li>Secure processing.</li>
                  </ul>
              </div>
          </div>

          <div className="mt-8 text-center border-t-2 border-dashed border-gray-400 pt-4 flex flex-col items-center gap-4">
              <p className="text-xs">Built with Next.js 16, Tailwind CSS, and Nes.css.</p>
              <button
                type="button"
                className="nes-btn is-error text-sm px-4 py-2"
                onClick={toggleExpand}
              >
                Hide Guide
              </button>
          </div>
        </>
      )}
    </section>
  );
}
