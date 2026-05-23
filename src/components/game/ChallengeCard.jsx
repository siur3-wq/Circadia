import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Zap, Coins, Timer } from "lucide-react";
import { BODY_PARTS } from "./ChallengeData";

export default function ChallengeCard({ challenge, completed, onComplete }) {
  const bodyPart = BODY_PARTS.find(b => b.id === challenge.body_part);
  const finalDuration = challenge.computedSeconds || challenge.duration || 60;
  const difficulty = challenge.difficulty || "Easy";

  // Sanitize tracking lines out of description payload values
  let displayDescription = challenge.description || challenge.text || "";
  displayDescription = displayDescription
    .replace(/\d+\s*(times|reps|seconds|sec|s|counts|x)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!displayDescription.endsWith("until the timer runs out!")) {
    displayDescription = `${displayDescription.replace(/[.!]$/, "")} until the timer runs out!`;
  }

  // Dynamic Theme Variant Color Mappings for Difficulty Pills
  const difficultyStyles = {
    Hard: "bg-red-500/10 text-red-400 border-red-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Easy: "bg-green-500/10 text-green-400 border-green-500/20"
  };

  return (
    <motion.div 
      layout 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl border-2 overflow-hidden transition-all ${
        completed 
          ? "border-green-600/40 bg-green-900/10"
          : "border-border bg-card hover:border-primary/40 hover:shadow-lg"
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bodyPart?.color || "from-primary to-accent"} flex items-center justify-center text-2xl shrink-0 shadow-md`}>
            {challenge.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <h3 className="font-extrabold text-foreground text-lg leading-tight">
                {challenge.name}
              </h3>
              
              {/* Difficulty badge label display */}
              <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border ${difficultyStyles[difficulty]}`}>
                {difficulty}
              </span>
              
              {completed && <Check className="w-5 h-5 text-green-400 shrink-0 ml-auto" />}
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              {displayDescription}
            </p>
            
            <div className="flex items-center gap-1 flex-wrap mb-1">
              {/* Display duration label (Guaranteed minimum of 60 seconds) */}
              <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {finalDuration} seconds
              </span>
              <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded-full capitalize">
                {bodyPart?.emoji} {bodyPart?.label}
              </span>
            </div>
            
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs font-bold text-xp">
                <Zap className="w-3.5 h-3.5" /> +{challenge.xp} XP
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-coin">
                <Coins className="w-3.5 h-3.5" /> +{challenge.coins}
              </span>
            </div>
          </div>
        </div>

        {!completed && (
          <div className="mt-4">
            <Button 
              onClick={() => onComplete(challenge)}
              className="w-full bg-gradient-to-r from-primary to-accent text-white rounded-xl h-11 font-bold hover:opacity-90"
            >
              <Timer className="w-4 h-4 mr-1" /> Start Challenge
            </Button>
          </div>
        )}

        {completed && (
          <div className="mt-4 text-center py-2 bg-green-900/20 rounded-xl border border-green-600/30">
            <span className="text-sm font-bold text-green-400">✅ Completed!</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}