import React, { useState } from 'react';
import { sound } from '../audio/soundEffects';

const birdLines = [
  'Tweet-tastic! Ready to explore?',
  'Ooh, a science mystery! Let’s find the clues!',
  'You did it! That deserves a happy flap!',
  'Curiosity makes the best adventures. Let’s go!',
];

export default function SciTaleBird({ className = '', showMessages = true }) {
  const [lineIndex, setLineIndex] = useState(-1);

  const chirp = () => {
    const nextIndex = (lineIndex + 1) % birdLines.length;
    if (showMessages) setLineIndex(nextIndex);
    sound.playBirdChirp();
  };

  return (
    <div className="relative flex flex-col items-center">
      {showMessages && lineIndex >= 0 && (
        <div aria-live="polite" className="mb-2 rounded-2xl border-2 border-sky-200 bg-white px-3 py-2 text-center text-xs font-black text-indigo-800 shadow-lg">
          {birdLines[lineIndex]}
        </div>
      )}
      <button
        type="button"
        onClick={chirp}
        aria-label="Hear a cheerful line from Beaky"
        title="Click Beaky to hear a chirp!"
        className="cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
      >
        <svg
          viewBox="0 0 180 180"
          role="img"
          aria-label="Beaky, SciTale’s cheerful little bird mascot"
          className={className}
        >
          <ellipse cx="91" cy="162" rx="48" ry="8" fill="#312e81" opacity="0.18" />
          <g className="origin-bottom transition-transform duration-300 hover:-rotate-3 hover:scale-105">
        {/* Tiny crest */}
        <path d="M80 29c-10-16-25-14-24-2 1 8 12 11 24 10" fill="#fb923c" />
        <path d="M92 27c-5-17 8-25 15-16 5 7-1 15-11 20" fill="#f97316" />
        {/* Chubby bird body */}
        <path d="M40 94c0-35 22-59 53-59s54 24 54 59c0 31-22 55-54 55S40 125 40 94Z" fill="#fbbf24" stroke="#b45309" strokeWidth="4" />
        {/* Wing */}
        <path d="M48 99c-17-3-24 8-18 19 6 10 19 12 31 4" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
        <path d="M50 105c-7 0-10 5-7 10" fill="none" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" />
        {/* Belly */}
        <ellipse cx="96" cy="111" rx="31" ry="34" fill="#fff7d6" />
        {/* Eyes and happy brows */}
        <path d="M71 72c5-4 11-4 16 0M105 72c5-4 11-4 16 0" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="79" cy="85" rx="6" ry="9" fill="#422006" />
        <ellipse cx="113" cy="85" rx="6" ry="9" fill="#422006" />
        <circle cx="81" cy="82" r="2" fill="white" />
        <circle cx="115" cy="82" r="2" fill="white" />
        {/* Beak and rosy cheeks */}
        <path d="m88 94 10-1 11 7-11 7-10-2 4-5Z" fill="#fb7185" stroke="#9f1239" strokeWidth="2" strokeLinejoin="round" />
        <ellipse cx="65" cy="99" rx="7" ry="4" fill="#fb7185" opacity="0.55" />
        <ellipse cx="129" cy="99" rx="7" ry="4" fill="#fb7185" opacity="0.55" />
        {/* Feet */}
        <path d="M75 145v8m0 0-8 4m8-4 8 4m26-12v8m0 0-8 4m8-4 8 4" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        {/* Little explorer scarf */}
        <path d="M66 129c16 10 39 10 57 0l-2 9c-18 12-39 12-55 0Z" fill="#38bdf8" stroke="#075985" strokeWidth="2" />
        <path d="m112 137 10 4-7 12-7-5Z" fill="#0ea5e9" stroke="#075985" strokeWidth="2" strokeLinejoin="round" />
          </g>
          <path d="m145 42 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="#fde68a" />
          <circle cx="38" cy="62" r="4" fill="#bfdbfe" />
        </svg>
      </button>
    </div>
  );
}
