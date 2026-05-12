# 🎬 Therapy Matching OS — Complete Demo Walkthrough
### Teleprompter for demoing Therapy Matching OS end-to-end.

> **How to use this document:** Read each section out loud while navigating to the corresponding page. The "SAY" blocks are your talking points. The "DO" blocks tell you what to click. The "BEHIND THE SCENES" blocks explain what the code is doing — use these for technical audiences or skip them for non-technical ones.

---

## 🏠 STOP 1: The Landing Page (`/`)
**URL:** `localhost:3000`

### DO:
- Open the app. You should see the Therapy Matching OS leaf logo, the headline, and the 3-step "How it works" flow.

### SAY:
> "So this is **Therapy Matching OS** — I built this as a clinical matching engine. The problem I'm solving here is straightforward: finding the right therapist is really hard. Most platforms just give you a filtered directory — sort by location, price, availability. But none of that actually tells you whether this therapist will *understand* you."
>
> "What I did differently is — I'm using **58 clinical data points** to match you with a therapist based on your personality, your communication style, your cultural background, and the specific issue you're dealing with. The goal isn't to find *a* therapist — it's to find *your* therapist."
>
> "The flow is simple: Tell us about yourself (takes about 3 minutes), the algorithm runs, and you get your match."

### BEHIND THE SCENES:
- Built with **Next.js 16** (App Router), runs entirely client-side — no database, no backend.
- All state is managed through a custom **React Context** (`TherapyContext`) and persisted in `sessionStorage`.
- Design system: **Sage Green (#7A9E7E)** for growth, **Linen Cream (#F7F3ED)** for warmth, **Warm Ochre (#D4A574)** for accents.

### DO:
- Point out the **"View the clinical research →"** link at the bottom. Click it.

---

## 📊 STOP 2: The Clinical Research Page (`/compare`)
**URL:** `localhost:3000/compare`

### DO:
- You'll see a full-screen slide deck with big stat numbers. Swipe through all 4 slides.

### SAY:
> "Before I even show you the product, I want to show you the *research* I built this on. Every design decision here is backed by actual peer-reviewed clinical literature."

**Slide 1 — The Alliance (~8%)**
> "So this stat says roughly 8% of therapy outcome variance comes from the therapeutic alliance — the bond between you and your therapist. That's actually more than the specific technique being used. Most platforms completely ignore this. I put it at the center of the matching logic."

**Slide 2 — Preference Accommodation (1:2 reduction)**
> "When client preferences are honored — things like 'I want a female therapist' or 'I want someone who listens' — dropout rates drop by half. I map these preferences using something called the **C-NIP framework**, which measures 4 personality axes."

**Slide 3 — Cultural Context (d ≈ 0.63)**
> "In the Indian context, culture isn't a nice-to-have. It's foundational. Caste sensitivity, joint-family dynamics, religion in therapy — I built these as first-class variables in the engine, not afterthoughts."

**Slide 4 — Feedback-Informed Treatment (25th percentile)**
> "After sessions, I use the **ORS** and **SRS** — clinical tools for measuring 'how am I doing in life' and 'was this session good.' If scores drop below the 25th percentile, the system flags it and offers a re-match. So the algorithm actually *learns* over time."

### DO:
- Click "Finish" to go back to the landing page. Then click **"Begin"** to start onboarding.

---

## 📝 STOP 3: The Onboarding Flow (`/onboarding`)
**URL:** `localhost:3000/onboarding`

### SAY:
> "This is the heart of the whole thing. The onboarding is an 11-step clinical assessment that I designed to feel like a friendly conversation. Every question maps directly to a variable in the matching engine. Let me walk through it."

### DO:
- **Option A (Fast Demo):** Click the **⚡ Demo** button in the top-right corner. This auto-fills the form with a pre-built persona called "Meera" — a 28-year-old Bengaluru product manager dealing with burnout and imposter syndrome.
- **Option B (Full Demo):** Walk through each step manually.

---

### Step 1: "What brought you here today?"

### SAY:
> "The user selects their concerns. Notice that 'Thoughts of self-harm or suicide' is in **red** — that's a safety trigger."

### BEHIND THE SCENES:
- If the user selects the self-harm option, they are **immediately redirected** to `/support` — a crisis page with real Indian helpline numbers (iCall, Tele-MANAS, Vandrevala Foundation). The matching flow is completely bypassed. Safety is non-negotiable.
- Each concern maps to a code in the clinical taxonomy I built: "Workplace burnout" = `5.3`, "Relationship anxiety" = `4.1`, etc. There are **52 sub-factors** across 12 clinical domains.

---

### Step 2: Duration & Severity

### SAY:
> "How long have they felt this way, and how bad is it? This maps to two engine variables: `durationMonths` and `severity` (1-10). Higher severity activates stricter filters — like, severity 8+ requires the matched therapist to have RCI registration or a psychiatry license."

---

### Step 3: Demographics (Age, Gender, Pronouns)

### SAY:
> "Basic identity. This feeds into the matching engine's gender-preference logic and also helps flag certain identity-specific needs."

---

### Step 4: Languages & City

### SAY:
> "This is a *hard filter* in the engine — meaning if there's zero language overlap between the user and a therapist, that therapist is eliminated entirely. No score, no match, gone. Language is non-negotiable for therapeutic work."
>
> "I support English, Hindi, Tamil, Kannada, Malayalam, Telugu, and Marathi. The tagline here — 'Therapy hits different in your mother tongue' — that's not just marketing. It's clinically validated."

---

### Step 5: Communication Style (The C-NIP Question)

### SAY:
> "This is the **most important question** in the entire onboarding. The user is choosing their preferred therapist communication style."
>
> "Option 1: 'Gentle, warm, and mostly listening' — maps to low directiveness, high warmth."
> "Option 2: 'Mostly warm, but willing to challenge me' — moderate on both."
> "Option 3: 'Direct, structured, and action-oriented' — high directiveness."
>
> "Behind the scenes, this creates a **4-dimensional personality profile** called the C-NIP. The engine then looks for therapists whose natural style *complements* this preference."

### BEHIND THE SCENES:
- The C-NIP profile has 4 axes, each scored from -15 to +15:
  - **Directiveness**: Collaborative ← → Directive
  - **Emotional Intensity**: Reserved ← → Emotionally open
  - **Past Orientation**: Focus on present ← → Explore the past
  - **Warmth/Challenge**: Gentle support ← → Direct challenge
- These 4 scores account for **23% of the total match weight** — the largest single block.

---

### Step 6: Session Focus

### SAY:
> "Past, present, or both? This maps to the `pastOrientation` axis and also influences which therapy modalities get prioritized — psychodynamic for past-explorers, CBT for present-fixers."

---

### Step 7: Therapist Gender Preference

### SAY:
> "Straightforward but important. If they pick 'Queer / Non-binary,' the engine activates a **hard filter** requiring QACP certification. No QACP cert = therapist is eliminated."

---

### Step 8: Culture (Family & Religion)

### SAY:
> "This is where Therapy Matching OS is completely different from Western tools. I ask about family dynamics — close, complicated, or distant — and how religion should be handled in therapy. In the Indian context, a therapist who doesn't understand joint-family enmeshment or caste dynamics will lose the client's trust immediately."

---

### Step 9: Logistics (Format & Budget)

### SAY:
> "Practical stuff: video, phone, or in-person? Budget per session? Format is a hard filter — if a therapist only does video and you want in-person, they're out. Budget is a soft constraint."

---

### Step 10: Prior Therapy Experience

### SAY:
> "'First time' vs. 'Experienced' changes how I weight modality complexity. First-timers get matched with gentler approaches like Person-Centred therapy. Experienced clients can handle Schema Therapy, IFS, or EMDR."

---

### Step 11: Readiness Assessment

### SAY:
> "This is a clinical gate I built. If the user picks 'I'm just looking for someone to listen right now,' they are **not matched with a therapist.** Instead, they're routed to **Therapy Matching OS Listens** — a lower-intensity peer listening service. Pushing therapy on someone who isn't ready actually increases harm."

### BEHIND THE SCENES:
- This implements the **Transtheoretical Model (Prochaska & DiClemente)** — Pre-contemplation users need support, not treatment.
- The routing logic: `if readiness === "just listening" → redirect to /listens`

---

### Step 12: Summary & Confirmation

### SAY:
> "Before I run the algorithm, I show the user a summary: 'Here's what I learned about you.' This builds trust and lets them correct anything."

### DO:
- Click **"Find my match"**

---

### Step 13: The Loading State

### SAY:
> "Watch the animation. The leaf pulses. The text changes from 'Reading your story...' to 'Finding therapists who fit your style...' Takes about 3.5 seconds — just enough to feel like the algorithm is doing real work, which it is."

### BEHIND THE SCENES:
- At this moment, the code converts all the onboarding answers into a `UserProfile` object with all 30 variables, saves it to `sessionStorage`, and redirects to `/matches`.
- The matching engine runs **client-side** — no API call, no server. It's instant.

---

## 🏆 STOP 4: Your Matches (`/matches`)
**URL:** `localhost:3000/matches`

### SAY:
> "So here are the matches. The engine just ran this user's profile against **16 research-validated therapist profiles** across **28 weighted dimensions** — that's a 352-cell matrix computed in milliseconds."
>
> "Top match is shown with a large card and a percentage score. Below are alternative matches."
>
> "The most important thing on this page is the **'Why we matched you'** text. This is NOT a generic blurb. I built an explanation engine that dynamically generates this from the actual algorithm output."

### BEHIND THE SCENES:
- The **Dynamic Explanation Engine** (`lib/engine/explainMatch.ts`) takes the top 3 contributing dimensions for each match and converts them into warm, human-centric sentences using a template system.
- Example: If W1 (Specialization) was the top contributor, the engine says: *"Dr. Aanya specializes in working with people navigating workplace burnout, which is exactly what you told us you are dealing with right now."*
- If W9 (Language Match) was a top contributor: *"She speaks English and Tamil, so you can express yourself in whichever language feels right in the moment."*

### DO:
- Point out the **Developer: Switch Persona** dropdown at the top.

### SAY:
> "This is a developer tool I built. I can switch between any of the 22 research personas — FAANG engineers, queer NRI returnees, postpartum mothers, men resistant to therapy — and the algorithm recalculates everything in real-time. Watch."

### DO:
- Switch to a different persona. Watch the match results change.
- Click **"View Profile"** on the top match.

---

## 👤 STOP 5: Match Profile (`/match`)
**URL:** `localhost:3000/match`

### SAY:
> "This is the full therapist profile. Name, credentials, tags, languages, intro video placeholder."
>
> "The centerpiece is the **'Why we matched you'** section — that warm, ochre-tinted card. Every sentence in there was algorithmically generated. The user reads this and thinks 'Oh, this person *gets me*.'"
>
> "Below that: fee, availability, and the CTA: **Book a free 15-minute discovery call.**"

### DO:
- Click **"Book free 15-min call"** → Takes you to `/booked`.

---

## ✅ STOP 6: Booking Confirmation (`/booked`)

### SAY:
> "Simple confirmation page. Reference number, CTA to continue to the Journey dashboard. In production, this would trigger an email to both the user and the therapist."

### DO:
- Click **"Continue to Your Journey"**.

---

## 📈 STOP 7: The Journey Dashboard (`/journey`)
**URL:** `localhost:3000/journey`

### SAY:
> "This is the user's home base after matching. I designed it to keep them engaged *between* sessions."

### SAY (point to each section):

**Mood Check-in:**
> "One-tap mood tracker: Good, Okay, or Tough. No friction."

**ORS Check-in Card (green):**
> "This proactive card says: 'Take 60 seconds to check in with yourself before your session.' Triggers the ORS — Outcome Rating Scale."

**SRS Feedback Card (ochre):**
> "After a session, this prompts the user to rate how it went. This is the SRS — Session Rating Scale."

**Next Session:**
> "Upcoming session details."

**Session Prep:**
> "Journaling prompt: 'What feels most alive this week?' Research shows prepping 24 hours before a session accelerates progress by up to 50%."

**Daily Reflection Card:**
> "Link to the daily reflection practice."

**Wellbeing Pulse (bar chart):**
> "This chart shows the last 5 ORS scores over time. The trend engine I built calculates: 'Trending upward,' 'Trending downward,' or 'Holding steady.' This is basically the clinician's early warning system."

### BEHIND THE SCENES:
- ORS + SRS = **PCOMS** (Partners for Change Outcome Management System) — the gold standard in feedback-informed treatment.
- ORS = "How am I doing in life?" (taken BEFORE session)
- SRS = "Was this session helpful?" (taken AFTER session)

---

## 📊 STOP 8: Pre-Session Check-in / ORS (`/checkin`)
**URL:** `localhost:3000/checkin`

### DO:
- Navigate here from the Journey page's green "Check in now" button.

### SAY:
> "This is the ORS. The user rates 4 areas on a 0-10 slider: Personal, Relationships, Social, and Overall."
>
> "Total is out of 40. The clinical cutoff is **25** — scores below that are flagged as clinically significant. This gets sent to the therapist before the session."

### DO:
- Move the sliders around. Click "Submit Check-in."

---

## ⭐ STOP 9: Post-Session Feedback / SRS (`/feedback`)
**URL:** `localhost:3000/feedback`

### SAY:
> "After a session, the user rates 3 things: Relationship (did I feel heard?), Goals (did we focus on what matters?), Approach (did the method work for me?)."
>
> "Each is rated 1-5 stars. A total below **11 out of 15** flags a 'Therapeutic Rupture.' The system then proactively offers a **re-match** — there's a gentle page I built that says 'Let's find a better fit. You don't need to explain yourself.'"

### BEHIND THE SCENES:
- Most clients who are unhappy just ghost. The SRS catches them before they disappear.

---

## 🌿 STOP 10: Daily Reflections (`/reflections`)
**URL:** `localhost:3000/reflections`

### SAY:
> "This is a daily micro-reflection practice I built. It's not therapy — it's a lightweight daily touchpoint. Think of it like a daily vitamin for your mind."
>
> "Each day shows one prompt. The user reads it, sits with it, and can optionally write a short response. Saved locally."

### BEHIND THE SCENES:
- 30 research-backed prompts on Courage, Honesty, Stillness, and Resilience.
- Cycles based on `dayOfYear % 30`.

---

## ⚙️ STOP 11: Therapy Preferences (`/preferences`)
**URL:** `localhost:3000/preferences`

### DO:
- Navigate via Profile → Preferences, or from the BottomNav Menu.

### SAY:
> "I call this the 'Clinical Mirror.' It shows the user exactly what the system understood from their onboarding and how it was used to find their match. Full transparency."

### SAY (point to each section):

**"What you are working on":**
> "Their concerns shown as pill tags."

**"Communication Style" (C-NIP Bars):**
> "This is the visual highlight. Four horizontal spectrum bars showing where the user sits on each personality axis. The dot position reflects their actual score."

**"Therapist Preferences":**
> "Gender preference, languages, format, budget."

**"Cultural Context":**
> "Family dynamics, faith in therapy, sensitivities."

**"Matched Therapist":**
> "Shows the current top match with a link back to the profile."

---

## 👤 STOP 12: Profile & Settings (`/profile`)
**URL:** `localhost:3000/profile`

### SAY:
> "User profile page. Avatar, active C-NIP profile, clinical insights, and links to Preferences, Privacy, and Notifications."

---

## 🔧 STOP 13: The Admin Sandbox (`/admin`)
**URL:** `localhost:3000/admin`

### SAY:
> "This is the developer sandbox I built. It's a **22×16 truth matrix** — every one of the 22 research personas matched against every one of the 16 therapist profiles."
>
> "Green cells are 90%+ matches. 'FLTR' means the therapist was eliminated by a hard filter — language mismatch, no QACP certification, whatever."
>
> "The key thing this matrix proves: **No therapist is universally a 90%+ match.** A great burnout therapist might score 40% for a trauma survivor. That's not a bug — it validates that the algorithm is actually specific."

### BEHIND THE SCENES:
- All 352 calculations (22 × 16) run in real-time using `useMemo`.
- Search by persona name, filter to 80%+ matches only.

---

## 🚨 STOP 14: Safety Pages

### The Crisis Page (`/support`)
### SAY:
> "If a user selects 'Thoughts of self-harm or suicide' during onboarding, they are *immediately* redirected here. No matching, no scores, no delay. Just real crisis resources: iCall, Tele-MANAS, Vandrevala Foundation."

### Therapy Matching OS Listens (`/listens`)
### SAY:
> "For users who said 'I just want someone to listen' — they're not ready for clinical therapy. This page offers a free 30-minute peer listening session. No pressure, no diagnosis."

---

## 🗺️ NAVIGATION OVERVIEW

### Bottom Navigation Bar
| Tab | Page | Purpose |
|---|---|---|
| Matches | `/matches` | View all algorithm-generated matches |
| Journey | `/journey` | Home dashboard with ORS/SRS and session prep |
| Feedback | `/feedback` | Post-session SRS feedback |
| Menu ☰ | Drawer | Access to Profile, Check-in, Reflections, Preferences, Admin |

### Menu Drawer Items
- Your Profile → `/profile`
- Help & Support → `/help`
- Pre-session Check-in → `/checkin`
- Daily Reflections → `/reflections`
- Therapy Preferences → `/preferences`
- Algorithm Sandbox → `/admin`

---

## 🏗️ TECHNICAL ARCHITECTURE (For Technical Audiences)

### SAY:
> "Under the hood:"
> - **Framework:** Next.js 16 (App Router, Turbopack)
> - **State:** React Context + sessionStorage (no database in this prototype)
> - **Engine:** Pure TypeScript matching engine with 28 weighted dimensions
> - **Data:** 22 user personas × 16 therapist profiles × 52-factor clinical taxonomy
> - **Safety:** Hard-coded crisis detours (self-harm → helpline, pre-contemplation → Therapy Matching OS Listens)
> - **Feedback Loop:** ORS (pre-session) + SRS (post-session) = PCOMS implementation
> - **Explanation Engine:** Template-based NLG that converts raw scores into human-readable justifications

---

## 💡 KEY DEMO TIPS

1. **Always use the ⚡ Demo button** during onboarding for speed.
2. **Switch personas** on `/matches` to prove the algorithm is real — different people get genuinely different matches.
3. **The "Why we matched you" text** is the single most impressive feature. Point it out twice.
4. **Show the crisis detour** if the audience cares about safety/ethics.
5. **End on the Admin Matrix** — it's the "wow" moment for technical audiences.

---

*Built by Tharun Gajula.*
