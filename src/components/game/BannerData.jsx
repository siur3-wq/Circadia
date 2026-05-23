// Player profile banners – themed around fitness & the game
export const BANNERS = [
  // Starter (always unlocked)
  { id: "banner_default",  name: "Plain Quest",   gradient: "from-slate-700 to-slate-900",                 emoji: "⚡", unlockXP: 0,    pattern: "dots" },
  // Early game
  { id: "banner_fire",     name: "On Fire",       gradient: "from-orange-500 to-red-600",                  emoji: "🔥", unlockXP: 50,   pattern: "zigzag" },
  { id: "banner_ice",      name: "Ice Cold",      gradient: "from-cyan-400 to-blue-600",                   emoji: "❄️", unlockXP: 100,  pattern: "diamonds" },
  { id: "banner_forest",   name: "Forest Run",    gradient: "from-green-500 to-emerald-700",               emoji: "🌿", unlockXP: 150,  pattern: "waves" },
  // Mid game
  { id: "banner_storm",    name: "Storm Rider",   gradient: "from-violet-500 to-indigo-700",               emoji: "⛈️", unlockXP: 300,  pattern: "lines" },
  { id: "banner_gold",     name: "Gold Rush",     gradient: "from-yellow-400 to-amber-600",                emoji: "🏆", unlockXP: 500,  pattern: "crosshatch" },
  { id: "banner_galaxy",   name: "Galaxy Grind",  gradient: "from-purple-600 to-pink-700",                 emoji: "🌌", unlockXP: 750,  pattern: "stars" },
  { id: "banner_neon",     name: "Neon Warrior",  gradient: "from-pink-500 to-fuchsia-600",                emoji: "⚡", unlockXP: 1000, pattern: "pulse" },
  // High level
  { id: "banner_volcano",  name: "Volcano Beast", gradient: "from-red-600 to-orange-800",                  emoji: "🌋", unlockXP: 1500, pattern: "cracks" },
  { id: "banner_ocean",    name: "Deep Ocean",    gradient: "from-blue-600 to-teal-800",                   emoji: "🌊", unlockXP: 2000, pattern: "ripples" },
  { id: "banner_aurora",   name: "Aurora Power",  gradient: "from-teal-400 via-purple-500 to-pink-500",    emoji: "🌠", unlockXP: 3000, pattern: "aurora" },
  // Legend tier
  { id: "banner_champion", name: "Champion",      gradient: "from-yellow-300 via-amber-500 to-yellow-700", emoji: "👑", unlockXP: 5000, pattern: "crown" },
];

export function getUnlockedBanners(totalXP) {
  return BANNERS.filter(b => (totalXP || 0) >= b.unlockXP);
}

// Note: call getAllBannersById from ShopData-aware contexts; this handles base banners only
export function getBannerById(id, shopBanners = []) {
  if (!id) return BANNERS[0];
  return BANNERS.find(b => b.id === id) || shopBanners.find(b => b.id === id) || BANNERS[0];
}