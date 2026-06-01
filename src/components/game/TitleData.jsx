import { SHOP_TITLES } from "./ShopData";

// Player milestone titles — earned automatically via profile achievements
export const TITLES = [
  // Progression & Milestones
  { id: "title_newcomer",    label: "Newcomer",       color: "text-slate-400",   bg: "bg-slate-500/15",   condition: p => (p.challenges_completed || 0) >= 1,      hint: "Complete your first challenge" },
  { id: "title_superstar",   label: "Superstar ⭐",   color: "text-yellow-300",  bg: "bg-yellow-400/15",  condition: p => (p.total_xp || 0) >= 5000,               hint: "Earn 5,000 XP" },
  { id: "title_shredded",    label: "Hyper Shredded", color: "text-fuchsia-400", bg: "bg-fuchsia-500/20", condition: p => (p.total_xp || 0) >= 7500,               hint: "Earn 7,500 XP" },
  { id: "title_legend",      label: "Legend 👑",      color: "text-amber-300",   bg: "bg-amber-400/20",   condition: p => (p.total_xp || 0) >= 10000,              hint: "Earn 10,000 XP" },

  // Streak & Habits
  { id: "title_on_fire",     label: "On Fire 🔥",     color: "text-orange-400",  bg: "bg-orange-500/15",  condition: p => (p.current_streak || 0) >= 3,             hint: "Reach a 3-day streak" },
  { id: "title_week_warrior",label: "Week Warrior",   color: "text-yellow-400",  bg: "bg-yellow-500/15",  condition: p => (p.current_streak || 0) >= 7,             hint: "Reach a 7-day streak" },
  { id: "title_unstoppable", label: "Unstoppable",    color: "text-amber-300",   bg: "bg-amber-500/15",  condition: p => (p.current_streak || 0) >= 14,            hint: "Reach a 14-day streak" },
  { id: "title_gym_rat",     label: "Gym Rat 🐀",     color: "text-emerald-400", bg: "bg-emerald-500/15", condition: p => (p.current_streak || 0) >= 21,            hint: "Maintain a 21-day workout habit" },
  { id: "title_eternal",     label: "Eternal Grind",  color: "text-purple-400",  bg: "bg-purple-500/15",  condition: p => (p.current_streak || 0) >= 30,            hint: "Reach a 30-day streak" },
  { id: "title_streak_master",label: "Habit Builder 🛠️", color: "text-teal-400",   bg: "bg-teal-500/15",    condition: p => (p.current_streak || 0) >= 45,            hint: "Reach a 45-day workout streak" },

  // Strength & Power
  { id: "title_iron_addict", label: "Iron Addict 🏋️‍♂️",  color: "text-zinc-300",    bg: "bg-zinc-500/15",    condition: p => (p.total_xp || 0) >= 1000,               hint: "Accumulate 1,000 Volume XP" },
  { id: "title_barbell_boss", label: "Barbell Boss",  color: "text-amber-400",   bg: "bg-amber-500/15",   condition: p => (p.total_xp || 0) >= 2500,               hint: "Accumulate 2,500 Volume XP" },
  { id: "title_heavy_lifter", label: "Heavy Lifter 💪", color: "text-rose-400",    bg: "bg-rose-500/15",    condition: p => (p.total_xp || 0) >= 4000,               hint: "Accumulate 4,000 Volume XP" },
  { id: "title_plate_masher", label: "Plate Masher 🛠️", color: "text-orange-500",  bg: "bg-orange-500/20",  condition: p => (p.total_xp || 0) >= 6000,               hint: "Accumulate 6,000 Volume XP" },
  { id: "title_powerlifter",  label: "Apex Powerlifter",color: "text-red-500",     bg: "bg-red-500/25",     condition: p => (p.total_xp || 0) >= 8500,               hint: "Accumulate 8,500 Volume XP" },

  // Cardio & Endurance
  { id: "title_pavement_pounder", label: "Pavement Pounder", color: "text-sky-400", bg: "bg-sky-500/15", condition: p => (p.challenges_completed || 0) >= 10,     hint: "Complete 10 fitness challenges" },
  { id: "title_cardio_king", label: "Cardio King 🏃‍♂️",  color: "text-cyan-400",    bg: "bg-cyan-500/15",    condition: p => (p.challenges_completed || 0) >= 25,     hint: "Complete 25 cardiovascular sets" },
  { id: "title_marathoner",   label: "Marathon Mindset",color: "text-blue-300",   bg: "bg-blue-500/15",    condition: p => (p.challenges_completed || 0) >= 50,     hint: "Complete 50 endurance training runs" },
  { id: "title_endurance_god", label: "Endurance God 🏆", color: "text-blue-400",   bg: "bg-blue-500/20",    condition: p => (p.challenges_completed || 0) >= 100,    hint: "Complete 100 total training sessions" },

  // HIIT & Conditioning
  { id: "title_hiit_engine",  label: "HIIT Engine ⚡",   color: "text-lime-400",    bg: "bg-lime-500/15",    condition: p => (p.challenges_completed || 0) >= 15 && (p.current_streak || 0) >= 5, hint: "Complete 15 challenges and hold a 5-day streak" },
  { id: "title_metcon",       label: "Metcon Master",   color: "text-emerald-300", bg: "bg-emerald-500/20", condition: p => (p.total_xp || 0) >= 3500 && (p.challenges_completed || 0) >= 30, hint: "3,500 XP and 30 completed training circuits" },
  { id: "title_oxygen_thief", label: "Oxygen Burner 🫁", color: "text-indigo-400",  bg: "bg-indigo-500/15",  condition: p => (p.challenges_completed || 0) >= 75,     hint: "Complete 75 high-intensity cardio missions" },

  // --- NEW PROGRESSIVE HIGH-TIER MILESTONE INTEGRATION ---
  { id: "title_casual",       label: "Casual Enjoyer",  color: "text-slate-400",   bg: "bg-slate-500/10",   condition: p => (p.challenges_completed || 0) >= 5,      hint: "Complete 5 total training challenges" },
  { id: "title_grinder",      label: "Daily Grinder ⚔️", color: "text-zinc-300",    bg: "bg-zinc-500/15",    condition: p => (p.current_streak || 0) >= 5,            hint: "Hold a 5-day training streak alive" },
  { id: "title_beast",        label: "Beast Mode 🦍",   color: "text-emerald-400", bg: "bg-emerald-500/15", condition: p => (p.total_xp || 0) >= 15000,              hint: "Gain a career total of 15,000 XP" },
  { id: "title_overdrive",    label: "Overdrive ⚡",     color: "text-cyan-400",    bg: "bg-cyan-500/20",    condition: p => (p.total_xp || 0) >= 20000 && (p.current_streak || 0) >= 10, hint: "Reach 20,000 XP and sustain a 10-day streak" },
  { id: "title_immortal",     label: "The Immortal 🛡️", color: "text-purple-400",  bg: "bg-purple-500/20",  condition: p => (p.challenges_completed || 0) >= 200,    hint: "Log 200 fitness journey sessions" },
  { id: "title_colossus",     label: "Colossus ⛰️",     color: "text-rose-400",    bg: "bg-rose-500/25",    condition: p => (p.total_xp || 0) >= 35000,              hint: "Gain a career total of 35,000 XP" },
  { id: "title_deity",        label: "Fitness Deity 🌌", color: "text-indigo-400",  bg: "bg-indigo-500/25",  condition: p => (p.total_xp || 0) >= 45000 && (p.challenges_completed || 0) >= 350, hint: "Amass 45,000 XP and clear 350 challenges" },
  
  // THE APEX ENDGAME UNLOCKABLE
  { 
    id: "title_goat",        
    label: "G.O.A.T 👑🐐",    
    color: "text-amber-300 text-glow animate-pulse", 
    bg: "bg-amber-400/25 border border-amber-400/40", 
    condition: p => (p.total_xp || 0) >= 50000 && (p.challenges_completed || 0) >= 500 && (p.current_streak || 0) >= 60, 
    hint: "Accumulate 50,000 XP, complete 500 challenges, and complete a 60-day workout streak" 
  }
];

function safeParseIds(field) {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === "string") {
    if (field.startsWith("[")) {
      try {
        const parsed = JSON.parse(field);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { /* fallback below */ }
    }
    return field.split(",").map(s => s.trim()).filter(Boolean);
  }
  return [];
}

/** Parses and combines both achievement milestone titles and premium shop titles */
export function getActiveTitles(profile) {
  if (!profile) return [];

  // 1. Gather all equipped IDs across all variant database column locations
  const mainList = safeParseIds(profile.equipped_title_id);
  const secondaryList = safeParseIds(profile.equipped_title_ids);
  
  // Also look into local storage fallback so they remain locked-in together
  let storageList = [];
  if (profile.id) {
    try {
      const localData = localStorage.getItem(`equipped_titles_${profile.id}`);
      if (localData) storageList = safeParseIds(JSON.parse(localData));
    } catch (e) { /* silent catch */ }
  }

  // Merge everything safely into an completely unique list of target IDs
  const combinedIds = Array.from(new Set([...mainList, ...secondaryList, ...storageList]));

  // 2. Filter out active achievement badges that match conditions
  const activeMilestones = TITLES.filter(t => combinedIds.includes(t.id) && t.condition(profile));

  // 3. Filter out shop-purchased badges that the profile owns
  const ownedShopIds = safeParseIds(profile.owned_titles);
  const activeShopTitles = SHOP_TITLES.filter(t => combinedIds.includes(t.id) && ownedShopIds.includes(t.id))
    .map(t => ({ ...t, condition: () => true }));

  // Return both combined arrays seamlessly together
  return [...activeMilestones, ...activeShopTitles];
}

/** Fallback helper ensuring single-badge render layouts don't crash */
export function getActiveTitle(profile) {
  const all = getActiveTitles(profile);
  return all.length > 0 ? all[0] : null;
}

export function getUnlockedTitles(profile) {
  if (!profile) return [];
  return TITLES.filter(t => t.condition(profile));
}