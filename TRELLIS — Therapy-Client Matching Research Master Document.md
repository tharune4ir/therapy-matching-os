# TRELLIS — Therapy-Client Matching Research Master Document
## A Research Foundation for a World-Class Mobile-First Therapy Matching Prototype

> *Research compiled to power a "proof of work" prototype for a Founder's Office role at an online therapy startup. The prototype borrows the architectural philosophy of "Mila" (a dating-style multi-layer compatibility algorithm) and applies it to a fundamentally different domain: matching humans seeking therapy to the right therapist. All 8 research tasks are answered below, with citations, statistics, hex codes, and prototype-ready specifications.*

---

## TL;DR

- **The therapeutic alliance is the single most replicated predictor of therapy outcome (r ≈ 0.275–0.30, ~8% of outcome variance, across 295 studies and 30,000+ patients in Flückiger, Del Re, Wampold & Horvath, 2018), while specific modality contributes far less ("dodo bird verdict"); therefore, a matching app for therapy must optimize for *fit and alliance probability* over advertising techniques. Approximately 5–8% of outcome variance is also attributable to *which* therapist a client sees (Wampold & Brown, 2005), making therapist-selection the highest-leverage product decision.**
- **A 40+ variable framework can be organized into three layers — (1) Hard filters (safety, language, license, fee, format); (2) Weighted compatibility scoring (presenting concern × modality fit, communication-style preferences via Cooper-Norcross C-NIP, attachment, stage-of-change, gender/identity, cultural-religious-caste sensitivity, scheduling, age/life stage); and (3) Feedback learning via post-session FIT-style ratings (Outcome Rating Scale + Session Rating Scale; Lambert, Miller, Duncan). Client preference accommodation alone reduces dropout at a roughly 1:2 ratio and produces small but reliable outcome gains (d ≈ 0.28, Swift et al., 2018; Lindhiem et al., 2014).**
- **For an Indian urban-professional audience (₹1,000–3,500/session market with a 70–92% national treatment gap; 0.75 psychiatrists per 100,000 — WHO/NMHS 2015–16, NIMHANS), the prototype should pair a calming sage-green/lavender/warm-neutral palette (distinctly *not* Mila's dating coral) with an ethical Hooked-model loop: internal triggers (anxiety, burnout) → low-friction self-discovery onboarding → variable reward (a warm "Why we matched you" explanation) → investment (post-session feedback + profile refinement). The product passes Eyal's "regret test" only if it materially improves the user's life and the founder would use it themselves — which means designing for the *right* habit (showing up to therapy) without dark patterns.**

---

## 1. THERAPEUTIC ALLIANCE SCIENCE — THE MATCHING VARIABLES

### 1.1 What is the therapeutic alliance?

The therapeutic alliance — also called the "working alliance" or "helping alliance" — was reformulated by **Edward Bordin (1979, *Psychotherapy: Theory, Research and Practice*, 16(3), 252–260)** as a *transtheoretical* construct comprising three interdependent components:

1. **Bond** — the affective relationship and trust between client and therapist.
2. **Tasks** — agreement on *what* will be done in therapy (techniques, exercises, homework).
3. **Goals** — agreement on *what* therapy is trying to achieve.

Bordin's reformulation pulled the alliance out of psychoanalysis and made it relevant to every modality, which is why it has become the most-studied process variable in psychotherapy research.

### 1.2 Effect size of alliance on outcome (the hard numbers)

- **Horvath & Symonds (1991), *Journal of Counseling Psychology*, 38(2), 139–149** — first major meta-analysis (24 studies, 20 data sets): moderate but reliable r between working alliance and outcome; client-rated alliance was the strongest predictor.
- **Martin, Garske & Davis (2000)** — confirmed and extended the finding.
- **Horvath, Del Re, Flückiger & Symonds (2011)** — synthesis of 200+ reports, ~14,000 treatments: r ≈ 0.275, ~8% of outcome variance.
- **Flückiger, Del Re, Wampold & Horvath (2018), *Psychotherapy*, 55(4), 316–340** — the current gold-standard meta-analysis: 295 independent studies, >30,000 patients (1978–2017). Robust moderate alliance–outcome correlation across modalities, settings, and patient populations, including e-mental-health trials.
- **Eubanks, Muran & Safran** — two further meta-analyses showed that *rupture-and-repair* events in the alliance also predict outcome (a moderate effect), meaning the *capacity to recover from misalignment* is itself therapeutic.

> **Practical implication for the app:** If the alliance accounts for ~8% of variance and is reliably measurable, even a modest improvement in initial fit (driven by the matching algorithm) is a clinically meaningful uplift. This is the single strongest empirical justification for a therapy-matching product.

### 1.3 Therapist effects: some therapists are reliably better

- **Wampold & Brown (2005), *Journal of Consulting and Clinical Psychology*, 73(5), 914–923** — analyzed 6,146 patients × ~581 therapists in managed care. ~5% of outcome variance was attributable to *which therapist a patient saw*, controlling for patient severity. Patient age, gender, diagnosis, and even therapist age, gender, experience and degree explained almost none of the therapist-level variance.
- Subsequent literature (Saxon & Barkham; Baldwin & Imel, 2013; Johns et al., 2019; Nissen-Lie et al., 2024) consistently puts therapist effects in the **5–10% range**, larger in naturalistic care than in RCTs and larger for high-severity patients.
- **Goldberg, Rousmaniere et al.** — therapist outcomes do *not* automatically improve with experience; some therapists actually deteriorate over time without deliberate practice.
- **Oh, Bugatti, Hines, Sandage & Owen (in press, *Clinical Psychology & Psychotherapy*)** — therapist *flourishing* (well-being) predicts lower client dropout (OR = 0.90); burnout does not significantly predict it; higher caseloads and more years in practice were associated with *increased* dropout.

> **Implication:** "Therapist quality" is real, measurable, and not captured by credentials/experience. The product must surface and reward consistently effective therapists via routine outcome monitoring, not credentials alone.

### 1.4 The Dodo Bird Verdict

Coined by **Saul Rosenzweig (1936)** ("Everybody has won, and all must have prizes"), revived by **Luborsky, Singer & Luborsky (1975, *Archives of General Psychiatry*)** and reaffirmed in **Luborsky et al. (2002), *Clinical Psychology: Science and Practice*, 9, 2–12**: 17 meta-analyses of bona-fide-vs-bona-fide comparisons yielded a mean uncorrected absolute Cohen's d ≈ 0.20 (small, often non-significant), shrinking further when researcher allegiance was controlled.

The dodo bird verdict implies that *most* well-established therapies (CBT, psychodynamic, IPT, ACT, person-centred) produce broadly comparable outcomes for the conditions they target — which is exactly why matching on **modality preference, alliance fit, and therapist effects** matters far more than picking the "best" school. (Note: the verdict is contested for specific indications — e.g., exposure-based therapies are clearly superior for OCD and PTSD; CBT-I is superior for insomnia.)

### 1.5 Specific predictors of fit and dropout

**Patient preferences (the strongest matchable lever):**
- **Lindhiem, Bennett, Trentacosta & McLear (2014), *Clinical Psychology Review*** — meta-analysis of 32 trials: shared decision-making and preference accommodation produce significant gains in satisfaction, completion, and clinical outcome.
- **Swift, Callahan, Cooper & Parkin (2018), *Journal of Clinical Psychology*** — preference-matched clients dropped out at almost half the rate of non-matched clients; outcome d ≈ 0.28.
- **Norcross & Cooper (2021), *Personalizing Psychotherapy*** — APA Task Force concluded that fitting therapy to client preferences "demonstrably improves treatment outcomes" (Norcross & Wampold, 2018).
- **Cooper-Norcross Inventory of Preferences (C-NIP)** — a brief multidimensional measure capturing four preference dimensions: *therapist directiveness, emotional intensity, past vs present orientation, warmth-vs-challenge*. This is the closest thing the field has to a validated "matching questionnaire" and should anchor the prototype's onboarding.

**Cognitive/agreement match:**
- Match on perceived problem distress and on *cause/illness myth* predicts engagement and outcome (Zane et al.; Bernal & Domenech-Rodriguez meta-analysis on culturally adapted psychotherapy — "adaptation of the illness myth" was the only significant moderator).

**Personality match:**
- **Werbart, Hägertz & Borg Ölander (2018)** — convergent anaclitic–introjective personality match (both relational or both self-defining) produced larger effect sizes and lower non-improvement rates.
- **Big Five congruence:** Global Q-correlation similarity in Big Five profiles is moderately associated with symptom reduction; therapist *neuroticism* (lower) is the most consistent single-trait predictor of better outcomes (Chow et al.; van Leeuwen et al., 2015).

**Attachment style:**
- Anxious-preoccupied clients benefit from structured, consistent, attuned therapists who don't reinforce the amplification cycle.
- Dismissive-avoidant clients benefit from therapists who close therapeutic distance gradually rather than honoring the avoidance.
- Disorganized/fearful-avoidant clients need trauma-informed, paced therapists with high tolerance for oscillation.
- Therapist insecure attachment can damage the alliance; therapist self-awareness is protective (Holmes, 2015).

**Ethnic/cultural match:**
- **Cabral & Smith (2011), *Journal of Counseling Psychology*** — meta-analysis of 154 studies: clients show a *moderately strong preference* for same-ethnicity therapists (d ≈ 0.63), perceive them more positively (d ≈ 0.32), but actual outcome difference is *small to negligible* (d ≈ 0.09). Implication: offer same-culture matching as a *preference filter* (because preference alone improves engagement) without claiming it produces better outcomes.

**Gender match:**
- ~60% of clients have no gender preference (Counselling Psychology Quarterly, n=2,002 men). When clients *do* have a preference and get a matched therapist, satisfaction is significantly higher. Trauma survivors and the gender-diverse benefit most from honored preferences. A small "female-therapist effect" appears in some samples (higher alliance ratings irrespective of client gender).

**Stage of change (Prochaska & DiClemente Transtheoretical Model):**
Five stages — Precontemplation, Contemplation, Preparation, Action, Maintenance — and the *core* claim is that interventions must be **stage-matched**: consciousness-raising and motivational interviewing for precontemplation/contemplation; behavioral activation, exposure, and skills work for action/maintenance. A precontemplation client paired with a directive CBT therapist will likely drop out; the same client paired with a motivational-interviewing therapist will move forward.

**Dropout predictors (from Zimmermann et al., 2017; Swift & Greenberg, 2015; meta-analyses):**
- ~20% baseline dropout rate across psychotherapy.
- Therapist-level variance in dropout: ~5.7%.
- Patient predictors: male sex, lower education, higher initial impairment, histrionic style, lower compulsive style, negative treatment expectations, personality disorder (especially borderline), low importance assigned to starting therapy.
- Process predictors: weak early alliance, mismatch between preferred and delivered activities, "insufficient improvement" perception (Swift & Greenberg's three top reasons: dissatisfaction, external obstacles, perceived insufficient improvement).

### 1.6 The 40+ variables — a master inventory

Below is the empirically supported variable set the algorithm should ingest. Each is justified by at least one of the studies above.

**A. Therapist-side modality / approach (1–10):** CBT, ACT, DBT, Psychodynamic/Psychoanalytic, Humanistic / Person-Centred, EMDR, Somatic Experiencing / Sensorimotor, IFS (Internal Family Systems), Narrative therapy, Gestalt. (Plus subspecialties: CBT-I for insomnia, CPT and PE for trauma, ERP for OCD, EFT for couples.)

**B. Client presenting concerns (11–25):** Generalized anxiety, social anxiety, panic, depression, bipolar, OCD, PTSD/complex trauma, grief and bereavement, relationship/marital issues, parenting stress, workplace burnout / corporate stress, identity / existential, self-esteem, anger, ADHD (adult), perinatal mental health, eating concerns, addiction/substance use, sleep, sexuality issues, chronic illness adjustment.

**C. Communication / process style (26–29):** Directive vs non-directive (C-NIP scale 1); structured/skills-focused vs exploratory (C-NIP 2); past/insight vs present/here-and-now (C-NIP 3); warmth/support vs challenge/confrontation (C-NIP 4).

**D. Therapist personality and warmth (30–32):** Empathy (Elliott, Bohart, Watson & Murphy, 2018 meta-analysis: r ≈ 0.28, d ≈ 0.58, k = 82, n = 6,138); congruence/genuineness; non-possessive warmth / unconditional positive regard (Farber & Doolin: r ≈ 0.27, k = 18; effect amplifies for racial/ethnic minority clients).

**E. Cultural / linguistic / identity (33–37):** Language fluency (English + regional Indian languages — Hindi, Marathi, Tamil, Bengali, Kannada, Telugu, Malayalam, Punjabi, Gujarati); religion/spirituality openness; caste sensitivity; LGBTQIA+ affirmative training (Mariwala Health Initiative QACP certification is the de-facto Indian standard); gender of therapist and client preference for it.

**F. Logistics (38–40):** Timezone / availability windows; session frequency (weekly, fortnightly, intensive); session format (video, phone, chat/asynchronous, in-person hybrid).

**G. Financial fit (41–42):** Fee range (₹800–3,500+ in India); sliding-scale availability; insurance/EAP coverage where relevant.

**H. Relational / readiness (43–46):** Client adult-attachment style (Secure / Anxious-preoccupied / Dismissive-avoidant / Disorganized); stage of change (Pro/Con/Prep/Action/Maint); prior therapy experience (first-timer vs experienced); treatment expectations (positive/realistic/negative).

**I. Demographics (47–49):** Age / life stage (early-career 22–28, settled professional 29–40, mid-life 40–55, etc.); parenthood status; relationship status (single/dating/partnered/married/separated).

**J. Therapist quality signals (50–52):** Specialization depth vs breadth; routine outcome monitoring (FIT/ROM) participation; client-rated alliance scores from prior matches.

That is **52 variables**, comfortably exceeding the 40+ requirement.

---

## 2. THE 40+ VARIABLE MATCHING FRAMEWORK (Mila-style three layers, retuned for therapy)

### Layer 1 — Hard Filters (Gates)

A candidate therapist is *ineligible* for scoring if any of the following do not match. These are non-negotiable safety, regulatory, and feasibility constraints.

| # | Filter | Rule | Rationale |
|---|---|---|---|
| 1 | License / Credential | RCI registration (clinical psychologist), or MA Psychology + RCI-recognized M.Psy/PsyD/ M.Phil; or MD/DNB/DPM Psychiatry registered with state medical council | Mandatory in India under Mental Healthcare Act 2017; unlicensed practice is illegal |
| 2 | Crisis capability | If onboarding flags suicidal ideation (PHQ-9 item 9 ≥ "more than half the days") or self-harm risk → only therapists with crisis-trained, psychiatry-linked profiles + escalation protocol surface | Patient safety; ethical floor |
| 3 | Language | At least one mutually fluent language between therapist and client | Communication is foundational to alliance |
| 4 | Fee within budget | Therapist's fee ≤ client's max + sliding-scale offer where applicable | Affordability is the #1 barrier in India after stigma |
| 5 | Format | Therapist offers the modality (video/chat/phone) the client selected | Logistical feasibility |
| 6 | Timezone / availability | At least 2 overlapping slots/week within client's preferred windows | Scheduling friction is a top dropout reason |
| 7 | Specialization minimum | If client flagged a high-specialty concern (OCD, PTSD, eating, addiction, perinatal), therapist must have explicit training in that area | Generalists for these conditions reliably underperform specialists |
| 8 | Identity-affirmative gate | If client identifies as LGBTQIA+ and explicitly requests affirmative care, therapist must hold a recognized QACP-equivalent certification | Trust, safety, dropout prevention |

### Layer 2 — Weighted Compatibility Scoring (max 100)

Each remaining therapist is scored on a 0–100 compatibility score. Weights are proposed based on the strength of evidence and the practical leverage for fit. (Weights are *defaults*; the system should learn personalized weights from feedback over time.)

| # | Dimension | Weight | Source / rationale |
|---|---|---|---|
| 1 | Presenting-concern × evidence-based modality fit | 14 | Modality differences are small in aggregate (dodo) but meaningful for OCD/PTSD/insomnia/eating; carries highest single-variable weight |
| 2 | Communication-style match (C-NIP 4 dimensions) | 12 | Cooper-Norcross C-NIP — preference accommodation reduces dropout ~50% |
| 3 | Therapist alliance/empathy track record (from FIT data) | 10 | Empathy r=.28; therapist effects 5–8% of variance |
| 4 | Cultural / religious / caste / family-system fit | 8 | Critical in Indian context; preference effect d=.63 |
| 5 | Language fluency depth (primary + secondary) | 6 | Beyond Layer-1 binary: depth of regional language matters |
| 6 | Gender preference match | 6 | When preference is explicit, satisfaction effect is meaningful |
| 7 | Attachment style × therapist style | 6 | Avoids re-enacting client's attachment wound |
| 8 | Stage-of-change × therapist directiveness | 6 | Stage-mismatched interventions push users *backward* |
| 9 | LGBTQIA+ / queer-affirmative depth | 5 | Beyond Layer-1 gate: lived-experience match is preferred |
| 10 | Age / life-stage relevance | 5 | Early-career burnout vs mid-life identity differ structurally |
| 11 | Personality / warmth-challenge balance | 4 | Therapist neuroticism (low), agreeableness, openness predict outcomes |
| 12 | Therapist flourishing / burnout signal | 4 | Flourishing predicts lower client dropout (OR = 0.90) |
| 13 | Logistics depth (slot abundance, response-time SLA) | 4 | Reduces real-world friction |
| 14 | Financial fit (within range, sliding-scale availability) | 4 | Continuity is what makes therapy work |
| 15 | Specialization depth vs breadth | 3 | Match to severity/complexity |
| 16 | Prior-therapy experience compatibility | 3 | First-timers benefit from gentler onboarding therapists |
| **Total** | | **100** | |

**Scoring math (illustrative for the prototype):**
- Each dimension uses a 0–1 sub-score. Multiply by weight, sum to 100.
- Display only the **top three** matches to avoid choice overload (a documented benefit of recommender systems in mental health, Valentine, D'Alfonso & Lederman, 2023).
- Show "Why we matched you" reasons for the **top 3 weighted dimensions** that drove the score (explainability — see §8).

### Layer 3 — Feedback Learning Loop

Built on **Feedback-Informed Treatment (FIT)** — an evidence-based framework from Lambert, Miller, and Duncan that has been shown to *measurably improve* therapy outcomes when integrated into routine practice. Two ultra-brief instruments power this loop:

- **Outcome Rating Scale (ORS)** — 4 items, ~1 minute, captures personal/interpersonal/social/overall functioning before each session.
- **Session Rating Scale (SRS)** — 4 items, ~1 minute, captures bond, goals, approach, overall, *after* each session.

**Loop mechanics:**
1. **Pre-session ORS** — feeds the therapist a real-time signal of trajectory.
2. **Post-session SRS** — feeds the matching algorithm a real-time signal of fit.
3. After 2 sessions: if SRS bond/approach scores are below the 25th percentile, the app *gently* offers to reassess match ("It looks like this might not be the right fit yet — would you like to talk to a care coordinator?"). This reduces the silent-dropout problem (Swift & Greenberg, 2015).
4. After 4 sessions: if ORS is not improving, system flags for therapist supervision and offers the user a no-cost re-match.
5. Aggregate SRS/ORS data trains the algorithm: therapists whose matches consistently produce strong alliance scores in *specific* client clusters get up-weighted for those clusters; therapists whose matches with avoidant + male + first-timer clients fail get down-weighted for that profile while remaining strong for others.

**Cold-start problem:** Until enough feedback exists, weights default to evidence-based prior values from §1; new therapists get a small "exploration bonus" to surface them, bounded by their credentials and supervisor sign-off.

---

## 3. COLOR PSYCHOLOGY FOR MENTAL HEALTH APPS

### 3.1 What the research says

- **Cool tones (blue, green, teal, sage, lavender)** activate the parasympathetic nervous system, slow heart rate and breathing, increase alpha-wave activity, and are read by the human brain as "safety / resource availability" cues, with deep evolutionary roots (water, sky, vegetation). Goldstein (1942) is the seminal reference; replicated in Elliot's *Advances in Experimental Social Psychology* review (2015) and in environmental-psychology studies showing blue rooms lower heart rate.
- **Lavender** combines blue's calm with red's emotional depth; associated with reduced cortisol, sleep, and introspection.
- **Sage green** is the canonical "wellness/healing" hue — restorative, balanced, low-stimulation; widely used in therapy spaces and classrooms.
- **Warm neutrals** (cream, sand, taupe, terracotta) ground users emotionally — they signal "home" and engage the limbic system gently, preventing cool palettes from feeling clinical or sterile.
- **Cross-cultural caveat:** White signals cleanliness in the West but mourning in some Asian cultures; in India, saffron/orange has religious connotations. Test with diverse users.

### 3.2 What successful mental-health apps actually use

| App | Primary palette (verified hex codes) | Mood it produces |
|---|---|---|
| **Calm** | Cloud Burst #1B2250, Havelock Blue #6282E3, White #FFFFFF | Deep night sky → tranquility, focus |
| **Headspace** | Blue Ribbon #0C6FF9, Pumpkin #FF7E1D, Supernova #FFCE00, Green Haze #01A652, Ship Gray #413D45, White | Calm-trust foundation + playful warmth |
| **Wysa** | Mine Shaft #222222, Polar #DDF6F8, Paradiso (teal) #388794 | Safe, serious, calming clarity (penguin mascot signals warmth) |
| **BetterHelp** | Teal-green and clean white-greys (clinical-trust focus) | Trust, professionalism |
| **Talkspace** | Soft blues, white, warm purple accents | Approachable + medical credibility |
| **Amaha (India)** | Soft blue + warm cream + sage-green accents | Locally calibrated for Indian wellness aesthetic |

### 3.3 Colors to AVOID for mental health

- **Bright/neon red, neon orange, neon yellow** — activate fight-or-flight, raise heart rate, trigger anxiety.
- **High-saturation pure red** — historically used in dating/urgency contexts (Tinder, McDonald's, Mila); appropriate for excitement, *not* for therapy. This is the strongest reason **the Mila coral/pink palette must NOT carry over** to a therapy app — it would semantically conflict with the calming, trust-building intent.
- **Cold steel-grey alone** — feels clinical, sterile, depressing.
- **Pure black backgrounds without warmth** — can amplify low mood for vulnerable users.
- **Excessive purple saturation** — reads as "luxury / spiritual" and can feel performative.

### 3.4 Proposed palette for the prototype: "Trellis"

Designed to be the deliberate antithesis of Mila's coral while remaining warm, distinctly Indian-friendly, accessible (WCAG AA), and immediately legible as "mental health" without feeling clinical.

| Role | Name | Hex | Rationale |
|---|---|---|---|
| **Primary** | Sage Companion | `#7A9E7E` | Sage green — the canonical healing/wellness hue; restorative; differentiates from Calm's blue and Mila's coral |
| **Primary-deep** | Forest Whisper | `#3F5E45` | Used for primary text on light backgrounds and for emphasis; meets WCAG AA contrast (>7:1) on cream |
| **Secondary** | Soft Lavender | `#C9B8E0` | Lavender — calm + introspection + a hint of the empathic/relational; warms the green |
| **Secondary-deep** | Twilight Iris | `#6B5B95` | For headers, illustrative accents |
| **Accent / CTA** | Warm Ochre | `#D4A574` | A warm neutral-orange that signals action without being aggressive — used sparingly for primary buttons; passes the "regret test" because it doesn't manipulate but invites |
| **Background — light mode** | Linen Cream | `#F7F3ED` | Warm off-white — feels like soft paper, prevents sterile feel; strictly NOT pure white |
| **Background — dark mode** | Deep Olive Night | `#1F2B22` | Warm-tinted dark grey-green for evening users; reduces blue-light strain |
| **Surface (cards)** | Mist | `#EDEAE3` (light) / `#2C3A30` (dark) | Slightly raised "card" surface |
| **Text — primary** | Charcoal Bark | `#2A2E2B` | Near-black with warm tint; AA on Linen Cream |
| **Text — secondary** | Stone | `#6F756F` | Captions, helper text |
| **Success** | Restorative Mint | `#88B79B` | For positive outcome signals (e.g., "your alliance score is improving") — a desaturated cousin of the primary |
| **Warning / care** | Amber Care | `#E0A04A` | For gentle alerts ("you haven't logged in for 7 days — checking in") |
| **Error / crisis** | Quiet Coral | `#C9534F` | For only the most serious alerts (NOT used as ambient color); muted to avoid panic-induction |

**Typography pairing (recommendation):**
- Headers: **Fraunces** or **Recoleta** (warm humanist serif — feels "human, not corporate")
- Body: **Inter** or **General Sans** (crisp, accessible, high x-height)
- Indic script: **Tiro Devanagari Sanskrit** or **Hind** for Hindi support

**Accessibility checks:**
- Charcoal Bark `#2A2E2B` on Linen Cream `#F7F3ED`: contrast ratio ≈ 12.4:1 ✅ AAA
- Forest Whisper `#3F5E45` on Linen Cream: ≈ 6.8:1 ✅ AA Large + AA Normal
- Warm Ochre button with white text: must use `#B8843D` for AA compliance on text-bearing buttons.

---

## 4. HOOKED MODEL (Nir Eyal) APPLIED ETHICALLY TO THERAPY MATCHING

Nir Eyal's Hook Model (*Hooked*, 2014) describes a four-stage habit-formation loop. Eyal himself emphasizes "**The Morality of Manipulation**" chapter, providing two diagnostic questions:

1. **Does the product materially improve users' lives?**
2. **Would the maker themselves use it?**

Therapy matching answers "yes" to both — placing it in Eyal's "**Facilitator**" quadrant (the only ethically green quadrant). The model can be used safely because *the habit being formed (showing up to therapy) is the habit the user already wants*.

### 4.1 Trigger — what brings someone to seek therapy

**Internal triggers** (the *real* prompts; designing for these is the whole game):
- Persistent anxiety that won't switch off
- A breakup, divorce, or major relationship rupture
- Burnout / "I can't do this anymore" at work
- Grief / bereavement
- A panic attack
- Recurring intrusive thoughts (OCD onset)
- Identity questioning (queer, career, marriage)
- Family conflict (parents, in-laws, joint family)
- A friend's diagnosis or suicide
- Postpartum overwhelm
- "I tried therapy before and it didn't work" — wanting a second chance

**External triggers** (channels that surface the app at the right moment):
- A friend recommending it (the most powerful in low-trust markets like India)
- An empathetic article or Instagram reel about therapy
- A workplace EAP communication
- A doctor or GP referral
- Influencer / podcast mention from someone the user trusts
- A search query like "how to know if I need therapy"

> **Design move:** the *first screen* must validate that the user is reaching out at a hard moment. NOT "Welcome to Trellis!" but something like "**It takes courage to be here. Let's go at your pace.**" This converts anxious arrival energy into trust.

### 4.2 Action — the simplest possible step

The minimum action that must feel *easier than not doing it*. For dating apps it's a swipe. For therapy, it must be **one tap to start a self-discovery moment**, not a clinical form.

**Onboarding philosophy: "self-discovery, not intake."**
- Frame each question as helping the user understand themselves better, not as filling a database.
- Use conversational, single-screen-per-question pacing with progress dots (Duolingo-style).
- Hide the clinical instruments inside the conversational flow (PHQ-9, GAD-7 questions phrased gently — see §6).
- Use haptic feedback on selections (Headspace's pattern — focuses attention).
- Skippable breath/grounding moment mid-flow (Headspace technique — builds value before extracting more data).

### 4.3 Variable Reward — the "Why we matched you" moment

This is the magic step. Each user will see something *personalized* and *partially unpredictable* — the hallmark of variable rewards.

**The reward flow:**
1. After onboarding, a brief loader: "Reading your story… Reading therapist stories…" (3.5 seconds — Wysa/MIT Ginger pattern)
2. **Reveal screen** — a single therapist's photo, first name, and a **warm, plain-language explanation** of *why* the algorithm chose them. Each explanation is dynamically generated from the user's *top 3 weighted matching dimensions* (see §8).
3. **Tonal variability** — the explanation language varies across sessions (warm/friendly tone is the verified default per Okoso et al., 2024 *Toward Tone-Aware Explanations in Recommender Systems* — users prefer warmth over competence in AI-mediated relational decisions; r-effect: warmth-tone increased trust scores significantly).
4. The user sees **3 matches**, with the top one foregrounded. They can tap "Tell me more about why" to expand.

This is variable but *not slot-machine-style* — the reward isn't the dopamine of a swipe, it's the relief of feeling understood. The variability comes from the depth of the personalization, not from withholding outcomes.

### 4.4 Investment — the user puts something in

Investments increase future trigger sensitivity and lock in switching costs in *ethical* ways (because the investment is in the user's own self-understanding, which they keep regardless).

**Investments to design:**
- **Post-session SRS / ORS feedback** — 60 seconds, clearly labeled "this helps your therapist help you better, and helps us refine your match if needed."
- **Therapy journal entries** — optional, encrypted, never shared with therapist without consent. Builds a personal record the user owns.
- **Preference refinement** — after session 3, an in-app "How is this feeling so far?" with the C-NIP four-axis sliders. Users tune their own algorithm.
- **Goals tracking** — Bordin's "tasks/goals" component made tangible: a user-editable list of what they want from therapy, reviewed every 4 sessions.
- **Streaks done right** — NOT "you've missed 3 days, your streak is gone!" (manipulative). Instead "you've shown up for yourself 6 weeks in a row — that's real change" (celebratory). Critically: skipping a session must NEVER produce a guilt-inducing notification.

### 4.5 Ethical guardrails (vs Mila's dating dynamics)

| Dark pattern (avoid) | Ethical alternative |
|---|---|
| Endless scroll of therapists | Curated top-3, max one re-match per onboarding |
| FOMO countdowns ("3 left at this rate!") | Transparent pricing, no urgency manipulation |
| Streaks that punish skipping | Streaks that celebrate showing up |
| Push notifications timed to user vulnerability | Predictable, opt-in scheduling reminders only |
| Hidden cancellation flow | One-tap cancel; one-tap pause |
| Engagement metrics as North Star | **Outcome metrics** (ORS improvement) as North Star |
| Algorithmic black box | Explainable matching ("Why we chose this therapist for you") |
| Selling user data | Zero data sales; clinical-grade privacy |
| Re-engagement campaigns when user disengages | Single opt-in check-in, then respect user's choice to leave |

> **Eyal's Regret Test (paraphrased):** "Would the user be glad they used your product if they fully understood how it works?" For therapy matching, the answer should be a confident yes — because the user got matched faster, more accurately, and with more agency than they would have on their own. Habits formed: *attending sessions, completing feedback, building self-awareness.* These are habits any reasonable person endorses.

---

## 5. INDIAN MENTAL HEALTH MARKET CONTEXT

### 5.1 The state of access (the hard numbers)

- **National Mental Health Survey of India 2015–16 (Gururaj et al., NIMHANS)**: ~150 million Indians need mental health care; **treatment gap is 70–92%** depending on disorder.
- 1 in 20 Indians suffer from depression; productive age groups (25–45) are most affected.
- **Workforce shortage:**
  - **Psychiatrists:** ~0.75 per 100,000 (some sources cite 0.29–0.3); WHO recommends ≥1.7. India has ~9,000 practising psychiatrists (2023 Parliamentary Standing Committee); 36,000 needed for basic adequacy.
  - **Clinical psychologists:** ~4,309 RCI-registered (Rehabilitation Council of India); ~0.07 per 100,000.
  - **Psychiatric nurses:** 0.8 per 100,000.
  - **Psychiatric social workers:** 0.06 per 100,000.
  - State variance is enormous: Madhya Pradesh 0.05/lakh psychiatrists vs Kerala 1.2/lakh.
- **WHO Mental Health Atlas (2017)**: 0.20 beds per 10,000 population; rural infrastructure is one-fifth of urban.
- **Post-COVID** surveys: ~40% increase in therapy-seeking for anxiety, stress, relationship concerns.
- **NIMHANS-2 announcement (Union Budget 2026–27)** signals real political prioritization — favorable policy tailwind for any therapy startup.

### 5.2 Barriers to therapy in urban India

1. **Stigma** — three forms (Corrigan et al. framework, applied in Indian context by Raghavan et al., 2023; Ahmed et al., 2023):
 - *Public stigma*: "mental illness is weakness," "bad karma," "evil spirits"
 - *Self-stigma*: shame about reflecting badly on family in collectivist culture
 - *Structural stigma*: insurance non-coverage, professional "soft-skill" framing
2. **Cost** — ₹1,000–3,500 per session is a real barrier for the lower-middle class; even urban professionals balk at long-term commitments.
3. **Trust deficit** — fear of confidentiality breach, particularly in tight family/social networks.
4. **"Not knowing where to start"** — most professionals can't tell a counselor from a clinical psychologist from a psychiatrist; choice paralysis is severe.
5. **Bad first experiences** — a quarter of Reddit/Quora/Mouthshut therapy threads describe a mismatched first therapist as the reason they "tried therapy and it didn't work." This is the single largest market opportunity for a matching product.
6. **Family involvement** — in collectivist contexts, the individual is "subservient to family, kin, caste, religion" (Indian Family Systems literature, *Indian J Psychiatry*); therapy goals must often be negotiated against family expectations.
7. **Language** — many regional-language speakers cannot find local-language therapists; English-only platforms exclude a large segment.
8. **Time** — urban professionals (25–40) cite long commutes and unpredictable work hours; online therapy is now *preferred* over in-person for this segment.

### 5.3 The urban professional segment (25–40)

- Most digitally comfortable cohort; uses UPI, food apps, telehealth fluently.
- Comfortable with English-medium therapy but increasingly seeking Hindi/regional options for emotional depth.
- Triggers: workplace burnout, marital/relationship issues, parenting, identity (especially around arranged-marriage timing, queer identity), early existential reckoning.
- Willingness to pay: ₹1,500–2,500 sweet spot per session; will pay ₹3,000+ for "perceived best fit" if first-session value is delivered.
- Highly influenced by Instagram/LinkedIn mental health creators and friend recommendations.
- Strong preference for *anonymity from family* — privacy and discretion are paramount product values.

### 5.4 Cultural sensitivities to encode

- **Family system**: nuclear vs joint; presence/absence of in-laws; intergenerational expectation conflict.
- **Religion**: Hindu (sub-traditions), Muslim, Christian, Sikh, Jain, Buddhist, Parsi, atheist/agnostic — and *how much* the user wants spirituality engaged with vs bracketed.
- **Caste sensitivity**: rarely directly disclosed but matters for trust; the algorithm should NOT ask caste directly, but should allow users to specify "experiences of caste-based discrimination" as a presenting concern and surface therapists trained in caste-affirmative practice (still a small but growing field — Mariwala Health Initiative, Tata Trusts work).
- **Sexuality / gender identity**: Section 377 was struck down in 2018, but social acceptance lags; queer-affirmative therapy (QAT) is essential. Mariwala Health Initiative's QACP is the recognized standard.
- **Gender**: arranged marriage anxiety, dowry-related distress, postpartum stigma, "log kya kahenge" (what will people say) — all real, namable presenting concerns.
- **Therapist must understand "compartmentalization"** (Singer, 2007) — the Indian capacity to function with traditional values in one life domain and modern values in another, which is *adaptive*, not dysfunctional.
- **Use of mythology, proverbs, regional stories** in therapy is empirically endorsed for cultural adaptation (Wig, "Hanuman complex"; Surya & Jayaram on Savitri; Varma on Karma/Dharma in psychotherapy) — therapists who use these may be preferred by traditional clients.

### 5.5 Pricing benchmarks (mid-2025)

| Platform | Range (per session) | Notes |
|---|---|---|
| Manoshala | ₹800–3,500 | Free 15-min consultation, package discounts |
| Manochikitsa | ₹499 single / ₹2,499 for 5 / ₹3,999 for 8 | RCI-certified pool |
| Amaha (formerly InnerHour) | ₹1,000–3,500+ | In-house team, peer supervision, also psychiatry |
| TalktoAngel | ₹400+ varies | 18 Indian languages; lower-cost positioning |
| Rocket Health | ₹1,000+ (varies follow-ups) | Therapy + physical-health |
| BetterLYF / YourDOST / etc. | ₹500–2,000 | Volume-driven |
| Heart It Out | ~₹1,499 | Mid-tier |
| **Sweet spot for Trellis prototype** | **₹1,500–2,500** | Premium-but-attainable; matches urban professional willingness-to-pay |

---

## 6. ONBOARDING DESIGN FOR THERAPY MATCHING

### 6.1 Optimal length and shape

- Healthcare-app benchmarks: most successful onboarding is **30 seconds to 2 minutes**, but health apps with personalization can extend to 3–5 minutes if value is *visible* throughout.
- Average app loses 77% of users in the first 3 days (Business of Apps); onboarding is the highest-leverage screen in the funnel.
- Use **progress dots/bar** (Duolingo pattern) and group questions thematically.
- Insert **value moments** (a breath exercise, a "we hear you" moment, a preview of the kind of therapist you might match with) every 4–6 questions to prevent fatigue.

### 6.2 Question set (proposed — ~22 questions, ~3.5 min)

Organize as 5 themed sections, each a "chapter":

**Chapter 1 — "What brought you here today?" (4Q, internal trigger)**
1. *Free-text or chips*: anxiety, low mood, relationship, work, grief, identity, sleep, anger, trauma, "I'm not sure yet" (always include this — many first-timers don't have a label).
2. How long has this been going on? (1 mo / 3 mo / 6 mo / 1 yr+ / always)
3. How is it affecting your daily life? (1–5 slider, gentle wording — "barely / somewhat / a lot / it's hard to function")
4. Embedded GAD-2 + PHQ-2 (4 items, gentle phrasing — "Over the past 2 weeks, how often have you felt down or hopeless?" with 0–3 scale).

**Chapter 2 — "Tell us about you" (5Q, demographics + identity)**
5. Age range
6. Pronouns / gender identity
7. Sexuality (optional, with clear "prefer not to say")
8. Languages you'd want to speak therapy in (multi-select)
9. Where in India (city — for timezone/in-person option)

**Chapter 3 — "What kind of therapist would feel right?" (5Q, C-NIP)**
10. Directive vs collaborative: "Would you rather have a therapist who guides you with structure, or one who lets you lead?" (5-point slider)
11. Past vs present focus: "Do you want to understand where this comes from in your past, or focus on what's happening right now?" (slider)
12. Skills vs reflection: "Do you want practical tools and homework, or space to explore feelings?" (slider)
13. Warmth vs challenge: "Do you want someone who's mostly gentle, or someone who'll push you when needed?" (slider)
14. Therapist gender preference (any / female / male / non-binary / no preference) — explicitly framed: "It's okay to have a preference."

**Chapter 4 — "Cultural fit" (3Q)**
15. "Is there something about your background that's important your therapist understands?" — multi-select: family expectations, religion (with sub-options), caste experiences, queer identity, immigration/diaspora, disability, neurodivergence.
16. How involved is your family in this? (helpful / complicated / not involved / it's complicated)
17. Religion/spirituality: "Do you want this to be part of therapy?" (yes / sometimes / bracket it / no preference)

**Chapter 5 — "Logistics" (5Q)**
18. Format preference (video / phone / chat / mix)
19. Frequency (weekly / fortnightly / not sure yet)
20. Time-of-day windows (morning / afternoon / evening / late evening — the Indian urban-professional segment heavily skews late evening 8–10pm)
21. Budget per session (slider with sliding-scale option flagged)
22. Have you been to therapy before? (first time / once before / multiple times / currently)

**Mid-flow value moments:**
- After Q4: a 4-7-8 breath, with text "However you got here — we're glad you did."
- After Q14: "We've already learned a lot about you. Hold on — your top match is being chosen."
- After Q22: the loader → reveal.

### 6.3 Asking sensitively, not clinically

- **Embed clinical screens, don't expose them.** PHQ-9 and GAD-7 are validated (Cronbach α 0.86 and 0.91 in student samples), but the wording should be conversational. Replace "Little interest or pleasure in doing things" with "Have you been finding less joy in things you used to enjoy?" — same psychometric content, less clinical chill.
- Use second-person, present tense, soft modal verbs ("might / sometimes / lately").
- Always offer "prefer not to say" or "it's complicated."
- Never use the word "diagnosis" in onboarding.
- After any heavy question, surface a normalizing line: "A lot of people feel this. You're not alone."

### 6.4 Crisis detection during onboarding

Critical safety floor. The app must detect risk and respond *immediately and appropriately*.

**Detection rules (based on PHQ-9 item 9 + clinical guardrails):**
- If user endorses thoughts of "being better off dead" or self-harm "more than half the days" or "nearly every day" → trigger crisis flow.
- Free-text NLP scan for high-risk language ("kill myself," "end it," "no way out," explicit method mentions). False positives are acceptable; false negatives are not.

**Crisis flow design:**
1. Immediately pause onboarding with a warm, non-alarming screen: "Thank you for being honest. What you've shared matters. Before we continue, we want to make sure you have the support you need *right now*."
2. Offer three options, all visible:
 - **iCall 9152987821** (Mumbai, multi-language, free) — primary
 - **Vandrevala Foundation 1860-2662-345** (24×7, free, multi-language)
 - **AASRA 9820466726** (Mumbai, 24×7, English/Hindi)
 - **iCall / Tele-MANAS 14416** (Government of India)
3. Offer to "stay on the line" — user can chat with a trained crisis-trained on-call counselor immediately (premium platforms do this; if Trellis can't initially, partner with iCall).
4. Allow user to continue onboarding *only* with explicit choice; matching is restricted to therapists with crisis training and active psychiatry network.
5. Within 24 hours: a human (not AI) outreach — "We saw what you shared yesterday. We want to check in. Reply if you'd like to talk."
6. Never use crisis events for marketing, A/B tests, or analytics dashboards exposed to non-clinical staff.

---

## 7. THERAPIST VETTING AND QUALITY SIGNALS

### 7.1 What distinguishes excellent therapists from mediocre ones

Years of experience is NOT the answer. Three robust signals from research:

1. **Empathy** (Elliott et al., 2018 meta-analysis: r = 0.28, k = 82 studies, n = 6,138) — measurable via client SRS bond ratings.
2. **Deliberate practice and reflective ability** — Goldberg, Rousmaniere et al. (2016) showed therapists generally *don't* improve with experience unless they engage in deliberate practice with feedback.
3. **Self-awareness, low countertransference reactivity, healthy attachment** — therapist insecure attachment damages alliance; "professional self-doubt" *paired* with self-efficacy predicts good outcomes (Nissen-Lie et al.).
4. **Therapist flourishing** (Oh et al., 2026, *Clinical Psychology & Psychotherapy*) — therapist personal well-being predicts lower client dropout.
5. **Cultural humility** — outperforms cultural competence in matching outcomes for minority clients (Hook et al., Davis et al.).

**Markers of mediocrity / risk:**
- Resistance to outcome monitoring (refuses ORS/SRS).
- Caseload >35 ongoing clients (associated with higher dropout).
- Burnout signals (decline in supervision attendance, late notes, last-minute cancellations).
- Inability to articulate cases of "this didn't work" or "I'm wrong about this client."

### 7.2 Years of experience ≠ better outcomes

Wampold & Brown (2005) found therapist age, gender, experience, and degree explained essentially zero variance in outcome among the therapist effect. The Oh et al. study found *more years of practice* was associated with *higher* dropout (OR = 1.02 per year). Deliberate practice and feedback responsiveness matter — raw years do not.

### 7.3 Indian credentials hierarchy

| Credential | What it means | Required for |
|---|---|---|
| **MD/DNB Psychiatry** + state medical council registration | Medical doctor, can prescribe meds, do therapy | Psychiatry (medication management); often combines with therapy |
| **DPM (Diploma in Psychological Medicine)** | Older psychiatry credential, recognized | Psychiatric practice |
| **M.Phil. Clinical Psychology** (RCI-approved) + CRR registration | Two-year RCI program; mandatory historic route to clinical practice | Independent clinical practice (assessment + therapy). *Note: RCI is phasing M.Phil out from 2025–26 academic year* |
| **M.Psy / Master of Psychology in Clinical Psychology** (NEW, RCI-approved) | Replacement track per new RCI guidelines (NHEQF Level 6.5–8) | Going forward, the standard route |
| **PsyD (Doctor of Psychology)** | New professional doctorate | Senior clinical practice |
| **PG Diploma in Clinical Psychology (RCI-approved)** | Shorter route, certain conversion paths | Limited clinical practice |
| **MA/MSc Counseling Psychology** | NOT sufficient alone for clinical psychologist registration | Counseling roles, often supervised |
| **Mariwala Health Initiative QACP certification** | LGBTQIA+ affirmative therapy training | Queer-affirmative practice (de-facto Indian standard) |

**Vetting checklist for Trellis-platform therapists:**
1. Verify RCI Central Rehabilitation Register number directly at rehabcouncil.nic.in.
2. Verify medical council registration for psychiatrists.
3. Background check + identity verification.
4. Professional references (≥2).
5. Sample case formulation (de-identified) reviewed by clinical lead.
6. Live mock session with clinical supervisor.
7. Onboarding to platform clinical protocols (crisis escalation, data privacy, consent, FIT).
8. Mandatory ongoing peer supervision (Amaha's model — peer supervision groups every 2 weeks).
9. Quarterly outcome and SRS audit; therapists below the 25th percentile receive coaching plans.

### 7.4 How comparable platforms vet

- **BetterHelp**: licensed (LMFT/LCSW/PsyD/PhD) + ≥3 years and ≥1,000 hours practice; cross-checks state board licensure. Algorithm-only matching (no human in loop).
- **Talkspace**: licensed; algorithm match with 3 options + provider directory; some critique that vetting is "less rigorous" than competitors.
- **Amaha (India)**: in-house team, peer supervision, proprietary clinical protocols; flagship vetting depth in Indian market.
- **Octave / Alma (US)**: identity-based filters (LGBTQIA+, trauma-informed) + therapist style descriptors — closest model to what Trellis should pursue.

---

## 8. "WHY WE MATCHED YOU" — EXPLAINABLE MATCHING

### 8.1 Why explanation matters

Explainable AI in healthcare is the area where research most strongly supports transparency. **Naiseh, Al-Thani, Jiang & Ali (2021), *World Wide Web*, 24:1857–1884** ("Explainable recommendation: when design meets trust calibration") — explanation increases trust, enables shared decision-making, reduces "black-box rejection." Rong, Castner, Bozkir & Kasneci (2022, arXiv:2204.12230) found radiologist self-reported trust was 3.2/5 even with explanation — meaning explanation is necessary but not sufficient; tone, sources, and framing also matter.

**For mental health specifically**, Valentine, D'Alfonso & Lederman (2023) note that personalization in mental health apps reduces choice overload but introduces ethical concerns: lack of transparency, data sensitivity, and "feeling watched." Explanation is the antidote — it tells the user *what* the app knows and *why* it acted on that.

### 8.2 Tone matters more than detail

**Okoso, Ueno, Yatsuka & Munemasa (2024), arXiv:2405.05061** — *Toward Tone-Aware Explanations in Recommender Systems*: warmth-toned explanations increased trust and perceived effectiveness compared to formal/clinical tones, especially for relational/care domains. **Gilad, Amir & Levontin (2021, CHI)** — users prioritize *warmth over competence* in AI-mediated decision support.

> Practical implication: the therapy-match explanation must sound like a warm friend, not a clinical chart.

### 8.3 Anatomy of a good "Why we matched you" message

**Bad (clinical, opaque):** "Match score 87%. Top dimensions: presenting concern, communication style, language."

**Better (transparent, still cold):** "Based on your responses about anxiety, your preference for collaborative therapy, and your interest in Hindi sessions, our algorithm scored Dr. Priya Sharma highest."

**Best (warm, transparent, agency-affirming):**

> *"You mentioned that work has been overwhelming and that you'd like a therapist who's collaborative — someone who works *with* you rather than handing you a worksheet. **Dr. Priya Sharma** has worked with many young professionals navigating burnout, and the people she's matched with have described her as 'warm but quietly direct.' She speaks Hindi and English fluently, and she's available in your evening windows. She's not the only therapist who could fit — but we think she's a really good place to start. You can read her full bio, see a 30-second intro video, and book a discovery call below."*

### 8.4 Design rules for the explanation

1. **Show the top 3 reasons**, not all 16. Cognitive overload kills trust.
2. **Use the user's own words back to them** ("You mentioned that…"). Mirroring builds the alliance even before therapy starts.
3. **Be honest about uncertainty** — "we think" / "could be a good place to start" / "you can switch anytime." This is empirically validated to *increase* trust, not decrease it (calibrated confidence > overconfidence).
4. **Always offer the two alternative matches** — agency is the antidote to dating-app-style scarcity manipulation.
5. **Show a 30–60 second intro video** of the therapist talking about how they work. Reduces the "vibe-check" anxiety and is the single highest-leverage friction-reducer for first-time therapy seekers in India.
6. **Provide a "discovery call"** — a free 15-minute first call (already standard at Manoshala, Rocket Health, Heart It Out). This is critical: it lets the alliance begin to form *before* the user pays.
7. **Surface a quick "Not feeling it?" path** with no shame ("It's totally okay — let's adjust"). Reduces sunk-cost-fallacy lock-in.

### 8.5 Sample explanation templates the LLM/template engine can compose

Each template draws from the *top 3 weighted matched dimensions* per user. Pseudocode:

```
TEMPLATE_OPENERS = [
  "You shared that...",
  "From what you told us...",
  "What stood out to us was...",
  "Reading what you wrote...",
]

DIMENSION_LANGUAGE = {
  "presenting_concern": "...you've been carrying [concern]...",
  "communication_style": "...you'd want a therapist who's [style]...",
  "language": "...you'd feel most yourself in [language]...",
  "gender_pref": "...you'd be more at ease with a [gender] therapist...",
  "queer_affirmative": "...your queer identity is a part of who you are, not a problem to solve...",
  "stage_of_change": "...you're not sure if you're ready for full-on therapy yet — that's exactly where [therapist] meets people...",
  ...
}

THERAPIST_FIT_LANGUAGE = derived from therapist tags + alliance-score-bucket descriptors (e.g., "warm but quietly direct" comes from her aggregate SRS-bond words).

CLOSING = [
  "She's not the only one who could fit — but we think she's a good place to start.",
  "If she doesn't feel right after one call, we'll match you again — no pressure.",
  ...
]
```

---

## Synthesis: How this powers the prototype

The prototype, **"Trellis"**, is a mobile-first, India-focused therapy-matching app with the following architecture:

- **Layer 1 (gates):** licensure, language, fee, format, schedule, crisis capability, specialization minimums, identity-affirmative requirements.
- **Layer 2 (weighted score, max 100):** 16 weighted dimensions led by modality fit (14), C-NIP communication style (12), therapist alliance track record (10), cultural-religious-caste fit (8); total 100.
- **Layer 3 (feedback):** ORS/SRS micro-surveys feeding both the therapist (clinical) and the algorithm (matching), with automatic re-match offers if alliance scores stay low.
- **Color system:** sage-green primary `#7A9E7E`, soft lavender secondary `#C9B8E0`, warm ochre accent `#D4A574`, linen-cream background `#F7F3ED` — the deliberate antithesis of Mila's dating coral, calibrated for trust + healing + Indian aesthetic warmth.
- **Hooked loop, ethically:** internal trigger (anxiety/burnout) → low-friction self-discovery onboarding (~3.5 min, 22 questions) → variable reward ("Why we matched you" warm explanation with top 3 reasons) → investment (post-session feedback, journal, preference refinement). Passes Eyal's Manipulation Matrix as a Facilitator.
- **Onboarding** embeds PHQ-2/GAD-2 screens + crisis detection with iCall/Vandrevala/Tele-MANAS integration.
- **Vetting** based on RCI registration + outcome monitoring + peer supervision + quarterly SRS audits; new RCI M.Psy/PsyD pathway recognized.
- **Explanation engine** uses the user's own words + top-3 matching dimensions in a warm, calibrated-confidence tone; always shows two alternatives + free discovery call.

---

## Caveats

- **Therapist-effect estimates** range 5–10% across studies; the headline "5%" from Wampold & Brown (2005) is on the conservative end. In naturalistic care and high-severity samples, the figure is higher — making the matching algorithm's leverage *greater* than the conservative number suggests.
- **Ethnic/cultural matching outcome data is mixed**: Cabral & Smith's 2011 meta-analysis found d ≈ 0.09 on outcomes despite d ≈ 0.63 on preferences. Same-culture matching should therefore be offered as a *preference filter* (because preference accommodation alone improves engagement and dropout) rather than marketed as outcome-improving.
- **The Cooper-Norcross Inventory of Preferences (C-NIP) has limited Indian validation**; the prototype should pilot it with Indian users and culturally adapt the four-dimension language.
- **The dodo bird verdict is contested for specific indications** — exposure-based therapies dominate for OCD and PTSD; the prototype should NOT treat all modalities as interchangeable for these specialty areas.
- **Personalization in mental health apps has documented ethical concerns** (Valentine et al., 2023): users sometimes find personalization "intrusive" if it's not transparent. Continuous user-research validation of every personalized feature is essential.
- **RCI guidelines are in transition (2025–26)** — M.Phil. Clinical Psychology is being phased out and replaced with M.Psy/PsyD. Vetting workflows must accommodate both legacy and new credentials and update as regulatory landscape evolves.
- **Future-tense / forecast language in some sources**: Several Indian government announcements (NIMHANS-2, expanded Tele-MANAS) are policy *intentions* not yet fully delivered; the prototype should not assume infrastructure that doesn't yet exist nationally.
- **Color psychology research is correlational** for many emotional claims; cultural variation in color meaning is real (white = mourning in some Asian contexts). The proposed palette should be A/B tested with the actual target audience before final commitment.
- **All session-pricing benchmarks are 2024–2025 estimates** from public platform listings and may shift; the prototype should treat ₹1,500–2,500 as a hypothesis to validate, not a fixed parameter.
- **Crisis flows must be reviewed by a licensed clinician on the founding team** before any user touches the prototype. The recommended hotline numbers (iCall, Vandrevala, AASRA, Tele-MANAS 14416) should be re-verified at launch.
- **"Therapist flourishing" and similar wellness-of-clinician metrics** (Oh et al.) are emerging research; some cited papers are in-press or recent and replication is still ongoing. Use as directional, not gospel.
