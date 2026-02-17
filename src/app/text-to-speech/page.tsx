'use client';

import { useState, useEffect } from 'react';
import { getAudioUrl } from 'google-tts-api';

export default function TextToSpeechPage() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      // Filter for English voices (or any others if desired)
      const englishVoices = allVoices.filter(voice => voice.lang.includes('en'));
      setVoices(englishVoices);
      if (englishVoices.length > 0) {
        setSelectedVoice(englishVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (!text) return;

    window.speechSynthesis.cancel(); // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(text);

    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;

    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleDownload = () => {
    if (!text) return;

    // Limitation: google-tts-api usually supports ~200 chars.
    // We'll try to generate a URL for the whole text or the first chunk.
    try {
        const url = getAudioUrl(text, {
            lang: 'en',
            slow: rate < 0.8, // Simple heuristic for speed
            host: 'https://translate.google.com',
        });

        // Create a temporary link to download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'speech.mp3';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (e) {
        alert('Text too long for download (limit ~200 chars) or error generating URL.');
        console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
      <div className="nes-container with-title is-centered w-full">
        <h2 className="title">Text to Speech</h2>

        <div className="flex flex-col gap-4 w-full">
            <label htmlFor="tts_input" className="nes-text is-primary text-left">Enter Text (English):</label>
            <textarea
                id="tts_input"
                className="nes-textarea min-h-[150px]"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something to hear it spoken..."
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8 text-left">
            {/* Controls */}
            <div className="flex flex-col gap-4">
                <div className="nes-field">
                    <label htmlFor="voice_select">Voice</label>
                    <div className="nes-select">
                        <select id="voice_select" value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
                            {voices.map((voice) => (
                                <option key={voice.name} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="nes-field">
                    <label htmlFor="rate_range">Speed ({rate}x)</label>
                    <input
                        type="range"
                        id="rate_range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(parseFloat(e.target.value))}
                        className="nes-range"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                 <div className="nes-field">
                    <label htmlFor="pitch_range">Pitch ({pitch})</label>
                    <input
                        type="range"
                        id="pitch_range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={pitch}
                        onChange={(e) => setPitch(parseFloat(e.target.value))}
                        className="nes-range"
                    />
                </div>

                <div className="nes-field">
                    <label htmlFor="vol_range">Volume ({Math.round(volume * 100)}%)</label>
                    <input
                        type="range"
                        id="vol_range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="nes-range"
                    />
                </div>
            </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
            <button
                type="button"
                className={`nes-btn is-success ${!text ? 'is-disabled' : ''}`}
                onClick={handleSpeak}
                disabled={!text}
            >
                {isSpeaking ? 'Speaking...' : 'Speak'}
            </button>

            <button
                type="button"
                className={`nes-btn is-error ${!isSpeaking ? 'is-disabled' : ''}`}
                onClick={handleStop}
                disabled={!isSpeaking}
            >
                Stop
            </button>

             <button
                type="button"
                className={`nes-btn is-primary ${!text ? 'is-disabled' : ''}`}
                onClick={handleDownload}
                disabled={!text}
            >
                Download MP3
            </button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
            <p>* Download functionality is limited to short texts (~200 chars).</p>
        </div>

      </div>
    </div>
  );
}
