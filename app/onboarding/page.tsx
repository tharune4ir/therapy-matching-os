"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, Zap, Leaf, X, FastForward } from "lucide-react";
import { useRouter } from "next/navigation";
import { OnboardingData } from "@/types";
import { UserProfile, ConcernTag } from "@/types/engine";
import { meeraPersona } from "@/data/demo";

function mapToEngineProfile(data: OnboardingData): UserProfile {
  const concernMap: Record<string, ConcernTag> = {
    "Workplace burnout": "5.3",
    "Relationship anxiety": "4.1",
    "Feeling down or depressed": "1.1",
    "Navigating a life transition": "5.5",
    "Just need someone to talk to": "5.5",
    "Thoughts of self-harm or suicide": "1.2"
  };
  
  const tags = data.concerns.map(c => concernMap[c]).filter(Boolean);
  
  let sev = 5;
  if (data.severity.includes("overwhelmed")) sev = 8;
  else if (data.severity.includes("affecting my daily life")) sev = 6;
  
  let budgetMax = 2500;
  if (data.budget.includes("Under")) budgetMax = 1500;
  else if (data.budget.includes("2,500+")) budgetMax = 4000;

  return {
    id: "live_user_1",
    name: "You",
    age: parseInt(data.age) || 25,
    gender: data.gender === "Woman" ? "F" : data.gender === "Man" ? "M" : "NB",
    pronouns: data.pronouns || "They/Them",
    sexuality: "straight",
    city: data.city || "Online",
    occupation: "Professional",
    industry: "Any",
    languages: data.languages.length > 0 ? data.languages : ["English"],
    primaryConcerns: tags.length > 0 ? tags : ["1.1"],
    secondaryConcerns: [],
    durationMonths: 6,
    severity: sev,
    familyStructure: "Unknown",
    familyDynamics: data.familyDynamics,
    religion: data.religion.includes("important") ? "Hindu" : "None",
    religiousSalience: data.religion.includes("important") ? 8 : 2,
    culturalSensitivities: [],
    attachmentStyle: "Secure",
    stageOfChange: "Preparation", // Feature 7 placeholder
    cnip: {
      directiveness: data.therapistStyle.includes("Direct") ? 8 : -5,
      warmth: data.therapistStyle.includes("challenge") ? 2 : -8,
      emotionalIntensity: 0,
      pastOrientation: data.therapistFocus.includes("past") ? 8 : -5
    },
    therapistGenderPref: data.genderPreference === "Woman" ? "F" : data.genderPreference === "Man" ? "M" : (data.genderPreference.includes("Queer") ? "NB" : "Either"),
    priorTherapy: data.priorTherapy.includes("First time") ? "First-timer" : "Experienced",
    budgetMin: 500,
    budgetMax: budgetMax,
    formatPref: data.format.includes("Video") ? ["Video"] : data.format.includes("Phone") ? ["Phone"] : ["In-person"],
    timePref: ["Flexible"],
    dropoutTriggers: [],
    stayTriggers: []
  };
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    concerns: [],
    duration: "",
    severity: "",
    age: "",
    gender: "",
    pronouns: "",
    languages: [],
    city: "",
    therapistStyle: "",
    therapistFocus: "",
    genderPreference: "",
    familyDynamics: "",
    religion: "",
    format: "",
    budget: "",
    priorTherapy: "",
    readiness: "",
  });

  const [loaderMessage, setLoaderMessage] = useState('Reading your story...');

  React.useEffect(() => {
    if (formData.concerns.includes("Thoughts of self-harm or suicide")) {
      router.push('/support');
    }
  }, [formData.concerns, router]);

  React.useEffect(() => {
    if (currentStep === 13) {
      // FEATURE 8: Route Pre-contemplators to Therapy Matching OS Listens
      if (formData.readiness === "I'm just looking for someone to listen right now.") {
        const timer = setTimeout(() => {
          router.push('/listens');
        }, 2000);
        return () => clearTimeout(timer);
      }

      const profile = mapToEngineProfile(formData);
      sessionStorage.setItem('activeProfile', JSON.stringify(profile));
      sessionStorage.setItem('onboardingComplete', 'true');

      const timer1 = setTimeout(() => {
        setLoaderMessage('Finding therapists who fit your style...');
      }, 1500);

      const timer2 = setTimeout(() => {
        router.push('/matches');
      }, 3500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [currentStep, formData, router]);

  const totalStepsForProgress = 11;

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/");
    }
  };

  const handleDemoAutofill = () => {
    setFormData(meeraPersona);
  };

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 1:
        return formData.concerns.length > 0;
      case 2:
        return formData.duration !== "" && formData.severity !== "";
      case 3:
        return formData.age !== "" && formData.gender !== "" && formData.pronouns !== "";
      case 4:
        return formData.languages.length > 0 && formData.city !== "";
      case 5:
        return formData.therapistStyle !== "";
      case 6:
        return formData.therapistFocus !== "";
      case 7:
        return formData.genderPreference !== "";
      case 8:
        return formData.familyDynamics !== "" && formData.religion !== "";
      case 9:
        return formData.format !== "" && formData.budget !== "";
      case 10:
        return formData.priorTherapy !== "";
      case 11:
        return formData.readiness !== "";
      case 12:
        return true;
      default:
        return true;
    }
  }, [currentStep, formData]);

  const toggleSelection = (field: keyof OnboardingData, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[field] as string[];
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter((v) => v !== value) };
      } else {
        return { ...prev, [field]: [...currentValues, value] };
      }
    });
  };

  const setSingleValue = (field: keyof OnboardingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col h-full bg-therapy-bg relative">
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-therapy-surface">
        <div
          className="h-full bg-therapy-primary transition-all duration-500 ease-in-out"
          style={{ width: `${Math.min((currentStep / totalStepsForProgress) * 100, 100)}%` }}
        />
      </div>

      {/* Header */}
      {currentStep !== 13 && (
        <header className="px-6 py-4">
          <div className="flex items-center justify-between mb-8">
            {/* Back Button */}
            <button 
              onClick={handleBack} 
              className="text-therapy-text-muted p-2 -ml-2 hover:text-therapy-text transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Utility & Escape Buttons */}
            <div className="flex items-center gap-2">
              {/* Hydrate Data */}
              <button 
                onClick={handleDemoAutofill} 
                className="bg-therapy-primary-deep text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm hover:scale-105 active:scale-95 transition-all"
              >
                <Zap size={14} fill="currentColor" /> Demo
              </button>

              {/* Skip directly to Match */}
              <button 
                onClick={() => router.push('/match')} 
                className="bg-therapy-surface text-therapy-text px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm hover:scale-105 active:scale-95 transition-all"
              >
                <FastForward size={14} fill="currentColor" /> Skip
              </button>

              {/* Exit Onboarding */}
              <button 
                onClick={() => router.push('/')} 
                className="text-therapy-text-muted p-1.5 ml-1 hover:text-therapy-text transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-grow px-6 py-8 overflow-y-auto">
        <div key={currentStep} className="animate-breathe flex flex-col h-full">
          {/* Chapter 1 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl text-therapy-text leading-tight">
                  What brought you here today?
                </h2>
                <p className="text-therapy-text-muted mt-3">
                  Select all that apply. It&apos;s okay if you&apos;re not entirely sure.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "Workplace burnout",
                  "Relationship anxiety",
                  "Feeling down or depressed",
                  "Navigating a life transition",
                  "Just need someone to talk to",
                  "Thoughts of self-harm or suicide",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleSelection("concerns", option)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                      formData.concerns.includes(option)
                        ? "border-therapy-crisis bg-therapy-crisis/5 shadow-sm"
                        : "border-transparent bg-therapy-surface"
                    }`}
                  >
                    <span className={`font-medium ${option === "Thoughts of self-harm or suicide" ? "text-therapy-crisis" : ""}`}>{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-serif text-2xl text-therapy-text">
                  How long have you been feeling this way?
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {["A few weeks", "A few months", "About 6 months", "A year or more"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSingleValue("duration", option)}
                      className={`text-center p-4 rounded-2xl border transition-all duration-300 text-sm ${
                        formData.duration === option
                          ? "border-therapy-primary bg-therapy-primary/10"
                          : "border-transparent bg-therapy-surface"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              {formData.duration && (
                <div className="animate-breathe space-y-4">
                  <h2 className="font-serif text-2xl text-therapy-text">
                    How much is this affecting your day-to-day?
                  </h2>
                  <div className="space-y-3">
                    {[
                      "I can manage, but it's hard",
                      "It's affecting my daily life — a lot",
                      "I feel overwhelmed and stuck",
                    ].map((option) => (
                      <button
                        key={option}
                        onClick={() => setSingleValue("severity", option)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                          formData.severity === option
                            ? "border-therapy-primary bg-therapy-primary/10"
                            : "border-transparent bg-therapy-surface"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chapter 2 */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <h2 className="font-serif text-3xl text-therapy-text leading-tight">
                Tell us a bit about you.
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-therapy-text-muted ml-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setSingleValue("age", e.target.value)}
                    placeholder="e.g. 25"
                    className="w-full bg-therapy-surface rounded-xl p-4 focus:ring-2 focus:ring-therapy-primary/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-therapy-text-muted ml-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setSingleValue("gender", e.target.value)}
                    className="w-full bg-therapy-surface rounded-xl p-4 focus:ring-2 focus:ring-therapy-primary/20 outline-none transition-all appearance-none"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Woman">Woman</option>
                    <option value="Man">Man</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-therapy-text-muted ml-1">Pronouns</label>
                  <input
                    type="text"
                    value={formData.pronouns}
                    onChange={(e) => setSingleValue("pronouns", e.target.value)}
                    placeholder="e.g. She/her"
                    className="w-full bg-therapy-surface rounded-xl p-4 focus:ring-2 focus:ring-therapy-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-therapy-text leading-tight">
                  Where are you based, and what languages do you prefer?
                </h2>
                <p className="text-therapy-text-muted mt-3">
                  Therapy hits different in your mother tongue.
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-therapy-text-muted ml-1">Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {["English", "Hindi", "Tamil", "Kannada", "Malayalam", "Telugu", "Marathi"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => toggleSelection("languages", lang)}
                        className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                          formData.languages.includes(lang)
                            ? "border-therapy-primary bg-therapy-primary/10 text-therapy-primary"
                            : "border-therapy-text/10 bg-therapy-surface text-therapy-text"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-therapy-text-muted ml-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setSingleValue("city", e.target.value)}
                    placeholder="e.g. Bengaluru"
                    className="w-full bg-therapy-surface rounded-xl p-4 focus:ring-2 focus:ring-therapy-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Chapter 3 */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl text-therapy-text leading-tight">
                  How would you like your therapist to communicate?
                </h2>
                <p className="text-therapy-text-muted mt-3">
                  There is no wrong answer. It&apos;s about what feels safe to you.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "Gentle, warm, and mostly listening",
                  "Mostly warm, but willing to challenge me",
                  "Direct, structured, and action-oriented",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSingleValue("therapistStyle", option)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                      formData.therapistStyle === option
                        ? "border-therapy-primary bg-therapy-primary/10"
                        : "border-transparent bg-therapy-surface"
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl text-therapy-text leading-tight">
                  What should the sessions focus on?
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  "Exploring my past and childhood",
                  "Fixing present-day problems",
                  "A mix of coping skills and deep reflection",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSingleValue("therapistFocus", option)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                      formData.therapistFocus === option
                        ? "border-therapy-primary bg-therapy-primary/10"
                        : "border-transparent bg-therapy-surface"
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl text-therapy-text leading-tight">
                  Does the therapist&apos;s gender matter to you?
                </h2>
              </div>
              <div className="space-y-3">
                {["Woman", "Man", "Queer / Non-binary", "No preference"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSingleValue("genderPreference", option)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                      formData.genderPreference === option
                        ? "border-therapy-primary bg-therapy-primary/10"
                        : "border-transparent bg-therapy-surface"
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chapter 4 */}
          {currentStep === 8 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl text-therapy-text leading-tight">
                  Culture shapes how we heal.
                </h2>
                <p className="text-therapy-text-muted">
                  How would you describe your relationship with your family?
                </p>
                <div className="space-y-3">
                  {["Very close", "Helpful but complicated", "Distant or estranged"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSingleValue("familyDynamics", option)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                        formData.familyDynamics === option
                          ? "border-therapy-primary bg-therapy-primary/10"
                          : "border-transparent bg-therapy-surface"
                      }`}
                    >
                      <span className="font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
              {formData.familyDynamics && (
                <div className="animate-breathe space-y-4">
                  <h2 className="font-serif text-2xl text-therapy-text">
                    How should religion/spirituality be handled in therapy?
                  </h2>
                  <div className="space-y-3">
                    {[
                      "It's important to my worldview",
                      "Leave it outside the room (Bracket it)",
                      "I'm not religious",
                    ].map((option) => (
                      <button
                        key={option}
                        onClick={() => setSingleValue("religion", option)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                          formData.religion === option
                            ? "border-therapy-primary bg-therapy-primary/10"
                            : "border-transparent bg-therapy-surface"
                        }`}
                      >
                        <span className="font-medium">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chapter 5 */}
          {currentStep === 9 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl text-therapy-text leading-tight">
                  Let&apos;s talk logistics.
                </h2>
                <p className="text-therapy-text-muted">
                  Finding a sustainable routine is key.
                </p>
                <p className="font-medium text-therapy-text">Preferred format?</p>
                <div className="grid grid-cols-3 gap-2">
                  {["Video calls", "Phone calls", "In-person"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSingleValue("format", option)}
                      className={`p-3 rounded-2xl border text-sm transition-all duration-300 ${
                        formData.format === option
                          ? "border-therapy-primary bg-therapy-primary/10"
                          : "border-transparent bg-therapy-surface"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              {formData.format && (
                <div className="animate-breathe space-y-4">
                  <p className="font-medium text-therapy-text">What is your budget per session?</p>
                  <div className="space-y-3">
                    {["Under ₹1,500", "₹1,500 - ₹2,500", "₹2,500+"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setSingleValue("budget", option)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                          formData.budget === option
                            ? "border-therapy-primary bg-therapy-primary/10"
                            : "border-transparent bg-therapy-surface"
                        }`}
                      >
                        <span className="font-medium">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 10 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl text-therapy-text leading-tight">
                  Have you been to therapy before?
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  "First time",
                  "Yes, and it was helpful",
                  "Yes, but it wasn't a great fit",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSingleValue("priorTherapy", option)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                      formData.priorTherapy === option
                        ? "border-therapy-primary bg-therapy-primary/10"
                        : "border-transparent bg-therapy-surface"
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FEATURE 7: Therapy Readiness Assessment */}
          {currentStep === 11 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl text-therapy-text leading-tight">
                  How ready do you feel to dive into therapy right now?
                </h2>
                <p className="text-therapy-text-muted mt-3">
                  Therapy takes work. It's okay if you just need space to vent first.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "I'm just looking for someone to listen right now.",
                  "I know I need to change, I just need help doing it.",
                  "I'm already taking steps, I want guidance to keep going.",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSingleValue("readiness", option)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                      formData.readiness === option
                        ? "border-therapy-primary bg-therapy-primary/10"
                        : "border-transparent bg-therapy-surface"
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 12 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl text-therapy-text leading-tight">
                  Here is what we learned about you.
                </h2>
                <p className="text-therapy-text-muted mt-3">
                  Before we find your match, let&apos;s make sure we got this right.
                </p>
              </div>

              <div className="bg-therapy-surface rounded-2xl p-6 space-y-6 shadow-sm border border-therapy-text/5">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-therapy-text-muted">What you&apos;re carrying</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.concerns.map((concern) => (
                      <span key={concern} className="bg-therapy-bg text-therapy-text-muted px-3 py-1 rounded-full text-sm border border-therapy-text/5">
                        {concern}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-therapy-text-muted">Your ideal therapist</p>
                  <p className="text-therapy-text leading-relaxed">
                    A <span className="font-semibold">{formData.genderPreference}</span> therapist who is <span className="font-semibold">{formData.therapistStyle.toLowerCase()}</span>.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-therapy-text-muted">Logistics</p>
                  <div className="flex items-center gap-4 text-therapy-text text-sm">
                    <span className="flex items-center gap-1.5 bg-therapy-bg/50 px-3 py-1.5 rounded-lg">
                      {formData.format}
                    </span>
                    <span className="flex items-center gap-1.5 bg-therapy-bg/50 px-3 py-1.5 rounded-lg">
                      {formData.budget}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 13 && (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
              <div className="w-24 h-24 rounded-full bg-therapy-primary/20 animate-pulse flex items-center justify-center">
                <Leaf className="text-therapy-primary" size={40} fill="currentColor" />
              </div>
              <h2 className="font-serif text-2xl text-therapy-text mt-8 animate-breathe leading-relaxed">
                {loaderMessage}
              </h2>
            </div>
          )}
        </div>
      </main>

      {/* Footer Action Bar */}
      {currentStep !== 13 && (
        <footer className="p-6 bg-therapy-bg/90 backdrop-blur-md border-t border-therapy-text/5">
          <button
            disabled={!isStepValid || currentStep > 12}
            onClick={() => setCurrentStep(currentStep + 1)}
            className={`w-full py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
              isStepValid && currentStep <= 12
                ? "bg-therapy-primary-deep text-white shadow-lg active:scale-[0.98]"
                : "bg-therapy-surface text-therapy-text-muted cursor-not-allowed"
            }`}
          >
            {currentStep === 12 ? "Find my match" : "Continue"}
          </button>
        </footer>
      )}
    </div>
  );
}
