"use client";

import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Save, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTrellis } from '@/contexts/TrellisContext';
import { dailyReflections } from '@/data/reflections';

export default function ReflectionsPage() {
  const router = useRouter();
  const { reflectionHistory, addReflection } = useTrellis();
  const [response, setResponse] = useState('');
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Get current date
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Calculate day of year for prompt cycling
  const dayOfYear = useMemo(() => {
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }, [now]);

  const currentPrompt = dailyReflections[dayOfYear % dailyReflections.length];

  const handleSave = () => {
    if (response.trim()) {
      addReflection({
        promptId: currentPrompt.id,
        promptText: currentPrompt.text,
        response: response.trim()
      });
      setIsSaved(true);
      setTimeout(() => {
        router.push('/journey');
      }, 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg font-sans text-trellis-text flex flex-col overflow-x-hidden">
      {/* Decorative Top Wash */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-trellis-primary/5 to-transparent pointer-events-none" />

      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex flex-col items-center relative z-10">
        <div className="w-full flex justify-between items-center mb-6">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-trellis-text-muted hover:text-trellis-text transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="w-10" />
        </div>
        
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-trellis-text-muted mb-2">Daily Reflection</span>
        <h2 className="text-sm font-medium text-trellis-text opacity-70">{dateStr}</h2>
        <div className="w-12 h-px bg-trellis-primary/30 mt-6" />
      </header>

      {/* Main Content - Centered Reflection */}
      <main className="flex-grow flex flex-col px-8 py-12 relative z-10">
        <div className="flex-grow flex flex-col justify-center items-center text-center animate-fade-in">
          <span className="text-[9px] uppercase tracking-widest font-bold text-trellis-text-muted/60 mb-6 px-3 py-1 border border-trellis-primary/10 rounded-full">
            {currentPrompt.category}
          </span>
          <h1 className="font-serif text-2xl md:text-3xl leading-snug text-trellis-text mb-12">
            {currentPrompt.text}
          </h1>
        </div>

        {/* Input Section */}
        <div className="mt-auto space-y-6">
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Write anything that comes up. This is just for you."
            className="w-full bg-white/40 border border-trellis-surface rounded-2xl p-5 text-sm focus:outline-none focus:ring-1 focus:ring-trellis-primary focus:bg-white/80 transition-all min-h-[120px] placeholder:text-trellis-text-muted/40 shadow-sm"
          />
          
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleSave}
              disabled={!response.trim() || isSaved}
              className={`w-full py-4 rounded-2xl font-semibold text-lg shadow-lg active:scale-[0.98] transition-all flex justify-center items-center gap-2 ${
                response.trim() && !isSaved 
                  ? "bg-trellis-accent text-white" 
                  : "bg-trellis-surface text-trellis-text-muted opacity-50 cursor-not-allowed"
              }`}
            >
              {isSaved ? 'Reflection Saved' : 'Save Reflection'}
              {!isSaved && <Save size={18} />}
            </button>
            
            <button 
              onClick={() => router.push('/journey')}
              className="text-xs text-trellis-text-muted hover:text-trellis-text transition-colors font-medium"
            >
              Skip for today
            </button>
            
            <p className="text-[10px] text-trellis-text-muted/50 text-center mt-2 leading-relaxed">
              Your reflections are private.<br />They are stored only on your device.
            </p>
          </div>
        </div>
      </main>

      {/* History Section (Collapsible) */}
      <section className="px-6 py-8 bg-trellis-surface/30 border-t border-trellis-surface relative z-10">
        <button 
          onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
          className="w-full flex items-center justify-between text-trellis-text-muted group"
        >
          <span className="text-xs font-bold uppercase tracking-wider">Previous reflections</span>
          {isHistoryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isHistoryExpanded && (
          <div className="mt-6 space-y-6 animate-slide-up">
            {reflectionHistory.length === 0 ? (
              <p className="text-xs text-trellis-text-muted italic py-4">Your reflections will appear here after you start.</p>
            ) : (
              reflectionHistory.map((entry) => (
                <div key={entry.id} className="bg-white/60 rounded-2xl p-4 border border-white shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-trellis-text-muted font-bold">
                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-xs font-serif italic text-trellis-text/70 line-clamp-1 mb-2 border-l-2 border-trellis-primary/20 pl-2">
                    {entry.promptText}
                  </p>
                  <p className="text-sm text-trellis-text leading-relaxed">
                    {entry.response}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 600ms ease-out forwards;
        }
      `}</style>
    </div>
  );
}
