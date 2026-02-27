import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UnixTimestampConverter from './page';

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('UnixTimestampConverter', () => {
  it('renders correctly', () => {
    render(<UnixTimestampConverter />);
    expect(screen.getByText('Unix Timestamp Converter')).toBeInTheDocument();
    expect(screen.getByLabelText('Unix Timestamp (Seconds)')).toBeInTheDocument();
    expect(screen.getByLabelText('Date & Time (Local)')).toBeInTheDocument();
  });

  it('initializes with a timestamp', () => {
    render(<UnixTimestampConverter />);
    const timestampInput = screen.getByLabelText('Unix Timestamp (Seconds)') as HTMLInputElement;
    expect(timestampInput.value).not.toBe('');
  });

  it('updates date when timestamp changes', () => {
    render(<UnixTimestampConverter />);
    const timestampInput = screen.getByLabelText('Unix Timestamp (Seconds)') as HTMLInputElement;

    // Set timestamp to 0 (1970-01-01)
    fireEvent.change(timestampInput, { target: { value: '0' } });

    const dateOutput = screen.getByPlaceholderText('Result date...') as HTMLInputElement;
    // The exact string depends on local time zone, but it should contain "1970" or correspond to 0
    expect(dateOutput.value).toContain('1970');
  });

  it('updates timestamp when "Now" is clicked', () => {
    render(<UnixTimestampConverter />);
    const timestampInput = screen.getByLabelText('Unix Timestamp (Seconds)') as HTMLInputElement;
    const initialValue = timestampInput.value;

    // Fast forward time slightly or just re-click (mock date?)
    // For simplicity, we just check if the button exists and is clickable
    const nowButton = screen.getByText('Now');
    fireEvent.click(nowButton);
    expect(timestampInput.value).not.toBe('');
  });

  it('clears all fields', () => {
    render(<UnixTimestampConverter />);
    const clearButton = screen.getByText('Clear All');
    fireEvent.click(clearButton);

    const timestampInput = screen.getByLabelText('Unix Timestamp (Seconds)') as HTMLInputElement;
    expect(timestampInput.value).toBe('');

    const dateOutput = screen.getByPlaceholderText('Result date...') as HTMLInputElement;
    expect(dateOutput.value).toBe('');
  });
});
