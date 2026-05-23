import React from "react";

export default function StatCard({ icon, label, value, color = "primary" }) {
  const colorMap = {
    primary: "from-primary/20 to-primary/5 text-primary",
    secondary: "from-secondary/20 to-secondary/5 text-secondary",
    accent: "from-accent/20 to-accent/5 text-accent",
    streak: "from-streak/20 to-streak/5 text-streak",
    coin: "from-coin/20 to-coin/5 text-coin",
    xp: "from-xp/20 to-xp/5 text-xp",
  };

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.primary} p-4 flex flex-col items-center gap-1`}>
      <span className="text-2xl">{icon}</span>
      <span className="text-xl font-black">{value}</span>
      <span className="text-xs font-semibold opacity-70">{label}</span>
    </div>
  );
}