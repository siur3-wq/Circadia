import React, { useState, useEffect, useMemo } from "react";
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
import FloatingTextEffect from "../components/game/FloatingTextEffect";
import { getNewlyEarned } from "../components/game/AchievementData";
import { getBannerById } from "../components/game/BannerUtils";
import BannerPattern from "../components/game/BannerPattern";
import PlayerTitle from "../components/game/PlayerTitle";
import { getSelectedProfileId } from "../lib/selectedProfile";
import { Timer } from "lucide-react";
import moment from "moment";
import { supabase } from "@/lib/supabase"; 

export default function Home() {
  const queryClient = useQueryClient();
  const today = moment().format("YYYY-MM-DD");
  const [newAchievements, setNewAchievements] = useState([]);
  
  // --- CENTRAL TIMER OVERLAY STATES ---
  const [activeTimerChallenge, setActiveTimerChallenge] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [maxTimerDuration, setMaxTimerDuration] = useState(60); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Read the active profile string from storage
  const profileId = getSelectedProfileId();

  // 1. Fetch player profile row
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["myProfile", profileId],
    queryFn: async () => {
      if (!profileId) return null;
      const results = await PlayerProfile.filter({ id: profileId });
      return results[0] || null;
    },
    enabled: !!profileId,
  });

  // Fetch the latest global broadcast from Supabase
  const { data: globalAnnouncement } = useQuery({
    queryKey: ["latestAnnouncement"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);
      if (error) return null;
      return data?.[0] || null;
    },
    refetchInterval: 10000, // Syncs student devices automatically every 10 seconds
  });

  // Safe fallback deterministic string for generating daily seeds
  const seedString = useMemo(() => {
    if (!profile) return "fallback_seed";
    return String(profile.user_email || profile.display_name || profile.id);
  }, [profile]);

  // 2. Fetch today's database challenge completions
  const { data: todayCompletions } = useQuery({
    queryKey: ["todayCompletions", today, seedString],
    queryFn: async () => {
      if (!profile?.user_email) return [];
      const results = await ChallengeCompletion.filter({
        user_email: profile.user_email,
        completion_date: today,
      });
      return Array.isArray(results) ? results : [];
    },
    enabled: !!profile?.user_email,
  });

  // Calculate completed IDs Set safely
  const completedIds = useMemo(() => {
    return new Set((todayCompletions || []).map(c => String(c.challenge_id)));
  }, [todayCompletions]);

  // 3. Central Countdown Timer Loop Effect
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

  // 4. Generate Daily Challenges List
  const rawDailyChallenges = useMemo(() => {
    return getDailyChallenges(today, seedString) || [];
  }, [today, seedString]);

  const dailyChallenges = useMemo(() => {
    return rawDailyChallenges.map(challenge => {
      const name = (challenge.text || challenge.name || "").toLowerCase();
      const isHard = name.includes("squat") || name.includes("pushup") || name.includes("push-up") || name.includes("plank") || name.includes("lunge");
      const isMedium = name.includes("crunch") || name.includes("bridge") || name.includes("twist");

      let difficultyLabel = "Easy";
      let targetDuration = 60; 
      let computedXp = challenge.xp || 15;
      let computedCoins = challenge.coins || 5;

      if (isHard) {
        difficultyLabel = "Hard";
        computedXp = challenge.xp || 40;
        computedCoins = challenge.coins || 15;
      } else if (isMedium) {
        difficultyLabel = "Medium";
        computedXp = challenge.xp || 25;
        computedCoins = challenge.coins || 10;
      }

      if (name.includes("squat") || name.includes("lunge")) {
        targetDuration = 90; 
      } else if (name.includes("plank") || name.includes("pushup") || name.includes("push-up")) {
        targetDuration = 75; 
      } else if (isMedium) {
        targetDuration = 75; 
      } else {
        targetDuration = 60; 
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
        xp: Number(computedXp),
        coins: Number(computedCoins),
        difficulty: difficultyLabel,
        duration: targetDuration, 
        targetNum: targetDuration,
        computedSeconds: targetDuration,
        timeLabel: timeLabel
      };
    });
  }, [rawDailyChallenges]);

  // 5. Complete Challenge Mutation Engine
  const completeMutation = useMutation({
    mutationFn: async (challenge) => {
      if (!profile || !profile.user_email) return;

      const isNewDay = profile.last_challenge_date !== today;
      const wasYesterday = profile.last_challenge_date === moment().subtract(1, "day").format("YYYY-MM-DD");
      
      let newStreak = Number(profile.current_streak || 0);
      if (isNewDay) {
        newStreak = wasYesterday ? newStreak + 1 : 1;
      }

      const multiplier = getStreakMultiplier(newStreak) || 1;
      const baseEarnedXP = Math.round(Number(challenge.xp || 15) * multiplier);
      const baseEarnedCoins = Number(challenge.coins || 5);

      await ChallengeCompletion.create({
        user_email: profile.user_email,
        challenge_id: String(challenge.id),
        body_part: String(challenge.body_part || "general"),
        xp_earned: Number(baseEarnedXP),
        coins_earned: Number(baseEarnedCoins),
        completion_date: today,
      });

      let runningXPAddition = baseEarnedXP;
      let runningCoinsAddition = baseEarnedCoins;

      const currentDoneCount = completedIds ? completedIds.size : 0;
      const totalChallengesCount = dailyChallenges ? dailyChallenges.length : 0;

      if (totalChallengesCount > 0 && currentDoneCount === totalChallengesCount - 1 && !completedIds.has(String(challenge.id))) {
        runningXPAddition += 50;
        runningCoinsAddition += 10;
        try {
          await ChallengeCompletion.create({
            user_email: profile.user_email,
            challenge_id: "daily_bonus",
            body_part: "full_body",
            xp_earned: 50,
            coins_earned: 10,
            completion_date: today,
          });
        } catch (err) {}
      }

      const baseProfileXP = Number(profile.total_xp || 0);
      const baseProfileCoins = Number(profile.coins || 0);
      const transientAchievements = Array.isArray(profile.unlocked_achievements) ? [...profile.unlocked_achievements] : [];

      const transientProfile = {
        ...profile,
        total_xp: baseProfileXP + runningXPAddition,
        coins: baseProfileCoins + runningCoinsAddition,
        current_streak: Number(newStreak),
        longest_streak: Number(Math.max(newStreak, Number(profile.longest_streak || 0))),
        last_challenge_date: today,
        unlocked_achievements: transientAchievements,
      };

      const earned = getNewlyEarned(transientProfile);
      if (earned && earned.length > 0) {
        earned.forEach(a => {
          transientProfile.unlocked_achievements.push(a.id);
          runningXPAddition += Number(a.bonusXP || 0);
        });
        setNewAchievements(earned);
      }

      const finalTotalXP = baseProfileXP + runningXPAddition;
      const finalTotalCoins = baseProfileCoins + runningCoinsAddition;

      await PlayerProfile.update(profile.id, {
        total_xp: Number(finalTotalXP),
        coins: Number(finalTotalCoins),
        current_streak: Number(transientProfile.current_streak),
        longest_streak: Number(transientProfile.longest_streak),
        last_challenge_date: today,
        level: Number(getLevelFromXP(finalTotalXP))
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todayCompletions"] });
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });

  const handleChallengeInitiation = (challenge) => {
    const totalSeconds = challenge.computedSeconds || 60;
    setTimeLeft(totalSeconds);
    setMaxTimerDuration(totalSeconds);
    setActiveTimerChallenge(challenge);
    setIsTimerRunning(true);
  };

  const allCompleted = dailyChallenges.length > 0 && dailyChallenges.every(c => completedIds.has(String(c.id)));
  
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins}:${remSecs < 10 ? "0" : ""}${remSecs}`;
  };

  if (!profileId || isProfileLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-black text-foreground mb-2">Loading profile settings...</h2>
          <a href="/SelectProfile" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-2xl mt-2">
            Select Profile 👋
          </a>
        </div>
      </div>
    );
  }

  const safeMaxDuration = maxTimerDuration && maxTimerDuration > 0 ? maxTimerDuration : 60;

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
                <XPBar xp={Number(profile.total_xp || 0)} level={Number(profile.level || 1)} />
              </div>
            </div>
          );
        })()}

        {/* Global Cloud Broadcast Alert Banner */}
        {globalAnnouncement && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-500/15 to-primary/15 border-2 border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-3 text-sm font-black shadow-sm text-foreground"
          >
            <span className="text-lg shrink-0 animate-bounce">📢</span>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-500 block mb-0.5">Announcement</span>
              <p className="text-foreground leading-relaxed font-bold">{globalAnnouncement.message}</p>
            </div>
          </motion.div>
        )}

        {/* Dashboard Grid Stats Counters with Floating Text overlays */}
        <div className="grid grid-cols-3 gap-3">
          <div className="relative overflow-visible">
            <StatCard icon="✨" label="XP" value={Number(profile.total_xp || 0)} color="xp" />
            <FloatingTextEffect value={Number(profile.total_xp || 0)} icon="XP" colorClass="text-emerald-400 font-extrabold" />
          </div>

          <div className="relative overflow-visible">
            <StatCard icon="🪙" label="Coins" value={Number(profile.coins || 0)} color="coin" />
            <FloatingTextEffect value={Number(profile.coins || 0)} icon="🪙" colorClass="text-amber-400 font-extrabold" />
          </div>

          <div className="relative overflow-visible">
            <StatCard icon="🏆" label="Done" value={completedIds.size} color="accent" />
          </div>
        </div>

        <StreakDisplay streak={Number(profile.current_streak || 0)} />

        {/* Layout Challenge Listing Block */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-foreground">Today's Challenges</h2>
            <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {completedIds.size}/{dailyChallenges.length}
            </span>
          </div>
          
          {dailyChallenges.length === 0 && (
            <div className="text-center py-8 bg-muted rounded-2xl border border-dashed">
              <p className="text-sm text-muted-foreground font-bold">No challenges currently allocated for today.</p>
            </div>
          )}

          {allCompleted && dailyChallenges.length > 0 && (
            <div className="text-center py-6 mb-4 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl border border-accent/30">
              <p className="font-black text-foreground">All Done Today! 🎉</p>
            </div>
          )}

          <div className="space-y-4">
            {dailyChallenges.map((challenge) => (
              <ChallengeCard
                key={`${challenge.id}-duration-${challenge.computedSeconds}`}
                challenge={challenge}
                completed={completedIds.has(String(challenge.id))}
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
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: Math.max(0, 276.46 - (276.46 * timeLeft) / safeMaxDuration) }}
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