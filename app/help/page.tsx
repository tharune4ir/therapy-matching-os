"use client";

import React from 'react';
import { Search, HelpCircle, Phone, MessageCircle, Mail, ExternalLink, ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  const faqs = [
    { q: "How does the matching algorithm work?", a: "We use a 28-variable weighted system called C-NIP to match your personality and clinical needs with therapist specializations." },
    { q: "Can I change my therapist?", a: "Yes, you can request a re-match at any time from your journey page if you feel the alliance isn't working." },
    { q: "Is my data private?", a: "Absolutely. All clinical data is encrypted and we never share your identity with third parties without consent." }
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-therapy-bg pb-24 font-sans text-therapy-text">
      {/* Header */}
      <header className="pt-12 px-6 mb-8">
        <h1 className="font-serif text-3xl text-therapy-text leading-tight">Help & Support</h1>
      </header>

      <main className="px-6 space-y-8 animate-breathe">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-therapy-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search for help..." 
            className="w-full bg-white border border-therapy-primary/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-therapy-primary/20"
          />
        </div>

        {/* Emergency Card */}
        <div className="bg-red-50 rounded-[2rem] p-6 border border-red-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="text-red-600" size={20} />
            <h2 className="font-serif text-lg text-red-900">In a Crisis?</h2>
          </div>
          <p className="text-xs text-red-800/80 leading-relaxed mb-4">
            If you are in immediate danger, please reach out to local emergency services or a crisis helpline.
          </p>
          <button className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2">
            <Phone size={16} />
            Call Crisis Helpline
          </button>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-therapy-primary/5 shadow-sm text-center">
            <div className="w-10 h-10 bg-therapy-primary/10 rounded-full flex items-center justify-center text-therapy-primary mx-auto mb-3">
              <MessageCircle size={20} />
            </div>
            <p className="text-sm font-semibold">Live Chat</p>
            <p className="text-[10px] text-therapy-text-muted mt-1">2 min wait</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-therapy-primary/5 shadow-sm text-center">
            <div className="w-10 h-10 bg-therapy-primary/10 rounded-full flex items-center justify-center text-therapy-primary mx-auto mb-3">
              <Mail size={20} />
            </div>
            <p className="text-sm font-semibold">Email Us</p>
            <p className="text-[10px] text-therapy-text-muted mt-1">24h response</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-therapy-text-muted px-2">Frequently Asked Questions</h3>
          <div className="bg-white rounded-[2rem] overflow-hidden border border-therapy-primary/5 shadow-sm">
            {faqs.map((faq, index) => (
              <React.Fragment key={index}>
                <div className="p-6">
                  <p className="font-semibold text-sm mb-2">{faq.q}</p>
                  <p className="text-xs text-therapy-text-muted leading-relaxed">{faq.a}</p>
                </div>
                {index < faqs.length - 1 && <div className="h-px bg-therapy-surface mx-6" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* External Resources */}
        <div className="pt-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-therapy-text-muted px-2 mb-4">Resources</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-therapy-surface rounded-2xl">
              <span className="text-sm font-medium">Therapeutic Alliance Guide</span>
              <ExternalLink size={16} className="text-therapy-text-muted" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-therapy-surface rounded-2xl">
              <span className="text-sm font-medium">Community Guidelines</span>
              <ExternalLink size={16} className="text-therapy-text-muted" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
