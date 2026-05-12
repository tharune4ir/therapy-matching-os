# 🎥 Therapy Matching OS — Loom Script (Quick Version)
### Just read this while recording. Keep it natural.

---

### [OPEN THE APP]

"Hey, so this is Therapy Matching OS — a therapy matching engine I've been working on. The basic idea is: finding the right therapist is really hard, and most platforms just give you a directory sorted by location and price. That doesn't actually tell you if this person will understand you. So I built a matching engine that uses 58 clinical data points — personality, communication style, culture, the actual issue — to find the right fit."

---

### [CLICK "View the clinical research"]

"Quick thing before the product — every decision I made here is backed by real clinical research. This slide shows that the therapeutic alliance — basically the bond between you and your therapist — is the single biggest predictor of whether therapy works. Most platforms ignore this. I built the entire engine around it."

[SWIPE THROUGH THE SLIDES QUICKLY]

"Preference accommodation cuts dropout by half. Cultural context matters even more in India — caste, joint-family, religion. And after sessions, the system tracks whether things are actually working and can re-match you if they're not."

---

### [GO BACK, CLICK "Begin"]

"So this is the onboarding — 11 steps, takes about 3 minutes. Every question maps directly to a variable in the matching algorithm."

[HIT THE ⚡ DEMO BUTTON]

"I'm going to use the demo button here — it auto-fills with a test persona called Meera, she's a 28-year-old product manager in Bengaluru dealing with burnout."

[CLICK THROUGH QUICKLY — PAUSE ON STEP 5]

"This step right here is the most important one. The user picks their preferred communication style — gentle and listening, warm but willing to push, or direct and structured. Behind the scenes, this creates a 4-dimensional personality profile that the engine uses to find a therapist whose style *complements* theirs."

[CONTINUE CLICKING THROUGH]

"The rest is — session focus, gender preference, family and culture context, logistics like format and budget, prior therapy experience..."

[PAUSE ON STEP 11]

"And this is a clinical gate. If someone says 'I just want someone to listen,' they're NOT matched with a therapist — they're routed to a lower-intensity peer listening service instead. Pushing therapy on someone who isn't ready can actually do harm."

[CLICK "Find my match" → WATCH THE LOADING ANIMATION]

---

### [MATCHES PAGE LOADS]

"So here are the matches. The engine just ran this profile against 16 therapist profiles across 28 weighted dimensions."

"The important thing here — see this 'Why we matched you' text? That's not hardcoded. I built an explanation engine that looks at which dimensions contributed the most to this match and generates human-readable sentences from them. So it might say 'she specializes in burnout' or 'she speaks Tamil so you can switch languages mid-session.' Every match gets different text."

[SWITCH THE PERSONA DROPDOWN]

"Watch this — I can switch to a completely different persona, and the matches recalculate in real-time. Different person, different top match, different explanation."

---

### [CLICK "View Profile"]

"Full therapist profile — credentials, modalities, languages, an intro video placeholder, and the big 'Why we matched you' card. This is where the user goes 'oh, this person actually gets me.'"

[CLICK "Book free 15-min call" → BOOKING CONFIRMATION]

"Simple booking confirmation. In production this would send emails."

[CLICK "Continue to Your Journey"]

---

### [JOURNEY DASHBOARD]

"This is the home base. I built this to keep users engaged between sessions."

"Mood tracker up top — one tap. This green card prompts a pre-session check-in, that's the ORS — measures how you're doing in life. This ochre card is for after sessions — the SRS, measures whether the session actually helped."

"Down here — session prep journaling, a daily reflection prompt, and this bar chart showing wellbeing over time. The trend engine calculates whether things are getting better, worse, or holding steady."

---

### [CLICK "Check in now" → ORS PAGE]

"This is the ORS — 4 sliders: personal wellbeing, relationships, social, and overall. Total out of 40. Clinical cutoff is 25 — below that is flagged as significant."

[GO BACK]

---

### [NAVIGATE TO /feedback]

"After a session — the SRS. Relationship, goals, approach. Rated 1-5 stars each. If the total drops below 11 out of 15, that's a 'therapeutic rupture' — the system offers a re-match automatically."

---

### [NAVIGATE TO /reflections]

"Daily reflections — a new prompt every day. Not therapy, just a lightweight touchpoint. Like a daily vitamin for your mind. User reads it, maybe writes a sentence. That's it."

---

### [NAVIGATE TO /preferences]

"This is what I call the clinical mirror. It shows the user exactly what the system understood about them — their concerns, their C-NIP personality profile on these 4 spectrum bars, their preferences, their cultural context, and who they were matched with. Full transparency."

---

### [NAVIGATE TO /admin]

"And this is the developer sandbox. A 22-by-16 truth matrix — 22 research personas matched against all 16 therapists. Green is 90%+, 'FLTR' means filtered out by a hard gate like language or certification."

"The key thing this proves — no therapist is universally a 90% match. A great anxiety therapist might score 40% for a trauma survivor. That's not a bug, that validates the algorithm is actually specific."

---

### [WRAP UP]

"So that's Therapy Matching OS — 58 clinical data points, 28 weighted dimensions, 22 test personas, 16 therapist profiles, dynamic explanations, ORS/SRS feedback loops, crisis safety gates, and a daily engagement layer. All running client-side in the browser."

"Thanks for watching."

---

*Total recording time: ~5-7 minutes*
