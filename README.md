# Daily 8-bit Tools

A retro-styled utility collection built with Next.js 16, TypeScript, and Nes.css. This project provides fun, 8-bit themed tools for your daily tasks.

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
- **Theme**: Monochrome 8-bit style.

### 3. Text to Speech
Convert text to spoken audio.
- **Input**: Enter English text.
- **Controls**: Adjust Speed, Pitch, and Volume.
- **Download**: Save as MP3 (limited to short texts).
- **Theme**: Retro interface with range sliders.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Nes.css](https://nostalgic-css.github.io/NES.css/)
- **Font**: "Press Start 2P" (Google Fonts)
- **Libraries**:
    - `qrcode.react` (QR Generation)
    - `react-custom-roulette` (Spinning Wheel)
    - `google-tts-api` (Speech Download)

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
- `src/app/globals.css`: Global styles and Nes.css theme overrides (Monochrome theme).
- `src/app/layout.tsx`: Root layout including the font and header/footer.

## Theme

The application features a "Classic Monochrome" 8-bit theme:
- **Background**: White / Off-white
- **Foreground**: Black / Gray
- **Font**: Pixelated "Press Start 2P"
