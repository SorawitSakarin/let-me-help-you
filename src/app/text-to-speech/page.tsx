'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Square, Volume2 } from 'lucide-react';

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

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-emerald-600 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
             <Volume2 className="w-6 h-6" />
             <h1 className="text-2xl font-bold">Text to Speech</h1>
          </div>
          <p className="text-emerald-100 mt-2">Convert text into natural sounding audio.</p>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label htmlFor="tts_input" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Text (English)
              </label>
              <textarea
                id="tts_input"
                className="w-full h-64 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none font-sans text-gray-700 leading-relaxed"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something here to listen..."
              ></textarea>
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-8 bg-gray-50 rounded-xl p-8 border border-gray-100">
            <div>
              <label htmlFor="voice_select" className="block text-sm font-medium text-gray-700 mb-2">Voice</label>
              <select
                id="voice_select"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all cursor-pointer"
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="rate_range" className="block text-sm font-medium text-gray-700">Speed</label>
                  <span className="text-xs text-gray-500 font-mono bg-gray-200 px-2 py-1 rounded">{rate}x</span>
                </div>
                <input
                  type="range"
                  id="rate_range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="pitch_range" className="block text-sm font-medium text-gray-700">Pitch</label>
                  <span className="text-xs text-gray-500 font-mono bg-gray-200 px-2 py-1 rounded">{pitch}</span>
                </div>
                <input
                  type="range"
                  id="pitch_range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="vol_range" className="block text-sm font-medium text-gray-700">Volume</label>
                  <span className="text-xs text-gray-500 font-mono bg-gray-200 px-2 py-1 rounded">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  id="vol_range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button
                type="button"
                className={`flex items-center justify-center px-6 py-3 rounded-lg font-bold text-white transition-all shadow-md active:scale-95 ${
                  !text
                    ? 'bg-emerald-300 cursor-not-allowed opacity-70'
                    : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg focus:ring-4 focus:ring-emerald-200'
                }`}
                onClick={handleSpeak}
                disabled={!text}
              >
                <Play className={`w-5 h-5 mr-2 ${isSpeaking ? 'animate-pulse' : ''}`} />
                {isSpeaking ? 'Speaking...' : 'Speak'}
              </button>

              <button
                type="button"
                className={`flex items-center justify-center px-6 py-3 rounded-lg font-bold text-gray-700 bg-gray-100 border border-gray-200 transition-all shadow-sm active:scale-95 ${
                  !isSpeaking
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-red-50 hover:text-red-600 hover:border-red-200 focus:ring-4 focus:ring-red-100'
                }`}
                onClick={handleStop}
                disabled={!isSpeaking}
              >
                <Square className="w-5 h-5 mr-2 fill-current" />
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
