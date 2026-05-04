# Trellis Phase 2 — Implementation-Ready Research Dossier

## TL;DR
- **Build a 3-layer matching engine**: hard filters (language, format, fee, gates like queer-affirmative or psychiatry-needed) → 52-variable weighted compatibility score (presenting-concern × specialization is the largest weight; C-NIP communication-style fit and stage-of-change × therapist directiveness are the next two) → PCOMS feedback loop (ORS for outcome, SRS for alliance) that re-weights matches over time. Evidence base: Cooper-Norcross C-NIP (2016), PCOMS/ORS-SRS (Miller, Duncan), Swift et al. preference meta-analyses (matched clients ~half as likely to drop out, d≈0.28 on outcome), Lambert FIT, Prochaska stages-of-change × therapist activity matching.
- **Populate with 22 MECE user personas and 16 MECE therapist personas** that span the full Indian urban professional spectrum (gender, sexuality, religion incl. Hindu sub-traditions/Muslim/Sikh/Christian/Jain/Parsi/agnostic, all 4 metros + Pune/Hyderabad/Kolkata, all 4 attachment styles, all 5 stages of change, fees ₹800–₹3,500, modalities CBT/ACT/DBT/Psychodynamic/EFT/EMDR/Somatic/IFS/Narrative/Humanistic, 2 psychiatrists, 4 QACP-certified, 3 EMDR/SE-trained). Prevalence anchors: NMHS 2016 urban CMD prevalence 13.5%; McKinsey 2023 — 59% Indian employees report burnout; ADHD adult-screen positivity ~14% in Delhi-NCR 18–25; LGBTQIA+ 3-of-4 still closeted in India.
- **Ship 10 research-backed Phase 2 features** prioritized by complexity: ORS/SRS in-session loop (must-have, low complexity, +65% improvement vs control per Lambert); 30–60s therapist intro videos (warmth predicts satisfaction — Lab study, low); session-prep prompts and between-session journaling (up to 50% faster symptom reduction in observational data, low); "Elfina Listens"-style free 30-min reflective session (Elfina has tested it; reduces hesitation, low); alliance-rupture detection via SRS control charts (≥1.5 SD drop trigger; medium); therapy-readiness assessment using TTM stage (medium); waitlist re-matching (low); psychoeducation library tagged to taxonomy (low); therapist dashboard with retention + SRS bond (medium); couples/family branch with separate algorithm (high). Flag intro videos and AI rupture detection as evidence-informed but not yet RCT-validated in India — speculative-but-defensible.

---

## KEY FINDINGS (the design pillars)

1. **Preference-matching is the strongest evidence-based lever.** Swift et al. meta-analyses: matched clients show d≈0.28 better outcome and ~half the dropout rate. Use C-NIP's 4 axes verbatim (Therapist↔Client Directiveness; Emotional Intensity↔Reserve; Past↔Present orientation; Warm Support↔Focused Challenge), each scored −15…+15, with ±8 = strong preference.
2. **Alliance > modality.** Flückiger 2018 meta-analysis (295 studies, 30,000+ patients): alliance r=0.28 with outcome. SRS captures it in 4 items, scored 0–10 each (total /40); cutoff 36+ = healthy. Track session-by-session; flag drops ≥1.5 SD as ruptures.
3. **ORS clinical anchors (use these exact thresholds):** 4 items × 0–10 cm visual analog = /40. Adult clinical cutoff = 25. Reliable Change Index = 5–6 points. Score below 25 at intake + ≥6 point increase that crosses 25 = clinically significant change.
4. **Stage-of-change must drive directiveness.** Prochaska: pre-contemplation/contemplation → low-directiveness, motivational, exploratory therapists (Humanistic, MI, Psychodynamic). Preparation/action/maintenance → directive (CBT, DBT, ACT). Mismatching dramatically increases dropout in pre-contemplation clients.
5. **Cultural/language match matters proximally, not distally.** Griner & Smith meta-analysis: language-matched outcomes 2× effect of non-matched. Ethnic match alone: weak. So weight LANGUAGE high, caste/religion match low-but-non-zero, and weight QACP-certification as a hard gate for queer/trans clients.
6. **Indian therapist supply realities:** ~3,890 RCI-licensed clinical psychologists nationwide; women outnumber men ~40:1 in urban therapy; <500 QACP-certified MHPs; majority M.Phil Clinical Psychology or M.A. Counselling Psychology; psychiatrists are MBBS+MD/DNB/DPM with MCI registration. Fees ₹800–₹3,500. Reflect this distribution in the seed data.
7. **Dropout baseline = 1-in-5** (Swift & Greenberg 2012). Younger clients, personality/eating-disorder diagnoses, weak alliance early predict dropout. Session-5 retention is the industry-relevant KPI (Elfina cites 80% target).
8. **Indian-specific concerns to tag explicitly:** arranged-marriage timeline anxiety, joint-family enmeshment, NRI/diaspora identity strain, caste-based microaggression trauma (Dalit/Bahujan), workplace burnout in IT/startup culture (59% McKinsey), parental career-pressure, postpartum in nuclear-but-isolated urban set-ups, queer concealment stress, "log kya kahenge" social-evaluation anxiety.

---

## DETAILS

### TASK 1 — 22 MECE USER PROFILES

Schema (TypeScript-ready):
```
UserProfile = {
  id, name, age, gender, pronouns, sexuality, city, occupation, industry,
  languages[], primaryConcerns[1..3], secondaryConcerns[], durationMonths,
  severity (1-10), familyStructure, familyDynamics, religion, religiousSalience(1-10),
  culturalSensitivities[], attachmentStyle, stageOfChange,
  cnip: {directiveness, emotionalIntensity, pastOrientation, warmth} // -15..+15
  therapistGenderPref, priorTherapy, budgetMin, budgetMax, formatPref[],
  timePref[], dropoutTriggers[], stayTriggers[]
}
```

1. **Meera Iyer** — 29, F, she/her, hetero, Bengaluru. Sr. Product Designer, B2B SaaS. EN/Tamil/Hindi. Burnout + relationship anxiety + perfectionism. 14 mo, severity 6. Nuclear-but-NRI parents in US, supportive-but-distant. Hindu, low salience. Anxious-preoccupied. Contemplation. C-NIP: collaborative(-4)/intense(+6)/balanced(0)/warm(-9). F therapist preferred. First-timer. ₹1,500–₹2,500. Video, weekday eves. Drop if too directive/CBT-worksheet-heavy. Stay if therapist names patterns gently.

2. **Arjun Reddy** — 34, M, he/him, hetero, Hyderabad. Engineering Manager, FAANG. EN/Telugu/Hindi. Workplace anxiety (toxic manager) + sleep + anger toward wife. 6 mo, severity 7. Nuclear, joint-family expectations to "be the rock." Hindu, mod salience. Dismissive-avoidant. Preparation. C-NIP: directive(+7)/reserve(-5)/present(+8)/challenge(+6). M or F. First-timer, skeptical. ₹2,000–₹3,000. Video late-night. Drop if "just talking", emotional, slow. Stay if homework, frameworks, fast wins.

3. **Fatima Sheikh** — 27, F, she/her, hetero, Mumbai. Investment Banking Analyst. EN/Hindi/Urdu. Panic disorder + body-image + family-religious conflict re: alcohol/dating. 18 mo, severity 8. Joint Muslim family, complicated. Muslim, high salience but ambivalent. Fearful-avoidant. Contemplation. C-NIP: balanced(0)/intense(+5)/past(-4)/warm(-12). Strong F preference, religiously-literate non-judgmental. Prior bad experience (therapist suggested "just pray more"). ₹1,500–₹2,200. Video, weekends only. Drop if therapist dismisses faith OR pushes Western individualism. Stay if therapist holds both.

4. **Rohan Kapoor** — 31, M, he/him, gay (closeted to family), Delhi. Policy Consultant. EN/Hindi/Punjabi. Identity distress + depression + arranged-marriage pressure (parents biodata-sharing). 24 mo, severity 7. Joint Hindu Punjabi, complicated. Hindu cultural, atheist. Anxious-preoccupied. Action. C-NIP: collaborative(-6)/intense(+8)/past(-7)/warm(-10). MUST be QACP-certified, prefers M or NB therapist. Therapy-experienced (4 yrs). ₹2,000–₹3,500. Video weekday evenings. Drop if therapist not visibly queer-affirmative in profile. Stay if therapist names minority stress.

5. **Anjali Pillai** — 38, F, she/her, hetero, Chennai. Senior Marketing Director. EN/Tamil/Malayalam. Marital conflict + perimenopause mood + parental caregiver guilt. 8 mo, severity 6. Nuclear with elderly parents nearby. Christian (Syrian), mod salience. Secure. Action. C-NIP: directive(+5)/balanced(0)/present(+6)/balanced(0). F preferred, 35+. Therapy-experienced. ₹2,200–₹3,500. Video, lunch hours. Drop if therapist treats her as fragile. Stay if direct, problem-solving.

6. **Vikram Joshi** — 26, M, he/him, hetero, Pune. Software Engineer (1st job). EN/Marathi/Hindi. Generalized anxiety + low self-esteem + parents' career disappointment ("you should've done UPSC"). 12 mo, severity 6. Joint Marathi Brahmin family. Hindu, high salience. Anxious-preoccupied. Preparation. C-NIP: directive(+8)/reserve(-6)/present(+5)/warm(-3). Either gender. First-timer. ₹800–₹1,500 (early career). Video, evenings. Drop if vague, no structure. Stay if CBT thought records, visible progress.

7. **Sanya Khurana** — 30, F, she/her, bisexual (out to friends, not family), Bengaluru. Startup co-founder. EN/Hindi/Punjabi. Burnout + breakup grief (with woman partner) + identity validation. 4 mo, severity 7. Nuclear Sikh family, partly accepting. Sikh cultural, agnostic. Secure. Action. C-NIP: collaborative(-5)/intense(+9)/balanced(0)/warm(-7). QACP preferred, F or NB. Therapy-experienced. ₹2,500–₹3,500. Video flexible. Drop if therapist treats bisexuality as phase. Stay if affirmative, intellectually engaged.

8. **Aman Verma** — 33, M, he/him, hetero, Delhi. Mid-level govt officer (IAS). EN/Hindi. OCD (contamination + checking) + work paralysis. 36 mo, severity 8. Nuclear, married, supportive wife. Hindu, mod salience. Secure. Preparation. C-NIP: directive(+10)/reserve(-3)/present(+9)/challenge(+5). Specialty-OCD essential. M or F. Prior-therapy (2 therapists, generic CBT didn't help — needs ERP). ₹1,800–₹3,000. Video, early morning. Drop if no ERP knowledge. Stay if therapist proposes hierarchy/exposure plan in session 1.

9. **Priya Banerjee** — 36, F, she/her, hetero, Kolkata. Academic (Asst Prof). EN/Bengali/Hindi. Postpartum depression (baby 8 months) + identity loss + extended family overinvolvement. 6 mo, severity 7. Joint Bengali Hindu. Hindu, low salience. Anxious-preoccupied. Contemplation. C-NIP: collaborative(-3)/intense(+7)/past(-3)/warm(-11). F preferred, ideally a parent herself. First-timer. ₹1,500–₹2,500. Video naptime windows. Drop if therapist medicalizes only. Stay if validates "matrescence."

10. **Karan Shah** — 29, M, he/him, hetero, Mumbai. Family-business heir (Gujarati Jain). EN/Gujarati/Hindi. Existential drift + low motivation + secret resentment of dad. 10 mo, severity 5. Joint Jain family, financially generous, emotionally controlling. Jain, mod salience (vegetarianism etc). Dismissive-avoidant. Pre-contemplation (came at wife's insistence). C-NIP: collaborative(-7)/reserve(-4)/past(-5)/warm(-2). Prefers M, 40+. First-timer, skeptical. ₹2,000–₹3,500. Video, irregular. Drop if confronted too soon, called "privileged." Stay if therapist is curious, slow, philosophical.

11. **Lakshmi Nair** — 32, F, she/her, lesbian (out), Bengaluru. UX Researcher (returned NRI from Toronto). EN/Malayalam/Hindi. Reverse culture-shock + complicated grief (father's death) + couple-conflict. 9 mo, severity 6. Distant from family. Hindu cultural, agnostic. Secure. Action. C-NIP: directive(+3)/intense(+8)/past(-9)/warm(-8). QACP, F preferred. Therapy-experienced (Western frame). ₹2,500–₹3,500. Video flexible. Drop if therapist doesn't get NRI/diaspora idiom. Stay if integrates grief work + identity.

12. **Rahul Mehta** — 40, M, he/him, hetero, Ahmedabad-but-relocating-Bengaluru. Senior Product Manager (recent layoff). EN/Gujarati/Hindi. Career-transition crisis + financial anxiety + shame. 3 mo, severity 7. Nuclear, kid in school. Hindu, low salience. Secure. Preparation. C-NIP: directive(+6)/balanced(0)/present(+7)/challenge(+4). M or F, pragmatic. ₹1,200–₹2,000 (budget-tight). Video, weekday mornings. Drop if too exploratory. Stay if action plan + CBT for shame.

13. **Tanvi Deshpande** — 28, NB, they/them, queer, Pune. Graphic Designer (freelance/gig). EN/Marathi/Hindi. Gender dysphoria (questioning) + ADHD (suspected) + chronic underearning. 24 mo, severity 7. Estranged from natal Hindu family, chosen family strong. Hindu cultural, atheist. Fearful-avoidant. Contemplation. C-NIP: collaborative(-8)/intense(+6)/past(-6)/warm(-13). MUST be QACP + ADHD-aware. F or NB. Therapy-experienced (some good, some bad). ₹1,000–₹1,800 (sliding scale needed). Video, irregular. Drop if therapist mis-genders, defaults to "are you sure?", or pathologizes ADHD. Stay if neuroaffirmative + queer-affirmative.

14. **Neha Agarwal** — 35, F, she/her, hetero, Delhi. Chartered Accountant, partner-track. EN/Hindi. PTSD (workplace sexual harassment 2 yrs ago, unreported) + insomnia + hypervigilance. 24 mo, severity 9. Nuclear, husband supportive, no kids by choice. Hindu, mod salience. Fearful-avoidant. Action. C-NIP: balanced(0)/intense(+9)/past(+4)/warm(-10). F essential, EMDR/somatic-trained. Therapy-experienced. ₹2,500–₹3,500. Video, evenings. Drop if therapist re-traumatizes by demanding details. Stay if titrated, somatic, body-aware.

15. **Imran Qureshi** — 31, M, he/him, hetero, Hyderabad. Doctor (Resident, MD). EN/Urdu/Hindi/Telugu. Imposter syndrome + chronic exhaustion + Islamophobia microaggressions. 12 mo, severity 6. Nuclear Muslim, supportive wife (also doctor). Muslim, mod salience. Secure. Preparation. C-NIP: directive(+6)/balanced(0)/present(+7)/challenge(+7). M or F, ideally religiously-literate. First-timer. ₹1,500–₹2,500. Phone preferred (limited screen time at work), late nights. Drop if Islam treated as exotic. Stay if therapist names systemic factors.

16. **Divya Krishnan** — 37, F, she/her, hetero, Chennai. Stay-at-home mother (was lawyer, now considering return). EN/Tamil. Mid-life depression + lost-identity + marital staleness. 18 mo, severity 6. Nuclear with two kids, joint-family expectations. Hindu, high salience (regular temple). Anxious-preoccupied. Contemplation. C-NIP: collaborative(-4)/intense(+5)/past(-7)/warm(-9). F preferred, 40+. First-timer. ₹1,500–₹2,200. Video while kids at school. Drop if therapist dismisses spirituality. Stay if integrates Indic frames (dharma, life-stages).

17. **Yash Malhotra** — 25, M, he/him, hetero, Gurugram. Investment-bank Analyst (1st job). EN/Hindi/Punjabi. Social anxiety + binge drinking weekends + parents pressuring marriage. 8 mo, severity 6. Joint Punjabi Hindu, "everything is fine, just relax beta" minimizing. Hindu, low salience. Dismissive-avoidant. Preparation. C-NIP: directive(+7)/reserve(-7)/present(+8)/challenge(+5). Either gender. First-timer. ₹1,200–₹2,000. Video, weekends only (work hours brutal). Drop if therapist gets emotional. Stay if behavioral, skills-based.

18. **Aisha D'Souza** — 30, F, she/her, hetero, Mumbai. Journalist. EN/Hindi/Konkani. Generalized anxiety + climate-grief + relationship-with-Hindu-partner family religious tension. 14 mo, severity 5. Nuclear Goan Catholic. Christian, mod salience. Secure. Action. C-NIP: balanced(0)/intense(+8)/past(-5)/warm(-7). F preferred. Therapy-experienced. ₹1,800–₹2,800. Video, mornings. Drop if therapist dismisses interfaith complexity. Stay if narrative-/meaning-oriented.

19. **Sandeep Singh** — 38, M, he/him, hetero, Delhi. Logistics business owner. EN/Punjabi/Hindi. Alcohol use disorder (mild-mod) + anger + father's recent death. 4 mo, severity 8. Joint Sikh family, complicated (took over business reluctantly). Sikh, high salience. Dismissive-avoidant. Pre-contemplation re: drinking, contemplation re: grief. C-NIP: collaborative(-3)/reserve(-2)/past(-8)/warm(-4). M preferred. Prior-therapy (one bad — confrontational). ₹1,500–₹2,500. Video, mid-morning. Drop if labeled "alcoholic" early. Stay if therapist uses MI, doesn't preach.

20. **Riya Banerjee-Chen** — 26, F, she/her, hetero, Bengaluru. Tech Recruiter (interracial marriage to Singaporean Chinese partner). EN/Bengali/Hindi/some Mandarin. Identity & cultural negotiation + in-law conflict + mild depression. 10 mo, severity 5. Nuclear Bengali Hindu side, distant Chinese in-laws. Hindu cultural, mostly agnostic. Anxious-preoccupied. Action. C-NIP: collaborative(-5)/intense(+6)/past(-3)/warm(-8). F preferred, multicultural-aware. First-timer. ₹2,000–₹2,800. Video, evenings. Drop if mono-cultural lens. Stay if curious about her hybrid context.

21. **Aditya Rao** — 39, M, he/him, hetero, Bengaluru. Tech Founder (post-exit, financially comfortable). EN/Kannada/Hindi. Existential emptiness + loss of purpose + hypochondria. 12 mo, severity 5. Nuclear, wife and kids. Hindu, mod salience (Vipassana practitioner). Secure. Maintenance (returning client-of-life). C-NIP: collaborative(-7)/intense(+8)/past(-6)/warm(-2). M preferred, 45+. Therapy-veteran. ₹2,800–₹3,500. Video flexible. Drop if therapist is junior, surface-level. Stay if depth, existential, integrates contemplative.

22. **Pooja Gupta** — 33, F, she/her, hetero, Kolkata. Schoolteacher. EN/Bengali/Hindi. Chronic-illness adjustment (recently diagnosed Type-1 diabetes + mild Hashimoto's) + health-anxiety + body grief. 6 mo, severity 6. Nuclear Marwari-Bengali, controlling MIL. Hindu, mod salience. Anxious-preoccupied. Preparation. C-NIP: directive(+4)/intense(+6)/present(+5)/warm(-9). F preferred, health-psychology aware. First-timer. ₹1,200–₹1,800 (modest income). Video, evenings post-school. Drop if therapist doesn't understand chronic illness. Stay if integrates ACT + chronic-illness framework.

### TASK 2 — 16 MECE THERAPIST PROFILES

Schema:
```
Therapist = { id, name, gender, ageRange, city, credentials, rciNumber, yearsExperience,
  modalities[], specializations[], languages[], cnip:{...}, warmth(1-10), directiveness(1-10),
  challenge(1-10), culturalCompetencies[], qacpCertified, traumaSpecialization, isPsychiatrist,
  fee, formats[], availability[], session5Retention(0..1), avgSrsBond(0..5), about,
  bestWith[], strugglesWith[] }
```

T1 **Dr. Aanya Krishnan** — F, 34, Bengaluru. M.Phil Clinical Psych (NIMHANS) + RCI A-12345. 9 yrs. CBT + ACT + brief psychodynamic. Specializes: GAD, panic, social anxiety, perfectionism, work-burnout. EN/Tamil/Hindi/Kannada. C-NIP: directive(+7)/intense(+5)/present(+6)/challenge(+4). Warmth 8, Directiveness 8, Challenge 6. Urban professional, IT culture. Not QACP, no EMDR. Not psychiatrist. ₹2,200. Video. Weekday eves+weekend mornings. Retention 0.86. SRS 4.4. "I work best with high-functioning professionals who feel stuck despite achievement. We'll build skills and explore patterns — both/and." Best with: anxiety, burnout, perfectionism. Struggles with: severe trauma, personality disorders.

T2 **Ritika Bhatia** — F, 31, Mumbai. MA Counselling Psych (TISS). 6 yrs. Person-Centred + Narrative + EFT (individual). Specializes: relationship issues, identity, grief, women's mental health, postpartum. EN/Hindi/Marathi/Gujarati. C-NIP: collaborative(-6)/intense(+8)/past(-4)/warm(-9). Warmth 10, Directiveness 3, Challenge 4. NRI/diaspora, women, postpartum. QACP NO. No EMDR. ₹1,800. Video+phone. Flex. Retention 0.82. SRS 4.6. "I hold space for stories — yours, not the one others wrote about you." Best: ambivalence, women's transitions. Struggles: clients wanting fast CBT.

T3 **Dr. Aarav Saxena** — M, 42, Delhi. MBBS, MD Psychiatry (AIIMS) + MCI registered. 14 yrs. Pharmacotherapy + CBT-informed brief. Specializes: OCD/ERP, severe depression, bipolar, ADHD assessment + meds, anxiety. EN/Hindi/Punjabi. C-NIP: directive(+9)/reserve(-3)/present(+8)/challenge(+5). Warmth 7, Directiveness 9, Challenge 6. Med-savvy, evidence-driven. Not QACP. ₹3,000 (psychiatry). Video. Weekday evenings. Retention 0.78. SRS 4.1. "Diagnosis isn't a label, it's a map. Meds + therapy together change trajectories." Best: OCD, bipolar, ADHD, treatment-resistant. Struggles: clients wanting only talk-therapy / averse to meds.

T4 **Tara Menon** — F, 38, Chennai. M.Phil Clinical (CIP Ranchi) + EMDR Level-2 (EMDR India) + Somatic Experiencing Beg. 12 yrs. EMDR + Somatic + IFS. Specializes: PTSD, complex trauma, sexual trauma, dissociation. EN/Tamil/Malayalam/Hindi. C-NIP: collaborative(-4)/intense(+7)/past(+2)/warm(-8). Warmth 9, Directiveness 6, Challenge 4. Trauma-informed, body-aware. QACP YES. ₹2,800. Video. Weekday afternoons. Retention 0.88. SRS 4.7. "Trauma lives in the body — we'll go slowly, your nervous system leads." Best: PTSD, sexual-violence survivors, dissociation. Struggles: clients wanting only structured CBT.

T5 **Karan Mehta** — M, 36, Bengaluru. M.Phil Clinical (NIMHANS). 10 yrs. CBT + DBT + MI. Specializes: addiction, anger, men's mental health, AUD, gambling. EN/Hindi/Gujarati. C-NIP: directive(+5)/balanced(0)/present(+7)/challenge(+8). Warmth 7, Directiveness 8, Challenge 9. Indian masculinity, men reluctant clients. Not QACP. ₹2,200. Video+phone. Flex incl weekends. Retention 0.74 (high-risk pop). SRS 4.0. "I work with men who'd rather not be here. We'll find your version of better." Best: men, addiction, anger, MI. Struggles: clients wanting deep emotional exploration without grounding.

T6 **Shruti Kulkarni** — F, NB-ally cis, 33, Mumbai. MA Counselling (Christ Univ). QACP-certified (MHI cohort 2021). 7 yrs. Affirmative + Narrative + ACT. Specializes: LGBTQIA+, identity, coming out, queer-relationships, gender dysphoria. EN/Hindi/Marathi. C-NIP: collaborative(-7)/intense(+8)/past(-3)/warm(-11). Warmth 10, Directiveness 4, Challenge 5. Queer-affirmative, intersectional. ₹2,000. Video. Flex incl late evenings. Retention 0.91. SRS 4.8. "Therapy that doesn't dismantle the systems hurting you isn't therapy I want to offer." Best: queer/trans clients, identity exploration. Struggles: clients wanting purely behavioral, decontextualized work.

T7 **Dr. Farah Ahmed** — F, 40, Hyderabad. MBBS, MD Psychiatry (NIMHANS) + Psychodynamic training. 13 yrs. Pharmacotherapy + Psychodynamic + Brief Family. Specializes: women's mental health, perinatal psych, severe anxiety, faith-integrative work. EN/Urdu/Hindi/Telugu. C-NIP: balanced(0)/intense(+6)/past(-4)/warm(-7). Warmth 9, Directiveness 7, Challenge 5. Muslim-literate, faith-integrative. ₹2,500. Video. Mornings+lunch. Retention 0.84. SRS 4.5. "Faith and mental health aren't opposites — I work with both." Best: Muslim clients, perinatal, faith-integrative. Struggles: clients wanting strict secular framing.

T8 **Aditi Roy** — F, 29, Kolkata. MA Counselling Psych (Calcutta Univ). 4 yrs. CBT + Schema + Mindfulness. Specializes: GAD, depression, self-esteem, young-professionals, family-of-origin. EN/Bengali/Hindi. C-NIP: directive(+6)/intense(+4)/balanced(0)/warm(-3). Warmth 7, Directiveness 7, Challenge 5. Bengali culture, joint-family dynamics. Not QACP. ₹1,200 (early career). Video. Eves+weekends. Retention 0.81. SRS 4.3. "Structured, warm, practical." Best: first-time therapy clients, mild-mod anxiety/depression. Struggles: complex trauma, severe presentations.

T9 **Vikrant Sharma** — M, 45, Delhi. M.Phil Clinical (Delhi Univ), 18 yrs. Psychodynamic + Existential + Jungian-informed. Specializes: existential issues, mid-life, high-achievers, dreams, long-term work. EN/Hindi/Punjabi. C-NIP: collaborative(-9)/intense(+9)/past(-10)/warm(-2). Warmth 7, Directiveness 3, Challenge 7. Senior professionals, philosophical. Not QACP. ₹3,500. Video+in-person Delhi. Mornings. Retention 0.79 (long-term). SRS 4.5. "Slow, depth, meaning. Not for those who want a quick fix." Best: existential, mid-life, returning therapy clients. Struggles: acute crisis, behavioral skills-seekers.

T10 **Ananya Iyer** — F, 32, Bengaluru. M.Phil Clinical (NIMHANS) + Behavioral specialty. 8 yrs. CBT + ERP + Behavioral activation. Specializes: OCD, phobias, health anxiety, panic. EN/Tamil/Kannada/Hindi. C-NIP: directive(+10)/reserve(-2)/present(+10)/challenge(+5). Warmth 7, Directiveness 10, Challenge 6. Behavioral pure-play. Not QACP. ₹2,400. Video. Mornings+afternoons. Retention 0.89. SRS 4.4. "ERP works. I'll teach you, then walk with you through it." Best: OCD, phobias. Struggles: clients with diffuse, exploration-seeking presentations.

T11 **Ravi Pillai** — M, 37, Pune. MA Counselling + DBT-Linehan trained. 9 yrs. DBT + ACT + Mindfulness-based. Specializes: emotion-dysregulation, BPD-spectrum, self-harm, eating concerns. EN/Hindi/Marathi/Malayalam. C-NIP: directive(+6)/intense(+8)/present(+6)/balanced(0). Warmth 8, Directiveness 7, Challenge 6. Skills-based, validating. QACP YES. ₹2,000. Video. Eves. Retention 0.83. SRS 4.5. "Both/and: you're doing your best AND we can build skills." Best: emotion-dysregulation, BPD-spectrum, eating. Struggles: pure cognitive/insight-seeking work.

T12 **Megha Singh** — F, 41, Delhi. M.Phil Clinical + Couples & Family training (Gottman Lvl 2). 15 yrs. Gottman + EFT (Sue Johnson) + Systems. Specializes: couples, marital, family-of-origin, in-law conflict. EN/Hindi/Punjabi. C-NIP: directive(+5)/intense(+7)/past(-2)/warm(-7). Warmth 9, Directiveness 7, Challenge 6. Indian marriages, joint-family, arranged. Not QACP. ₹2,800 individual / ₹3,500 couples. Video. Eves+weekends. Retention 0.85. SRS 4.6. "Most fights aren't about what they seem to be about." Best: couples, marital, in-law systems. Struggles: high individual-pathology cases.

T13 **Kabir Joseph** — M, 35, Mumbai. MA Counselling (Christ) + QACP. 7 yrs. Humanistic + Narrative + ACT. Specializes: men's mental health, masculinity, queer men, religious-identity-conflict (Christian). EN/Hindi/Konkani/Malayalam. C-NIP: collaborative(-5)/intense(+7)/past(-4)/warm(-9). Warmth 9, Directiveness 4, Challenge 5. Christian-literate, queer-affirmative, men. ₹1,800. Video. Eves+weekends. Retention 0.84. SRS 4.7. "Curiosity over judgment. Always." Best: men, queer, religion-identity. Struggles: clients wanting pure CBT/structure.

T14 **Dr. Neelam Kaur** — F, 50, Chandigarh (sees Delhi+remote). M.Phil Clinical (PGI Chandigarh) + EMDR Adv. 22 yrs. EMDR + Psychodynamic + CBT. Specializes: complex/childhood trauma, dissociation, intergenerational. EN/Punjabi/Hindi. C-NIP: balanced(0)/intense(+8)/past(+5)/warm(-6). Warmth 9, Directiveness 6, Challenge 5. Senior, Sikh, partition-trauma legacy work. Not QACP but trauma-informed re queer. ₹3,200. Video. Mornings. Retention 0.87. SRS 4.6. "Trauma is what happened, not who you are." Best: complex trauma, senior-clinician seekers. Struggles: brief, problem-focused work.

T15 **Tanmay Bose** — M, NB-ally, 30, Kolkata. MA Counselling + Sport/performance psych training. 5 yrs. ACT + CBT + MI + IFS-informed. Specializes: career transitions, gig-economy, ADHD-coaching, men's burnout, performance. EN/Bengali/Hindi. C-NIP: directive(+4)/balanced(0)/present(+8)/challenge(+6). Warmth 7, Directiveness 7, Challenge 7. Startup/gig culture, ADHD-aware. QACP YES. ₹1,500. Video. Flex. Retention 0.80. SRS 4.3. "Less 'fix yourself,' more 'figure out your operating system.'" Best: ADHD, career, gig economy, men. Struggles: deep grief, severe trauma.

T16 **Sneha Pothineni** — F, 34, Hyderabad. M.Phil Clinical + IFS Lvl-1. 10 yrs. IFS + Psychodynamic + Somatic-informed. Specializes: childhood-of-origin work, attachment, complex relational. EN/Telugu/Hindi/Tamil. C-NIP: collaborative(-8)/intense(+9)/past(-9)/warm(-10). Warmth 10, Directiveness 3, Challenge 4. Brahmin-South-Indian family dynamics, attachment-focused. Not QACP but affirmative. ₹2,400. Video. Afternoons. Retention 0.86. SRS 4.7. "All your parts are welcome — even the messy ones." Best: attachment wounds, family-of-origin. Struggles: acute symptom-management seekers.

### TASK 3 — 52 MATCHING VARIABLES (3-LAYER FRAMEWORK)

**LAYER 1: HARD FILTERS (binary gates — fail any = excluded)**

| # | Variable | Logic | Why |
|---|---|---|---|
| H1 | Language overlap | ≥1 shared language between user.languages and therapist.languages | Griner & Smith: language-match doubles outcome effect |
| H2 | Format compatibility | ≥1 shared format (video/phone/chat/in-person) | Logistical |
| H3 | Fee fit | therapist.fee ≤ user.budgetMax + 10% buffer | Affordability is hard |
| H4 | Availability overlap | ≥1 shared time-slot per week | Operational |
| H5 | Queer-affirmative gate | If user.sexuality∈{gay,lesbian,bi,queer} OR user.gender∈{NB,trans} → therapist.qacpCertified must be true | QACP literature; minority stress |
| H6 | Psychiatry need | If user requires medication assessment (OCD severe, bipolar, severe MDD, ADHD-meds requested) → therapist.isPsychiatrist=true OR co-care plan |
| H7 | Trauma specialty | If user.primaryConcerns includes "PTSD"/"complex trauma" with severity≥7 → therapist.traumaSpecialization=true (EMDR/SE/IFS) |
| H8 | Severity-license gate | severity≥8 OR active SI → must be M.Phil Clinical or psychiatrist (not MA-only) |
| H9 | Therapist-gender hard pref | If user marks therapist gender preference as "must" (not just "prefer") → therapist.gender matches |
| H10 | Religious-literacy if hard-required | If user marks faith-integration as essential → therapist.culturalCompetencies includes that religion |

**LAYER 2: WEIGHTED COMPATIBILITY (sum of weighted scores; max 100)**

Each dimension scored 0–100 then multiplied by weight → sum / sum-of-weights → final 0–100 match score.

| # | Variable | Type | Weight | Scoring formula |
|---|---|---|---|---|
| W1 | Presenting-concern × specialization | multi-select | 18 | (count of overlapping primaryConcerns ÷ count of primaryConcerns) × 100; +20% bonus if therapist's top-3 specializations include user's #1 concern |
| W2 | C-NIP directiveness fit | numeric | 9 | 100 − (\|user.cnip.directiveness − therapist.cnip.directiveness\| ÷ 30 × 100) |
| W3 | C-NIP warmth-vs-challenge fit | numeric | 9 | same formula on warmth axis |
| W4 | C-NIP emotional intensity fit | numeric | 6 | same |
| W5 | C-NIP past↔present fit | numeric | 5 | same |
| W6 | Stage-of-change × therapist directiveness | rule | 8 | precontemp/contemp + therapist.directiveness≤5 = 100; preparation/action + directiveness≥6 = 100; mismatch = 30 |
| W7 | Attachment style × therapist style | rule | 5 | secure→any=80; anxious→warm(≥8)=100, low warm=40; dismissive-avoidant→balanced/structured=90, intense=50; fearful-avoidant→trauma-trained+warm=100, else 50 |
| W8 | Modality fit to concern | rule | 7 | per modality-concern matrix (e.g., OCD→CBT/ERP=100, OCD→psychodynamic=40; PTSD→EMDR/SE=100; existential→psychodynamic/humanistic=100) |
| W9 | Language-richness | numeric | 4 | (count of shared languages ÷ user.languages.length) × 100; mother-tongue match = +25 bonus capped at 100 |
| W10 | Cultural competency match | multi | 5 | (overlap of culturalCompetencies and user.culturalSensitivities ÷ user.culturalSensitivities.length) × 100 |
| W11 | Therapist gender soft pref | rule | 4 | exact match=100; "either" or no pref=80; mismatch=50 |
| W12 | Age band fit | rule | 2 | within ±10 of preferred OR therapist≥35 if user wants senior=100; else gradient |
| W13 | Fee within preferred range | numeric | 3 | inside user.budgetMin..budgetMax = 100; within 15% above max=70; outside=0 |
| W14 | Format preferred | rule | 2 | user's first-pref format offered=100; second=80; only third=60 |
| W15 | Time-slot density | numeric | 2 | (overlapping slots ÷ user.timePref.length) × 100 |
| W16 | Therapist experience vs severity | rule | 3 | severity≥8 → years≥10=100, 5–9=70, <5=40; severity≤4 → any≥3 yrs=100 |
| W17 | Religious literacy | rule | 2 | competency match=100; "open-secular" therapist + low-salience user=90; mismatch+high-salience=40 |
| W18 | Caste-aware practice flag | binary→score | 2 | user.culturalSensitivities includes caste AND therapist explicitly anti-caste informed=100; else 60 |
| W19 | NRI/diaspora literacy | rule | 1 | user.NRI=true AND therapist.culturalCompetencies includes diaspora=100 |
| W20 | Prior-therapy fit | rule | 2 | user.priorTherapy=experienced → therapist with depth (psychodynamic/IFS/long-term)=+10 bonus; first-timer → +10 to structured/CBT |
| W21 | Therapist warmth | numeric | 3 | match user warmth-need: warm-seeker(cnip.warmth≤−7) → therapist.warmth≥9=100 |
| W22 | Therapist challenge | numeric | 2 | high-challenge-tolerant user → match therapist.challenge≥7 |
| W23 | Pace alignment | rule | 1 | brief-therapy seeker → CBT/solution-focused therapist; long-term seeker → psychodynamic/IFS |
| W24 | Session-5 retention prior | numeric | 2 | (therapist.session5Retention − 0.65) ÷ (0.95 − 0.65) × 100 |
| W25 | Avg SRS bond prior | numeric | 2 | (avgSrsBond − 3.2) ÷ (4.8 − 3.2) × 100 |
| W26 | Capacity / waitlist | rule | 1 | first-available within 7 days=100; 7–14d=70; >14d=40 |
| W27 | Specialization depth | rule | 1 | user concern is therapist's stated #1 specialization=+15 bonus |
| W28 | "Struggles with" anti-match | rule | 3 (negative) | if user's primaryConcern matches therapist's strugglesWith → subtract 25 from total |

(Total positive weights = 100; W28 acts as negative modifier capped at −25.)

**LAYER 3: FEEDBACK LEARNING (ORS + SRS)**

ORS administered at session start (4 items, 0–10 cm visual analog → /40):
- Individually (personal well-being)
- Interpersonally (close relationships)
- Socially (work/role)
- Overall

Adult clinical cutoff = 25. Reliable Change Index = 6. Triggers:
- ORS not increasing by ≥3 by session 4 → flag for SRS deep-dive + therapist nudge
- ORS decline ≥6 from baseline at any session → re-match outreach
- ORS crosses 25 + sustained → "celebrate milestone" notification

SRS administered at session end (4 items, 0–10 → /40):
- Relationship (felt heard, understood, respected)
- Goals & Topics (worked on what mattered)
- Approach/Method (therapist's way fits me)
- Overall

Cutoff for healthy alliance = 36. Triggers:
- SRS <36 in any session → in-app prompt: "consider raising this with your therapist"
- SRS drop ≥1.5 SD below client's running mean → rupture flag → therapist dashboard alert + repair-prompt suggested
- SRS <30 by session 3 OR two consecutive <32 → offer re-match without penalty

Weight modification (Bayesian update, per-user):
- For each completed match, after session 5, compute outcome score = 0.5×(ORS gain ÷ 6) + 0.5×(SRS mean ÷ 40)
- For each W-variable used in that match, increase its personal weight by η × (outcome − population_mean), η=0.05, clamped ±20% of base weight
- Population-level: aggregate across users to nudge global weights every 100 matches (RL-style)

### TASK 4 — THE ALGORITHM (PSEUDOCODE)

```
function matchUserToTherapists(user, therapistPool, weights = DEFAULT_WEIGHTS, 
                                userWeightAdjustments = {}):
  // LAYER 1
  candidates = therapistPool.filter(t => passesAllHardFilters(user, t))
  if candidates.length == 0:
    return relaxFiltersAndRetry(user, therapistPool)  // relax in order: H4,H13,H12...

  // LAYER 2
  scored = candidates.map(t => {
    dimensions = computeAllDimensions(user, t)  // 28 dimensions
    effectiveWeights = applyUserAdjustments(weights, userWeightAdjustments)
    score = sumProduct(dimensions, effectiveWeights) / sum(effectiveWeights)
    score -= antiMatchPenalty(user, t)  // W28
    return { therapist: t, score, dimensions }
  })

  // Handle missing user data: substitute population mean for that variable; 
  // reduce that variable's weight by 50% in this match
  
  // Cold-start therapist (no SRS/retention yet): use modality-cohort priors 
  // (avg retention/SRS for therapists with same primary modality, capped at 0.80/4.3)
  
  ranked = scored.sort(desc by score)
  top3 = ranked.slice(0, 3)
  
  // EXPLAINABILITY
  for each match in top3:
    match.whyText = generateWhyText(match.dimensions, top3 contributors)
  
  return top3

function generateWhyText(dimensions, top3):
  // Pick the 3 dimensions with highest (weight × score) contribution
  // Map each to a human sentence template
  templates = {
    W1: "She specializes in {primaryConcern} — it's one of her top areas",
    W2: "Her style matches your preference for {directiveOrCollaborative} sessions",
    W3: "She offers the {warmth-vs-challenge balance} you said works for you",
    W6: "Her approach fits where you are right now — {stage-language}",
    W8: "She uses {modality}, which research supports for {concern}",
    W9: "She speaks {sharedLanguage}, including the language you think in",
    H5+W1: "She's QACP-certified and has worked with queer professionals for {years} years",
    ...
  }
  return assemble(templates, top3)
```

**Cold-start handling:**
- New therapist: bootstrap session5Retention=0.78, avgSrsBond=4.2 (population means), flag as "new to platform" in UI; weight W24+W25 down to 50% until 5 real matches accumulated.
- New user with skipped questions: impute median; flag those dimensions as "low-confidence" and surface to user as "tell us more for better matches" prompts.

**Worked Examples (abbreviated, top match for each):**

*Meera (#1)* → Top match T1 Aanya Krishnan (score 86): W1=95 (burnout/anxiety/perfectionism all in spec); W2=72 (Meera collab-leaning, Aanya more directive — partial); W3=92 (warm match); W6=80 (contemplation+moderate directive=ok); W9=100 (Tamil+Hindi+EN). Why-text: "Aanya specializes in burnout and perfectionism, speaks Tamil, and her warm-but-structured style fits your preference for someone who'll be present without being too directive."

*Rohan (#4)* → Top match T6 Shruti Kulkarni (score 91): H5 passes (QACP); W1=100 (identity, depression); W3=98 (very warm match); W11=70 (he wanted M but gender flexible); W17=95 (anti-oppressive lens). Why: "Shruti is QACP-certified, queer-affirmative, and works specifically with arranged-marriage pressure and identity work."

*Aman (#8 OCD)* → Top match T10 Ananya Iyer (score 93) over T3 Aarav (psychiatrist, score 88 because user explicitly didn't want meds-first): W1=100 (OCD top spec); W2=98 (both prefer directive); W6=100 (preparation+high directive); W8=100 (CBT/ERP for OCD); W27 bonus. Why: "Ananya's specialty is OCD and ERP. Her highly structured, present-focused style matches what you said you need to make progress."

### TASK 5 — THERAPY MODALITIES IN INDIA

| Modality | Best for | NOT for | Structure (1=exploratory,10=structured) | India popularity |
|---|---|---|---|---|
| **CBT** (Cognitive Behavioral) | Anxiety, depression, OCD (with ERP), insomnia, phobias | Complex trauma, identity, existential | 9 | Most common |
| **ACT** (Acceptance & Commitment) | Chronic illness, perfectionism, values-drift, anxiety | Acute crisis, OCD-pure | 7 | Common (growing) |
| **DBT** (Dialectical Behavior) | Emotion dysregulation, BPD-spectrum, self-harm, eating | Insight-only seekers | 9 | Growing (Linehan-trained still few) |
| **Psychodynamic** | Existential, relational patterns, long-term, mid-life | Acute symptom mgmt, brief-seekers | 2 | Common in senior therapists |
| **Person-Centred / Humanistic** | First-timers, ambivalence, identity exploration | Symptom-targeted work | 2 | Common (counselling-MA backbone) |
| **EMDR** | Single & complex trauma, PTSD | Active dissociation untreated, psychosis | 7 | Growing (EMDR India active) |
| **Somatic Experiencing** | Body-held trauma, chronic pain, dissociation | Pure cognitive concerns | 5 | Niche (few SE-trained) |
| **IFS** (Internal Family Systems) | Attachment trauma, parts work, complex relational | Acute crisis | 4 | Niche, growing |
| **Narrative** | Identity, meaning, marginalized clients, queer-affirmative | Severe symptoms needing structure | 2 | Niche-growing |
| **Gestalt** | Awareness, here-and-now, experiential | Strong intellectualizers initially | 3 | Niche |
| **EFT (Sue Johnson)** | Couples, attachment-injured pairs | Pre-divorce ambivalence by one | 6 | Growing (couples) |
| **Gottman Method** | Couples, communication, repair | Active affair, abuse | 7 | Growing |
| **MI** (Motivational Interviewing) | Pre-contemplation, addiction, ambivalence | Action-stage seekers | 4 | Common adjunct |
| **Schema Therapy** | Personality patterns, chronic depression | Brief work | 6 | Niche |
| **Mindfulness-Based (MBCT/MBSR)** | Recurrent depression, stress, burnout | Acute trauma without stabilization | 6 | Common (Vipassana cross-pollinates) |
| **Pharmacotherapy** (psychiatry) | OCD, bipolar, severe MDD, ADHD, psychosis | Mild adjustment issues | 10 | Standard |

### TASK 6 — 10 RESEARCH-BACKED PHASE 2 FEATURES

1. **Embedded ORS/SRS feedback loop** — pre/post-session 4-item scales. Backing: PCOMS (Miller, Duncan); Lambert FIT — clients with feedback are better off than 65% of those without. Complexity: LOW. Elfina: not visible publicly. Highest priority.

2. **Therapist 30–60s intro videos** — warm self-presentation. Backing: warmth predicts client satisfaction (Lab study, Frontiers 2017); choice-effect (Norcross — preference accommodation reduces dropout ~50%). Complexity: LOW. Elfina: has therapist profile videos already (mentioned in their UI).

3. **Session prep prompts** (24h pre-session) — "What feels most alive this week? What did you avoid mentioning last time?" Backing: structured journaling >50% faster symptom reduction in observational studies; therapy-journal protocols (Therapy Notebooks). Complexity: LOW. Some Indian platforms (Amaha) offer journaling but not session-targeted.

4. **Between-session micro-journaling tagged to modality** — CBT thought records for CBT clients, parts-dialogues for IFS, exposure-logs for ERP. Backing: Lambert et al. (homework completion → outcome). Complexity: MEDIUM. Amaha has generic journaling.

5. **Mood tracking integration with therapist visibility** — daily 1-tap mood + weekly summary visible to therapist. Backing: between-session ecological data improves clinical decisions; Amaha/Wysa have mood-track but rarely integrated to live therapist. Complexity: MEDIUM.

6. **Alliance-rupture detection from SRS patterns** — control-chart method (Lipner et al. 2022): flag any SRS drop ≥1.5 SD below client's mean as a rupture marker; therapist gets dashboard alert + repair-script suggestion. Backing: Repair-pattern outcome > rupture-pattern outcome (15% of psychotherapies show clear repair pattern, predicting better outcomes). Complexity: MEDIUM. Speculative as fully automated trigger — flag as evidence-informed.

7. **Therapy readiness assessment + stage-of-change router** — 8-item TTM stage estimator at onboarding; pre-contemplators routed to MI-skilled therapists or to "Trellis Listens" first. Backing: Prochaska stage-matched interventions outperform generic. Complexity: LOW.

8. **"Trellis Listens" — free 30-min reflective session** — light-touch, non-clinical, with junior psychologist. Backing: Elfina has tested this exact pattern with positive feedback ("I feel lighter," "perspective"). Reduces hesitation barrier. Complexity: LOW (operational).

9. **Waitlist re-matching engine** — when top match is full, automatically suggest 2nd/3rd ranked + offer "match again when X is free" toggle. Backing: capacity is a leading drop-off cause in Indian platforms. Complexity: LOW.

10. **Therapist-side dashboard** — per-therapist: avg SRS, session-5 retention, ORS-trajectory aggregates, rupture-flag list. Backing: feedback-informed clinicians have measurably better outcomes (Lambert review). Complexity: MEDIUM.

(Stretch: couples branch with separate algorithm — HIGH complexity; group therapy matching — HIGH; psychoeducation library tagged to taxonomy — LOW; progress milestones celebrations — LOW.)

### TASK 7 — INDIAN PRESENTING-CONCERNS TAXONOMY (MECE)

**1. Anxiety Spectrum** (urban metro prevalence ~3.6%, NMHS 2016)
- 1.1 Generalized anxiety
- 1.2 Social anxiety / performance anxiety
- 1.3 Panic disorder
- 1.4 Health anxiety / illness anxiety
- 1.5 Phobias (specific)
- 1.6 Indian-specific: arranged-marriage timeline anxiety; "log kya kahenge" social-evaluation anxiety; performance anxiety in toxic-corporate / IT culture; entrance-exam / interview anxiety

**2. Mood Disorders** (urban depression ~15.1%, Chennai CURES study)
- 2.1 Major depressive episode
- 2.2 Persistent depressive disorder (dysthymia)
- 2.3 Bipolar spectrum
- 2.4 Perinatal/postpartum depression
- 2.5 Seasonal/work-cycle depression
- 2.6 Indian-specific: post-arranged-marriage adjustment depression; postpartum-with-joint-family-overinvolvement; mid-life depression after "achieving everything parents wanted"

**3. Trauma & Stress-Related**
- 3.1 PTSD (single-event)
- 3.2 Complex/childhood trauma
- 3.3 Sexual violence / harassment trauma
- 3.4 Adjustment disorders
- 3.5 Grief (acute, complicated, anticipatory)
- 3.6 Indian-specific: caste-based trauma & microaggressions; communal/violence-related; partition-legacy intergenerational; honor-based / family-violence; medical trauma (hospital experiences)

**4. Relationship & Family**
- 4.1 Marital conflict
- 4.2 Pre-marital / dating issues
- 4.3 Breakup / divorce adjustment
- 4.4 Parenting stress
- 4.5 Adult attachment & dating patterns
- 4.6 Sexual concerns
- 4.7 Indian-specific: in-law / MIL conflict; joint-family enmeshment; arranged-vs-love-marriage tensions; interfaith/inter-caste relationship strain; caregiver burden for elderly parents; sibling-inheritance conflicts

**5. Identity & Existential**
- 5.1 LGBTQIA+ identity, coming out, minority stress
- 5.2 Gender dysphoria / questioning
- 5.3 Career identity / purpose
- 5.4 Mid-life crisis
- 5.5 NRI-returnee / diaspora identity
- 5.6 Religious/spiritual struggle
- 5.7 Indian-specific: caste identity reckoning; queer identity in joint-family context; second-generation NRI returns

**6. Workplace & Career**
- 6.1 Burnout (59% McKinsey 2023)
- 6.2 Toxic workplace / bullying
- 6.3 Imposter syndrome
- 6.4 Career transition / layoff
- 6.5 Work-life balance / dual-earner conflicts
- 6.6 Performance anxiety
- 6.7 Indian-specific: Indian startup hustle culture; IT-services-export-stress (graveyard shifts); family-business reluctant-heir; civil-services prep grind

**7. Neurodevelopmental (adult-recognized)**
- 7.1 ADHD adult (~14% screen-positive Delhi-NCR 18–25)
- 7.2 Autism spectrum (adult diagnosis)
- 7.3 Learning differences

**8. OCD & Related**
- 8.1 OCD (contamination, checking, scrupulosity, harm, relationship)
- 8.2 BDD
- 8.3 Hoarding
- 8.4 Indian-specific: religious-purity scrupulosity (esp. Hindu/Muslim/Jain practice-anxiety)

**9. Substance & Behavioral Addictions**
- 9.1 Alcohol use disorder
- 9.2 Cannabis / other substances
- 9.3 Gambling (incl. fantasy-sports)
- 9.4 Internet / smartphone / porn / gaming
- 9.5 Indian-specific: weekend-binge-drinking professional culture; tobacco/gutkha

**10. Eating & Body Image**
- 10.1 Anorexia / restrictive
- 10.2 Bulimia / binge-eating disorder
- 10.3 Sub-clinical disordered eating
- 10.4 Indian-specific: wedding-weight-loss pressures; fairness/colorism body distress

**11. Personality & Self**
- 11.1 BPD-spectrum / emotion dysregulation
- 11.2 NPD-spectrum
- 11.3 Avoidant / dependent patterns
- 11.4 Self-esteem / chronic self-criticism

**12. Health & Adjustment**
- 12.1 Chronic illness adjustment (diabetes, autoimmune, cancer)
- 12.2 Infertility / reproductive
- 12.3 Perimenopause / hormonal
- 12.4 Sleep disorders
- 12.5 Chronic pain

**13. Psychosis / Severe** (refer-out gate; included for taxonomy completeness)
- 13.1 Schizophrenia spectrum
- 13.2 Severe bipolar with psychotic features

**Tagging convention (TS-friendly):**
```ts
type ConcernTag = `${number}.${number}` // e.g., "1.6"
// users.primaryConcerns: ConcernTag[]
// therapists.specializations: ConcernTag[]
// W1 score = Jaccard-overlap with bonus for therapist's top-3 spec containing user's #1
```

---

## CAVEATS & EVIDENCE FLAGS

- **Evidence-based (well-established):** ORS/SRS in PCOMS; C-NIP 4-axes; alliance-outcome r=0.28; preference-matching halves dropout; language-match doubles outcome; stage-of-change × intervention; CBT/ERP for OCD; EMDR for PTSD; QACP necessity for queer Indian clients (clinical consensus).
- **Evidence-informed but with mixed findings:** ethnic match alone (weak); attachment-style × therapist-style match (signal exists but RCT-mixed); therapist intro videos (lab-only, not RCT'd in India).
- **Speculative / require validation:** Automated rupture-detection thresholds (1.5 SD is borrowed from Lipner control-chart method but unvalidated on Indian sample); "session-5 retention" as a stable therapist KPI (sourced from Elfina's stated 80% — internal claim, not peer-reviewed); Bayesian per-user weight updates (a design choice, not prescribed by literature).
- **Indian-specific data gaps:** Therapist supply numbers are RCI-registered clinical psychologists only (~3,890 nationwide) — counsellor numbers are higher but unregulated; QACP-certified count is approximate (>500 since 2019, MHI cohort data); fee ranges from competitor surveys, not regulated.
- **Persona realism:** All 22 user and 16 therapist personas are illustrative composites — names, backstories, and credentials are constructed to be plausible and MECE, not to depict real individuals. RCI numbers are placeholders ("A-12345" pattern); replace with realistic 5-digit values during seed generation.
- **Algorithm tuning:** Default weights above are anchored in literature (W1 highest because preference + concern-fit have biggest meta-analytic effect), but specific numbers (18, 9, 9, 8…) should be A/B-tested. Start by setting W28 (negative anti-match) cap at −25 and the per-match user-weight delta at η=0.05 to avoid runaway personalization with sparse feedback.
- **Hard-filter relaxation order** (when no candidates pass): relax W12 (age), then W14 (format-second-choice ok), then W3 (fee +25%), then W17 (religious literacy soft); never relax H1 (language), H5 (queer-affirmative), H6 (psychiatry-need), H7 (trauma-specialty), H8 (severity-license), H9 (hard gender pref).
- **"Why we matched" generation:** keep to 2–3 sentences, lead with the largest W-contributors, never expose raw scores; avoid claims about retention/SRS that would compare therapists publicly.
- **Cold-start fairness:** new therapists should NOT be penalized for missing W24/W25 — use cohort-modality priors and surface "new on Trellis" badge instead of low score.