import React from 'react';
import { ArrowLeft, Award, BookOpenCheck, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { buildLearningReport } from '../data/learningReport';

const statusColors = {
  Mastered: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  Strong: 'border-sky-300 bg-sky-50 text-sky-900',
  Developing: 'border-amber-300 bg-amber-50 text-amber-950',
  'Needs Practice': 'border-rose-300 bg-rose-50 text-rose-950',
  'Not Assessed': 'border-slate-300 bg-slate-50 text-slate-700',
};

export default function ParentTeacherReport({ reportData, onClose }) {
  const report = buildLearningReport(reportData);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-50 via-white to-indigo-50 px-4 py-5 md:px-8 md:py-8" aria-labelledby="parent-report-title">
      <main className="w-full min-h-screen bg-white px-4 py-5 md:px-8 md:py-8">
        <button onClick={onClose} className="mb-5 inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-black text-indigo-900 transition hover:bg-indigo-100">
          <ArrowLeft className="h-4 w-4" /> Back to adventure
        </button>

        <header className="mb-6 border-b border-slate-200 pb-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-indigo-700">For Parents &amp; Teachers</p>
          <h1 id="parent-report-title" className="mt-1 text-2xl font-black text-slate-950 md:text-3xl">Learning Report</h1>
          <p className="mt-1 font-bold text-slate-600">{report.adventureName}</p>
        </header>

        <section className="mb-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-indigo-700" />
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-indigo-700">Overall understanding</p>
                <h2 className="text-2xl font-black text-indigo-950">{report.overallStatus}</h2>
              </div>
            </div>
            <p className="max-w-xl text-sm font-semibold leading-relaxed text-indigo-950">{report.overallExplanation}</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-indigo-200 bg-white p-3 text-sm text-slate-800">
              <strong>Quiz performance:</strong> {report.quizScore} / {report.quizTotal} correct after retries
              <span className="mt-1 block text-xs font-semibold text-slate-600">{report.quizRetries} incorrect attempt{report.quizRetries === 1 ? '' : 's'} before correct answers</span>
            </div>
            <div className="rounded-xl border border-indigo-200 bg-white p-3 text-sm text-slate-800">
              <strong>Teach-It-Back:</strong> {report.teachResult}
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-slate-900"><BookOpenCheck className="h-5 w-5 text-sky-700" /> Concept and section breakdown</h2>
          <div className="grid gap-3">
            {report.concepts.map((concept) => (
              <article key={concept.title} className={`rounded-2xl border-2 p-4 ${statusColors[concept.status]}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-black">{concept.title}</h3>
                  <span className="rounded-full border border-current/20 bg-white/70 px-3 py-1 text-xs font-black">{concept.status}</span>
                </div>
                <p className="mt-2 text-sm font-medium leading-relaxed">{concept.explanation}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4">
            <h2 className="mb-2 flex items-center gap-2 font-black text-emerald-950"><TrendingUp className="h-5 w-5" /> Strengths</h2>
            {report.strengths.length ? <ul className="list-disc space-y-1 pl-5 text-sm font-medium text-emerald-950">{report.strengths.map((item) => <li key={item.title}>{item.title} — {item.status.toLowerCase()}</li>)}</ul> : <p className="text-sm font-medium text-emerald-950">The child is still building confidence; celebrate persistence and progress.</p>}
          </section>
          <section className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
            <h2 className="mb-2 flex items-center gap-2 font-black text-amber-950"><Target className="h-5 w-5" /> Areas for more practice</h2>
            {report.practiceAreas.length ? <ul className="list-disc space-y-1 pl-5 text-sm font-medium text-amber-950">{report.practiceAreas.map((item) => <li key={item.title}>{item.title} — {item.status.toLowerCase()}</li>)}</ul> : <p className="text-sm font-medium text-amber-950">No specific area was flagged in this session.</p>}
          </section>
        </div>

        <section className="mt-5 rounded-2xl border-2 border-violet-200 bg-violet-50 p-5">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-black text-violet-950"><Lightbulb className="h-5 w-5" /> Recommended Next Step</h2>
          <p className="text-sm font-semibold leading-relaxed text-violet-950">{report.recommendedNextStep}</p>
        </section>
        <p className="mt-4 text-xs font-medium text-slate-500">This report reflects answers and challenge attempts from this adventure session only.</p>
      </main>
    </div>
  );
}
