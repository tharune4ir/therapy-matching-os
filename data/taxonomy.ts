import { ConcernTag } from '../types/engine';

export const TAXONOMY: Record<ConcernTag, string> = {
  // 1. Anxiety Spectrum
  '1.1': 'Generalized anxiety',
  '1.2': 'Social anxiety / performance anxiety',
  '1.3': 'Panic disorder',
  '1.4': 'Health anxiety / illness anxiety',
  '1.5': 'Phobias (specific)',
  '1.6': 'Indian-specific anxiety (timeline, social-evaluation, corporate)',

  // 2. Mood Disorders
  '2.1': 'Major depressive episode',
  '2.2': 'Persistent depressive disorder (dysthymia)',
  '2.3': 'Bipolar spectrum',
  '2.4': 'Perinatal/postpartum depression',
  '2.5': 'Seasonal/work-cycle depression',
  '2.6': 'Indian-specific depression (adjustment, joint-family)',

  // 3. Trauma & Stress-Related
  '3.1': 'PTSD (single-event)',
  '3.2': 'Complex/childhood trauma',
  '3.3': 'Sexual violence / harassment trauma',
  '3.4': 'Adjustment disorders',
  '3.5': 'Grief (acute, complicated, anticipatory)',
  '3.6': 'Indian-specific trauma (caste, medical, family-violence)',

  // 4. Relationship & Family
  '4.1': 'Marital conflict',
  '4.2': 'Pre-marital / dating issues',
  '4.3': 'Breakup / divorce adjustment',
  '4.4': 'Parenting stress',
  '4.5': 'Adult attachment & dating patterns',
  '4.6': 'Sexual concerns',
  '4.7': 'Indian-specific family (in-law conflict, joint-family enmeshment)',

  // 5. Identity & Existential
  '5.1': 'LGBTQIA+ identity, coming out, minority stress',
  '5.2': 'Gender dysphoria / questioning',
  '5.3': 'Career identity / purpose',
  '5.4': 'Mid-life crisis',
  '5.5': 'NRI-returnee / diaspora identity',
  '5.6': 'Religious/spiritual struggle',
  '5.7': 'Indian-specific identity (caste reckoning, queer in joint-family)',

  // 6. Workplace & Career
  '6.1': 'Burnout',
  '6.2': 'Toxic workplace / bullying',
  '6.3': 'Imposter syndrome',
  '6.4': 'Career transition / layoff',
  '6.5': 'Work-life balance / dual-earner conflicts',
  '6.6': 'Performance anxiety (work)',
  '6.7': 'Indian-specific career (startup hustle, exam prep)',

  // 7. Neurodevelopmental
  '7.1': 'ADHD adult',
  '7.2': 'Autism spectrum (adult diagnosis)',
  '7.3': 'Learning differences',

  // 8. OCD & Related
  '8.1': 'OCD (contamination, checking, harm)',
  '8.2': 'BDD',
  '8.3': 'Hoarding',
  '8.4': 'Indian-specific scrupulosity (religious purity)',

  // 9. Substance & Behavioral
  '9.1': 'Alcohol use disorder',
  '9.2': 'Cannabis / other substances',
  '9.3': 'Gambling (incl. fantasy-sports)',
  '9.4': 'Internet / smartphone / porn / gaming',
  '9.5': 'Indian-specific addiction (binge-drinking culture, tobacco)',

  // 10. Eating & Body Image
  '10.1': 'Anorexia / restrictive',
  '10.2': 'Bulimia / binge-eating',
  '10.3': 'Sub-clinical disordered eating',
  '10.4': 'Indian-specific body image (wedding-weight, colorism)',

  // 11. Personality & Self
  '11.1': 'BPD-spectrum / emotion dysregulation',
  '11.2': 'NPD-spectrum',
  '11.3': 'Avoidant / dependent patterns',
  '11.4': 'Self-esteem / chronic self-criticism',

  // 12. Health & Adjustment
  '12.1': 'Chronic illness adjustment',
  '12.2': 'Infertility / reproductive',
  '12.3': 'Perimenopause / hormonal',
  '12.4': 'Sleep disorders',
  '12.5': 'Chronic pain'
};

export const MODALITIES = [
  'CBT', 'ACT', 'DBT', 'Psychodynamic', 'Person-Centred', 'Humanistic',
  'EMDR', 'Somatic Experiencing', 'IFS', 'Narrative', 'Gestalt',
  'EFT', 'Gottman Method', 'MI', 'Schema Therapy', 'Mindfulness-Based',
  'Solution-Focused Brief Therapy (SFBT)', 'Transactional Analysis (TA)',
  'REBT', 'IPT', 'Art-Based Therapy', 'Pharmacotherapy'
];
