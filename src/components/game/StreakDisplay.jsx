import React from "react";
import { Flame, Zap } from "lucide-react";

export function getStreakMultiplier(streak) {
  const days = Math.min(streak, 7);
  return days === 0 ? 1 : 1 + days * 0.1; // +10% per day, max +70% at 7 days
}

export default function StreakDisplay({ streak }) {
  const multiplier = getStreakMultiplier(streak);
  const cappedAt7 = streak >= 7;

  return (
    <div className="flex items-center gap-3 bg-gradient-to-r from-streak/20 to-streak/5 rounded-2xl px-4 py-3">
      <div className="relative">
        <Flame className={`w-8 h-8 text-streak ${streak > 0 ? "animate-pulse" : ""}`} />
        {streak > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-streak text-white text-xs font-black rounded-full flex items-center justify-center">
            {streak}
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="font-black text-sm text-foreground">
          {streak > 0 ? `${streak} Day Streak!` : "Start a Streak!"}
        </p>
        <p className="text-xs text-muted-foreground">
          {streak > 0 ? "Keep it going!" : "Complete today's challenges"}
        </p>
      </div>
      {streak > 0 && (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-black ${cappedAt7 ? "bg-accent/20 text-accent" : "bg-xp/20 text-xp"}`}>
          <Zap className="w-3 h-3" />
          {multiplier.toFixed(1)}x XP {cappedAt7 && "🔥"}
        </div>
      )}
    </div>
  );
}