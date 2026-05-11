# Trellis | High-Fidelity Therapy Matching Prototype

**Trellis** is a research-backed, mobile-first therapy matching platform designed to solve the "first-session mismatch" problem. It utilizes a multi-layered compatibility engine to pair users with therapists based on the **therapeutic alliance** — the single strongest predictor of clinical success.

---

## 🌿 Core Features

- **12-Step Guided Onboarding**: A conversational, clinical-grade intake flow that captures demographics, cultural nuances, and communication preferences.
- **Alliance-First Matching Engine**: A weighted algorithm that optimizes for the "bond, tasks, and goals" (Bordin, 1979) between client and therapist.
- **Journey Dashboard**: A personal hub for tracking sessions and visualizing progress via the **Wellbeing Pulse** (ORS/SRS integration).
- **Crisis Intervention Flow**: An intelligent safety monitor that redirects high-risk users to immediate localized support (iCall, Tele-MANAS).
- **Clinical Presentation Deck**: An interactive, state-driven slide deck (/compare) that explains the science behind the algorithm to stakeholders.
- **Support Hub & FAQ**: A dedicated center for user assistance and algorithmic transparency.

---

## 🎨 Design Philosophy

Trellis utilizes a custom design system centered on **Linen Cream** (#F7F3ED) and **Sage Green** (#7A9E7E). 

- **Typography**: `Fraunces` (Serif) for emotional resonance and `Inter` (Sans) for clarity.
- **Aesthetic**: Minimalist, warm, and clinical-grade.
- **Animations**: Subtle breathing effects (`animate-breathe`) to reduce user anxiety during high-friction moments.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the prototype.

---

## 📊 Technical Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide-React
- **Deployment**: Optimized for Vercel

---

## 📖 Research & Documentation
The prototype is grounded in the following research frameworks:
- **C-NIP (Cooper-Norcross Inventory of Preferences)**: For matching communication styles.
- **FIT (Feedback-Informed Treatment)**: For real-time fit adjustment using ORS/SRS scales.
- **Alliance Science**: Drawing from meta-analyses by Flückiger et al. (2018).

---

**Built by [Tharun Gajula](https://github.com/tharun-gajula)**  
