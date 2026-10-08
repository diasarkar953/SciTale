import React from 'react';
import { Volume2, VolumeX, BookMarked, Sparkles, Compass, Mic, Home } from 'lucide-react';
import { sound } from '../audio/soundEffects';

export default function Header({
  viewMode = 'selection', // 'selection' | 'adventure'
  activeAdventureName = '',
  activeChapter, // 1..5, or 6 for quiz
  onSelectChapter,
  onBackToSelection,
  isMuted,
  onToggleMute,
  onOpenGlossary,
  onOpenVoiceModal,
  selectedVoiceName = 'Default Storyteller'
}) {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b-2 border-sky-100 sticky top-0 z-40 px-4 py-3 shadow-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Logo & Brand */}
        <div
          onClick={() => {
            sound.playPop();
            onBackToSelection();
          }}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          title="Return to Library / Home"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
            💧
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SciTale
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                Ages 8–12
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-500 leading-none">
              {viewMode === 'adventure' && activeAdventureName ? activeAdventureName : 'Interactive Science & Math Adventures'}
            </p>
          </div>
        </div>

        {/* Center Navigation: Chapter pills if inside Water Cycle adventure, or Library Home button */}
        {viewMode === 'adventure' ? (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            <button
              onClick={() => {
                sound.playPop();
                onBackToSelection();
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-black transition cursor-pointer mr-1 shadow-2xs hover:scale-105"
              title="Return to Library / All Adventures"
            >
              <Home className="w-3.5 h-3.5 text-indigo-600" />
              <span>Library / Home</span>
            </button>

            {/* If Water Cycle, render chapter pills */}
            {activeChapter !== undefined && (
              <>
                {[1, 2, 3, 4, 5].map((ch) => {
                  const isActive = activeChapter === ch;
                  return (
                    <button
                      key={ch}
                      onClick={() => {
                        sound.playPop();
                        onSelectChapter(ch);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-300 scale-105'
                          : 'bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                      }`}
                    >
                      Ch {ch}
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    sound.playFanfare();
                    onSelectChapter(6);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    activeChapter === 6
                      ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300 scale-105'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Quiz & Badge
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 bg-sky-50/70 border border-sky-200 px-3 py-1.5 rounded-xl">
            <span>Subject</span>
            <span>→</span>
            <span>Age</span>
            <span>→</span>
            <span>Topic</span>
            <span>→</span>
            <span className="text-sky-700 font-black">Adventure</span>
          </div>
        )}

        {/* Action Controls: Voice Selector, Glossary & Sound Toggle */}
        <div className="flex items-center gap-2">
          {/* Narrator Voice Selector */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenVoiceModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl border border-amber-300 text-xs font-bold transition cursor-pointer"
            title="Configure Storyteller Voice"
          >
            <Mic className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Voice</span>
          </button>

          {/* Science Glossary */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenGlossary();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-xl border border-sky-200 text-xs font-bold transition cursor-pointer"
            title="Open Beaky’s Word Explorer"
          >
            <BookMarked className="w-4 h-4 text-sky-600" />
            <span>Word Explorer</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isMuted
                ? 'bg-slate-100 text-slate-500 border-slate-300'
                : 'bg-sky-100 text-sky-700 border-sky-300'
            }`}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
