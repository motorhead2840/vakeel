import React, { useState } from 'react';
import { Scale, Search, Newspaper, HelpCircle, AlertCircle, Menu, X, BookOpenText, Bot } from 'lucide-react';
import Directory from './components/Directory';
import AIAssistant from './components/AIAssistant';
import IPCIndex from './components/IPCIndex';
import NewsUpdates from './components/NewsUpdates';
import FAQ from './components/FAQ';
import Emergency from './components/Emergency';

export default function App() {
  const [activeTab, setActiveTab] = useState<'assistant' | 'ipc' | 'directory' | 'news' | 'faq' | 'emergency'>('assistant');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ tab, icon: Icon, label, alert = false }: { tab: any, icon: any, label: string, alert?: boolean }) => {
    const isActive = activeTab === tab;
    return (
      <button
        onClick={() => {
          setActiveTab(tab);
          setMobileMenuOpen(false);
        }}
        className={`flex items-center w-full px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
          isActive 
            ? (alert ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 shadow-sm' : 'bg-blue-500 text-white shadow-md hover:bg-blue-600') 
            : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-100'
        }`}
      >
        <Icon className={`w-5 h-5 mr-3 ${isActive ? (alert ? 'text-red-600 dark:text-red-400' : 'text-white') : 'text-gray-500 dark:text-slate-500'}`} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col md:flex-row font-sans text-gray-800 dark:text-slate-200 transition-colors duration-300">
      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 p-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center text-blue-800 dark:text-blue-400 font-black text-2xl tracking-tight">
          <Scale className="w-7 h-7 mr-2 text-blue-600 dark:text-blue-500" />
          Vakeel
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 dark:text-slate-400 p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className={`${
        mobileMenuOpen ? 'flex' : 'hidden'
      } md:flex flex-col w-full md:w-[280px] bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 p-5 fixed md:sticky top-[69px] md:top-0 h-[calc(100vh-69px)] md:h-screen z-10 transition-colors duration-300`}
      >
        <div className="hidden md:flex items-center text-blue-900 dark:text-blue-400 font-black text-3xl mb-10 px-2 pt-4 tracking-tight">
          <Scale className="w-9 h-9 mr-2.5 text-blue-600 dark:text-blue-500" />
          Vakeel
        </div>

        <div className="space-y-1.5 flex-1 overflow-y-auto">
          <NavItem tab="assistant" icon={Bot} label="Vakeel Assistant" />
          <NavItem tab="ipc" icon={BookOpenText} label="Penal Code Index" />
          <NavItem tab="directory" icon={Search} label="Advocates & Aid" />
          <NavItem tab="news" icon={Newspaper} label="News & Updates" />
          <NavItem tab="faq" icon={HelpCircle} label="FAQ" />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
          <NavItem tab="emergency" icon={AlertCircle} label="Emergency Help" alert={true} />
        </div>
        
        <div className="mt-auto text-[11px] font-medium text-gray-400 dark:text-slate-500 px-4 pb-2 pt-8 uppercase tracking-wider text-center">
          © 2026 Vakeel Legal Platform
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 lg:p-10 overflow-y-auto">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          {activeTab === 'assistant' && <AIAssistant />}
          {activeTab === 'ipc' && <IPCIndex />}
          {activeTab === 'directory' && <Directory />}
          {activeTab === 'news' && <NewsUpdates />}
          {activeTab === 'faq' && <FAQ />}
          {activeTab === 'emergency' && <Emergency />}
        </div>
      </main>
    </div>
  );
}
