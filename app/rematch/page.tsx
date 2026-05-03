"use client";

import React from 'react';
import { ChevronLeft, HeartHandshake, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RematchPage() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg flex flex-col font-sans text-trellis-text">
      {/* Header */}
      <header className="px-6 py-6">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-trellis-text-muted hover:text-trellis-text transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-8 text-center -mt-12">
        <div className="animate-breathe mb-8">
          <div className="w-24 h-24 bg-trellis-primary/10 rounded-full flex items-center justify-center">
            <HeartHandshake className="text-trellis-primary w-12 h-12" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="font-serif text-3xl text-trellis-text leading-tight mb-6">
          Let&apos;s find a better fit.
        </h1>

        <p className="text-trellis-text-muted text-lg leading-relaxed mb-12 font-medium opacity-90">
          You don&apos;t need to explain yourself, and Dr. Priya won&apos;t be offended. We can use your latest feedback to calibrate a new match right now.
        </p>

        {/* Actions */}
        <div className="w-full space-y-4">
          <Link 
            href="/matches" 
            className="w-full bg-trellis-primary-deep text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 shadow-lg active:scale-[0.98] transition-all"
          >
            See my alternative matches
            <ArrowRight size={18} />
          </Link>
          
          <button 
            onClick={() => router.back()}
            className="w-full text-trellis-text-muted font-bold text-sm uppercase tracking-widest py-3 hover:text-trellis-text transition-colors"
          >
            Nevermind, I&apos;ll stay for now
          </button>
        </div>
      </main>

      {/* Reassurance Footer */}
      <footer className="p-10 text-center">
        <p className="text-[10px] text-trellis-text-muted/60 leading-relaxed uppercase tracking-widest font-bold">
          Your wellbeing is our priority.<br/>Switching is seamless.
        </p>
      </footer>
    </div>
  );
}
