"use client";

import React from 'react';
import { topMatch } from '@/data/therapists';
import { ChevronLeft, Star, Video, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function MatchPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg relative shadow-2xl overflow-y-auto pb-32 font-sans text-trellis-text">
      {/* Header */}
      <header className="flex items-center px-6 py-6 sticky top-0 bg-trellis-bg/80 backdrop-blur-md z-40">
        <Link href="/" className="p-2 -ml-2 text-trellis-text-muted hover:text-trellis-text transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="font-serif text-xl ml-2">Meet your match</h1>
      </header>

      <main className="animate-breathe">
        {/* Hero Card */}
        <div className="mx-6 mt-2 bg-trellis-surface rounded-3xl p-6 shadow-sm relative border border-trellis-primary/5">
          {/* Match Badge */}
          <div className="absolute -top-3 -right-2 bg-trellis-primary text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-md">
            {topMatch.matchScore}% Match
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="w-24 h-24 bg-trellis-primary/10 text-trellis-primary-deep rounded-full flex items-center justify-center text-3xl font-serif mb-4 border-4 border-white shadow-sm">
              {topMatch.imageInitials}
            </div>

            <h2 className="font-serif text-2xl text-trellis-text leading-tight">
              {topMatch.name}
            </h2>
            <p className="text-sm text-trellis-text-muted mt-1 font-medium">
              {topMatch.title} · {topMatch.credentials}
            </p>
            <p className="text-[11px] text-trellis-text-muted uppercase tracking-wider mt-0.5">
              {topMatch.experience}
            </p>

            {/* Tags & Languages */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {topMatch.tags.map((tag) => (
                <span key={tag} className="bg-trellis-bg text-trellis-text-muted text-[10px] font-bold uppercase tracking-tight px-2.5 py-1 rounded-md border border-trellis-primary/10">
                  {tag}
                </span>
              ))}
              {topMatch.languages.map((lang) => (
                <span key={lang} className="bg-trellis-primary/5 text-trellis-primary-deep text-[10px] font-bold uppercase tracking-tight px-2.5 py-1 rounded-md border border-trellis-primary/20">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Why We Matched You Section */}
        <div className="mx-6 mt-8 p-6 bg-[#E8E2D2] rounded-3xl border-l-[6px] border-trellis-primary-deep shadow-sm">
          <h3 className="font-serif text-lg mb-3 text-trellis-primary-deep">Why we matched you</h3>
          <p className="text-sm leading-relaxed text-trellis-text font-medium opacity-90">
            {topMatch.whyWeMatchedYou}
          </p>
          
          <div className="mt-6 pt-5 border-t border-trellis-primary-deep/10 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-trellis-primary-deep font-semibold">
              <Star size={18} fill="currentColor" />
              <span>Highest compatibility for workplace burnout</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-trellis-primary-deep font-semibold">
              <Video size={18} fill="currentColor" />
              <span>Available via Video Calls</span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mx-6 mt-8 space-y-4">
          <h3 className="font-serif text-lg text-trellis-text">About {topMatch.name.split(' ')[1]}</h3>
          <p className="text-sm leading-relaxed text-trellis-text-muted">
            {topMatch.about}
          </p>
        </div>

        {/* Logistics Summary */}
        <div className="mx-6 mt-8 grid grid-cols-2 gap-4">
          <div className="bg-trellis-surface p-4 rounded-2xl border border-trellis-primary/5">
            <p className="text-[10px] uppercase tracking-wider text-trellis-text-muted font-bold mb-1">Fee</p>
            <p className="text-sm font-semibold">{topMatch.fee}</p>
          </div>
          <div className="bg-trellis-surface p-4 rounded-2xl border border-trellis-primary/5">
            <p className="text-[10px] uppercase tracking-wider text-trellis-text-muted font-bold mb-1">Availability</p>
            <p className="text-sm font-semibold">{topMatch.availability}</p>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-trellis-bg/95 backdrop-blur-md border-t border-trellis-surface p-6 pb-10 space-y-4 z-50">
        <Link 
          href="/booked"
          className="w-full bg-trellis-primary-deep text-white py-4 rounded-2xl font-semibold text-lg shadow-lg active:scale-[0.98] transition-all flex justify-center items-center gap-2"
        >
          <Calendar size={20} />
          Book free 15-min call
        </Link>
        <Link 
          href="/matches"
          className="w-full block text-trellis-text-muted text-sm font-bold tracking-tight py-2 text-center hover:text-trellis-text transition-colors"
        >
          See all 3 matches
        </Link>
      </div>
    </div>
  );
}
