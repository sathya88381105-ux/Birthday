import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OpeningScreenProps {
  onOpen: () => void;
  partnerName?: string;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onOpen, partnerName = 'My Love' }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);

    // Trigger sweet heart confetti explosion
    const end = Date.now() + 1000;
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#e11d48', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-rose-950 via-slate-950 to-rose-950 text-white"
    >
      {/* Dreamy radial glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-600/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Background stars / floating ambient dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Animated sparkling heart emblem */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 100, delay: 0.2 }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 p-0.5 shadow-2xl shadow-rose-600/50 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-rose-950/80 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut',
                }}
              >
                <Heart className="w-11 h-11 text-rose-400 fill-rose-500/80 filter drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]" />
              </motion.div>
            </div>
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-amber-300 animate-pulse" />
        </motion.div>

        {/* Subtitle / Whisper */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="font-romantic text-rose-300/90 text-xl tracking-widest uppercase mb-3"
        >
          Tonight is all about you
        </motion.p>

        {/* Main Title requirement: "A Special Day for My Special Person ❤️" */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-romantic text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6"
        >
          A Special Day for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400">
            My Special Person
          </span>{' '}
          ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="text-rose-200/80 text-base sm:text-lg max-w-md mb-10 leading-relaxed font-light"
        >
          A heartfelt sanctuary woven with our sweet memories, timeless love, and the sincerest wishes from my heart.
        </motion.p>

        {/* Glowing "Open Your Surprise 🎁" button */}
        <motion.button
          onClick={handleOpenClick}
          disabled={isOpening}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
          className="relative group px-9 py-4 rounded-full font-medium text-lg text-white shadow-2xl transition-all overflow-hidden"
        >
          {/* Pulsing outer aura glow */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 opacity-80 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all animate-glow" />

          {/* Button core surface */}
          <div className="relative flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white font-semibold tracking-wide border border-rose-300/40">
            <Gift className="w-5 h-5 text-rose-100 group-hover:rotate-12 transition-transform duration-300" />
            <span>Open Your Surprise 🎁</span>
          </div>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-6 text-xs text-rose-400/70 tracking-wider flex items-center gap-1.5"
        >
          <span>✨ Turn up the volume for the best experience</span>
        </motion.p>
      </div>
    </motion.div>
  );
};
