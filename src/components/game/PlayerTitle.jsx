import React from "react";
import { getActiveTitles } from "./TitleData";

export default function PlayerTitle({ profile }) {
  if (!profile) return null;

  const activeTitles = getActiveTitles(profile);

  if (!activeTitles || activeTitles.length === 0) {
    return <span className="text-xs text-muted-foreground italic">No Title Equipped</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {activeTitles.map((title) => (
        <span
          key={title.id}
          className={`text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm tracking-wide uppercase ${title.bg} ${title.color}`}
        >
          {title.label}
        </span>
      ))}
    </div>
  );
}