import { UserProfile, TherapistProfile, TopDimension } from '../../types/engine';

const DIMENSION_NAMES: Record<string, string> = {
  "W1": "Specialization Match",
  "W2": "Communication Style",
  "W3": "Emotional Warmth",
  "W4": "Session Intensity",
  "W5": "Approach (Past vs. Present)",
  "W6": "Stage of Change Alignment",
  "W8": "Modality Fit",
  "W9": "Language Match",
  "W10": "Cultural Competency",
  "W11": "Gender Preference",
  "QACP": "LGBTQ+ Affirmative Care",
  "TRAUMA": "Trauma-Informed Care"
};

const formatConcern = (concern: string) => {
  // Simple mapping for display
  const maps: Record<string, string> = {
    "1.1": "workplace burnout",
    "1.2": "imposter syndrome",
    "2.1": "relationship anxiety",
    "3.1": "past trauma",
    "4.1": "feeling down",
    "5.1": "life transitions"
  };
  return maps[concern] || "what you're experiencing";
};

const templates: Record<string, (user: UserProfile, therapist: TherapistProfile) => string> = {
  "W1": (u, t) => {
    const sharedConcern = u.primaryConcerns.filter(c => t.specializations.includes(c))[0] || u.primaryConcerns[0];
    return `${t.name} specializes in working with people navigating ${formatConcern(sharedConcern)}, which is exactly what you told us you are dealing with right now.`;
  },
  "W2": (u, t) => {
    if (u.cnip.directiveness < -3) {
      return `You mentioned wanting a therapist who is collaborative rather than prescriptive. ${t.name} leans toward working with you, not directing you.`;
    } else if (u.cnip.directiveness > 3) {
      return `You said you prefer structure and clear direction. ${t.name} is known for being organized and action-oriented in sessions.`;
    }
    return `${t.name}'s style balances structure with flexibility, which fits your preference for a balanced approach.`;
  },
  "W3": (u, t) => {
    if (u.cnip.warmth < -5) {
      return `You said warmth matters to you. People who have worked with ${t.name} consistently describe the experience as safe and genuinely caring.`;
    } else if (u.cnip.warmth > 5) {
      return `You mentioned wanting someone willing to push you. ${t.name} is direct when it counts, while still being respectful of your pace.`;
    }
    return `${t.name} balances warmth with honest feedback, which matches your preference for a realistic connection.`;
  },
  "W6": (u, t) => {
    if (u.stageOfChange === "Pre-contemplation" || u.stageOfChange === "Contemplation") {
      return `You are still figuring out what you need, and that is completely fine. ${t.name} works well with people who are not yet sure what therapy should look like.`;
    } else if (u.stageOfChange === "Action" || u.stageOfChange === "Maintenance") {
      return `You are ready to work. ${t.name} matches that energy with a practical, skills-focused approach.`;
    }
    return `${t.name}'s pace matches where you are in your journey right now.`;
  },
  "W8": (u, t) => {
    const modality = t.modalities[0];
    return `${t.name} practices ${modality}, which research supports as effective for what you are working through.`;
  },
  "W9": (u, t) => {
    const shared = u.languages.filter(l => t.languages.includes(l));
    if (shared.length > 1) {
      return `${t.name} speaks ${shared.join(" and ")}, so you can express yourself in whichever language feels right in the moment.`;
    }
    return `${t.name} speaks ${shared[0]}, which means communication will feel natural.`;
  },
  "W10": (u, t) => {
    return `${t.name} has experience working with clients from similar cultural backgrounds, which means less time explaining context and more time doing the actual work.`;
  },
  "W11": (u, t) => {
    return `You mentioned preferring a ${t.gender === 'F' ? 'female' : 'male'} therapist, and ${t.name} fits that preference perfectly.`;
  },
  "QACP": (u, t) => {
    return `${t.name} is QACP-certified, ensuring your identity is understood and affirmed rather than treated as a "problem" to be solved.`;
  },
  "TRAUMA": (u, t) => {
    const traumaModalities = t.modalities.filter(m => ["EMDR", "Somatic Experiencing", "IFS"].includes(m));
    return `${t.name} is trained in ${traumaModalities.join(" and ") || 'trauma-informed care'}, approaches specifically designed for processing difficult experiences at a safe pace.`;
  },
};

export function getDimensionName(id: string): string {
  return DIMENSION_NAMES[id] || "Algorithm Match";
}

export function generateWhyText(user: UserProfile, therapist: TherapistProfile, topDimensions: TopDimension[]): string {
  // Take top 3 contributing dimensions
  const top3 = topDimensions.slice(0, 3);
  
  // Generate a sentence for each
  const sentences = top3
    .map(d => {
      // Special logic for QACP/TRAUMA which are synthesized from hard filters or mods
      if (d.dimensionId === 'TRAUMA' || d.dimensionId === 'QACP') {
        return templates[d.dimensionId](user, therapist);
      }
      return templates[d.dimensionId]?.(user, therapist);
    })
    .filter(Boolean);
  
  // Deduplicate themes (e.g. if we have W2 and W3 both talking about style/warmth)
  // For prototype, we'll just ensure they are unique sentences
  const uniqueSentences = Array.from(new Set(sentences));
  
  // Join into a paragraph
  return uniqueSentences.join(" ");
}
