import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Scale, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { IPC_SECTIONS } from '../data/ipcData';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Namaste. I am Vakeel AI, an assistant trained on the Indian Penal Code (IPC) and Indian legal processes. I can help you navigate the penal codes and find quick law points for your legal issues. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
      const systemInstruction = `You are Vakeel AI, an expert legal bot designed to navigate through the Indian Penal Code 1860 and help the user find quick law points. Provide concise, accurate legal points referencing the relevant IPC sections. Remember to state clearly that you are an AI, not a lawyer, and recommend consulting a registered advocate for binding advice. Here is a brief selection of the IPC index available: ${JSON.stringify(IPC_SECTIONS.map(s => s.section + ' ' + s.title))}. Keep responses structured and compassionate.`;

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

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[800px] border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm transition-colors duration-300">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-blue-900 dark:to-indigo-950 p-4 sm:p-5 flex items-center shadow-inner">
        <div className="bg-white/20 p-2.5 rounded-xl mr-4 backdrop-blur-sm border border-white/10">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-white text-lg">Vakeel Legal Assistant</h2>
          <p className="text-blue-100 text-xs sm:text-sm font-medium tracking-wide">Find quick law points and navigate the IPC</p>
        </div>
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-900/30 p-3 px-4 flex items-start text-xs text-amber-800 dark:text-amber-400">
        <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
        <p><strong>Disclaimer:</strong> Vakeel AI provides general legal information, not binding legal advice. Always consult a verified advocate in the Directory for specific issues.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950/50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[90%] sm:max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm ${message.role === 'user' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 ml-3' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 mr-3'}`}>
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm ${
                message.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                  : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-tl-none shadow-sm'
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
              <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 mr-3 shadow-sm">
                <Scale className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm flex space-x-2 items-center">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="E.g., What is section 420? How to file an FIR?"
            className="w-full pl-5 pr-14 py-3.5 bg-gray-50 dark:bg-slate-800 border-transparent dark:text-slate-100 border focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 rounded-2xl transition-all outline-none shadow-inner"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:text-gray-500 text-white rounded-xl shadow-sm transition-all hover:shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
