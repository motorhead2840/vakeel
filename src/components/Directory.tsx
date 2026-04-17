import React, { useState } from 'react';
import { Search, MapPin, Phone, Star, Shield, ExternalLink, FileText, Upload, CheckCircle } from 'lucide-react';
import { MOCK_ADVOCATES, MOCK_LEGAL_AID } from '../constants';

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'advocates' | 'legalaid' | 'verify'>('advocates');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredAdvocates = MOCK_ADVOCATES.filter(adv => 
    adv.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    adv.specialty.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
    adv.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLegalAid = MOCK_LEGAL_AID.filter(aid =>
    aid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aid.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setActiveTab('advocates');
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-6 transition-colors duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Advocates & Legal Aid Directory</h2>
        <p className="text-gray-600 dark:text-slate-400">Find trusted advocates, free legal aid services, or apply for national verification.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
        <div className="relative w-full xl:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 dark:text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm text-gray-900 dark:text-slate-100 outline-none transition-colors"
            placeholder="Search by name, specialty, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex rounded-xl shadow-sm w-full xl:w-auto overflow-hidden border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors">
          <button
            onClick={() => setActiveTab('advocates')}
            className={`flex-1 xl:flex-none px-5 py-3 text-sm font-semibold transition-colors ${
              activeTab === 'advocates' 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 border-b-2 border-transparent'
            }`}
          >
            Advocates
          </button>
          <div className="w-px bg-gray-200 dark:bg-slate-700" />
          <button
            onClick={() => setActiveTab('legalaid')}
            className={`flex-1 xl:flex-none px-5 py-3 text-sm font-semibold transition-colors ${
              activeTab === 'legalaid' 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 border-b-2 border-transparent'
            }`}
          >
            Legal Aid
          </button>
          <div className="w-px bg-gray-200 dark:bg-slate-700" />
          <button
            onClick={() => setActiveTab('verify')}
            className={`flex-1 xl:flex-none px-5 py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'verify' 
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-slate-800 border-b-2 border-transparent'
            }`}
          >
            <Shield className="w-4 h-4" />
            Get Verified
          </button>
        </div>
      </div>

      {activeTab === 'advocates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdvocates.length > 0 ? filteredAdvocates.map((advocate) => (
            <div key={advocate.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{advocate.name}</h3>
                      <Shield className="w-4 h-4 text-blue-500 dark:text-blue-400 fill-current" title="Verified Advocate" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-slate-400">{advocate.experienceYears} Years Experience</p>
                  </div>
                  <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg text-sm font-bold text-yellow-700 dark:text-yellow-500 border border-yellow-100 dark:border-yellow-900/30">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    {advocate.rating}
                  </div>
                </div>
                
                <div className="space-y-3 mb-5">
                  <div className="flex items-start text-sm text-gray-600 dark:text-slate-300">
                    <FileText className="w-4 h-4 mr-2.5 mt-0.5 flex-shrink-0 text-blue-500 dark:text-blue-400" />
                    <div className="flex flex-wrap gap-1.5">
                      {advocate.specialty.map((s, idx) => (
                        <span key={idx} className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-0.5 rounded-md font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-slate-300">
                    <MapPin className="w-4 h-4 mr-2.5 flex-shrink-0 text-gray-400 dark:text-slate-500" />
                    <span className="truncate">{advocate.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-slate-300">
                    <Phone className="w-4 h-4 mr-2.5 flex-shrink-0 text-gray-400 dark:text-slate-500" />
                    <span>{advocate.contact}</span>
                  </div>
                </div>
                
                <div className="pt-5 border-t border-gray-100 dark:border-slate-800">
                  <div className="text-xs text-gray-500 dark:text-slate-400 mb-4 inline-flex w-full items-center">
                    <span className="font-bold text-gray-700 dark:text-slate-300 mr-2">Speaks:</span> {advocate.languages.join(', ')}
                  </div>
                  <button className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm shadow-sm group-hover:shadow-md">
                    Contact Advocate
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-16 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 border-dashed">
              No advocates found matching your search.
            </div>
          )}
        </div>
      )}

      {activeTab === 'legalaid' && (
        <div className="space-y-4">
          {filteredLegalAid.length > 0 ? filteredLegalAid.map((aid) => (
            <div key={aid.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-4 justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{aid.name}</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm mb-5 leading-relaxed max-w-3xl">{aid.description}</p>
                <div className="flex flex-wrap gap-4 text-sm font-semibold">
                  <div className="flex items-center text-gray-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-slate-700">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 dark:text-slate-400" />
                    {aid.location}
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-slate-700">
                    <Phone className="w-4 h-4 mr-2 text-gray-400 dark:text-slate-400" />
                    {aid.contact}
                  </div>
                  {aid.website && (
                    <a href={`https://${aid.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-lg transition-colors border border-blue-100 dark:border-blue-800/50">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {aid.website}
                    </a>
                  )}
                </div>
              </div>
              <button className="w-full md:w-auto bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-xl transition-colors text-sm whitespace-nowrap shadow-sm mt-2 md:mt-0">
                Seek Assistance
              </button>
            </div>
          )) : (
            <div className="py-16 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 border-dashed">
              No legal aid services found matching your search.
            </div>
          )}
        </div>
      )}

      {activeTab === 'verify' && (
        <div className="max-w-3xl mx-auto w-full">
          {isSubmitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-2xl p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-5">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-3">Application Submitted!</h3>
              <p className="text-green-700 dark:text-green-400/80 max-w-md font-medium">
                Your documents have been submitted for verification. You will be added to the national registry upon successful background checks.
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="mb-6 pb-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Advocate Verification</h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Submit your credentials to get a verified badge across India.</p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3.5 rounded-2xl hidden sm:block border border-indigo-100 dark:border-indigo-800/50">
                  <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>

              <form onSubmit={handleVerificationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Full Name</label>
                    <input type="text" required placeholder="Adv. First Last" className="w-full p-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Bar Association ID</label>
                    <input type="text" required placeholder="e.g. MAH/1234/2026" className="w-full p-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-gray-900 dark:text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Primary High Court / District</label>
                    <input type="text" required placeholder="e.g. Bombay High Court" className="w-full p-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Years of Experience</label>
                    <input type="number" required min="0" placeholder="e.g. 5" className="w-full p-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-gray-900 dark:text-white" />
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-5 flex items-center">
                    <Upload className="w-5 h-5 mr-2.5 text-gray-500 dark:text-slate-400" />
                    Document Uploads
                  </h4>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Aadhar Card Verification</label>
                      <input type="file" required accept="image/*,.pdf" className="block w-full text-sm text-gray-500 dark:text-slate-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 cursor-pointer transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Degree & Bar Council Certificate</label>
                      <input type="file" required multiple accept="image/*,.pdf" className="block w-full text-sm text-gray-500 dark:text-slate-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-indigo-50 dark:file:bg-indigo-900/30 file:text-indigo-700 dark:file:text-indigo-400 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/50 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-colors w-full sm:w-auto">
                    Submit Application for Verification
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
