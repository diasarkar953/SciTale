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
  Globe,
  Rocket,
  CheckCircle2,
  Orbit,
  BookOpen
} from 'lucide-react';
import { sound } from '../../audio/soundEffects';
import { narrator } from '../../speech/speechNarrator';
import { getStoryLessons } from '../../data/storyLessons';
import AdventureScene from './AdventureScene';
import TeachItBack from '../TeachItBack';
import { beakyComment, beakyQuizReaction, friendlyQuizHint } from '../../beakyCompanion';

export default function SolarSystemAdventure({ onBack, ageGroupId }) {
  const [part, setPart] = useState(1); // 1: Planets, 2: Day/Night & Orbits, 3: Orbit Lab, 4: Quiz
  const [isNarrating, setIsNarrating] = useState(false);

  // Visible story panels are also passed to the existing Read to Me control.
  const story = getStoryLessons('solar_system', ageGroupId);
  const lessonTextPart1 = story[0];
  const lessonTextPart2 = story[1];

  // Part 3: Planet explorer state
  const planetsData = [
    { name: "Mercury", icon: "🌑", type: "Rocky Inner", dist: "58M km", year: "88 Earth days", fact: "Closest to the Sun, with extreme hot days and freezing nights!" },
    { name: "Venus", icon: "🟡", type: "Rocky Inner", dist: "108M km", year: "225 Earth days", fact: "Hottest planet in the solar system due to a thick runaway greenhouse atmosphere!" },
    { name: "Earth", icon: "🌍", type: "Rocky Inner (Our Home!)", dist: "150M km", year: "365 days", fact: "The only known planet in the universe with liquid oceans, oxygen, and life!" },
    { name: "Mars", icon: "🔴", type: "Rocky Inner", dist: "228M km", year: "687 Earth days", fact: "The dusty Red Planet where robot rovers explore dry ancient riverbeds!" },
    { name: "Jupiter", icon: "🪐", type: "Gas Giant", dist: "778M km", year: "12 Earth years", fact: "The largest planet! The famous Great Red Spot is a spinning hurricane bigger than Earth!" },
    { name: "Saturn", icon: "🪐", type: "Gas Giant", dist: "1.4B km", year: "29 Earth years", fact: "Adorned with dazzling rings made of billions of shimmering ice and rock chunks!" },
    { name: "Uranus", icon: "⚪", type: "Ice Giant", dist: "2.9B km", year: "84 Earth years", fact: "An icy blue-green giant that rotates on its side like a rolling bowling ball!" },
    { name: "Neptune", icon: "🔵", type: "Ice Giant", dist: "4.5B km", year: "165 Earth years", fact: "The farthest planet from the Sun, with supersonic winds reaching 1,200 mph!" }
  ];
  const [selectedPlanet, setSelectedPlanet] = useState(planetsData[2]); // Earth default

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
      q: 'What causes day and night on Earth?',
      options: [
        'Clouds covering the sky',
        'Earth spinning on its own axis every 24 hours',
        'The Sun traveling around the Earth',
        'The Moon turning on and off'
      ],
      correct: 1,
      why: 'Spot on! As Earth rotates on its axis once every 24 hours, the half facing the Sun experiences day while the opposite half is in night!'
    },
    {
      q: 'How long does it take for Earth to complete one full revolution (orbit) around the Sun?',
      options: [
        '24 hours (1 Day)',
        '30 days (1 Month)',
        '365.25 days (1 Year)',
        '10 years'
      ],
      correct: 2,
      why: 'Correct! Earth travels in its gravitational orbit around the Sun, completing one full journey in 365.25 days (one year)!'
    },
    {
      q: 'Which group of planets are large gas and ice giants located beyond the asteroid belt?',
      options: [
        'Mercury, Venus, Earth, Mars',
        'Jupiter, Saturn, Uranus, Neptune',
        'The Moon and Asteroids',
        'The Sun and Comets'
      ],
      correct: 1,
      why: 'Awesome! Jupiter and Saturn are Gas Giants, while Uranus and Neptune are Ice Giants located beyond the asteroid belt!'
    }
  ];

  const handleNarrate = (textArray) => {
    if (isNarrating) {
      narrator.stop();
      setIsNarrating(false);
    } else {
      sound.playPop();
      const combinedText = textArray.join(' ');
      narrator.speak(combinedText, () => setIsNarrating(false));
      setIsNarrating(true);
    }
  };

  const handleSelectQuiz = (idx) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    const isCorrect = idx === quizQuestions[quizIdx].correct;
    beakyQuizReaction(isCorrect, 'space', friendlyQuizHint(quizQuestions[quizIdx].why, quizQuestions[quizIdx].q));
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
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border-2 border-indigo-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              narrator.stop();
              onBack();
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Library</span>
          </button>
          <span className="text-xs font-bold text-slate-500">
            Space & Earth → Space & Solar System
          </span>
        </div>

        {/* Part Tabs */}
        <div className="flex items-center gap-1.5">
          {['1. The 8 Planets', '2. Day, Night & Orbits', '3. Orbit Explorer', '4. Quiz & Badge'].map((title, i) => (
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
                  ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-purple-100 shadow-xl flex flex-col gap-6">
        
        {/* PART 1: The 8 Planets (Visible Lesson Text + Cards) */}
        {part === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  Part 1 of 3: Cosmic Neighborhood
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  Meet the 8 Planets of Our Solar System!
                </h2>
              </div>

              <button
                onClick={() => handleNarrate(lessonTextPart1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs md:text-sm text-white shadow-md transition cursor-pointer ${
                  isNarrating ? 'bg-rose-500 animate-pulse' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isNarrating ? <Square className="w-4 h-4 fill-white" /> : <Volume2 className="w-4 h-4" />}
                <span>{isNarrating ? 'Stop Narration' : '🔊 Read to Me!'}</span>
              </button>
            </div>

            <AdventureScene items={['🚀', '☀️', '🪐', '🌍']} className="from-slate-900 via-indigo-950 to-purple-900 border-purple-300/30" />

            {/* Complete Visible Lesson Paragraphs */}
            <div className="space-y-3">
              {lessonTextPart1.map((paragraph, idx) => (
                <div key={idx} className="bg-purple-50/70 border border-purple-200/80 p-3.5 rounded-2xl text-xs md:text-sm text-purple-950 font-semibold leading-relaxed">
                  {paragraph}
                </div>
              ))}
            </div>

            {/* Planet Visual Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {planetsData.map((p, idx) => (
                <div key={idx} className="bg-slate-900 text-white p-4 rounded-2xl border border-purple-500/40 flex flex-col justify-between transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_12px_28px_rgba(168,85,247,0.25)]" style={{ animation: 'pageFadeIn 600ms ease-out both', animationDelay: `${idx * 70}ms` }}>
                  <div>
                    <span className="text-3xl mb-1 block">{p.icon}</span>
                    <h3 className="text-sm font-black text-amber-300">{p.name}</h3>
                    <span className="text-[10px] text-purple-300 font-bold block">{p.type}</span>
                    <p className="text-[11px] text-slate-300 mt-1">{p.fact}</p>
                  </div>
                  <div className="mt-2 text-[10px] font-bold text-slate-400 border-t border-white/10 pt-1">
                    Year: {p.year}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  sound.playPop();
                  setPart(2);
                }}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Part 2: Day, Night & Orbits!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 2: Day, Night & Orbits (Visible Lesson Text + Cards) */}
        {part === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  Part 2 of 3: Orbital Mechanics
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  Why Do We Have Day, Night, and 4 Seasons?
                </h2>
              </div>

              <button
                onClick={() => handleNarrate(lessonTextPart2)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs md:text-sm text-white shadow-md transition cursor-pointer ${
                  isNarrating ? 'bg-rose-500 animate-pulse' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isNarrating ? <Square className="w-4 h-4 fill-white" /> : <Volume2 className="w-4 h-4" />}
                <span>{isNarrating ? 'Stop Narration' : '🔊 Read to Me!'}</span>
              </button>
            </div>

            {/* Complete Visible Lesson Paragraphs */}
            <div className="space-y-3">
              {lessonTextPart2.map((paragraph, idx) => (
                <div key={idx} className="bg-indigo-50/70 border border-indigo-200/80 p-3.5 rounded-2xl text-xs md:text-sm text-indigo-950 font-semibold leading-relaxed">
                  {paragraph}
                </div>
              ))}
            </div>

            {/* Visual Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-3xl">🔄 🌍</span>
                  <h3 className="text-lg font-black text-indigo-950 mt-1">
                    Earth's Daily Rotation (24 Hours)
                  </h3>
                  <p className="text-xs text-indigo-900 font-semibold mt-2 leading-relaxed">
                    Earth rotates on its axis once every 24 hours (1 Day). This spin creates daylight when facing the Sun and nighttime when facing deep space.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-3xl">☀️ 🔄</span>
                  <h3 className="text-lg font-black text-amber-950 mt-1">
                    Earth's Yearly Revolution (365.25 Days)
                  </h3>
                  <p className="text-xs text-amber-900 font-semibold mt-2 leading-relaxed">
                    Earth travels in its orbital path around the Sun. Together with our 23.5° axial tilt, this revolution gives us Spring, Summer, Autumn, and Winter!
                  </p>
                </div>
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
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Part 3: Planet Orbit Explorer!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 3: Planet Orbit Explorer Interactive Activity */}
        {part === 3 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  Part 3 of 3: Orbital Simulator
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  Interactive Planetary Orbit Dashboard
                </h2>
                <p className="text-xs text-slate-500 font-bold mt-0.5">
                  Select any planet to inspect its distance, orbital year, and secret cosmic facts!
                </p>
              </div>
            </div>

            {/* Planet selector tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {planetsData.map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    sound.playPop();
                    setSelectedPlanet(p);
                    beakyComment(`${p.name} selected! Explore its path around the Sun and how long its year lasts.`);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    selectedPlanet.name === p.name
                      ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>{p.name}</span>
                </button>
              ))}
            </div>

            {/* Orbit Display Stage */}
            <div className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 border-2 border-purple-500/50 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="absolute top-3 right-4 text-amber-200/70 animate-pulse" aria-hidden="true">✦　·　✧</div>
              {/* Sun and Orbit visual */}
              <div key={selectedPlanet.name} className="relative w-48 h-48 rounded-full border border-white/20 flex items-center justify-center animate-spin" style={{ animationDuration: '24s' }}>
                <div className="w-14 h-14 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-2xl shadow-[0_0_25px_rgba(251,191,36,0.8)]">
                  ☀️
                </div>
                {/* Orbiting planet marker */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                  {selectedPlanet.icon}
                </div>
              </div>

              {/* Data Card for selected planet */}
              <div key={selectedPlanet.name} className="flex-1 w-full bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 animate-[pageFadeIn_450ms_ease-out_both]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{selectedPlanet.icon}</span>
                  <div>
                    <h3 className="text-xl font-black text-amber-300">{selectedPlanet.name}</h3>
                    <span className="text-xs text-purple-200 font-bold">{selectedPlanet.type}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 my-3 text-xs">
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                    <span className="text-slate-400 block text-[10px] font-bold">Distance from Sun:</span>
                    <span className="font-black text-white">{selectedPlanet.dist}</span>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                    <span className="text-slate-400 block text-[10px] font-bold">Orbital Year Duration:</span>
                    <span className="font-black text-white">{selectedPlanet.year}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-200 bg-purple-900/40 p-2.5 rounded-xl border border-purple-500/30 font-medium">
                  🚀 <strong>Mission Discovery:</strong> {selectedPlanet.fact}
                </p>
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
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Take the Cosmic Astronaut Quiz!</span>
                <Award className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 4: Quiz & Badge */}
        {part === 4 && (
          <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
            {quizDone ? (
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-3xl p-8 text-center flex flex-col items-center shadow-xl border-4 border-purple-300">
                <span className="text-6xl mb-3">🚀 🏅</span>
                <span className="text-xs font-black uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full text-white mb-2">
                  Official SciTale Honor
                </span>
                <h3 className="text-3xl font-black mb-1">Cosmic Astronaut Badge</h3>
                <p className="text-sm text-purple-100 max-w-md font-semibold mb-6">
                  You scored {quizScore} out of {quizQuestions.length}! You understand the orbits, rotation, and planetary marvels of our great solar system!
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
                    className="flex-1 py-3 px-4 bg-white text-purple-950 font-black text-xs rounded-xl shadow transition cursor-pointer hover:scale-105"
                  >
                    Back to Library
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-xs font-black uppercase text-purple-700">
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
                    let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-purple-50';
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
                  <div className={`p-3.5 rounded-2xl border text-xs font-semibold animate-fade-in ${selectedAns === quizQuestions[quizIdx].correct ? 'bg-purple-50 border-purple-200 text-purple-900' : 'bg-amber-50 border-amber-200 text-amber-950'}`}>
                    {selectedAns === quizQuestions[quizIdx].correct ? quizQuestions[quizIdx].why : <>🐦 Beaky’s hint: {friendlyQuizHint(quizQuestions[quizIdx].why, quizQuestions[quizIdx].q)}</>}
                  </div>
                )}

                {selectedAns === quizQuestions[quizIdx].correct && (
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
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
      {part === 4 && quizDone && <TeachItBack adventureId="solar_system" ageGroupId={ageGroupId} quizScore={quizScore} quizTotal={quizQuestions.length} quizMisses={quizMisses} quizErrors={quizErrors} quizItems={quizQuestions} />}
    </div>
  );
}
