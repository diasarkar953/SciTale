import React, { useState } from 'react';
import { Sun, Flame, Sparkles, Thermometer, Wind, Eye } from 'lucide-react';
import PipCharacter from '../PipCharacter';
import { sound } from '../../audio/soundEffects';

export default function Chapter1Evaporation({ onComplete }) {
  const [temperature, setTemperature] = useState(25);
  const [isEvaporated, setIsEvaporated] = useState(false);
  const [showMicroscope, setShowMicroscope] = useState(false);

  const handleTempChange = (e) => {
    const val = Number(e.target.value);
    setTemperature(val);

    if (val > 70 && !isEvaporated) {
      setIsEvaporated(true);
      sound.playWhoosh();
      if (onComplete) onComplete();
    } else if (val <= 70 && isEvaporated) {
      setIsEvaporated(false);
    }
  };

  const handleReset = () => {
    setTemperature(25);
    setIsEvaporated(false);
    sound.playSplash();
  };

  // Kinetic speed calculation for molecule simulation
  const kineticSpeed = Math.max(0.5, (temperature / 20));

  return (
    <div className="flex flex-col gap-6">
      {/* Interactive Canvas / Stage */}
      <div className="relative w-full h-96 rounded-3xl overflow-hidden border-4 border-sky-200 shadow-xl bg-gradient-to-b from-sky-300 via-sky-100 to-amber-100 flex flex-col justify-between">
        
        {/* Sun & Sky Area */}
        <div className="relative p-4 flex justify-between items-start z-10">
          {/* Animated Sun */}
          <div
            className="flex items-center gap-2 bg-amber-100/90 backdrop-blur-sm px-4 py-2 rounded-2xl border-2 border-amber-300 shadow-md transition-all duration-300"
            style={{
              transform: `scale(${1 + (temperature - 20) / 100})`,
              filter: `drop-shadow(0 0 ${temperature / 4}px rgba(245, 158, 11, 0.7))`
            }}
          >
            <Sun className={`w-10 h-10 text-amber-500 ${temperature > 60 ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">Solar Intensity</span>
              <span className="text-lg font-black text-amber-900">{temperature}°C</span>
            </div>
          </div>

          {/* Molecule microscope toggle */}
          <button
            onClick={() => {
              sound.playPop();
              setShowMicroscope(!showMicroscope);
            }}
            className="flex items-center gap-2 bg-white/90 hover:bg-white text-sky-800 text-xs md:text-sm font-bold px-3 py-2 rounded-xl border border-sky-300 shadow transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-sky-600" />
            {showMicroscope ? 'Hide Molecules' : 'Molecular Zoom-In'}
          </button>
        </div>

        {/* Heat rays when temperature is high */}
        {temperature > 50 && (
          <div className="absolute inset-x-0 top-16 flex justify-around opacity-60 pointer-events-none">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1.5 h-36 bg-gradient-to-b from-amber-400 via-orange-300 to-transparent rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}

        {/* Floating Pip: Ocean state or Ascending Vapor state */}
        <div className="relative flex-1 flex items-center justify-center">
          <div
            className="transition-all duration-1000 ease-out z-20"
            style={{
              transform: isEvaporated
                ? 'translateY(-70px) scale(0.95)'
                : `translateY(${Math.sin(Date.now() / 500) * 8}px)`
            }}
          >
            <PipCharacter
              mood={isEvaporated ? 'vapor' : temperature > 60 ? 'hot' : 'liquid'}
              size={isEvaporated ? 130 : 140}
              speechText={
                isEvaporated
                  ? "Whoa! I'm vapor now! Rising into the sky!"
                  : temperature > 60
                  ? "Getting so warm! My atoms are vibrating fast!"
                  : "Chilling in the ocean! Slide the heat up!"
              }
            />
          </div>

          {/* Steam puffs when evaporated */}
          {isEvaporated && (
            <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
              <div className="w-24 h-24 rounded-full bg-white/50 blur-xl animate-ping" />
            </div>
          )}
        </div>

        {/* Ocean Body at the bottom */}
        <div className="relative w-full h-32 bg-gradient-to-t from-sky-600 via-sky-500 to-sky-400/90 flex flex-col justify-end p-4 border-t-4 border-sky-300">
          {/* Wave animation crest */}
          <div className="absolute -top-4 inset-x-0 h-4 bg-sky-400/50 rounded-t-full animate-pulse" />

          {/* Friendly sea creatures */}
          <div className="flex justify-between items-center text-white/80 text-xs font-semibold select-none">
            <span className="flex items-center gap-1">
              🌊 Liquid Ocean (High density H₂O)
            </span>
            <span>🐟 Bubble, splash!</span>
          </div>
        </div>

        {/* Molecular Simulation Overlay if toggled */}
        {showMicroscope && (
          <div className="absolute inset-4 z-30 bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 text-white flex flex-col justify-between border-2 border-cyan-400 shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Molecular Kinetic Energy Simulator
              </span>
              <button
                onClick={() => setShowMicroscope(false)}
                className="text-xs bg-cyan-700/60 hover:bg-cyan-600 px-2.5 py-1 rounded-lg"
              >
                Close
              </button>
            </div>

            {/* Molecule atoms vibrating */}
            <div className="flex-1 flex items-center justify-around my-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center animate-bounce"
                  style={{
                    animationDuration: `${Math.max(0.2, 1.2 - kineticSpeed * 0.2)}s`,
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-400 border-2 border-white flex items-center justify-center font-black text-slate-900 text-xs shadow-lg shadow-cyan-500/50">
                    O
                  </div>
                  <div className="flex gap-2 -mt-1">
                    <div className="w-4 h-4 rounded-full bg-white text-slate-900 text-[9px] font-bold flex items-center justify-center shadow">
                      H
                    </div>
                    <div className="w-4 h-4 rounded-full bg-white text-slate-900 text-[9px] font-bold flex items-center justify-center shadow">
                      H
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs text-cyan-200/90 bg-cyan-950/60 p-2.5 rounded-xl border border-cyan-800">
              {temperature > 70 ? (
                <p>
                  <strong>Phase Change in Progress!</strong> Heat adds kinetic energy. Molecules break intermolecular attractions and scatter apart into water vapor gas!
                </p>
              ) : (
                <p>
                  At <strong>{temperature}°C</strong>, molecules stay closely attracted together as liquid water. Slide the heat up to see them break free!
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls Card */}
      <div className="bg-white rounded-3xl p-6 border-3 border-sky-100 shadow-lg flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm md:text-base font-extrabold text-slate-800 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-amber-500" />
              Solar Thermal Energy Controller:
            </label>
            <span className={`text-base font-black px-3 py-1 rounded-xl ${temperature > 70 ? 'bg-amber-100 text-amber-700 border border-amber-300' : 'bg-sky-100 text-sky-700'}`}>
              {temperature}°C {temperature > 70 ? '🔥 Boiling Heat!' : '☀️ Pleasant'}
            </span>
          </div>

          {/* Slider input */}
          <input
            type="range"
            min="10"
            max="100"
            value={temperature}
            onChange={handleTempChange}
            className="w-full h-3.5 bg-gradient-to-r from-sky-300 via-amber-300 to-rose-400 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />

          <div className="flex justify-between text-xs text-slate-400 font-semibold mt-1">
            <span>10°C (Cold Ocean)</span>
            <span>50°C (Warm Beach)</span>
            <span>100°C (Super Vaporizer)</span>
          </div>
        </div>

        {/* Status / Reset */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {isEvaporated ? (
            <div className="flex-1 md:flex-none flex items-center gap-2 bg-emerald-100 text-emerald-800 font-bold px-4 py-3 rounded-2xl border-2 border-emerald-300">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Evaporation Complete!</span>
            </div>
          ) : (
            <div className="flex-1 md:flex-none text-xs md:text-sm font-semibold text-slate-600 bg-sky-50 px-4 py-3 rounded-2xl border border-sky-200">
              Slide above <strong>70°C</strong> to evaporate Pip!
            </div>
          )}

          <button
            onClick={handleReset}
            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs md:text-sm font-bold rounded-2xl transition cursor-pointer"
          >
            Cool Down
          </button>
        </div>
      </div>
    </div>
  );
}
