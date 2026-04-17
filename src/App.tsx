import React, { useState } from 'react';
import { Scale, Search, MessageSquare, AlertCircle, BookOpen, Menu, X, Library } from 'lucide-react';
import Directory from './components/Directory';
import AIAssistant from './components/AIAssistant';
import CommunityForum from './components/CommunityForum';
import Emergency from './components/Emergency';
import IPCIndex from './components/IPCIndex';

export default function App() {
  const [activeTab, setActiveTab] = useState<'directory' | 'ai' | 'forum' | 'emergency' | 'ipc'>('ipc');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ tab, icon: Icon, label, alert = false }: { tab: any, icon: any, label: string, alert?: boolean }) => {
    const isActive = activeTab === tab;
    return (
      <button
        onClick={() => {
          setActiveTab(tab);
          setMobileMenuOpen(false);
        }}
        className={`flex items-center w-full px-4 py-3 rounded-lg font-medium transition-colors ${
          isActive 
            ? (alert ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700') 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <Icon className={`w-5 h-5 mr-3 ${isActive ? (alert ? 'text-red-600' : 'text-orange-600') : 'text-gray-400'}`} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center text-orange-600 font-bold text-xl">
          <Scale className="w-6 h-6 mr-2" />
          Vakeel
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className={`${
        mobileMenuOpen ? 'flex' : 'hidden'
      } md:flex flex-col w-full md:w-64 bg-white border-r border-gray-200 p-4 fixed md:sticky top-[61px] md:top-0 h-[calc(100vh-61px)] md:h-screen z-10`}
      >
        <div className="hidden md:flex items-center text-orange-600 font-bold text-2xl mb-8 px-2 pt-2">
          <Scale className="w-8 h-8 mr-2" />
          Vakeel
        </div>

        <div className="space-y-2 flex-1">
          <NavItem tab="ipc" icon={Library} label="IPC Reference" />
          <NavItem tab="directory" icon={Search} label="Advocate Directory" />
          <NavItem tab="ai" icon={BookOpen} label="AI Legal Assistant" />
          <NavItem tab="forum" icon={MessageSquare} label="Citizen Forum" />
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <NavItem tab="emergency" icon={AlertCircle} label="Emergency Services" alert={true} />
        </div>
        
        <div className="mt-auto text-xs text-gray-400 px-4 pb-2 pt-6">
          © 2026 Vakeel Legal Guide
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 overflow-y-auto">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'ipc' && <IPCIndex />}
          {activeTab === 'directory' && <Directory />}
          {activeTab === 'ai' && <AIAssistant />}
          {activeTab === 'forum' && <CommunityForum />}
          {activeTab === 'emergency' && <Emergency />}
        </div>
      </main>
    </div>
  );
}
