import Link from 'next/link';
import Image from 'next/image';
import FloatingElement from '@/components/FloatingElement';
import Typewriter from '@/components/Typewriter';
import AnimatedCard from '@/components/AnimatedCard';
import Decorations from '@/components/Decorations';

export default function Home() {
  const tools = [
    {
      href: '/qr-code',
      title: 'QR Generator',
      description: 'Create custom QR codes with icons inside.',
      icon: 'nes-icon coin',
      type: 'is-primary'
    },
    {
      href: '/random-slot',
      title: 'Slot Machine',
      description: 'Spin the wheel to pick a random winner from your list.',
      icon: 'nes-icon trophy',
      type: 'is-warning'
    },
    {
      href: '/text-to-speech',
      title: 'Text to Speech',
      description: 'Convert text to spoken audio with custom speed and pitch.',
      icon: 'nes-icon twitch', // Best approximation for a "speech/media" icon in nes.css
      type: 'is-success'
    },
    {
      href: '/password-generator',
      title: 'Password Gen',
      description: 'Generate strong, random passwords instantly.',
      icon: 'nes-icon like',
      type: 'is-error'
    },
    {
      href: '/unit-converter',
      title: 'Unit Converter',
      description: 'Convert weight, length, and temperature instantly.',
      icon: 'nes-icon star',
      type: 'is-warning'
    },
    {
      href: '/currency-converter',
      title: 'Currency Exchange',
      description: 'Convert 150+ currencies with real-time rates.',
      icon: 'nes-icon coin',
      type: 'is-warning'
    },
    {
      href: '/pomodoro-timer',
      title: 'Focus Timer',
      description: 'Boost productivity with the Pomodoro technique.',
      icon: 'nes-icon star',
      type: 'is-primary'
    },
    {
      href: '/word-counter',
      title: 'Word Counter',
      description: 'Count words, characters, and reading time instantly.',
      icon: 'nes-icon star',
      type: 'is-success'
    },
    // Future tools can be added here
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* Hero / Welcome Section */}
      <section className="nes-container is-dark with-title text-center relative overflow-hidden">
        <h2 className="title relative z-10">Welcome</h2>

        {/* Animated Background Decorations */}
        <Decorations />

        <div className="flex flex-col items-center gap-4 relative z-10">
          {/* Larger Logo */}
          <div className="mb-4">
               <FloatingElement>
                   <Image
                      src="/logo.png"
                      alt="Daily Task Tool Logo"
                      width={128}
                      height={128}
                      className="mx-auto"
                      style={{ imageRendering: 'pixelated' }}
                    />
               </FloatingElement>
           </div>
          <div className="text-lg min-h-[3rem]">
            <Typewriter text="This website helps you make your daily tasks easier." delay={500} speed={40} />
          </div>
          <p className="max-w-2xl">
            &quot;Daily Task Tool&quot; brings a classic feel to modern utilities.
            Whether you need to share a link via QR code or make a quick decision, we&apos;ve got you covered.
          </p>
          <div className="mt-4">
             <i className="nes-icon heart is-large animate-bounce"></i>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section>
        <h3 className="mb-6 text-xl border-b-4 border-black inline-block pr-4">Available Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <AnimatedCard key={tool.href} delay={index * 0.2} className="h-full">
                <Link href={tool.href} className="no-underline block h-full group">
                  <div className={`nes-container with-title is-rounded transition-all cursor-pointer h-full flex flex-col group-hover:bg-gray-100 transform group-hover:-translate-y-1 transition-transform duration-200`}>
                    <h3 className="title">{tool.title}</h3>
                    <div className="flex flex-col items-center text-center flex-grow">
                      <i className={`${tool.icon} is-large mb-6 mt-2 transition-transform group-hover:scale-110`}></i>
                      <p className="mb-6 flex-grow">{tool.description}</p>
                      <button type="button" className={`nes-btn ${tool.type} w-full`}>
                        Open Tool
                      </button>
                    </div>
                  </div>
                </Link>
            </AnimatedCard>
          ))}

          {/* Placeholder for future tools to show scalability */}
          <AnimatedCard delay={tools.length * 0.2}>
              <div className="nes-container is-rounded is-dotted flex items-center justify-center opacity-50 min-h-[250px] hover:opacity-100 transition-opacity">
                <p className="text-center">More tools<br/>coming soon...</p>
              </div>
          </AnimatedCard>
        </div>
      </section>

      {/* How to Use / About Section */}
      <section className="nes-container with-title">
        <h3 className="title">About & Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
                <h4 className="mb-2 underline">QR Generator</h4>
                <ul className="nes-list is-disc ml-4">
                    <li>Enter any text or URL.</li>
                    <li>Upload a custom icon (optional).</li>
                    <li>Download your unique QR code instantly.</li>
                </ul>
            </div>
            <div>
                <h4 className="mb-2 underline">Slot Machine</h4>
                <ul className="nes-list is-disc ml-4">
                    <li>Enter a list of options (one per line).</li>
                    <li>Spin the wheel to pick a random winner.</li>
                    <li>Perfect for decisions, raffles, or games!</li>
                </ul>
            </div>
            <div>
                <h4 className="mb-2 underline">Text to Speech</h4>
                <ul className="nes-list is-disc ml-4">
                    <li>Type English text in the box.</li>
                    <li>Adjust speed, pitch, and volume.</li>
                    <li>Listen instantly.</li>
                </ul>
            </div>
            <div>
                <h4 className="mb-2 underline">Password Gen</h4>
                <ul className="nes-list is-disc ml-4">
                    <li>Set password length (8-32).</li>
                    <li>Toggle Uppercase, Numbers, Symbols.</li>
                    <li>One-click generate & copy.</li>
                </ul>
            </div>
            <div>
                <h4 className="mb-2 underline">Unit Converter</h4>
                <ul className="nes-list is-disc ml-4">
                    <li>Convert Weight, Length, Temperature.</li>
                    <li>Real-time bi-directional updates.</li>
                    <li>Swap units with one click.</li>
                </ul>
            </div>
            <div>
                <h4 className="mb-2 underline">Currency Exchange</h4>
                <ul className="nes-list is-disc ml-4">
                    <li>Convert 150+ global currencies.</li>
                    <li>Real-time exchange rates.</li>
                    <li>Searchable list with flags.</li>
                </ul>
            </div>
            <div>
                <h4 className="mb-2 underline">Focus Timer</h4>
                <ul className="nes-list is-disc ml-4">
                    <li>25m Work / 5m Break intervals.</li>
                    <li>Customizable timer settings.</li>
                    <li>Track your focus sessions.</li>
                </ul>
            </div>
            <div>
                <h4 className="mb-2 underline">Word Counter</h4>
                <ul className="nes-list is-disc ml-4">
                    <li>Count Words, Characters, Sentences.</li>
                    <li>Estimate reading time.</li>
                    <li>Simple text analysis.</li>
                </ul>
            </div>
        </div>
        <div className="mt-8 text-center text-sm border-t-4 border-dashed border-gray-400 pt-4">
            <p>Built with Next.js 16, Tailwind CSS, and Nes.css.</p>
        </div>
      </section>

      {/* Donation Section */}
      <section className="nes-container with-title is-centered">
        <h3 className="title">Support</h3>
        <p className="mb-6">If you find these tools useful, consider buying me a coffee.</p>
        <a href="https://buymeacoffee.com/stooop" target="_blank" rel="noopener noreferrer" className="nes-btn is-warning animate-wiggle">
          <i className="nes-icon coin is-small animate-spin-slow"></i> Buy me a coffee
        </a>
      </section>
    </div>
  );
}
