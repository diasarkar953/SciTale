import React from 'react';
import { BookOpen, X, Sparkles } from 'lucide-react';
import { glossarySections } from '../data/glossaryData';
import { sound } from '../audio/soundEffects';

export default function GlossaryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] shadow-2xl border-4 border-sky-300 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-amber-300" />
            <div>
              <h3 className="text-lg font-black leading-tight">
                Beaky’s Word Explorer
              </h3>
              <p className="text-xs text-sky-100 font-semibold">
                Helpful words from every science and maths adventure
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-3.5 divide-y divide-slate-100 flex-1">
          {glossarySections.map((section) => (
            <section key={section.title} className="pt-3 first:pt-0">
              <h4 className="mb-2 flex items-center gap-2 border-b border-sky-100 pb-1.5 text-sm font-black text-indigo-800">
                <span aria-hidden="true">{section.icon}</span>
                <span>{section.title}</span>
              </h4>
              <div className="space-y-3">
                {section.terms.map((item) => (
                  <div key={item.term}>
                    <div className="flex items-center gap-1.5 text-sm font-black text-sky-900">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span>{item.term}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.def}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-black rounded-xl shadow transition cursor-pointer"
          >
            Got It, Thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
