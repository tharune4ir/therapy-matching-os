"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types/engine';

interface FeedbackEntry {
  srsTotal: number; // Out of 15 (3 questions * 5)
  date: string;
}

interface TrellisContextType {
  activeProfile: UserProfile | null;
  setActiveProfile: (profile: UserProfile | null) => void;
  moodHistory: { mood: string; date: string }[];
  addMood: (mood: string) => void;
  feedbackLog: FeedbackEntry[];
  addFeedback: (srsTotal: number) => void;
  currentSrsMean: number;
}

const TrellisContext = createContext<TrellisContextType | undefined>(undefined);

export function TrellisProvider({ children }: { children: React.ReactNode }) {
  const [activeProfile, setActiveProfileState] = useState<UserProfile | null>(null);
  const [moodHistory, setMoodHistory] = useState<{ mood: string; date: string }[]>([]);
  const [feedbackLog, setFeedbackLog] = useState<FeedbackEntry[]>([
    { srsTotal: 14, date: "Wk 1" },
    { srsTotal: 15, date: "Wk 2" },
    { srsTotal: 14, date: "Wk 3" },
  ]); // Seeded with some healthy prior data for the rupture demo

  useEffect(() => {
    // Rehydrate on mount
    const stored = sessionStorage.getItem('activeProfile');
    if (stored) {
      try {
        setActiveProfileState(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse active profile", e);
      }
    }
    
    const storedMoods = sessionStorage.getItem('moodHistory');
    if (storedMoods) setMoodHistory(JSON.parse(storedMoods));
    
    const storedFeedback = sessionStorage.getItem('feedbackLog');
    if (storedFeedback) setFeedbackLog(JSON.parse(storedFeedback));
  }, []);

  const setActiveProfile = (profile: UserProfile | null) => {
    setActiveProfileState(profile);
    if (profile) {
      sessionStorage.setItem('activeProfile', JSON.stringify(profile));
    } else {
      sessionStorage.removeItem('activeProfile');
    }
  };

  const addMood = (mood: string) => {
    const newHistory = [...moodHistory, { mood, date: new Date().toISOString() }];
    setMoodHistory(newHistory);
    sessionStorage.setItem('moodHistory', JSON.stringify(newHistory));
  };

  const addFeedback = (srsTotal: number) => {
    const newFeedback = [...feedbackLog, { srsTotal, date: new Date().toISOString() }];
    setFeedbackLog(newFeedback);
    sessionStorage.setItem('feedbackLog', JSON.stringify(newFeedback));
  };

  // Convert raw /15 SRS totals to standard 5.0 scale for the dashboard
  const currentSrsMean = feedbackLog.length > 0 
    ? (feedbackLog.reduce((acc, curr) => acc + curr.srsTotal, 0) / feedbackLog.length) / 3 
    : 4.8;

  return (
    <TrellisContext.Provider value={{
      activeProfile,
      setActiveProfile,
      moodHistory,
      addMood,
      feedbackLog,
      addFeedback,
      currentSrsMean
    }}>
      {children}
    </TrellisContext.Provider>
  );
}

export function useTrellis() {
  const context = useContext(TrellisContext);
  if (context === undefined) {
    throw new Error('useTrellis must be used within a TrellisProvider');
  }
  return context;
}
