import Link from 'next/link';

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
    // Future tools can be added here
  ];

  return (
    <div className="flex flex-col gap-12">
      <section className="nes-container is-dark with-title text-center">
        <h2 className="title">Welcome</h2>
        <p className="mb-4">This website helps you make your daily tasks easier with a retro touch.</p>
        <p>Select a tool below to get started!</p>
        <i className="nes-icon heart is-large mt-4 animate-bounce"></i>
      </section>

      <section>
        <h3 className="mb-6 text-xl border-b-4 border-black inline-block pr-4">Available Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.href} className="no-underline block h-full">
              <div className={`nes-container with-title is-rounded hover:border-blue-500 transition-all cursor-pointer h-full flex flex-col`}>
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
    </div>
  );
}
