import React, { useState, useEffect } from "react";
import { PlayerProfile, ChallengeCompletion } from "@/lib/db";
import { CHALLENGES, BODY_PARTS, getLevelFromXP } from "../components/game/ChallengeData";
import { getStreakMultiplier } from "../components/game/StreakDisplay";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Coins, ChevronDown, BookOpen, Check, Play, Pause, RotateCcw, Gift } from "lucide-react";
import { getSelectedProfileId } from "../lib/selectedProfile";
import moment from "moment";

function ExerciseCard({ challenge, index, isCompleted, onComplete, isPending, selectedPart }) {
  const [expanded, setExpanded] = useState(false);
  const [showLootAnimation, setShowLootAnimation] = useState(false);
  
  // --- CENTRAL DURATION & DIFFICULTY MATRIX ENGINE ---
  const getDynamicRewards = () => {
    const name = (challenge.name || "").toLowerCase();
    const desc = (challenge.description || "").toLowerCase();
    
    const isHard = name.includes("squat") || name.includes("pushup") || name.includes("push-up") || 
                   name.includes("plank") || name.includes("lunge") || desc.includes("explosively");
    const isMedium = name.includes("crunch") || name.includes("bridge") || name.includes("twist");

    let difficultyLabel = "Easy";
    let targetDuration = 60; // Absolute baseline floor minimum
    let xp = challenge.xp || 15;
    let coins = challenge.coins || 5;

    // 1. Assign Reward values purely based on structural difficulty tiers
    if (isHard) {
      difficultyLabel = "Hard";
      xp = challenge.xp || 40;
      coins = challenge.coins || 15;
    } else if (isMedium) {
      difficultyLabel = "Medium";
      xp = challenge.xp || 25;
      coins = challenge.coins || 10;
    }

    // 2. Adjust durations relative to fitness pacing (Floor clamped strictly at 60s)
    if (name.includes("squat") || name.includes("lunge")) {
      targetDuration = 90; // Large leg muscle groups sustain longer safely
    } else if (name.includes("plank") || name.includes("pushup") || name.includes("push-up")) {
      targetDuration = 75; // Isometric/upper body fatigue limit above baseline
    } else if (isMedium) {
      targetDuration = 75; // Focused core movement pacing
    } else {
      targetDuration = 60; // Clamped baseline for cardio sprints and mobility
    }

    return { xp, coins, difficultyLabel, duration: targetDuration };
  };

  const rewards = getDynamicRewards();
  const xpReward = challenge.xp || rewards.xp;
  const coinsReward = challenge.coins || rewards.coins;
  const targetNum = rewards.duration;

  const [timeLeft, setTimeLeft] = useState(targetNum);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const bodyPart = BODY_PARTS.find(b => b.id === challenge.body_part);

  // Dynamic color styles matching the dashboard cards
  const difficultyStyles = {
    Hard: "bg-red-500/10 text-red-400 border-red-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Easy: "bg-green-500/10 text-green-400 border-green-500/20"
  };

  // Trigger burst effect when isCompleted flips to true
  useEffect(() => {
    if (isCompleted) {
      setShowLootAnimation(true);
    } else {
      setShowLootAnimation(false);
    }
  }, [isCompleted]);

  // RESET RULE 1: Reset timer if exercise swaps OR if category filter tab is clicked
  useEffect(() => {
    setTimeLeft(targetNum);
    setIsTimerRunning(false);
  }, [challenge.id, targetNum, selectedPart]);

  // RESET RULE 2: Reset metrics instantly if browser tab focus changes or switches
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTimeLeft(targetNum);
        setIsTimerRunning(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [targetNum]);

  // Countdown clock ticker
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (!isCompleted && !isPending) {
        onComplete({ ...challenge, xp: xpReward, coins: coinsReward });
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, isCompleted, isPending, onComplete, challenge, xpReward, coinsReward]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressFraction = timeLeft / targetNum;
  const strokeDashoffset = 251.2 * (1 - progressFraction);

  // Clean description text dynamically to scrub mismatched static text goals
  const getCleanDescription = () => {
    if (!challenge.description) return "";
    let clean = challenge.description.replace(/\d+\s*(times|reps|seconds|sec|s|counts|x)\b/gi, "");
    clean = clean.replace(/\s+/g, " ").trim();
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  };

  return (
    <motion.div
      key={challenge.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="relative bg-card border-2 border-border rounded-2xl overflow-visible transition-all"
      style={{ opacity: isCompleted ? 0.75 : 1 }}
    >
      {/* FLOATING LOOT BURST ANIMATION LAYER */}
      <AnimatePresence>
        {showLootAnimation && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible z-50">
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 0.6 }}
              animate={{ opacity: [1, 1, 0], y: -90, scale: 1.4, x: -30 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute bg-xp text-white text-sm font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg"
            >
              <Zap className="w-4 h-4 fill-white text-white" /> +{xpReward} XP
            </motion.div>

            <motion.div
              initial={{ opacity: 1, y: 0, scale: 0.6 }}
              animate={{ opacity: [1, 1, 0], y: -100, scale: 1.4, x: 30 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, delay: 0.1, ease: "easeOut" }}
              className="absolute bg-coin text-white text-sm font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg"
            >
              <Coins className="w-4 h-4 fill-white text-white" /> +{coinsReward}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Exercise Card Header Row */}
      <div className="p-4 flex items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bodyPart?.color || "from-primary to-accent"} flex items-center justify-center text-2xl shrink-0 shadow-md`}>
          {challenge.emoji || "💪"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-extrabold text-foreground text-base leading-tight">{challenge.name}</h3>
            
            {/* --- NEW EXERCISE LIBRARY DIFFICULTY TAG BADGE ELEMENT --- */}
            <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border ${difficultyStyles[rewards.difficultyLabel]}`}>
              {rewards.difficultyLabel}
            </span>

            <span className="text-xs font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {bodyPart?.emoji} {bodyPart?.label || "Workout"}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1 leading-snug">
            {getCleanDescription()} until the timer runs out!
          </p>
          
          <div className="flex items-center gap-4 mt-2.5 flex-wrap">
            <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              Goal: {formatTime(targetNum)}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-xp bg-xp/10 px-2 py-0.5 rounded-lg">
              <Zap className="w-3.5 h-3.5 fill-xp text-xp" /> +{xpReward} XP
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-coin bg-coin/10 px-2 py-0.5 rounded-lg">
              <Coins className="w-3.5 h-3.5 fill-coin text-coin" /> +{coinsReward}
            </span>
          </div>

          {isCompleted && (
            <div className="mt-2.5 inline-flex items-center gap-1 text-xs font-black text-green-500 bg-green-500/10 px-2.5 py-1 rounded-xl border border-green-500/20">
              <Check className="w-3.5 h-3.5 stroke-[4]" /> Quest Cleared! Stars Won! 🌟
            </div>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 p-1.5 rounded-xl bg-muted hover:bg-primary/10 transition-colors mt-0.5"
        >
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Expanded Interactive Control Area */}
      {expanded && (
        <div className="border-t border-border bg-muted/5 p-4 space-y-5">
          
          <div className="flex flex-col items-center justify-center bg-card p-6 rounded-2xl border-2 border-border shadow-inner space-y-5">
            
            <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-xs font-black text-accent-foreground">
              <Gift className="w-3.5 h-3.5 text-accent" />
              This challenge grants {xpReward} XP & {coinsReward} Coins!
            </div>

            {/* ================== UNIFIED TIMER HUD DISPLAY ================== */}
            <>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-muted fill-none" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    className="stroke-primary fill-none transition-all duration-300" 
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ strokeDashoffset }}
                  />
                </svg>
                <div className="absolute text-2xl font-black tracking-tighter text-foreground">
                  {formatTime(timeLeft)}
                </div>
              </div>

              <div className="flex gap-2 w-full max-w-xs justify-center">
                <button
                  disabled={isCompleted || timeLeft === 0}
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 h-11 rounded-xl font-black text-xs text-white flex items-center justify-center gap-1.5 shadow transition-all active:scale-95 disabled:opacity-50 ${
                    isTimerRunning ? "bg-amber-500 hover:bg-amber-600" : "bg-primary hover:opacity-90"
                  }`}
                >
                  {isTimerRunning ? <><Pause className="w-4 h-4 fill-white" /> Freeze!</> : <><Play className="w-4 h-4 fill-white" /> Start Timer!</>}
                </button>

                <button
                  disabled={isPending}
                  onClick={() => { setIsTimerRunning(false); setTimeLeft(targetNum); }}
                  className="p-3 bg-secondary text-secondary-foreground rounded-xl border border-border hover:opacity-90 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </>

            {isPending && <p className="text-xs font-bold text-muted-foreground animate-pulse">Loading up your prize stash...</p>}
            {isCompleted && (
              <p className="text-xs font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20 text-center">
                🎉 Awesome job! Level up points and shiny gold coins have been added to your inventory!
              </p>
            )}
          </div>

          {/* Tips guide text section */}
          {challenge.how_to && (
            <div className="space-y-3 pt-1">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-black text-foreground mb-1">Pro Gamer Tip</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{challenge.how_to}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </motion.div>
  );
}

export default function ExerciseLibrary() {
  const queryClient = useQueryClient();
  const today = moment().format("YYYY-MM-DD");
  const [selectedPart, setSelectedPart] = useState("all");

  const rawProfileId = getSelectedProfileId();
  const profileId = rawProfileId ? Number(rawProfileId) : null;

  const { data: profile } = useQuery({
    queryKey: ["myProfile", profileId],
    queryFn: async () => {
      if (!profileId) return null;
      const results = await PlayerProfile.filter({ id: profileId });
      return results[0] || null;
    },
    enabled: !!profileId,
  });

  const { data: todayCompletions } = useQuery({
    queryKey: ["todayCompletions", today, profile?.user_email],
    queryFn: async () => {
      if (!profile?.user_email) return [];
      return ChallengeCompletion.filter({
        user_email: profile.user_email,
        completion_date: today,
      });
    },
    enabled: !!profile?.user_email,
  });

  const completedIds = new Set((todayCompletions || []).map(c => c.challenge_id));

  const completeMutation = useMutation({
    mutationFn: async (exercise) => {
      if (!profile || !profile.user_email) return;

      const isNewDay = profile.last_challenge_date !== today;
      const wasYesterday = profile.last_challenge_date === moment().subtract(1, "day").format("YYYY-MM-DD");
      let newStreak = profile.current_streak || 0;
      if (isNewDay) {
        newStreak = wasYesterday ? newStreak + 1 : 1;
      }

      const multiplier = getStreakMultiplier(newStreak);
      const bonusXP = Math.round(Number(exercise.xp) * multiplier);

      try {
        await ChallengeCompletion.create({
          user_email: profile.user_email,
          challenge_id: exercise.id,
          body_part: exercise.body_part || "full_body",
          xp_earned: Number(bonusXP),
          coins_earned: Number(exercise.coins),
          completion_date: today,
        });
      } catch (err) {
        console.error("Database entry save error:", err);
        throw err;
      }

      const calculatedXP = Number(profile.total_xp || 0) + Number(bonusXP);
      const calculatedCoins = Number(profile.coins || 0) + Number(exercise.coins);

      const cleanUpdatePayload = {
        total_xp: Number(calculatedXP),
        coins: Number(calculatedCoins),
        current_streak: Number(newStreak),
        longest_streak: Number(Math.max(newStreak, profile.longest_streak || 0)),
        last_challenge_date: today,
        level: Number(getLevelFromXP(calculatedXP))
      };

      try {
        await PlayerProfile.update(Number(profile.id), cleanUpdatePayload);
      } catch (profileErr) {
        console.error("Profile update failed:", profileErr);
        throw profileErr;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todayCompletions"] });
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });

  const filtered = selectedPart === "all"
    ? CHALLENGES
    : CHALLENGES.filter(c => c.body_part === selectedPart);

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        <div>
          <h1 className="text-2xl font-black text-foreground">Exercise Quest Library</h1>
          <p className="text-sm text-muted-foreground mt-1">Open an adventure card to complete your timed fitness challenges and get epic loot!</p>
        </div>

        {/* Filter Navigation Category Menu Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          <button
            onClick={() => setSelectedPart("all")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedPart === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All Quests
          </button>
          {BODY_PARTS.map(bp => (
            <button
              key={bp.id}
              onClick={() => setSelectedPart(bp.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedPart === bp.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {bp.emoji} {bp.label}
            </button>
          ))}
        </div>

        <p className="text-xs font-bold text-muted-foreground">
          {filtered.length} timed exercise quest{filtered.length !== 1 ? "s" : ""} available
        </p>

        <div className="space-y-3">
          {filtered.map((challenge, i) => (
            <ExerciseCard
              key={challenge.id}
              challenge={challenge}
              index={i}
              isCompleted={completedIds.has(challenge.id)}
              isPending={completeMutation.isPending}
              onComplete={(item) => completeMutation.mutate(item)}
              selectedPart={selectedPart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}