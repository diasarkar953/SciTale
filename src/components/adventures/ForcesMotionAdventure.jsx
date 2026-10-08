import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Square,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Award,
  Compass,
  RotateCcw,
  Zap,
  Play,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { sound } from '../../audio/soundEffects';
import { narrator } from '../../speech/speechNarrator';
import { getStoryLessons } from '../../data/storyLessons';
import AdventureScene from './AdventureScene';
import TeachItBack from '../TeachItBack';
import { beakyComment, beakyQuizReaction, friendlyQuizHint } from '../../beakyCompanion';

export default function ForcesMotionAdventure({ onBack, ageGroupId }) {
  const [part, setPart] = useState(1); // 1: Forces & Friction, 2: Potential vs Kinetic, 3: Coaster Lab, 4: Quiz
  const [isNarrating, setIsNarrating] = useState(false);

  // Visible story panels are also passed to the existing Read to Me control.
  const story = getStoryLessons('forces_motion', ageGroupId);
  const lessonTextPart1 = story[0];
  const lessonTextPart2 = story[1];

  // Part 3: Interactive Coaster Lab state
  const [hillHeight, setHillHeight] = useState('high'); // 'low' | 'high'
  const [trackFriction, setTrackFriction] = useState('low'); // 'low' | 'high'
  const [isLaunching, setIsLaunching] = useState(false);
  const [labResult, setLabResult] = useState(null);
  const [launchId, setLaunchId] = useState(0);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizMisses, setQuizMisses] = useState([]);
  const [quizErrors, setQuizErrors] = useState({});
  const [quizDone, setQuizDone] = useState(false);

  // Audited Quiz Questions: 100% taught in the visible text!
  const quizQuestions = [
    {
      q: 'In physical science, what is a "force"?',
      options: [
        'A magical superpower',
        'A push or a pull that can change an object\'s motion',
        'Only electricity',
        'The sound of a loud engine'
      ],
      correct: 1,
      why: 'Spot on! A force is a push or a pull that can make objects move, stop, speed up, or change direction!'
    },
    {
      q: 'What kind of energy is stored in a rollercoaster car perched at the very top of a steep hill before it drops?',
      options: [
        'Potential Energy (Stored Energy)',
        'Kinetic Energy (Motion Energy)',
        'Nuclear Energy',
        'Solar Energy'
      ],
      correct: 0,
      why: 'Correct! Potential energy is stored energy waiting to be released as the cart drops!'
    },
    {
      q: 'Which rubbing force occurs when two touching surfaces slide against each other, slowing down moving objects?',
      options: [
        'Magnetism',
        'Gravity',
        'Friction',
        'Evaporation'
      ],
      correct: 2,
      why: 'Awesome! Friction is the resistance force between touching surfaces that slows moving objects down!'
    }
  ];

  const handleNarrate = (textArray) => {
    if (isNarrating) {
      narrator.stop();
      setIsNarrating(false);
    } else {
      sound.playPop();
      const combined = textArray.join(' ');
      narrator.speak(combined, () => setIsNarrating(false));
      setIsNarrating(true);
    }
  };

  const handleLaunchCoaster = () => {
    sound.playWhoosh();
    setIsLaunching(true);
    setLabResult(null);
    setLaunchId((id) => id + 1);

    setTimeout(() => {
      setIsLaunching(false);
      // Success requires high hill and low friction to complete loop!
      if (hillHeight === 'high' && trackFriction === 'low') {
        sound.playDing();
        setLabResult({ success: true, text: "Loop cleared! The tall hill gave Beaky’s cart more stored energy, which changed into motion energy as it raced downhill. Smooth steel kept friction low." });
        beakyComment('Loop cleared! You balanced the hill’s stored energy with a smooth, low-friction track.');
      } else if (hillHeight === 'low') {
        sound.playBoop();
        setLabResult({ success: false, text: "Beaky rolled toward the loop, but the short hill gave the cart too little stored energy to reach the top." });
        beakyComment('Beaky needs a bigger starting hill. A higher position stores more energy for the ride.');
      } else {
        sound.playBoop();
        setLabResult({ success: false, text: "The rough track rubbed against the wheels. Friction changed some motion energy into heat, so Beaky’s cart slowed before the loop." });
        beakyComment('The rough track created more friction. Try the smooth track so less motion energy is lost as heat.');
      }
    }, 1200);
  };

  const hillPath = hillHeight === 'high'
    ? 'M 78 285 C 150 285 160 110 255 110 C 340 110 350 275 430 275'
    : 'M 78 285 C 150 285 160 205 255 205 C 340 205 350 275 430 275';
  const fullRidePath = `${hillPath} C 470 275 485 255 500 250 C 500 165 610 165 610 250 C 610 335 500 335 500 250 C 640 250 675 270 830 270`;
  const ridePath = hillHeight === 'high' && trackFriction === 'low'
    ? fullRidePath
    : `${hillPath} C 455 275 470 265 485 258`;

  const handleSelectQuiz = (idx) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    const isCorrect = idx === quizQuestions[quizIdx].correct;
    beakyQuizReaction(isCorrect, 'forces and motion', friendlyQuizHint(quizQuestions[quizIdx].why, quizQuestions[quizIdx].q));
    if (isCorrect) {
      sound.playDing();
      setQuizScore((s) => s + 1);
    } else {
      sound.playBoop();
      setQuizMisses((items) => items.includes(quizQuestions[quizIdx].why) ? items : [...items, quizQuestions[quizIdx].why]);
      setQuizErrors((items) => ({ ...items, [quizIdx]: (items[quizIdx] || 0) + 1 }));
    }
  };

  const handleRetryQuiz = () => { setSelectedAns(null); sound.playPop(); };

  const handleNextQuiz = () => {
    sound.playPop();
    if (quizIdx + 1 < quizQuestions.length) {
      setQuizIdx(quizIdx + 1);
      setSelectedAns(null);
    } else {
      setQuizDone(true);
      sound.playFanfare();
      confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
    }
  };

  return (
    <div key={part} className="flex flex-col gap-6 max-w-5xl mx-auto w-full animate-fade-in">
      
      {/* Top Banner Navigation */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border-2 border-amber-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              narrator.stop();
              onBack();
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Library</span>
          </button>
          <span className="text-xs font-bold text-slate-500">
            Forces, Energy & Motion → Rollercoaster Physics
          </span>
        </div>

        {/* Part Tabs */}
        <div className="flex items-center gap-1.5">
          {['1. Forces & Friction', '2. Potential & Kinetic', '3. Coaster Lab', '4. Quiz & Badge'].map((title, i) => (
            <button
              key={i}
              onClick={() => {
                narrator.stop();
                setIsNarrating(false);
                sound.playPop();
                setPart(i + 1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                part === i + 1
                  ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-amber-100 shadow-xl flex flex-col gap-6">
        
        {/* PART 1: Forces, Gravity & Friction */}
        {part === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Part 1 of 3: Physics Basics
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  Forces, Gravity, and Friction Explained
                </h2>
              </div>

              <button
                onClick={() => handleNarrate(lessonTextPart1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs md:text-sm text-white shadow-md transition cursor-pointer ${
                  isNarrating ? 'bg-rose-500 animate-pulse' : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                {isNarrating ? <Square className="w-4 h-4 fill-white" /> : <Volume2 className="w-4 h-4" />}
                <span>{isNarrating ? 'Stop Narration' : '🔊 Read to Me!'}</span>
              </button>
            </div>

            <AdventureScene items={['🛝', '⚽', '⬇️', '💨']} className="from-amber-50 via-orange-50 to-sky-50 border-amber-100" />

            {/* Complete Visible Lesson Paragraphs */}
            <div className="space-y-3">
              {lessonTextPart1.map((p, idx) => (
                <div key={idx} className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-2xl text-xs md:text-sm text-amber-950 font-semibold leading-relaxed">
                  {p}
                </div>
              ))}
            </div>

            {/* Visual Flashcards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-orange-50 border-2 border-orange-200 p-4 rounded-2xl">
                <span className="text-3xl mb-1 block">🚪 ⚽</span>
                <h3 className="text-sm font-black text-orange-950">1. A Force</h3>
                <p className="text-xs text-orange-900 font-semibold mt-1">A push or a pull that changes how an object moves.</p>
              </div>

              <div className="bg-sky-50 border-2 border-sky-200 p-4 rounded-2xl">
                <span className="text-3xl mb-1 block">🌍 ⬇️</span>
                <h3 className="text-sm font-black text-sky-950">2. Gravity</h3>
                <p className="text-xs text-sky-900 font-semibold mt-1">The downward pulling force toward Earth's center.</p>
              </div>

              <div className="bg-rose-50 border-2 border-rose-200 p-4 rounded-2xl">
                <span className="text-3xl mb-1 block">⛸️ 🛞</span>
                <h3 className="text-sm font-black text-rose-950">3. Friction</h3>
                <p className="text-xs text-rose-900 font-semibold mt-1">The rubbing resistance that slows sliding objects down.</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  sound.playPop();
                  setPart(2);
                }}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Part 2: Potential vs. Kinetic Energy!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 2: Potential Energy vs. Kinetic Energy */}
        {part === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Part 2 of 3: Energy Transformations
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  Potential Energy vs. Kinetic Energy
                </h2>
              </div>

              <button
                onClick={() => handleNarrate(lessonTextPart2)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs md:text-sm text-white shadow-md transition cursor-pointer ${
                  isNarrating ? 'bg-rose-500 animate-pulse' : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                {isNarrating ? <Square className="w-4 h-4 fill-white" /> : <Volume2 className="w-4 h-4" />}
                <span>{isNarrating ? 'Stop Narration' : '🔊 Read to Me!'}</span>
              </button>
            </div>

            {/* Complete Visible Lesson Paragraphs */}
            <div className="space-y-3">
              {lessonTextPart2.map((p, idx) => (
                <div key={idx} className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-2xl text-xs md:text-sm text-amber-950 font-semibold leading-relaxed">
                  {p}
                </div>
              ))}
            </div>

            {/* Side by side comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 p-5 rounded-3xl">
                <span className="text-4xl">🏔️ 🔋</span>
                <h3 className="text-base font-black text-amber-950 mt-2">Potential Energy (Stored)</h3>
                <p className="text-xs text-amber-900 font-semibold mt-1">
                  Energy stored due to position. Higher hill = larger stored potential energy!
                </p>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-300 p-5 rounded-3xl">
                <span className="text-4xl">🎢 ⚡</span>
                <h3 className="text-base font-black text-rose-950 mt-2">Kinetic Energy (Motion)</h3>
                <p className="text-xs text-rose-900 font-semibold mt-1">
                  Energy of speed and motion! As gravity pulls the coaster downward, potential energy becomes kinetic energy!
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setPart(1)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  setPart(3);
                }}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Part 3: Rollercoaster Physics Lab!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 3: Rollercoaster Physics Interactive Lab */}
        {part === 3 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Part 3 of 3: Coaster Challenge
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  Can Beaky Clear the Loop?
                </h2>
                <p className="text-xs text-slate-500 font-bold mt-0.5">
                  Tune the hill and track, then send Beaky on a speedy test ride!
                </p>
              </div>
            </div>

            {/* Animated coaster challenge */}
            <div className="relative w-full overflow-hidden rounded-3xl border-4 border-amber-200 bg-sky-200 shadow-inner">
              <svg viewBox="0 0 900 360" role="img" aria-label="Beaky's rollercoaster track with a hill and loop" className="block h-64 w-full sm:h-80">
                <defs>
                  <linearGradient id="coasterSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="100%" stopColor="#fef3c7" />
                  </linearGradient>
                  <linearGradient id="coasterRail" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <rect width="900" height="360" fill="url(#coasterSky)" />
                <circle cx="785" cy="62" r="35" fill="#fde047" />
                <path d="M40 90c8-24 42-28 55-8 18-7 34 5 32 21H45c-10 0-13-7-5-13Zm640-22c8-19 34-21 45-5 14-5 26 4 25 17h-64c-8 0-11-7-6-12Z" fill="#fff" opacity=".9" />
                <path d={hillHeight === 'high' ? 'M0 310c95 0 104-205 250-205 98 0 103 205 210 205v50H0Z' : 'M0 310c100 0 116-105 250-105 100 0 110 105 210 105v50H0Z'} fill="#86efac" />
                <path d="M0 312h900v48H0z" fill="#4ade80" />
                <path d={fullRidePath} fill="none" stroke="#713f12" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
                <path d={fullRidePath} fill="none" stroke={trackFriction === 'high' ? '#fb923c' : 'url(#coasterRail)'} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                <path d={fullRidePath} fill="none" stroke="#fff7ed" strokeWidth="3" strokeDasharray={trackFriction === 'high' ? '5 12' : '2 18'} strokeLinecap="round" opacity=".9" />
                <text x="52" y="267" fontSize="18" fontWeight="900" fill="#7c2d12">START</text>
                <text x="737" y="245" fontSize="18" fontWeight="900" fill="#166534">FINISH!</text>
                <text x="512" y="123" fontSize="22">⭐</text>
                <text x="592" y="128" fontSize="22">⭐</text>
                <text x="830" y="92" fontSize="21">✨</text>
                {isLaunching || labResult ? (
                  <g key={launchId}>
                    <animateMotion dur="1.2s" fill="freeze" path={ridePath} />
                    <g transform="translate(-25 -42)">
                      <text x="7" y="0" fontSize="30">🐦</text>
                      <rect x="0" y="2" width="50" height="25" rx="9" fill="#f97316" stroke="#9a3412" strokeWidth="3" />
                      <rect x="7" y="6" width="36" height="8" rx="4" fill="#fde68a" />
                      <circle cx="12" cy="30" r="6" fill="#334155" />
                      <circle cx="39" cy="30" r="6" fill="#334155" />
                      {isLaunching && <text x="-9" y="16" fontSize="20">💨</text>}
                    </g>
                  </g>
                ) : (
                  <g transform="translate(78 285)">
                    <g transform="translate(-25 -42)">
                      <text x="7" y="0" fontSize="30">🐦</text>
                      <rect x="0" y="2" width="50" height="25" rx="9" fill="#f97316" stroke="#9a3412" strokeWidth="3" />
                      <rect x="7" y="6" width="36" height="8" rx="4" fill="#fde68a" />
                      <circle cx="12" cy="30" r="6" fill="#334155" />
                      <circle cx="39" cy="30" r="6" fill="#334155" />
                    </g>
                  </g>
                )}
              </svg>

              <div className="absolute left-3 top-3 w-44 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-md backdrop-blur-sm">
                <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-700">
                  <span>Stored energy</span>
                  <span>{hillHeight === 'high' ? 'High' : 'Low'}</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div className={`h-full rounded-full transition-all duration-700 ${hillHeight === 'high' ? 'w-full bg-gradient-to-r from-amber-400 to-rose-500' : 'w-1/3 bg-amber-400'}`} />
                </div>
              </div>
              <div className="absolute right-3 top-3 rounded-full border border-white/80 bg-white/90 px-3 py-2 text-[10px] font-black text-slate-800 shadow-md">
                {trackFriction === 'low' ? '✨ Smooth track' : '🪵 Rough track'}
              </div>

              {labResult && (
                <div role="status" aria-live="polite" className={`absolute bottom-3 left-3 right-3 rounded-2xl p-3 text-center text-xs font-black shadow-lg sm:bottom-4 sm:left-1/2 sm:right-auto sm:w-[min(90%,34rem)] sm:-translate-x-1/2 ${labResult.success ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                  {labResult.text}
                </div>
              )}
            </div>

            {/* Variable Controllers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-2xl flex flex-col justify-between">
                <span className="text-xs font-black text-slate-800 mb-2">1. Starting Hill Height (Potential Energy):</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { sound.playPop(); setHillHeight('low'); setLabResult(null); }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${hillHeight === 'low' ? 'bg-amber-600 text-white shadow' : 'bg-white border text-slate-700'}`}
                  >
                    Short Hill (Low)
                  </button>
                  <button
                    onClick={() => { sound.playPop(); setHillHeight('high'); setLabResult(null); }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${hillHeight === 'high' ? 'bg-amber-600 text-white shadow' : 'bg-white border text-slate-700'}`}
                  >
                    Tall Hill (High) ⚡
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-2xl flex flex-col justify-between">
                <span className="text-xs font-black text-slate-800 mb-2">2. Track Material (Friction Resistance):</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { sound.playPop(); setTrackFriction('low'); setLabResult(null); }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${trackFriction === 'low' ? 'bg-amber-600 text-white shadow' : 'bg-white border text-slate-700'}`}
                  >
                    Smooth Steel (Low Friction) ✨
                  </button>
                  <button
                    onClick={() => { sound.playPop(); setTrackFriction('high'); setLabResult(null); }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${trackFriction === 'high' ? 'bg-amber-600 text-white shadow' : 'bg-white border text-slate-700'}`}
                  >
                    Rough Wood (High Friction)
                  </button>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <button
              onClick={handleLaunchCoaster}
              disabled={isLaunching}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-base rounded-2xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{isLaunching ? 'Beaky’s cart is racing...' : 'Send Beaky for a Test Ride!'}</span>
            </button>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setPart(2)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={() => {
                  sound.playFanfare();
                  setPart(4);
                }}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-sm rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Take the Physics Engineer Quiz!</span>
                <Award className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 4: Quiz & Badge */}
        {part === 4 && (
          <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
            {quizDone ? (
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-3xl p-8 text-center flex flex-col items-center shadow-xl border-4 border-amber-300">
                <span className="text-6xl mb-3">🎢 🏅</span>
                <span className="text-xs font-black uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full text-white mb-2">
                  Official SciTale Honor
                </span>
                <h3 className="text-3xl font-black mb-1">Physics Coaster Engineer Badge</h3>
                <p className="text-sm text-amber-100 max-w-md font-semibold mb-6">
                  You scored {quizScore} out of {quizQuestions.length}! You understand forces, gravity, friction, and energy transformations like a true physicist!
                </p>

                <div className="flex gap-3 w-full max-w-sm">
                  <button
                    onClick={() => {
                      sound.playSplash();
                      setQuizIdx(0);
                      setSelectedAns(null);
                      setQuizScore(0);
                      setQuizMisses([]);
                      setQuizErrors({});
                      setQuizDone(false);
                    }}
                    className="flex-1 py-3 px-4 bg-white/20 hover:bg-white/30 text-white font-black text-xs rounded-xl transition cursor-pointer"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={onBack}
                    className="flex-1 py-3 px-4 bg-white text-amber-950 font-black text-xs rounded-xl shadow transition cursor-pointer hover:scale-105"
                  >
                    Back to Library
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-xs font-black uppercase text-amber-700">
                    Question {quizIdx + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Score: {quizScore}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {quizQuestions[quizIdx].q}
                </h3>

                <div className="flex flex-col gap-2.5">
                  {quizQuestions[quizIdx].options.map((opt, i) => {
                    let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50';
                    if (selectedAns !== null) {
                      if (selectedAns === quizQuestions[quizIdx].correct && i === quizQuestions[quizIdx].correct) {
                        style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-300';
                      } else if (i === selectedAns) {
                        style = 'bg-rose-100 border-rose-400 text-rose-900 line-through';
                      } else if (selectedAns === quizQuestions[quizIdx].correct) {
                        style = 'bg-slate-50 border-slate-200 opacity-50';
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectQuiz(i)}
                        disabled={selectedAns !== null}
                        className={`p-4 rounded-2xl border-2 text-left text-xs md:text-sm font-bold transition cursor-pointer ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {selectedAns !== null && (
                  <div className={`p-3.5 rounded-2xl border text-xs font-semibold animate-fade-in ${selectedAns === quizQuestions[quizIdx].correct ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-100 border-amber-300 text-amber-950'}`}>
                    {selectedAns === quizQuestions[quizIdx].correct ? quizQuestions[quizIdx].why : <>🐦 Beaky’s hint: {friendlyQuizHint(quizQuestions[quizIdx].why, quizQuestions[quizIdx].q)}</>}
                  </div>
                )}

                {selectedAns === quizQuestions[quizIdx].correct && (
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
                  >
                    <span>{quizIdx + 1 === quizQuestions.length ? 'Claim My Badge!' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {selectedAns !== null && selectedAns !== quizQuestions[quizIdx].correct && <button onClick={handleRetryQuiz} className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-2xl shadow-md transition cursor-pointer">Try Again with Beaky’s Hint</button>}
              </div>
            )}
          </div>
        )}
      </div>
      {part === 4 && quizDone && <TeachItBack adventureId="forces_motion" ageGroupId={ageGroupId} quizScore={quizScore} quizTotal={quizQuestions.length} quizMisses={quizMisses} quizErrors={quizErrors} quizItems={quizQuestions} />}
    </div>
  );
}
