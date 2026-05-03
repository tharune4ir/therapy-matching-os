"use client";

import React from 'react';
import { Calendar, TrendingUp, AlertCircle, ArrowRight, Video } from 'lucide-react';
import Link from 'next/link';

export default function JourneyPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg pb-24 font-sans text-trellis-text">
      {/* Header */}
      <h1 className="font-serif text-3xl pt-12 px-6 mb-8 text-trellis-text leading-tight">
        Your Journey
      </h1>

      {/* Action Required Card */}
      <div className="mx-6 mb-10 bg-white rounded-[2rem] p-6 shadow-sm border border-trellis-accent/20 relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-trellis-accent/5 rounded-full -mr-12 -mt-12"></div>
        
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={20} className="text-trellis-accent" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-trellis-accent">Action Required</span>
        </div>
        
        <p className="text-sm text-trellis-text leading-relaxed">
          Take 60 seconds to log how your first session with <span className="font-bold">Dr. Priya Menon</span>{" "}went. This helps us ensure you&apos;re on the right track.
        </p>
        
        <Link 
          href="/feedback" 
          className="bg-trellis-primary-deep text-white w-full py-4 rounded-2xl mt-6 flex justify-center items-center gap-2 font-semibold text-sm shadow-md active:scale-[0.98] transition-all"
        >
          Rate your session
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Upcoming Schedule */}
      <div className="space-y-4 mb-10">
        <h2 className="px-6 text-xl font-serif text-trellis-text">Next Session</h2>
        <div className="mx-6 bg-trellis-surface rounded-[2rem] p-5 flex items-center gap-5 border border-trellis-primary/5">
          <div className="flex flex-col items-center justify-center bg-white w-14 h-16 rounded-2xl shadow-sm border border-trellis-primary/10">
            <span className="text-[10px] uppercase font-bold text-trellis-primary">Wed</span>
            <span className="text-xl font-serif text-trellis-text font-bold">12</span>
          </div>
          <div className="flex flex-col">
            <p className="text-base font-semibold">Video Call with Dr. Priya</p>
            <div className="flex items-center gap-2 text-xs text-trellis-text-muted mt-1 font-medium">
              <Video size={14} className="text-trellis-primary" />
              <span>7:00 PM · 50 mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wellbeing Pulse (Mock Chart) */}
      <div className="space-y-4">
        <h2 className="px-6 text-xl font-serif text-trellis-text">Wellbeing Pulse</h2>
        <div className="mx-6 bg-trellis-surface rounded-[2rem] p-6 border border-trellis-primary/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-trellis-text-muted font-bold uppercase tracking-wider">Outcome (ORS)</p>
              <p className="text-[11px] text-trellis-text-muted mt-0.5">Your trajectory is upward</p>
            </div>
            <div className="p-2 bg-trellis-primary/10 rounded-xl">
              <TrendingUp size={20} className="text-trellis-primary" />
            </div>
          </div>

          <div className="mt-8">
            {/* The Bars */}
            <div className="h-32 flex items-end justify-between gap-4 px-2">
              <div className="w-full h-[40%] bg-trellis-primary/30 rounded-t-md"></div>
              <div className="w-full h-[60%] bg-trellis-primary/50 rounded-t-md"></div>
              <div className="w-full h-[75%] bg-trellis-primary/70 rounded-t-md"></div>
              <div className="w-full h-[100%] bg-trellis-primary-deep rounded-t-md relative">
                {/* Current week indicator dot */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-trellis-accent"></div>
              </div>
            </div>

            {/* The X-Axis Labels */}
            <div className="flex justify-between mt-3 text-[10px] font-medium text-trellis-text-muted px-2 uppercase tracking-wider">
              <span>Wk 1</span>
              <span>Wk 2</span>
              <span>Wk 3</span>
              <span className="text-trellis-primary-deep font-bold">Wk 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
