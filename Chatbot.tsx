
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Shield, ExternalLink, Loader2, Bot } from 'lucide-react';
import { chatWithAssistant } from '../services/gemini';
import { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: "Hello! I'm your SAFECLICK Assistant. I can help you with questions about social engineering, cyber laws, or how to report a security incident. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await chatWithAssistant(input, messages);
      const botMessage: ChatMessage = {
        role: 'model',
        content: result.text || "I'm sorry, I couldn't process that request.",
        links: result.links,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[100] p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-red-500 text-white rotate-90' : 'bg-blue-600 text-white'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-[100] w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col glass rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 bg-blue-600 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">SAFECLICK AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-blue-100 font-medium uppercase tracking-widest">Active Search Grounding</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sources & Resources:</p>
                      {msg.links.slice(0, 3).map((link, idx) => (
                        <a 
                          key={idx}
                          href={link.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="line-clamp-1">{link.title}</span>
                        </a>
                      ))}
                    </div>
                  )}
                  
                  <span className={`text-[10px] block mt-1 opacity-50 ${msg.role === 'user' ? 'text-right' : ''}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-xs text-slate-500 font-medium">Assistant is searching...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about phishing, laws, reporting..."
                className="flex-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
