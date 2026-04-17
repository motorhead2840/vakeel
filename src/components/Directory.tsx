import React, { useState } from 'react';
import { Search, MapPin, Phone, Star, Shield, ExternalLink, FileText, Upload, CheckCircle } from 'lucide-react';
import { MOCK_ADVOCATES, MOCK_LEGAL_AID } from '../constants';
import { Advocate, LegalAidService } from '../types';

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
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Advocates & Legal Aid Directory</h2>
        <p className="text-gray-600">Find trusted advocates, free legal aid services, or apply for national verification.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
        <div className="relative w-full xl:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm"
            placeholder="Search by name, specialty, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex rounded-lg shadow-sm w-full xl:w-auto overflow-hidden border border-gray-300 bg-white">
          <button
            onClick={() => setActiveTab('advocates')}
            className={`flex-1 xl:flex-none px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'advocates' 
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50 border-b-2 border-transparent'
            }`}
          >
            Advocates
          </button>
          <div className="w-px bg-gray-200" />
          <button
            onClick={() => setActiveTab('legalaid')}
            className={`flex-1 xl:flex-none px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'legalaid' 
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50 border-b-2 border-transparent'
            }`}
          >
            Legal Aid
          </button>
          <div className="w-px bg-gray-200" />
          <button
            onClick={() => setActiveTab('verify')}
            className={`flex-1 xl:flex-none px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'verify' 
                ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' 
                : 'text-indigo-600 hover:bg-indigo-50/50 border-b-2 border-transparent'
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
            <div key={advocate.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">{advocate.name}</h3>
                      <Shield className="w-4 h-4 text-blue-500 fill-current" title="Verified Advocate" />
                    </div>
                    <p className="text-sm text-gray-500">{advocate.experienceYears} Years Experience</p>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-sm font-medium text-yellow-700 border border-yellow-100">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    {advocate.rating}
                  </div>
                </div>
                
                <div className="space-y-3 mb-5">
                  <div className="flex items-start text-sm text-gray-600">
                    <FileText className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
                    <div className="flex flex-wrap gap-1.5">
                      {advocate.specialty.map((s, idx) => (
                        <span key={idx} className="bg-blue-50 border border-blue-100 text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
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
                  <div className="text-xs text-gray-500 mb-4 inline-flex w-full items-center">
                    <span className="font-semibold text-gray-700 mr-2">Speaks:</span> {advocate.languages.join(', ')}
                  </div>
                  <button className="w-full bg-slate-900 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm">
                    Contact Advocate
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 border-dashed">
              No advocates found matching your search.
            </div>
          )}
        </div>
      )}

      {activeTab === 'legalaid' && (
        <div className="space-y-4">
          {filteredLegalAid.length > 0 ? filteredLegalAid.map((aid) => (
            <div key={aid.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-4 justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{aid.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed max-w-3xl">{aid.description}</p>
                <div className="flex flex-wrap gap-4 text-sm font-medium">
                  <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {aid.location}
                  </div>
                  <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    {aid.contact}
                  </div>
                  {aid.website && (
                    <a href={`https://${aid.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {aid.website}
                    </a>
                  )}
                </div>
              </div>
              <button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-xl transition-colors text-sm whitespace-nowrap shadow-sm mt-2 md:mt-0">
                Seek Assistance
              </button>
            </div>
          )) : (
            <div className="py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 border-dashed">
              No legal aid services found matching your search.
            </div>
          )}
        </div>
      )}

      {activeTab === 'verify' && (
        <div className="max-w-3xl mx-auto w-full">
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Application Submitted!</h3>
              <p className="text-green-700 max-w-md">
                Your documents have been submitted for verification. You will be added to the national registry upon successful background checks.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="mb-6 pb-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Advocate Verification</h3>
                  <p className="text-sm text-gray-500">Submit your credentials to get a verified badge across India.</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-full hidden sm:block">
                  <Shield className="w-8 h-8 text-indigo-600" />
                </div>
              </div>

              <form onSubmit={handleVerificationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                    <input type="text" required placeholder="Adv. First Last" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-shadow outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bar Association ID Number</label>
                    <input type="text" required placeholder="e.g. MAH/1234/2026" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-shadow outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Primary High Court / District</label>
                    <input type="text" required placeholder="e.g. Bombay High Court" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-shadow outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Years of Experience</label>
                    <input type="number" required placeholder="e.g. 5" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-shadow outline-none" />
                  </div>
                </div>

                <div className="border border-dashed border-gray-300 bg-gray-50 rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <Upload className="w-4 h-4 mr-2 text-gray-500" />
                    Document Uploads
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Aadhar Card Verification</label>
                      <input type="file" required accept="image/*,.pdf" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Degree & Bar Council Certificate</label>
                      <input type="file" required multiple accept="image/*,.pdf" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-colors w-full sm:w-auto">
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
