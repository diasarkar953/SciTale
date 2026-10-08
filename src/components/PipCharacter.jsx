import React, { useState } from 'react';
import { sound } from '../audio/soundEffects';

export default function PipCharacter({
  mood = 'liquid', // 'liquid' | 'hot' | 'vapor' | 'cold' | 'rain' | 'proud'
  size = 140,
  speechText = '',
  onClick = null,
  className = ''
}) {
  const [bounced, setBounced] = useState(false);
  const [bubbleText, setBubbleText] = useState(speechText);

  const handleClick = () => {
    sound.playPop();
    setBounced(true);
    setTimeout(() => setBounced(false), 500);

    const friendlyRemarks = {
      liquid: "Splish splash! Liquid H₂O is full of flow!",
      hot: "Whew! Getting warm in here! My atoms are vibrating fast!",
      vapor: "Wheee! I'm light as air, soaring into the sky!",
      cold: "Brrr! Chilly up here! Let's huddle onto a dust speck!",
      rain: "Geronimo! Parachuting down to Earth!",
      proud: "Science rocks! You're doing amazing, Hydrologist!"
    };

    setBubbleText(friendlyRemarks[mood] || "Hello! I'm Pip the Water Molecule!");
    if (onClick) onClick();
  };

  // Color schemes based on mood
  const getDropletGradient = () => {
    switch (mood) {
      case 'hot':
        return {
          start: '#fb7185',
          end: '#f43f5e',
          glow: 'rgba(244, 63, 94, 0.4)'
        };
      case 'vapor':
        return {
          start: '#bae6fd',
          end: '#7dd3fc',
          glow: 'rgba(125, 211, 252, 0.5)'
        };
      case 'cold':
        return {
          start: '#a5f3fc',
          end: '#38bdf8',
          glow: 'rgba(56, 189, 248, 0.4)'
        };
      case 'rain':
        return {
          start: '#38bdf8',
          end: '#0284c7',
          glow: 'rgba(2, 132, 199, 0.4)'
        };
      case 'proud':
        return {
          start: '#38bdf8',
          end: '#2563eb',
          glow: 'rgba(37, 99, 235, 0.4)'
        };
      default:
        return {
          start: '#38bdf8',
          end: '#0ea5e9',
          glow: 'rgba(14, 165, 233, 0.4)'
        };
    }
  };

  const grad = getDropletGradient();

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none cursor-pointer group ${className}`}
      onClick={handleClick}
      title="Click Pip to say hello!"
    >
      {/* Dynamic Speech Bubble */}
      {(bubbleText || speechText) && (
        <div className="absolute -top-12 z-20 bg-white/95 text-slate-800 text-xs md:text-sm font-bold px-3 py-1.5 rounded-2xl shadow-lg border-2 border-sky-300 max-w-xs text-center animate-bounce-slow pointer-events-none">
          {bubbleText || speechText}
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-white" />
        </div>
      )}

      {/* Main SVG Pip Droplet */}
      <div
        className={`transition-transform duration-300 ${
          bounced ? 'scale-115 rotate-6' : 'group-hover:scale-105'
        }`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 160 180"
          className="w-full h-full drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`pipGrad-${mood}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={grad.start} />
              <stop offset="100%" stopColor={grad.end} />
            </linearGradient>
            <radialGradient id={`glow-${mood}`} cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Vapor Trail if in vapor mood */}
          {mood === 'vapor' && (
            <g opacity="0.6" className="animate-pulse">
              <path
                d="M 50 160 Q 40 175 45 190 M 80 165 Q 85 180 80 195 M 110 160 Q 120 175 115 190"
                stroke="#7dd3fc"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* Droplet Body */}
          <path
            d="M 80 15 
               C 105 60 145 95 145 125 
               A 65 65 0 0 1 15 125 
               C 15 95 55 60 80 15 Z"
            fill={`url(#pipGrad-${mood})`}
            stroke="#ffffff"
            strokeWidth="3.5"
          />

          {/* Glossy Light Highlight */}
          <ellipse
            cx="55"
            cy="90"
            rx="18"
            ry="30"
            transform="rotate(-25 55 90)"
            fill="url(#glow-default)"
            opacity="0.5"
          />

          {/* Cheerful Eyes */}
          {mood === 'cold' ? (
            // Shivering eyes
            <g>
              <ellipse cx="60" cy="110" rx="6" ry="7" fill="#0f172a" />
              <ellipse cx="100" cy="110" rx="6" ry="7" fill="#0f172a" />
              <circle cx="58" cy="108" r="2.5" fill="#ffffff" />
              <circle cx="98" cy="108" r="2.5" fill="#ffffff" />
            </g>
          ) : mood === 'proud' ? (
            // Cool Sunglasses
            <g>
              <rect x="42" y="100" width="34" height="20" rx="6" fill="#1e293b" />
              <rect x="84" y="100" width="34" height="20" rx="6" fill="#1e293b" />
              <rect x="76" y="106" width="8" height="4" fill="#1e293b" />
              <line x1="46" y1="104" x2="60" y2="116" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <line x1="88" y1="104" x2="102" y2="116" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : (
            // Big Sparkling Anime/Cartoon Eyes
            <g>
              <ellipse cx="60" cy="106" rx="8" ry="11" fill="#0f172a" />
              <ellipse cx="100" cy="106" rx="8" ry="11" fill="#0f172a" />
              <circle cx="57" cy="102" r="3.5" fill="#ffffff" />
              <circle cx="97" cy="102" r="3.5" fill="#ffffff" />
              <circle cx="63" cy="112" r="1.5" fill="#ffffff" />
              <circle cx="103" cy="112" r="1.5" fill="#ffffff" />
            </g>
          )}

          {/* Rosy Cheeks */}
          <circle cx="46" cy="122" r="7" fill="#fb7185" opacity="0.6" />
          <circle cx="114" cy="122" r="7" fill="#fb7185" opacity="0.6" />

          {/* Expressive Mouth */}
          {mood === 'hot' ? (
            // Panting warm mouth + sweat droplet
            <g>
              <ellipse cx="80" cy="128" rx="8" ry="6" fill="#b91c1c" />
              <circle cx="80" cy="130" r="4" fill="#fca5a5" />
              {/* Sweat droplet */}
              <circle cx="120" cy="85" r="4" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
            </g>
          ) : mood === 'cold' ? (
            // Shivering squiggly mouth
            <path
              d="M 68 126 Q 74 122 80 126 T 92 126"
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            // Happy Open Smile
            <path
              d="M 68 122 Q 80 138 92 122"
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Cute accessories based on mood */}
          {mood === 'rain' && (
            // Aviator / diver goggles on forehead
            <g>
              <rect x="48" y="70" width="28" height="18" rx="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
              <rect x="84" y="70" width="28" height="18" rx="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
              <line x1="76" y1="79" x2="84" y2="79" stroke="#0284c7" strokeWidth="3" />
              <path d="M 52 74 L 62 84" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <path d="M 88 74 L 98 84" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {mood === 'cold' && (
            // Winter earmuffs
            <g>
              <ellipse cx="28" cy="100" rx="8" ry="12" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <ellipse cx="132" cy="100" rx="8" ry="12" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <path d="M 30 92 C 45 45 115 45 130 92" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* Molecule Label Badge (H2O) */}
          <g>
            <rect x="62" y="146" width="36" height="18" rx="9" fill="#ffffff" stroke="#bae6fd" strokeWidth="1.5" />
            <text x="80" y="159" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="800" fontFamily="sans-serif">
              H₂O
            </text>
          </g>
        </svg>
      </div>

      <span className="mt-1 text-xs font-black text-sky-800 bg-sky-100/90 px-2 py-0.5 rounded-full border border-sky-300">
        Pip ({mood})
      </span>
    </div>
  );
}
