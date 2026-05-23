import React from "react";
import { getActiveTitle } from "./TitleData";

export default function PlayerTitle({ profile, className = "" }) {
  const title = getActiveTitle(profile);
  if (!title) return null;

  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-black tracking-wide ${title.color} ${title.bg} ${className}`}>
      {title.label}
    </span>
  );
}