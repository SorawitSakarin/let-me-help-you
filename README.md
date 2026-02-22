# Daily Task Tool

A modern utility collection built with Next.js 16, TypeScript, and Tailwind CSS. This project provides professional and easy-to-use tools for your daily tasks.

## Features

### 1. QR Code Generator
Create custom QR codes instantly.
- **Input**: Any text or URL.
- **Customization**: Upload a custom icon or logo to embed in the center of the QR code.
- **Download**: Save your QR code as a PNG file.
- **Theme**: Clean and professional design.

### 2. Random Slot Machine
Make decisions or pick winners with a spinning wheel.
- **Input**: Enter a list of options (one per line).
- **Visuals**: Watch the wheel spin and land on a random winner.
- **Theme**: Fun and interactive.

### 3. Text to Speech
Convert text to spoken audio.
- **Input**: Enter English text.
- **Controls**: Adjust Speed, Pitch, and Volume.
- **Theme**: Simple interface with range sliders.

### 4. Password Generator
Generate strong, random passwords.
- **Input**: Select length (8-32) and character types (Uppercase, Lowercase, Numbers, Symbols).
- **Controls**: Checkboxes and length slider.
- **Theme**: Secure and accessible.

### 5. Focus Timer (Pomodoro)
Boost productivity with the Pomodoro technique.
- **Controls**: Start, Pause, Reset.
- **Settings**: Customizable Work, Short Break, and Long Break durations.
- **Theme**: Warm and focused interface with progress indicators.

### 6. Word Counter
Analyze text instantly.
- **Stats**: Word count, Character count, Sentence count, Paragraph count, Reading time.
- **Controls**: Copy, Clear.
- **Theme**: Clean text area with statistics grid.

### 7. Binary Translator
Convert text to binary and binary to text.
- **Input**: Bi-directional text and binary fields.
- **Controls**: Copy Text, Copy Binary, Clear.
- **Theme**: Split view for easy translation.

### 8. Currency Converter
Convert between 150+ currencies using real-time rates.
- **Input**: Amount, From Currency, To Currency.
- **Data**: Live exchange rates via API.
- **Theme**: User-friendly card layout.

### 9. Unit Converter
Convert common units of measurement.
- **Categories**: Length, Weight, Temperature.
- **Controls**: Bi-directional conversion.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: "Inter" (Google Fonts)
- **Libraries**:
    - `qrcode.react` (QR Generation)
    - `react-custom-roulette` (Spinning Wheel)

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd let-me-help-you
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/page.tsx`: Landing page with tool navigation.
- `src/app/qr-code/page.tsx`: QR Code Generator tool.
- `src/app/random-slot/page.tsx`: Random Slot Machine tool.
- `src/app/text-to-speech/page.tsx`: Text to Speech tool.
- `src/app/password-generator/page.tsx`: Password Generator tool.
- `src/app/pomodoro-timer/page.tsx`: Focus Timer tool.
- `src/app/word-counter/page.tsx`: Word Counter tool.
- `src/app/binary-translator/page.tsx`: Binary Translator tool.
- `src/app/currency-converter/page.tsx`: Currency Converter tool.
- `src/app/unit-converter/page.tsx`: Unit Converter tool.
- `src/app/globals.css`: Global styles and Tailwind directives.
- `src/app/layout.tsx`: Root layout including the font and header/footer.

## Design

The application features a "Modern Professional" design system:
- **Typography**: Clean sans-serif font (Inter).
- **Palette**: Indigo (Primary), Emerald (Success), Rose (Error), Amber (Warning), Slate (Neutral).
- **Components**: Rounded corners (`rounded-xl`), soft shadows (`shadow-sm`, `shadow-md`), and ample whitespace.
