import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Mail, Edit3, Check, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoveLetterProps {
  partnerName: string;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ partnerName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [letterBody, setLetterBody] = useState<string>(
    `My dearest,

If someone asked me to define the greatest gift this life has given me, I wouldn't hesitate for a second. It will always be you.

From the very first moment we laughed together, my world started spinning in warmer, brighter colors. You are the gentle thought that wakes me up in the morning and the sweetest prayer on my lips before I close my eyes.

Thank you for your warmth, for your fierce kindness, for the silly faces that only I get to see, and for loving me in all the ways words could never properly capture. 

On this birthday and for every single one to come, I promise to stand beside you, to celebrate your victories, to hold your hand through the quiet storms, and to remind you every single day how deeply, unconditionally, and endlessly you are cherished.

You are my home, my miracle, and my heart.

Happy Birthday, my soulmate.`
  );

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#f43f5e', '#ffffff'],
      });
    }
  };

  return (
    <section id="letter" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-400/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 text-rose-700 text-xs font-semibold tracking-wider uppercase mb-3"
        >
          <Mail className="w-3.5 h-3.5 text-rose-500" />
          <span>Straight From The Heart</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-romantic text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3"
        >
          A Love Letter Just For You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-slate-600 text-base font-light"
        >
          {isOpen
            ? 'A heartfelt confession preserved in handwritten ink.'
            : 'Click the royal wax seal to unveil the handwritten secret inside.'}
        </motion.p>
      </div>

      {/* Envelope & Letter Container */}
      <div className="flex flex-col items-center">
        {!isOpen ? (
          /* Closed Animated Envelope */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            onClick={handleOpenEnvelope}
            className="group relative w-full max-w-lg aspect-[1.5/1] bg-gradient-to-br from-rose-200 via-rose-100 to-pink-200 rounded-2xl shadow-2xl shadow-rose-950/15 border-2 border-rose-300/80 cursor-pointer overflow-hidden p-6 flex flex-col justify-between"
          >
            {/* Vintage postmark stamp */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-1.5 text-xs text-rose-800/80 font-serif tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>Confidential · For Your Eyes Only</span>
              </div>
              <div className="w-14 h-16 border-2 border-dashed border-rose-400/80 rounded-md p-1 flex flex-col items-center justify-center bg-white/70 shadow-sm rotate-3">
                <Heart className="w-5 h-5 text-rose-600 fill-rose-500" />
                <span className="text-[9px] font-serif font-bold text-rose-900 mt-1">LOVE AIR</span>
              </div>
            </div>

            {/* Recipient calligraphy */}
            <div className="my-auto text-center px-4">
              <span className="text-xs uppercase tracking-widest text-rose-700/70 font-semibold block mb-1">
                To My Beloved
              </span>
              <p className="font-calligraphy text-4xl sm:text-5xl text-rose-950 font-normal">
                {partnerName || 'My Soulmate'}
              </p>
            </div>

            {/* Central Wax Seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-600 via-rose-700 to-red-800 p-1 shadow-xl shadow-rose-950/40 border-2 border-red-400/60 flex items-center justify-center relative cursor-pointer"
              >
                {/* Wax seal stamped ring */}
                <div className="w-full h-full rounded-full border border-red-300/40 flex items-center justify-center bg-gradient-to-tr from-red-700 to-rose-600">
                  <Heart className="w-7 h-7 text-white fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
                </div>
              </motion.div>

              <span className="mt-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium tracking-wide shadow-md group-hover:bg-rose-700 transition-colors">
                Break Seal & Open ✉️
              </span>
            </div>

            {/* Subtle folding diagonals */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none border-t border-rose-300/50 bg-gradient-to-t from-rose-200/40 to-transparent" />
          </motion.div>
        ) : (
          /* Unfolded Handwritten Letter */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#fdfbf7] rounded-3xl p-8 sm:p-12 md:p-14 shadow-2xl shadow-rose-950/15 border border-amber-200/80 overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(#f0e6d6 0.75px, transparent 0.75px)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Letter top controls */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-amber-200/60">
              <div className="flex items-center gap-2 text-rose-700 text-xs font-semibold tracking-wider uppercase">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>Handwritten with Love</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                  title="Customize this letter"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Done Editing' : 'Personalize Letter'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
                  title="Fold back into envelope"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Fold Back</span>
                </button>
              </div>
            </div>

            {/* Letter Body */}
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={letterBody}
                  onChange={(e) => setLetterBody(e.target.value)}
                  rows={14}
                  className="w-full p-4 rounded-xl border border-rose-300 bg-white/90 font-handwriting text-2xl text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save My Words</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                {/* Handwritten Prose */}
                <div className="font-handwriting text-2xl sm:text-3xl text-slate-800 leading-relaxed space-y-6">
                  {letterBody.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="tracking-wide">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Signature Block */}
                <div className="mt-10 pt-6 border-t border-amber-200/50 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-slate-500 font-sans block mb-1">
                      Forever devoted,
                    </span>
                    <p className="font-calligraphy text-4xl sm:text-5xl text-rose-800">
                      Yours Always ❤️
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-serif text-slate-400 italic block">
                      Written for today, tomorrow, and forever
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
