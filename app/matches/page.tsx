"use client";

import React, { useState, useMemo } from 'react';
import { THERAPISTS } from '@/data/therapists';
import { USERS } from '@/data/users';
import { matchUserToTherapists } from '@/lib/engine/matching';
import { ChevronLeft, Star, Code } from 'lucide-react';
import Link from 'next/link';

export default function MatchesPage() {
  const [selectedUserId, setSelectedUserId] = useState('live_user');
  const [liveUser, setLiveUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem('activeProfile');
    if (stored) {
      setLiveUser(JSON.parse(stored));
    } else {
      setSelectedUserId(USERS[0].id);
    }
  }, []);

  const activeUser = useMemo(() => {
    if (selectedUserId === 'live_user' && liveUser) return liveUser;
    return USERS.find(u => u.id === selectedUserId) || USERS[0];
  }, [selectedUserId, liveUser]);
  
  // Dynamically run the algorithm for the selected user
  const matches = useMemo(() => matchUserToTherapists(activeUser, THERAPISTS), [activeUser]);

  if (!mounted) return null;

  if (matches.length === 0) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-trellis-bg p-6 text-center font-sans">
        <h2>No Matches Found</h2>
        <p>The filters are too restrictive.</p>
      </div>
    );
  }

  const topMatch = matches[0];
  const alternativeMatches = matches.slice(1);

  // Helper to format therapist data for the UI
  const formatTherapist = (match: any) => {
    const t = match.therapist;
    return {
      id: t.id,
      name: t.name,
      title: t.credentials.split(' ')[0] === 'MBBS,' ? 'Psychiatrist' : (t.rciNumber ? 'Clinical Psychologist' : 'Counselling Psychologist'),
      matchScore: match.matchScore,
      imageInitials: t.name.replace('Dr. ', '').split(' ').map((n: string) => n[0]).join('').substring(0, 2),
      about: t.about,
      whyText: match.whyText
    };
  };

  const formattedTopMatch = formatTherapist(topMatch);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg pb-32 font-sans text-trellis-text">
      {/* Header */}
      <header className="flex items-center px-6 py-6 sticky top-0 bg-trellis-bg/80 backdrop-blur-md z-40">
        <Link href="/match" className="p-2 -ml-2 text-trellis-text-muted hover:text-trellis-text transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="font-serif text-xl ml-2">Your Matches</h1>
      </header>

      {/* Developer Toggle */}
      <div className="px-6 mb-4">
        <div className="bg-trellis-surface p-3 rounded-xl border border-trellis-primary/20 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-trellis-text-muted">
            <Code size={12} />
            Developer: Switch Persona
          </div>
          <select 
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full bg-white text-sm p-2 rounded border-none outline-none focus:ring-2 focus:ring-trellis-primary"
          >
            {liveUser && <option value="live_user">Your Live Profile (from Onboarding)</option>}
            <optgroup label="Research Personas">
              {USERS.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.primaryConcerns.length} concerns, {u.stageOfChange})</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      <main className="animate-breathe">
        <p className="text-trellis-text-muted text-sm px-6 mb-8 leading-relaxed">
          We ran your profile against 28 clinical variables. Here are the therapists with the highest probability of a strong working alliance.
        </p>

        {/* Top Match */}
        <div className="mx-6 p-1 bg-gradient-to-br from-trellis-primary/20 to-transparent rounded-[32px]">
          <div className="bg-white rounded-[28px] p-6 shadow-sm relative border border-trellis-primary/10">
            <div className="absolute -top-3 right-4 bg-trellis-primary text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-md">
              {formattedTopMatch.matchScore}% Match
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-trellis-primary/10 text-trellis-primary-deep rounded-full flex items-center justify-center text-xl font-serif">
                {formattedTopMatch.imageInitials}
              </div>
              <div>
                <h2 className="font-serif text-xl leading-tight">{formattedTopMatch.name}</h2>
                <p className="text-xs text-trellis-text-muted mt-0.5">{formattedTopMatch.title}</p>
              </div>
            </div>

            <p className="text-xs text-trellis-text-muted line-clamp-2 mb-2 leading-relaxed">
              {formattedTopMatch.about}
            </p>
            <div className="bg-trellis-bg rounded-lg p-3 mb-6">
              <p className="text-[11px] font-medium text-trellis-text-muted">Why we matched you:</p>
              <p className="text-[11px] mt-1 text-trellis-primary-deep">{formattedTopMatch.whyText}</p>
            </div>

            <Link 
              href={`/match?id=${formattedTopMatch.id}`} 
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
          {alternativeMatches.map((match) => {
            const formatted = formatTherapist(match);
            return (
              <div 
                key={formatted.id}
                className="bg-white/50 border border-trellis-surface rounded-2xl p-4 flex flex-col gap-3 hover:bg-white transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-trellis-surface text-trellis-text-muted rounded-full flex items-center justify-center text-sm font-serif group-hover:bg-trellis-primary/10 group-hover:text-trellis-primary-deep transition-colors">
                      {formatted.imageInitials}
                    </div>
                    <div>
                      <h3 className="font-serif text-base leading-tight text-trellis-text">{formatted.name}</h3>
                      <p className="text-[10px] text-trellis-text-muted mt-0.5">{formatted.title}</p>
                    </div>
                  </div>
                  
                  <div className="bg-trellis-surface text-trellis-text-muted text-[10px] font-bold px-2 py-1 rounded-md">
                    {formatted.matchScore}%
                  </div>
                </div>
                <div className="text-[10px] text-trellis-text-muted italic border-l-2 border-trellis-primary/30 pl-2 line-clamp-2">
                  {formatted.whyText}
                </div>
              </div>
            );
          })}
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
