"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOnboarding = pathname.startsWith("/onboarding");

  if (isOnboarding) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg relative shadow-2xl overflow-hidden flex flex-col font-sans">
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
