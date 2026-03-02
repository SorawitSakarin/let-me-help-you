import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextCaseConverter from './page';

// Mock the global alert and clipboard
const originalAlert = window.alert;
const originalClipboard = navigator.clipboard;

beforeAll(() => {
  window.alert = jest.fn();
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn().mockResolvedValue(undefined),
    },
  });
});

afterAll(() => {
  window.alert = originalAlert;
  Object.assign(navigator, {
    clipboard: originalClipboard,
  });
});

describe('TextCaseConverter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with essential elements', () => {
    render(<TextCaseConverter />);
    expect(screen.getByText('Text Case Converter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text here...')).toBeInTheDocument();
    expect(screen.getByText('UPPERCASE')).toBeInTheDocument();
    expect(screen.getByText('lowercase')).toBeInTheDocument();
    expect(screen.getByText('Title Case')).toBeInTheDocument();
  });

  it('handles input text correctly', () => {
    render(<TextCaseConverter />);
    const input = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input).toHaveValue('hello world');
  });

  it('converts to UPPERCASE', () => {
    render(<TextCaseConverter />);
    const input = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(input, { target: { value: 'hello world' } });

    const upperButton = screen.getByText('UPPERCASE');
    fireEvent.click(upperButton);

    expect(input).toHaveValue('HELLO WORLD');
  });

  it('converts to lowercase', () => {
    render(<TextCaseConverter />);
    const input = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(input, { target: { value: 'HELLO WORLD' } });

    const lowerButton = screen.getByText('lowercase');
    fireEvent.click(lowerButton);

    expect(input).toHaveValue('hello world');
  });

  it('converts to Title Case', () => {
    render(<TextCaseConverter />);
    const input = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(input, { target: { value: 'hello world from jest' } });

    const titleButton = screen.getByText('Title Case');
    fireEvent.click(titleButton);

    expect(input).toHaveValue('Hello World From Jest');
  });

  it('converts to camelCase', () => {
    render(<TextCaseConverter />);
    const input = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(input, { target: { value: 'Hello world from JEST' } });

    const camelButton = screen.getByText('camelCase');
    fireEvent.click(camelButton);

    expect(input).toHaveValue('helloWorldFromJest');
  });

  it('converts to snake_case', () => {
    render(<TextCaseConverter />);
    const input = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(input, { target: { value: 'Hello World From Jest' } });

    const snakeButton = screen.getByText('snake_case');
    fireEvent.click(snakeButton);

    expect(input).toHaveValue('hello_world_from_jest');
  });

  it('converts to kebab-case', () => {
    render(<TextCaseConverter />);
    const input = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(input, { target: { value: 'Hello World From Jest' } });

    const kebabButton = screen.getByText('kebab-case');
    fireEvent.click(kebabButton);

    expect(input).toHaveValue('hello-world-from-jest');
  });

  it('converts to PascalCase', () => {
    render(<TextCaseConverter />);
    const input = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(input, { target: { value: 'hello world from jest' } });

    const pascalButton = screen.getByText('PascalCase');
    fireEvent.click(pascalButton);

    expect(input).toHaveValue('HelloWorldFromJest');
  });

  it('clears the text', () => {
    render(<TextCaseConverter />);
    const input = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(input, { target: { value: 'hello world' } });

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
  });

  it('copies text to clipboard', async () => {
    render(<TextCaseConverter />);
    const input = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(input, { target: { value: 'hello world' } });

    const copyButton = screen.getByText('Copy');
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
  });
});
