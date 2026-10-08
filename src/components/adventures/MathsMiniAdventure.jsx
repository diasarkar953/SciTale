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
  Lightbulb,
  Scale,
  Shapes,
  Binary,
  Calculator
} from 'lucide-react';
import { sound } from '../../audio/soundEffects';
import { narrator } from '../../speech/speechNarrator';
import { getStoryLessons } from '../../data/storyLessons';
import AdventureScene from './AdventureScene';
import TeachItBack from '../TeachItBack';
import { beakyComment, beakyQuizReaction, friendlyQuizHint } from '../../beakyCompanion';

export default function MathsMiniAdventure({ topicId = 'basic_algebra', ageGroupId, onBack }) {
  const [part, setPart] = useState(1); // 1: Concept, 2: Interactive Puzzle, 3: Quiz
  const [isNarrating, setIsNarrating] = useState(false);

  // Algebra interactive balance state: X + 4 = 10 -> X = 6
  const [algebraGuess, setAlgebraGuess] = useState(0);
  const [algebraSolved, setAlgebraSolved] = useState(false);

  // Geometry interactive angle state
  const [geomAngle, setGeomAngle] = useState(90);

  // Patterns interactive state: 2, 4, 8, 16, ?
  const [patternPick, setPatternPick] = useState(null);

  // Numbers & Operations state: 7 x 8 = 56
  const [numOpPick, setNumOpPick] = useState(null);
  const [mathFeedback, setMathFeedback] = useState('');
  const [conceptPick, setConceptPick] = useState(null);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizMisses, setQuizMisses] = useState([]);
  const [quizErrors, setQuizErrors] = useState({});
  const [quizDone, setQuizDone] = useState(false);

  // Content configurations for different topics
  const configs = {
    basic_algebra: {
      title: "Basic Algebra: Balancing the Secret Variable X",
      icon: "⚖️",
      badge: "Equation Balancer Badge",
      color: "from-rose-500 to-pink-600",
      themeBg: "bg-rose-50 border-rose-200 text-rose-900",
      intro:
        "Algebra is like being a secret detective! The letter 'X' is simply an unknown mystery number hiding in disguise. An equation is like a balanced scale. Whatever you do to one side of the equal sign, you must do to the exact other side to keep it perfectly balanced!",
      quiz: [
        {
          q: "In the equation X + 5 = 12, what mystery number is hiding inside X?",
          options: ["5", "7", "17", "10"],
          correct: 1,
          why: "Correct! If you subtract 5 from both sides, 12 - 5 = 7, so X = 7!"
        },
        {
          q: "What does the equals sign (=) in an equation mean?",
          options: [
            "The right side is bigger than the left side",
            "Both sides have the exact same total value and balance out",
            "The equation is broken",
            "It means subtraction"
          ],
          correct: 1,
          why: "Spot on! The equals sign represents a balanced scale where both sides are equal."
        },
        {
          q: "If 2 × X = 16, what is the value of X?",
          options: ["8", "14", "32", "4"],
          correct: 0,
          why: "Awesome! 16 divided by 2 is 8, so X = 8!"
        }
      ]
    },

    geometry_shapes: {
      title: "Geometry & Angles: Secret Polygon Builder",
      icon: "📐",
      badge: "Geometry Architect Badge",
      color: "from-emerald-500 to-teal-600",
      themeBg: "bg-emerald-50 border-emerald-200 text-emerald-900",
      intro:
        "Geometry is the math of shapes, spaces, and angles! An angle measures the turn between two rays meeting at a point (vertex). A 90-degree angle makes a perfect square corner called a Right Angle. Angles less than 90 degrees are Acute (sharp and cute!), and angles greater than 90 degrees are Obtuse!",
      quiz: [
        {
          q: "What do mathematicians call an angle that forms a perfect 90° square corner like the corner of a book?",
          options: ["An acute angle", "A right angle", "An obtuse angle", "A round angle"],
          correct: 1,
          why: "Correct! Exactly 90 degrees is a Right Angle!"
        },
        {
          q: "How many sides does a Pentagon have?",
          options: ["3 sides", "4 sides", "5 sides", "6 sides"],
          correct: 2,
          why: "Exactly! Penta means five, so a pentagon has 5 sides!"
        },
        {
          q: "What is the perimeter of a square whose four sides each measure 5 cm?",
          options: ["10 cm", "20 cm", "25 cm", "15 cm"],
          correct: 1,
          why: "Spot on! 5 + 5 + 5 + 5 = 20 cm!"
        }
      ]
    },

    patterns_logic: {
      title: "Patterns & Logic: The Codebreaker’s Guild",
      icon: "🧩",
      badge: "Master Detective Badge",
      color: "from-purple-500 to-indigo-600",
      themeBg: "bg-purple-50 border-purple-200 text-purple-900",
      intro:
        "Patterns are repeating rules that govern numbers and nature! Whether it's counting by fives, doubling numbers, or finding Fibonacci spirals in sunflower seeds, your brain was built to spot patterns!",
      quiz: [
        {
          q: "What number comes next in this doubling sequence: 2, 4, 8, 16, ___?",
          options: ["24", "32", "20", "64"],
          correct: 1,
          why: "Correct! The rule is multiply by 2 each time. 16 × 2 = 32!"
        },
        {
          q: "In the sequence 50, 45, 40, 35, ___, what is the pattern rule?",
          options: ["Add 5 each time", "Subtract 5 each time", "Multiply by 5", "Divide by 2"],
          correct: 1,
          why: "Spot on! Each number decreases by 5."
        },
        {
          q: "If all cats have whiskers, and Leo is a cat, what can you logically deduce?",
          options: ["Leo likes swimming", "Leo has whiskers", "Leo is a dog", "Leo is purple"],
          correct: 1,
          why: "Perfect logical deduction! Valid premises lead to a true conclusion!"
        }
      ]
    },

    numbers_operations: {
      title: "Numbers & Operations: The Calculation Castle",
      icon: "🔢",
      badge: "Maths Math-Wiz Badge",
      color: "from-amber-500 to-orange-600",
      themeBg: "bg-amber-50 border-amber-200 text-amber-900",
      intro:
        "Numbers are the building blocks of mathematics! Multiplication is super-fast repeated addition. Instead of adding 7 eight times, you can simply multiply: 7 × 8 = 56! Place value gives each digit superpowers depending on whether it sits in the ones, tens, hundreds, or thousands place!",
      quiz: [
        {
          q: "What is the product of 7 × 8?",
          options: ["54", "56", "64", "48"],
          correct: 1,
          why: "Correct! 7 × 8 = 56!"
        },
        {
          q: "In the number 4,729, what is the place value of the digit 7?",
          options: ["7 Ones", "7 Tens", "7 Hundreds (700)", "7 Thousands"],
          correct: 2,
          why: "Spot on! The 7 is in the hundreds place, meaning it represents 700!"
        },
        {
          q: "What is 100 - 37?",
          options: ["73", "63", "53", "67"],
          correct: 1,
          why: "Awesome mental math! 100 - 37 = 63!"
        }
      ]
    }
  };

  const currConfig = configs[topicId] || configs.basic_algebra;
  const storyIntro = getStoryLessons('maths', ageGroupId, topicId);
  const mathsSceneItems = {
    basic_algebra: ['⚖️', '❔', '➖4', '6'],
    geometry_shapes: ['📐', '🔺', '90°', '⬜'],
    patterns_logic: ['🔍', '2', '4', '8', '16'],
    numbers_operations: ['7', '×', '8', '=', '56'],
  }[topicId] || ['🔢', '✨', '🧩', '⭐'];
  const conceptChallenge = {
    basic_algebra: { title: 'Help Beaky balance the scale!', prompt: 'X + 4 = 10. What belongs in the mystery box?', choices: ['4', '6', '14'], answer: '6', success: 'The scale balances! 6 + 4 makes 10.', hint: 'Take 4 away from 10 to find the hidden number.' },
    geometry_shapes: { title: 'Turn the Shape-O-Meter!', prompt: 'Tap an angle to see what kind of corner it makes.', choices: ['45°', '90°', '135°'], answer: '90°', success: 'Perfect corner! 90° is a right angle.', hint: 'A square corner measures exactly 90°.' },
    patterns_logic: { title: 'Crack the number code!', prompt: 'The code doubles each time: 2 → 4 → 8 → 16 → ?', choices: ['24', '32', '64'], answer: '32', success: 'Code cracked! Doubling 16 gives 32.', hint: 'Follow the rule: multiply the last number by 2.' },
    numbers_operations: { title: 'Pack the team kits!', prompt: 'There are 7 kits for each of 8 teams. How many kits?', choices: ['54', '56', '64'], answer: '56', success: 'All packed! 7 groups of 8 make 56.', hint: 'Think of 7 rows with 8 kits in every row.' },
  }[topicId] || { title: 'Maths explorer mini-puzzle', prompt: 'Choose an answer to reveal a hint.', choices: ['1', '2', '3'], answer: '2', success: 'Nice solving!', hint: 'Take another look at the story.' };

  const handleNarrate = (text) => {
    if (isNarrating) {
      narrator.stop();
      setIsNarrating(false);
    } else {
      sound.playPop();
      narrator.speak(text, () => setIsNarrating(false));
      setIsNarrating(true);
    }
  };

  const handleConceptChoice = (choice) => {
    setConceptPick(choice);
    if (choice === conceptChallenge.answer) {
      sound.playDing();
      beakyComment(conceptChallenge.success);
    } else {
      sound.playBoop();
    }
  };

  const handleSelectQuiz = (idx) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    const isCorrect = idx === currConfig.quiz[quizIdx].correct;
    beakyQuizReaction(isCorrect, 'maths', friendlyQuizHint(currConfig.quiz[quizIdx].why, currConfig.quiz[quizIdx].q));
    if (isCorrect) {
      sound.playDing();
      setQuizScore((s) => s + 1);
    } else {
      sound.playBoop();
      setQuizMisses((items) => items.includes(currConfig.quiz[quizIdx].why) ? items : [...items, currConfig.quiz[quizIdx].why]);
      setQuizErrors((items) => ({ ...items, [quizIdx]: (items[quizIdx] || 0) + 1 }));
    }
  };

  const handleRetryQuiz = () => { setSelectedAns(null); sound.playPop(); };

  const handleNextQuiz = () => {
    sound.playPop();
    if (quizIdx + 1 < currConfig.quiz.length) {
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
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border-2 border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
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
            Maths & Logic → {currConfig.title}
          </span>
        </div>

        {/* Part Tabs */}
        <div className="flex items-center gap-1.5">
          {['1. Concept', '2. Interactive Lab', '3. Quiz & Badge'].map((title, i) => (
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
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-slate-100 shadow-xl flex flex-col gap-6">
        
        {/* PART 1: Concept Overview */}
        {part === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  Part 1 of 2: Core Concept
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1 flex items-center gap-2">
                  <span>{currConfig.icon}</span>
                  <span>{currConfig.title}</span>
                </h2>
              </div>

              <button
                onClick={() => handleNarrate(storyIntro)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs md:text-sm text-white shadow-md transition cursor-pointer ${
                  isNarrating ? 'bg-rose-500 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isNarrating ? <Square className="w-4 h-4 fill-white" /> : <Volume2 className="w-4 h-4" />}
                <span>{isNarrating ? 'Stop Narration' : '🔊 Read to Me!'}</span>
              </button>
            </div>

            <AdventureScene items={mathsSceneItems} className="from-violet-50 via-sky-50 to-amber-50 border-indigo-100" />

            <div className={`p-6 rounded-3xl border-2 leading-relaxed font-semibold text-sm md:text-base ${currConfig.themeBg}`}>
              {storyIntro}
            </div>

            <section className="relative overflow-hidden rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-amber-50 p-5 md:p-6 shadow-inner">
              <span className="absolute -right-2 -top-5 text-7xl opacity-10 animate-bounce" aria-hidden="true">{currConfig.icon}</span>
              <div className="relative flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-indigo-700">Beaky’s quick-play puzzle</p>
                  <h3 className="mt-1 text-lg md:text-xl font-black text-slate-900">{conceptChallenge.title}</h3>
                  <p className="mt-1 text-sm font-bold text-slate-600">{conceptChallenge.prompt}</p>
                </div>
                <span className="animate-pulse rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">✨ Try it!</span>
              </div>
              <div className="relative mt-4 flex flex-wrap gap-2">
                {conceptChallenge.choices.map((choice, index) => {
                  const isPicked = conceptPick === choice;
                  const isRight = choice === conceptChallenge.answer;
                  return (
                    <button
                      key={choice}
                      onClick={() => handleConceptChoice(choice)}
                      className={`rounded-2xl border-2 px-5 py-3 text-sm font-black shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ${isPicked ? (isRight ? 'border-emerald-500 bg-emerald-500 text-white animate-bounce' : 'border-amber-400 bg-amber-100 text-amber-950') : 'border-white bg-white text-slate-800 hover:border-indigo-300'}`}
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
              {conceptPick && (
                <div key={`${topicId}-${conceptPick}`} role="status" className={`relative mt-3 rounded-2xl border px-4 py-3 text-sm font-black animate-[beakyPop_420ms_cubic-bezier(0.2,0.8,0.2,1)_both] ${conceptPick === conceptChallenge.answer ? 'border-emerald-300 bg-emerald-100 text-emerald-950' : 'border-amber-300 bg-amber-100 text-amber-950'}`}>
                  {conceptPick === conceptChallenge.answer ? `🎉 ${conceptChallenge.success}` : `🐦 ${conceptChallenge.hint}`}
                </div>
              )}
            </section>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  sound.playPop();
                  setPart(2);
                }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Part 2: Interactive Challenge!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 2: Interactive Puzzle Activity */}
        {part === 2 && (
          <div className="flex flex-col gap-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Part 2 of 2: Hands-On Activity
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Math Lab Interactive Challenge
              </h2>
            </div>

            {/* ALGEBRA BALANCING LAB */}
            {topicId === 'basic_algebra' && (
              <div className="bg-rose-50/70 border-2 border-rose-200 p-6 rounded-3xl flex flex-col items-center gap-4">
                <span className="text-xs font-black uppercase text-rose-800">
                  Equation Scale: Mystery X + 4 = 10
                </span>

                <div className="flex items-center justify-around w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-rose-100">
                  <div className="text-center">
                    <span className="text-3xl block font-black text-rose-700">X + 4</span>
                    <span className="text-xs font-bold text-slate-500">Left Pan</span>
                  </div>
                  <div className="text-3xl font-black text-rose-500">=</div>
                  <div className="text-center">
                    <span className="text-3xl block font-black text-slate-800">10</span>
                    <span className="text-xs font-bold text-slate-500">Right Pan</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-600 text-center">
                  What value of X balances the scale? Click a weight below:
                </div>

                <div className="flex gap-3">
                  {[4, 5, 6, 7].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setAlgebraGuess(num);
                        if (num === 6) {
                          sound.playDing();
                          setAlgebraSolved(true);
                          setMathFeedback('🎉 Beaky cheers: both sides balance because 6 + 4 = 10!');
                          beakyComment('The scale is balanced! You found the mystery number.');
                        } else {
                          sound.playBoop();
                          setAlgebraSolved(false);
                          setMathFeedback('🔎 Try removing 4 from 10. What number is left to balance the scale?');
                        }
                      }}
                      className={`px-5 py-3 rounded-2xl font-black text-sm border-2 transition cursor-pointer ${
                        algebraGuess === num
                          ? num === 6
                            ? 'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300'
                            : 'bg-rose-500 text-white border-rose-600'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-rose-400'
                      }`}
                    >
                      X = {num}
                    </button>
                  ))}
                </div>

                {algebraSolved && (
                  <div className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-2 rounded-xl text-xs font-black animate-bounce flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Balanced! 6 + 4 = 10! You solved the mystery variable X!</span>
                  </div>
                )}
              </div>
            )}

            {/* GEOMETRY ANGLE INSPECTOR */}
            {topicId === 'geometry_shapes' && (
              <div className="bg-emerald-50/70 border-2 border-emerald-200 p-6 rounded-3xl flex flex-col items-center gap-4">
                <span className="text-xs font-black uppercase text-emerald-800">
                  Angle Angleometer (Current: {geomAngle}°)
                </span>

                <div className="w-48 h-48 bg-white rounded-full border-4 border-emerald-400 flex items-center justify-center relative shadow-md">
                  <div className="absolute w-20 h-1 bg-slate-900 left-1/2 origin-left" />
                  <div
                    className="absolute w-20 h-1 bg-emerald-600 left-1/2 origin-left transition-transform duration-300"
                    style={{ transform: `rotate(-${geomAngle}deg)` }}
                  />
                  <div className="w-4 h-4 rounded-full bg-amber-500 z-10" />
                </div>

                <div className="text-center font-black text-sm">
                  {geomAngle < 90 && <span className="text-sky-600">Acute Angle (&lt;90°) — Sharp and cute!</span>}
                  {geomAngle === 90 && <span className="text-emerald-700">Right Angle (90°) — Perfect square corner!</span>}
                  {geomAngle > 90 && <span className="text-purple-700">Obtuse Angle (&gt;90°) — Wide and open!</span>}
                </div>

                <div className="flex gap-2">
                  {[45, 90, 135].map((ang) => (
                    <button
                      key={ang}
                      onClick={() => {
                        sound.playPop();
                        setGeomAngle(ang);
                        setMathFeedback(ang === 90 ? '✨ A perfect square corner is a right angle: exactly 90°!' : ang < 90 ? '🔍 This turn is smaller than 90°, so it is acute.' : '↗️ This turn opens wider than 90°, so it is obtuse.');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-black border-2 transition cursor-pointer ${
                        geomAngle === ang ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'
                      }`}
                    >
                      Set to {ang}°
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PATTERNS LAB */}
            {topicId === 'patterns_logic' && (
              <div className="bg-purple-50/70 border-2 border-purple-200 p-6 rounded-3xl flex flex-col items-center gap-4">
                <span className="text-xs font-black uppercase text-purple-800">
                  Sequence Puzzle: 3, 6, 9, 12, ___?
                </span>

                <div className="flex gap-2">
                  {[14, 15, 16, 18].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        setPatternPick(val);
                        if (val === 15) {
                          sound.playDing();
                          setMathFeedback('🎉 Beaky spotted it too: add 3 each time, so 12 becomes 15!');
                          beakyComment('Pattern spotted! The numbers grow by three each time.');
                        } else {
                          sound.playBoop();
                          setMathFeedback('🕵️ Look at the jump from 9 to 12. What same amount should you add to 12?');
                        }
                      }}
                      className={`px-5 py-3 rounded-2xl font-black text-sm border-2 transition cursor-pointer ${
                        patternPick === val
                          ? val === 15
                            ? 'bg-emerald-500 text-white'
                            : 'bg-rose-500 text-white'
                          : 'bg-white text-slate-800'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>

                {patternPick === 15 && (
                  <div className="bg-emerald-100 text-emerald-900 px-4 py-2 rounded-xl text-xs font-black animate-bounce">
                    🎉 Correct! The pattern rule is Add 3 (+3) each step!
                  </div>
                )}
              </div>
            )}

            {/* NUMBERS & OPERATIONS LAB */}
            {topicId === 'numbers_operations' && (
              <div className="bg-amber-50/70 border-2 border-amber-200 p-6 rounded-3xl flex flex-col items-center gap-4">
                <span className="text-xs font-black uppercase text-amber-800">
                  Quick Arithmetic: 9 × 6 = ___?
                </span>

                <div className="flex gap-2">
                  {[45, 54, 63, 56].map((ans) => (
                    <button
                      key={ans}
                      onClick={() => {
                        setNumOpPick(ans);
                        if (ans === 54) {
                          sound.playDing();
                          setMathFeedback('🎉 Great calculation! 9 groups of 6 make 54.');
                          beakyComment('Quick maths! You found the product of nine and six.');
                        } else {
                          sound.playBoop();
                          setMathFeedback('🧮 Try counting 9 groups of 6, or use 10 × 6 and take away one 6.');
                        }
                      }}
                      className={`px-5 py-3 rounded-2xl font-black text-sm border-2 transition cursor-pointer ${
                        numOpPick === ans
                          ? ans === 54
                            ? 'bg-emerald-500 text-white'
                            : 'bg-rose-500 text-white'
                          : 'bg-white text-slate-800'
                      }`}
                    >
                      {ans}
                    </button>
                  ))}
                </div>

                {numOpPick === 54 && (
                  <div className="bg-emerald-100 text-emerald-900 px-4 py-2 rounded-xl text-xs font-black animate-bounce">
                    🎉 Spot on! 9 × 6 = 54!
                  </div>
                )}
              </div>
            )}

            {mathFeedback && (
              <div
                key={mathFeedback}
                role="status"
                className={`mx-auto max-w-xl rounded-2xl border-2 px-5 py-3 text-center text-sm font-black shadow-md animate-[beakyPop_420ms_cubic-bezier(0.2,0.8,0.2,1)_both] ${((topicId === 'basic_algebra' && algebraSolved) || (topicId === 'geometry_shapes' && geomAngle === 90) || (topicId === 'patterns_logic' && patternPick === 15) || (topicId === 'numbers_operations' && numOpPick === 54)) ? 'border-emerald-300 bg-emerald-100 text-emerald-950' : 'border-amber-300 bg-amber-100 text-amber-950'}`}
              >
                {mathFeedback}
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setPart(1)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={() => {
                  sound.playFanfare();
                  setPart(3);
                }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Take the Math Quiz Challenge!</span>
                <Award className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PART 3: Quiz & Badge */}
        {part === 3 && (
          <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
            {quizDone ? (
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-8 text-center flex flex-col items-center shadow-xl border-4 border-indigo-300">
                <span className="text-6xl mb-3">🏅 📐</span>
                <span className="text-xs font-black uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full text-white mb-2">
                  Official SciTale Honor
                </span>
                <h3 className="text-3xl font-black mb-1">{currConfig.badge}</h3>
                <p className="text-sm text-indigo-100 max-w-md font-semibold mb-6">
                  You scored {quizScore} out of {currConfig.quiz.length}! You solved the challenges like a true math adventurer!
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
                    Question {quizIdx + 1} of {currConfig.quiz.length}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Score: {quizScore}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {currConfig.quiz[quizIdx].q}
                </h3>

                <div className="flex flex-col gap-2.5">
                  {currConfig.quiz[quizIdx].options.map((opt, i) => {
                    let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50';
                    if (selectedAns !== null) {
                      if (selectedAns === currConfig.quiz[quizIdx].correct && i === currConfig.quiz[quizIdx].correct) {
                        style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-300';
                      } else if (i === selectedAns) {
                        style = 'bg-rose-100 border-rose-400 text-rose-900 line-through';
                      } else if (selectedAns === currConfig.quiz[quizIdx].correct) {
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
                  <div className={`p-3.5 rounded-2xl border text-xs font-semibold animate-fade-in ${selectedAns === currConfig.quiz[quizIdx].correct ? 'bg-indigo-50 border-indigo-200 text-indigo-900' : 'bg-amber-50 border-amber-200 text-amber-950'}`}>
                    {selectedAns === currConfig.quiz[quizIdx].correct ? currConfig.quiz[quizIdx].why : <>🐦 Beaky’s hint: {friendlyQuizHint(currConfig.quiz[quizIdx].why, currConfig.quiz[quizIdx].q)}</>}
                  </div>
                )}

                {selectedAns === currConfig.quiz[quizIdx].correct && (
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
                  >
                    <span>{quizIdx + 1 === currConfig.quiz.length ? 'Claim My Badge!' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {selectedAns !== null && selectedAns !== currConfig.quiz[quizIdx].correct && <button onClick={handleRetryQuiz} className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-2xl shadow-md transition cursor-pointer">Try Again with Beaky’s Hint</button>}
              </div>
            )}
          </div>
        )}
      </div>
      {part === 3 && quizDone && <TeachItBack adventureId="maths_mini" topicId={topicId} ageGroupId={ageGroupId} adventureName={currConfig.title} quizScore={quizScore} quizTotal={currConfig.quiz.length} quizMisses={quizMisses} quizErrors={quizErrors} quizItems={currConfig.quiz} />}
    </div>
  );
}
