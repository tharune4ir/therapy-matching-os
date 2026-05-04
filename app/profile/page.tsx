"use client";

import React from 'react';
import { useTrellis } from '@/contexts/TrellisContext';
import { User, Settings, Shield, Bell, LogOut, ChevronRight, Heart, Brain, Target } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { activeProfile } = useTrellis();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg pb-24 font-sans text-trellis-text">
      {/* Header */}
      <header className="pt-12 px-6 mb-8">
        <h1 className="font-serif text-3xl text-trellis-text leading-tight">Profile</h1>
      </header>

      <main className="px-6 space-y-8 animate-breathe">
        {/* User Card */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-trellis-primary/10 flex items-center gap-5">
          <div className="w-20 h-20 bg-trellis-primary/10 rounded-full flex items-center justify-center text-trellis-primary-deep text-2xl font-serif border-4 border-trellis-surface">
            {activeProfile ? activeProfile.name.split(' ').map(n => n[0]).join('') : 'U'}
          </div>
          <div>
            <h2 className="text-xl font-serif">{activeProfile?.name || 'Guest User'}</h2>
            <p className="text-xs text-trellis-text-muted mt-1 uppercase tracking-widest font-bold">
              {activeProfile ? 'C-NIP Active Profile' : 'No profile active'}
            </p>
          </div>
        </div>

        {/* Clinical Insights (if active) */}
        {activeProfile && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-trellis-text-muted px-2">Clinical Insights</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-trellis-surface p-4 rounded-2xl border border-trellis-primary/5">
                <Target size={18} className="text-trellis-primary mb-2" />
                <p className="text-[10px] uppercase font-bold text-trellis-text-muted">Primary Need</p>
                <p className="text-sm font-semibold truncate">{activeProfile.primaryConcerns[0]}</p>
              </div>
              <div className="bg-trellis-surface p-4 rounded-2xl border border-trellis-primary/5">
                <Brain size={18} className="text-trellis-primary mb-2" />
                <p className="text-[10px] uppercase font-bold text-trellis-text-muted">Readiness</p>
                <p className="text-sm font-semibold">{activeProfile.stageOfChange}</p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Groups */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-trellis-text-muted px-2">Account Settings</h3>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-trellis-primary/5">
            <button className="w-full flex items-center justify-between p-5 hover:bg-trellis-surface transition-colors">
              <div className="flex items-center gap-4">
                <Settings size={20} className="text-trellis-text-muted" />
                <span className="font-medium text-sm">Preferences</span>
              </div>
              <ChevronRight size={18} className="text-trellis-text-muted" />
            </button>
            <div className="h-px bg-trellis-surface mx-5" />
            <button className="w-full flex items-center justify-between p-5 hover:bg-trellis-surface transition-colors">
              <div className="flex items-center gap-4">
                <Shield size={20} className="text-trellis-text-muted" />
                <span className="font-medium text-sm">Privacy & Security</span>
              </div>
              <ChevronRight size={18} className="text-trellis-text-muted" />
            </button>
            <div className="h-px bg-trellis-surface mx-5" />
            <button className="w-full flex items-center justify-between p-5 hover:bg-trellis-surface transition-colors">
              <div className="flex items-center gap-4">
                <Bell size={20} className="text-trellis-text-muted" />
                <span className="font-medium text-sm">Notifications</span>
              </div>
              <ChevronRight size={18} className="text-trellis-text-muted" />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-4">
          <button className="w-full flex items-center justify-center gap-2 p-5 bg-red-50 text-red-600 rounded-3xl font-semibold text-sm transition-all active:scale-[0.98]">
            <LogOut size={18} />
            Logout
          </button>
          <p className="text-center text-[10px] text-trellis-text-muted mt-6 uppercase tracking-[0.2em] font-bold">
            Trellis v1.0.4 • Beta
          </p>
        </div>
      </main>
    </div>
  );
}
