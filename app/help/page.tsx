"use client";

import React from 'react';
import { Mail, MessageCircle, ShieldAlert, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg pb-24 font-sans text-trellis-text">
      {/* Header */}
      <div className="pt-12 px-6 mb-8">
        <h1 className="font-serif text-3xl mb-2 text-trellis-text">Help & Support</h1>
        <p className="text-trellis-text-muted">How can we support your journey today?</p>
      </div>

      {/* Contact Cards */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-10">
        <button className="bg-trellis-surface rounded-2xl p-6 flex flex-col items-center text-center group active:scale-95 transition-all border border-trellis-primary/5">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:text-trellis-primary transition-colors">
            <MessageCircle size={24} />
          </div>
          <span className="text-xs font-bold text-trellis-text">Chat with Care Team</span>
        </button>

        <button className="bg-trellis-surface rounded-2xl p-6 flex flex-col items-center text-center group active:scale-95 transition-all border border-trellis-primary/5">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:text-trellis-primary transition-colors">
            <Mail size={24} />
          </div>
          <span className="text-xs font-bold text-trellis-text">Email Support</span>
        </button>
      </div>

      {/* FAQ Section */}
      <div className="px-6 space-y-4">
        <h2 className="font-serif text-xl mb-4 text-trellis-text">Frequently Asked Questions</h2>
        
        <div className="space-y-3">
          {[
            "How does the matching algorithm work?",
            "Can I switch my therapist?",
            "Is my data confidential?",
          ].map((question, i) => (
            <div key={i} className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border border-trellis-primary/5 active:bg-trellis-surface transition-colors cursor-pointer group">
              <span className="text-sm font-medium text-trellis-text group-hover:text-trellis-primary-deep transition-colors leading-tight pr-4">
                {question}
              </span>
              <ChevronDown size={16} className="text-trellis-text-muted flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Crisis Link */}
      <div className="mx-6 mt-12">
        <Link 
          href="/support" 
          className="bg-trellis-crisis/10 border border-trellis-crisis/20 text-trellis-crisis rounded-2xl p-5 flex items-center justify-center gap-3 font-bold text-sm shadow-sm active:scale-[0.98] transition-all"
        >
          <ShieldAlert size={20} strokeWidth={2.5} />
          I am in a crisis right now
        </Link>
      </div>

      {/* Version Footer */}
      <p className="text-center text-[10px] text-trellis-text-muted/40 mt-16 px-12 leading-relaxed">
        Our support team typically responds within 2-4 hours. For emergencies, please use the crisis resources above.
      </p>
    </div>
  );
}
