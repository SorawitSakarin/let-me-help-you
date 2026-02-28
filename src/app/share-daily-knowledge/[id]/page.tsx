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
    <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
      {/* Header */}
      <section className="text-center py-4">
        <h1 className="text-xl md:text-2xl mb-4 text-black">
          {topic.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <span className="nes-badge">
            <span className="is-primary" style={{ fontSize: '0.65rem', padding: '0.25rem 0.5rem' }}>{topic.category}</span>
          </span>
          <span className="text-gray-500"><i className="nes-icon is-small clock mr-2"></i>{topic.date}</span>
        </div>
      </section>

      {/* Content */}
      <section className="nes-container is-rounded flex flex-col gap-6" style={{ padding: '2rem 1.5rem', background: '#fff' }}>
        {topic.content.map((paragraph, index) => (
          <p key={index} className="text-sm md:text-base leading-relaxed text-gray-800">
            {paragraph}
          </p>
        ))}

        <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
          <h3 className="text-xs md:text-sm mb-2 text-gray-500 uppercase tracking-widest">Reference</h3>
          <a
            href={topic.reference}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm text-blue-600 hover:text-blue-800 break-all inline-flex items-center gap-2 transition-colors"
          >
            {topic.reference}
          </a>
        </div>
      </section>

      {/* Navigation */}
      <section className="mt-8 text-center flex justify-center gap-4">
        <Link href="/share-daily-knowledge" className="nes-btn">
          Back to Knowledge Base
        </Link>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return knowledgeData.map((topic) => ({
    id: topic.id,
  }));
}
