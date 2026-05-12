"use client";

import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ComparePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Optimizing for the Alliance",
      stat: "~8%",
      subtitle: "of therapy outcome variance is driven by the therapeutic alliance.",
      body: "Most directories optimize for availability or price. Therapy Matching OS optimizes for the bond. The therapeutic alliance is the single most replicated predictor of therapy outcome.",
      citation: "(Flückiger, Del Re, Wampold & Horvath, 2018)"
    },
    {
      id: 2,
      title: "Preference Accommodation",
      stat: "1:2",
      subtitle: "reduction in dropout rates when client preferences are met.",
      body: "We map user preferences across 4 dimensions (directiveness, past/present focus, warmth, skills) using a modified C-NIP framework. Honoring these preferences demonstrably improves treatment outcomes.",
      citation: "(Swift et al., 2018; Norcross & Cooper, 2021)"
    },
    {
      id: 3,
      title: "Cultural Context Matters",
      stat: "d ≈ 0.63",
      subtitle: "effect size for client preference for same-culture therapists.",
      body: "In the Indian context, family systems, caste sensitivity, and language are not secondary filters—they are foundational to trust. Therapy Matching OS treats cultural alignment as a primary weighted variable.",
      citation: "(Cabral & Smith, 2011; Indian Family Systems literature)"
    },
    {
      id: 4,
      title: "Feedback-Informed Treatment",
      stat: "25th",
      subtitle: "percentile trigger for automated re-match offers.",
      body: "The algorithm learns. By integrating brief post-session Outcome Rating Scales (ORS) and Session Rating Scales (SRS), Therapy Matching OS catches silent dropouts before they happen and continuously trains its matching weights.",
      citation: "(Lambert, Miller, Duncan)"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      router.push('/');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-therapy-bg flex flex-col font-sans text-therapy-text overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-therapy-bg/80 backdrop-blur-md z-10">
        <div className="font-serif font-bold text-lg text-therapy-primary-deep">Therapy Matching OS</div>
        <button 
          onClick={() => router.push('/')}
          className="p-2 text-therapy-text-muted hover:text-therapy-text transition-colors"
        >
          <X size={24} />
        </button>
      </header>

      {/* Slide Content (The Stage) */}
      <main className="flex-1 flex flex-col justify-center px-8 pb-12 relative">
        <div key={currentSlide} className="animate-breathe flex flex-col">
          {/* Stat */}
          <div className="text-7xl font-serif text-therapy-primary-deep mb-4">
            {slides[currentSlide].stat}
          </div>
          
          {/* Subtitle */}
          <div className="text-xl font-medium text-therapy-text mb-10 leading-tight">
            {slides[currentSlide].subtitle}
          </div>

          {/* Divider */}
          <div className="w-12 h-1 bg-therapy-accent/30 mb-10 rounded-full"></div>

          {/* Title */}
          <h2 className="text-2xl font-serif text-therapy-text mb-4">
            {slides[currentSlide].title}
          </h2>

          {/* Body */}
          <p className="text-therapy-text-muted leading-relaxed mb-8">
            {slides[currentSlide].body}
          </p>

          {/* Citation */}
          <p className="text-[10px] text-therapy-text-muted/60 uppercase tracking-[0.1em] font-bold">
            {slides[currentSlide].citation}
          </p>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[50%] bg-therapy-primary/5 rounded-[100%] blur-3xl -z-10 rotate-12"></div>
      </main>

      {/* Footer Navigation */}
      <footer className="p-6 pb-12 flex justify-between items-center bg-therapy-surface/20 border-t border-therapy-text/5">
        {/* Progress indicator */}
        <div className="flex gap-1.5 items-center">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`transition-all duration-500 ${
                currentSlide === i 
                  ? "bg-therapy-primary-deep w-8 h-1.5 rounded-full" 
                  : "bg-therapy-text-muted/20 w-1.5 h-1.5 rounded-full"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {currentSlide > 0 && (
            <button 
              onClick={prevSlide}
              className="p-3 text-therapy-text-muted hover:text-therapy-text transition-colors flex items-center justify-center bg-white rounded-full shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <button 
            onClick={nextSlide}
            className="bg-therapy-primary-deep text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {currentSlide === slides.length - 1 ? "Finish" : "Next"}
            <ArrowRight size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}
