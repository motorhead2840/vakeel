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
    <div className="flex flex-col md:flex-row gap-8 transition-colors duration-300">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center">
          <Newspaper className="w-6 h-6 mr-2.5 text-blue-600 dark:text-blue-400" />
          News & Updates
        </h2>
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm p-2 transition-colors">
          {COURTS.map((court) => (
            <button
              key={court}
              onClick={() => setActiveFilter(court)}
              className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 mb-1 last:mb-0 flex items-center justify-between ${
                activeFilter === court 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200'
              }`}
            >
              {court}
              {activeFilter === court && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 space-y-5">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {activeFilter}
          </h3>
          <p className="text-gray-500 dark:text-slate-400 font-medium">Latest rulings, circulars, and official updates</p>
        </div>

        {filteredNews.length > 0 ? filteredNews.map(news => (
          <div key={news.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <span className={`text-xs font-black px-3 py-1.5 rounded-lg tracking-wider uppercase ${
                news.category === 'Supreme Court' 
                ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300'
              }`}>
                {news.courtName}
              </span>
              <span className="text-sm font-bold text-gray-400 dark:text-slate-500">
                • {news.date}
              </span>
            </div>
            
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {news.title}
            </h4>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-5">
              {news.summary}
            </p>
            
            <div className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">
              Read Full Update
              <ArrowRightCircle className="w-5 h-5 ml-2 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </div>
        )) : (
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-16 text-center">
            <Newspaper className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Updates Found</h3>
            <p className="text-gray-500 dark:text-slate-400 font-medium">There are currently no news articles for {activeFilter}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
