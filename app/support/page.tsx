"use client";

import React from 'react';
import { Phone, MessageSquare, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CrisisPage() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-12 font-sans text-trellis-text">
      {/* Header */}
      <header className="px-6 py-6">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-trellis-text-muted hover:text-trellis-text transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center px-6">
        {/* Hero Section */}
        <div className="animate-breathe mb-8">
          <ShieldAlert className="w-16 h-16 text-trellis-crisis" strokeWidth={1.5} />
        </div>

        <h1 className="font-serif text-3xl text-trellis-text text-center mb-4 leading-tight">
          We&apos;re here for you right now.
        </h1>

        <p className="text-trellis-text-muted text-center px-4 leading-relaxed mb-10 font-medium">
          It sounds like you might be going through a really difficult moment. Your safety is the most important thing to us. Please connect with someone who can help immediately.
        </p>

        {/* Emergency Resources List */}
        <div className="w-full space-y-4">
          {/* Card 1: iCall */}
          <div className="bg-trellis-crisis/5 border-l-4 border-trellis-crisis rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-trellis-text mb-1 text-base">iCall Helpline</h3>
            <p className="text-sm text-trellis-text-muted mb-4 leading-snug">
              Free, confidential emotional support across India. Available Mon-Sat, 10am-8pm.
            </p>
            <a 
              href="tel:9152987821" 
              className="bg-trellis-crisis text-white w-full py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 shadow-md active:scale-[0.98] transition-all"
            >
              <Phone size={18} fill="currentColor" />
              9152987821
            </a>
          </div>

          {/* Card 2: Tele-MANAS */}
          <div className="bg-trellis-surface/50 border border-trellis-surface rounded-2xl p-6">
            <h3 className="font-bold text-trellis-text mb-1 text-base">Tele-MANAS (Govt of India)</h3>
            <p className="text-sm text-trellis-text-muted mb-4 leading-snug">
              24/7 National mental health helpline. Support in multiple languages.
            </p>
            <a 
              href="tel:14416" 
              className="bg-white text-trellis-text w-full py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 border border-trellis-surface shadow-sm active:scale-[0.98] transition-all"
            >
              <Phone size={18} fill="currentColor" />
              14416
            </a>
          </div>

          {/* Card 3: Vandrevala Foundation */}
          <div className="bg-trellis-surface/50 border border-trellis-surface rounded-2xl p-6">
            <h3 className="font-bold text-trellis-text mb-1 text-base">Vandrevala Foundation</h3>
            <p className="text-sm text-trellis-text-muted mb-4 leading-snug">
              24/7 crisis support via phone or WhatsApp.
            </p>
            <a 
              href="tel:9999666555" 
              className="bg-white text-trellis-text w-full py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 border border-trellis-surface shadow-sm active:scale-[0.98] transition-all"
            >
              <Phone size={18} fill="currentColor" />
              9999 666 555
            </a>
          </div>
        </div>

        {/* Secondary Action */}
        <div className="mt-12 w-full text-center">
          <p className="text-xs text-trellis-text-muted mb-4 px-8 leading-relaxed font-medium">
            If you&apos;re not in immediate danger and want to continue finding a therapist, you can return to the previous screen.
          </p>
          <button 
            onClick={() => router.back()} 
            className="text-trellis-text-muted font-bold text-xs uppercase tracking-widest py-2 hover:text-trellis-text transition-colors"
          >
            Return to onboarding
          </button>
        </div>
      </main>
    </div>
  );
}
