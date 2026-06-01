import React from "react";
import { getBannerById } from "./BannerUtils";

export default function ProfileBanner({ bannerId, size = "md" }) {
  const banner = getBannerById(bannerId);

  if (size === "sm") {
    return (
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${banner.gradient} flex items-center justify-center text-base shrink-0 shadow-sm`}>
        {banner.emoji}
      </div>
    );
  }

  return (
    <div className={`w-full rounded-2xl bg-gradient-to-r ${banner.gradient} px-4 py-3 flex items-center gap-3 shadow-lg`}>
      <span className="text-3xl">{banner.emoji}</span>
      <div>
        <p className="text-white font-black text-sm leading-tight">{banner.name}</p>
        <p className="text-white/60 text-xs font-bold">Active Banner</p>
      </div>
    </div>
  );
}