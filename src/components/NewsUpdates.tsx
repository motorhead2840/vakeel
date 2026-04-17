import React, { useState } from 'react';
import { Newspaper, ChevronRight, ArrowRightCircle } from 'lucide-react';

type NewsItem = {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: 'Supreme Court' | 'High Courts' | 'Legislative';
  courtName?: string;
};

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Supreme Court Mandates E-Filing for All Civil Disputes Effective 2026',
    date: '15 Apr 2026',
    summary: 'The apex court has issued a new circular stating that all civil petitions and appeals must be electronically filed to ensure transparency and speed in the justice delivery system.',
    category: 'Supreme Court',
    courtName: 'Supreme Court of India'
  },
  {
    id: '2',
    title: 'New Guidelines on Bail Pleas in Commercial Offences',
    date: '12 Apr 2026',
    summary: 'Delhi High Court has laid down strict parameters for considering anticipatory bail in matters concerning large scale financial frauds under the PMLA.',
    category: 'High Courts',
    courtName: 'Delhi High Court'
  },
  {
    id: '3',
    title: 'Bombay HC Takes Sou Moto Cognizance of Slum Demolitions',
    date: '10 Apr 2026',
    summary: 'A bench directed real-time tracking of rehabilitation sites before any further evictions are carried out within the municipal limits of Mumbai.',
    category: 'High Courts',
    courtName: 'Bombay High Court'
  },
  {
    id: '4',
    title: 'Chief Justice inaugurates AI-based Case Allocation System',
    date: '08 Apr 2026',
    summary: 'The Supreme Court rolled out a new artificial intelligence system designed to auto-allocate cases to benches based on their historical expertise and current backlog.',
    category: 'Supreme Court',
    courtName: 'Supreme Court of India'
  },
  {
    id: '5',
    title: 'Madras HC Clarifies Scope of Section 498A IPC in Joint Families',
    date: '05 Apr 2026',
    summary: 'The court clarified when distant relatives of a husband can be roped into cruelty charges, cautioning against the misuse of the provision.',
    category: 'High Courts',
    courtName: 'Madras High Court'
  }
];

const COURTS = [
  'All News',
  'Supreme Court of India',
  'Delhi High Court',
  'Bombay High Court',
  'Madras High Court',
  'Karnataka High Court'
];

export default function NewsUpdates() {
  const [activeFilter, setActiveFilter] = useState('All News');

  const filteredNews = MOCK_NEWS.filter(news => 
    activeFilter === 'All News' || news.courtName === activeFilter
  );

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Newspaper className="w-5 h-5 mr-2 text-blue-600" />
          News & Updates
        </h2>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm p-2">
          {COURTS.map((court) => (
            <button
              key={court}
              onClick={() => setActiveFilter(court)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1 last:mb-0 flex items-center justify-between ${
                activeFilter === court 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {court}
              {activeFilter === court && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 space-y-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {activeFilter}
          </h3>
          <p className="text-gray-500 text-sm">Latest rulings, circulars, and updates</p>
        </div>

        {filteredNews.length > 0 ? filteredNews.map(news => (
          <div key={news.id} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md tracking-wide ${
                news.category === 'Supreme Court' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-800'
              }`}>
                {news.courtName}
              </span>
              <span className="text-sm font-medium text-gray-400">
                • {news.date}
              </span>
            </div>
            
            <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {news.title}
            </h4>
            <p className="text-gray-600 leading-relaxed mb-4">
              {news.summary}
            </p>
            
            <div className="text-blue-600 text-sm font-semibold flex items-center group-hover:text-blue-700">
              Read Full Update
              <ArrowRightCircle className="w-4 h-4 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </div>
        )) : (
          <div className="bg-white border rounded-2xl p-12 text-center">
            <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Updates Found</h3>
            <p className="text-gray-500">There are currently no news articles for {activeFilter}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
