const correctQuizComments = [
  'Tweet! You spotted the clue!',
  'Great thinking, explorer! That fits the story clues.',
  'Beak-tastic answer! Keep that curious brain going!'
];

export function beakyComment(message) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('scytale:beaky-comment', { detail: message }));
}

export function friendlyQuizHint(explanation, fallback = '') {
  const hint = String(explanation || '').replace(/^(?:correct|spot on|awesome|exactly|you got it|perfect logical deduction|perfect|yes|great job|brilliant)[!.:,]?\s*/i, '').trim();
  return hint || fallback || 'Think back to the story clues and try again!';
}

export function beakyQuizReaction(isCorrect, topic = 'science', hint = '') {
  if (isCorrect) {
    const index = Math.floor(Math.random() * correctQuizComments.length);
    beakyComment(correctQuizComments[index]);
  } else {
    beakyComment(hint ? `Good try! Here’s a clue about ${topic}: ${friendlyQuizHint(hint)}` : `Good try! Think back to the ${topic} story clue and give it another thought.`);
  }
}
