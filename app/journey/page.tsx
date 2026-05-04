"use client";

import React, { useState } from 'react';
import { Calendar, TrendingUp, AlertCircle, ArrowRight, Video, PenTool, Smile, Frown, Meh } from 'lucide-react';
import Link from 'next/link';

import { useTrellis } from '@/contexts/TrellisContext';

export default function JourneyPage() {
  const { moodHistory, addMood, feedbackLog } = useTrellis();
  const currentMood = moodHistory.length > 0 ? moodHistory[moodHistory.length - 1].mood : null;

  const handleMoodSelect = (mood: string) => {
    addMood(mood);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg pb-24 font-sans text-trellis-text">
      {/* Header */}
      <h1 className="font-serif text-3xl pt-12 px-6 mb-6 text-trellis-text leading-tight">
        Your Journey
      </h1>

      {/* FEATURE 5: Mood Tracking Integration */}
      <div className="mx-6 mb-8 bg-trellis-surface rounded-3xl p-5 border border-trellis-primary/10 shadow-sm">
        <h3 className="font-serif text-lg mb-3">How are you feeling today?</h3>
        <div className="flex justify-between gap-3">
          <button onClick={() => handleMoodSelect('good')} className={`flex-1 py-3 rounded-2xl flex flex-col items-center gap-2 transition-all ${currentMood === 'good' ? 'bg-trellis-primary-deep text-white shadow-md' : 'bg-white text-trellis-text-muted hover:bg-trellis-primary/5'}`}>
            <Smile size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Good</span>
          </button>
          <button onClick={() => handleMoodSelect('okay')} className={`flex-1 py-3 rounded-2xl flex flex-col items-center gap-2 transition-all ${currentMood === 'okay' ? 'bg-trellis-primary-deep text-white shadow-md' : 'bg-white text-trellis-text-muted hover:bg-trellis-primary/5'}`}>
            <Meh size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Okay</span>
          </button>
          <button onClick={() => handleMoodSelect('tough')} className={`flex-1 py-3 rounded-2xl flex flex-col items-center gap-2 transition-all ${currentMood === 'tough' ? 'bg-trellis-primary-deep text-white shadow-md' : 'bg-white text-trellis-text-muted hover:bg-trellis-primary/5'}`}>
            <Frown size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Tough</span>
          </button>
        </div>
      </div>

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

      {/* FEATURE 3 & 4: Session Prep Prompts and Micro-journaling */}
      <div className="mx-6 mb-10 bg-white rounded-[2rem] p-6 shadow-sm border border-trellis-primary/10">
        <div className="flex items-center gap-2 mb-3">
          <PenTool size={20} className="text-trellis-primary-deep" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-trellis-primary-deep">Session Prep (24h left)</span>
        </div>
        <p className="font-serif text-lg leading-tight mb-2">What feels most alive this week?</p>
        <p className="text-xs text-trellis-text-muted mb-4">Research shows that prepping 24 hours before your session accelerates progress by up to 50%.</p>
        
        <textarea 
          placeholder="I noticed my burnout triggered when..."
          className="w-full bg-trellis-surface/50 border border-trellis-primary/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-trellis-primary resize-none h-24 mb-4 placeholder:text-trellis-text-muted/50"
        />
        
        <button className="w-full py-3 bg-trellis-primary/10 text-trellis-primary-deep font-semibold text-sm rounded-xl hover:bg-trellis-primary/20 transition-colors">
          Share with Therapist
        </button>
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
              {feedbackLog.map((log, index) => {
                const percentage = (log.srsTotal / 15) * 100;
                const isLast = index === feedbackLog.length - 1;
                return (
                  <div key={index} className="w-full flex justify-center h-full items-end">
                    <div 
                      className={`w-full rounded-t-md relative transition-all duration-500 ease-in-out ${isLast ? 'bg-trellis-primary-deep' : 'bg-trellis-primary/40'}`} 
                      style={{ height: `${percentage}%` }}
                    >
                      {isLast && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-trellis-accent"></div>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* The X-Axis Labels */}
            <div className="flex justify-between mt-3 text-[10px] font-medium text-trellis-text-muted px-2 uppercase tracking-wider">
              {feedbackLog.map((log, index) => (
                <span key={index} className={index === feedbackLog.length - 1 ? "text-trellis-primary-deep font-bold" : ""}>
                  {log.date}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
