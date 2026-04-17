import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Scale, AlertCircle, Book, ArrowRight, Search, FileText } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { IPC_SECTIONS } from '../data/ipcData';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function LegalAdviceIndex() {
  const [activeTab, setActiveTab] = useState<'chat' | 'index'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Namaste. I am Vakeel AI, an assistant trained on the Indian Penal Code (IPC) and Indian legal processes. I can help you navigate the penal codes and find quick law points for your legal issues. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isLoading, activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("API Key is missing");
      }
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `You are Vakeel AI, an expert legal bot designed to navigate through the index of the Indian Penal Code 1860 and help the user find quick law points. Provide concise, accurate legal points referencing the relevant IPC sections. Remember to state clearly that you are an AI, not a lawyer, and recommend consulting a registered advocate for binding advice. Here is a brief selection of the IPC index available: ${JSON.stringify(IPC_SECTIONS.map(s => s.section + ' ' + s.title))}. Keep responses structured and compassionate.`;

      const conversationHistory = messages.map(m => `${m.role === 'user' ? 'Citizen' : 'Vakeel AI'}: ${m.content}`).join('\n\n');
      const prompt = `Conversation history:\n${conversationHistory}\n\nCitizen: ${userMessage.content}\n\nVakeel AI:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.3,
        }
      });

      const text = response.text;
      
      if (text) {
         setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: text
          }]);
      } else {
        throw new Error('No response text');
      }

    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I am currently facing technical difficulties connecting to the legal database. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSections = IPC_SECTIONS.filter(section => 
    section.section.toLowerCase().includes(searchTerm.toLowerCase()) || 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-140px)] max-h-[800px]">
      
      {/* Sidebar for smaller screens, toggle tabs */}
      <div className="bg-white border text-sm font-medium border-gray-200 rounded-xl flex overflow-hidden shadow-sm xl:hidden shrink-0">
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 text-center ${activeTab === 'chat' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          AI Legal Chatbot
        </button>
        <div className="w-px bg-gray-200"></div>
        <button 
          onClick={() => setActiveTab('index')}
          className={`flex-1 py-3 text-center ${activeTab === 'index' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          Penal Code Index
        </button>
      </div>

      {/* Left Panel: Chat Interface */}
      <div className={`${activeTab === 'chat' ? 'flex' : 'hidden'} xl:flex flex-col flex-1 border border-gray-200 bg-white rounded-2xl overflow-hidden shadow-sm h-full`}>
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 sm:p-5 flex items-center shadow-inner">
          <div className="bg-white/20 p-2.5 rounded-xl mr-4 backdrop-blur-sm border border-white/10">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">Vakeel Legal Chatbot</h2>
            <p className="text-blue-100 text-xs sm:text-sm font-medium tracking-wide">Find quick law points and navigate the IPC</p>
          </div>
        </div>
        
        <div className="bg-amber-50 border-b border-amber-100 p-2 sm:p-3 px-4 flex items-start text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          <p><strong>Disclaimer:</strong> Vakeel AI provides general legal information, not binding legal advice. Always consult a verified advocate in the Directory for specific issues.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[90%] sm:max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm ${message.role === 'user' ? 'bg-indigo-100 text-indigo-700 ml-3' : 'bg-blue-100 text-blue-700 mr-3'}`}>
                  {message.role === 'user' ? <User className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm ${
                  message.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                }`}>
                  <div className="whitespace-pre-wrap font-sans leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%]">
                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 mr-3 shadow-sm">
                  <Scale className="w-4 h-4" />
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="E.g., What is section 420? How to file an FIR?"
              className="w-full pl-5 pr-14 py-3.5 bg-gray-50 border-transparent border focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-2xl transition-all outline-none shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl shadow-sm transition-all hover:shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel: Official IPC Index Search */}
      <div className={`${activeTab === 'index' ? 'flex' : 'hidden'} xl:flex flex-col w-full xl:w-[450px] border border-gray-200 bg-white rounded-2xl overflow-hidden shadow-sm h-full`}>
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-bold text-gray-900 flex items-center mb-1">
            <Book className="w-5 h-5 mr-2 text-blue-600" />
            Penal Code Index
          </h2>
          <p className="text-xs text-gray-500 mb-4">Official sections generated from IPC 1860 document.</p>
          
          <div className="relative w-full text-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-shadow outline-none"
              placeholder="Search sections (e.g. Theft, 498A)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 p-2">
          {filteredSections.length > 0 ? (
            filteredSections.map((item, index) => (
              <div key={index} className="p-4 hover:bg-blue-50/50 transition-colors rounded-xl m-1 group cursor-pointer border border-transparent hover:border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold rounded-md whitespace-nowrap">
                    {item.section}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm truncate">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">{item.description}</p>
                <div className="mt-3 flex items-center justify-end text-blue-600 text-xs font-semibold group-hover:text-blue-800 transition-colors">
                  Ask Chatbot <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center">
              <FileText className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-sm">No sections found.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
