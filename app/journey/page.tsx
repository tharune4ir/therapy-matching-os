"use client";

import React, { useState, useMemo } from 'react';
import { Calendar, TrendingUp, AlertCircle, ArrowRight, Video, PenTool, Smile, Frown, Meh, Heart } from 'lucide-react';
import Link from 'next/link';

import { useTherapy } from '@/contexts/TherapyContext';

export default function JourneyPage() {
  const { moodHistory, addMood, feedbackLog, orsHistory } = useTherapy();
  const currentMood = moodHistory.length > 0 ? moodHistory[moodHistory.length - 1].mood : null;

  const handleMoodSelect = (mood: string) => {
    addMood(mood);
  };

  // Calculate Trend
  const trend = useMemo(() => {
    if (orsHistory.length < 2) return { label: "Establishing baseline", color: "text-therapy-text-muted", icon: null };
    const latest = orsHistory[orsHistory.length - 1].total;
    const previous = orsHistory[orsHistory.length - 2].total;
    const diff = latest - previous;
    
    if (diff >= 3) return { label: "Trending upward", color: "text-therapy-primary", icon: <TrendingUp size={20} className="text-therapy-primary" /> };
    if (diff <= -3) return { label: "Trending downward", color: "text-orange-500", icon: <TrendingUp size={20} className="text-orange-500 rotate-180" /> };
    return { label: "Holding steady", color: "text-therapy-text-muted", icon: <div className="w-5 h-0.5 bg-therapy-text-muted rounded-full" /> };
  }, [orsHistory]);

  // Check if ORS is needed today (simple check: if last ORS date is not today)
  const needsORS = useMemo(() => {
    if (orsHistory.length === 0) return true;
    const lastDate = new Date(orsHistory[orsHistory.length - 1].date).toDateString();
    const today = new Date().toDateString();
    return lastDate !== today;
  }, [orsHistory]);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-therapy-bg pb-32 font-sans text-therapy-text">
      {/* Header */}
      <h1 className="font-serif text-3xl pt-12 px-6 mb-6 text-therapy-text leading-tight">
        Your Journey
      </h1>

      {/* FEATURE 5: Mood Tracking Integration */}
      <div className="mx-6 mb-8 bg-therapy-surface rounded-3xl p-5 border border-therapy-primary/10 shadow-sm">
        <h3 className="font-serif text-lg mb-3">How are you feeling today?</h3>
        <div className="flex justify-between gap-3">
          <button onClick={() => handleMoodSelect('good')} className={`flex-1 py-3 rounded-2xl flex flex-col items-center gap-2 transition-all ${currentMood === 'good' ? 'bg-therapy-primary-deep text-white shadow-md' : 'bg-white text-therapy-text-muted hover:bg-therapy-primary/5'}`}>
            <Smile size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Good</span>
          </button>
          <button onClick={() => handleMoodSelect('okay')} className={`flex-1 py-3 rounded-2xl flex flex-col items-center gap-2 transition-all ${currentMood === 'okay' ? 'bg-therapy-primary-deep text-white shadow-md' : 'bg-white text-therapy-text-muted hover:bg-therapy-primary/5'}`}>
            <Meh size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Okay</span>
          </button>
          <button onClick={() => handleMoodSelect('tough')} className={`flex-1 py-3 rounded-2xl flex flex-col items-center gap-2 transition-all ${currentMood === 'tough' ? 'bg-therapy-primary-deep text-white shadow-md' : 'bg-white text-therapy-text-muted hover:bg-therapy-primary/5'}`}>
            <Frown size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Tough</span>
          </button>
        </div>
      </div>

      {/* ORS Check-in Card (Proactive) */}
      {needsORS && (
        <div className="mx-6 mb-6 bg-therapy-primary/5 rounded-[2rem] p-6 border border-therapy-primary/20 relative overflow-hidden animate-breathe">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={20} className="text-therapy-primary" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-therapy-primary">Before your session</span>
          </div>
          
          <p className="text-sm text-therapy-text leading-relaxed">
            Take 60 seconds to check in with yourself. This helps your therapist prepare for your session today.
          </p>
          
          <Link 
            href="/checkin" 
            className="bg-therapy-primary-deep text-white w-full py-4 rounded-2xl mt-6 flex justify-center items-center gap-2 font-semibold text-sm shadow-md active:scale-[0.98] transition-all"
          >
            Check in now
            <ArrowRight size={18} />
          </Link>
        </div>
      )}

      {/* SRS Feedback Card */}
      <div className="mx-6 mb-10 bg-white rounded-[2rem] p-6 shadow-sm border border-therapy-accent/20 relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-therapy-accent/5 rounded-full -mr-12 -mt-12"></div>
        
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={20} className="text-therapy-accent" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-therapy-accent">Action Required</span>
        </div>
        
        <p className="text-sm text-therapy-text leading-relaxed">
          Log how your recent session with <span className="font-bold">Dr. Priya Menon</span>{" "}went. This ensures your matches stay precise.
        </p>
        
        <Link 
          href="/feedback" 
          className="bg-therapy-primary-deep text-white w-full py-4 rounded-2xl mt-6 flex justify-center items-center gap-2 font-semibold text-sm shadow-md active:scale-[0.98] transition-all"
        >
          Rate your session
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Upcoming Schedule */}
      <div className="space-y-4 mb-10">
        <h2 className="px-6 text-xl font-serif text-therapy-text">Next Session</h2>
        <div className="mx-6 bg-therapy-surface rounded-[2rem] p-5 flex items-center gap-5 border border-therapy-primary/5">
          <div className="flex flex-col items-center justify-center bg-white w-14 h-16 rounded-2xl shadow-sm border border-therapy-primary/10">
            <span className="text-[10px] uppercase font-bold text-therapy-primary">Wed</span>
            <span className="text-xl font-serif text-therapy-text font-bold">12</span>
          </div>
          <div className="flex flex-col">
            <p className="text-base font-semibold">Video Call with Dr. Priya</p>
            <div className="flex items-center gap-2 text-xs text-therapy-text-muted mt-1 font-medium">
              <Video size={14} className="text-therapy-primary" />
              <span>7:00 PM · 50 mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE 3 & 4: Session Prep Prompts and Micro-journaling */}
      <div className="mx-6 mb-10 bg-white rounded-[2rem] p-6 shadow-sm border border-therapy-primary/10">
        <div className="flex items-center gap-2 mb-3">
          <PenTool size={20} className="text-therapy-primary-deep" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-therapy-primary-deep">Session Prep (24h left)</span>
        </div>
        <p className="font-serif text-lg leading-tight mb-2">What feels most alive this week?</p>
        <p className="text-xs text-therapy-text-muted mb-4">Research shows that prepping 24 hours before your session accelerates progress by up to 50%.</p>
        
        <textarea 
          placeholder="I noticed my burnout triggered when..."
          className="w-full bg-therapy-surface/50 border border-therapy-primary/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-therapy-primary resize-none h-24 mb-4 placeholder:text-therapy-text-muted/50"
        />
        
        <button className="w-full py-3 bg-therapy-primary/10 text-therapy-primary-deep font-semibold text-sm rounded-xl hover:bg-therapy-primary/20 transition-colors">
          Share with Therapist
        </button>
      </div>

      {/* Daily Reflection Card (New) */}
      <div className="mx-6 mb-10 bg-therapy-primary/5 rounded-[2rem] p-6 border border-therapy-primary/20 relative overflow-hidden group hover:bg-therapy-primary/10 transition-all cursor-pointer">
        <Link href="/reflections" className="block">
          <div className="flex items-center gap-2 mb-3">
            <Heart size={20} className="text-therapy-primary" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-therapy-primary">Daily Reflection</span>
          </div>
          <p className="font-serif text-lg leading-tight mb-3">Today&apos;s prompt is waiting for you.</p>
          <div className="flex items-center gap-2 text-xs font-bold text-therapy-primary-deep">
            <span>Pause for a moment</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Wellbeing Pulse (Outcome Chart) */}
      <div className="space-y-4">
        <h2 className="px-6 text-xl font-serif text-therapy-text">Wellbeing Pulse</h2>
        <div className="mx-6 bg-therapy-surface rounded-[2rem] p-6 border border-therapy-primary/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-therapy-text-muted font-bold uppercase tracking-wider">Outcome (ORS)</p>
              <p className={`text-[11px] mt-0.5 font-medium ${trend.color}`}>{trend.label}</p>
            </div>
            <div className="p-2 bg-white rounded-xl shadow-sm">
              {trend.icon}
            </div>
          </div>

          <div className="mt-8">
            {/* The Bars */}
            <div className="h-32 flex items-end justify-between gap-4 px-2">
              {orsHistory.slice(-5).map((entry, index) => {
                const percentage = (entry.total / 40) * 100;
                const isLast = index === Math.min(orsHistory.length, 5) - 1;
                return (
                  <div key={index} className="w-full flex flex-col justify-end h-full items-center gap-2">
                    <div 
                      className={`w-full rounded-t-lg relative transition-all duration-700 ease-out ${isLast ? 'bg-therapy-primary-deep shadow-lg' : 'bg-therapy-primary/30'}`} 
                      style={{ height: `${percentage}%` }}
                    >
                      {isLast && <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-therapy-accent border-2 border-white shadow-sm"></div>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* The X-Axis Labels */}
            <div className="flex justify-between mt-4 text-[10px] font-bold text-therapy-text-muted px-2 uppercase tracking-tighter">
              {orsHistory.slice(-5).map((entry, index) => (
                <span key={index} className={index === Math.min(orsHistory.length, 5) - 1 ? "text-therapy-primary-deep" : ""}>
                  {entry.date.length > 5 ? entry.date.substring(0, 5) : entry.date}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
