import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AchievementToast({ achievements, onDone }) {
  const [index, setIndex] = useState(0);
  const current = achievements[index];

  useEffect(() => {
    if (!current) { onDone?.(); return; }
    const t = setTimeout(() => {
      if (index + 1 < achievements.length) setIndex(i => i + 1);
      else onDone?.();
    }, 3500);
    return () => clearTimeout(t);
  }, [index, current, achievements.length, onDone]);

  if (!current) return null;

  // --- SAFE PROPERTIES EXTRACTION ---
  // Captures whatever property naming convention your engine passes down
  const displayLabel = current.label || current.name || "New Achievement!";
  const displayRequirement = current.hint || current.description || "Milestone requirement achieved.";
  const displayBg = current.bg || "bg-zinc-800";
  const displayColor = current.color || "text-zinc-100";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current.id || index}
        initial={{ y: -80, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -80, opacity: 0, scale: 0.8 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-80 max-w-[90vw]"
      >
        <div className="bg-zinc-900/95 backdrop-blur-md border-2 border-emerald-500/50 rounded-2xl p-4 shadow-2xl">
          <div className="flex flex-col gap-2">
            
            {/* Header Title Tracker */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-1.5">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                🏆 Title Unlocked!
              </span>
              <span className="text-[9px] font-bold text-muted-foreground bg-zinc-800 px-1.5 py-0.5 rounded">
                Profile Badge
              </span>
            </div>

            {/* Title Badge Component View */}
            <div className="flex items-center justify-between gap-2 my-0.5">
              <span className={`text-xs font-black px-2.5 py-0.5 rounded shadow-md border border-white/5 ${displayBg} ${displayColor}`}>
                {displayLabel}
              </span>
              <span className="text-[10px] text-zinc-500 font-bold italic">Ready to equip</span>
            </div>

            {/* Target Criteria Description Box */}
            <div className="text-[11px] text-zinc-300 leading-normal bg-zinc-950/40 p-2 rounded-lg border border-zinc-800/60">
              <span className="text-zinc-500 font-bold block text-[10px] uppercase tracking-wider mb-0.5">
                Milestone Met:
              </span>
              {displayRequirement}
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}