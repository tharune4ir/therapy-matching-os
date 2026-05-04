"use client";

import React, { useState } from "react";
import { House, TrendingUp, User, Heart, Menu, X, Database } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Matches", icon: User, href: "/matches" },
    { label: "Journey", icon: TrendingUp, href: "/journey" },
    { label: "Feedback", icon: Heart, href: "/feedback" },
  ];

  return (
    <nav className="sticky bottom-0 w-full bg-trellis-surface/90 backdrop-blur-md border-t border-trellis-text/5 min-h-[60px] flex items-center justify-around px-6 pb-2 z-40">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors duration-300 min-w-[44px] min-h-[44px] justify-center ${
              isActive ? "text-trellis-primary" : "text-trellis-text-muted"
            }`}
          >
            <Icon size={24} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}

      {/* Menu Trigger */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="flex flex-col items-center gap-1 transition-colors duration-300 min-w-[44px] min-h-[44px] justify-center text-trellis-text-muted hover:text-trellis-primary"
      >
        <Menu size={24} />
        <span className="text-[10px] font-medium">Menu</span>
      </button>

      {/* Slide-Up Drawer */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 animate-slide-up pb-8 pt-2 px-6">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl text-trellis-text">More</h3>
              <button onClick={() => setIsMenuOpen(false)} className="text-trellis-text-muted p-2 bg-trellis-surface rounded-full">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-trellis-surface transition-colors">
                <div className="p-2 bg-trellis-primary/10 rounded-xl text-trellis-primary-deep">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-semibold text-trellis-text">Your Profile</p>
                  <p className="text-xs text-trellis-text-muted">View your active C-NIP match profile</p>
                </div>
              </Link>

              <Link href="/help" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-trellis-surface transition-colors">
                <div className="p-2 bg-trellis-primary/10 rounded-xl text-trellis-primary-deep">
                  <Heart size={20} />
                </div>
                <div>
                  <p className="font-semibold text-trellis-text">Help & Support</p>
                  <p className="text-xs text-trellis-text-muted">FAQ and crisis resources</p>
                </div>
              </Link>

              <div className="h-px bg-trellis-surface my-2 mx-4" />

              <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-trellis-surface transition-colors">
                <div className="p-2 bg-gray-100 rounded-xl text-gray-600">
                  <Database size={20} />
                </div>
                <div>
                  <p className="font-semibold text-trellis-text">Algorithm Sandbox</p>
                  <p className="text-xs text-trellis-text-muted">Admin view of 352-matrix</p>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default BottomNav;
