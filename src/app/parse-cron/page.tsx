'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import cronstrue from 'cronstrue';

export default function ParseCronPage() {
  const [cronExpression, setCronExpression] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleParse = () => {
    try {
      if (!cronExpression.trim()) {
        setDescription('');
        setError('');
        return;
      }
      const desc = cronstrue.toString(cronExpression);
      setDescription(desc);
      setError('');
    } catch (err: any) {
      setDescription('');
      setError(err.toString());
    }
  };

  const handleClear = () => {
    setCronExpression('');
    setDescription('');
    setError('');
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>
      <div className="nes-container with-title w-full">
        <h2 className="title flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Cron Parser
        </h2>

        <div className="mb-6">
          <p className="mb-4">Convert cron expressions into human readable descriptions.</p>
          <p className="title text-sm bg-white">Cron Expression</p>
          <input
            type="text"
            className={`nes-input w-full ${error ? 'is-error' : ''}`}
            value={cronExpression}
            onChange={(e) => setCronExpression(e.target.value)}
            placeholder="* * * * *"
          />
          {error && (
            <span className="nes-text is-error text-xs block mt-2 break-all">{error}</span>
          )}
        </div>

        <div className="flex gap-4 mb-8">
          <button
            type="button"
            className="nes-btn is-primary"
            onClick={handleParse}
          >
            Parse
          </button>
          <button type="button" className="nes-btn" onClick={handleClear}>
            Clear
          </button>
        </div>

        {description && (
          <div className="nes-container with-title w-full is-rounded">
            <p className="title text-sm bg-white">Description</p>
            <p className="nes-text is-success">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
