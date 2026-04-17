import React, { useState } from 'react';
import { Search, Book, ArrowRight, FileText } from 'lucide-react';
import { IPC_SECTIONS } from '../data/ipcData';

export default function IPCIndex() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSections = IPC_SECTIONS.filter(section => 
    section.section.toLowerCase().includes(searchTerm.toLowerCase()) || 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Penal Code Index</h2>
        <p className="text-gray-600 dark:text-slate-400">Search and explore important sections from the Indian Penal Code 1860 based on the official index.</p>
      </div>

      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 dark:text-slate-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm transition-colors text-gray-900 dark:text-slate-100 outline-none"
          placeholder="Search for a section (e.g. Section 420), keyword (e.g. Theft, Murder)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
        <div className="bg-blue-50/50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center text-blue-800 dark:text-blue-400 font-semibold">
            <Book className="w-5 h-5 mr-3" />
            Official IPC 1860 Chapters
          </div>
          <span className="text-blue-600 dark:text-blue-400 text-sm font-bold bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full">{filteredSections.length} Found</span>
        </div>
        
        <div className="divide-y divide-gray-100 dark:divide-slate-800">
          {filteredSections.length > 0 ? (
            filteredSections.map((item, index) => (
              <div key={index} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg shadow-sm">
                    {item.section}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer w-max">
                  Read Full Text <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-16 text-center text-gray-500 dark:text-slate-400 flex flex-col items-center">
              <FileText className="w-12 h-12 text-gray-300 dark:text-slate-600 mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Results Found</p>
              <p>Try adjusting your search terms or keywords.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
