import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import SciTaleBird from './SciTaleBird';

export default function WelcomeScreen({ onEnter }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 px-5 py-8 flex items-center justify-center">
      <div aria-hidden="true" className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-sky-300/40 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-28 -right-16 h-96 w-96 rounded-full bg-purple-300/40 blur-3xl" />

      <section className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-2xl backdrop-blur-xl md:p-10">
        <div className="welcome-logo mx-auto mb-8 flex w-fit items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 text-white shadow-lg">
            <Sparkles className="h-7 w-7" />
          </div>
          <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-5xl">
            SciTale
          </span>
        </div>

        <div className="grid items-center gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <div className="welcome-copy text-center md:text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-800">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Stories, science, and surprises!
            </div>
            <h1 className="mb-3 text-3xl font-black leading-tight text-slate-900 md:text-5xl">
              Big discoveries start with <span className="text-indigo-600">“What if?”</span>
            </h1>
            <p className="mx-auto mb-6 max-w-xl text-sm font-semibold leading-relaxed text-slate-600 md:mx-0 md:text-base">
              Explore science and maths through stories, playful activities, and curious questions.
            </p>
            <button
              type="button"
              onClick={onEnter}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-7 py-4 text-base font-black text-white shadow-lg transition hover:scale-105 hover:from-sky-600 hover:to-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
            >
              Let’s Explore!
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex min-h-56 items-center justify-center md:min-h-72">
            <div className="welcome-greeting absolute top-2 z-10 rounded-2xl rounded-bl-sm border-2 border-sky-200 bg-white px-4 py-2 text-sm font-black text-indigo-800 shadow-lg md:top-4">
              Hi, explorer! Ready to fly?
            </div>
            <div className="welcome-flight">
              <SciTaleBird className="welcome-bird w-52 h-52 md:w-64 md:h-64 drop-shadow-xl" showMessages={false} />
            </div>
            <Sparkles aria-hidden="true" className="welcome-sparkle absolute right-8 top-16 h-7 w-7 text-amber-400" />
            <Sparkles aria-hidden="true" className="welcome-sparkle-delayed absolute bottom-8 left-8 h-5 w-5 text-sky-500" />
          </div>
        </div>
      </section>
    </main>
  );
}
