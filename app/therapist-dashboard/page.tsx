"use client";

import React from 'react';
import { ChevronLeft, TrendingDown, AlertTriangle, Users, Activity, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { THERAPISTS } from '@/data/therapists';
import { useTrellis } from '@/contexts/TrellisContext';

export default function TherapistDashboardPage() {
  const tProfile = THERAPISTS[0]; // Mocking as Dr. Aanya Krishnan
  const { currentSrsMean, feedbackLog } = useTrellis();

  // If the last feedback score is < 12 (out of 15), that's a rupture (< 4.0 average)
  const lastFeedback = feedbackLog.length > 0 ? feedbackLog[feedbackLog.length - 1] : null;
  const hasRupture = lastFeedback ? lastFeedback.srsTotal < 12 : false;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg pb-24 font-sans text-trellis-text">
      {/* Header */}
      <header className="flex items-center px-6 py-6 sticky top-0 bg-trellis-bg/80 backdrop-blur-md z-40">
        <Link href="/" className="p-2 -ml-2 text-trellis-text-muted hover:text-trellis-text transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="font-serif text-xl ml-2">Clinical Dashboard</h1>
      </header>

      <main className="animate-breathe">
        {/* Therapist Identity */}
        <div className="px-6 mb-8">
          <h2 className="text-2xl font-serif text-trellis-text">Welcome, {tProfile.name.split(' ')[1]}</h2>
          <p className="text-sm text-trellis-text-muted mt-1">Here is your clinical performance and active alerts.</p>
        </div>

        {/* FEATURE 10: KPI Dashboard */}
        <div className="px-6 grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-trellis-primary/10 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-trellis-primary/10 rounded-xl text-trellis-primary-deep">
                <Users size={20} />
              </div>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">+2%</span>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-trellis-text-muted">Session-5 Retention</p>
              <p className="text-2xl font-serif text-trellis-text mt-1">{Math.round(tProfile.session5Retention * 100)}%</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-trellis-primary/10 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-trellis-primary/10 rounded-xl text-trellis-primary-deep">
                <Activity size={20} />
              </div>
              <span className="text-[10px] font-bold text-trellis-text-muted bg-gray-50 px-2 py-1 rounded-md">Avg</span>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-trellis-text-muted">Avg SRS Bond</p>
              <p className="text-2xl font-serif text-trellis-text mt-1">{currentSrsMean.toFixed(1)} <span className="text-sm text-trellis-text-muted">/ 5.0</span></p>
            </div>
          </div>
        </div>

        {/* FEATURE 6: Alliance-Rupture Alerts */}
        <div className="px-6 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={20} className={hasRupture ? "text-red-500" : "text-trellis-text-muted"} />
            <h3 className="font-serif text-lg text-trellis-text">Active Rupture Alerts</h3>
          </div>
          
          {hasRupture ? (
            <div className="bg-[#FFF0F0] rounded-3xl p-5 border border-red-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full -mr-12 -mt-12"></div>
              
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-red-900">Live User</p>
                  <p className="text-[11px] font-medium text-red-700/80 mt-0.5">Session {feedbackLog.length} · Live Feedback</p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-red-100 text-red-600 px-2.5 py-1 rounded-md">Action Required</span>
              </div>

              <div className="bg-white/60 p-3 rounded-xl mb-4 border border-red-100/50">
                <div className="flex items-center gap-2 text-sm text-red-800 font-semibold mb-1">
                  <TrendingDown size={16} />
                  SRS Score Drop
                </div>
                <p className="text-xs text-red-800/80 leading-relaxed">
                  The client's SRS dropped to {(lastFeedback!.srsTotal / 3).toFixed(1)} today. This indicates a potential rupture in the alliance.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[10px] uppercase font-bold tracking-wider text-red-900/60 pl-1">Suggested Repair Script</p>
                <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex gap-3 items-start">
                  <MessageSquare size={16} className="text-trellis-primary mt-0.5 shrink-0" />
                  <p className="text-xs italic text-trellis-text leading-relaxed">
                    "I noticed in our feedback that the approach today didn't land well for you. I want to make sure this space works for you — could we talk about what felt off?"
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-trellis-surface rounded-3xl p-6 border border-trellis-primary/10 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Activity className="text-trellis-primary" size={20} />
              </div>
              <p className="text-sm font-medium text-trellis-text">No active ruptures</p>
              <p className="text-xs text-trellis-text-muted mt-1">Your therapeutic alliances are healthy.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
