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
  CheckCircle2,
  Utensils,
  Lightbulb
} from 'lucide-react';
import { sound } from '../../audio/soundEffects';
import { narrator } from '../../speech/speechNarrator';
import { getStoryLessons } from '../../data/storyLessons';
import AdventureScene from './AdventureScene';
import TeachItBack from '../TeachItBack';
import { beakyComment, beakyQuizReaction, friendlyQuizHint } from '../../beakyCompanion';

export default function FractionsAdventure({ onBack, ageGroupId }) {
  const [part, setPart] = useState(1); // 1: Concepts, 2: Real World, 3: Pizza Chef Lab, 4: Quiz
  const [isNarrating, setIsNarrating] = useState(false);

  // Visible story panels are also passed to the existing Read to Me control.
  const story = getStoryLessons('fractions', ageGroupId);
  const lessonTextPart1 = story[0];
  const lessonTextPart2 = story[1];

  // Part 3: Interactive Pizza Chef Lab state
  const [totalSlices, setTotalSlices] = useState(4); // 2, 4, or 8
  const [selectedSlices, setSelectedSlices] = useState([0, 1]); // default 2/4 = 1/2
  const [targetFraction, setTargetFraction] = useState({ num: 3, den: 4, label: "3/4" });
  const [orderServed, setOrderServed] = useState(false);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizMisses, setQuizMisses] = useState([]);
  const [quizErrors, setQuizErrors] = useState({});
  const [quizDone, setQuizDone] = useState(false);

  // Audited Quiz Questions: 100% taught in the visible text above!
  const quizQuestions = [
    {
      q: 'In the fraction 3/4, what does the top number (the Numerator) tell us?',
      options: [
        'The total number of slices in the whole pizza',
        'How many slices we have, took, or selected',
        'How hot the oven is in degrees',
        'The price of the pizza in dollars'
      ],
      correct: 1,
      why: 'Spot on! The Numerator tells us how many equal parts we are counting, while the Denominator shows the total equal parts!'
    },
    {
      q: 'If you cut one whole pizza into 2 equal slices, and another pizza into 8 equal slices, which individual slice is BIGGER?',
      options: [
        'The 1/8 slice',
        'The 1/2 slice',
        'They are exactly the same size',
        'The 1/8 slice because 8 is bigger than 2'
      ],
      correct: 1,
      why: 'Exactly! 1/2 is much bigger than 1/8! The more pieces a whole is divided into (larger denominator), the smaller each slice becomes!'
    },
    {
      q: 'If Chef Luigi bakes a pizza cut into 8 equal slices, and you eat 4 slices (4/8), what simplified fraction of the pizza did you eat?',
      options: [
        '1/4 of the pizza',
        '1/2 of the pizza (one half!)',
        'The whole pizza',
        '3/8 of the pizza'
      ],
      correct: 1,
      why: 'Awesome math detective! 4/8 is an equivalent fraction equal to exactly one half (1/2)!'
    },
    {
      q: 'Which of the following fractions represents one whole pizza?',
      options: [
        '4/4',
        '1/4',
        '3/4',
        '0/4'
      ],
      correct: 0,
      why: 'Perfect! Whenever the numerator equals the denominator (like 4/4 or 8/8), it represents the complete whole (1)!'
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

  const handleToggleSlice = (idx) => {
    sound.playPop();
    let next;
    if (selectedSlices.includes(idx)) {
      next = selectedSlices.filter((s) => s !== idx);
    } else {
      next = [...selectedSlices, idx];
    }
    setSelectedSlices(next);

    // Check if target fraction matched
    if (next.length === targetFraction.num && totalSlices === targetFraction.den) {
      sound.playDing();
      setOrderServed(true);
      beakyComment(`Order up! You chose ${targetFraction.num} of ${targetFraction.den} equal slices.`);
    } else {
      setOrderServed(false);
    }
  };

  const handleSetPizzaCuts = (cuts) => {
    sound.playSplash();
    setTotalSlices(cuts);
    setSelectedSlices([]);
    setOrderServed(false);

    if (cuts === 2) {
      setTargetFraction({ num: 1, den: 2, label: "1/2" });
    } else if (cuts === 4) {
      setTargetFraction({ num: 3, den: 4, label: "3/4" });
    } else if (cuts === 8) {
      setTargetFraction({ num: 5, den: 8, label: "5/8" });
    }
  };

  const handleSelectQuiz = (idx) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    const isCorrect = idx === quizQuestions[quizIdx].correct;
    beakyQuizReaction(isCorrect, 'fractions', friendlyQuizHint(quizQuestions[quizIdx].why, quizQuestions[quizIdx].q));
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
            Maths & Logic → Fractions in the Real World
          </span>
        </div>

        {/* Part Tabs */}
        <div className="flex items-center gap-1.5">
          {['1. What is a Fraction?', '2. Real World Slicing', '3. Pizza Chef Lab', '4. Quiz & Badge'].map((title, i) => (
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
        
        {/* PART 1: What is a Fraction? (Visible Lesson Text + Anatomy Card) */}
        {part === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Part 1 of 3: Math Fundamentals
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  What is a Fraction? (Numerator & Denominator)
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

            <AdventureScene items={['🍕', '¼', '½', '¾']} className="from-amber-50 via-orange-50 to-rose-50 border-amber-100" />

            {/* Complete Visible Lesson Paragraphs */}
            <div className="space-y-3">
              {lessonTextPart1.map((p, idx) => (
                <div key={idx} className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-2xl text-xs md:text-sm text-amber-950 font-semibold leading-relaxed">
                  {p}
                </div>
              ))}
            </div>

            {/* Visual Fraction Anatomy Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-8 rounded-3xl shadow-lg flex flex-col items-center text-center">
                <span className="text-xs font-black uppercase tracking-widest text-amber-200 mb-2">
                  Fraction Anatomy
                </span>
                <div className="flex flex-col items-center my-2">
                  <div className="text-6xl font-black text-white">3</div>
                  <div className="w-24 h-2 bg-white rounded-full my-2" />
                  <div className="text-6xl font-black text-white">4</div>
                </div>
                <div className="mt-4 bg-white/20 px-4 py-2 rounded-xl text-xs font-bold">
                  "Three-Fourths (3 out of 4 equal slices)"
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-sky-50 border-2 border-sky-200 p-4 rounded-2xl">
                  <span className="text-xs font-black uppercase text-sky-700 block">
                    Top Number: The Numerator (3)
                  </span>
                  <p className="text-xs text-sky-950 font-semibold mt-1">
                    Counts <strong>how many equal parts</strong> you have, ate, or selected!
                  </p>
                </div>

                <div className="bg-orange-50 border-2 border-orange-200 p-4 rounded-2xl">
                  <span className="text-xs font-black uppercase text-orange-700 block">
                    Bottom Number: The Denominator (4)
                  </span>
                  <p className="text-xs text-orange-950 font-semibold mt-1">
                    Tells you the <strong>total number of equal parts</strong> the whole was divided into!
                  </p>
                </div>
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
                <span>Part 2: Real World Slicing!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 2: Real World Slicing & Comparing (Visible Lesson Text + Cards) */}
        {part === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Part 2 of 3: Real World Fractions
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  Why 1/2 is Bigger Than 1/8 (Fraction Size Secret!)
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

            {/* Visual comparison of pizza portions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-amber-50 border-2 border-amber-200 p-5 rounded-3xl text-center flex flex-col items-center">
                <span className="text-5xl mb-2">🍕</span>
                <h3 className="text-base font-black text-amber-950">1/2 (One Half)</h3>
                <span className="text-xs text-amber-800 font-bold mt-1">Cut into 2 large slices</span>
                <p className="text-xs text-slate-600 mt-2">
                  Each piece is 50% of the entire pizza. Huge, hearty slice!
                </p>
              </div>

              <div className="bg-sky-50 border-2 border-sky-200 p-5 rounded-3xl text-center flex flex-col items-center">
                <span className="text-5xl mb-2">🍕</span>
                <h3 className="text-base font-black text-sky-950">1/4 (One Quarter)</h3>
                <span className="text-xs text-sky-800 font-bold mt-1">Cut into 4 equal slices</span>
                <p className="text-xs text-slate-600 mt-2">
                  Medium slices! Two quarters (2/4) equal exactly one half (1/2)!
                </p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 p-5 rounded-3xl text-center flex flex-col items-center">
                <span className="text-5xl mb-2">🍕</span>
                <h3 className="text-base font-black text-purple-950">1/8 (One Eighth)</h3>
                <span className="text-xs text-purple-800 font-bold mt-1">Cut into 8 party slices</span>
                <p className="text-xs text-slate-600 mt-2">
                  Small slices! Four eighths (4/8) equal one half (1/2)!
                </p>
              </div>
            </div>

            <div className="bg-amber-100 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 font-bold flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>
                <strong>Chef's Golden Rule:</strong> When numerators are the same, smaller denominator = much larger slice!
              </span>
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
                <span>Part 3: Pizza Chef Lab!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 3: Pizza Chef Lab Interactive Activity */}
        {part === 3 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Part 3 of 3: Interactive Activity
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  The Pizza Chef Fraction Kitchen!
                </h2>
                <p className="text-xs text-slate-500 font-bold mt-0.5">
                  Slice the pizza and click slices to serve the customer's exact fraction order!
                </p>
              </div>
            </div>

            {/* Customer Order Ticket */}
            <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="text-3xl">👨‍🍳 📝</span>
                <div>
                  <span className="text-xs font-black uppercase text-amber-800">Customer Order Ticket:</span>
                  <div className="text-base font-black text-slate-900">
                    "Please serve me <span className="text-amber-700 underline text-lg">{targetFraction.label}</span> of a pizza!"
                  </div>
                </div>
              </div>

              {orderServed ? (
                <div className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-black shadow flex items-center gap-1 animate-bounce">
                  <CheckCircle2 className="w-4 h-4" /> Order Perfectly Served!
                </div>
              ) : (
                <div className="text-xs text-slate-500 font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                  Currently selected: {selectedSlices.length} / {totalSlices}
                </div>
              )}
            </div>

            {/* Cut Options (2, 4, or 8 slices) */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs font-black text-slate-700">Choose Pizza Cut:</span>
              {[2, 4, 8].map((cuts) => (
                <button
                  key={cuts}
                  onClick={() => handleSetPizzaCuts(cuts)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    totalSlices === cuts
                      ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cuts} Slices
                </button>
              ))}
            </div>

            {/* Interactive Slices Display */}
            <div className="bg-gradient-to-b from-amber-100/50 to-orange-100/50 p-6 rounded-3xl border-2 border-amber-200 flex flex-col items-center">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md w-full my-2">
                {[...Array(totalSlices)].map((_, idx) => {
                  const isPicked = selectedSlices.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleToggleSlice(idx)}
                      className={`p-5 rounded-2xl border-3 transition flex flex-col items-center cursor-pointer ${
                        isPicked
                          ? 'bg-amber-400 border-amber-600 shadow-md scale-105 ring-2 ring-amber-300'
                          : 'bg-white border-slate-200 hover:border-amber-300 opacity-70'
                      }`}
                    >
                      <span className="text-3xl">🍕</span>
                      <span className="text-xs font-black text-slate-900 mt-1">Slice #{idx + 1}</span>
                      <span className={`text-[10px] font-bold mt-0.5 ${isPicked ? 'text-amber-950 font-black' : 'text-slate-400'}`}>
                        {isPicked ? 'Selected' : 'Click to take'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 text-xs font-black text-slate-700">
                Fraction Served: {selectedSlices.length}/{totalSlices} ({selectedSlices.length === 0 ? 'Empty plate' : `${selectedSlices.length} out of ${totalSlices} slices`})
              </div>
            </div>

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
                <span>Take the Fraction Master Quiz!</span>
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
                <span className="text-6xl mb-3">🍕 👨‍🍳 🏅</span>
                <span className="text-xs font-black uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full text-white mb-2">
                  Official SciTale Honor
                </span>
                <h3 className="text-3xl font-black mb-1">Fraction Master Chef Badge</h3>
                <p className="text-sm text-amber-100 max-w-md font-semibold mb-6">
                  You scored {quizScore} out of {quizQuestions.length}! You understand numerators, denominators, and real-world fraction slicing like a true master!
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
      {part === 4 && quizDone && <TeachItBack adventureId="fractions" ageGroupId={ageGroupId} quizScore={quizScore} quizTotal={quizQuestions.length} quizMisses={quizMisses} quizErrors={quizErrors} quizItems={quizQuestions} />}
    </div>
  );
}
