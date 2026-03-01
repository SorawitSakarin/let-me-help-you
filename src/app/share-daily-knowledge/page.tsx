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
    <div className="max-w-4xl mx-auto flex flex-col gap-8 py-8 font-sans" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}>
      {/* Header Section */}
      <section className="text-center py-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 tracking-tight">
          Daily Knowledge
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn something new and interesting every day! Explore our curated topics below.
        </p>
      </section>

      {/* Content Section */}
      <section className="flex flex-col gap-10">
        {Object.entries(groupedKnowledge).map(([category, topics]) => (
          <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 m-0">{category}</h2>
            </div>
            <div className="flex flex-col divide-y divide-gray-100">
              {topics.map(topic => (
                <Link key={topic.id} href={`/share-daily-knowledge/${topic.id}`} className="group block px-6 py-5 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1 pr-4">
                      <h3 className="text-lg font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                        {topic.title}
                      </h3>
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {topic.date}
                      </span>
                    </div>
                    <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Back Button */}
      <section className="mt-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Home
        </Link>
      </section>
    </div>
  );
}
