"use client";

import React from 'react';
import { ChevronLeft, Settings } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg flex flex-col font-sans text-trellis-text">
      {/* Header */}
      <header className="px-6 py-6">
        <Link 
          href="/profile"
          className="p-2 -ml-2 text-trellis-text-muted hover:text-trellis-text transition-colors flex items-center gap-1 w-max"
        >
          <ChevronLeft size={24} />
          <span className="text-sm font-bold uppercase tracking-widest">Back</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-10 text-center -mt-12">
        <div className="animate-breathe mb-8">
          <div className="w-24 h-24 bg-trellis-surface rounded-full flex items-center justify-center">
            <Settings className="text-trellis-primary/50 w-12 h-12" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="font-serif text-3xl text-trellis-text leading-tight mb-4">
          Settings Management
        </h1>

        <p className="text-trellis-text-muted text-base leading-relaxed mb-10 font-medium opacity-80">
          This is a concept prototype. In the live production app, this section will allow users to manage billing, notifications, and privacy preferences.
        </p>

        <Link 
          href="/profile" 
          className="bg-trellis-surface text-trellis-text px-8 py-4 rounded-full font-bold text-sm shadow-sm hover:bg-white hover:shadow-md active:scale-[0.98] transition-all border border-trellis-text/5"
        >
          Return to Profile
        </Link>
      </main>

      {/* Design Note */}
      <footer className="p-10 text-center">
        <p className="text-[10px] text-trellis-text-muted/40 uppercase tracking-[0.2em] font-bold">
          High-Fidelity Interaction Design
        </p>
      </footer>
    </div>
  );
}
