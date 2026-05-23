import React, { useState, useEffect } from "react";
import { PlayerProfile, ChallengeCompletion } from "@/lib/db";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { getDailyChallenges, getLevelFromXP } from "../components/game/ChallengeData";
import { getStreakMultiplier } from "../components/game/StreakDisplay";
import ChallengeCard from "../components/game/ChallengeCard";
import AvatarDisplay from "../components/game/AvatarDisplay";
import XPBar from "../components/game/XPBar";
import StatCard from "../components/game/StatCard";
import StreakDisplay from "../components/game/StreakDisplay";
import FunFact from "../components/game/FunFact";
import AchievementToast from "../components/game/AchievementToast";
import { getNewlyEarned } from "../components/game/AchievementData";
import { getBannerById } from "../components/game/BannerUtils";
import BannerPattern from "../components/game/BannerPattern";
import PlayerTitle from "../components/game/PlayerTitle";
import { getSelectedProfileId } from "../lib/selectedProfile";
import { Timer } from "lucide-react";
import moment from "moment";

export default function Home() {
  const queryClient = useQueryClient();
  const today = moment().format("YYYY-MM-DD");
  const [newAchievements, setNewAchievements] = useState([]);
  
  // --- CENTRAL TIMER OVERLAY STATES ---
  const [activeTimerChallenge, setActiveTimerChallenge] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [maxTimerDuration, setMaxTimerDuration] = useState(60); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const rawProfileId = getSelectedProfileId();
  const profileId = rawProfileId ? Number(rawProfileId) : null;

  // Fetch player profile row
  const { data: profile } = useQuery({
    queryKey: ["myProfile", profileId],
    queryFn: async () => {
      if (!profileId) return null;
      const results = await PlayerProfile.filter({ id: profileId });
      return results[0] || null;
    },
    enabled: !!profileId,
  });

  const rawDailyChallenges = getDailyChallenges(today, profile?.id) || [];

  // --- LOGICAL DURATION ENGINE (MINIMUM 60s BASELINE) ---
  const dailyChallenges = rawDailyChallenges.map(challenge => {
    const name = (challenge.text || challenge.name || "").toLowerCase();
    
    const isHard = name.includes("squat") || name.includes("pushup") || name.includes("push-up") || 
                   name.includes("plank") || name.includes("lunge");
    const isMedium = name.includes("crunch") || name.includes("bridge") || name.includes("twist");

    let difficultyLabel = "Easy";
    let targetDuration = 60; // Baseline floor minimum configuration
    let computedXp = challenge.xp || 15;
    let computedCoins = challenge.coins || 5;

    // 1. Assign Rewards pure structural difficulty mapping
    if (isHard) {
      difficultyLabel = "Hard";
      computedXp = challenge.xp || 40;
      computedCoins = challenge.coins || 15;
    } else if (isMedium) {
      difficultyLabel = "Medium";
      computedXp = challenge.xp || 25;
      computedCoins = challenge.coins || 10;
    }

    // 2. Adjust durations relative to fitness pacing (Floor clamped strictly at 60s)
    if (name.includes("squat") || name.includes("lunge")) {
      targetDuration = 90; // High tier pacing for structural lower body multi-groups
    } else if (name.includes("plank") || name.includes("pushup") || name.includes("push-up")) {
      targetDuration = 75; // Isometric strain limits above baseline
    } else if (isMedium) {
      targetDuration = 75; // Core movement targeted duration pacing
    } else {
      targetDuration = 60; // Clamped exact baseline for sprint bursts and light mobility
    }

    let cleanText = challenge.text || challenge.name || "";
    cleanText = cleanText.replace(/\d+\s*(times|reps|seconds|sec|s|counts|x)\b/gi, "").replace(/\s+/g, " ").trim();
    
    const displayMinutes = Math.floor(targetDuration / 60);
    const displaySeconds = targetDuration % 60;
    const timeLabel = displaySeconds > 0 && displayMinutes > 0 
      ? `${displayMinutes}m ${displaySeconds}s` 
      : displayMinutes > 0 ? `${displayMinutes} minute` : `${displaySeconds} seconds`;

    return {
      ...challenge,
      text: `${cleanText} until the timer runs out!`,
      xp: computedXp,
      coins: computedCoins,
      difficulty: difficultyLabel,
      duration: targetDuration, 
      targetNum: targetDuration,
      computedSeconds: targetDuration,
      timeLabel: timeLabel
    };
  });

  // Fetch today's completions
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

  // Central Countdown Timer Engine Loop
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (activeTimerChallenge) {
        completeMutation.mutate(activeTimerChallenge);
        setActiveTimerChallenge(null);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, activeTimerChallenge]);

  const handleChallengeInitiation = (challenge) => {
    const totalSeconds = challenge.computedSeconds || 60;
    setTimeLeft(totalSeconds);
    setMaxTimerDuration(totalSeconds);
    setActiveTimerChallenge(challenge);
    setIsTimerRunning(true);
  };

  // Complete Mutation Handler Payload Setup
  const completeMutation = useMutation({
    mutationFn: async (challenge) => {
      if (!profile || !profile.user_email) return;

      const isNewDay = profile.last_challenge_date !== today;
      const wasYesterday = profile.last_challenge_date === moment().subtract(1, "day").format("YYYY-MM-DD");
      let newStreak = profile.current_streak || 0;
      if (isNewDay) {
        newStreak = wasYesterday ? newStreak + 1 : 1;
      }

      const multiplier = getStreakMultiplier(newStreak);
      const bonusXP = Math.round(challenge.xp * multiplier);

      await ChallengeCompletion.create({
        user_email: profile.user_email,
        challenge_id: challenge.id,
        body_part: challenge.body_part,
        xp_earned: Number(bonusXP),
        coins_earned: Number(challenge.coins),
        completion_date: today,
      });

      let calculatedXP = Number(profile.total_xp || 0) + Number(bonusXP);
      let calculatedCoins = Number(profile.coins || 0) + Number(challenge.coins);
      const transientAchievements = Array.isArray(profile.unlocked_achievements) ? [...profile.unlocked_achievements] : [];

      const transientProfile = {
        ...profile,
        total_xp: calculatedXP,
        coins: calculatedCoins,
        current_streak: Number(newStreak),
        longest_streak: Number(Math.max(newStreak, profile.longest_streak || 0)),
        last_challenge_date: today,
        level: getLevelFromXP(calculatedXP),
        unlocked_achievements: transientAchievements,
      };

      if (completedIds.size === dailyChallenges.length - 1) {
        calculatedXP += 50;
        calculatedCoins += 10;
        transientProfile.total_xp = calculatedXP;
        transientProfile.coins = calculatedCoins;
        transientProfile.level = getLevelFromXP(calculatedXP);
        
        try {
          await ChallengeCompletion.create({
            user_email: profile.user_email,
            challenge_id: "daily_bonus",
            body_part: "full_body",
            xp_earned: 50,
            coins_earned: 10,
            completion_date: today,
          });
        } catch (bErr) {}
      }

      const earned = getNewlyEarned(transientProfile);
      if (earned.length > 0) {
        earned.forEach(a => {
          transientProfile.unlocked_achievements.push(a.id);
          calculatedXP += a.bonusXP;
        });
        setNewAchievements(earned);
      }

      await PlayerProfile.update(Number(profile.id), {
        total_xp: Number(calculatedXP),
        coins: Number(calculatedCoins),
        current_streak: Number(transientProfile.current_streak),
        longest_streak: Number(transientProfile.longest_streak),
        last_challenge_date: transientProfile.last_challenge_date,
        level: Number(getLevelFromXP(calculatedXP))
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todayCompletions"] });
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });

  if (!profileId || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">👋</div>
          <h2 className="text-2xl font-black text-foreground mb-2">Pick your profile first!</h2>
          <a href={`/SelectProfile`} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-2xl">
            Pick Profile 🚀
          </a>
        </div>
      </div>
    );
  }

  const allCompleted = dailyChallenges.every(c => completedIds.has(c.id));
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins}:${remSecs < 10 ? "0" : ""}${remSecs}`;
  };

  return (
    <div className="min-h-screen pb-24">
      {newAchievements.length > 0 && (
        <AchievementToast achievements={newAchievements} onDone={() => setNewAchievements([])} />
      )}
      
      <div className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        {/* Banner Profile Header Component */}
        {(() => {
          const banner = getBannerById(profile.banner_id || "banner_default");
          return (
            <div className={`relative flex items-center gap-4 p-4 rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-r ${banner.gradient}`}>
              <BannerPattern pattern={banner.pattern} opacity={0.13} />
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative z-10 shrink-0"><AvatarDisplay profile={profile} size="md" /></div>
              <div className="relative z-10 flex-1 min-w-0">
                <h1 className="text-xl font-black text-white truncate">Hey, {profile.display_name}! 👋</h1>
                <XPBar xp={profile.total_xp || 0} level={profile.level || 1} />
              </div>
            </div>
          );
        })()}

        {/* Dashboard Grid Stats Counters */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon="⚡" label="XP" value={profile.total_xp || 0} color="xp" />
          <StatCard icon="🪙" label="Coins" value={profile.coins || 0} color="coin" />
          <StatCard icon="🏆" label="Done" value={completedIds.size} color="accent" />
        </div>

        <StreakDisplay streak={profile.current_streak || 0} />

        {/* Layout Challenge Listing Block */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-foreground">Today's Challenges</h2>
            <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {completedIds.size}/{dailyChallenges.length}
            </span>
          </div>
          
          {allCompleted && (
            <div className="text-center py-6 mb-4 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl border border-accent/30">
              <p className="font-black text-foreground">All Done Today! 🎉</p>
            </div>
          )}

          <div className="space-y-4">
            {dailyChallenges.map((challenge) => (
              <ChallengeCard
                key={`${challenge.id}-duration-${challenge.computedSeconds}`}
                challenge={challenge}
                completed={completedIds.has(challenge.id)}
                onComplete={(c) => handleChallengeInitiation(c)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- WORKOUT TIMER DRAW HUD OVERLAY --- */}
      <AnimatePresence>
        {activeTimerChallenge && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-card border border-border w-full max-w-sm rounded-3xl p-6 space-y-6 relative">
              <div className="space-y-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                  activeTimerChallenge.difficulty === "Hard" ? "bg-red-500/10 text-red-400" :
                  activeTimerChallenge.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400" : "bg-green-500/10 text-green-400"
                }`}>
                  {activeTimerChallenge.difficulty} Mode
                </span>
                <h3 className="text-2xl font-black text-foreground">{activeTimerChallenge.name}</h3>
                <p className="text-sm text-muted-foreground font-bold">Maintain form setup for {activeTimerChallenge.timeLabel}!</p>
              </div>

              {/* Progress Count Segment Ring UI */}
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" className="text-muted/30" fill="transparent" />
                  <motion.circle
                    cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" className="text-primary" fill="transparent"
                    strokeDasharray="276.46"
                    animate={{ strokeDashoffset: 276.46 - (276.46 * timeLeft) / maxTimerDuration }}
                    transition={{ duration: 0.3, ease: "linear" }}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-black tabular-nums text-foreground tracking-tight">{formatTime(timeLeft)}</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-black">
                  {isTimerRunning ? "Pause" : "Resume"}
                </button>
                <button onClick={() => { setIsTimerRunning(false); setActiveTimerChallenge(null); }} className="bg-muted text-muted-foreground px-4 py-2.5 rounded-xl text-sm font-black">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}