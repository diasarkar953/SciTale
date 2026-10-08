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
  Heart
} from 'lucide-react';
import { sound } from '../../audio/soundEffects';
import { narrator } from '../../speech/speechNarrator';
import { pickAge } from '../../data/ageLevels';
import { foodWebByAge } from '../../data/adventureContent';
import { getStoryLessons } from '../../data/storyLessons';
import AdventureScene from './AdventureScene';
import TeachItBack from '../TeachItBack';
import { beakyComment, beakyQuizReaction, friendlyQuizHint } from '../../beakyCompanion';

export default function FoodWebAdventure({ onBack, ageGroupId }) {
  const content = pickAge(foodWebByAge, ageGroupId);
  const story = getStoryLessons('food_web', ageGroupId);
  const [part, setPart] = useState(1); // 1: Concepts, 2: Chain Builder, 3: Web Cascade, 4: Quiz
  const [isNarrating, setIsNarrating] = useState(false);

  const lessonTextPart1 = story[0];
  const lessonTextPart3 = story[1];
  const availableOrganisms = content.organisms;
  const [chainSlots, setChainSlots] = useState([]);

  // Part 3: Food Web Cascade simulation state
  const [removedSpecies, setRemovedSpecies] = useState(null);

  // Part 4: Quiz state
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

  const handleAddToChain = (org) => {
    if (chainSlots.find((s) => s.id === org.id)) return;
    sound.playPop();
    const next = [...chainSlots, org];
    setChainSlots(next);

    if (next.length === 5) {
      const isCorrect = next.every((item, i) => item.order === i + 1);
      if (isCorrect) {
        sound.playDing();
        beakyComment('Food-chain connections found! You followed the energy from one living thing to the next.');
      } else {
        sound.playBoop();
        beakyComment('Check which living thing provides food for the next one. You can rearrange the chain and try again!');
      }
    }
  };

  const handleResetChain = () => {
    sound.playSplash();
    setChainSlots([]);
  };

  const handleSelectQuiz = (idx) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    const isCorrect = idx === quizQuestions[quizIdx].correct;
    beakyQuizReaction(isCorrect, 'food-web', friendlyQuizHint(quizQuestions[quizIdx].why, quizQuestions[quizIdx].q));
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
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div key={part} className="flex flex-col gap-6 max-w-5xl mx-auto w-full animate-fade-in">
      
      {/* Top Banner Navigation */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border-2 border-emerald-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              narrator.stop();
              onBack();
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
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
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-emerald-100 shadow-xl flex flex-col gap-6">
        
        {/* PART 1: Producers vs Consumers (Visible Lesson Text + Cards) */}
        {part === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {content.part1Badge}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  {content.part1Title}
                </h2>
              </div>

              <button
                onClick={() => handleNarrate(lessonTextPart1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs md:text-sm text-white shadow-md transition cursor-pointer ${
                  isNarrating ? 'bg-rose-500 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {isNarrating ? <Square className="w-4 h-4 fill-white" /> : <Volume2 className="w-4 h-4" />}
                <span>{isNarrating ? 'Stop Narration' : '🔊 Read to Me!'}</span>
              </button>
            </div>

            <AdventureScene items={['🌱', '🐛', '🐦', '🦊']} className="from-emerald-50 via-lime-50 to-sky-50 border-emerald-100" />

            {/* Complete Visible Lesson Paragraphs */}
            <div className="space-y-3">
              {lessonTextPart1.map((p, idx) => (
                <div key={idx} className="bg-emerald-50/70 border border-emerald-200/80 p-3.5 rounded-2xl text-xs md:text-sm text-emerald-950 font-semibold leading-relaxed">
                  {p}
                </div>
              ))}
            </div>

            {/* Visual Flashcards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.cardsPart1.map((c) => (
                <div key={c.title} className={`${c.wrap} border-2 rounded-3xl p-5 flex flex-col justify-between`}>
                  <div>
                    <div className="text-4xl mb-2">{c.emoji}</div>
                    <h3 className="text-lg font-black text-slate-900 mb-1">{c.title}</h3>
                    <p className="text-xs text-slate-800 font-semibold leading-relaxed">{c.text}</p>
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
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>{content.next1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 2: Build a Rainforest Food Chain */}
        {part === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Part 2 of 3: Interactive Activity
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  {content.chainTitle}
                </h2>
                <p className="text-xs text-slate-500 font-bold mt-0.5">
                  {content.chainHint}
                </p>
              </div>

              <button
                onClick={handleResetChain}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Chain
              </button>
            </div>

            {/* Dropped Chain Slots */}
            <div className="bg-emerald-900/10 border-2 border-dashed border-emerald-300 rounded-3xl p-5 min-h-[140px] flex flex-wrap items-center justify-around gap-3">
              {chainSlots.length === 0 ? (
                <div className="text-xs text-emerald-800 font-extrabold text-center py-4">
                  {content.chainEmpty}
                </div>
              ) : (
                chainSlots.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <div className="bg-white border-2 border-emerald-400 p-3.5 rounded-2xl shadow-md flex flex-col items-center min-w-[120px] animate-scale-up">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-xs font-black text-slate-900 mt-1 text-center">{item.name}</span>
                      <span className="text-[10px] text-emerald-700 font-bold">{item.role}</span>
                    </div>
                    {idx < chainSlots.length - 1 && (
                      <span className="text-xl font-black text-emerald-600">➔</span>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Success message when complete */}
            {chainSlots.length === 5 && (
              <div className="bg-emerald-100 border-2 border-emerald-300 text-emerald-900 rounded-2xl p-4 flex items-center justify-between text-xs md:text-sm font-black shadow">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>
                    {content.chainSuccess}
                  </span>
                </div>
              </div>
            )}

            {/* Organism Palette */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {availableOrganisms.map((org) => {
                const isSelected = chainSlots.find((s) => s.id === org.id);
                return (
                  <button
                    key={org.id}
                    onClick={() => handleAddToChain(org)}
                    disabled={isSelected}
                    className={`p-4 rounded-2xl border-2 transition flex flex-col items-center text-center cursor-pointer ${
                      isSelected
                        ? 'opacity-40 bg-slate-100 border-slate-300 cursor-not-allowed'
                        : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md hover:scale-105 active:scale-95'
                    }`}
                  >
                    <span className="text-3xl mb-1">{org.icon}</span>
                    <span className="text-xs font-black text-slate-800">{org.name}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{org.role}</span>
                  </button>
                );
              })}
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
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Part 3: Food Web Simulation!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 3: Interactive Food Web Simulation (Visible Lesson Text + Cascade) */}
        {part === 3 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {content.part3Badge}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  {content.part3Title}
                </h2>
              </div>

              <button
                onClick={() => handleNarrate(lessonTextPart3)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs md:text-sm text-white shadow-md transition cursor-pointer ${
                  isNarrating ? 'bg-rose-500 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {isNarrating ? <Square className="w-4 h-4 fill-white" /> : <Volume2 className="w-4 h-4" />}
                <span>{isNarrating ? 'Stop Narration' : '🔊 Read to Me!'}</span>
              </button>
            </div>

            {/* Complete Visible Lesson Paragraphs */}
            <div className="space-y-3">
              {lessonTextPart3.map((p, idx) => (
                <div key={idx} className="bg-emerald-50/70 border border-emerald-200/80 p-3.5 rounded-2xl text-xs md:text-sm text-emerald-950 font-semibold leading-relaxed">
                  {p}
                </div>
              ))}
            </div>

            {/* Interactive Web Stage */}
            <div className="relative bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 text-white overflow-hidden shadow-lg border-2 border-emerald-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                  Interactive Ecosystem Matrix (Click to Remove a Species)
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold bg-white/10 px-3 py-1 rounded-xl">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  <span>
                    Health: {removedSpecies ? content.unbalancedLabel : content.healthyLabel}
                  </span>
                </div>
              </div>

              {/* Grid of Species */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-2">
                {[
                  { id: 'trees', name: 'Canopy Trees', icon: '🌳', role: 'Oxygen & Leaves' },
                  { id: 'insects', name: 'Insects & Bugs', icon: '🐛', role: 'Herbivore Pollinators' },
                  { id: 'frogs', name: 'Frogs & Birds', icon: '🐸', role: 'Insect Hunters' },
                  { id: 'jaguars', name: 'Jaguars', icon: '🐆', role: 'Apex Predators' }
                ].map((spec) => {
                  const isRemoved = removedSpecies === spec.id;
                  return (
                    <button
                      key={spec.id}
                      onClick={() => {
                        sound.playPop();
                        setRemovedSpecies(isRemoved ? null : spec.id);
                      }}
                      className={`p-4 rounded-2xl border-2 transition text-center cursor-pointer flex flex-col items-center ${
                        isRemoved
                          ? 'bg-rose-950/80 border-rose-500 opacity-60 scale-95 ring-2 ring-rose-400'
                          : 'bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105'
                      }`}
                    >
                      <span className="text-4xl mb-1">{spec.icon}</span>
                      <span className="text-sm font-black text-white">{spec.name}</span>
                      <span className="text-[10px] text-emerald-200 mt-0.5">{spec.role}</span>
                      <span className={`text-[10px] font-black uppercase mt-2 px-2 py-0.5 rounded-full ${isRemoved ? 'bg-rose-600 text-white' : 'bg-emerald-500 text-white'}`}>
                        {isRemoved ? 'Removed ❌' : 'Active ✅'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Cascade Explanation Banner */}
              <div className="mt-4 p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-emerald-100">
                <p>{content.cascade[removedSpecies] || content.cascade.none}</p>
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
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>{content.quizCta}</span>
                <Award className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 4: Quiz & Badge */}
        {part === 4 && (
          <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
            {quizDone ? (
              <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-3xl p-8 text-center flex flex-col items-center shadow-xl border-4 border-emerald-300">
                <span className="text-6xl mb-3">🐆 🏅</span>
                <span className="text-xs font-black uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full text-white mb-2">
                  Official SciTale Honor
                </span>
                <h3 className="text-3xl font-black mb-1">{content.badge}</h3>
                <p className="text-sm text-emerald-100 max-w-md font-semibold mb-6">
                  You scored {quizScore} out of {quizQuestions.length}! {content.badgeBlurb}
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
                    className="flex-1 py-3 px-4 bg-white text-emerald-950 font-black text-xs rounded-xl shadow transition cursor-pointer hover:scale-105"
                  >
                    Back to Library
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-xs font-black uppercase text-emerald-700">
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
                    let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-emerald-50';
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
                  <div className={`p-3.5 rounded-2xl border text-xs font-semibold animate-fade-in ${selectedAns === quizQuestions[quizIdx].correct ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-950'}`}>
                    {selectedAns === quizQuestions[quizIdx].correct ? quizQuestions[quizIdx].why : <>🐦 Beaky’s hint: {friendlyQuizHint(quizQuestions[quizIdx].why, quizQuestions[quizIdx].q)}</>}
                  </div>
                )}

                {selectedAns === quizQuestions[quizIdx].correct && (
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
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
      {part === 4 && quizDone && <TeachItBack adventureId="food_web" ageGroupId={ageGroupId} adventureName={content.banner} quizScore={quizScore} quizTotal={quizQuestions.length} quizMisses={quizMisses} quizErrors={quizErrors} quizItems={quizQuestions} />}
    </div>
  );
}
