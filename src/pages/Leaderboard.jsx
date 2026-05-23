import React, { useState, useMemo } from "react";
import { PlayerProfile, School as SchoolDB, Class as ClassDB, ChallengeCompletion } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trophy, Users, School } from "lucide-react";
import { motion } from "framer-motion";
import LeaderboardRow from "../components/game/LeaderboardRow";
import { Skeleton } from "@/components/ui/skeleton";
import { getLevelFromXP } from "../components/game/ChallengeData";
import { startOfWeek, startOfMonth, parseISO, isAfter } from "date-fns";

const TIME_PERIODS = [
  { id: "weekly", label: "Week" },
  { id: "monthly", label: "Month" },
  { id: "alltime", label: "All Time" },
];

function LoadingSkeleton() {
  return Array(5).fill(0).map((_, i) => (
    <div key={i} className="flex items-center gap-3 p-3">
      <Skeleton className="w-8 h-8 rounded-full" />
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1"><Skeleton className="h-4 w-24" /></div>
      <Skeleton className="h-4 w-16" />
    </div>
  ));
}

function getPeriodStart(period) {
  const now = new Date();
  if (period === "weekly") return startOfWeek(now, { weekStartsOn: 1 });
  if (period === "monthly") return startOfMonth(now);
  return null;
}

function filterCompletions(completions, period) {
  const start = getPeriodStart(period);
  if (!start) return completions;
  return completions.filter(c => {
    if (!c.completion_date) return false;
    return isAfter(parseISO(c.completion_date), start);
  });
}

export default function Leaderboard() {
  const [tab, setTab] = useState("individual");
  const [period, setPeriod] = useState("alltime");

  const { data: allProfiles, isLoading: loadingProfiles } = useQuery({
    queryKey: ["allProfiles"],
    queryFn: () => PlayerProfile.list('-total_xp', 200),
  });

  const { data: schools, isLoading: loadingSchools } = useQuery({
    queryKey: ["allSchools"],
    queryFn: () => SchoolDB.list('-total_xp', 100),
  });

  const { data: classes, isLoading: loadingClasses } = useQuery({
    queryKey: ["allClasses"],
    queryFn: () => ClassDB.list('-total_xp', 100),
  });

  // Fetch all completions for weekly/monthly period filtering
  const { data: allCompletions } = useQuery({
    queryKey: ["allCompletionsLeaderboard"],
    queryFn: () => ChallengeCompletion.list('-completion_date', 5000),
    enabled: period !== "alltime",
  });

  const myProfile = null;
  const user = null;

  // Build ranked player list based on period
  const rankedPlayers = React.useMemo(() => {
    if (!allProfiles) return [];
    if (period === "alltime") {
      return [...allProfiles].sort((a, b) => (b.total_xp || 0) - (a.total_xp || 0));
    }
    const filtered = filterCompletions(allCompletions || [], period);
    // Sum XP per user
    const xpMap = {};
    filtered.forEach(c => {
      xpMap[c.user_email] = (xpMap[c.user_email] || 0) + (c.xp_earned || 0);
    });
    return allProfiles
      .map(p => ({ ...p, period_xp: xpMap[p.user_email] || 0 }))
      .filter(p => p.period_xp > 0)
      .sort((a, b) => b.period_xp - a.period_xp);
  }, [allProfiles, allCompletions, period]);

  // Build ranked class list based on period
  const rankedClasses = React.useMemo(() => {
    if (!classes || !allProfiles) return [];
    if (period === "alltime") {
      return [...classes]
        .map(c => ({
          ...c,
          computed_xp: allProfiles.filter(p => p.class_id === c.id).reduce((s, p) => s + (p.total_xp || 0), 0),
        }))
        .sort((a, b) => b.computed_xp - a.computed_xp);
    }
    const filtered = filterCompletions(allCompletions || [], period);
    const xpByUser = {};
    filtered.forEach(c => { xpByUser[c.user_email] = (xpByUser[c.user_email] || 0) + (c.xp_earned || 0); });
    return classes
      .map(c => ({
        ...c,
        computed_xp: allProfiles.filter(p => p.class_id === c.id).reduce((s, p) => s + (xpByUser[p.user_email] || 0), 0),
      }))
      .filter(c => c.computed_xp > 0)
      .sort((a, b) => b.computed_xp - a.computed_xp);
  }, [classes, allProfiles, allCompletions, period]);

  // Build ranked school list based on period
  const rankedSchools = React.useMemo(() => {
    if (!schools || !allProfiles) return [];
    if (period === "alltime") {
      return [...schools]
        .map(s => ({
          ...s,
          computed_xp: allProfiles.filter(p => p.school_id === s.id).reduce((sum, p) => sum + (p.total_xp || 0), 0),
        }))
        .sort((a, b) => b.computed_xp - a.computed_xp);
    }
    const filtered = filterCompletions(allCompletions || [], period);
    const xpByUser = {};
    filtered.forEach(c => { xpByUser[c.user_email] = (xpByUser[c.user_email] || 0) + (c.xp_earned || 0); });
    return schools
      .map(s => ({
        ...s,
        computed_xp: allProfiles.filter(p => p.school_id === s.id).reduce((sum, p) => sum + (xpByUser[p.user_email] || 0), 0),
      }))
      .filter(s => s.computed_xp > 0)
      .sort((a, b) => b.computed_xp - a.computed_xp);
  }, [schools, allProfiles, allCompletions, period]);

  const emptyMsg = { individual: ["🏃‍♂️", "No players yet!"], class: ["📚", "No classes yet!"], school: ["🏫", "No schools yet!"] };

  function EmptyState({ tabKey }) {
    const [emoji, msg] = emptyMsg[tabKey];
    return (
      <div className="text-center py-8 text-muted-foreground">
        <div className="text-3xl mb-2">{emoji}</div>
        <p className="font-bold">{period !== "alltime" ? "No activity this period!" : msg}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-6">
          <div className="text-4xl mb-2">🏆</div>
          <h1 className="text-2xl font-black text-foreground">Leaderboards</h1>
          <p className="text-sm text-muted-foreground">See who's the fittest!</p>
        </motion.div>

        {/* Time period selector */}
        <div className="flex justify-center gap-2 mb-4">
          {TIME_PERIODS.map(p => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                period === p.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full grid grid-cols-3 mb-6 bg-muted rounded-2xl p-1 h-auto">
            <TabsTrigger value="individual" className="rounded-xl py-2.5 text-xs font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Trophy className="w-4 h-4 mr-1" /> Players
            </TabsTrigger>
            <TabsTrigger value="class" className="rounded-xl py-2.5 text-xs font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Users className="w-4 h-4 mr-1" /> Classes
            </TabsTrigger>
            <TabsTrigger value="school" className="rounded-xl py-2.5 text-xs font-bold data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <School className="w-4 h-4 mr-1" /> Schools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <div className="bg-card rounded-2xl border border-border p-2 space-y-1">
              {loadingProfiles ? <LoadingSkeleton /> :
                rankedPlayers.length === 0 ? <EmptyState tabKey="individual" /> :
                rankedPlayers.map((p, i) => (
                  <LeaderboardRow
                    key={p.id}
                    rank={i + 1}
                    name={p.display_name}
                    xp={period === "alltime" ? (p.total_xp || 0) : p.period_xp}
                    profile={p}
                    level={getLevelFromXP(p.total_xp || 0)}
                    isCurrentUser={p.user_email === user?.email}
                  />
                ))
              }
            </div>
          </TabsContent>

          <TabsContent value="class">
            <div className="bg-card rounded-2xl border border-border p-2 space-y-1">
              {loadingClasses ? <LoadingSkeleton /> :
                rankedClasses.length === 0 ? <EmptyState tabKey="class" /> :
                rankedClasses.map((c, i) => (
                  <LeaderboardRow
                    key={c.id}
                    rank={i + 1}
                    name={c.name}
                    xp={c.computed_xp}
                    isCurrentUser={c.id === myProfile?.class_id}
                  />
                ))
              }
            </div>
          </TabsContent>

          <TabsContent value="school">
            <div className="bg-card rounded-2xl border border-border p-2 space-y-1">
              {loadingSchools ? <LoadingSkeleton /> :
                rankedSchools.length === 0 ? <EmptyState tabKey="school" /> :
                rankedSchools.map((s, i) => (
                  <LeaderboardRow
                    key={s.id}
                    rank={i + 1}
                    name={s.name}
                    xp={s.computed_xp}
                    isCurrentUser={s.id === myProfile?.school_id}
                  />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}