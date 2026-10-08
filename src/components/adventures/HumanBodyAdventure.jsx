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
  CheckCircle2
} from 'lucide-react';
import { sound } from '../../audio/soundEffects';
import { narrator } from '../../speech/speechNarrator';
import { pickAge } from '../../data/ageLevels';
import { humanBodyByAge } from '../../data/adventureContent';
import { getStoryLessons } from '../../data/storyLessons';
import AdventureScene from './AdventureScene';
import TeachItBack from '../TeachItBack';
import { beakyComment, beakyQuizReaction, friendlyQuizHint } from '../../beakyCompanion';

export default function HumanBodyAdventure({ onBack, ageGroupId }) {
  const content = pickAge(humanBodyByAge, ageGroupId);
  const story = getStoryLessons('human_body', ageGroupId);
  const [part, setPart] = useState(1); // 1: Brain & Nerves, 2: Five Senses, 3: Sensory Game, 4: Quiz
  const [isNarrating, setIsNarrating] = useState(false);

  const lessonTextPart1 = story[0];
  const lessonTextPart2 = story[1];
  const sensoryChallenges = content.sensoryChallenges;
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [challengeScore, setChallengeScore] = useState(0);
  const [challengeFeedback, setChallengeFeedback] = useState(null);

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

  const handleAnswerChallenge = (organ) => {
    const curr = sensoryChallenges[challengeIdx];
    if (organ === curr.answer) {
      sound.playDing();
      setChallengeFeedback({ correct: true, text: `Correct! Your ${curr.organName} detected that!` });
      setChallengeScore((s) => s + 1);
      beakyComment(`Nice detective work! Your ${curr.organName} noticed the clue.`);
    } else {
      sound.playBoop();
      setChallengeFeedback({ correct: false, text: `Not quite! That was detected by your ${curr.organName}.` });
      beakyComment(`Good try! Think about which sense would notice that clue.`);
    }

    setTimeout(() => {
      setChallengeFeedback(null);
      if (challengeIdx + 1 < sensoryChallenges.length) {
        setChallengeIdx(challengeIdx + 1);
      }
    }, 1200);
  };

  const handleSelectQuiz = (idx) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    const isCorrect = idx === quizQuestions[quizIdx].correct;
    beakyQuizReaction(isCorrect, 'body', friendlyQuizHint(quizQuestions[quizIdx].why, quizQuestions[quizIdx].q));
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
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
                  : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-indigo-100 shadow-xl flex flex-col gap-6">
        
        {/* PART 1: Brain and Nervous System (Visible Lesson Text + Cards) */}
        {part === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  {content.part1Badge}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  {content.part1Title}
                </h2>
              </div>

              <button
                onClick={() => handleNarrate(lessonTextPart1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs md:text-sm text-white shadow-md transition cursor-pointer ${
                  isNarrating ? 'bg-rose-500 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isNarrating ? <Square className="w-4 h-4 fill-white" /> : <Volume2 className="w-4 h-4" />}
                <span>{isNarrating ? 'Stop Narration' : '🔊 Read to Me!'}</span>
              </button>
            </div>

            <AdventureScene items={['👀', '👂', '🧠', '⚡']} className="from-indigo-50 via-sky-50 to-pink-50 border-indigo-100" />

            {/* Complete Visible Lesson Paragraphs */}
            <div className="space-y-3">
              {lessonTextPart1.map((p, idx) => (
                <div key={idx} className="bg-indigo-50/70 border border-indigo-200/80 p-3.5 rounded-2xl text-xs md:text-sm text-indigo-950 font-semibold leading-relaxed">
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
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>{content.next1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 2: Five Senses & Response (Visible Lesson Text + Cards) */}
        {part === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  {content.part2Badge}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  {content.part2Title}
                </h2>
              </div>

              <button
                onClick={() => handleNarrate(lessonTextPart2)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs md:text-sm text-white shadow-md transition cursor-pointer ${
                  isNarrating ? 'bg-rose-500 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isNarrating ? <Square className="w-4 h-4 fill-white" /> : <Volume2 className="w-4 h-4" />}
                <span>{isNarrating ? 'Stop Narration' : '🔊 Read to Me!'}</span>
              </button>
            </div>

            {/* Complete Visible Lesson Paragraphs */}
            <div className="space-y-3">
              {lessonTextPart2.map((p, idx) => (
                <div key={idx} className="bg-indigo-50/70 border border-indigo-200/80 p-3.5 rounded-2xl text-xs md:text-sm text-indigo-950 font-semibold leading-relaxed">
                  {p}
                </div>
              ))}
            </div>

            {/* 5 Senses Flashcards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {content.senseCards.map((s, idx) => (
                <div key={idx} className="bg-slate-50 border-2 border-slate-200 p-4 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-3xl mb-1 block">{s.icon}</span>
                    <h4 className="text-xs font-black text-slate-900">{s.name}</h4>
                    <span className="text-[10px] text-indigo-700 font-bold block">{s.organ}</span>
                    <p className="text-[11px] text-slate-600 font-medium mt-1 leading-tight">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-xs text-indigo-950 font-semibold leading-relaxed flex items-center gap-3">
              <Zap className="w-6 h-6 text-indigo-600 flex-shrink-0" />
              <span>
                <strong>Reflex:</strong> {content.reflexNote}
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
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>{content.next2}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 3: "Which Sense?" Interactive Challenge */}
        {part === 3 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  Part 3 of 3: Interactive Challenge
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                  {content.challengeTitle}
                </h2>
                <p className="text-xs text-slate-500 font-bold mt-0.5">
                  {content.challengeHint}
                </p>
              </div>

              <div className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl">
                Score: {challengeScore} / {sensoryChallenges.length}
              </div>
            </div>

            {/* Current Scenario Card */}
            <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white p-6 rounded-3xl text-center shadow-lg border-2 border-indigo-400">
              <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-200 block mb-1">
                Scenario #{challengeIdx + 1}
              </span>
              <p className="text-lg md:text-xl font-black max-w-lg mx-auto">
                "{sensoryChallenges[challengeIdx].prompt}"
              </p>

              {challengeFeedback && (
                <div className={`mt-3 inline-block px-4 py-1.5 rounded-xl text-xs font-black ${challengeFeedback.correct ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                  {challengeFeedback.text}
                </div>
              )}
            </div>

            {/* Sensory Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {content.organButtons.map((organ) => (
                <button
                  key={organ.id}
                  onClick={() => handleAnswerChallenge(organ.id)}
                  className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-indigo-400 hover:shadow-md hover:scale-105 active:scale-95 transition flex flex-col items-center cursor-pointer text-center"
                >
                  <span className="text-3xl mb-1">{organ.icon}</span>
                  <span className="text-xs font-black text-slate-800">{organ.name}</span>
                </button>
              ))}
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
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-sm rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer hover:scale-105"
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
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-8 text-center flex flex-col items-center shadow-xl border-4 border-indigo-300">
                <span className="text-6xl mb-3">🧠 🏅</span>
                <span className="text-xs font-black uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full text-white mb-2">
                  Official SciTale Honor
                </span>
                <h3 className="text-3xl font-black mb-1">{content.badge}</h3>
                <p className="text-sm text-indigo-100 max-w-md font-semibold mb-6">
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
                    className="flex-1 py-3 px-4 bg-white text-indigo-950 font-black text-xs rounded-xl shadow transition cursor-pointer hover:scale-105"
                  >
                    Back to Library
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-xs font-black uppercase text-indigo-700">
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
                    let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50';
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
                  <div className={`p-3.5 rounded-2xl border text-xs font-semibold animate-fade-in ${selectedAns === quizQuestions[quizIdx].correct ? 'bg-indigo-50 border-indigo-200 text-indigo-900' : 'bg-amber-50 border-amber-200 text-amber-950'}`}>
                    {selectedAns === quizQuestions[quizIdx].correct ? quizQuestions[quizIdx].why : <>🐦 Beaky’s hint: {friendlyQuizHint(quizQuestions[quizIdx].why, quizQuestions[quizIdx].q)}</>}
                  </div>
                )}

                {selectedAns === quizQuestions[quizIdx].correct && (
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
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
      {part === 4 && quizDone && <TeachItBack adventureId="human_body" ageGroupId={ageGroupId} adventureName={content.banner} quizScore={quizScore} quizTotal={quizQuestions.length} quizMisses={quizMisses} quizErrors={quizErrors} quizItems={quizQuestions} />}
    </div>
  );
}
