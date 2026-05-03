"use client";

import React from "react";
import { House, TrendingUp, User, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: House, href: "/" },
    { label: "Journey", icon: TrendingUp, href: "/journey" },
    { label: "Profile", icon: User, href: "/profile" },
    { label: "Help", icon: Heart, href: "/help" },
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
    </nav>
  );
};

export default BottomNav;
