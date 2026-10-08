import React, { useState } from 'react';
import { RotateCw, Sparkles, HelpCircle, ArrowRight, Clock, Award } from 'lucide-react';
import PipCharacter from '../PipCharacter';
import { sound } from '../../audio/soundEffects';

export default function Chapter5FullCircle({ onStartQuiz }) {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [selectedEra, setSelectedEra] = useState('dino');

  const cyclePhases = [
    {
      name: "1. Evaporation",
      icon: "☀️",
      desc: "Solar heat warms liquid ocean & lake water, turning molecules into invisible water vapor gas.",
      detail: "Driven by the Sun's radiation. Includes Transpiration from plants!"
    },
    {
      name: "2. Condensation",
      icon: "☁️",
      desc: "Water vapor cools at high altitudes and clings to tiny dust particles to create fluffy clouds.",
      detail: "Gas cools down to liquid droplets. Droplets mass together to form cumulus and storm clouds."
    },
    {
      name: "3. Precipitation",
      icon: "🌧️",
      desc: "Cloud droplets become too heavy for rising air updrafts; gravity pulls them down as rain, snow, or hail.",
      detail: "Determined by temperature: Rain (>0°C), Snow (<0°C), or Hail (updrafts)."
    },
    {
      name: "4. Infiltration & Runoff",
      icon: "🌊",
      desc: "Water rushes down rivers (runoff) or seeps deep into underground aquifers (infiltration).",
      detail: "Collects back into oceans, lakes, and soil to sustain all life on Earth."
    }
  ];

  const eras = [
    {
      id: 'dino',
      year: '68 Million BCE',
      title: 'Tyrannosaurus Rex Era',
      icon: '🦖',
      story: 'Pip was drunk by a thirsty mother T-Rex by a primordial Cretaceous swamp, then breathed back into the air as vapor!'
    },
    {
      id: 'ice',
      year: '20,000 BCE',
      title: 'The Great Ice Age',
      icon: '🧊',
      story: 'Pip was trapped as a solid ice crystal inside a towering continental glacier for over 15,000 years!'
    },
    {
      id: 'pyramids',
      year: '2,500 BCE',
      title: 'Ancient Egypt & The Nile',
      icon: '🏛️',
      story: 'Pip flowed down the fertile Nile river during the annual flood, nourishing wheat crops while the Great Pyramids were built!'
    },
    {
      id: 'today',
      year: 'Present Day',
      title: 'Your Water Glass!',
      icon: '🥤',
      story: 'Pip is purified by modern municipal water systems or nature, refreshing you so you can learn science!'
    }
  ];

  const currentEra = eras.find((e) => e.id === selectedEra) || eras[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Interactive Cycle Diagram Stage */}
      <div className="relative w-full rounded-3xl overflow-hidden border-4 border-purple-200 shadow-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-6 text-white flex flex-col justify-between">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 z-10 mb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-purple-300">
              Interactive Master Diagram
            </span>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <RotateCw className="w-5 h-5 text-purple-400 animate-spin" style={{ animationDuration: '14s' }} />
              The Everlasting Earth Water Cycle
            </h3>
          </div>

          <div className="bg-purple-900/60 border border-purple-400/30 px-3 py-1.5 rounded-xl text-xs font-bold text-purple-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Recycling Water for 4.5 Billion Years
          </div>
        </div>

        {/* 4 Interactive Nodes in a Loop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
          {cyclePhases.map((phase, idx) => {
            const isSelected = selectedPhase === idx;
            return (
              <button
                key={phase.name}
                onClick={() => {
                  sound.playPop();
                  setSelectedPhase(idx);
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-600/50 border-purple-300 shadow-lg ring-2 ring-purple-400 scale-102'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="text-2xl mb-2">{phase.icon}</div>
                <div className="text-sm font-black text-white">{phase.name}</div>
                <div className="text-[11px] text-purple-200/80 mt-1 line-clamp-2">
                  {phase.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Detail Showcase */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-purple-300/30 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-shrink-0">
            <PipCharacter
              mood="proud"
              size={110}
              speechText={`Phase ${selectedPhase + 1}: ${cyclePhases[selectedPhase].name}!`}
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-base font-black text-purple-200">
              {cyclePhases[selectedPhase].name}
            </div>
            <p className="text-sm text-slate-200 mt-1">
              {cyclePhases[selectedPhase].desc}
            </p>
            <p className="text-xs text-amber-300 font-semibold mt-1">
              💡 {cyclePhases[selectedPhase].detail}
            </p>
          </div>
        </div>
      </div>

      {/* Dinosaur Water Time Machine Section */}
      <div className="bg-white rounded-3xl p-6 border-3 border-purple-100 shadow-lg flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shadow">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 block">
              Mind-Blowing Science Reality
            </span>
            <h3 className="text-lg font-black text-slate-800">
              Pip's Time Machine: Who Drank This Water Before You?
            </h3>
          </div>
        </div>

        {/* Era selector tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {eras.map((era) => (
            <button
              key={era.id}
              onClick={() => {
                sound.playPop();
                setSelectedEra(era.id);
              }}
              className={`p-3 rounded-2xl border-2 font-bold text-xs transition-all cursor-pointer flex items-center gap-2 ${
                selectedEra === era.id
                  ? 'bg-amber-100 border-amber-500 text-amber-900 shadow'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50'
              }`}
            >
              <span className="text-xl">{era.icon}</span>
              <div className="text-left">
                <div className="font-black">{era.year}</div>
                <div className="text-[10px] text-slate-500">{era.title}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Current Era Story Box */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-center gap-4">
          <span className="text-4xl">{currentEra.icon}</span>
          <div>
            <div className="text-xs font-black text-amber-800 uppercase tracking-wide">
              {currentEra.year} — {currentEra.title}
            </div>
            <p className="text-sm font-semibold text-slate-700 mt-0.5">
              "{currentEra.story}"
            </p>
          </div>
        </div>

        {/* Action Button to launch quiz */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Earn your Official SciTale Hydrologist Badge in the Quiz!</span>
          </div>

          <button
            onClick={() => {
              sound.playFanfare();
              if (onStartQuiz) onStartQuiz();
            }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-base rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Start Science Quiz Challenge!</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
