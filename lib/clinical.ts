/**
 * Clinical Constants for PCOMS (Partners for Change Outcome Management System)
 */

export const ORS_CLINICAL_CUTOFF = 25; // Adult cutoff; scores below this indicate clinical range
export const ORS_RELIABLE_CHANGE = 6;  // A change of 6+ points is statistically reliable improvement

/**
 * ORS Score Interpretation
 */
export const getORSInterpretation = (score: number) => {
  if (score <= 15) return "It sounds like things are really tough right now. Your therapist will have this context going into today's session.";
  if (score <= 24) return "You are carrying a lot. This is exactly the kind of context that helps your therapist focus on what matters most today.";
  if (score <= 32) return "You are in a steady place. Your therapist can use this to build on what is working.";
  return "Things are going well. This is a good time to consolidate progress and look ahead.";
};
