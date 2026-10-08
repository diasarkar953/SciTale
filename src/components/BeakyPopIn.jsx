import React, { useEffect, useState } from 'react';
import { sound } from '../audio/soundEffects';
import SciTaleBird from './SciTaleBird';

const cheerLines = [
  "Tweet! You're doing great!",
  'Wow, look at you go! Keep exploring!',
  'A new page, a new discovery!'
];

export default function BeakyPopIn({ active, pageKey }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return undefined;
    }

    let hideTimer;
    let firstPop;
    const popIn = (line) => {
      setMessage(line);
      setVisible(true);
      sound.playBirdChirp();
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setVisible(false), 5200);
    };
    const handleComment = (event) => {
      if (typeof event.detail === 'string' && event.detail.trim()) {
        clearTimeout(firstPop);
        popIn(event.detail);
      }
    };
    window.addEventListener('scytale:beaky-comment', handleComment);

    firstPop = setTimeout(() => popIn(cheerLines[0]), 7000);
    let nextCheer = 1;
    const repeatPop = setInterval(() => {
      popIn(cheerLines[nextCheer % cheerLines.length]);
      nextCheer += 1;
    }, 42000);

    return () => {
      clearTimeout(firstPop);
      clearInterval(repeatPop);
      clearTimeout(hideTimer);
      window.removeEventListener('scytale:beaky-comment', handleComment);
      setVisible(false);
    };
  }, [active, pageKey]);

  if (!active || !visible) return null;

  return (
    <div className="fixed bottom-5 right-3 sm:right-6 z-40 flex items-end gap-2 pointer-events-none animate-beaky-pop">
      <div className="max-w-48 rounded-2xl rounded-br-sm border-2 border-sky-200 bg-white px-3 py-2 text-xs font-black leading-snug text-indigo-900 shadow-lg">
        {message}
      </div>
      <div className="pointer-events-auto animate-float">
        <SciTaleBird className="w-20 h-20 drop-shadow-lg" showMessages={false} />
      </div>
    </div>
  );
}
