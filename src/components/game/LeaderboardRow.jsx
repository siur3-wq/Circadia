import React from "react";
import AvatarDisplay from "./AvatarDisplay";
import { getBannerById } from "./BannerUtils";
import BannerPattern from "./BannerPattern";
import PlayerTitle from "./PlayerTitle";

export default function LeaderboardRow({ rank, name, xp, profile, level, isCurrentUser }) {
  const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
  const banner = profile ? getBannerById(profile.banner_id) : null;

  return (
    <div className={`relative flex items-center gap-3 p-3 rounded-xl overflow-hidden transition-all ${
      isCurrentUser ? "border-2 border-primary/60" : "border border-white/5"
    }`}>
      {/* Banner gradient background */}
      {banner && (
        <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-25`} />
      )}

      {/* Banner pattern overlay */}
      {banner && <BannerPattern pattern={banner.pattern} opacity={0.12} />}

      {/* Rank */}
      <div className="relative z-10 w-8 text-center font-black text-lg shrink-0">
        {medals[rank] || <span className="text-muted-foreground text-sm">{rank}</span>}
      </div>

      {/* Avatar */}
      <div className="relative z-10 shrink-0">
        {profile ? (
          <AvatarDisplay profile={profile} size="sm" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg">
            🏫
          </div>
        )}
      </div>

      {/* Name + level */}
      <div className="relative z-10 flex-1 min-w-0">
        <p className={`font-bold text-sm truncate ${isCurrentUser ? "text-primary" : "text-foreground"}`}>
          {name}
          {isCurrentUser && <span className="text-xs ml-1 opacity-60">(You)</span>}
        </p>
        <div className="flex items-center gap-1.5 flex-wrap">
          {level && (
            <span className="text-xs text-muted-foreground font-bold">Lv. {level}</span>
          )}
          {profile && <PlayerTitle profile={profile} />}
        </div>
      </div>

      {/* Banner emoji + XP */}
      <div className="relative z-10 flex items-center gap-2 shrink-0">
        {banner && <span className="text-base">{banner.emoji}</span>}
        <div className="text-right">
          <span className="font-black text-primary text-sm">{xp?.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground ml-1">XP</span>
        </div>
      </div>
    </div>
  );
}