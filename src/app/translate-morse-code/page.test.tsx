import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MorseCodeTranslator from './page';

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('MorseCodeTranslator', () => {
  it('renders correctly', () => {
    render(<MorseCodeTranslator />);
    expect(screen.getByText('Morse Code Translator')).toBeInTheDocument();
    expect(screen.getByLabelText('Text Input')).toBeInTheDocument();
    expect(screen.getByLabelText('Morse Code')).toBeInTheDocument();
    expect(screen.getByText('Morse Code Reference')).toBeInTheDocument();
  });

  it('translates text to morse', () => {
    render(<MorseCodeTranslator />);
    const textInput = screen.getByLabelText('Text Input') as HTMLTextAreaElement;
    
    fireEvent.change(textInput, { target: { value: 'SOS' } });
    
    const morseOutput = screen.getByLabelText('Morse Code') as HTMLTextAreaElement;
    expect(morseOutput.value).toBe('... --- ...');
  });

  it('translates morse to text', () => {
    render(<MorseCodeTranslator />);
    const morseInput = screen.getByLabelText('Morse Code') as HTMLTextAreaElement;
    
    fireEvent.change(morseInput, { target: { value: '... --- ...' } });
    
    const textOutput = screen.getByLabelText('Text Input') as HTMLTextAreaElement;
    expect(textOutput.value).toBe('sos');
  });

  it('switches reference tabs and displays correct symbols', () => {
    render(<MorseCodeTranslator />);
    
    // Letters tab should be default, showing 'A' and its morse code '.-'
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('.-')).toBeInTheDocument();
    // But numbers like '0' should not be visible initially
    expect(screen.queryByText('0')).not.toBeInTheDocument();

    // Click on Numbers tab
    const numbersTab = screen.getByRole('button', { name: 'Numbers' });
    fireEvent.click(numbersTab);

    // Number '0' with '-----' should now be visible
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('-----')).toBeInTheDocument();
    expect(screen.queryByText('A')).not.toBeInTheDocument();

    // Click on Punctuation tab
    const punctuationTab = screen.getByRole('button', { name: 'Punctuation' });
    fireEvent.click(punctuationTab);

    // Punctuation like '.' with '.-.-.-' should now be visible
    expect(screen.getByText('.')).toBeInTheDocument();
    expect(screen.getByText('.-.-.-')).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('clears all fields when Clear All is clicked', () => {
    render(<MorseCodeTranslator />);
    const textInput = screen.getByLabelText('Text Input') as HTMLTextAreaElement;
    fireEvent.change(textInput, { target: { value: 'hello' } });

    const morseOutput = screen.getByLabelText('Morse Code') as HTMLTextAreaElement;
    expect(morseOutput.value).not.toBe('');

    const clearButton = screen.getByText('Clear All');
    fireEvent.click(clearButton);

    expect(textInput.value).toBe('');
    expect(morseOutput.value).toBe('');
  });
});
