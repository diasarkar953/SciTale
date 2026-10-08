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
  Sun,
  Droplets,
  Wind,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { sound } from '../../audio/soundEffects';
import { narrator } from '../../speech/speechNarrator';
import { pickAge } from '../../data/ageLevels';
import { photosynthesisByAge } from '../../data/adventureContent';
import { getStoryLessons } from '../../data/storyLessons';
import AdventureScene from './AdventureScene';
import TeachItBack from '../TeachItBack';
import { beakyComment, beakyQuizReaction, friendlyQuizHint } from '../../beakyCompanion';

export default function PhotosynthesisAdventure({ onBack, ageGroupId }) {
  const content = pickAge(photosynthesisByAge, ageGroupId);
  const story = getStoryLessons('photosynthesis', ageGroupId);
  const [part, setPart] = useState(1); // 1: Anatomy, 2: Reaction, 3: Lab Activity, 4: Quiz
  const [isNarrating, setIsNarrating] = useState(false);

  const lessonTextPart1 = story[0];
  const lessonTextPart2 = story[1];

  // Part 3: Photosynthesis Lab State
  const [hasSun, setHasSun] = useState(false);
  const [hasWater, setHasWater] = useState(false);
  const [hasCO2, setHasCO2] = useState(false);
  const [growthScore, setGrowthScore] = useState(0);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizMisses, setQuizMisses] = useState([]);
  const [quizErrors, setQuizErrors] = useState({});
  const [quizDone, setQuizDone] = useState(false);

  const quizQuestions = content.quiz;

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

  const handleToggleLab = (type) => {
    sound.playPop();
    let nSun = hasSun;
    let nWater = hasWater;
    let nCO2 = hasCO2;

    if (type === 'sun') {
      nSun = !hasSun;
      setHasSun(nSun);
    }
    if (type === 'water') {
      nWater = !hasWater;
      setHasWater(nWater);
      if (nWater) sound.playSplash();
    }
    if (type === 'co2') {
      nCO2 = !hasCO2;
      setHasCO2(nCO2);
      if (nCO2) sound.playWhoosh();
    }

    if (nSun && nWater && nCO2) {
      sound.playDing();
      setGrowthScore(100);
      beakyComment('All three plant ingredients are here! You helped the plant make food and grow.');
    } else {
      const count = (nSun ? 1 : 0) + (nWater ? 1 : 0) + (nCO2 ? 1 : 0);
      setGrowthScore(Math.round((count / 3) * 75));
    }
  };

  const handleSelectQuiz = (idx) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    const isCorrect = idx === quizQuestions[quizIdx].correct;
    beakyQuizReaction(isCorrect, 'plant', friendlyQuizHint(quizQuestions[quizIdx].why, quizQuestions[quizIdx].q));
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
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border-2 border-green-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              narrator.stop();
              onBack();
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-green-600" />
            <span>Library</span>
          </button>
          <span className="text-xs font-bold text-slate-500">
            {content.banner}
          </span>
        </div>

        {/* Part Tabs */}
        <div className="flex items-center gap-1.5">
          {content.tabs.map((title, i) => (
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
                  ? 'bg-green-600 text-white shadow-sm ring-2 ring-green-300'
                  : 'bg-green-50 text-green-800 hover:bg-green-100'
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-green-100 shadow-xl flex flex-col gap-6">
        
        {/* PART 1: Parts of a Plant (Visible Lesson Text + Cards) */}
        {part === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  {content.part1Badge}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  {content.part1Title}
                </h2>
              </div>

              <button
                onClick={() => handleNarrate(lessonTextPart1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs md:text-sm text-white shadow-md transition cursor-pointer ${
                  isNarrating ? 'bg-rose-500 animate-pulse' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isNarrating ? <Square className="w-4 h-4 fill-white" /> : <Volume2 className="w-4 h-4" />}
                <span>{isNarrating ? 'Stop Narration' : '🔊 Read to Me!'}</span>
              </button>
            </div>

            <AdventureScene items={['🌱', '☀️', '💧', '🍃']} className="from-lime-50 via-emerald-50 to-amber-50 border-green-100" />

            {/* Complete Visible Lesson Paragraphs */}
            <div className="space-y-3">
              {lessonTextPart1.map((p, idx) => (
                <div key={idx} className="bg-green-50/70 border border-green-200/80 p-3.5 rounded-2xl text-xs md:text-sm text-green-950 font-semibold leading-relaxed">
                  {p}
                </div>
              ))}
            </div>

            {/* Visual Flashcards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-3xl">🌱 💧</span>
                  <h3 className="text-base font-black text-amber-950 mt-2">1. Roots</h3>
                  <p className="text-xs text-amber-900 font-semibold mt-1">
                    Anchor the plant and drink liquid water and essential mineral salts through root hairs.
                  </p>
                </div>
              </div>

              <div className="bg-lime-50/70 border-2 border-lime-200 rounded-3xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-3xl">🎋 ⬆️</span>
                  <h3 className="text-base font-black text-lime-950 mt-2">2. Stem & Xylem</h3>
                  <p className="text-xs text-lime-900 font-semibold mt-1">
                    The structural skeleton with microscopic xylem tubes that carry water up to leaves like straws.
                  </p>
                </div>
              </div>

              <div className="bg-green-50/70 border-2 border-green-200 rounded-3xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-3xl">🍃 ☀️</span>
                  <h3 className="text-base font-black text-green-950 mt-2">3. Green Leaves</h3>
                  <p className="text-xs text-green-900 font-semibold mt-1">
                    Contain green chloroplasts to catch sunlight, and microscopic stomata pores to exchange gases.
                  </p>
                </div>
              </div>

              <div className="bg-rose-50/70 border-2 border-rose-200 rounded-3xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-3xl">🌸 🐝</span>
                  <h3 className="text-base font-black text-rose-950 mt-2">4. Flowers & Seeds</h3>
                  <p className="text-xs text-rose-900 font-semibold mt-1">
                    Attract pollinators like bees and butterflies to produce seeds for the next generation of plants.
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
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Part 2: Photosynthesis Formula!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 2: Photosynthesis Chemical Miracle (Visible Lesson Text + Equation) */}
        {part === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  Part 2 of 3: The Solar Sugar Formula
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  How Light Turns Air and Water into Food!
                </h2>
              </div>

              <button
                onClick={() => handleNarrate(lessonTextPart2)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs md:text-sm text-white shadow-md transition cursor-pointer ${
                  isNarrating ? 'bg-rose-500 animate-pulse' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isNarrating ? <Square className="w-4 h-4 fill-white" /> : <Volume2 className="w-4 h-4" />}
                <span>{isNarrating ? 'Stop Narration' : '🔊 Read to Me!'}</span>
              </button>
            </div>

            {/* Complete Visible Lesson Paragraphs */}
            <div className="space-y-3">
              {lessonTextPart2.map((p, idx) => (
                <div key={idx} className="bg-green-50/70 border border-green-200/80 p-3.5 rounded-2xl text-xs md:text-sm text-green-950 font-semibold leading-relaxed">
                  {p}
                </div>
              ))}
            </div>

            {/* Visual Equation Banner */}
            <div className="bg-gradient-to-r from-green-700 via-teal-700 to-emerald-800 text-white p-6 rounded-3xl shadow-lg border-2 border-green-500 flex flex-col md:flex-row items-center justify-around gap-4 text-center">
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-1">☀️ 💧 💨</span>
                <span className="text-xs uppercase font-extrabold text-green-200">3 Essential Inputs</span>
                <span className="text-base font-black">Sunlight + Water + CO₂</span>
              </div>

              <div className="text-3xl font-black text-amber-300">➔</div>

              <div className="flex flex-col items-center">
                <span className="text-3xl mb-1">🌿 🔬</span>
                <span className="text-xs uppercase font-extrabold text-green-200">Reaction Chamber</span>
                <span className="text-base font-black">Chloroplasts (Chlorophyll)</span>
              </div>

              <div className="text-3xl font-black text-amber-300">➔</div>

              <div className="flex flex-col items-center">
                <span className="text-3xl mb-1">🍓 🫧</span>
                <span className="text-xs uppercase font-extrabold text-green-200">2 Life Products</span>
                <span className="text-base font-black">Glucose Sugar + Oxygen (O₂)</span>
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
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Part 3: Interactive Photosynthesis Lab!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 3: Interactive Photosynthesis Lab */}
        {part === 3 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  Part 3 of 3: Laboratory Simulator
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  Feed the Plant Experiment!
                </h2>
                <p className="text-xs text-slate-500 font-bold mt-0.5">
                  Toggle all 3 essential ingredients to trigger active photosynthesis and watch the plant produce oxygen & sugar!
                </p>
              </div>
            </div>

            {/* Simulation Canvas */}
            <div className="relative w-full h-80 rounded-3xl overflow-hidden border-4 border-green-200 bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-100 p-6 flex flex-col justify-between shadow-inner">
              {hasSun && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-amber-400/90 text-amber-950 font-black px-3.5 py-1.5 rounded-full shadow-lg animate-pulse border-2 border-amber-300">
                  <Sun className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Solar Energy Active ☀️</span>
                </div>
              )}

              <div className="flex-1 flex items-center justify-center relative">
                <div className="text-center relative">
                  {growthScore === 100 && (
                    <div className="absolute -top-12 inset-x-0 flex justify-center gap-4 text-xl animate-bounce">
                      <span>🫧 Fresh O₂!</span>
                      <span>🍓 Sweet Glucose!</span>
                      <span>🫧 Fresh O₂!</span>
                    </div>
                  )}

                  <div
                    className="text-7xl transition-transform duration-500"
                    style={{ transform: `scale(${0.9 + growthScore * 0.004})` }}
                  >
                    🪴
                  </div>
                  <span className="text-xs font-black text-slate-800 bg-white/80 px-3 py-1 rounded-full shadow border border-slate-200 mt-2 inline-block">
                    {growthScore === 100 ? '🎉 Photosynthesis at 100% Capacity!' : `Plant Sugar Output: ${growthScore}%`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-bold text-slate-600 bg-white/70 backdrop-blur-sm p-2 rounded-xl">
                <span>💧 Soil Hydration: {hasWater ? 'Wet (Supplied)' : 'Dry (Missing)'}</span>
                <span>💨 Carbon Dioxide: {hasCO2 ? 'Absorbed via Stomata' : 'Missing'}</span>
              </div>
            </div>

            {/* Ingredient Controller Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => handleToggleLab('sun')}
                className={`p-4 rounded-2xl border-2 transition font-black text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer ${
                  hasSun
                    ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-md ring-2 ring-amber-300'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-amber-50'
                }`}
              >
                <Sun className="w-5 h-5 text-amber-500" />
                <span>1. {hasSun ? 'Turn Off Sunlight' : 'Turn On Sunlight ☀️'}</span>
              </button>

              <button
                onClick={() => handleToggleLab('water')}
                className={`p-4 rounded-2xl border-2 transition font-black text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer ${
                  hasWater
                    ? 'bg-sky-100 border-sky-400 text-sky-900 shadow-md ring-2 ring-sky-300'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-sky-50'
                }`}
              >
                <Droplets className="w-5 h-5 text-sky-500" />
                <span>2. {hasWater ? 'Drain Water' : 'Pour Water (H₂O) 💧'}</span>
              </button>

              <button
                onClick={() => handleToggleLab('co2')}
                className={`p-4 rounded-2xl border-2 transition font-black text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer ${
                  hasCO2
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-md ring-2 ring-emerald-300'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-emerald-50'
                }`}
              >
                <Wind className="w-5 h-5 text-emerald-500" />
                <span>3. {hasCO2 ? 'Clear Carbon Dioxide' : 'Supply Carbon Dioxide (CO₂) 💨'}</span>
              </button>
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
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Take the Botanical Master Quiz!</span>
                <Award className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 4: Quiz & Badge */}
        {part === 4 && (
          <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
            {quizDone ? (
              <div className="bg-gradient-to-br from-green-500 to-emerald-700 text-white rounded-3xl p-8 text-center flex flex-col items-center shadow-xl border-4 border-green-300">
                <span className="text-6xl mb-3">🍃 🏅</span>
                <span className="text-xs font-black uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full text-white mb-2">
                  Official SciTale Honor
                </span>
                <h3 className="text-3xl font-black mb-1">Botanical Master Badge</h3>
                <p className="text-sm text-green-100 max-w-md font-semibold mb-6">
                  You scored {quizScore} out of {quizQuestions.length}! You understand the solar chemistry that powers every plant and breath of air on Earth!
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
                    className="flex-1 py-3 px-4 bg-white text-green-950 font-black text-xs rounded-xl shadow transition cursor-pointer hover:scale-105"
                  >
                    Back to Library
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-xs font-black uppercase text-green-700">
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
                    let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-green-50';
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
                  <div className={`p-3.5 rounded-2xl border text-xs font-semibold animate-fade-in ${selectedAns === quizQuestions[quizIdx].correct ? 'bg-green-50 border-green-200 text-green-900' : 'bg-amber-50 border-amber-200 text-amber-950'}`}>
                    {selectedAns === quizQuestions[quizIdx].correct ? quizQuestions[quizIdx].why : <>🐦 Beaky’s hint: {friendlyQuizHint(quizQuestions[quizIdx].why, quizQuestions[quizIdx].q)}</>}
                  </div>
                )}

                {selectedAns === quizQuestions[quizIdx].correct && (
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
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
      {part === 4 && quizDone && <TeachItBack adventureId="photosynthesis" ageGroupId={ageGroupId} adventureName={content.banner} quizScore={quizScore} quizTotal={quizQuestions.length} quizMisses={quizMisses} quizErrors={quizErrors} quizItems={quizQuestions} />}
    </div>
  );
}
