import Image from 'next/image';
import FloatingElement from '@/components/FloatingElement';
import Typewriter from '@/components/Typewriter';
import Decorations from '@/components/Decorations';
import ToolsGrid from '@/components/ToolsGrid';
import AboutSection from '@/components/AboutSection';

export default function Home() {
  const tools = [
    {
      href: '/create-qr-code',
      title: 'QR Generator',
      description: 'Create custom QR codes with icons inside.',
      icon: 'nes-icon coin',
      type: 'is-primary'
    },
    {
      href: '/pick-a-random-option',
      title: 'Slot Machine',
      description: 'Spin the wheel to pick a random winner.',
      icon: 'nes-icon trophy',
      type: 'is-warning'
    },
    {
      href: '/convert-text-to-speech',
      title: 'Text to Speech',
      description: 'Convert text to audio with custom settings.',
      icon: 'nes-icon twitch',
      type: 'is-success'
    },
    {
      href: '/generate-password',
      title: 'Password Gen',
      description: 'Generate strong, secure passwords instantly.',
      icon: 'nes-icon like',
      type: 'is-error'
    },
    {
      href: '/convert-units',
      title: 'Unit Converter',
      description: 'Convert Weight, Length, and Temperature.',
      icon: 'nes-icon star',
      type: 'is-warning'
    },
    {
      href: '/convert-currency',
      title: 'Currency Exchange',
      description: 'Real-time rates for 150+ global currencies.',
      icon: 'nes-icon coin',
      type: 'is-warning'
    },
    {
      href: '/start-pomodoro-timer',
      title: 'Focus Timer',
      description: 'Productivity timer with custom intervals.',
      icon: 'nes-icon star',
      type: 'is-primary'
    },
    {
      href: '/count-words',
      title: 'Word Counter',
      description: 'Count words, chars, and reading time.',
      icon: 'nes-icon star',
      type: 'is-success'
    },
    {
      href: '/translate-binary',
      title: 'Binary Translator',
      description: 'Bi-directional text to binary translation.',
      icon: 'nes-icon coin',
      type: 'is-primary'
    },
    {
      href: '/generate-lorem-ipsum',
      title: 'Lorem Ipsum',
      description: 'Generate placeholder text.',
      icon: 'nes-icon like',
      type: 'is-primary'
    },
    {
      href: '/encode-base64',
      title: 'Base64 Encoder',
      description: 'Encode and decode Base64 text.',
      icon: 'nes-icon coin',
      type: 'is-warning'
    },
    {
      href: '/simulate-hacking',
      title: 'Hacker Screen',
      description: 'Simulate a Hollywood-style hacking terminal.',
      icon: 'nes-icon github',
      type: 'is-error'
    },
    {
      href: '/convert-unix-timestamp',
      title: 'Unix Timestamp',
      description: 'Convert timestamps to dates and vice versa.',
      icon: 'nes-icon coin',
      type: 'is-primary'
    },
    {
      href: '/check-keycodes',
      title: 'Keycode Info',
      description: 'Visualize keyboard events and codes.',
      icon: 'nes-icon twitch',
      type: 'is-primary'
    },
    {
      href: '/format-json',
      title: 'JSON Formatter',
      description: 'Validate, format, and minify JSON data.',
      icon: 'nes-icon coin',
      type: 'is-success'
    },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Hero / Welcome Section */}
      <section className="relative overflow-hidden text-center py-6 md:py-8">

        {/* Animated Background Decorations - constrained */}
        <div className="opacity-50 pointer-events-none">
           <Decorations />
        </div>

        <div className="flex flex-col items-center gap-3 relative z-10">
          {/* Logo */}
          <div className="mb-2">
               <FloatingElement>
                   <Image
                      src="/logo.png"
                      alt="Daily Task Tool Logo"
                      width={80}
                      height={80}
                      className="mx-auto"
                      style={{ imageRendering: 'pixelated' }}
                    />
               </FloatingElement>
           </div>

           {/* Headings */}
          <div className="min-h-[2.5rem] flex items-center justify-center">
             <div className="text-sm md:text-base">
                <Typewriter text="Your pixel-perfect daily companion." delay={500} speed={40} />
             </div>
          </div>

          <p className="max-w-xl text-xs md:text-sm text-gray-600">
            Modern utilities with a retro soul. Fast, free, and fun.
          </p>

          <div className="mt-2">
             <i className="nes-icon heart is-medium animate-bounce"></i>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section>
        <ToolsGrid initialTools={tools} />
      </section>

      {/* About Section - Collapsible */}
      <AboutSection />

      {/* Donation Section */}
      <section className="nes-container with-title is-centered is-rounded" style={{ padding: '1.5rem' }}>
        <h3 className="title text-base" style={{ background: 'var(--surface)', marginBottom: '0' }}>Support</h3>
        <div className="flex flex-col items-center gap-4 mt-2">
            <p className="text-xs md:text-sm">Enjoying the tools? Consider buying me a coffee!</p>
            <a href="https://buymeacoffee.com/stooop" target="_blank" rel="noopener noreferrer" className="nes-btn is-warning text-sm px-4 py-2 animate-wiggle flex items-center gap-2">
            <i className="nes-icon coin is-small animate-spin-slow"></i> Buy me a coffee
            </a>
        </div>
      </section>
    </div>
  );
}
