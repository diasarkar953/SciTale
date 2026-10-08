import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, BookOpen } from 'lucide-react';
import { quizQuestions } from '../data/storyData';
import { sound } from '../audio/soundEffects';
import SciTaleBird from './SciTaleBird';
import { beakyQuizReaction, friendlyQuizHint } from '../beakyCompanion';
import TeachItBack from './TeachItBack';

export default function Quiz({ onRestartStory, ageGroupId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizMisses, setQuizMisses] = useState([]);
  const [quizErrors, setQuizErrors] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizQuestions[currentIndex];

  const handleSelect = (idx) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQuestion.correctIndex;
    beakyQuizReaction(isCorrect, 'water-cycle', friendlyQuizHint(currentQuestion.explanation, currentQuestion.question));
    if (isCorrect) {
      sound.playDing();
      setScore((s) => s + 1);
    } else {
      sound.playBoop();
      setQuizMisses((items) => items.includes(currentQuestion.explanation) ? items : [...items, currentQuestion.explanation]);
      setQuizErrors((items) => ({ ...items, [currentIndex]: (items[currentIndex] || 0) + 1 }));
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    sound.playPop();
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      sound.playFanfare();
      // Burst confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 350);
    }
  };

  const handleRetake = () => {
    sound.playSplash();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizMisses([]);
    setQuizErrors({});
    setQuizFinished(false);
  };

  const getBadge = () => {
    if (score === 5) {
      return {
        title: "Master Hydrologist",
        grade: "Gold Medal Distinction",
        color: "from-amber-400 to-yellow-500",
        border: "border-amber-400",
        text: "text-amber-900",
        icon: "🏆",
        feedback: "Flawless score! You have completely mastered the secrets of Earth's water cycle!"
      };
    } else if (score >= 4) {
      return {
        title: "Cloud Captain",
        grade: "Silver Medal Honor",
        color: "from-slate-300 to-sky-400",
        border: "border-sky-300",
        text: "text-slate-800",
        icon: "🥈",
        feedback: "Superb job! You know the atmosphere and water cycles inside and out!"
      };
    } else if (score >= 3) {
      return {
        title: "Aqua Adventurer",
        grade: "Bronze Medal Honor",
        color: "from-amber-600 to-orange-400",
        border: "border-orange-400",
        text: "text-orange-950",
        icon: "🥉",
        feedback: "Well done! You have a great grasp of science. Keep investigating!"
      };
    } else {
      return {
        title: "Junior Droplet Explorer",
        grade: "Science Explorer Badge",
        color: "from-sky-300 to-blue-400",
        border: "border-blue-300",
        text: "text-blue-950",
        icon: "💧",
        feedback: "Nice effort! Every great scientist learns by exploring again. Give it another shot!"
      };
    }
  };

  const badge = getBadge();

  if (quizFinished) {
    return (
      <div className="bg-white rounded-3xl p-8 border-4 border-indigo-200 shadow-2xl max-w-2xl mx-auto flex flex-col items-center text-center animate-fade-in">
        
        {/* Celebration Header */}
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-widest mb-1">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Mission Completed!
        </div>

        <h2 className="text-3xl font-black text-slate-900 mb-2">
          Your Water Cycle Report Card
        </h2>

        {/* Score Pill */}
        <div className="bg-indigo-50 border-2 border-indigo-200 text-indigo-900 px-6 py-2 rounded-2xl text-lg font-black mb-6">
          Score: {score} out of {quizQuestions.length} ({Math.round((score / quizQuestions.length) * 100)}%)
        </div>

        {/* Official Badge Card */}
        <div className={`w-full bg-gradient-to-br ${badge.color} p-6 rounded-3xl shadow-xl border-4 ${badge.border} text-center flex flex-col items-center mb-6 transform hover:scale-102 transition-transform`}>
          <div className="text-6xl mb-2 drop-shadow-md">{badge.icon}</div>
          <div className="text-xs uppercase font-extrabold tracking-wider bg-white/40 px-3 py-1 rounded-full text-slate-900 mb-1">
            {badge.grade}
          </div>
          <h3 className="text-2xl font-black text-slate-950 mb-1">
            {badge.title}
          </h3>
          <p className="text-sm font-semibold text-slate-900/90 max-w-md">
            {badge.feedback}
          </p>
        </div>

        {/* Beaky Mascot Congrats */}
        <div className="mb-6 flex flex-col items-center">
          <SciTaleBird className="w-[120px] h-[120px]" showMessages={false} />
          <p className="mt-2 rounded-2xl border-2 border-sky-200 bg-sky-50 px-4 py-2 text-sm font-black text-indigo-900">
            Beaky chirps: High five! You earned the {badge.title} badge!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={handleRetake}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-extrabold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </button>

          <button
            onClick={onRestartStory}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            Re-read Story Chapters
          </button>
        </div>
        <TeachItBack adventureId="water_cycle" ageGroupId={ageGroupId} adventureName="The Water Cycle Adventure" quizScore={score} quizTotal={quizQuestions.length} quizMisses={quizMisses} quizErrors={quizErrors} quizItems={quizQuestions} />
      </div>
    );
  }

  return (
    <div key={currentIndex} className="bg-white rounded-3xl p-6 md:p-8 border-4 border-indigo-200 shadow-xl max-w-2xl mx-auto flex flex-col gap-6 animate-fade-in">
      
      {/* Quiz Progress Header */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block">
            Science Checkpoint
          </span>
          <h2 className="text-xl font-black text-slate-900">
            Question {currentIndex + 1} of {quizQuestions.length}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-300 text-amber-800 px-3 py-1.5 rounded-xl font-bold text-xs">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Current Score: {score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Text */}
      <div className="text-base md:text-lg font-extrabold text-slate-800 leading-snug">
        {currentQuestion.question}
      </div>

      {/* Options List */}
      <div className="flex flex-col gap-3">
        {currentQuestion.options.map((option, idx) => {
          let btnStyle = 'bg-slate-50 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 text-slate-800';

          if (isAnswered) {
            if (selectedOption === currentQuestion.correctIndex && idx === currentQuestion.correctIndex) {
              btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-300';
            } else if (idx === selectedOption) {
              btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 line-through';
            } else {
              btnStyle = 'bg-slate-50 border-slate-200 opacity-60 text-slate-500';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`p-4 rounded-2xl border-2 text-left font-bold text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
            >
              <span>{option}</span>
              {isAnswered && selectedOption === currentQuestion.correctIndex && idx === currentQuestion.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              )}
              {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Explanation Box */}
      {isAnswered && (
        <div
          className={`p-4 rounded-2xl border text-xs md:text-sm font-semibold flex flex-col gap-1 animate-fade-in ${
            selectedOption === currentQuestion.correctIndex
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}
        >
          <div className="font-black flex items-center gap-1.5">
            {selectedOption === currentQuestion.correctIndex ? '🎉 Excellent Deduction!' : '🐦 Beaky’s friendly hint:'}
          </div>
          <div>{selectedOption === currentQuestion.correctIndex ? currentQuestion.explanation : friendlyQuizHint(currentQuestion.explanation, currentQuestion.question)}</div>
        </div>
      )}

      {/* Next Question Button */}
      {isAnswered && selectedOption === currentQuestion.correctIndex && (
        <button
          onClick={handleNext}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-base rounded-2xl shadow-lg flex items-center justify-center gap-2 transition hover:scale-102 cursor-pointer"
        >
          <span>{currentIndex + 1 === quizQuestions.length ? 'See My Official Badge!' : 'Next Question'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
      {isAnswered && selectedOption !== currentQuestion.correctIndex && (
        <button onClick={handleRetry} className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer">
          <span>Try Again with Beaky’s Hint</span>
          <RotateCcw className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
