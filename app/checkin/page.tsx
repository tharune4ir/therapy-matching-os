"use client";

import React, { useState, useMemo } from 'react';
import { X, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTrellis } from '@/contexts/TrellisContext';
import { getORSInterpretation } from '@/lib/clinical';

interface ORSItemProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  leftAnchor: string;
  rightAnchor: string;
  helper: string;
}

const ORSItem = ({ label, value, onChange, leftAnchor, rightAnchor, helper }: ORSItemProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <label className="text-base font-semibold text-trellis-text">{label}</label>
        <span className="text-sm font-bold text-trellis-primary-deep bg-trellis-primary/10 px-2 py-0.5 rounded-md">
          {value.toFixed(1)}
        </span>
      </div>
      
      <div className="relative pt-2 pb-6">
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-trellis-surface rounded-lg appearance-none cursor-pointer accent-trellis-primary transition-all"
          style={{
            background: `linear-gradient(to right, #7A9E7E ${value * 10}%, #E8E2D2 ${value * 10}%)`
          }}
        />
        <div className="flex justify-between mt-3 px-0.5">
          <span className="text-[10px] uppercase tracking-wider font-bold text-trellis-text-muted">{leftAnchor}</span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-trellis-text-muted">{rightAnchor}</span>
        </div>
      </div>
      
      <p className="text-xs text-[#6F756F] leading-relaxed italic">{helper}</p>
    </div>
  );
};

export default function CheckinPage() {
  const router = useRouter();
  const { addORS } = useTrellis();
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState({
    personal: 5,
    interpersonal: 5,
    social: 5,
    overall: 5
  });

  const total = useMemo(() => {
    return Object.values(scores).reduce((acc, curr) => acc + curr, 0);
  }, [scores]);

  const interpretation = useMemo(() => getORSInterpretation(total), [total]);

  const handleSubmit = () => {
    addORS({
      ...scores,
      total
    });
    setSubmitted(true);
    setTimeout(() => {
      router.push('/journey');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-trellis-bg flex flex-col items-center justify-center px-8 text-center">
        <div className="animate-breathe mb-8">
          <div className="w-24 h-24 bg-trellis-primary/10 rounded-full flex items-center justify-center">
            <Check className="text-trellis-primary w-12 h-12" strokeWidth={3} />
          </div>
        </div>
        <h1 className="font-serif text-3xl text-trellis-text leading-tight">
          Check-in Saved
        </h1>
        <p className="text-trellis-text-muted mt-6 leading-relaxed">
          Your therapist has been notified of your current well-being. Heading to your journey...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg font-sans text-trellis-text pb-40">
      <header className="flex items-center justify-between px-6 py-6 sticky top-0 bg-trellis-bg/80 backdrop-blur-md z-40">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-trellis-text-muted hover:text-trellis-text transition-colors"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest font-bold text-trellis-primary mb-0.5">Pre-Session Check-In</span>
          <h1 className="font-serif text-lg leading-none">How are you doing?</h1>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="px-6 animate-breathe">
        <div className="mt-4 mb-10">
          <h2 className="font-serif text-3xl text-trellis-text leading-tight">
            Check in with yourself
          </h2>
          <p className="text-trellis-text-muted mt-3 text-sm leading-relaxed font-medium">
            Take a moment before your session. This helps your therapist understand where you are right now, and helps us track if therapy is working over time.
          </p>
        </div>

        <div className="space-y-12">
          <ORSItem
            label="Personal Well-being"
            value={scores.personal}
            onChange={(v) => setScores(s => ({ ...s, personal: v }))}
            leftAnchor="I am struggling"
            rightAnchor="I am doing well"
            helper="How are you feeling within yourself? Your mood, energy, sense of self."
          />

          <ORSItem
            label="Close Relationships"
            value={scores.interpersonal}
            onChange={(v) => setScores(s => ({ ...s, interpersonal: v }))}
            leftAnchor="Not going well"
            rightAnchor="Going well"
            helper="How are things with the people closest to you? Partner, family, close friends."
          />

          <ORSItem
            label="Work & Social Life"
            value={scores.social}
            onChange={(v) => setScores(s => ({ ...s, social: v }))}
            leftAnchor="Not going well"
            rightAnchor="Going well"
            helper="How are things at work, in your daily responsibilities, and with people you interact with regularly?"
          />

          <ORSItem
            label="Overall"
            value={scores.overall}
            onChange={(v) => setScores(s => ({ ...s, overall: v }))}
            leftAnchor="Everything feels hard"
            rightAnchor="Things are good"
            helper="Taking everything together, how would you rate your overall sense of well-being right now?"
          />
        </div>

        {/* Score Display */}
        <div className="mt-16 p-6 bg-white rounded-3xl border border-trellis-primary/10 shadow-sm animate-breathe">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-trellis-text-muted">Total Score</span>
            <span className="text-xl font-serif text-trellis-primary-deep">{total.toFixed(0)} / 40</span>
          </div>
          <p className="text-sm leading-relaxed text-trellis-text font-medium italic">
            &quot;{interpretation}&quot;
          </p>
        </div>
      </main>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-trellis-bg/95 backdrop-blur-md border-t border-trellis-surface p-6 pb-10 z-50">
        <button
          onClick={handleSubmit}
          className="w-full bg-trellis-primary-deep text-white py-4 rounded-2xl text-lg font-semibold shadow-lg active:scale-[0.98] transition-all"
        >
          Save & head to session
        </button>
      </div>

      <style jsx global>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #D4A574;
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
        }
        input[type='range']::-webkit-slider-thumb:active {
          transform: scale(1.2);
          background: #7A9E7E;
        }
        input[type='range']::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #D4A574;
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
}
