import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Stars, RefreshCw, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalSurpriseProps {
  onReplay: () => void;
  partnerName: string;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({ onReplay, partnerName }) => {
  const [kissCount, setKissCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSendKiss = () => {
    setKissCount((prev) => prev + 1);
    setShowCelebration(true);

    // Heart explosion confetti
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#ffd166'],
      shapes: ['circle'],
    });

    setTimeout(() => setShowCelebration(false), 2500);
  };

  const triggerGrandFinale = () => {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#e11d48', '#f43f5e', '#fb7185', '#ffd700'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#e11d48', '#f43f5e', '#fb7185', '#ffd700'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section id="surprise" className="relative py-28 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-rose-950 via-slate-950 to-black text-white">
      {/* Radiant ambient romantic glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[350px] h-[350px] bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Animated Diamond Ring & Pulsing Heart Emblem */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 12, stiffness: 100 }}
          className="relative mb-8"
        >
          {/* Glowing Aura Ring */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-rose-500 via-amber-300 to-pink-500 shadow-2xl shadow-rose-600/50 flex items-center justify-center animate-glow">
            <div className="w-full h-full rounded-full bg-slate-950/90 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
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
                <Heart className="w-14 h-14 text-rose-500 fill-rose-600 filter drop-shadow-[0_0_15px_rgba(244,63,94,0.9)]" />
              </motion.div>
            </div>
          </div>

          <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-amber-300 animate-bounce" />
          <Stars className="absolute -bottom-1 -left-2 w-6 h-6 text-pink-400 animate-pulse" />
        </motion.div>

        {/* Required Text Content */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-rose-300 font-romantic text-xl sm:text-2xl tracking-widest uppercase mb-3"
        >
          A Whisper Before The Night Ends
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-romantic text-4xl sm:text-6xl font-bold tracking-tight text-white mb-8 leading-tight"
        >
          One Last Thing... ❤️
        </motion.h2>

        {/* The Exact Words:
            "You are not just a part of my life.
            You ARE my life.

            Forever Yours! 💍❤️"
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative px-8 py-10 sm:px-14 sm:py-14 rounded-3xl bg-rose-950/40 backdrop-blur-xl border border-rose-500/30 shadow-2xl max-w-xl mx-auto mb-10"
        >
          <p className="font-romantic text-2xl sm:text-3xl text-rose-100/90 leading-relaxed font-light mb-4">
            You are not just a part of my life.
          </p>
          <p className="font-romantic text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 mb-8 leading-tight">
            You ARE my life.
          </p>

          <div className="pt-6 border-t border-rose-500/25">
            <p className="font-romantic text-3xl sm:text-4xl text-rose-300 font-semibold tracking-wide">
              Forever Yours! 💍❤️
            </p>
          </div>
        </motion.div>

        {/* Interactive Kiss / Touch My Heart Action */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <motion.button
            onClick={handleSendKiss}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="group relative flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm sm:text-base shadow-xl shadow-rose-600/40 hover:shadow-rose-600/60 transition-all border border-rose-300/40"
          >
            <Send className="w-4 h-4 text-rose-200 group-hover:translate-x-0.5 transition-transform" />
            <span>Send a Kiss & Hug Back 😘</span>
            {kissCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs text-rose-100 font-bold">
                {kissCount}
              </span>
            )}
          </motion.button>

          <motion.button
            onClick={triggerGrandFinale}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 border border-rose-400/30 text-sm font-medium backdrop-blur-md transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Shower of Fireworks & Rose Petals</span>
          </motion.button>
        </div>

        {/* Celebration Toast */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs sm:text-sm font-medium shadow-lg mb-6 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Kiss received! My heart is overflowing with love for you!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Return to top / Replay */}
        <button
          onClick={onReplay}
          className="mt-6 inline-flex items-center gap-2 text-xs text-rose-400/80 hover:text-rose-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Replay the Opening Surprise from the beginning</span>
        </button>
      </div>
    </section>
  );
};
