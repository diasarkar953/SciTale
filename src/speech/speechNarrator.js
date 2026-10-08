// Enhanced Web Speech API Storyteller for SciTale with warm, cheerful narration

class SpeechNarrator {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.speaking = false;
    this.selectedVoiceURI = null;
    this.voices = [];
    this.listeners = new Set();
    this.activeUtterances = [];
    this.activeAudio = null;
    this.requestController = null;

    if (this.synth) {
      this.loadVoices();
      if (typeof window !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    const allVoices = this.synth.getVoices();
    // Filter to English voices for our curriculum
    const enVoices = allVoices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
    this.voices = enVoices.length > 0 ? enVoices : allVoices;

    // Auto-select best cheerful female storyteller voice if none explicitly chosen
    if (!this.selectedVoiceURI && this.voices.length > 0) {
      const best = this.findBestStorytellerVoice(this.voices);
      if (best) {
        this.selectedVoiceURI = best.voiceURI;
      }
    }

    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach((fn) => fn(this.getVoiceList(), this.getSelectedVoice()));
  }

  findBestStorytellerVoice(voiceList) {
    // Priority order for cheerful, natural, expressive female voices in Windows/Chrome/Edge/Safari
    const preferredNames = [
      // Windows Edge / Online Natural voices
      'microsoft aria online (natural)',
      'microsoft jenny online (natural)',
      'microsoft ava online (natural)',
      'microsoft emma online (natural)',
      'microsoft michelle online (natural)',
      'microsoft ana online (natural)',
      // Windows Standard Female
      'microsoft zira',
      'microsoft zira desktop',
      // Google / Chrome
      'google us english',
      'google uk english female',
      // Apple / Safari
      'samantha',
      'victoria',
      'karen',
      'fiona',
      'tessa',
      'moira'
    ];

    // 1. Check exact/fuzzy match against preferred cheerful female names
    for (const pref of preferredNames) {
      const found = voiceList.find((v) => v.name.toLowerCase().includes(pref));
      if (found) return found;
    }

    // 2. Check for any voice mentioning 'female' or 'natural' in English
    const femaleOrNatural = voiceList.find(
      (v) =>
        v.lang.toLowerCase().startsWith('en') &&
        (v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('natural') ||
          v.name.toLowerCase().includes('girl'))
    );
    if (femaleOrNatural) return femaleOrNatural;

    // 3. Any en-US voice
    const enUS = voiceList.find((v) => v.lang.toLowerCase().replace('_', '-').includes('en-us'));
    if (enUS) return enUS;

    // 4. Any English voice
    return voiceList.find((v) => v.lang.toLowerCase().startsWith('en')) || voiceList[0] || null;
  }

  getVoiceList() {
    return this.voices;
  }

  getSelectedVoice() {
    if (!this.voices.length) return null;
    return this.voices.find((v) => v.voiceURI === this.selectedVoiceURI) || this.findBestStorytellerVoice(this.voices);
  }

  setVoice(voiceURI) {
    this.selectedVoiceURI = voiceURI;
    this.notifyListeners();
  }

  isAvailable() {
    return !!this.synth;
  }

  // Pre-process text to add expressive punctuation pauses for children's storytelling
  formatStorytellerScript(text) {
    return text
      .replace(/\s+/g, ' ')
      .replace(/([.!?])\s*/g, '$1 ')
      .replace(/H₂O/g, 'H-2-O')
      .replace(/°C/g, ' degrees Celsius')
      .trim();
  }

  async speak(text, onEnd) {
    this.stop();

    const formattedText = this.formatStorytellerScript(text);
    this.speaking = true;
    this.requestController = new AbortController();

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: formattedText }),
        signal: this.requestController.signal,
      });

      if (response.ok) {
        const audio = new Audio(URL.createObjectURL(await response.blob()));
        this.activeAudio = audio;
        audio.onended = () => {
          URL.revokeObjectURL(audio.src);
          this.activeAudio = null;
          this.speaking = false;
          if (onEnd) onEnd();
        };
        audio.onerror = () => {
          URL.revokeObjectURL(audio.src);
          this.activeAudio = null;
          this.speakWithBrowser(formattedText, onEnd);
        };
        await audio.play();
        return;
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
    }

    this.speakWithBrowser(formattedText, onEnd);
  }

  speakWithBrowser(formattedText, onEnd) {
    if (!this.synth || typeof SpeechSynthesisUtterance === 'undefined') {
      this.speaking = false;
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(formattedText);

    // Warm, cheerful, energetic rate and pitch for a friendly children's narrator
    utterance.rate = 1.08; // lively pace while keeping the story easy to follow
    utterance.pitch = 1.28; // brighter tone for an upbeat storyteller
    utterance.volume = 1;

    const voice = this.getSelectedVoice();
    if (voice) {
      utterance.voice = voice;
    }

    this.speaking = true;

    utterance.onend = () => {
      this.speaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech narration notice:', e);
      this.speaking = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.requestController) {
      this.requestController.abort();
      this.requestController = null;
    }
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio = null;
    }
    if (this.synth) this.synth.cancel();
    this.speaking = false;
  }

  isCurrentlySpeaking() {
    return this.speaking || (this.synth ? this.synth.speaking : false);
  }
}

export const narrator = new SpeechNarrator();
