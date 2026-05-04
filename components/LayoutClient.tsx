"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";
import AIAssistant from "./AIAssistant";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOnboarding = pathname.startsWith("/onboarding");
  const isAdmin = pathname.startsWith("/admin");
  const isProfile = pathname === "/match";
  const isBooked = pathname.startsWith("/booked");
  const isListens = pathname.startsWith("/listens");

  const hideNav = isOnboarding || isAdmin || isProfile || isBooked || isListens;

  if (hideNav) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg relative shadow-2xl overflow-hidden flex flex-col font-sans">
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <BottomNav />
      {!hideNav && <AIAssistant />}
    </div>
  );
}
