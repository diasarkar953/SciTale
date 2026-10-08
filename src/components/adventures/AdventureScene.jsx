import React from 'react';

export default function AdventureScene({ items, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex min-h-24 items-center justify-around overflow-hidden rounded-3xl border bg-gradient-to-r px-3 py-4 sm:px-6 ${className}`}
    >
      <div className="absolute -left-5 -top-8 h-20 w-20 rounded-full bg-white/40 blur-xl" />
      <div className="absolute -bottom-10 right-8 h-24 w-24 rounded-full bg-white/30 blur-xl" />
      <div className="relative flex w-full items-center justify-around gap-1 sm:gap-3">
        {items.map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            <span
              className="story-scene-token text-3xl sm:text-5xl"
              style={{ '--scene-delay': `${index * 160}ms` }}
            >
              <span className="story-scene-float inline-block">{item}</span>
            </span>
            {index < items.length - 1 && (
              <span
                className="story-scene-arrow text-sm font-black text-indigo-400/80 sm:text-xl"
                style={{ '--scene-delay': `${index * 160 + 100}ms` }}
              >
                ✦
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
