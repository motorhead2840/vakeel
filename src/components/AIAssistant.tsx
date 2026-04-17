import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Scale, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

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
      content: 'Namaste. I am Vakeel AI, an assistant trained on the Indian Penal Code (IPC) and Indian legal processes. How can I help you understand your legal rights or navigate an issue today?'
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
      
      // Formatting previous messages for the conversation context
      // The SDK generationContent can accept a string, but for history we should ideally use ai.chats.create
      // Let's use the chat session approach
      
      const chat = ai.chats.create({
        model: 'gemini-3.1-pro-preview',
        config: {
          systemInstruction: 'You are Vakeel AI, a helpful, respectful, and highly knowledgeable legal assistant for Indian citizens. You are an expert in the Indian Penal Code (IPC), Code of Criminal Procedure (CrPC), Indian Constitution, and general Indian legal processes. Your goal is to educate users about their rights, explain legal concepts in simple, accessible language, and guide them on procedural steps (like how to file an FIR, what to expect in a consumer court, etc.). IMPORTANT: You MUST state that you are an AI, not a qualified lawyer, and your advice is for informational purposes only and does not constitute formal legal counsel. Always recommend consulting a registered advocate for binding legal advice. Keep your answers concise, structured, and compassionate.',
          temperature: 0.3,
        }
      });

      // To maintain history in this simple setup without managing Chat session state across renders,
      // we'll pass the entire conversation history as part of the prompt, or just rely on single-turn for now with history text.
      // Better way: build a single string of the conversation history.
      const conversationHistory = messages.map(m => `${m.role === 'user' ? 'Citizen' : 'Vakeel AI'}: ${m.content}`).join('\n\n');
      const prompt = `Here is the conversation history:\n${conversationHistory}\n\nCitizen: ${userMessage.content}\n\nVakeel AI (Respond to the citizen based on the instructions):`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          systemInstruction: 'You are Vakeel AI, a helpful, respectful, and highly knowledgeable legal assistant for Indian citizens. You are an expert in the Indian Penal Code (IPC), Code of Criminal Procedure (CrPC), Indian Constitution, and general Indian legal processes. Your goal is to educate users about their rights, explain legal concepts in simple, accessible language, and guide them on procedural steps (like how to file an FIR, what to expect in a consumer court, etc.). IMPORTANT: You MUST state that you are an AI, not a qualified lawyer, and your advice is for informational purposes only and does not constitute formal legal counsel. Always recommend consulting a registered advocate for binding legal advice. Keep your answers concise, structured, and compassionate.',
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
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[800px] border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="bg-orange-50 border-b border-orange-100 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-orange-500 p-2 rounded-lg mr-3">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Vakeel AI Assistant</h2>
            <p className="text-xs text-slate-500">Trained on IPC & Indian Legal Framework</p>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 border-b border-yellow-100 p-2 px-4 flex items-start text-xs text-yellow-800">
        <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
        <p><strong>Disclaimer:</strong> Vakeel AI provides general legal information, not binding legal advice. Always consult a certified advocate for specific legal issues.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-indigo-100 text-indigo-700 ml-3' : 'bg-orange-100 text-orange-700 mr-3'}`}>
                {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm ${
                message.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
              }`}>
                {/* Basic markdown rendering can be added here, for now using whitespace-pre-wrap */}
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
              <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-orange-100 text-orange-700 mr-3">
                <Bot className="w-5 h-5" />
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

      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask about legal rights, FIR process, property laws..."
            className="w-full pl-4 pr-12 py-3 bg-gray-100 border-transparent focus:bg-white border focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
