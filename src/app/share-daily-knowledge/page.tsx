import Link from 'next/link';
import { knowledgeData, KnowledgeTopic } from '@/data/knowledge';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Knowledge Sharing | Let Me Help You',
  description: 'Learn something new every day! Interesting facts and knowledge grouped by category.',
};

export default function KnowledgeBasePage() {
  // Group topics by category
  const groupedKnowledge: Record<string, KnowledgeTopic[]> = {};

  knowledgeData.forEach(topic => {
    if (!groupedKnowledge[topic.category]) {
      groupedKnowledge[topic.category] = [];
    }
    groupedKnowledge[topic.category].push(topic);
  });

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
      {/* Header Section */}
      <section className="text-center py-4">
        <h1 className="text-2xl md:text-3xl mb-4">
          <i className="nes-icon star is-large mr-4 animate-spin-slow"></i>
          Daily Knowledge
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Learn something new and interesting every day!
        </p>
      </section>

      {/* Content Section */}
      <section className="flex flex-col gap-8">
        {Object.entries(groupedKnowledge).map(([category, topics]) => (
          <div key={category} className="nes-container with-title is-rounded" style={{ padding: '1.5rem' }}>
            <h2 className="title text-lg bg-surface m-0 inline-block px-2">{category}</h2>
            <div className="flex flex-col gap-4 mt-4">
              {topics.map(topic => (
                <Link key={topic.id} href={`/share-daily-knowledge/${topic.id}`} className="no-underline group">
                  <div className="p-4 border-2 border-transparent hover:border-black rounded transition-all bg-gray-50 hover:bg-gray-100 flex justify-between items-center cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-black group-hover:underline">
                        {topic.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {topic.date}
                      </span>
                    </div>
                    <div>
                      <i className="nes-icon is-small caret-right"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Back Button */}
      <section className="mt-8 text-center">
        <Link href="/" className="nes-btn">
          Back to Home
        </Link>
      </section>
    </div>
  );
}
