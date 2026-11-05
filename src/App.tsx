/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Music, Volume2, Flower2, Gift, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

import { OpeningScreen } from './components/OpeningScreen';
import { BirthdayWishes } from './components/BirthdayWishes';
import { MemoriesGallery } from './components/MemoriesGallery';
import { LoveLetter } from './components/LoveLetter';
import { FinalSurprise } from './components/FinalSurprise';
import { RomanticParticles } from './components/RomanticParticles';
import { RomanticAudioPlayer } from './components/RomanticAudioPlayer';
import { romanticAudio } from './utils/romanticAudio';

export default function App() {
  const [hasOpenedSurprise, setHasOpenedSurprise] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [partnerName, setPartnerName] = useState<string>(() => {
    return localStorage.getItem('romantic_partner_name') || 'My Love';
  });

  const handleUpdatePartnerName = (name: string) => {
    setPartnerName(name);
    try {
      localStorage.setItem('romantic_partner_name', name);
    } catch (e) {
      // ignore
    }
  };

  const handleOpenSurprise = () => {
    setHasOpenedSurprise(true);
    // Start background music automatically on user's opening click gesture
    romanticAudio.start();
    setIsAudioPlaying(true);
  };

  const toggleAudio = () => {
    const playing = romanticAudio.toggle();
    setIsAudioPlaying(playing);
  };

  const handleReplay = () => {
    setHasOpenedSurprise(false);
    romanticAudio.pause();
    setIsAudioPlaying(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoseShower = () => {
    confetti({
      particleCount: 45,
      spread: 90,
      origin: { y: 0.2 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#ffe4e6', '#be123c'],
    });
  };

  return (
    <div className="min-h-screen bg-[#faf5f5] text-slate-800 relative selection:bg-rose-500 selection:text-white">
      {/* Universal Floating Romantic Particles (Petals, Hearts, Stars) */}
      <RomanticParticles intensity="lush" />

      {/* Floating Romantic Audio Player */}
      <RomanticAudioPlayer isPlaying={isAudioPlaying} onToggle={toggleAudio} />

      {/* 1. Animated Opening Screen Overlay */}
      <AnimatePresence>
        {!hasOpenedSurprise && (
          <OpeningScreen onOpen={handleOpenSurprise} partnerName={partnerName} />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={`transition-opacity duration-1000 ${hasOpenedSurprise ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top Bar Navigation (Frontend Design §2 Top Bar Contract) */}
        <header className="sticky top-0 z-30 bg-white/75 backdrop-blur-md border-b border-rose-100/80 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
            {/* Zone 1: Brand wordmark */}
            <a
              href="#hero"
              className="font-romantic text-2xl font-bold tracking-tight text-rose-950 whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <Heart className="w-5 h-5 text-rose-600 fill-rose-500" />
              <span>Forever & Always</span>
            </a>

            {/* Zone 2: 4-5 single-line clean navigation links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#hero" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
                Home
              </a>
              <a href="#wishes" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
                Wishes
              </a>
              <a href="#memories" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
                Memories
              </a>
              <a href="#letter" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
                Love Letter
              </a>
              <a href="#surprise" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
                Final Surprise
              </a>
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleRoseShower}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 rounded-full hover:from-rose-500 hover:to-pink-500 shadow-sm shadow-rose-600/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <Flower2 className="w-3.5 h-3.5" />
                <span>Shower Roses 🌹</span>
              </button>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section id="hero" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 max-w-5xl mx-auto text-center">
            {/* Subtle radial background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-300/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-800 text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-xs border border-rose-200">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>Happy Birthday To The Love Of My Life</span>
              </div>

              <h1 className="font-romantic text-5xl sm:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Celebrating Every Reason{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700">
                  I Love You
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-slate-600 text-lg sm:text-xl font-light leading-relaxed mb-10">
                A digital keepsake filled with all our sweetest memories, warm wishes, and a promise that every tomorrow will be even brighter with you.
              </p>

              {/* Quick jump anchor buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <a
                  href="#wishes"
                  className="px-6 py-3 rounded-full bg-rose-600 text-white font-medium text-sm shadow-lg shadow-rose-600/25 hover:bg-rose-700 transition-all hover:scale-105"
                >
                  Read Birthday Wishes ❤️
                </a>
                <a
                  href="#memories"
                  className="px-6 py-3 rounded-full bg-white text-rose-900 border border-rose-200 font-medium text-sm hover:bg-rose-50 transition-all"
                >
                  Our Photo Gallery 📸
                </a>
                <a
                  href="#letter"
                  className="px-6 py-3 rounded-full bg-white text-rose-900 border border-rose-200 font-medium text-sm hover:bg-rose-50 transition-all"
                >
                  Open Love Letter 💌
                </a>
              </div>
            </div>
          </section>

          {/* 2. Birthday Wishes Section */}
          <BirthdayWishes
            partnerName={partnerName}
            onUpdatePartnerName={handleUpdatePartnerName}
          />

          {/* 3. Our Memories – Photo Gallery */}
          <MemoriesGallery />

          {/* 4. Love Letter Envelope */}
          <LoveLetter partnerName={partnerName} />

          {/* 7. Final Surprise */}
          <FinalSurprise onReplay={handleReplay} partnerName={partnerName} />
        </main>

        {/* Quiet Footer */}
        <footer className="py-12 px-6 border-t border-rose-100 bg-white/60 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-rose-700 font-romantic text-base font-semibold">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>Made with all my heart for {partnerName}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Today · Tomorrow · Forever</span>
              <span aria-hidden="true">·</span>
              <button
                onClick={handleRoseShower}
                className="hover:text-rose-600 transition-colors"
              >
                Send Rose Petals
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
