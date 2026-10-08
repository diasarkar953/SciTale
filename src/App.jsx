import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import AdventureWizard from './components/selection/AdventureWizard';
import WelcomeScreen from './components/WelcomeScreen';
import BeakyPopIn from './components/BeakyPopIn';
import Chapter1Evaporation from './components/chapters/Chapter1Evaporation';
import Chapter2Condensation from './components/chapters/Chapter2Condensation';
import Chapter3Precipitation from './components/chapters/Chapter3Precipitation';
import Chapter4Infiltration from './components/chapters/Chapter4Infiltration';
import Chapter5FullCircle from './components/chapters/Chapter5FullCircle';
import Quiz from './components/Quiz';
import GlossaryModal from './components/GlossaryModal';
import VoiceSelectorModal from './components/VoiceSelectorModal';
import ParentTeacherReport from './components/ParentTeacherReport';

// New Playable Adventures
import FoodWebAdventure from './components/adventures/FoodWebAdventure';
import PhotosynthesisAdventure from './components/adventures/PhotosynthesisAdventure';
import HumanBodyAdventure from './components/adventures/HumanBodyAdventure';
import SolarSystemAdventure from './components/adventures/SolarSystemAdventure';
import FractionsAdventure from './components/adventures/FractionsAdventure';
import MathsMiniAdventure from './components/adventures/MathsMiniAdventure';
import ForcesMotionAdventure from './components/adventures/ForcesMotionAdventure';

import { storyChapters } from './data/storyData';
import { sound } from './audio/soundEffects';
import { narrator } from './speech/speechNarrator';
import {
  Volume2,
  Square,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Award,
  Compass,
  Mic,
  ChevronRight,
  Home
} from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  // App starts on the guided 4-step selection flow
  const [viewMode, setViewMode] = useState('selection'); // 'selection' | 'adventure'
  const [activeAdventure, setActiveAdventure] = useState(null);

  // Water Cycle Adventure state (preserved 100%)
  const [currentChapter, setCurrentChapter] = useState(1);
  const [completedChapters, setCompletedChapters] = useState([1]);
  const [isMuted, setIsMuted] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [selectedVoiceName, setSelectedVoiceName] = useState('Default Voice');
  const [parentReportData, setParentReportData] = useState(null);
  const reportReturnScroll = useRef(0);

  useEffect(() => {
    const openReport = (event) => {
      reportReturnScroll.current = window.scrollY;
      setParentReportData(event.detail);
    };
    window.addEventListener('scytale:open-learning-report', openReport);
    return () => window.removeEventListener('scytale:open-learning-report', openReport);
  }, []);

  useEffect(() => {
    if (parentReportData) window.scrollTo({ top: 0, behavior: 'instant' });
    else if (reportReturnScroll.current) window.scrollTo({ top: reportReturnScroll.current, behavior: 'instant' });
  }, [parentReportData]);

  // Listen to voice changes from narrator
  useEffect(() => {
    const updateVoiceName = () => {
      const v = narrator.getSelectedVoice();
      if (v) setSelectedVoiceName(v.name);
    };
    updateVoiceName();
    const unsub = narrator.subscribe(updateVoiceName);
    return () => unsub();
  }, []);

  // Stop narration on chapter or view change
  useEffect(() => {
    narrator.stop();
    setIsNarrating(false);
  }, [currentChapter, viewMode]);

  const chapterData = storyChapters.find((ch) => ch.id === currentChapter) || storyChapters[0];

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  // Upbeat, child-friendly narrative storyteller for Water Cycle
  const handleNarrate = () => {
    if (isNarrating) {
      narrator.stop();
      setIsNarrating(false);
    } else {
      sound.playPop();
      const narrativeScript = [
        `Chapter ${chapterData.id}! ${chapterData.title}.`,
        `${chapterData.subtitle}.`,
        ...chapterData.narrative,
        `Here is a cool science fact! ${chapterData.scienceFact}`,
        `And a secret science discovery: ${chapterData.secretFact}`
      ].join(' ');

      narrator.speak(narrativeScript, () => {
        setIsNarrating(false);
      });
      setIsNarrating(true);
    }
  };

  const handleCompleteCurrent = () => {
    if (!completedChapters.includes(currentChapter)) {
      setCompletedChapters([...completedChapters, currentChapter]);
    }
  };

  const handleNextChapter = () => {
    narrator.stop();
    setIsNarrating(false);
    sound.playPop();

    if (currentChapter < 5) {
      const next = currentChapter + 1;
      setCurrentChapter(next);
      if (!completedChapters.includes(next)) {
        setCompletedChapters([...completedChapters, next]);
      }
    } else if (currentChapter === 5) {
      setCurrentChapter(6); // Quiz mode
      sound.playFanfare();
    }
  };

  const handlePrevChapter = () => {
    narrator.stop();
    setIsNarrating(false);
    sound.playPop();
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleStartAdventure = (adventureConfig) => {
    setActiveAdventure(adventureConfig);
    setCurrentChapter(1);
    setCompletedChapters([1]);
    setViewMode('adventure');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSelection = () => {
    narrator.stop();
    setIsNarrating(false);
    sound.playPop();
    setViewMode('selection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveStage = () => {
    switch (currentChapter) {
      case 1:
        return <Chapter1Evaporation onComplete={handleCompleteCurrent} />;
      case 2:
        return <Chapter2Condensation onComplete={handleCompleteCurrent} />;
      case 3:
        return <Chapter3Precipitation onComplete={handleCompleteCurrent} />;
      case 4:
        return <Chapter4Infiltration onComplete={handleCompleteCurrent} />;
      case 5:
        return (
          <Chapter5FullCircle
            onStartQuiz={() => {
              setCurrentChapter(6);
              sound.playFanfare();
            }}
          />
        );
      case 6:
        return (
          <Quiz
            ageGroupId={activeAdventure?.ageGroup?.id}
            onRestartStory={() => {
              setCurrentChapter(1);
              sound.playSplash();
            }}
          />
        );
      default:
        return null;
    }
  };

  // Determine active adventure component
  const subtopicId = activeAdventure?.subtopic?.id;
  const isWaterCycle = !subtopicId || subtopicId === 'water_cycle';

  if (!hasEntered) {
    return (
      <WelcomeScreen
        onEnter={() => {
          sound.playBirdChirp();
          setHasEntered(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-indigo-50/40 to-sky-100 flex flex-col font-sans text-slate-800 animate-fade-in">
      <div className={parentReportData ? 'hidden' : 'contents'}>
      {/* Top Header */}
      <Header
        viewMode={viewMode}
        activeAdventureName={activeAdventure?.subtopic?.title || 'The Water Cycle Adventure'}
        activeChapter={isWaterCycle ? currentChapter : undefined}
        onSelectChapter={(ch) => setCurrentChapter(ch)}
        onBackToSelection={handleBackToSelection}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        selectedVoiceName={selectedVoiceName}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        
        {/* VIEW 1: 4-Step Selection Flow */}
        {viewMode === 'selection' ? (
          <AdventureWizard onStartAdventure={handleStartAdventure} />
        ) : (
          /* VIEW 2: Active Adventure */
          <>
            {/* 1. Life Science -> Rainforest Food Web */}
            {subtopicId === 'food_web' ? (
              <FoodWebAdventure onBack={handleBackToSelection} ageGroupId={activeAdventure?.ageGroup?.id} />
            ) : /* 2. Life Science -> Plants & Photosynthesis */
            subtopicId === 'photosynthesis' ? (
              <PhotosynthesisAdventure onBack={handleBackToSelection} ageGroupId={activeAdventure?.ageGroup?.id} />
            ) : /* 3. Human Biology -> Human Body & Senses */
            subtopicId === 'human_body_senses' ? (
              <HumanBodyAdventure onBack={handleBackToSelection} ageGroupId={activeAdventure?.ageGroup?.id} />
            ) : /* 4. Space & Solar System */
            subtopicId === 'solar_system' ? (
              <SolarSystemAdventure onBack={handleBackToSelection} ageGroupId={activeAdventure?.ageGroup?.id} />
            ) : /* 5. Maths -> Fractions in the Real World */
            subtopicId === 'fractions_real_world' ? (
              <FractionsAdventure onBack={handleBackToSelection} ageGroupId={activeAdventure?.ageGroup?.id} />
            ) : subtopicId === 'forces_motion_adventure' ? (
              <ForcesMotionAdventure onBack={handleBackToSelection} ageGroupId={activeAdventure?.ageGroup?.id} />
            ) : /* 6. Other Maths Topics (Numbers, Geometry, Patterns, Algebra) */
            activeAdventure?.subject?.id === 'maths' ? (
              <MathsMiniAdventure
                topicId={activeAdventure?.topic?.id}
                ageGroupId={activeAdventure?.ageGroup?.id}
                onBack={handleBackToSelection}
              />
            ) : (
              /* 7. Earth & Environment -> Water Cycle (Pip's Original Full Adventure) */
              <>
                {/* Active Adventure Breadcrumb & Switcher */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border-2 border-sky-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleBackToSelection}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-black transition cursor-pointer shadow-2xs hover:scale-105"
                      title="Return to Library / All Adventures"
                    >
                      <Home className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Library / Home</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <span className="text-sky-700 font-black">
                        {activeAdventure?.subject?.title || 'Science & Nature'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeAdventure?.ageGroup?.label || 'Ages 8–10'}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-indigo-700 font-extrabold">
                        {activeAdventure?.topic?.title || 'Earth & Environment'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-900 font-black">
                        The Water Cycle (Pip)
                      </span>
                    </div>
                  </div>

                  {/* Progress Badges */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((idx) => {
                      const isDone = completedChapters.includes(idx);
                      const isCurrent = currentChapter === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => setCurrentChapter(idx)}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black cursor-pointer transition-all ${
                            isCurrent
                              ? 'bg-sky-600 text-white shadow-md ring-2 ring-sky-300 scale-110'
                              : isDone
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                          }`}
                          title={`Go to Chapter ${idx}`}
                        >
                          {isDone ? '✓' : idx}
                        </div>
                      );
                    })}
                    <div
                      onClick={() => setCurrentChapter(6)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1 ${
                        currentChapter === 6
                          ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300 scale-105'
                          : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      Quiz
                    </div>
                  </div>
                </div>

                {/* Story Chapter Intro (Shown on Chapters 1-5) */}
                {currentChapter <= 5 && (
                  <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-sky-100 shadow-xl flex flex-col gap-6">
                    
                    {/* Header with Title and "Read to Me" button */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                            Chapter {chapterData.id} • {chapterData.stage}
                          </span>
                          <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                            {chapterData.subtitle}
                          </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                          {chapterData.title}
                        </h1>
                      </div>

                      {/* Narration Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleNarrate}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm shadow-md transition-all cursor-pointer ${
                            isNarrating
                              ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                              : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white hover:scale-105'
                          }`}
                        >
                          {isNarrating ? (
                            <>
                              <Square className="w-4 h-4 fill-white" />
                              <span>Stop Narration</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4" />
                              <span>🔊 Read to Me!</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => setIsVoiceModalOpen(true)}
                          className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition cursor-pointer"
                          title="Select narrator voice"
                        >
                          <Mic className="w-4 h-4 text-amber-600" />
                        </button>
                      </div>
                    </div>

                    {/* Narrative Paragraphs */}
                    <div className="space-y-3.5 text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                      {chapterData.narrative.map((para, idx) => (
                        <p key={idx} className="bg-sky-50/40 p-3.5 rounded-2xl border border-sky-100/80">
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Science Fact & Secret Discovery Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-amber-50/90 border-2 border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                        <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-amber-800 block">
                            Did You Know?
                          </span>
                          <p className="text-xs text-amber-950 font-semibold mt-0.5 leading-snug">
                            {chapterData.scienceFact}
                          </p>
                        </div>
                      </div>

                      <div className="bg-indigo-50/90 border-2 border-indigo-200 rounded-2xl p-4 flex items-start gap-3">
                        <Sparkles className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-indigo-800 block">
                            Secret Science Discovery
                          </span>
                          <p className="text-xs text-indigo-950 font-semibold mt-0.5 leading-snug">
                            {chapterData.secretFact}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Interaction Callout Prompt */}
                    <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-2xl p-3.5 flex items-center gap-3 shadow-md">
                      <span className="text-2xl">🎮</span>
                      <div className="text-xs md:text-sm font-bold">
                        <strong>Your Mission:</strong> {chapterData.interactionPrompt}
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage Content: Interactive Simulation / Mini-game / Diagram */}
                <section key={currentChapter} className="w-full animate-fade-in">
                  {renderActiveStage()}
                </section>

                {/* Chapter Navigation Controls */}
                <div className="flex justify-between items-center bg-white rounded-2xl p-4 border-2 border-sky-100 shadow-sm mt-2">
                  <button
                    onClick={handlePrevChapter}
                    disabled={currentChapter === 1}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-xs md:text-sm transition-all cursor-pointer ${
                      currentChapter === 1
                        ? 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous Chapter
                  </button>

                  <span className="text-xs font-extrabold text-slate-500">
                    {currentChapter <= 5 ? `Chapter ${currentChapter} of 5` : 'Quiz Challenge'}
                  </span>

                  <button
                    onClick={handleNextChapter}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs md:text-sm text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-md transition-all cursor-pointer hover:scale-105"
                  >
                    <span>{currentChapter === 5 ? 'Take the Quiz!' : currentChapter === 6 ? 'Back to Story' : 'Next Chapter'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </main>

      <BeakyPopIn
        active={viewMode === 'adventure'}
        pageKey={`${activeAdventure?.subtopic?.id || 'water_cycle'}-${currentChapter}`}
      />

      {/* Footer */}
      <footer className="w-full border-t border-sky-200/60 bg-white/60 py-6 text-center text-xs text-slate-500 font-semibold">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>💧 <strong>SciTale</strong> — Interactive Science & Maths Adventures for Children (Ages 5–13)</span>
          <span>Explore • Experiment • Discover</span>
        </div>
      </footer>

      {/* Science Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Voice Selector Modal */}
      <VoiceSelectorModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
      </div>
      {parentReportData && <ParentTeacherReport reportData={parentReportData} onClose={() => setParentReportData(null)} />}
    </div>
  );
}
