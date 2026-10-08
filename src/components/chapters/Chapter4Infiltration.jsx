import React, { useState } from 'react';
import { Waves, TreePine, Droplets, ArrowDownCircle, CheckCircle, RotateCcw } from 'lucide-react';
import PipCharacter from '../PipCharacter';
import { sound } from '../../audio/soundEffects';

export default function Chapter4Infiltration({ onComplete }) {
  const [chosenPath, setChosenPath] = useState(null); // 'runoff' | 'infiltration' | null
  const [stepIndex, setStepIndex] = useState(0);

  const handleChoosePath = (path) => {
    sound.playSplash();
    setChosenPath(path);
    setStepIndex(1);

    setTimeout(() => {
      setStepIndex(2);
      sound.playDing();
      if (onComplete) onComplete();
    }, 1800);
  };

  const handleReset = () => {
    setChosenPath(null);
    setStepIndex(0);
    sound.playPop();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Landscape Cross-Section Stage */}
      <div className="relative w-full h-[410px] rounded-3xl overflow-hidden border-4 border-emerald-200 shadow-xl bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-950 flex flex-col justify-between">
        
        {/* Top: Mountain Sky & Peak */}
        <div className="relative p-3 z-10 flex justify-between items-start">
          <div className="bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-emerald-300 text-xs font-bold text-emerald-900 shadow">
            🏔️ Elevation: 1,800m Surface Mountain Crest
          </div>
          {chosenPath && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-700 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold shadow cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Try Other Path
            </button>
          )}
        </div>

        {/* Visual Layers Diagram */}
        <div className="relative flex-1 w-full flex flex-col justify-between overflow-hidden">
          
          {/* Surface Level: River stream, trees, plants */}
          <div className="relative h-28 w-full border-b-2 border-emerald-600/30">
            {/* River Curve */}
            <svg viewBox="0 0 600 100" className="w-full h-full" preserveAspectRatio="none">
              {/* Green Bank */}
              <path d="M 0 0 L 600 0 L 600 100 L 0 100 Z" fill="#4ade80" opacity="0.6" />
              {/* Blue Rushing River */}
              <path
                d="M 50 10 C 150 40 250 10 380 50 C 480 80 550 40 600 90 L 600 100 L 0 100 Z"
                fill="#0284c7"
                opacity="0.85"
              />
            </svg>

            {/* Tree Icons */}
            <div className="absolute top-2 left-10 flex items-center gap-1 text-emerald-800 text-xs font-bold">
              <TreePine className="w-7 h-7 text-emerald-700" />
              <span>Forest Canopy</span>
            </div>
            <div className="absolute top-4 right-16 flex items-center gap-1 text-emerald-800 text-xs font-bold">
              <TreePine className="w-6 h-6 text-emerald-600" />
              <span>Wetland Valley</span>
            </div>
          </div>

          {/* Subsurface Level: Soil & Plant Root Zone */}
          <div className="relative h-28 w-full bg-gradient-to-b from-amber-800/80 to-amber-900/90 border-b-2 border-amber-950 p-2 text-white">
            <div className="flex justify-between items-center text-xs font-extrabold text-amber-200">
              <span>🌱 Topsoil Layer & Tree Roots (Transpiration Zone)</span>
              <span>Organic Soil Matrix</span>
            </div>

            {/* Root SVG lines */}
            <svg viewBox="0 0 400 60" className="w-full h-12 opacity-50">
              <path d="M 60 0 Q 70 30 85 55 M 65 20 Q 50 40 40 55 M 320 0 Q 300 25 290 55 M 310 15 Q 340 35 350 55" stroke="#fef08a" strokeWidth="2.5" fill="none" />
            </svg>
          </div>

          {/* Deep Underground Level: Porous Rock Bed & Aquifer */}
          <div className="relative h-28 w-full bg-gradient-to-b from-stone-800 to-stone-950 p-2.5 text-cyan-200">
            <div className="flex justify-between items-center text-xs font-extrabold text-cyan-300">
              <span>💧 Deep Porous Rock Aquifer (Groundwater Storage)</span>
              <span>Natural Sand Filter</span>
            </div>

            {/* Water pooling in aquifer */}
            <div className="w-full h-8 mt-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-[11px] font-bold text-cyan-100">
              Crystal-Clear Filtered Groundwater Reservoir
            </div>
          </div>

          {/* Animated Pip position based on chosen path & step */}
          <div
            className="absolute transition-all duration-1000 ease-out z-20"
            style={{
              left:
                chosenPath === 'runoff'
                  ? stepIndex === 1
                    ? '45%'
                    : stepIndex === 2
                    ? '85%'
                    : '15%'
                  : chosenPath === 'infiltration'
                  ? stepIndex === 1
                    ? '25%'
                    : stepIndex === 2
                    ? '50%'
                    : '15%'
                  : '15%',
              top:
                chosenPath === 'runoff'
                  ? stepIndex === 1
                    ? '15%'
                    : stepIndex === 2
                    ? '22%'
                    : '5%'
                  : chosenPath === 'infiltration'
                  ? stepIndex === 1
                    ? '45%'
                    : stepIndex === 2
                    ? '76%'
                    : '5%'
                  : '5%',
              transform: 'translate(-50%, 0)'
            }}
          >
            <PipCharacter
              mood="liquid"
              size={chosenPath ? 100 : 120}
              speechText={
                chosenPath === 'runoff'
                  ? stepIndex === 2
                    ? "Rafting back to the ocean at top speed!"
                    : "Rushing down river rapids! Splash!"
                  : chosenPath === 'infiltration'
                  ? stepIndex === 2
                    ? "Safe & pure in the deep underground aquifer!"
                    : "Filtering through soil! Roots are drinking!"
                  : "Where should we travel next? Pick a path below!"
              }
            />
          </div>
        </div>
      </div>

      {/* Pathway Decision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pathway 1: Surface Runoff */}
        <div
          onClick={() => handleChoosePath('runoff')}
          className={`p-5 rounded-3xl border-3 transition-all cursor-pointer ${
            chosenPath === 'runoff'
              ? 'bg-sky-50 border-sky-500 shadow-lg ring-2 ring-sky-300'
              : 'bg-white border-slate-200 hover:border-sky-300 hover:shadow-md'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-sky-500 text-white rounded-2xl">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-sky-600 block">
                Pathway A
              </span>
              <h3 className="text-base font-extrabold text-slate-800">
                Surface Runoff (River Rush)
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Water rushes downhill across soil, rocks, and streams into rivers, waterfalls, and lakes, heading straight back to the ocean!
          </p>
          <div className="flex justify-between items-center text-xs font-bold text-sky-700 bg-sky-100/70 px-3 py-1.5 rounded-xl">
            <span>⚡ Speed: Fast (Hours to Days)</span>
            <span>Destination: Ocean</span>
          </div>
        </div>

        {/* Pathway 2: Infiltration */}
        <div
          onClick={() => handleChoosePath('infiltration')}
          className={`p-5 rounded-3xl border-3 transition-all cursor-pointer ${
            chosenPath === 'infiltration'
              ? 'bg-emerald-50 border-emerald-500 shadow-lg ring-2 ring-emerald-300'
              : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl">
              <ArrowDownCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 block">
                Pathway B
              </span>
              <h3 className="text-base font-extrabold text-slate-800">
                Infiltration & Groundwater
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Water seeps slowly through topsoil, hydrates plant roots (triggering transpiration!), and filters into deep rock aquifers.
          </p>
          <div className="flex justify-between items-center text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1.5 rounded-xl">
            <span>⏳ Speed: Slow (Years to Millennia)</span>
            <span>Destination: Aquifer</span>
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {stepIndex === 2 && (
        <div className="bg-emerald-100 border-2 border-emerald-300 text-emerald-900 rounded-2xl p-4 flex items-center justify-between text-xs md:text-sm font-bold shadow">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>
              Awesome exploration! You witnessed how water either flows on the surface or filters deep underground!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
