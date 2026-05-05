import { UserProfile, TherapistProfile, MatchResult, TopDimension } from '../../types/engine';
import { generateWhyText, getDimensionName } from './explainMatch';

export const DEFAULT_WEIGHTS = {
  W1: 18, W2: 9, W3: 9, W4: 6, W5: 5,
  W6: 8, W7: 5, W8: 7, W9: 4, W10: 5,
  W11: 4, W12: 2, W13: 3, W14: 2, W15: 2,
  W16: 3, W17: 2, W18: 2, W19: 1, W20: 2,
  W21: 3, W22: 2, W23: 1, W24: 2, W25: 2,
  W26: 1, W27: 1, W28: 3 // negative modifier
};

// --- LAYER 1: HARD FILTERS ---
export function passesAllHardFilters(user: UserProfile, therapist: TherapistProfile, relaxLevel: number = 0): boolean {
  // H1 Language overlap (never relax)
  const h1 = user.languages.some(l => therapist.languages.includes(l));
  if (!h1) return false;

  // H5 Queer-affirmative gate (never relax)
  if (['gay', 'lesbian', 'bi', 'queer', 'bisexual'].includes(user.sexuality) || ['NB', 'trans', 'they/them'].includes(user.gender)) {
    if (!therapist.qacpCertified) return false;
  }

  // H7 Trauma specialty (never relax)
  const hasTrauma = user.primaryConcerns.some(c => c.startsWith('3.'));
  if (hasTrauma && user.severity >= 7) {
    if (!therapist.traumaSpecialization && !therapist.modalities.includes('EMDR')) return false;
  }

  // H8 Severity-license gate (never relax)
  if (user.severity >= 8) {
    if (!therapist.rciNumber && !therapist.isPsychiatrist) return false;
  }

  // H9 Therapist-gender hard pref (never relax)
  if (user.therapistGenderPref.startsWith('Strong')) {
    const pref = user.therapistGenderPref.replace('Strong ', '');
    if (therapist.gender !== pref) return false;
  }

  // Relaxable filters
  if (relaxLevel < 2) {
    // H14 Format compatibility (relaxable)
    const h2 = user.formatPref.some(f => therapist.formats.includes(f));
    if (!h2) return false;
  }

  if (relaxLevel < 3) {
    // H3 Fee fit (relaxable)
    const h3 = therapist.fee <= (user.budgetMax * 1.10);
    if (!h3) return false;
  }

  if (relaxLevel < 1) {
    // H4 Availability overlap (relaxable)
    const h4 = user.timePref.some(t => 
      therapist.availability.includes(t) || 
      therapist.availability.includes('Flexible') || 
      t === 'Flexible' || t === 'Irregular'
    );
    if (!h4 && user.timePref.length > 0) return false;
  }

  return true;
}

// --- LAYER 2: COMPATIBILITY SCORING ---
function calculateDimensionScores(user: UserProfile, t: TherapistProfile) {
  let scores: Record<string, number> = {};

  // W1 Presenting-concern × specialization
  const overlappingConcerns = user.primaryConcerns.filter(c => t.specializations.includes(c));
  let w1 = user.primaryConcerns.length > 0 ? (overlappingConcerns.length / user.primaryConcerns.length) * 100 : 0;
  if (user.primaryConcerns.length > 0 && t.specializations.slice(0, 3).includes(user.primaryConcerns[0])) {
    w1 += 20; // Bonus if therapist's top 3 specs include user's #1 concern
  }
  scores.W1 = Math.min(w1, 100);

  // C-NIP Fits (-15 to +15 means a range of 30)
  scores.W2 = Math.max(0, 100 - (Math.abs(user.cnip.directiveness - t.cnip.directiveness) / 30 * 100));
  scores.W3 = Math.max(0, 100 - (Math.abs(user.cnip.warmth - t.cnip.warmth) / 30 * 100));
  scores.W4 = Math.max(0, 100 - (Math.abs(user.cnip.emotionalIntensity - t.cnip.emotionalIntensity) / 30 * 100));
  scores.W5 = Math.max(0, 100 - (Math.abs(user.cnip.pastOrientation - t.cnip.pastOrientation) / 30 * 100));

  // W6 Stage-of-change × therapist directiveness
  if (['Pre-contemplation', 'Contemplation'].includes(user.stageOfChange) && t.directiveness <= 5) scores.W6 = 100;
  else if (['Preparation', 'Action', 'Maintenance'].includes(user.stageOfChange) && t.directiveness >= 6) scores.W6 = 100;
  else scores.W6 = 30; // mismatch

  // W7 Attachment style fit (simplified)
  if (user.attachmentStyle === 'Secure') scores.W7 = 80;
  else if (user.attachmentStyle === 'Anxious-preoccupied') scores.W7 = t.warmth >= 8 ? 100 : 40;
  else if (user.attachmentStyle === 'Dismissive-avoidant') scores.W7 = t.cnip.emotionalIntensity <= 0 ? 90 : 50;
  else if (user.attachmentStyle === 'Fearful-avoidant') scores.W7 = (t.traumaSpecialization && t.warmth >= 8) ? 100 : 50;
  else scores.W7 = 50;

  // W9 Language-richness
  const sharedLangCount = user.languages.filter(l => t.languages.includes(l)).length;
  let w9 = (sharedLangCount / user.languages.length) * 100;
  if (user.languages.length > 0 && t.languages.includes(user.languages[0])) w9 += 25; // Mother-tongue bonus
  scores.W9 = Math.min(w9, 100);

  // W10 Cultural competency match
  const overlapCultural = user.culturalSensitivities.filter(c => t.culturalCompetencies.includes(c)).length;
  scores.W10 = user.culturalSensitivities.length > 0 ? (overlapCultural / user.culturalSensitivities.length) * 100 : 100;

  // W11 Therapist gender soft pref
  if (user.therapistGenderPref === 'Either') scores.W11 = 80;
  else if (user.therapistGenderPref.includes(t.gender)) scores.W11 = 100;
  else scores.W11 = 50;

  // W13 Fee within preferred range
  if (t.fee >= user.budgetMin && t.fee <= user.budgetMax) scores.W13 = 100;
  else if (t.fee <= user.budgetMax * 1.15) scores.W13 = 70;
  else scores.W13 = 0;

  // W24 Session-5 retention prior
  scores.W24 = Math.max(0, Math.min(100, (t.session5Retention - 0.65) / (0.95 - 0.65) * 100));

  // W25 Avg SRS bond prior
  scores.W25 = Math.max(0, Math.min(100, (t.avgSrsBond - 3.2) / (4.8 - 3.2) * 100));

  // W28 Struggles with anti-match
  const struggles = user.primaryConcerns.some(c => t.strugglesWith.includes(c));
  scores.W28 = struggles ? 100 : 0; // If 100, we'll subtract 25 points later

  // W8 Modality fit to concern
  let w8 = 80;
  if (user.primaryConcerns.includes('8.1') && t.modalities.includes('CBT')) w8 = 100;
  else if (user.primaryConcerns.includes('3.1') && t.modalities.includes('EMDR')) w8 = 100;
  else if (user.primaryConcerns.includes('5.4') && (t.modalities.includes('Psychodynamic') || t.modalities.includes('Humanistic'))) w8 = 100;
  scores.W8 = w8;

  // W12 Age band fit (Default 80 for prototype lacking strict age bounds)
  scores.W12 = 80;

  // W14 Format preferred
  if (user.formatPref.length > 0 && t.formats.includes(user.formatPref[0])) scores.W14 = 100;
  else if (user.formatPref.length > 1 && t.formats.includes(user.formatPref[1])) scores.W14 = 80;
  else scores.W14 = 60;

  // W15 Time-slot density
  const overlapTimes = user.timePref.filter(time => t.availability.includes(time) || t.availability.includes('Flexible') || time === 'Flexible' || time === 'Irregular').length;
  scores.W15 = user.timePref.length > 0 ? (overlapTimes / user.timePref.length) * 100 : 100;

  // W16 Therapist experience vs severity
  if (user.severity >= 8) {
    if (t.yearsExperience >= 10) scores.W16 = 100;
    else if (t.yearsExperience >= 5) scores.W16 = 70;
    else scores.W16 = 40;
  } else {
    scores.W16 = 100;
  }

  // W17 Religious literacy
  if (user.culturalSensitivities.includes(user.religion) && t.culturalCompetencies.includes(user.religion)) scores.W17 = 100;
  else if (user.religiousSalience <= 3) scores.W17 = 90;
  else if (user.religiousSalience >= 7 && !t.culturalCompetencies.includes(user.religion)) scores.W17 = 40;
  else scores.W17 = 80;

  // W18 Caste-aware practice flag
  if (user.culturalSensitivities.includes('Caste') || user.culturalSensitivities.includes('Dalit/Bahujan')) {
    scores.W18 = t.culturalCompetencies.includes('Anti-caste') ? 100 : 60;
  } else scores.W18 = 100;

  // W19 NRI/diaspora literacy
  if (user.culturalSensitivities.includes('NRI diaspora') || user.culturalSensitivities.includes('NRI dynamics')) {
    scores.W19 = t.culturalCompetencies.includes('NRI/diaspora') ? 100 : 50;
  } else scores.W19 = 100;

  // W20 Prior-therapy fit
  if (user.priorTherapy === 'Experienced') {
    scores.W20 = (t.modalities.includes('Psychodynamic') || t.modalities.includes('IFS') || t.modalities.includes('Narrative')) ? 100 : 80;
  } else {
    scores.W20 = (t.modalities.includes('CBT') || t.modalities.includes('Solution-focused')) ? 100 : 80;
  }

  // W21 Therapist warmth
  if (user.cnip.warmth <= -7) { // negative means warmth-seeking in CNIP
    scores.W21 = t.warmth >= 9 ? 100 : 60;
  } else scores.W21 = 80;

  // W22 Therapist challenge
  if (user.cnip.warmth >= 7) { // positive means challenge-seeking
    scores.W22 = t.challenge >= 7 ? 100 : 60;
  } else scores.W22 = 80;

  // W23 Pace alignment
  scores.W23 = 80; // Baseline

  // W26 Capacity / waitlist
  scores.W26 = 100; // Assume 1st available within 7 days for prototype

  // W27 Specialization depth
  if (t.specializations.length > 0 && user.primaryConcerns.length > 0 && user.primaryConcerns[0] === t.specializations[0]) {
    scores.W27 = 100;
  } else {
    scores.W27 = 80;
  }

  return scores;
}

export function matchUserToTherapists(
  user: UserProfile, 
  therapistPool: TherapistProfile[], 
  weights: Record<string, number> = DEFAULT_WEIGHTS
): MatchResult[] {
  let relaxLevel = 0;
  let candidates = therapistPool.filter(t => passesAllHardFilters(user, t, relaxLevel));
  
  // Relax filters if no candidates
  while (candidates.length === 0 && relaxLevel < 4) {
    relaxLevel++;
    candidates = therapistPool.filter(t => passesAllHardFilters(user, t, relaxLevel));
  }

  const scored = candidates.map(t => {
    const dims = calculateDimensionScores(user, t);
    
    // SumProduct and track contributions
    let totalScore = 0;
    let weightSum = 0;
    const dimensionContributions: TopDimension[] = [];

    for (const [key, weight] of Object.entries(weights)) {
      if (key !== 'W28') {
        const score = dims[key] || 0;
        const contribution = score * weight;
        totalScore += contribution;
        weightSum += weight;

        dimensionContributions.push({
          dimensionId: key,
          dimensionName: getDimensionName(key),
          contribution: contribution / 100 // Normalized contribution
        });
      }
    }
    
    let score = totalScore / weightSum;
    
    // Apply W28 Anti-match penalty
    if (dims.W28 > 0) {
      score -= 25;
    }

    // Add synthesized dimensions if they were critical
    if (t.qacpCertified) {
      dimensionContributions.push({ 
        dimensionId: "QACP", 
        dimensionName: getDimensionName("QACP"), 
        contribution: 15 
      });
    }
    if (t.traumaSpecialization) {
      dimensionContributions.push({ 
        dimensionId: "TRAUMA", 
        dimensionName: getDimensionName("TRAUMA"), 
        contribution: 15 
      });
    }

    const topDimensions = dimensionContributions
      .sort((a, b) => b.contribution - a.contribution)
      .slice(0, 5);

    return {
      therapist: t,
      matchScore: Math.max(0, Math.round(score)),
      dimensions: dims,
      topDimensions,
      whyText: "" // filled below
    };
  });

  const ranked = scored.sort((a, b) => b.matchScore - a.matchScore);
  const top3 = ranked.slice(0, 3).map(match => ({
    ...match,
    whyText: generateWhyText(user, match.therapist, match.topDimensions)
  }));

  return top3;
}


// --- LAYER 3: FEEDBACK LEARNING (ORS + SRS) ---
export function updateWeightsFromFeedback(
  baseWeights: Record<string, number>, 
  orsGain: number, // ORS change
  srsMean: number, // SRS average out of 40
  usedDimensions: Record<string, number>
): Record<string, number> {
  const outcome = 0.5 * (orsGain / 6) + 0.5 * (srsMean / 40);
  const population_mean = 0.75;
  const eta = 0.05;
  
  const newWeights = { ...baseWeights };
  
  for (const [key, dimScore] of Object.entries(usedDimensions)) {
    if (dimScore > 80 && key !== 'W28') { 
      const currentWeight = newWeights[key as keyof typeof DEFAULT_WEIGHTS];
      const delta = eta * (outcome - population_mean) * currentWeight;
      
      const maxWeight = DEFAULT_WEIGHTS[key as keyof typeof DEFAULT_WEIGHTS] * 1.2;
      const minWeight = DEFAULT_WEIGHTS[key as keyof typeof DEFAULT_WEIGHTS] * 0.8;
      
      newWeights[key as keyof typeof DEFAULT_WEIGHTS] = Math.max(minWeight, Math.min(maxWeight, currentWeight + delta));
    }
  }
  
  return newWeights;
}
