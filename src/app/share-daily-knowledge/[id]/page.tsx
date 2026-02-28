import Link from 'next/link';
import { knowledgeData } from '@/data/knowledge';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const topic = knowledgeData.find((t) => t.id === resolvedParams.id);

  if (!topic) {
    return { title: 'Topic Not Found' };
  }

  return {
    title: `${topic.title} | Daily Knowledge`,
    description: topic.content[0].slice(0, 150) + '...',
  };
}

export default async function KnowledgeTopicPage({ params }: Props) {
  const resolvedParams = await params;
  const topic = knowledgeData.find((t) => t.id === resolvedParams.id);

  if (!topic) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8 font-sans" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}>
      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <header className="bg-gray-50 border-b border-gray-100 px-6 py-8 sm:px-10 sm:py-10 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-100 text-blue-800">
               {topic.category}
             </span>
             <span className="text-sm text-gray-500 flex items-center gap-1">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
               {topic.date}
             </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {topic.title}
          </h1>
        </header>

        {/* Content */}
        <div className="px-6 py-8 sm:px-10 sm:py-10 flex flex-col gap-6 text-gray-800">
          {topic.content.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Reference & Further Reading</h3>
            <a
              href={topic.reference}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors break-all"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
              <span className="underline decoration-blue-200 underline-offset-2">{topic.reference}</span>
            </a>
          </div>
        </div>
      </article>

      {/* Navigation */}
      <div className="mt-10 text-center">
        <Link href="/share-daily-knowledge" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Knowledge Base
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return knowledgeData.map((topic) => ({
    id: topic.id,
  }));
}
