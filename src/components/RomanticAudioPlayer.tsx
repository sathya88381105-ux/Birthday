import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

interface RomanticAudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const RomanticAudioPlayer: React.FC<RomanticAudioPlayerProps> = ({ isPlaying, onToggle }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    romanticAudio.setVolume(isMuted ? 0 : volume);
  }, [isMuted, volume]);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      romanticAudio.setVolume(volume);
    } else {
      setIsMuted(true);
      romanticAudio.setVolume(0);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
    }
    romanticAudio.setVolume(val);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <div className="relative group">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-rose-950/80 backdrop-blur-md border border-rose-500/30 text-rose-100 shadow-xl shadow-rose-950/30 transition-all hover:border-rose-400/50">
          {/* Animated vinyl / note icon */}
          <button
            onClick={onToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/50 animate-spin-slow'
                : 'bg-rose-900/60 text-rose-300 hover:text-white'
            }`}
            style={{ animationDuration: '6s' }}
            title={isPlaying ? 'Pause romantic melody' : 'Play romantic melody'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          {/* Track name & waveform */}
          <div className="flex flex-col cursor-pointer" onClick={onToggle}>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium tracking-wide text-rose-200">
                {isPlaying ? 'Our Melody' : 'Romantic Song'}
              </span>
              {isPlaying && (
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-rose-400 rounded-full animate-pulse" />
                  <span className="w-0.5 h-3 bg-rose-300 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-1.5 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </span>
              )}
            </div>
            <span className="text-[10px] text-rose-300/70">
              {isPlaying ? 'Delicate Piano & Chimes' : 'Tap to play music'}
            </span>
          </div>

          {/* Volume toggle */}
          <div className="relative flex items-center pl-1 border-l border-rose-800/60">
            <button
              onClick={() => setShowVolume(!showVolume)}
              className="p-1 rounded-full text-rose-300 hover:text-white transition-colors"
              title="Volume controls"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Volume popup slider */}
            {showVolume && (
              <div className="absolute bottom-11 right-0 p-2.5 bg-rose-950/95 backdrop-blur-md border border-rose-700/50 rounded-xl shadow-xl flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-xs text-rose-300 hover:text-white"
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-rose-500 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
