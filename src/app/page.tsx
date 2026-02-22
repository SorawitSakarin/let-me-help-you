import Link from 'next/link';
import Image from 'next/image';
import { QrCode, Dices, Volume2, ArrowRight, CheckCircle, Coffee, Sparkles } from 'lucide-react';
import FloatingElement from '@/components/FloatingElement';
import Typewriter from '@/components/Typewriter';
import AnimatedCard from '@/components/AnimatedCard';

export default function Home() {
  const tools = [
    {
      href: '/qr-code',
      title: 'QR Generator',
      description: 'Create custom QR codes with embedded icons instantly.',
      icon: <QrCode className="w-8 h-8 text-indigo-600" />,
      tag: 'Popular'
    },
    {
      href: '/random-slot',
      title: 'Random Slot',
      description: 'Make fair decisions with a customizable spinning wheel.',
      icon: <Dices className="w-8 h-8 text-rose-500" />,
      tag: 'Fun'
    },
    {
      href: '/text-to-speech',
      title: 'Text to Speech',
      description: 'Convert text to natural-sounding speech with adjustable controls.',
      icon: <Volume2 className="w-8 h-8 text-emerald-500" />,
      tag: 'Utility'
    },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            <span>New tools added weekly</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Simplify Your <span className="text-indigo-600">Daily Tasks</span>
          </h1>

          <div className="text-xl text-gray-600 mb-8 h-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Typewriter text="Tools for creators, developers, and everyone." delay={500} speed={40} />
          </div>

          <p className="max-w-2xl mx-auto text-lg text-gray-500 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            A suite of professional, easy-to-use utilities designed to boost your productivity.
            No sign-up required. Free forever.
          </p>

          <div className="flex justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link
              href="#tools"
              className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#about"
              className="px-8 py-3 rounded-full bg-white text-gray-700 font-semibold border border-gray-200 hover:bg-gray-50 transition-all hover:border-gray-300 flex items-center gap-2"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl animate-float" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-100/50 rounded-full blur-3xl animate-float" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Available Tools</h2>
            <p className="text-gray-500 mt-2">Select a tool to get started instantly.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <AnimatedCard key={tool.href} delay={index * 0.1} className="h-full">
              <Link href={tool.href} className="group block h-full">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-indigo-600 transform -translate-x-2 group-hover:translate-x-0 transition-transform" />
                  </div>

                  <div className="mb-6 p-4 bg-gray-50 rounded-xl w-fit group-hover:bg-indigo-50 transition-colors">
                    {tool.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-gray-500 flex-grow leading-relaxed">
                    {tool.description}
                  </p>

                  {tool.tag && (
                    <div className="mt-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                        {tool.tag}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </AnimatedCard>
          ))}

          {/* Coming Soon Card */}
          <AnimatedCard delay={tools.length * 0.1} className="h-full">
             <div className="bg-gray-50 rounded-2xl p-8 border border-dashed border-gray-300 h-full flex flex-col items-center justify-center text-center opacity-70">
                <div className="p-4 bg-gray-100 rounded-full mb-4">
                   <Sparkles className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600">More Coming Soon</h3>
                <p className="text-sm text-gray-500 mt-2">We are constantly adding new utilities.</p>
             </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Features / Why Us */}
      <section id="about" className="bg-white py-20 rounded-3xl mx-4 lg:mx-8 shadow-sm border border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why use Daily Task Tool?</h2>
            <p className="text-gray-500">Built for speed, privacy, and simplicity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Free</h3>
              <p className="text-gray-500 leading-relaxed">
                No hidden fees, no subscriptions. All tools are completely free to use without limits.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-600">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Modern & Fast</h3>
              <p className="text-gray-500 leading-relaxed">
                Built with the latest web technologies for instant load times and smooth interactions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <Coffee className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Supported</h3>
              <p className="text-gray-500 leading-relaxed">
                Supported by users like you. If you find these tools helpful, consider buying us a coffee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support / CTA */}
      <section className="container mx-auto px-4 text-center">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 lg:p-20 text-white relative overflow-hidden shadow-xl">
           <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Enjoying these tools?</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto text-lg">
                Your support keeps the servers running and new features coming.
              </p>
              <a
                href="https://buymeacoffee.com/stooop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-amber-900 rounded-full font-bold hover:bg-amber-300 transition-colors shadow-lg hover:shadow-amber-400/20"
              >
                <Coffee className="w-5 h-5" />
                Buy me a coffee
              </a>
           </div>

           {/* Abstract Background Shapes */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </section>
    </div>
  );
}
