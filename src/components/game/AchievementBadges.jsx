import React from "react";
import { ACHIEVEMENTS } from "./AchievementData";
import { motion } from "framer-motion";

export default function AchievementBadges({ profile }) {
  const unlocked = new Set(profile?.unlocked_achievements || []);

  return (
    <div>
      <h2 className="text-base font-black text-foreground mb-3">🏅 Achievements</h2>
      <div className="grid grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((a, i) => {
          const earned = unlocked.has(a.id);
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`rounded-2xl p-3 flex flex-col items-center gap-1 text-center border-2 transition-all ${
                earned
                  ? "border-yellow-500/60 bg-yellow-500/10 shadow-lg shadow-yellow-500/10"
                  : "border-border bg-muted/30 opacity-40 grayscale"
              }`}
            >
              <div className="text-3xl">{a.emoji}</div>
              <p className="text-xs font-black text-foreground leading-tight">{a.name}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{a.description}</p>
              <p className={`text-[10px] font-bold mt-0.5 ${earned ? "text-yellow-400" : "text-muted-foreground"}`}>
                +{a.bonusXP} XP
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}