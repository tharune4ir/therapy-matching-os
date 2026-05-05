export type ConcernTag = `${number}.${number}`;

export interface CNIP {
  directiveness: number; // -15 to +15
  emotionalIntensity: number; // -15 to +15
  pastOrientation: number; // -15 to +15
  warmth: number; // -15 to +15
}

export type AttachmentStyle = 
  | 'Secure' 
  | 'Anxious-preoccupied' 
  | 'Dismissive-avoidant' 
  | 'Fearful-avoidant';

export type StageOfChange = 
  | 'Pre-contemplation' 
  | 'Contemplation' 
  | 'Preparation' 
  | 'Action' 
  | 'Maintenance';

export type PriorTherapy = 'Experienced' | 'First-timer';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: string; // 'M', 'F', 'NB'
  pronouns: string;
  sexuality: string;
  city: string;
  occupation: string;
  industry: string;
  languages: string[];
  primaryConcerns: ConcernTag[]; // 1 to 3 items
  secondaryConcerns: ConcernTag[];
  durationMonths: number;
  severity: number; // 1-10
  familyStructure: string;
  familyDynamics: string;
  religion: string;
  religiousSalience: number; // 1-10
  culturalSensitivities: string[];
  attachmentStyle: AttachmentStyle;
  stageOfChange: StageOfChange;
  cnip: CNIP;
  therapistGenderPref: 'M' | 'F' | 'NB' | 'Either' | 'Strong F' | 'Strong M';
  priorTherapy: PriorTherapy;
  budgetMin: number;
  budgetMax: number;
  formatPref: ('Video' | 'Phone' | 'In-person' | 'Chat')[];
  timePref: string[];
  dropoutTriggers: string[];
  stayTriggers: string[];
}

export interface TherapistProfile {
  id: string;
  name: string;
  gender: string; // 'M', 'F', 'NB'
  ageRange: string; // e.g. "30-35"
  city: string;
  credentials: string;
  rciNumber: string;
  yearsExperience: number;
  modalities: string[];
  specializations: ConcernTag[];
  languages: string[];
  cnip: CNIP;
  warmth: number; // 1-10
  directiveness: number; // 1-10
  challenge: number; // 1-10
  culturalCompetencies: string[];
  qacpCertified: boolean;
  traumaSpecialization: boolean;
  isPsychiatrist: boolean;
  fee: number;
  formats: ('Video' | 'Phone' | 'In-person' | 'Chat')[];
  availability: string[];
  session5Retention: number; // 0.0 to 1.0
  avgSrsBond: number; // 0.0 to 5.0
  about: string;
  bestWith: string[];
  strugglesWith: ConcernTag[]; // anti-match variables
}

export interface TopDimension {
  dimensionId: string;
  dimensionName: string;
  contribution: number;
}

export interface MatchResult {
  therapist: TherapistProfile;
  matchScore: number;
  dimensions: Record<string, number>;
  topDimensions: TopDimension[];
  whyText: string;
}

