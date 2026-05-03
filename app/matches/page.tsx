"use client";

import React from 'react';
import { topMatch, alternativeMatches } from '@/data/therapists';
import { ChevronLeft, Star } from 'lucide-react';
import Link from 'next/link';

export default function MatchesPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg pb-24 font-sans text-trellis-text">
      {/* Header */}
      <header className="flex items-center px-6 py-6 sticky top-0 bg-trellis-bg/80 backdrop-blur-md z-40">
        <Link href="/match" className="p-2 -ml-2 text-trellis-text-muted hover:text-trellis-text transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="font-serif text-xl ml-2">Your Matches</h1>
      </header>

      <main className="animate-breathe">
        <p className="text-trellis-text-muted text-sm px-6 mb-8 leading-relaxed">
          We ran your profile against 40+ variables. Here are the 3 therapists with the highest probability of a strong working alliance.
        </p>

        {/* Top Match */}
        <div className="mx-6 p-1 bg-gradient-to-br from-trellis-primary/20 to-transparent rounded-[32px]">
          <div className="bg-white rounded-[28px] p-6 shadow-sm relative border border-trellis-primary/10">
            <div className="absolute -top-3 right-4 bg-trellis-primary text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-md">
              {topMatch.matchScore}% Match
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-trellis-primary/10 text-trellis-primary-deep rounded-full flex items-center justify-center text-xl font-serif">
                {topMatch.imageInitials}
              </div>
              <div>
                <h2 className="font-serif text-xl leading-tight">{topMatch.name}</h2>
                <p className="text-xs text-trellis-text-muted mt-0.5">{topMatch.title}</p>
              </div>
            </div>

            <p className="text-xs text-trellis-text-muted line-clamp-2 mb-6 leading-relaxed">
              {topMatch.about}
            </p>

            <Link 
              href="/match" 
              className="w-full bg-trellis-primary-deep text-white py-3 rounded-xl font-semibold text-sm flex justify-center items-center shadow-md active:scale-[0.98] transition-all"
            >
              View Profile
            </Link>
          </div>
        </div>

        <div className="px-6 my-8 flex items-center gap-4">
          <div className="flex-grow h-px bg-trellis-surface"></div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-trellis-text-muted">Alternative Matches</span>
          <div className="flex-grow h-px bg-trellis-surface"></div>
        </div>

        {/* Alternatives */}
        <div className="px-6 space-y-4">
          {alternativeMatches.map((match) => (
            <div 
              key={match.id}
              className="bg-white/50 border border-trellis-surface rounded-2xl p-4 flex items-center justify-between hover:bg-white transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-trellis-surface text-trellis-text-muted rounded-full flex items-center justify-center text-sm font-serif group-hover:bg-trellis-primary/10 group-hover:text-trellis-primary-deep transition-colors">
                  {match.imageInitials}
                </div>
                <div>
                  <h3 className="font-serif text-base leading-tight text-trellis-text">{match.name}</h3>
                  <p className="text-[10px] text-trellis-text-muted mt-0.5">{match.title}</p>
                </div>
              </div>
              
              <div className="bg-trellis-surface text-trellis-text-muted text-[10px] font-bold px-2 py-1 rounded-md">
                {match.matchScore}%
              </div>
            </div>
          ))}
        </div>

        {/* Note on Algorithm */}
        <div className="mt-12 px-10 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-trellis-primary/5 rounded-full mb-3">
            <Star size={16} className="text-trellis-primary" fill="currentColor" />
          </div>
          <p className="text-[11px] leading-relaxed text-trellis-text-muted italic">
            "The therapeutic alliance is the single most replicated predictor of therapy outcome."
          </p>
          <p className="text-[9px] uppercase tracking-tighter text-trellis-text-muted/50 mt-1">
            (Flückiger, Del Re, Wampold & Horvath, 2018)
          </p>
        </div>
      </main>
    </div>
  );
}
