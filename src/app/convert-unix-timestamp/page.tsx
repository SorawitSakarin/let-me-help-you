'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [dateString, setDateString] = useState('');
  const [copyStatus, setCopyStatus] = useState<'timestamp' | 'date' | null>(null);

  // Initialize with current time
  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
    convertTimestampToDate(now.toString());
  }, []);

  const convertTimestampToDate = (ts: string) => {
    const tsNum = parseInt(ts, 10);
    if (!isNaN(tsNum)) {
      // Unix timestamp is in seconds, Date expects milliseconds
      const date = new Date(tsNum * 1000);
      setDateString(date.toLocaleString());
    } else {
      setDateString('Invalid Date');
    }
  };

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTimestamp(val);
    convertTimestampToDate(val);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // val is in format "YYYY-MM-DDTHH:mm" for datetime-local input
    if (val) {
      const date = new Date(val);
      const ts = Math.floor(date.getTime() / 1000);
      setTimestamp(ts.toString());
      setDateString(date.toLocaleString());
    }
  };

  const setNow = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
    convertTimestampToDate(now.toString());
  };

  const copyToClipboard = (text: string, type: 'timestamp' | 'date') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const clearAll = () => {
    setTimestamp('');
    setDateString('');
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">Unix Timestamp Converter</h3>
        <p className="mb-8">Convert Unix timestamps to human-readable dates and vice versa.</p>

        <div className="flex flex-col gap-8">

          {/* Timestamp Input Section */}
          <div className="nes-container is-rounded">
            <div className="flex flex-col gap-4">
              <label htmlFor="timestamp_input" className="mb-2">Unix Timestamp (Seconds)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  id="timestamp_input"
                  className="nes-input"
                  value={timestamp}
                  onChange={handleTimestampChange}
                  placeholder="Enter timestamp..."
                />
                <button
                  type="button"
                  className="nes-btn is-primary whitespace-nowrap"
                  onClick={setNow}
                >
                  Now
                </button>
              </div>
              <div className="text-right">
                 <button
                  type="button"
                  className={`nes-btn is-small ${copyStatus === 'timestamp' ? 'is-success' : ''}`}
                  onClick={() => copyToClipboard(timestamp, 'timestamp')}
                  disabled={!timestamp}
                >
                  {copyStatus === 'timestamp' ? 'Copied!' : 'Copy Timestamp'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <i className="nes-icon is-large arrow-down"></i>
          </div>

          {/* Date Output/Input Section */}
          <div className="nes-container is-rounded">
             <div className="flex flex-col gap-4">
              <label htmlFor="date_output" className="mb-2">Date & Time (Local)</label>

              {/* Display formatted date */}
              <div className="nes-field">
                  <input
                    type="text"
                    id="date_output"
                    className="nes-input"
                    readOnly
                    value={dateString}
                    placeholder="Result date..."
                  />
              </div>

              {/* Date Picker to set timestamp */}
              <div className="mt-4">
                  <label htmlFor="date_picker" className="mb-2 text-sm text-gray-500">Pick a date to convert to timestamp:</label>
                  <input
                    type="datetime-local"
                    id="date_picker"
                    className="nes-input"
                    onChange={handleDateChange}
                    style={{ colorScheme: 'light' }}
                  />
              </div>

               <div className="text-right mt-2">
                 <button
                  type="button"
                  className={`nes-btn is-small ${copyStatus === 'date' ? 'is-success' : ''}`}
                  onClick={() => copyToClipboard(dateString, 'date')}
                  disabled={!dateString || dateString === 'Invalid Date'}
                >
                  {copyStatus === 'date' ? 'Copied!' : 'Copy Date String'}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="button" className="nes-btn is-error" onClick={clearAll}>
                Clear All
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
