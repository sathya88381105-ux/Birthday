import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Edit3, Check, Stars, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayWishesProps {
  partnerName: string;
  onUpdatePartnerName: (name: string) => void;
}

export const BirthdayWishes: React.FC<BirthdayWishesProps> = ({
  partnerName,
  onUpdatePartnerName,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(partnerName);
  const [whisperIndex, setWhisperIndex] = useState(0);

  const loveWhispers = [
    "Your smile is my favorite view in the entire universe.",
    "Being in your arms is my favorite place on Earth.",
    "You make ordinary moments feel like poetry.",
    "My heart found its true rhythm the day I met you.",
    "I fall in love with you a little more every single day.",
  ];

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdatePartnerName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleCelebrateMessage = () => {
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fb7185', '#ffe4e6', '#e11d48'],
    });
  };

  const nextWhisper = () => {
    setWhisperIndex((prev) => (prev + 1) % loveWhispers.length);
  };

  return (
    <section id="wishes" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Subtle ambient rose glow behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Wishes Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-8 sm:p-12 md:p-16 glass-card shadow-2xl shadow-rose-950/5 border border-rose-200/80 overflow-hidden"
      >
        {/* Decorative corner embellishments */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-rose-200/40 to-transparent rounded-br-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-200/40 to-transparent rounded-tl-full pointer-events-none" />

        {/* Top Kicker & Editable Name */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-rose-100">
          <div className="flex items-center gap-2 text-rose-500 font-medium text-xs tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>Dedicated with eternal devotion</span>
          </div>

          {/* Name Customizer */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Partner's name"
                  maxLength={24}
                  className="px-3 py-1 text-sm bg-white border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 text-rose-900"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                />
                <button
                  onClick={handleSaveName}
                  className="p-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                  title="Save name"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="group flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200/60 text-rose-700 transition-all text-xs font-medium"
                title="Click to personalize name"
              >
                <span>For: <strong className="font-semibold text-rose-900">{partnerName}</strong></span>
                <Edit3 className="w-3 h-3 text-rose-400 group-hover:text-rose-600 transition-colors" />
              </button>
            )}
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 mb-4 shadow-inner">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
          </div>
          <h2 className="font-romantic text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            Happy Birthday,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700">
              {partnerName || 'My Love'}!
            </span>{' '}
            ❤️
          </h2>
        </div>

        {/* Exact Heartfelt Message Content as specified */}
        <div className="space-y-6 text-slate-700 text-lg sm:text-xl leading-relaxed font-light text-center max-w-2xl mx-auto font-romantic">
          <p className="text-slate-800 font-normal">
            You are the most beautiful part of my life. Every moment with you is special, every smile of yours makes my day brighter, and every heartbeat reminds me how lucky I am to have you.
          </p>

          <p className="text-rose-950/90 italic text-xl sm:text-2xl font-serif">
            "I wish your life is always filled with happiness, success, love, and endless smiles."
          </p>

          <p className="text-slate-800">
            No matter what happens, I will always choose you. You are my today, my tomorrow, and my forever.
          </p>

          <div className="pt-6 pb-2">
            <p className="font-bold text-2xl sm:text-3xl text-rose-600 tracking-wide font-sans">
              I LOVE YOU SO MUCH! ❤️😘
            </p>
          </div>
        </div>

        {/* Interactive Whisper of Love Note */}
        <div className="mt-12 pt-8 border-t border-rose-100 flex flex-col items-center">
          <button
            onClick={nextWhisper}
            className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-50/80 hover:bg-rose-100/90 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium transition-all mb-4"
          >
            <Stars className="w-4 h-4 text-rose-500 group-hover:rotate-45 transition-transform" />
            <span>Tap for a Little Secret Love Note</span>
          </button>

          <motion.div
            key={whisperIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative px-6 py-3.5 rounded-2xl bg-white/90 border border-rose-100 shadow-sm text-center max-w-lg"
          >
            <Quote className="w-4 h-4 text-rose-300 mx-auto mb-1.5 opacity-60" />
            <p className="font-handwriting text-xl sm:text-2xl text-rose-900 leading-snug">
              {loveWhispers[whisperIndex]}
            </p>
          </motion.div>

          {/* Interactive Send Heart reaction button */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleCelebrateMessage}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold shadow-md shadow-rose-500/20 hover:shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Send Heart Confetti</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
