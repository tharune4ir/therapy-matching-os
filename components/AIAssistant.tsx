"use client";

import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi there! I'm the Therapy Matching OS Guide. I can help you understand how our clinical matching works or guide you through the onboarding. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "That's a great question. Our engine uses 28 specific variables including modality alignment and therapeutic bond scores to ensure you find the right fit. Would you like to start the onboarding to see your matches?" 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[80px] right-6 w-14 h-14 bg-therapy-primary-deep text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all group"
      >
        <Bot size={28} className="group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-therapy-accent rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center px-4 pb-32 sm:pb-8 sm:justify-end sm:px-6 pointer-events-none">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-therapy-primary/10 flex flex-col pointer-events-auto animate-slide-up h-[500px] overflow-hidden">
            {/* Header */}
            <div className="p-5 bg-therapy-primary-deep text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg leading-none">Therapy Matching OS Guide</h3>
                  <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold mt-1">Intelligent Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4 bg-therapy-bg/30">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-therapy-primary-deep text-white rounded-tr-none' 
                      : 'bg-white text-therapy-text border border-therapy-primary/5 shadow-sm rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-therapy-surface">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-grow bg-therapy-surface border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-therapy-primary outline-none"
                />
                <button 
                  onClick={handleSend}
                  className="w-12 h-12 bg-therapy-primary text-white rounded-xl flex items-center justify-center hover:bg-therapy-primary-deep transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
