"use client";

import React, { useState } from 'react';
import { X, Check, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTherapy } from '@/contexts/TherapyContext';

export default function FeedbackPage() {
  const router = useRouter();
  const { addFeedback } = useTherapy();
  const [submitted, setSubmitted] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({
    relationship: 0,
    goals: 0,
    approach: 0
  });

  const handleRate = (category: string, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = () => {
    const total = ratings.relationship + ratings.goals + ratings.approach;
    addFeedback(total);
    setSubmitted(true);
  };

  const isFormValid = ratings.relationship > 0 && ratings.goals > 0 && ratings.approach > 0;

  if (submitted) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-therapy-bg flex flex-col items-center justify-center px-8 text-center">
        <div className="animate-breathe mb-8">
          <div className="w-24 h-24 bg-therapy-primary/10 rounded-full flex items-center justify-center">
            <Check className="text-therapy-primary w-12 h-12" strokeWidth={3} />
          </div>
        </div>
        <h1 className="font-serif text-3xl text-therapy-text leading-tight">
          Feedback Logged
        </h1>
        <p className="text-therapy-text-muted mt-6 leading-relaxed">
          Your algorithm weights have been updated. This ensures your matches stay precise.
        </p>
        <button 
          onClick={() => router.push('/journey')}
          className="mt-12 bg-therapy-primary-deep text-white px-8 py-4 rounded-2xl font-semibold shadow-lg active:scale-[0.98] transition-all"
        >
          Back to Journey
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-therapy-bg font-sans text-therapy-text pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-therapy-text-muted hover:text-therapy-text transition-colors"
        >
          <X size={24} />
        </button>
        <h1 className="font-serif text-lg">Session Feedback</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="px-6 animate-breathe">
        <h2 className="font-serif text-3xl text-therapy-text leading-tight mt-4">
          How was your session today?
        </h2>
        <p className="text-therapy-text-muted mt-3 mb-10 text-sm leading-relaxed font-medium">
          Honesty helps. Your therapist uses this to adjust their approach, and our algorithm uses it to measure fit.
        </p>

        <div className="space-y-12">
          {/* Relationship */}
          <div className="space-y-5">
            <div>
              <p className="text-base font-semibold">Relationship</p>
              <p className="text-xs text-therapy-text-muted mt-1 italic">Did you feel heard, understood, and respected?</p>
            </div>
            <div className="flex justify-between items-center bg-therapy-surface p-2 rounded-2xl border border-therapy-primary/5">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleRate('relationship', val)}
                  className={`w-12 h-12 rounded-xl text-sm font-bold transition-all duration-300 ${
                    ratings.relationship === val
                      ? "bg-therapy-primary-deep text-white shadow-md scale-110"
                      : "bg-white/50 text-therapy-text-muted hover:bg-white"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="space-y-5">
            <div>
              <p className="text-base font-semibold">Goals and Topics</p>
              <p className="text-xs text-therapy-text-muted mt-1 italic">Did you work on what you wanted to work on?</p>
            </div>
            <div className="flex justify-between items-center bg-therapy-surface p-2 rounded-2xl border border-therapy-primary/5">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleRate('goals', val)}
                  className={`w-12 h-12 rounded-xl text-sm font-bold transition-all duration-300 ${
                    ratings.goals === val
                      ? "bg-therapy-primary-deep text-white shadow-md scale-110"
                      : "bg-white/50 text-therapy-text-muted hover:bg-white"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Approach */}
          <div className="space-y-5">
            <div>
              <p className="text-base font-semibold">Approach or Method</p>
              <p className="text-xs text-therapy-text-muted mt-1 italic">Did the therapist&apos;s approach make sense to you?</p>
            </div>
            <div className="flex justify-between items-center bg-therapy-surface p-2 rounded-2xl border border-therapy-primary/5">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleRate('approach', val)}
                  className={`w-12 h-12 rounded-xl text-sm font-bold transition-all duration-300 ${
                    ratings.approach === val
                      ? "bg-therapy-primary-deep text-white shadow-md scale-110"
                      : "bg-white/50 text-therapy-text-muted hover:bg-white"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-therapy-bg/95 backdrop-blur-md border-t border-therapy-surface p-6 pb-10 z-50">
        <button
          disabled={!isFormValid}
          onClick={handleSubmit}
          className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
            isFormValid
              ? "bg-therapy-primary-deep text-white shadow-lg active:scale-[0.98]"
              : "bg-therapy-surface text-therapy-text-muted cursor-not-allowed opacity-50"
          }`}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
