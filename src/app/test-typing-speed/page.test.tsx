import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TypingSpeedTestPage from './page';

// Mock the AudioContext since it's not available in JSDOM
class MockAudioContext {
  currentTime = 0;
  createOscillator = jest.fn().mockReturnValue({
    type: 'sine',
    frequency: {
      setValueAtTime: jest.fn(),
      exponentialRampToValueAtTime: jest.fn(),
    },
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  });
  createGain = jest.fn().mockReturnValue({
    gain: {
      setValueAtTime: jest.fn(),
      exponentialRampToValueAtTime: jest.fn(),
    },
    connect: jest.fn(),
  });
  createBiquadFilter = jest.fn().mockReturnValue({
    type: 'lowpass',
    frequency: {
      setValueAtTime: jest.fn(),
    },
    connect: jest.fn(),
  });
  destination = {};
}

beforeAll(() => {
  // Mock localStorage
  const localStore: Record<string, string> = {};
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn((key) => localStore[key] || null),
      setItem: jest.fn((key, value) => {
        localStore[key] = value;
      }),
      removeItem: jest.fn((key) => {
        delete localStore[key];
      }),
      clear: jest.fn(() => {
        Object.keys(localStore).forEach((key) => delete localStore[key]);
      }),
    },
    writable: true,
  });

  // Mock AudioContext
  (window as any).AudioContext = MockAudioContext;
  (window as any).webkitAudioContext = MockAudioContext;
});

describe('TypingSpeedTestPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with essential elements in idle state', () => {
    render(<TypingSpeedTestPage />);
    expect(screen.getByText('Retro Speed Typer')).toBeInTheDocument();
    expect(screen.getByText('Game Quotes')).toBeInTheDocument();
    expect(screen.getByText('Code Snippets')).toBeInTheDocument();
    expect(screen.getByText('Pangrams')).toBeInTheDocument();
    expect(screen.getByText('Keyboard Sound')).toBeInTheDocument();
    expect(screen.getByText('> Click here to begin typing <')).toBeInTheDocument();
  });

  it('toggles sound checkbox state', () => {
    render(<TypingSpeedTestPage />);
    const soundCheckbox = screen.getByLabelText('Keyboard Sound') as HTMLInputElement;
    expect(soundCheckbox.checked).toBe(true);
    fireEvent.click(soundCheckbox);
    expect(soundCheckbox.checked).toBe(false);
  });

  it('changes mode correctly', () => {
    render(<TypingSpeedTestPage />);
    const codeRadio = screen.getByLabelText('Code Snippets') as HTMLInputElement;
    expect(codeRadio.checked).toBe(false);
    fireEvent.click(codeRadio);
    expect(codeRadio.checked).toBe(true);
  });

  it('changes duration correctly', () => {
    render(<TypingSpeedTestPage />);
    const durationRadio = screen.getByLabelText('15 Seconds') as HTMLInputElement;
    expect(durationRadio.checked).toBe(false);
    fireEvent.click(durationRadio);
    expect(durationRadio.checked).toBe(true);
  });
});
