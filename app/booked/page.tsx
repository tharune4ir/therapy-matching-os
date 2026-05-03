"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function BookedPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg flex flex-col items-center justify-center px-8 text-center">
      <div className="animate-breathe mb-8">
        <CheckCircle className="text-trellis-primary w-24 h-24" strokeWidth={1.5} />
      </div>

      <h1 className="font-serif text-3xl text-trellis-text leading-tight">
        Discovery Call Requested
      </h1>

      <p className="text-trellis-text-muted mt-6 leading-relaxed max-w-xs">
        We&apos;ve sent your profile to Dr. Priya Menon. You&apos;ll receive an email shortly to pick a 15-minute slot that works for you.
      </p>

      <div className="mt-16 w-full space-y-4">
        <Link 
          href="/" 
          className="block w-full bg-trellis-surface text-trellis-text py-4 rounded-2xl font-semibold active:scale-[0.98] transition-all"
        >
          Return Home
        </Link>
        <p className="text-[11px] text-trellis-text-muted uppercase tracking-widest font-bold">
          Ref: #TRL-{Math.floor(1000 + Math.random() * 9000)}
        </p>
      </div>

      {/* Decorative background element */}
      <div className="fixed -bottom-24 -left-24 w-64 h-64 bg-trellis-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed -top-24 -right-24 w-64 h-64 bg-trellis-secondary/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
