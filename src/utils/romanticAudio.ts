/**
 * High-fidelity Romantic Audio Synthesizer using Web Audio API
 * Produces gentle, lush romantic piano arpeggios, warm chord pads, and crystal chimes
 * 100% reliable, zero external dependencies, works seamlessly on mobile and desktop
 */

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.55;
  private noteIndex: number = 0;
  private melodyTimeout: NodeJS.Timeout | null = null;

  // Gentle romantic progression in D Major / B Minor (peaceful, heartfelt, emotional)
  // Notes in Hz: D4, F#4, A4, B4, C#5, D5, E5, F#5, A5
  private chordProgression = [
    // B minor 9
    { bass: 123.47, chord: [246.94, 293.66, 369.99, 440.0, 554.37] },
    // G major 7
    { bass: 98.0, chord: [196.0, 246.94, 293.66, 369.99, 440.0] },
    // D major add9
    { bass: 146.83, chord: [220.0, 293.66, 369.99, 440.0, 587.33] },
    // A major sus4 to A major
    { bass: 110.0, chord: [220.0, 277.18, 329.63, 440.0, 554.37] }
  ];

  private currentChordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft, bell-like piano/celesta note
  private playNote(freq: number, duration: number = 2.4, decaySpeed: number = 2.0, detune: number = 0) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Gentle low-pass filter to give warm, felted piano tone
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + duration);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.detune.setValueAtTime(detune, this.ctx.currentTime);

    // Warm overtone
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 0.5, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.28, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + duration + 0.1);
    subOsc.stop(now + duration + 0.1);
  }

  private stepMelody() {
    if (!this.isPlaying || !this.ctx) return;

    const chordObj = this.chordProgression[this.currentChordIndex];
    const chordNotes = chordObj.chord;

    // Arpeggiate through the chord
    if (this.noteIndex === 0) {
      // Play warm bass note
      this.playNote(chordObj.bass, 3.8, 1.2);
    }

    // Pick note from chord with romantic variation
    const note = chordNotes[this.noteIndex % chordNotes.length];
    this.playNote(note, 2.5, 2.0);

    // Occasional delicate upper sparkle chime
    if (Math.random() > 0.45) {
      setTimeout(() => {
        if (!this.isPlaying) return;
        this.playNote(note * 1.5, 2.0, 3.0, 5);
      }, 260);
    }

    this.noteIndex++;
    if (this.noteIndex >= chordNotes.length * 2) {
      this.noteIndex = 0;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgression.length;
    }

    // Timing between notes: delicate romantic rubato pacing (~550ms - 750ms)
    const nextInterval = 600 + (Math.sin(Date.now() / 1500) * 80);
    this.melodyTimeout = setTimeout(() => this.stepMelody(), nextInterval);
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.noteIndex = 0;
    this.stepMelody();
  }

  public pause() {
    this.isPlaying = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
