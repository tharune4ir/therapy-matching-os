# 🌿 Therapy Matching OS

> **"The therapeutic alliance is the single strongest predictor of clinical success."**  
> Therapy Matching OS is an AI-native concept prototype that shifts the search for mental health professionals from simple keyword filtering to research-backed, multi-layer alliance matching.

---

## 💡 The Problem: Why Directories Fail
Most therapy directories function like e-commerce catalogs: they sort by price, availability, or arbitrary listings. This ignores the clinical reality of the **Therapeutic Alliance** (which accounts for approximately 8% of therapy outcome variance). 

When matching Indian professionals navigating complex systemic pressures—such as startup burnout, joint-family dynamics, caste reckonings, or reverse culture shock—generic directories fail to align personality compatibility, language nuances, or safe identities.

---

## ✨ Key Features

*   **🔍 Three-Layer Match Engine**: Uses a combination of rigid binary gates (safety, language, queer affirmation), relaxable filters (budget, formats, schedule), and a multi-dimensional weighted scoring system.
*   **🧠 Complementary Personality Matching (C-NIP)**: Matches clients with therapists using the *Complementary-Negative Interpersonal Pattern* scale. It aligns user preferences for directiveness, emotional warmth, intensity, and past/present orientations.
*   **📊 Wellbeing Pulse (ORS Tracking)**: Includes a pre-session Outcome Rating Scale (ORS) slider survey that tracks personal, interpersonal, and social well-being over time.
*   **💖 Alliance Rupture Protection (SRS Loop)**: Clinicians receive real-time alerts and suggest repair scripts on their dashboard if post-session Session Rating Scale (SRS) feedback indicates a drop in the therapeutic relationship.
*   **📝 Daily Journal Reflections**: A client journaling workspace that cycles through 30 introspective prompts based on the day of the year, storing reflections privately on the device.
*   **🧪 Developer Sandbox & MECE Personas**: Integrates a dropdown containing 22 detailed test personas to immediately evaluate and stress-test the matching algorithm across clinical constraints.

---

## 🔗 Technical Resources & Documentation

*   **Deep System Blueprint**: For the complete institutional-grade documentation covering the mathematical equations, data schemas, 62-point clinical taxonomy, and feedback loop code mappings, see the [Source of Truth Blueprint](file:///c:/000_workspace_22626/1_Product Lab Portfolio/7_therapy-matching-os/therapy-matching-os/Therapy_Matching_OS_SOURCE_OF_TRUTH_2026-06-20.md).

---

## 🛠️ Technical Deployment & Development Runbook

### Tech Stack
*   **Framework**: Next.js 16.2.4 (React 19)
*   **Styling**: Tailwind CSS v4
*   **Icons**: Lucide React
*   **State Management**: React Context, session-hydrated storage.

### Local Installation & Setup

1.  **Clone & Navigate**:
    Ensure Node.js v18+ is installed on your local machine. Open a terminal inside the project directory.

2.  **Install Dependencies**:
    ```bash
    npm install
    # On Windows PowerShell environments with restricted execution policies:
    npm.cmd install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    # Or explicitly on Windows:
    npm.cmd run dev
    ```

4.  **Access the Application**:
    Open [http://localhost:3000](http://localhost:3000) in your web browser.

5.  **Build Production Package**:
    ```bash
    npm run build
    # Or explicitly:
    npm.cmd run build
    ```

---
*Created as a Product Lab Portfolio Asset by Tharun Gajula — Zero-to-One AI Product Manager.*
