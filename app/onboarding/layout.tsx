import React from "react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-trellis-bg relative shadow-2xl overflow-hidden flex flex-col font-sans">
      {children}
    </div>
  );
}
