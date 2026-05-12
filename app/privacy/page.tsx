"use client";

import React from 'react';
import { ChevronLeft, Shield, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-therapy-bg flex flex-col font-sans text-therapy-text">
      <header className="px-6 py-6 flex items-center gap-4">
        <Link href="/profile" className="p-2 -ml-2 text-therapy-text-muted hover:text-therapy-text transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="font-serif text-xl">Privacy & Security</h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center animate-breathe">
        <div className="w-24 h-24 bg-therapy-surface rounded-full flex items-center justify-center mb-6 shadow-sm border border-therapy-primary/5">
          <Shield size={40} className="text-therapy-primary" />
        </div>
        <h2 className="font-serif text-2xl mb-3 text-therapy-text">Safe & Secure</h2>
        <p className="text-sm text-therapy-text-muted leading-relaxed mb-8 max-w-xs">
          Your privacy is our priority. In the full release, you'll be able to manage your data, encryption keys, and session history here.
        </p>
        <div className="bg-therapy-primary/5 px-4 py-2 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-therapy-primary-deep">
          <Lock size={12} />
          Coming soon in the full release
        </div>
      </main>
    </div>
  );
}
