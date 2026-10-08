import React, { useState, useEffect } from 'react';
import { Volume2, X, Check, Sparkles, Play, Award } from 'lucide-react';
import { narrator } from '../speech/speechNarrator';
import { sound } from '../audio/soundEffects';

export default function VoiceSelectorModal({ isOpen, onClose }) {
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [isPreviewing, setIsPreviewing] = useState(false);

  useEffect(() => {
    const updateVoices = () => {
      const list = narrator.getVoiceList();
      setVoices(list);
      const current = narrator.getSelectedVoice();
      if (current) {
        setSelectedVoiceURI(current.voiceURI);
      }
    };

    updateVoices();
    const unsubscribe = narrator.subscribe(updateVoices);
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleSelectVoice = (uri) => {
    sound.playPop();
    setSelectedVoiceURI(uri);
    narrator.setVoice(uri);
  };

  const handlePreview = (uri) => {
    sound.playPop();
    handleSelectVoice(uri);
    setIsPreviewing(true);

    const greetingSample = "Hi there! I'm your science storyteller. Today we're going on an awesome journey through the wonders of nature!";
    narrator.speak(greetingSample, () => {
      setIsPreviewing(false);
    });
  };

  const isRecommendedVoice = (voice) => {
    const name = voice.name.toLowerCase();
    return (
      name.includes('aria') ||
      name.includes('jenny') ||
      name.includes('samantha') ||
      name.includes('zira') ||
      name.includes('google us english') ||
      name.includes('natural') ||
      name.includes('ava') ||
      name.includes('female')
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] shadow-2xl border-4 border-amber-300 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl">
              <Volume2 className="w-6 h-6 text-yellow-200" />
            </div>
            <div>
              <h3 className="text-lg font-black leading-tight">
                Storyteller Voice Selector
              </h3>
              <p className="text-xs text-amber-100 font-semibold">
                Choose the best cheerful voice for Beaky’s narration
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              narrator.stop();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info banner */}
        <div className="bg-amber-50 px-5 py-3 border-b border-amber-200 text-xs text-amber-900 font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            SciTale automatically selects the most cheerful, warm female storyteller available on your device.
          </span>
        </div>

        {/* Voice List */}
        <div className="p-5 overflow-y-auto space-y-2 flex-1">
          {voices.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm font-bold">
              Loading browser speech voices...
            </div>
          ) : (
            voices.map((voice) => {
              const isSelected = voice.voiceURI === selectedVoiceURI;
              const recommended = isRecommendedVoice(voice);

              return (
                <div
                  key={voice.voiceURI}
                  onClick={() => handleSelectVoice(voice.voiceURI)}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 shadow-sm ring-2 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 hover:bg-amber-50/50 hover:border-amber-200'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-800 truncate">
                        {voice.name}
                      </span>
                      {recommended && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0">
                          ⭐ Recommended
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-medium block">
                      Language: {voice.lang} {voice.localService ? '• Offline' : '• High-Quality'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(voice.voiceURI);
                      }}
                      className="p-2 rounded-xl bg-white hover:bg-amber-100 text-amber-700 border border-amber-300 text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                      title="Preview this voice"
                    >
                      <Play className="w-3.5 h-3.5 fill-amber-700" />
                      <span className="hidden sm:inline">Preview</span>
                    </button>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-500 font-bold">
            {voices.length} English voices found
          </span>
          <button
            onClick={() => {
              sound.playPop();
              narrator.stop();
              onClose();
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black rounded-xl shadow transition cursor-pointer"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
