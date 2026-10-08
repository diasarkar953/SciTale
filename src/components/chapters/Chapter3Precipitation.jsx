import React, { useState } from 'react';
import { CloudRain, CloudSnow, CloudLightning, Play, Sparkles, CheckCircle } from 'lucide-react';
import PipCharacter from '../PipCharacter';
import { sound } from '../../audio/soundEffects';

export default function Chapter3Precipitation({ onComplete }) {
  const [precipType, setPrecipType] = useState('rain'); // 'rain' | 'snow' | 'hail'
  const [isFalling, setIsFalling] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);

  const handleTriggerPrecipitation = () => {
    setIsFalling(true);
    setHasLanded(false);

    if (precipType === 'hail') {
      sound.playThunder();
    } else {
      sound.playRaindrop();
      setTimeout(() => sound.playRaindrop(), 200);
      setTimeout(() => sound.playRaindrop(), 400);
    }

    setTimeout(() => {
      setIsFalling(false);
      setHasLanded(true);
      sound.playSplash();
      if (onComplete) onComplete();
    }, 2800);
  };

  const getThemeDetails = () => {
    switch (precipType) {
      case 'snow':
        return {
          title: "Snowfall (Freezing Troposphere)",
          desc: "Temperature is below 0°C (32°F) from cloud to ground. Water freezes into intricate 6-sided ice crystals!",
          particle: "❄️",
          bg: "from-slate-700 via-sky-900 to-indigo-950"
        };
      case 'hail':
        return {
          title: "Hailstones (Thunderstorm Updrafts)",
          desc: "Violent storm updrafts bounce ice chunks up and down inside the freezing cloud, adding ice layers like an onion!",
          particle: "⚪",
          bg: "from-slate-900 via-zinc-800 to-slate-900"
        };
      default:
        return {
          title: "Liquid Rain (Warm Atmosphere)",
          desc: "Temperatures remain above freezing, allowing liquid droplets to merge and fall as gentle rain or downpours.",
          particle: "💧",
          bg: "from-slate-700 via-cyan-900 to-sky-900"
        };
    }
  };

  const theme = getThemeDetails();

  return (
    <div className="flex flex-col gap-6">
      {/* Sky to Mountain Canvas */}
      <div className={`relative w-full h-[400px] rounded-3xl overflow-hidden border-4 border-teal-200 shadow-xl bg-gradient-to-b ${theme.bg} p-4 flex flex-col justify-between transition-colors duration-700`}>
        
        {/* Dark Rain Cloud at Top */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <svg viewBox="0 0 240 100" className="w-64 h-24 drop-shadow-2xl">
              <path
                d="M 30 75 A 35 35 0 0 1 60 25 A 50 50 0 0 1 150 20 A 40 40 0 0 1 200 65 A 30 30 0 0 1 180 85 L 30 85 Z"
                fill="#334155"
                stroke="#64748b"
                strokeWidth="3"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-200">
              Saturated Cumulonimbus
            </div>
          </div>
        </div>

        {/* Falling Stage Area */}
        <div className="relative flex-1 w-full overflow-hidden">
          {/* Falling Particles Simulation */}
          {isFalling && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-xl animate-fall"
                  style={{
                    left: `${(i * 6) + 4}%`,
                    top: '-20px',
                    animationDuration: precipType === 'snow' ? '2.5s' : '1.2s',
                    animationDelay: `${(i % 5) * 0.15}s`,
                    animationIterationCount: 'infinite'
                  }}
                >
                  {theme.particle}
                </div>
              ))}
            </div>
          )}

          {/* Pip Skydiver Animation */}
          <div
            className="absolute left-1/2 -translate-x-1/2 transition-all duration-[2600ms] ease-in-out z-20"
            style={{
              top: hasLanded ? '70%' : isFalling ? '65%' : '5%',
              transform: `translate(-50%, 0) scale(${hasLanded ? 1 : isFalling ? 1.1 : 0.95})`
            }}
          >
            <PipCharacter
              mood={hasLanded ? 'liquid' : isFalling ? 'rain' : 'cold'}
              size={hasLanded ? 120 : 130}
              speechText={
                hasLanded
                  ? "Touchdown on the mountain! What a rush!"
                  : isFalling
                  ? `Wheeeee! Skydiving as ${precipType}! 🪂`
                  : "Cloud is super heavy! Click 'Unleash Cloud Burst'!"
              }
            />
          </div>
        </div>

        {/* Mountain & Valley Ground at the Bottom */}
        <div className="relative w-full h-24 z-10 flex items-end">
          <svg viewBox="0 0 500 80" className="w-full h-full" preserveAspectRatio="none">
            {/* Snowy Mountain Peaks */}
            <polygon points="0,80 80,20 180,80" fill="#475569" />
            <polygon points="60,35 80,20 105,35" fill="#f8fafc" />

            <polygon points="140,80 260,10 380,80" fill="#334155" />
            <polygon points="230,28 260,10 290,28" fill="#f8fafc" />

            <polygon points="320,80 440,30 500,80" fill="#475569" />
            <polygon points="415,42 440,30 465,42" fill="#f8fafc" />
            {/* Green Valley Base */}
            <rect x="0" y="65" width="500" height="15" fill="#15803d" />
          </svg>

          <div className="absolute bottom-2 inset-x-0 flex justify-between px-4 text-xs font-bold text-white/90 drop-shadow">
            <span>🏔️ Alpine Mountain Peak</span>
            <span>🌲 Forest Foothills</span>
          </div>
        </div>
      </div>

      {/* Weather Selector & Trigger Card */}
      <div className="bg-white rounded-3xl p-6 border-3 border-teal-100 shadow-lg flex flex-col gap-5">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-teal-700 block mb-2">
            Select Atmospheric Conditions:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Option 1: Rain */}
            <button
              onClick={() => {
                sound.playPop();
                setPrecipType('rain');
              }}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                precipType === 'rain'
                  ? 'bg-sky-100 border-sky-500 shadow-md ring-2 ring-sky-300'
                  : 'bg-slate-50 border-slate-200 hover:bg-sky-50'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-sky-500 text-white">
                <CloudRain className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-slate-800 block">Liquid Rain</span>
                <span className="text-xs text-slate-500">Above 0°C (32°F)</span>
              </div>
            </button>

            {/* Option 2: Snow */}
            <button
              onClick={() => {
                sound.playPop();
                setPrecipType('snow');
              }}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                precipType === 'snow'
                  ? 'bg-indigo-100 border-indigo-500 shadow-md ring-2 ring-indigo-300'
                  : 'bg-slate-50 border-slate-200 hover:bg-indigo-50'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-indigo-500 text-white">
                <CloudSnow className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-slate-800 block">Fluffy Snow</span>
                <span className="text-xs text-slate-500">Below 0°C Freezing</span>
              </div>
            </button>

            {/* Option 3: Hail */}
            <button
              onClick={() => {
                sound.playPop();
                setPrecipType('hail');
              }}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                precipType === 'hail'
                  ? 'bg-purple-100 border-purple-500 shadow-md ring-2 ring-purple-300'
                  : 'bg-slate-50 border-slate-200 hover:bg-purple-50'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-purple-600 text-white">
                <CloudLightning className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-slate-800 block">Storm Hail</span>
                <span className="text-xs text-slate-500">Violent Updrafts</span>
              </div>
            </button>
          </div>
        </div>

        {/* Explanation banner */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3.5 text-xs text-teal-900">
          <strong>{theme.title}:</strong> {theme.desc}
        </div>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
          {hasLanded ? (
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Precipitation successfully delivered Pip to Earth!
            </div>
          ) : (
            <span className="text-xs font-semibold text-slate-500">
              Cloud is saturated. Gravity is ready to pull Pip down!
            </span>
          )}

          <button
            onClick={handleTriggerPrecipitation}
            disabled={isFalling}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-sm text-white shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isFalling
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 hover:scale-105 active:scale-95'
            }`}
          >
            <Play className="w-4 h-4 fill-white" />
            {isFalling ? 'Skydiving in progress...' : 'Unleash Cloud Burst!'}
          </button>
        </div>
      </div>
    </div>
  );
}
