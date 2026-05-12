import { Leaf, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col px-6 pt-8 pb-12">
      {/* Header */}
      <header className="flex items-center gap-2 mb-12">
        <Leaf className="text-therapy-primary fill-therapy-primary/20" size={28} />
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-therapy-text">
          Therapy Matching OS
        </h1>
      </header>

      {/* Hero Section */}
      <section className="animate-breathe">
        <h2 className="font-serif text-4xl font-medium leading-[1.1] text-therapy-text tracking-tight">
          Finding the right therapist is hard. We make it simple.
        </h2>
        <p className="font-sans text-lg text-therapy-text-muted mt-6 leading-relaxed">
          Therapy Matching OS matches you with a therapist who actually gets you — not a random name from a directory.
        </p>

        <div className="mt-10">
          <Link href="/onboarding" className="w-full bg-therapy-primary-deep hover:bg-therapy-primary-deep/90 text-white rounded-2xl min-h-[56px] text-lg font-medium shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 group">
            Begin
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="mt-16 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-therapy-surface flex items-center justify-center shrink-0">
            <span className="text-therapy-primary font-serif font-bold">1</span>
          </div>
          <p className="text-therapy-text font-medium">Tell us about you (~3 min)</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-therapy-surface flex items-center justify-center shrink-0">
            <span className="text-therapy-primary font-serif font-bold">2</span>
          </div>
          <p className="text-therapy-text font-medium">We find your match</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-therapy-surface flex items-center justify-center shrink-0">
            <span className="text-therapy-primary font-serif font-bold">3</span>
          </div>
          <p className="text-therapy-text font-medium">Your first session is free</p>
        </div>
      </section>

      {/* Footer */}
      <div className="text-xs text-therapy-text-muted mt-12 pb-24 text-center">

        <p className="mt-1">By Tharun Gajula</p>
        <Link href="/compare" className="block text-therapy-primary-deep font-bold text-sm mt-8 hover:underline transition-all">
          View the clinical research →
        </Link>
      </div>

    </div>
  );
}
