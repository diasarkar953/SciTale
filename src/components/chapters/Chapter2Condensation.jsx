import React, { useState } from 'react';
import { Cloud, Wind, Sparkles, RefreshCw, Snowflake, CheckCircle } from 'lucide-react';
import PipCharacter from '../PipCharacter';
import { sound } from '../../audio/soundEffects';

export default function Chapter2Condensation({ onComplete }) {
  const [collectedDroplets, setCollectedDroplets] = useState([]);
  const [altitude, setAltitude] = useState(3000); // meters
  const [isCloudFull, setIsCloudFull] = useState(false);

  // 6 initial vapor particles floating around
  const availableVapors = [
    { id: 1, name: "Vapor Alpha", x: 15, y: 30 },
    { id: 2, name: "Vapor Beta", x: 80, y: 25 },
    { id: 3, name: "Vapor Gamma", x: 20, y: 70 },
    { id: 4, name: "Vapor Delta", x: 82, y: 68 },
    { id: 5, name: "Vapor Epsilon", x: 50, y: 15 },
    { id: 6, name: "Vapor Zeta", x: 48, y: 82 },
  ];

  const handleCollect = (id) => {
    if (collectedDroplets.includes(id)) return;

    sound.playPop();
    const next = [...collectedDroplets, id];
    setCollectedDroplets(next);

    if (next.length >= 4 && !isCloudFull) {
      setIsCloudFull(true);
      sound.playDing();
      if (onComplete) onComplete();
    }
  };

  const handleReset = () => {
    setCollectedDroplets([]);
    setIsCloudFull(false);
    sound.playSplash();
  };

  // Temperature drops by ~6.5°C per 1000m altitude (troposphere lapse rate!)
  const airTemp = Math.round(20 - (altitude / 1000) * 6.5);

  return (
    <div className="flex flex-col gap-6">
      {/* Sky Canvas */}
      <div className="relative w-full h-96 rounded-3xl overflow-hidden border-4 border-indigo-200 shadow-xl bg-gradient-to-b from-indigo-900 via-sky-800 to-sky-400 p-4 flex flex-col justify-between">
        
        {/* Top altitude & weather stats */}
        <div className="flex justify-between items-center z-10">
          <div className="bg-slate-900/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-indigo-400/30 text-white flex items-center gap-3 text-xs md:text-sm">
            <span><strong>Altitude:</strong> {altitude.toLocaleString()} meters</span>
            <span className="text-indigo-300">|</span>
            <span className={`font-bold ${airTemp <= 0 ? 'text-cyan-300' : 'text-amber-200'}`}>
              <strong>Air Temp:</strong> {airTemp}°C {airTemp <= 0 ? '❄️ Below Freezing' : '🌬️ Chilly'}
            </span>
          </div>

          <div className="bg-indigo-950/80 text-indigo-200 px-3 py-1.5 rounded-xl text-xs font-bold border border-indigo-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Condensing: {collectedDroplets.length} / 6 Droplets
          </div>
        </div>

        {/* Central Cloud Factory & Dust Speck Nucleus */}
        <div className="relative flex-1 flex items-center justify-center">
          
          {/* Microscopic Dust speck label */}
          <div className="absolute top-8 text-center text-xs text-sky-100/90 font-bold bg-indigo-950/60 px-3 py-1 rounded-full border border-sky-400/40">
            Microscopic Dust Speck (Condensation Nucleus)
          </div>

          {/* Central Cloud that grows with collected droplets */}
          <div
            className={`relative flex items-center justify-center transition-all duration-700 ${
              isCloudFull ? 'scale-125 drop-shadow-[0_10px_25px_rgba(255,255,255,0.4)]' : 'scale-100'
            }`}
          >
            {/* Cloud SVG */}
            <svg
              viewBox="0 0 200 130"
              className="w-48 h-36 md:w-56 md:h-44 transition-all duration-500"
              style={{
                filter: isCloudFull ? 'drop-shadow(0 4px 12px rgba(255,255,255,0.6))' : 'none',
                opacity: 0.5 + (collectedDroplets.length * 0.1)
              }}
            >
              <defs>
                <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor={isCloudFull ? '#cbd5e1' : '#e0f2fe'} />
                </linearGradient>
              </defs>
              <path
                d="M 50 90 
                   A 30 30 0 0 1 70 40 
                   A 45 45 0 0 1 140 40 
                   A 30 30 0 0 1 170 90 
                   A 25 25 0 0 1 150 115 
                   L 50 115 
                   A 25 25 0 0 1 50 90 Z"
                fill="url(#cloudGrad)"
                stroke="#bae6fd"
                strokeWidth="3"
              />
              {/* Dust speck in the center */}
              <circle cx="105" cy="80" r="5" fill="#78350f" stroke="#fef3c7" strokeWidth="2" />
            </svg>

            {/* Pip nestled in the cloud */}
            <div className="absolute -top-3">
              <PipCharacter
                mood={isCloudFull ? 'liquid' : 'cold'}
                size={85}
                speechText={
                  isCloudFull
                    ? "Hooray! The cloud is dense and ready!"
                    : "Brrr! Help me gather vapor friends!"
                }
              />
            </div>
          </div>

          {/* Floating Vapor Particles to Click / Collect */}
          {availableVapors.map((vapor) => {
            const isCollected = collectedDroplets.includes(vapor.id);
            if (isCollected) return null;

            return (
              <button
                key={vapor.id}
                onClick={() => handleCollect(vapor.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white/40 hover:bg-white/80 border-2 border-sky-300 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg animate-pulse"
                style={{
                  left: `${vapor.x}%`,
                  top: `${vapor.y}%`,
                  animationDuration: `${2 + vapor.id * 0.4}s`
                }}
                title="Click to condense onto the cloud nucleus!"
              >
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-t from-sky-400 to-sky-200 border-2 border-white flex items-center justify-center text-xs font-black text-sky-900 shadow">
                    💧
                  </div>
                  <span className="text-[10px] font-extrabold text-white mt-1 bg-slate-900/60 px-1.5 rounded">
                    Catch Me!
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom instructions */}
        <div className="text-center text-xs text-sky-200 bg-slate-950/40 backdrop-blur-sm py-1.5 px-4 rounded-xl border border-white/10">
          💡 <strong>Science Fact:</strong> Clouds are not pure water vapor (gas is invisible!). Clouds are made of billions of tiny <em>liquid water droplets</em> suspended in air!
        </div>
      </div>

      {/* Controls Card */}
      <div className="bg-white rounded-3xl p-6 border-3 border-indigo-100 shadow-lg flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm md:text-base font-extrabold text-slate-800 flex items-center gap-2">
              <Wind className="w-5 h-5 text-indigo-500" />
              Altitude Ascent Slider:
            </label>
            <span className="text-sm font-black px-3 py-1 bg-indigo-100 text-indigo-800 rounded-xl">
              {altitude} m ({airTemp}°C)
            </span>
          </div>

          <input
            type="range"
            min="1000"
            max="8000"
            step="500"
            value={altitude}
            onChange={(e) => setAltitude(Number(e.target.value))}
            className="w-full h-3.5 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-600 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />

          <div className="flex justify-between text-xs text-slate-400 font-semibold mt-1">
            <span>1,000 m (Mild)</span>
            <span>4,000 m (Cumulus Level)</span>
            <span>8,000 m (Cirrus / Freezing)</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {isCloudFull ? (
            <div className="flex-1 md:flex-none flex items-center gap-2 bg-emerald-100 text-emerald-800 font-bold px-4 py-3 rounded-2xl border-2 border-emerald-300">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>Condensation Achieved!</span>
            </div>
          ) : (
            <div className="flex-1 md:flex-none text-xs md:text-sm font-semibold text-slate-600 bg-indigo-50 px-4 py-3 rounded-2xl border border-indigo-200">
              Click floating 💧 vapor to condense!
            </div>
          )}

          <button
            onClick={handleReset}
            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs md:text-sm font-bold rounded-2xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
