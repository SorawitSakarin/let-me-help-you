'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import cronstrue from 'cronstrue';

export default function CronParser() {
  const [cronExpression, setCronExpression] = useState('');
  const [humanReadable, setHumanReadable] = useState('');
  const [error, setError] = useState('');

  const handleParse = () => {
    setError('');
    setHumanReadable('');
    if (!cronExpression.trim()) {
      setError('Please enter a cron expression.');
      return;
    }
    try {
      const result = cronstrue.toString(cronExpression);
      setHumanReadable(result);
    } catch (err: any) {
      setError(err.toString());
    }
  };

  const handleCopy = () => {
    if (humanReadable) {
      navigator.clipboard.writeText(humanReadable).catch(() => {});
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Cron Parser</h2>
        <p className="mb-8">Translate Cron expressions into human-readable text.</p>

        <div className="flex flex-col gap-4">
          <div className="field">
            <label htmlFor="cron_input">Cron Expression</label>
            <input
              type="text"
              id="cron_input"
              className={`nes-input ${error ? 'is-error' : ''}`}
              placeholder="e.g. * * * * *"
              value={cronExpression}
              onChange={(e) => setCronExpression(e.target.value)}
            />
          </div>

          {error && <p className="nes-text is-error">{error}</p>}

          <div className="flex justify-center my-4">
            <button type="button" className="nes-btn is-primary" onClick={handleParse}>
              Parse
            </button>
          </div>

          <div className="field">
            <label htmlFor="human_output">Human Readable</label>
            <textarea
              id="human_output"
              className="nes-textarea"
              rows={3}
              value={humanReadable}
              readOnly
              placeholder="Result will appear here..."
            ></textarea>
          </div>

          <div className="flex justify-center mt-2">
            <button
              type="button"
              className={`nes-btn ${!humanReadable ? 'is-disabled' : ''}`}
              onClick={handleCopy}
              disabled={!humanReadable}
            >
              Copy Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
