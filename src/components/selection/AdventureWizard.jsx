import React, { useState } from 'react';
import {
  subjects,
  ageGroups,
  topicsMap,
  getSubtopicsForTopic
} from '../../data/curriculumData';
import { sound } from '../../audio/soundEffects';
import SciTaleBird from '../SciTaleBird';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Clock,
  BookOpen,
  Award,
  Lock,
  ChevronRight,
  Flame,
  CheckCircle2,
  Compass
} from 'lucide-react';

export default function AdventureWizard({ onStartAdventure }) {
  const [step, setStep] = useState(1); // 1: Subject, 2: Age, 3: Topic, 4: Subtopic
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [comingSoonModalData, setComingSoonModalData] = useState(null);

  // Steps configuration for the progress indicator
  const stepsConfig = [
    { num: 1, label: 'Subject', icon: '🧪' },
    { num: 2, label: 'Age Group', icon: '🌱' },
    { num: 3, label: 'Topic', icon: '🌍' },
    { num: 4, label: 'Adventure', icon: '🚀' }
  ];

  // Step 1: Select Subject
  const handleSelectSubject = (subj) => {
    sound.playPop();
    setSelectedSubject(subj);
    setStep(2);
  };

  // Step 2: Select Age
  const handleSelectAge = (age) => {
    sound.playPop();
    setSelectedAge(age);
    setStep(3);
  };

  // Step 3: Select Topic
  const handleSelectTopic = (top) => {
    sound.playPop();
    setSelectedTopic(top);
    setStep(4);
  };

  // Step 4: Select Subtopic
  const handleSelectSubtopic = (sub) => {
    if (sub.status === 'ready') {
      sound.playFanfare();
      onStartAdventure({
        subject: selectedSubject,
        ageGroup: selectedAge,
        topic: selectedTopic,
        subtopic: sub
      });
    } else {
      sound.playBoop();
      setComingSoonModalData(sub);
    }
  };

  // Get active topics list
  const currentTopicKey = `${selectedSubject?.id}:${selectedAge?.id}`;
  const availableTopics = topicsMap[currentTopicKey] || [];
  const availableSubtopics = selectedTopic ? getSubtopicsForTopic(selectedTopic.id) : [];

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full py-4">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="z-10 flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-black mb-3 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Storybook Science for Young Inquirers</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
            Welcome to SciTale! 🌟
          </h1>
          <p className="text-sm md:text-base text-sky-100 max-w-lg leading-relaxed font-semibold">
            Choose your subject, age group, and topic to embark on an interactive story-driven learning quest.
          </p>

          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-sm font-bold text-amber-200">
              Meet Beaky, your curious little science sidekick!
            </p>
            <p className="text-xs text-sky-100 mt-1">
              Pick a path and let’s discover something amazing together.
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 z-10">
          <SciTaleBird className="w-36 h-36 md:w-44 md:h-44 drop-shadow-xl" />
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Progress Indicator: Subject -> Age -> Topic -> Adventure */}
      <div className="bg-white rounded-2xl p-4 border-2 border-sky-100 shadow-sm">
        <div className="flex items-center justify-between max-w-3xl mx-auto relative">
          
          {/* Connector Line behind steps */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 bg-slate-100 -z-0">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-500"
              style={{
                width: `${((step - 1) / (stepsConfig.length - 1)) * 100}%`
              }}
            />
          </div>

          {stepsConfig.map((s) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;

            return (
              <button
                key={s.num}
                onClick={() => {
                  if (s.num < step) {
                    sound.playPop();
                    setStep(s.num);
                  }
                }}
                disabled={s.num > step}
                className={`flex flex-col items-center gap-1 relative z-10 transition-transform ${
                  s.num <= step ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shadow-md transition-all ${
                    isCurrent
                      ? 'bg-sky-600 text-white ring-4 ring-sky-200 scale-110'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-slate-400 border-2 border-slate-200'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-6 h-6 text-white" /> : s.icon}
                </div>
                <span
                  className={`text-xs font-black ${
                    isCurrent
                      ? 'text-sky-800'
                      : isCompleted
                      ? 'text-emerald-700'
                      : 'text-slate-400'
                  }`}
                >
                  Step {s.num}: {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selection Area */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-sky-100 shadow-xl flex flex-col gap-6 min-h-[420px] justify-between">
        
        {/* Step 1: Choose Subject */}
        {step === 1 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                Step 1 of 4
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
                Choose Your Subject
              </h2>
              <p className="text-sm text-slate-500 font-semibold mt-1">
                What realm of discovery do you want to explore today?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
              {subjects.map((subj) => (
                <div
                  key={subj.id}
                  onClick={() => handleSelectSubject(subj)}
                  className={`p-6 rounded-3xl border-3 transition-all cursor-pointer flex flex-col justify-between group hover:shadow-2xl hover:scale-102 ${
                    selectedSubject?.id === subj.id
                      ? 'border-sky-500 bg-sky-50/70 ring-4 ring-sky-200 shadow-xl'
                      : 'border-slate-200 bg-white hover:border-sky-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                        {subj.icon}
                      </div>
                      <span className="text-xs font-black uppercase px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                        Explore
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      {subj.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      {subj.tagline}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-sky-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Select Subject <ChevronRight className="w-4 h-4" />
                    </span>
                    <span className="text-xl">{subj.mascotEmoji}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Grade / Age */}
        {step === 2 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                Step 2 of 4 • Subject: {selectedSubject?.title}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
                Choose Your Age / Grade Group
              </h2>
              <p className="text-sm text-slate-500 font-semibold mt-1">
                Stories and experiments adapt to your age level!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto w-full">
              {ageGroups.map((age) => (
                <div
                  key={age.id}
                  onClick={() => handleSelectAge(age)}
                  className={`p-6 rounded-3xl border-3 transition-all cursor-pointer flex flex-col justify-between group hover:shadow-2xl hover:scale-102 ${
                    selectedAge?.id === age.id
                      ? 'border-indigo-500 bg-indigo-50/70 ring-4 ring-indigo-200 shadow-xl'
                      : 'border-slate-200 bg-white hover:border-indigo-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                        {age.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-1">
                      {age.label}
                    </h3>
                    <div className="text-xs font-black text-indigo-600 mb-2">
                      {age.subtitle}
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {age.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-indigo-700">
                    <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Pick {age.label} <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Choose Topic */}
        {step === 3 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                Step 3 of 4 • {selectedSubject?.title} ({selectedAge?.label})
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
                Choose a Topic
              </h2>
              <p className="text-sm text-slate-500 font-semibold mt-1">
                Select a scientific realm to explore with Beaky and friends!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
              {availableTopics.map((top) => (
                <div
                  key={top.id}
                  onClick={() => handleSelectTopic(top)}
                  className={`p-5 rounded-3xl border-3 transition-all cursor-pointer flex items-start gap-4 group hover:shadow-xl hover:scale-102 ${
                    top.featured
                      ? 'border-sky-400 bg-sky-50/70 ring-2 ring-sky-200'
                      : 'border-slate-200 bg-white hover:border-sky-300'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                    {top.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-black text-slate-900 truncate">
                        {top.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {top.desc}
                    </p>
                    <div className="mt-3 text-xs font-black text-sky-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Adventures <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Choose Subtopic / Adventure */}
        {step === 4 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                Step 4 of 4 • Topic: {selectedTopic?.title}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
                Choose Your Adventure
              </h2>
              <p className="text-sm text-slate-500 font-semibold mt-1">
                Pick a tale to start reading, experimenting, and quizzing!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto w-full">
              {availableSubtopics.map((sub) => {
                const isLive = sub.status === 'ready';

                return (
                  <div
                    key={sub.id}
                    onClick={() => handleSelectSubtopic(sub)}
                    className={`p-6 rounded-3xl border-3 transition-all cursor-pointer flex flex-col justify-between group hover:shadow-2xl hover:scale-102 ${
                      isLive
                        ? 'border-emerald-400 bg-gradient-to-br from-white to-emerald-50/50 shadow-xl ring-4 ring-emerald-100'
                        : 'border-slate-200 bg-white hover:border-slate-300 opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div>
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                          {sub.icon}
                        </div>

                        {isLive ? (
                          <span className="text-xs font-black uppercase tracking-wider bg-emerald-500 text-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1 animate-pulse">
                            <Sparkles className="w-3.5 h-3.5" /> Play Now!
                          </span>
                        ) : (
                          <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5" /> Coming Soon
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 leading-snug">
                        {sub.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                        {sub.desc}
                      </p>
                    </div>

                    {/* Metadata Pill and Launch Button */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 mb-4">
                        <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {sub.duration}
                        </span>
                        {sub.chaptersCount && (
                          <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                            {sub.chaptersCount} Chapters
                          </span>
                        )}
                        {sub.hasQuiz && (
                          <span className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg">
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            Quiz & Badge
                          </span>
                        )}
                      </div>

                      {isLive ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectSubtopic(sub);
                          }}
                          className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-102"
                        >
                          <span>Start Adventure!</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="w-full py-3 px-4 bg-slate-100 text-slate-500 text-center font-bold text-xs rounded-2xl border border-slate-200 flex items-center justify-center gap-1.5">
                          <span>Coming Soon in Next Chapter Pack</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Back and Breadcrumb Footer */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => {
                sound.playPop();
                setStep(step - 1);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs md:text-sm transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <div className="text-xs font-bold text-slate-400">
            Selection: {selectedSubject?.title || '—'} → {selectedAge?.label || '—'} → {selectedTopic?.title || '—'}
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {comingSoonModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-indigo-200 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-3xl mb-3 shadow">
              {comingSoonModalData.icon}
            </div>

            <span className="text-xs font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full border border-indigo-200 mb-2">
              Under Construction 🚀
            </span>

            <h3 className="text-xl font-black text-slate-900 mb-2">
              {comingSoonModalData.title}
            </h3>

            <p className="text-xs md:text-sm text-slate-600 font-medium mb-6 leading-relaxed">
              Beaky and our team of junior science storytellers are currently creating this interactive adventure! Try our completed live adventure: <strong>The Water Cycle</strong>!
            </p>

            <div className="flex flex-col gap-2.5 w-full">
              <button
                onClick={() => {
                  setComingSoonModalData(null);
                  handleQuickLaunchWaterCycle();
                }}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>💧 Play The Water Cycle Adventure Instead!</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  setComingSoonModalData(null);
                }}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Close & Keep Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
