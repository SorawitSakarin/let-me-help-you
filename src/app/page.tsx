import Link from 'next/link';
import Image from 'next/image';

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
    // Future tools can be added here
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* Hero / Welcome Section */}
      <section className="nes-container is-dark with-title text-center">
        <h2 className="title">Welcome</h2>
        <div className="flex flex-col items-center gap-4">
          {/* Larger Logo */}
          <div className="mb-4">
               <Image
                  src="/logo.png"
                  alt="Daily Task Tool Logo"
                  width={128}
                  height={128}
                  className="mx-auto"
                  style={{ imageRendering: 'pixelated' }}
                />
           </div>
          <p className="text-lg">
            This website helps you make your daily tasks easier.
          </p>
          <p className="max-w-2xl">
            "Daily Task Tool" brings a classic feel to modern utilities.
            Whether you need to share a link via QR code or make a quick decision, we've got you covered.
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
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.href} className="no-underline block h-full group">
              <div className={`nes-container with-title is-rounded transition-all cursor-pointer h-full flex flex-col group-hover:bg-gray-100`}>
                <h3 className="title">{tool.title}</h3>
                <div className="flex flex-col items-center text-center flex-grow">
                  <i className={`${tool.icon} is-large mb-6 mt-2`}></i>
                  <p className="mb-6 flex-grow">{tool.description}</p>
                  <button type="button" className={`nes-btn ${tool.type} w-full`}>
                    Open Tool
                  </button>
                </div>
              </div>
            </Link>
          ))}

          {/* Placeholder for future tools to show scalability */}
          <div className="nes-container is-rounded is-dotted flex items-center justify-center opacity-50 min-h-[250px]">
            <p className="text-center">More tools<br/>coming soon...</p>
          </div>
        </div>
      </section>

      {/* How to Use / About Section */}
      <section className="nes-container with-title">
        <h3 className="title">About & Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
        <div className="mt-8 text-center text-sm border-t-4 border-dashed border-gray-400 pt-4">
            <p>Built with Next.js 16, Tailwind CSS, and Nes.css.</p>
        </div>
      </section>
    </div>
  );
}
