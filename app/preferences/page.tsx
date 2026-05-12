"use client";

import React from 'react';
import { useTherapy } from '@/contexts/TherapyContext';
import { ChevronLeft, Info, HelpCircle, Users, Globe, Wallet, Calendar, Heart, Shield, Bell } from 'lucide-react';
import Link from 'next/link';
import { TAXONOMY } from '@/data/taxonomy';
import { THERAPISTS } from '@/data/therapists';
import { matchUserToTherapists } from '@/lib/engine/matching';

export default function PreferencesPage() {
  const { activeProfile } = useTherapy();

  if (!activeProfile) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-therapy-bg flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-therapy-surface rounded-full flex items-center justify-center mb-4">
          <Info size={24} className="text-therapy-text-muted" />
        </div>
        <h2 className="font-serif text-xl mb-2">No profile active</h2>
        <p className="text-sm text-therapy-text-muted mb-6">Complete the onboarding to see your preferences.</p>
        <Link href="/onboarding" className="bg-therapy-primary-deep text-white px-6 py-3 rounded-2xl font-semibold">
          Start Onboarding
        </Link>
      </div>
    );
  }

  // Get matched therapist for Section 5
  const matches = matchUserToTherapists(activeProfile, THERAPISTS);
  const topMatch = matches[0];

  const CNIPBar = ({ labelL, labelR, value, inverted = false }: { labelL: string, labelR: string, value: number, inverted?: boolean }) => {
    // value is -15 to +15
    // Dot position as percentage (0% to 100%)
    const normalizedValue = value; // Keep it as is for logic
    const position = ((normalizedValue + 15) / 30) * 100;
    
    let interpretation = "";
    const abs = Math.abs(normalizedValue);
    const side = normalizedValue > 0 ? labelR : labelL;
    
    if (abs > 7) interpretation = `You have a clear preference for ${side.toLowerCase()}`;
    else if (abs >= 4) interpretation = `You lean toward ${side.toLowerCase()}`;
    else interpretation = "You are open to either approach";

    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-therapy-text-muted px-1">
          <span>{labelL}</span>
          <span>{labelR}</span>
        </div>
        <div className="relative h-2 bg-therapy-primary/10 rounded-full w-full">
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-therapy-primary-deep rounded-full shadow-sm transition-all duration-500"
            style={{ left: `${position}%`, transform: `translate(-50%, -50%)` }}
          />
        </div>
        <p className="text-[11px] text-therapy-text-muted italic">{interpretation}</p>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-therapy-bg pb-24 font-sans text-therapy-text">
      {/* Header */}
      <header className="sticky top-0 bg-therapy-bg/80 backdrop-blur-md z-40 px-6 py-6 flex items-center gap-4">
        <Link href="/profile" className="p-2 -ml-2 text-therapy-text-muted hover:text-therapy-text transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="font-serif text-xl">Your Therapy Preferences</h1>
          <p className="text-xs text-therapy-text-muted">Adjust these anytime to refine your match.</p>
        </div>
      </header>

      <main className="px-6 space-y-6 animate-breathe">
        {/* Section 1: What you are working on */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-therapy-primary/5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart size={18} className="text-therapy-primary" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-therapy-text">What you are working on</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {activeProfile.primaryConcerns.map(tag => (
              <span key={tag} className="bg-therapy-primary/10 text-therapy-primary-deep text-[11px] font-bold uppercase tracking-tight px-3 py-1.5 rounded-lg border border-therapy-primary/20">
                {TAXONOMY[tag] || tag}
              </span>
            ))}
          </div>

          {activeProfile.secondaryConcerns.length > 0 && (
            <div className="pt-2">
              <p className="text-[10px] uppercase font-bold text-therapy-text-muted mb-2">Secondary Focus</p>
              <div className="flex flex-wrap gap-2 opacity-70">
                {activeProfile.secondaryConcerns.map(tag => (
                  <span key={tag} className="bg-therapy-surface text-therapy-text-muted text-[10px] font-bold uppercase tracking-tight px-2.5 py-1 rounded-md border border-therapy-primary/5">
                    {TAXONOMY[tag] || tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-6 pt-2 border-t border-therapy-surface mt-2">
            <div>
              <p className="text-[10px] uppercase font-bold text-therapy-text-muted">Duration</p>
              <p className="text-sm font-semibold">{activeProfile.durationMonths}+ months</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-therapy-text-muted">Impact Level</p>
              <p className="text-sm font-semibold">{activeProfile.severity}/10</p>
            </div>
          </div>
        </section>

        {/* Section 2: Communication Style */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-therapy-primary/5 space-y-6">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-therapy-primary" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-therapy-text">Communication Style</h3>
          </div>

          <CNIPBar 
            labelL="Collaborative" 
            labelR="Directive" 
            value={activeProfile.cnip.directiveness} 
          />
          <CNIPBar 
            labelL="Reserved" 
            labelR="Emotionally open" 
            value={activeProfile.cnip.emotionalIntensity} 
          />
          <CNIPBar 
            labelL="Focus on present" 
            labelR="Explore the past" 
            value={activeProfile.cnip.pastOrientation} 
          />
          <CNIPBar 
            labelL="Gentle support" 
            labelR="Direct challenge" 
            value={activeProfile.cnip.warmth} 
          />
        </section>

        {/* Section 3: Therapist Preferences */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-therapy-primary/5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={18} className="text-therapy-primary" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-therapy-text">Therapist Preferences</h3>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            <div>
              <p className="text-[10px] uppercase font-bold text-therapy-text-muted mb-1">Gender</p>
              <p className="text-sm font-medium">{activeProfile.therapistGenderPref}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-therapy-text-muted mb-1">Languages</p>
              <div className="flex flex-wrap gap-1">
                {activeProfile.languages.map(l => (
                  <span key={l} className="bg-therapy-surface text-[10px] font-bold px-2 py-0.5 rounded border border-therapy-primary/5">
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-therapy-text-muted mb-1">Format</p>
              <p className="text-sm font-medium">{activeProfile.formatPref.join(' / ')}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-therapy-text-muted mb-1">Budget</p>
              <p className="text-sm font-medium">₹{activeProfile.budgetMin} - ₹{activeProfile.budgetMax}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-therapy-text-muted mb-1">Prior Therapy</p>
              <p className="text-sm font-medium">{activeProfile.priorTherapy}</p>
            </div>
          </div>
        </section>

        {/* Section 4: Cultural Context */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-therapy-primary/5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe size={18} className="text-therapy-primary" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-therapy-text">Cultural Context</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase font-bold text-therapy-text-muted mb-1">Family Dynamics</p>
              <p className="text-sm font-medium">{activeProfile.familyDynamics || activeProfile.familyStructure}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-therapy-text-muted mb-1">Faith in Therapy</p>
              <p className="text-sm font-medium">{activeProfile.religion} ({activeProfile.religiousSalience}/10 salience)</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-therapy-text-muted mb-1">Sensitivities</p>
              {activeProfile.culturalSensitivities.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {activeProfile.culturalSensitivities.map(s => (
                    <span key={s} className="bg-therapy-surface text-[10px] font-bold px-2 py-0.5 rounded border border-therapy-primary/5">
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-medium text-therapy-text-muted italic">None specified</p>
              )}
            </div>
          </div>
        </section>

        {/* Section 5: Your matched therapist */}
        <section className="bg-therapy-primary-deep text-white rounded-3xl p-6 shadow-lg space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest opacity-80">Matched Therapist</h3>
              <h4 className="font-serif text-2xl mt-1">{topMatch.therapist.name}</h4>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest">
              {topMatch.matchScore}% Match
            </div>
          </div>
          
          <Link 
            href={`/match?id=${topMatch.therapist.id}`}
            className="flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors group"
          >
            See why we matched you
            <ChevronLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

        {/* Footer */}
        <footer className="pt-4 pb-8 text-center px-4">
          <p className="text-xs text-therapy-text-muted italic leading-relaxed">
            In the full version, you will be able to edit these preferences and get re-matched instantly.
          </p>
        </footer>
      </main>
    </div>
  );
}
