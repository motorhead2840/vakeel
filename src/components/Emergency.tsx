import React from 'react';
import { Phone, AlertTriangle, ShieldAlert, HeartPulse, Shield } from 'lucide-react';

export default function Emergency() {
  const EMERGENCY_CONTACTS = [
    { name: 'National Emergency', number: '112', icon: AlertTriangle, color: 'bg-red-500' },
    { name: 'Police', number: '100', icon: ShieldAlert, color: 'bg-blue-600 dark:bg-blue-700' },
    { name: 'Women Helpline', number: '1091', icon: Shield, color: 'bg-pink-500 dark:bg-pink-600' },
    { name: 'Ambulance', number: '108', icon: HeartPulse, color: 'bg-emerald-500 dark:bg-emerald-600' },
    { name: 'Cyber Crime Helpline', number: '1930', icon: Shield, color: 'bg-indigo-500 dark:bg-indigo-600' },
    { name: 'Legal Services Authority', number: '15100', icon: Phone, color: 'bg-orange-500 dark:bg-orange-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 transition-colors duration-300">
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-2 flex items-center">
          <AlertTriangle className="mr-2" />
          Emergency Legal & Protection Services
        </h2>
        <p className="text-red-700 dark:text-red-300/90 font-semibold leading-relaxed">
          If you are in immediate danger, facing domestic violence, or require urgent police intervention, please call the specific helplines below immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6 w-full">
        {EMERGENCY_CONTACTS.map((contact, idx) => (
          <a 
            key={idx}
            href={`tel:${contact.number}`}
            className="flex items-center p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-slate-600 transition-all group"
          >
            <div className={`${contact.color} text-white p-4 rounded-xl mr-5 group-hover:scale-110 transition-transform shadow-sm`}>
              <contact.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">{contact.name}</p>
              <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{contact.number}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm mt-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">What to do in an emergency</h3>
        <ul className="space-y-4 list-decimal list-inside text-gray-700 dark:text-slate-300">
          <li className="leading-relaxed pl-2"><strong className="text-gray-900 dark:text-white">Stay Calm & Find Safety:</strong> Move to a safe location if you are in physical danger.</li>
          <li className="leading-relaxed pl-2"><strong className="text-gray-900 dark:text-white">Call 112:</strong> Use the Pan-India emergency number for immediate dispatch of police, ambulance, or fire services.</li>
          <li className="leading-relaxed pl-2"><strong className="text-gray-900 dark:text-white">Do not tamper with evidence:</strong> In case of a crime, do not touch or clean the scene until local authorities arrive.</li>
          <li className="leading-relaxed pl-2"><strong className="text-gray-900 dark:text-white">Request Legal Aid:</strong> Ask the police for access to a duty counsel or Legal Services Authority if you are arrested and cannot afford a lawyer.</li>
        </ul>
      </div>
    </div>
  );
}
