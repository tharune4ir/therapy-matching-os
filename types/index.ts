export interface OnboardingData {
  // Chapter 1: Clinical 
  concerns: string[];
  duration: string;
  severity: string;
  // Chapter 2: Demographics
  age: string;
  gender: string;
  pronouns: string;
  languages: string[];
  city: string;
  // Chapter 3: Therapist Preferences
  therapistStyle: string;
  therapistFocus: string;
  genderPreference: string;
  // Chapter 4: Cultural Fit
  familyDynamics: string;
  religion: string;
  // Chapter 5: Logistics
  format: string;
  budget: string;
  priorTherapy: string;
  readiness?: string;
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  credentials: string;
  experience: string;
  matchScore: number;
  imageInitials: string;
  tags: string[];
  languages: string[];
  about: string;
  whyWeMatchedYou: string;
  fee: string;
  availability: string;
}
