"use client";

import React from 'react';
import { ChevronLeft, Headphones, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TherapyMatchingOsListensPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-therapy-bg relative shadow-2xl overflow-y-auto pb-32 font-sans text-therapy-text">
      {/* Header */}
      <header className="flex items-center px-6 py-6 sticky top-0 bg-therapy-bg/80 backdrop-blur-md z-40">
        <Link href="/" className="p-2 -ml-2 text-therapy-text-muted hover:text-therapy-text transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="font-serif text-xl ml-2">Therapy Matching OS Listens</h1>
      </header>

      <main className="animate-breathe px-6">
        <div className="flex justify-center mb-8 mt-4">
          <div className="w-24 h-24 bg-therapy-primary/10 rounded-full flex items-center justify-center text-therapy-primary shadow-sm border border-therapy-primary/20">
            <Headphones size={40} />
          </div>
        </div>

        <h2 className="font-serif text-3xl text-center leading-tight mb-4 text-therapy-text">
          Sometimes you just need someone to listen.
        </h2>

        <p className="text-sm text-therapy-text-muted text-center leading-relaxed mb-10">
          Based on your answers, it sounds like you might not be looking for deep clinical work or "homework" right now. That is completely okay. 
          <br/><br/>
          Before jumping into a clinical match, we recommend starting with <strong className="text-therapy-primary-deep">Therapy Matching OS Listens</strong> — a low-stakes, 30-minute reflective session with an active listener.
        </p>

        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-therapy-primary/10 space-y-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-therapy-surface rounded-xl">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <h3 className="font-semibold text-therapy-text">No pressure, no diagnosis</h3>
              <p className="text-xs text-therapy-text-muted leading-relaxed mt-1">Just a safe space to vent, process, and be heard by a trained empathic listener.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-2 bg-therapy-surface rounded-xl">
              <span className="text-xl">💸</span>
            </div>
            <div>
              <h3 className="font-semibold text-therapy-text">Completely Free</h3>
              <p className="text-xs text-therapy-text-muted leading-relaxed mt-1">Your first 30-minute session is on us. No credit card required.</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-therapy-primary-deep text-white py-4 rounded-2xl font-semibold text-lg shadow-lg active:scale-[0.98] transition-all flex justify-center items-center gap-2 mb-4">
          <Calendar size={20} />
          Book 30-Min Session
        </button>

        <Link href="/matches" className="w-full flex justify-center items-center gap-1 text-sm text-therapy-text-muted font-bold hover:text-therapy-text transition-colors py-2">
          Skip and see clinical matches anyway <ArrowRight size={14} />
        </Link>
      </main>
    </div>
  );
}
