import React, { useState } from 'react';
import { Search, MapPin, Phone, Star, Shield, ExternalLink } from 'lucide-react';
import { MOCK_ADVOCATES, MOCK_LEGAL_AID } from '../constants';
import { Advocate, LegalAidService } from '../types';

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'advocates' | 'legalaid'>('advocates');

  const filteredAdvocates = MOCK_ADVOCATES.filter(adv => 
    adv.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    adv.specialty.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
    adv.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLegalAid = MOCK_LEGAL_AID.filter(aid =>
    aid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aid.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Legal Directory</h2>
        <p className="text-gray-600">Find trusted advocates and free legal aid services across India.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
            placeholder="Search by name, specialty, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex rounded-lg shadow-sm w-full md:w-auto">
          <button
            onClick={() => setActiveTab('advocates')}
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-l-lg border ${
              activeTab === 'advocates' 
                ? 'bg-orange-50 border-orange-500 text-orange-700 z-10' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Advocates
          </button>
          <button
            onClick={() => setActiveTab('legalaid')}
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-r-lg border-t border-b border-r ${
              activeTab === 'legalaid' 
                ? 'bg-orange-50 border-orange-500 text-orange-700 z-10' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Legal Aid Services
          </button>
        </div>
      </div>

      {activeTab === 'advocates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdvocates.length > 0 ? filteredAdvocates.map((advocate) => (
            <div key={advocate.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{advocate.name}</h3>
                    <p className="text-sm text-gray-500">{advocate.experienceYears} Years Experience</p>
                  </div>
                  <div className="flex items-center bg-gray-50 px-2 py-1 rounded text-sm font-medium text-gray-700">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    {advocate.rating}
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-start text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-orange-500" />
                    <div className="flex flex-wrap gap-1">
                      {advocate.specialty.map((s, idx) => (
                        <span key={idx} className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
                    <span className="truncate">{advocate.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
                    <span>{advocate.contact}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500 mb-3">
                    <span className="font-medium">Languages:</span> {advocate.languages.join(', ')}
                  </div>
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                    Contact Advocate
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              No advocates found matching your search.
            </div>
          )}
        </div>
      )}

      {activeTab === 'legalaid' && (
        <div className="space-y-4">
          {filteredLegalAid.length > 0 ? filteredLegalAid.map((aid) => (
            <div key={aid.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{aid.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{aid.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                    {aid.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-1.5 text-gray-400" />
                    {aid.contact}
                  </div>
                  {aid.website && (
                    <div className="flex items-center text-orange-600 hover:text-orange-800 cursor-pointer">
                      <ExternalLink className="w-4 h-4 mr-1.5" />
                      {aid.website}
                    </div>
                  )}
                </div>
              </div>
              <button className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition-colors text-sm whitespace-nowrap">
                Seek Assistance
              </button>
            </div>
          )) : (
            <div className="py-12 text-center text-gray-500">
              No legal aid services found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
