import { SHOP_TITLES } from "./ShopData";

// Player titles — each has a unique unlock condition based on profile data
// color: tailwind text color class for the badge
export const TITLES = [
  // First steps
  { id: "title_newcomer",    label: "Newcomer",       color: "text-slate-400",   bg: "bg-slate-500/15",   condition: p => (p.challenges_completed || 0) >= 1,       hint: "Complete your first challenge" },

  // Streak titles
  { id: "title_on_fire",     label: "On Fire 🔥",     color: "text-orange-400",  bg: "bg-orange-500/15",  condition: p => (p.current_streak || 0) >= 3,             hint: "Reach a 3-day streak" },
  { id: "title_week_warrior",label: "Week Warrior",   color: "text-yellow-400",  bg: "bg-yellow-500/15",  condition: p => (p.current_streak || 0) >= 7,             hint: "Reach a 7-day streak" },
  { id: "title_unstoppable", label: "Unstoppable",    color: "text-amber-300",   bg: "bg-amber-500/15",   condition: p => (p.current_streak || 0) >= 14,            hint: "Reach a 14-day streak" },
  { id: "title_eternal",     label: "Eternal Grind",  color: "text-red-400",     bg: "bg-red-500/15",     condition: p => (p.current_streak || 0) >= 30,            hint: "Reach a 30-day streak" },

  // XP / Level titles
  { id: "title_apprentice",  label: "Apprentice",     color: "text-green-400",   bg: "bg-green-500/15",   condition: p => (p.total_xp || 0) >= 100,                 hint: "Earn 100 XP" },
  { id: "title_athlete",     label: "Athlete",        color: "text-cyan-400",    bg: "bg-cyan-500/15",    condition: p => (p.total_xp || 0) >= 500,                 hint: "Earn 500 XP" },
  { id: "title_iron_will",   label: "Iron Will",      color: "text-blue-400",    bg: "bg-blue-500/15",    condition: p => (p.total_xp || 0) >= 1000,                hint: "Earn 1,000 XP" },
  { id: "title_elite",       label: "Elite",          color: "text-violet-400",  bg: "bg-violet-500/15",  condition: p => (p.level || 1) >= 10,                     hint: "Reach Level 10" },
  { id: "title_apex",        label: "Apex",           color: "text-purple-300",  bg: "bg-purple-500/15",  condition: p => (p.level || 1) >= 20,                     hint: "Reach Level 20" },

  // Challenge volume titles
  { id: "title_challenger",  label: "Challenger",     color: "text-pink-400",    bg: "bg-pink-500/15",    condition: p => (p.challenges_completed || 0) >= 10,      hint: "Complete 10 challenges" },
  { id: "title_grinder",     label: "The Grinder",    color: "text-fuchsia-400", bg: "bg-fuchsia-500/15", condition: p => (p.challenges_completed || 0) >= 50,      hint: "Complete 50 challenges" },
  { id: "title_centurion",   label: "Centurion",      color: "text-rose-300",    bg: "bg-rose-500/15",    condition: p => (p.challenges_completed || 0) >= 100,     hint: "Complete 100 challenges" },

  // Prestige
  { id: "title_superstar",   label: "Superstar ⭐",   color: "text-yellow-300",  bg: "bg-yellow-400/15",  condition: p => (p.total_xp || 0) >= 5000,                hint: "Earn 5,000 XP" },
  { id: "title_legend",      label: "Legend 👑",      color: "text-amber-300",   bg: "bg-amber-400/20",   condition: p => (p.total_xp || 0) >= 10000,               hint: "Earn 10,000 XP" },
];

/** Returns the equipped title if valid and unlocked/owned, otherwise falls back to the highest earned */
export function getActiveTitle(profile) {
  if (!profile) return null;
  // Use equipped title if set — check both earned titles and shop titles
  if (profile.equipped_title_id) {
    const earned = TITLES.find(t => t.id === profile.equipped_title_id && t.condition(profile));
    if (earned) return earned;
    // Check shop titles
    const ownedShopTitles = profile.owned_titles || [];
    if (ownedShopTitles.includes(profile.equipped_title_id)) {
      const shopTitle = SHOP_TITLES.find(t => t.id === profile.equipped_title_id);
      if (shopTitle) return { ...shopTitle, condition: () => true };
    }
  }
  // Fallback: highest earned
  let active = null;
  for (const title of TITLES) {
    if (title.condition(profile)) active = title;
  }
  return active;
}

/** Returns all unlocked titles for a profile */
export function getUnlockedTitles(profile) {
  if (!profile) return [];
  return TITLES.filter(t => t.condition(profile));
}