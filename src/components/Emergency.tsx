import React from 'react';
import { Phone, AlertTriangle, ShieldAlert, HeartPulse, Shield } from 'lucide-react';

export default function Emergency() {
  const EMERGENCY_CONTACTS = [
    { name: 'National Emergency', number: '112', icon: AlertTriangle, color: 'bg-red-500' },
    { name: 'Police', number: '100', icon: ShieldAlert, color: 'bg-blue-600' },
    { name: 'Women Helpline', number: '1091', icon: Shield, color: 'bg-pink-500' },
    { name: 'Ambulance', number: '108', icon: HeartPulse, color: 'bg-green-500' },
    { name: 'Cyber Crime Helpline', number: '1930', icon: Shield, color: 'bg-indigo-500' },
    { name: 'Legal Services Authority', number: '15100', icon: Phone, color: 'bg-orange-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
        <h2 className="text-2xl font-bold text-red-800 mb-2 flex items-center">
          <AlertTriangle className="mr-2" />
          Emergency Legal & Protection Services
        </h2>
        <p className="text-red-700 font-medium">
          If you are in immediate danger, facing domestic violence, or require urgent police intervention, please call the specific helplines below immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6 w-full">
        {EMERGENCY_CONTACTS.map((contact, idx) => (
          <a 
            key={idx}
            href={`tel:${contact.number}`}
            className="flex items-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all group"
          >
            <div className={`${contact.color} text-white p-4 rounded-full mr-5 group-hover:scale-110 transition-transform`}>
              <contact.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">{contact.name}</p>
              <p className="text-3xl font-black text-gray-900">{contact.number}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-4">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">What to do in an emergency</h3>
        <ul className="space-y-3 list-decimal list-inside text-gray-700">
          <li className="leading-relaxed"><strong>Stay Calm & Find Safety:</strong> Move to a safe location if you are in physical danger.</li>
          <li className="leading-relaxed"><strong>Call 112:</strong> Use the Pan-India emergency number for immediate dispatch of police, ambulance, or fire services.</li>
          <li className="leading-relaxed"><strong>Do not tamper with evidence:</strong> In case of a crime, do not touch or clean the scene until local authorities arrive.</li>
          <li className="leading-relaxed"><strong>Request Legal Aid:</strong> Ask the police for access to a duty counsel or Legal Services Authority if you are arrested and cannot afford a lawyer.</li>
        </ul>
      </div>
    </div>
  );
}
