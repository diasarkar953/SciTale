import React, { useState } from 'react';
import { CheckCircle2, Lightbulb, Sparkles } from 'lucide-react';
import { sound } from '../audio/soundEffects';
import SciTaleBird from './SciTaleBird';
import { getTeachItBackChallenge } from '../data/teachItBackData';

export default function TeachItBack({ adventureId, ageGroupId, topicId, adventureName, quizScore, quizTotal, quizMisses = [], quizErrors = {}, quizItems = [] }) {
  const challenge = getTeachItBackChallenge(adventureId, ageGroupId, topicId);
  const [stage, setStage] = useState('challenge');
  const [sequence, setSequence] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [complete, setComplete] = useState(false);
  const [assisted, setAssisted] = useState(false);

  const resultText = assisted
    ? 'Finished with Beaky’s hint'
    : mistakes === 0
      ? 'Solved on the first try'
      : 'Solved after a little practice';
  const practiceItems = [
    ...quizMisses.map((item) => `Quiz review: ${item}`),
    ...((quizScore < quizTotal || mistakes > 0) ? [challenge.practice] : []),
  ];
  const parentReportData = {
    adventureId, topicId, adventureName, quizScore, quizTotal, quizErrors, quizItems,
    teachItBack: {
      concept: challenge.concept,
      evidenceText: [challenge.task, challenge.prompt, challenge.steps?.join(' '), challenge.options?.join(' ')].filter(Boolean).join(' '),
      practice: challenge.practice,
      nextAdventure: challenge.nextAdventure,
      mistakes,
      assisted,
    },
  };

  const chooseSequence = (choice) => {
    if (complete) return;
    const expected = challenge.steps[sequence.length];
    if (choice === expected) {
      const next = [...sequence, choice];
      setSequence(next);
      setFeedback(next.length === challenge.steps.length ? 'That’s the whole story of it! Beaky is doing a happy flap!' : 'Yes! What happens next?');
      sound.playDing();
      if (next.length === challenge.steps.length) setComplete(true);
    } else {
      setMistakes((count) => count + 1);
      setFeedback(`Beaky’s hint: ${challenge.hint}`);
      sound.playBoop();
    }
  };

  const chooseScenario = (index) => {
    if (complete) return;
    if (index === challenge.correctIndex) {
      setComplete(true);
      setFeedback('You used what you learned to solve a new problem! Beaky is cheering for you!');
      sound.playDing();
    } else {
      setMistakes((count) => count + 1);
      setFeedback(`Beaky’s hint: ${challenge.hint}`);
      sound.playBoop();
    }
  };

  const askBeaky = () => {
    setAssisted(true);
    setComplete(true);
    setFeedback(challenge.type === 'sequence'
      ? 'Here’s the order: ' + challenge.steps.join(' → ')
      : challenge.options[challenge.correctIndex]);
    sound.playBirdChirp();
  };

  return (
    <section className="w-full max-w-3xl mx-auto mt-6 rounded-3xl border-4 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-sky-50 p-5 md:p-7 shadow-xl animate-fade-in" aria-live="polite">
      {stage === 'challenge' ? (
        <>
          <div className="flex items-center gap-3 mb-4">
            <SciTaleBird className="w-14 h-14" showMessages={false} />
            <div>
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700"><Sparkles className="w-4 h-4" /> Beaky’s Teach-It-Back</p>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">{challenge.task}</h3>
            </div>
          </div>
          <p className="mb-4 text-sm md:text-base font-bold leading-relaxed text-slate-700">{challenge.prompt}</p>
          {challenge.type === 'sequence' ? (
            <>
              <ol className="mb-4 space-y-2" aria-label="Your ordered steps">
                {sequence.map((item, index) => <li key={`${item}-${index}`} className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-3 text-sm font-bold text-emerald-900">{index + 1}. {item}</li>)}
              </ol>
              {!complete && <div className="grid gap-2">{challenge.choices.filter((choice) => !sequence.includes(choice)).map((choice) => <button key={choice} onClick={() => chooseSequence(choice)} className="rounded-xl border-2 border-sky-200 bg-white p-3 text-left text-sm font-bold text-slate-800 transition hover:border-sky-400 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300">{choice}</button>)}</div>}
            </>
          ) : (
            <div className="grid gap-2">{challenge.options.map((option, index) => <button key={option} onClick={() => chooseScenario(index)} disabled={complete} className={`rounded-xl border-2 p-3 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 ${complete && index === challenge.correctIndex ? 'border-emerald-400 bg-emerald-50 text-emerald-900' : 'border-sky-200 bg-white text-slate-800 hover:border-sky-400 hover:bg-sky-50'}`}>{option}</button>)}</div>
          )}
          {feedback && <p className={`mt-4 rounded-xl border p-3 text-sm font-bold ${complete ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-amber-200 bg-amber-50 text-amber-900'}`}>{feedback}</p>}
          {mistakes >= 2 && !complete && <button onClick={askBeaky} className="mt-3 rounded-xl border-2 border-amber-300 bg-amber-100 px-4 py-2 text-sm font-black text-amber-950 hover:bg-amber-200">Let Beaky help</button>}
          {complete && <button onClick={() => { setStage('snapshot'); sound.playBirdChirp(); }} className="mt-4 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 font-black text-white shadow-lg transition hover:scale-[1.01]">See My Learning Snapshot</button>}
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-4">
            <SciTaleBird className="w-14 h-14" showMessages={false} />
            <div>
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-700"><CheckCircle2 className="w-4 h-4" /> Beaky’s Learning Snapshot</p>
              <p className="text-sm font-bold text-slate-700">{assisted ? 'You kept going and learned with a hint—great scientist work!' : mistakes === 0 ? 'Amazing first try! Beaky is doing a victory flap!' : 'You stuck with it and figured it out. Beaky is proud of you!'}</p>
            </div>
          </div>
          <div className="grid gap-3 text-sm">
            <p className="rounded-xl bg-emerald-50 p-3 text-emerald-950"><strong>Understanding demonstrated:</strong> {assisted ? `With Beaky’s hint, you practiced ${challenge.concept}.` : challenge.demonstrated}</p>
            <div className="rounded-xl bg-amber-50 p-3 text-amber-950"><strong>May need more practice:</strong>{practiceItems.length ? <ul className="mt-1 list-disc pl-5">{practiceItems.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul> : <span> No specific practice area was flagged this time. Keep building on {challenge.concept} in another adventure.</span>}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <p className="rounded-xl border border-indigo-200 bg-indigo-50 p-3 font-bold text-indigo-950"><strong>Quiz:</strong> {quizScore} / {quizTotal}</p>
              <p className="rounded-xl border border-sky-200 bg-sky-50 p-3 font-bold text-sky-950"><strong>Teach-It-Back:</strong> {resultText}</p>
            </div>
            <p className="flex items-start gap-2 rounded-xl border border-violet-200 bg-violet-50 p-3 text-violet-950"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0" /><span><strong>Suggested next adventure:</strong> {challenge.nextAdventure}</span></p>
          </div>
          <button onClick={() => window.dispatchEvent(new CustomEvent('scytale:open-learning-report', { detail: parentReportData }))} className="mt-5 w-full rounded-2xl border-2 border-indigo-300 bg-white px-5 py-3 text-sm font-black text-indigo-900 shadow-sm transition hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300">For Parents &amp; Teachers / Learning Report</button>
        </>
      )}
    </section>
  );
}
