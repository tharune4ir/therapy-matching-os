import { Therapist } from '../types';

export const topMatch: Therapist = {
  id: 't_001',
  name: 'Dr. Priya Menon',
  title: 'Clinical Psychologist',
  credentials: 'RCI Registered',
  experience: '7 years exp.',
  matchScore: 91,
  imageInitials: 'PM',
  tags: ['Burnout', 'Anxiety', 'ACT', 'Person-Centred'],
  languages: ['English', 'Tamil', 'Malayalam'],
  about: 'I work collaboratively with young professionals navigating high-stress environments. My approach is warm but gently challenging, focusing on practical coping skills while understanding the deeper roots of your burnout.',
  whyWeMatchedYou: "You mentioned that work has been overwhelming and you'd like someone collaborative. Priya works with many young professionals navigating burnout, and people describe her as warm but quietly direct. She speaks Tamil — which means the moments when English doesn't capture what you're feeling, she'll understand.",
  fee: '₹2,000 / session',
  availability: 'Mon, Wed, Fri (Evenings)'
};

export const alternativeMatches: Therapist[] = [
  {
    id: 't_002',
    name: 'Ananya Sharma',
    title: 'Counselling Psychologist',
    credentials: 'MA Psychology',
    experience: '5 years exp.',
    matchScore: 87,
    imageInitials: 'AS',
    tags: ['CBT', 'Mindfulness', 'Anxiety'],
    languages: ['English', 'Hindi'],
    about: 'I provide structured, skills-focused therapy to help you manage anxiety and build resilience in your daily life.',
    whyWeMatchedYou: 'Ananya is highly structured and practical. If you decide you want more homework and specific coping mechanisms, she is a fantastic alternative.',
    fee: '₹1,800 / session',
    availability: 'Tue, Thu (Mornings)'
  },
  {
    id: 't_003',
    name: 'Dr. Kavitha Rao',
    title: 'Clinical Psychologist',
    credentials: 'RCI Registered',
    experience: '10 years exp.',
    matchScore: 84,
    imageInitials: 'KR',
    tags: ['Psychodynamic', 'ACT', 'Identity'],
    languages: ['English', 'Kannada', 'Tamil'],
    about: 'My approach is exploratory and insight-oriented, helping you connect past patterns to present-day challenges.',
    whyWeMatchedYou: 'Kavitha has deep clinical experience. While she is less directive than Priya, she is excellent for deep, exploratory work.',
    fee: '₹2,500 / session',
    availability: 'Weekends'
  }
];

export const allMatches = [topMatch, ...alternativeMatches];
