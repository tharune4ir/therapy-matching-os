"use client";

import React from 'react';
import { User, Settings, RefreshCw, LogOut, ChevronRight, Bell, Shield, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const menuItems = [
    { icon: <User size={20} />, label: "Therapy Preferences", href: "/settings" },
    { icon: <Bell size={20} />, label: "Notifications", href: "/settings" },
    { icon: <Shield size={20} />, label: "Privacy & Security", href: "/settings" },
    { icon: <CreditCard size={20} />, label: "Billing", href: "/settings" },
    { icon: <Settings size={20} />, label: "Account Settings", href: "/settings" },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg pb-32 font-sans text-trellis-text">
      {/* Header */}
      <h1 className="font-serif text-3xl pt-12 px-6 mb-8 text-trellis-text leading-tight">
        Profile
      </h1>

      {/* User Card */}
      <div className="mx-6 mb-8 bg-trellis-surface rounded-[2.5rem] p-6 flex items-center gap-5 border border-trellis-primary/5">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl font-serif text-trellis-primary-deep shadow-sm">
          MK
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold text-trellis-text">Meera Krishnan</p>
          <p className="text-sm text-trellis-text-muted mt-0.5">meera@example.com</p>
        </div>
      </div>

      {/* Menu List */}
      <div className="mx-6 space-y-1">
        {menuItems.map((item, i) => (
          <Link 
            key={i} 
            href={item.href}
            className="flex items-center justify-between w-full py-5 border-b border-trellis-text/5 last:border-0 group active:bg-trellis-surface/50 transition-colors rounded-xl px-2 -mx-2"
          >
            <div className="flex items-center gap-4">
              <div className="text-trellis-text-muted group-hover:text-trellis-primary transition-colors">
                {item.icon}
              </div>
              <span className="text-base font-medium">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-trellis-text-muted/30" />
          </Link>
        ))}
      </div>

      {/* Re-match CTA */}
      <div className="mx-6 mt-10 bg-[#E8E2D2] rounded-[2.5rem] p-8 border-l-[6px] border-trellis-accent shadow-sm">
        <h3 className="font-serif text-xl text-trellis-text mb-3 leading-tight">Not feeling the fit?</h3>
        <p className="text-sm text-trellis-text-muted mb-6 leading-relaxed font-medium">
          It&apos;s completely okay to switch. The connection with your therapist is the most important part of this journey.
        </p>
        <Link 
          href="/rematch" 
          className="bg-white text-trellis-text px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all w-max border border-trellis-accent/10"
        >
          <RefreshCw size={16} className="text-trellis-accent" />
          Explore a re-match
        </Link>
      </div>

      {/* Log Out */}
      <button className="flex items-center gap-3 mx-8 mt-12 text-trellis-text-muted hover:text-trellis-accent transition-colors font-bold text-xs uppercase tracking-widest">
        <LogOut size={18} />
        Log Out
      </button>

      {/* Version Info */}
      <p className="text-center text-[10px] text-trellis-text-muted/40 mt-12 pb-8">
        Trellis Prototype v1.8 · Built for Elfina Health
      </p>
    </div>
  );
}
