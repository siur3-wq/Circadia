import React from "react";
import { motion } from "framer-motion";
import { CHALLENGES, BODY_PARTS } from "./ChallengeData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Estimate exercise minutes per challenge based on reps string
function estimateMinutes(repsStr = "") {
  const minMatch = repsStr.match(/(\d+)\s*min/i);
  if (minMatch) return parseInt(minMatch[1]);
  const secMatch = repsStr.match(/(\d+)\s*s/i);
  if (secMatch) return Math.ceil(parseInt(secMatch[1]) / 60);
  // count-based: ~30 seconds per challenge
  return 0.5;
}

const PART_COLORS = {
  arms: "#f87171",
  legs: "#60a5fa",
  core: "#facc15",
  full_body: "#4ade80",
  cardio: "#f472b6",
  flexibility: "#c084fc",
};

// Accept completions as a direct prop passed from Profile.jsx
export default function StatsPanel({ profile, completions = [] }) {
  
  // Total activities
  const totalActivities = completions.length;

  // Total XP earned
  const totalXP = completions.reduce((s, c) => s + (c.xp_earned || 0), 0);

  // Total coins earned
  const totalCoins = completions.reduce((s, c) => s + (c.coins_earned || 0), 0);

  // Estimate total minutes
  const totalMinutes = completions.reduce((sum, c) => {
    const challengeDef = CHALLENGES.find(ch => ch.id === c.challenge_id);
    return sum + estimateMinutes(challengeDef?.reps || "");
  }, 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = Math.round(totalMinutes % 60);

  // By body part breakdown
  const byPart = BODY_PARTS.map(bp => ({
    label: bp.emoji + " " + bp.label,
    id: bp.id,
    count: completions.filter(c => c.body_part === bp.id).length,
  })).filter(bp => bp.count > 0).sort((a, b) => b.count - a.count);

  // Activity over last 14 days
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const dateStr = d.toISOString().split("T")[0];
    return {
      date: d.toLocaleDateString("en", { weekday: "short", day: "numeric" }),
      count: completions.filter(c => c.completion_date === dateStr).length,
    };
  });

  // Favourite body part
  const favourite = byPart[0];

  const statItems = [
    { emoji: "🏃", label: "Activities Done", value: totalActivities },
    { emoji: "⏱️", label: "Time Exercised", value: hours > 0 ? `${hours}h ${mins}m` : `${mins}m` },
    { emoji: "⚡", label: "Total XP Earned", value: totalXP.toLocaleString() },
    { emoji: "🪙", label: "Total Coins Earned", value: totalCoins.toLocaleString() },
    { emoji: "🔥", label: "Best Streak", value: `${profile?.longest_streak || 0} days` },
    { emoji: "📅", label: "Active Days", value: new Set(completions.map(c => c.completion_date)).size },
  ];

  return (
    <div className="space-y-6">
      {/* Summary grid */}
      <div className="grid grid-cols-2 gap-3">
        {statItems.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border-2 border-border rounded-2xl p-4"
          >
            <div className="text-2xl mb-1">{s.emoji}</div>
            <p className="font-black text-xl text-foreground tracking-tight">{s.value}</p>
            <p className="text-xs text-muted-foreground font-bold">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Activity chart – last 14 days */}
      {totalActivities > 0 && (
        <div className="bg-card border-2 border-border rounded-2xl p-4">
          <p className="text-sm font-black text-foreground mb-3">📅 Last 14 Days</p>
          <div className="w-full h-28">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last14} barSize={14}>
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} interval={1} axisLine={false} tickLine={false} />
                <YAxis hide allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ fontWeight: 700 }}
                />
                <Bar dataKey="count" name="Activities" radius={[4, 4, 0, 0]} fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Body part breakdown */}
      {byPart.length > 0 && (
        <div className="bg-card border-2 border-border rounded-2xl p-4">
          <p className="text-sm font-black text-foreground mb-3">💪 By Body Part</p>
          <div className="space-y-2">
            {byPart.map(bp => (
              <div key={bp.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground w-28 shrink-0">{bp.label}</span>
                <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(bp.count / totalActivities) * 100}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: PART_COLORS[bp.id] || "hsl(var(--primary))" }}
                  />
                </div>
                <span className="text-xs font-black text-foreground w-6 text-right">{bp.count}</span>
              </div>
            ))}
          </div>
          {favourite && (
            <p className="text-xs text-muted-foreground mt-3 text-center">
              ⭐ Favourite: <span className="font-black text-foreground">{favourite.label}</span>
            </p>
          )}
        </div>
      )}

      {totalActivities === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-3xl bg-card/40 space-y-2">
          <div className="text-4xl">🏋️</div>
          <p className="font-black text-sm text-foreground tracking-tight">No activities recorded yet</p>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto px-4">
            Complete a challenge from the fitness ledger to view your metrics tracking data!
          </p>
        </div>
      )}
    </div>
  );
}