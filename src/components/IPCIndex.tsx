import React, { useState } from 'react';
import { Search, Book, ArrowRight } from 'lucide-react';
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">IPC Directory</h2>
        <p className="text-gray-600">Search and explore important sections from the Indian Penal Code 1860 based on the official index.</p>
      </div>

      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 text-sm shadow-sm"
          placeholder="Search for a section (e.g. Section 420), keyword (e.g. Theft, Murder)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-orange-50 border-b border-orange-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center text-orange-800 font-semibold">
            <Book className="w-5 h-5 mr-2" />
            Sections parsed from Indian Penal Code 1860
          </div>
          <span className="text-orange-600 text-sm font-medium">{filteredSections.length} Sections Found</span>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredSections.length > 0 ? (
            filteredSections.map((item, index) => (
              <div key={index} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md mb-2">
                    {item.section}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                <div className="mt-4 flex items-center text-orange-600 text-sm font-medium hover:text-orange-700 cursor-pointer">
                  Read full text <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <Book className="w-12 h-12 text-gray-300 mb-3" />
              <p>No IPC sections found matching "{searchTerm}".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
