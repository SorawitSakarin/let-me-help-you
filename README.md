# Daily Task Tool

A utility collection built with Next.js 16, TypeScript, and Nes.css. This project provides simple and useful tools for your daily tasks.

## Features

### 1. QR Code Generator
Create custom QR codes instantly.
- **Input**: Any text or URL.
- **Customization**: Upload a custom icon or logo to embed in the center of the QR code.
- **Download**: Save your QR code as a PNG file.
- **Theme**: Clean black-on-white design for maximum compatibility.

### 2. Random Slot Machine
Make decisions or pick winners with a spinning wheel.
- **Input**: Enter a list of options (one per line).
- **Visuals**: Watch the wheel spin and land on a random winner.
- **Theme**: Monochrome style.

### 3. Text to Speech
Convert text to spoken audio.
- **Input**: Enter English text.
- **Controls**: Adjust Speed, Pitch, and Volume.
- **Theme**: Simple interface with range sliders.

### 4. Password Generator
Generate strong, random passwords.
- **Input**: Select length (8-32) and character types (Uppercase, Lowercase, Numbers, Symbols).
- **Controls**: Checkboxes and length slider.
- **Theme**: Secure and simple.

### 5. Focus Timer
Boost productivity with the Pomodoro technique.
- **Controls**: Start, Pause, Reset.
- **Settings**: Customizable Work and Break durations.
- **Theme**: Classic 8-bit timer with progress bar.

### 6. Word Counter
Analyze text instantly.
- **Stats**: Word count, Character count, Sentence count, Paragraph count, Reading time.
- **Controls**: Copy, Clear.
- **Theme**: Simple text area with statistics grid.

### 7. Binary Translator
Convert text to binary and binary to text.
- **Input**: Bi-directional text and binary fields.
- **Controls**: Copy Text, Copy Binary, Clear.
- **Theme**: Split view with 8-bit aesthetic.

### 8. Lorem Ipsum Generator
Generate custom placeholder text.
- **Input**: Select count (number) and unit (Words, Sentences, Paragraphs).
- **Controls**: Generate, Copy, Clear.
- **Theme**: Simple interface with large text area.

### 9. Base64 Encoder
Convert text to Base64 format and vice versa.
- **Input**: Bi-directional text conversion.
- **Features**: Robust UTF-8 support (emojis, special characters).
- **Controls**: Encode, Decode, Copy, Clear.
- **Theme**: Simple and clean 8-bit interface.

### 10. Unix Timestamp Converter
Convert Unix timestamps to dates and vice versa.
- **Input**: Timestamp to Date, Date to Timestamp.
- **Features**: Copy to clipboard, Set to Now.
- **Controls**: Convert, Copy, Clear.
- **Theme**: 8-bit layout with clear inputs.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Nes.css](https://nostalgic-css.github.io/NES.css/)
- **Font**: "Press Start 2P" (Google Fonts)
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
   > **Note**: This project uses an `.npmrc` file with `legacy-peer-deps=true` to resolve peer dependency conflicts between Next.js 16 (React 19) and some React 18 libraries.

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
- `src/app/lorem-ipsum/page.tsx`: Lorem Ipsum Generator tool.
- `src/app/base64-encoder/page.tsx`: Base64 Encoder tool.
- `src/app/unix-timestamp/page.tsx`: Unix Timestamp Converter tool.
- `src/app/globals.css`: Global styles and Nes.css theme overrides (Monochrome theme).
- `src/app/layout.tsx`: Root layout including the font and header/footer.

## Theme

The application features a "Classic Monochrome" 8-bit theme:
- **Background**: White / Off-white
- **Foreground**: Black / Gray
- **Font**: Pixelated "Press Start 2P"
