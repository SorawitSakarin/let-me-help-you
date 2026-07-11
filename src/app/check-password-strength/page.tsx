'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CheckPasswordStrength() {
  const [password, setPassword] = useState('');
  const [strengthScore, setStrengthScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [strengthLabel, setStrengthLabel] = useState('');
  const [progressClass, setProgressClass] = useState('');

  useEffect(() => {
    let score = 0;
    const newFeedback = [];

    if (!password) {
      setStrengthScore(0);
      setStrengthLabel('');
      setFeedback([]);
      return;
    }

    if (password.length > 8) {
      score += 25;
    } else {
      newFeedback.push('Make it longer than 8 characters.');
    }

    if (/[A-Z]/.test(password)) {
      score += 25;
    } else {
      newFeedback.push('Add an uppercase letter.');
    }

    if (/[a-z]/.test(password)) {
      score += 25;
    } else {
      newFeedback.push('Add a lowercase letter.');
    }

    if (/[0-9]/.test(password)) {
      score += 15;
    } else {
      newFeedback.push('Add a number.');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 10;
    } else {
      newFeedback.push('Add a special character.');
    }

    setStrengthScore(score);
    setFeedback(newFeedback);

    if (score < 50) {
      setStrengthLabel('Weak');
      setProgressClass('');
    } else if (score < 75) {
      setStrengthLabel('Fair');
      setProgressClass('is-primary');
    } else if (score < 100) {
      setStrengthLabel('Good');
      setProgressClass('is-primary');
    } else {
      setStrengthLabel('Strong');
      setProgressClass('is-success');
    }
  }, [password]);

  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">Password Strength</h3>

        <div className="flex flex-col gap-6 p-4 text-left">
          <div className="nes-field">
            <label htmlFor="password_input">Input Password</label>
            <input
              type="text"
              id="password_input"
              className="nes-input w-full"
              placeholder="Type a password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <p className="mb-2">Score: {strengthScore}% {strengthLabel && `- ${strengthLabel}`}</p>
            <progress className={`nes-progress ${progressClass} w-full`} value={strengthScore} max="100"></progress>
          </div>

          {feedback.length > 0 && (
            <div className="lists">
              <ul className="nes-list is-disc ml-4 text-sm flex flex-col gap-2">
                {feedback.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {strengthScore === 100 && (
            <p className="text-sm mt-2 font-bold" style={{ color: '#92cc41' }}>Awesome! That's a strong password.</p>
          )}
        </div>
      </div>
    </div>
  );
}