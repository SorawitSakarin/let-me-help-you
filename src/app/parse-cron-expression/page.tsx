'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import cronstrue from 'cronstrue';
import { CronExpressionParser } from 'cron-parser';

export default function CronExpressionParserPage() {
  const [expression, setExpression] = useState('');

  const explanation = useMemo(() => {
    if (!expression.trim()) return null;
    try {
      return cronstrue.toString(expression.trim());
    } catch (e) {
      return 'Invalid Cron Expression';
    }
  }, [expression]);

  const nextDates = useMemo(() => {
    if (!expression.trim()) return [];
    try {
      const interval = CronExpressionParser.parse(expression.trim());
      const dates = [];
      for (let i = 0; i < 5; i++) {
        dates.push(interval.next().toString());
      }
      return dates;
    } catch (e) {
      return [];
    }
  }, [expression]);

  const clear = () => setExpression('');

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title w-full">
        <h2 className="title">Cron Parser</h2>

        <div className="mb-6">
          <label htmlFor="cron_input">Cron Expression:</label>
          <input
            type="text"
            id="cron_input"
            className="nes-input w-full font-mono text-center text-xl mt-2 mb-2"
            placeholder="* * * * *"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
            <span>min</span>
            <span>hour</span>
            <span>day (month)</span>
            <span>month</span>
            <span>day (week)</span>
          </div>
        </div>

        <div className="mb-6">
          <label>Explanation:</label>
          <div className={`nes-container is-rounded mt-2 ${explanation === 'Invalid Cron Expression' ? 'is-error text-red-500' : 'is-success'}`}>
            <p className="text-center min-h-[1.5rem] font-bold">
               {explanation || 'Enter a cron expression above.'}
            </p>
          </div>
        </div>

        {nextDates.length > 0 && (
          <div className="mb-6">
            <label>Next 5 Executions:</label>
            <div className="nes-table-responsive mt-2">
              <table className="nes-table is-bordered is-centered w-full text-sm">
                <tbody>
                  {nextDates.map((date, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button className="nes-btn is-error" onClick={clear}>Clear</button>
        </div>
      </div>
    </div>
  );
}
