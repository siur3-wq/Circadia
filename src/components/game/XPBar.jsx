import React from "react";
import { getXPForLevel, getXPForNextLevel } from "./ChallengeData";

export default function XPBar({ xp, level }) {
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForNextLevel(level);
  const progress = nextLevelXP > currentLevelXP
    ? ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
    : 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-bold text-primary">Level {level}</span>
        <span className="text-xs text-muted-foreground">{xp - currentLevelXP} / {nextLevelXP - currentLevelXP} XP</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}