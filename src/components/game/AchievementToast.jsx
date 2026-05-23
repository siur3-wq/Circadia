import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Call this component with `achievements` = array of newly unlocked achievement objects
// It auto-dismisses after showing each one
export default function AchievementToast({ achievements, onDone }) {
  const [index, setIndex] = React.useState(0);
  const current = achievements[index];

  useEffect(() => {
    if (!current) { onDone?.(); return; }
    const t = setTimeout(() => {
      if (index + 1 < achievements.length) setIndex(i => i + 1);
      else onDone?.();
    }, 3000);
    return () => clearTimeout(t);
  }, [index, current]);

  if (!current) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current.id}
        initial={{ y: -80, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -80, opacity: 0, scale: 0.8 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-80 max-w-[90vw]"
      >
        <div className="bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border-2 border-yellow-400/60">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{current.emoji}</div>
            <div className="flex-1">
              <p className="text-xs font-black text-yellow-100 uppercase tracking-widest">Achievement Unlocked!</p>
              <p className="font-black text-white text-base leading-tight">{current.name}</p>
              <p className="text-xs text-yellow-100">{current.description}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-yellow-200 font-bold">Bonus</p>
              <p className="text-lg font-black text-white">+{current.bonusXP} XP</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}