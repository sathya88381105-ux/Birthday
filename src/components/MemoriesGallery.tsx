import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Upload, 
  Edit2, 
  Check, 
  Sparkles,
  Calendar
} from 'lucide-react';

export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  date: string;
  location?: string;
  aspect?: 'wide' | 'tall' | 'square';
}

const INITIAL_MEMORIES: MemoryPhoto[] = [
  {
    id: 'mem-1',
    url: '/src/assets/images/memory_sunset_walk_1793894839758.jpg',
    title: 'Golden Sunset By The Shore',
    caption: 'Hand in hand as the waves touched our feet and the sunset painted the sky in shades of rose and amber.',
    date: 'Summer Evenings',
    location: 'Coastal Haven',
    aspect: 'wide',
  },
  {
    id: 'mem-2',
    url: '/src/assets/images/memory_cozy_coffee_1793894839965.jpg',
    title: 'Our Cozy Morning Ritual',
    caption: 'Warm coffees, soft morning laughter, and the way you always smile right after your first sip.',
    date: 'Lazy Sundays',
    location: 'Corner Cafe',
    aspect: 'square',
  },
  {
    id: 'mem-3',
    url: '/src/assets/images/memory_candlelit_dinner_1793894840751.jpg',
    title: 'Candlelit Conversations',
    caption: 'Soft candlelight, rose bouquets, and quiet conversations that lasted until the rest of the world fell asleep.',
    date: 'Date Night',
    location: 'Under The Chandelier',
    aspect: 'square',
  },
  {
    id: 'mem-4',
    url: '/src/assets/images/memory_stargazing_night_1793894841471.jpg',
    title: 'Whispering Under The Stars',
    caption: 'Wrapped in blankets under a tapestry of millions of stars, with fairy lights glowing and your head on my shoulder.',
    date: 'Midnight Magic',
    location: 'Meadow Hill',
    aspect: 'wide',
  },
  {
    id: 'mem-5',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80',
    title: 'The Little Things',
    caption: 'A bouquet of delicate roses given just because I thought of you. You deserve all the blossoms in the world.',
    date: 'Just Because',
    location: 'Sweet Surprises',
    aspect: 'square',
  },
  {
    id: 'mem-6',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80',
    title: 'Our Endless Journey',
    caption: 'Every road trip, spontaneous detour, and ticket in my pocket is a memory I will cherish for eternity.',
    date: 'Weekend Roadtrip',
    location: 'Anywhere With You',
    aspect: 'square',
  },
  {
    id: 'mem-7',
    url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=80',
    title: 'Laughter That Lights The Room',
    caption: 'The spontaneous giggles and inside jokes that nobody else understands—just you and me.',
    date: 'Unforgettable Days',
    location: 'Everywhere',
    aspect: 'square',
  },
  {
    id: 'mem-8',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    title: 'Forever In My Eyes',
    caption: 'No camera could ever truly capture how breathtakingly beautiful you are, inside and out.',
    date: 'Pure Grace',
    location: 'My Heart',
    aspect: 'square',
  },
];

export const MemoriesGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryPhoto[]>(() => {
    const saved = localStorage.getItem('romantic_memories_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_MEMORIES;
      }
    }
    return INITIAL_MEMORIES;
  });

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCaption, setEditCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetReplaceId, setTargetReplaceId] = useState<string | null>(null);

  const saveMemories = (updated: MemoryPhoto[]) => {
    setMemories(updated);
    try {
      localStorage.setItem('romantic_memories_data', JSON.stringify(updated));
    } catch (e) {
      // ignore storage quota error
    }
  };

  const handleOpenReplace = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetReplaceId(id);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && targetReplaceId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const updated = memories.map((m) =>
            m.id === targetReplaceId ? { ...m, url: result } : m
          );
          saveMemories(updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startEditCaption = (m: MemoryPhoto, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(m.id);
    setEditTitle(m.title);
    setEditCaption(m.caption);
  };

  const saveCaption = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = memories.map((m) =>
      m.id === id ? { ...m, title: editTitle, caption: editCaption } : m
    );
    saveMemories(updated);
    setEditingId(null);
  };

  const activePhoto = activeLightboxIndex !== null ? memories[activeLightboxIndex] : null;

  const nextLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % memories.length);
    }
  };

  const prevLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + memories.length) % memories.length);
    }
  };

  return (
    <section id="memories" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Hidden file input for seamless photo uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 text-rose-700 text-xs font-semibold tracking-wider uppercase mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Our Journey & Sweet Moments</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-romantic text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4"
        >
          Our Precious Memories
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 text-base sm:text-lg font-light leading-relaxed"
        >
          Snapshots of joy, laughter, and the countless reasons why I fall deeper in love with you every single day.
          <span className="block text-xs text-rose-500 font-medium mt-1">
            (Tap any photo to view in high definition or upload your own favorite pictures!)
          </span>
        </motion.p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {memories.map((photo, index) => {
          const isWide = index === 0 || index === 3;
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              onClick={() => setActiveLightboxIndex(index)}
              className={`group relative rounded-2xl overflow-hidden glass-card cursor-pointer border border-rose-200/70 shadow-lg shadow-rose-950/5 hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-500 flex flex-col ${
                isWide ? 'sm:col-span-2' : 'col-span-1'
              }`}
            >
              {/* Photo Viewport with glowing border on hover */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-rose-100">
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Romantic glow border highlight on hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-rose-400/80 pointer-events-none transition-colors" />

                {/* Top action badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/60 backdrop-blur-md text-[11px] font-medium text-rose-200 border border-rose-500/20">
                    <Calendar className="w-3 h-3 text-rose-400" />
                    <span>{photo.date}</span>
                  </span>

                  {/* Replace Photo Button */}
                  <button
                    onClick={(e) => handleOpenReplace(photo.id, e)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600/90 hover:bg-rose-600 backdrop-blur-md text-white text-[11px] font-medium shadow-md shadow-rose-950/30 transition-all hover:scale-105"
                    title="Replace with your own photo"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Replace Photo</span>
                  </button>
                </div>

                {/* Hover zoom icon badge */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-rose-700 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Photo Details & Editable Caption */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white/95">
                {editingId === photo.id ? (
                  <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Title"
                      className="w-full px-2.5 py-1 text-sm font-semibold border border-rose-300 rounded focus:ring-1 focus:ring-rose-500"
                    />
                    <textarea
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      placeholder="Caption"
                      rows={2}
                      className="w-full px-2.5 py-1 text-xs border border-rose-200 rounded focus:ring-1 focus:ring-rose-500"
                    />
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(null);
                        }}
                        className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => saveCaption(photo.id, e)}
                        className="flex items-center gap-1 px-3 py-1 bg-rose-600 text-white rounded text-xs font-medium"
                      >
                        <Check className="w-3 h-3" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-romantic text-lg sm:text-xl font-bold text-slate-900 truncate">
                        {photo.title}
                      </h3>
                      <button
                        onClick={(e) => startEditCaption(photo, e)}
                        className="text-rose-400 hover:text-rose-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Edit title & caption"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-rose-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    <span>Memory #{index + 1}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 group-hover:text-rose-600 transition-colors">
                    Click to enlarge
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/90 backdrop-blur-xl"
          >
            {/* Top Close Bar */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
              <button
                onClick={(e) => handleOpenReplace(activePhoto.id, e)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs backdrop-blur-md transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Replace Photo</span>
              </button>
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevLightbox}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
              title="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextLightbox}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
              title="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-rose-500/30 flex flex-col md:flex-row"
            >
              {/* Main Photo */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px]">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] md:max-h-[85vh] w-full object-contain"
                />
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-80 p-6 md:p-8 bg-slate-900 text-white flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-medium tracking-wide uppercase mb-3">
                    <Heart className="w-3.5 h-3.5 fill-rose-400" />
                    <span>{activePhoto.date}</span>
                  </div>

                  <h3 className="font-romantic text-2xl sm:text-3xl font-bold text-white mb-4">
                    {activePhoto.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
                    {activePhoto.caption}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Photo {(activeLightboxIndex || 0) + 1} of {memories.length}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevLightbox}
                      className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white"
                    >
                      Prev
                    </button>
                    <button
                      onClick={nextLightbox}
                      className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
