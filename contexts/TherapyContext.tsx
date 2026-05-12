"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types/engine';

interface FeedbackEntry {
  srsTotal: number; // Out of 15 (3 questions * 5)
  date: string;
}

interface ORSEntry {
  personal: number;
  interpersonal: number;
  social: number;
  overall: number;
  total: number;
  date: string;
}

interface ReflectionEntry {
  id: string;
  promptId: number;
  promptText: string;
  response: string;
  date: string;
}

interface TherapyContextType {
  activeProfile: UserProfile | null;
  setActiveProfile: (profile: UserProfile | null) => void;
  moodHistory: { mood: string; date: string }[];
  addMood: (mood: string) => void;
  feedbackLog: FeedbackEntry[];
  addFeedback: (srsTotal: number) => void;
  orsHistory: ORSEntry[];
  addORS: (entry: Omit<ORSEntry, 'date'>) => void;
  reflectionHistory: ReflectionEntry[];
  addReflection: (entry: Omit<ReflectionEntry, 'id' | 'date'>) => void;
  currentSrsMean: number;
}

const TherapyContext = createContext<TherapyContextType | undefined>(undefined);

export function TherapyProvider({ children }: { children: React.ReactNode }) {
  const [activeProfile, setActiveProfileState] = useState<UserProfile | null>(null);
  const [moodHistory, setMoodHistory] = useState<{ mood: string; date: string }[]>([]);
  const [feedbackLog, setFeedbackLog] = useState<FeedbackEntry[]>([
    { srsTotal: 14, date: "Wk 1" },
    { srsTotal: 15, date: "Wk 2" },
    { srsTotal: 14, date: "Wk 3" },
  ]);
  const [orsHistory, setOrsHistory] = useState<ORSEntry[]>([
    { personal: 4, interpersonal: 5, social: 4, overall: 4, total: 17, date: "Wk 1" },
    { personal: 5, interpersonal: 6, social: 5, overall: 5, total: 21, date: "Wk 2" },
    { personal: 6, interpersonal: 7, social: 6, overall: 6, total: 25, date: "Wk 3" },
  ]);
  const [reflectionHistory, setReflectionHistory] = useState<ReflectionEntry[]>([]);

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

    const storedORS = sessionStorage.getItem('orsHistory');
    if (storedORS) setOrsHistory(JSON.parse(storedORS));

    const storedReflections = sessionStorage.getItem('reflectionHistory');
    if (storedReflections) setReflectionHistory(JSON.parse(storedReflections));
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

  const addORS = (entry: Omit<ORSEntry, 'date'>) => {
    const newEntry = { ...entry, date: new Date().toISOString() };
    const newHistory = [...orsHistory, newEntry];
    setOrsHistory(newHistory);
    sessionStorage.setItem('orsHistory', JSON.stringify(newHistory));
  };

  const addReflection = (entry: Omit<ReflectionEntry, 'id' | 'date'>) => {
    const newEntry = {
      ...entry,
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString()
    };
    const newHistory = [newEntry, ...reflectionHistory];
    setReflectionHistory(newHistory);
    sessionStorage.setItem('reflectionHistory', JSON.stringify(newHistory));
  };

  // Convert raw /15 SRS totals to standard 5.0 scale for the dashboard
  const currentSrsMean = feedbackLog.length > 0 
    ? (feedbackLog.reduce((acc, curr) => acc + curr.srsTotal, 0) / feedbackLog.length) / 3 
    : 4.8;

  return (
    <TherapyContext.Provider value={{
      activeProfile,
      setActiveProfile,
      moodHistory,
      addMood,
      feedbackLog,
      addFeedback,
      orsHistory,
      addORS,
      reflectionHistory,
      addReflection,
      currentSrsMean
    }}>
      {children}
    </TherapyContext.Provider>
  );
}

export function useTherapy() {
  const context = useContext(TherapyContext);
  if (context === undefined) {
    throw new Error('useTherapy must be used within a TherapyProvider');
  }
  return context;
}
