// Achievement definitions
// condition(profile) => boolean — check if earned
// bonusXP — awarded once when unlocked
export const ACHIEVEMENTS = [
  // Streak milestones
  { id: "streak_3",    emoji: "🔥", name: "On Fire",        description: "3-day streak!",          bonusXP: 30,  condition: p => (p.current_streak || 0) >= 3 },
  { id: "streak_7",    emoji: "🌟", name: "Week Warrior",   description: "7-day streak!",          bonusXP: 75,  condition: p => (p.current_streak || 0) >= 7 },
  { id: "streak_14",   emoji: "💫", name: "Two-Week Hero",  description: "14-day streak!",         bonusXP: 150, condition: p => (p.current_streak || 0) >= 14 },
  { id: "streak_30",   emoji: "👑", name: "Month Master",   description: "30-day streak!",         bonusXP: 400, condition: p => (p.current_streak || 0) >= 30 },

  // XP milestones
  { id: "xp_100",      emoji: "⚡", name: "Spark",          description: "Earn 100 XP",            bonusXP: 20,  condition: p => (p.total_xp || 0) >= 100 },
  { id: "xp_500",      emoji: "💥", name: "Power Up",       description: "Earn 500 XP",            bonusXP: 50,  condition: p => (p.total_xp || 0) >= 500 },
  { id: "xp_1000",     emoji: "🚀", name: "Rocket",         description: "Earn 1,000 XP",          bonusXP: 100, condition: p => (p.total_xp || 0) >= 1000 },
  { id: "xp_5000",     emoji: "🌌", name: "Superstar",      description: "Earn 5,000 XP",          bonusXP: 300, condition: p => (p.total_xp || 0) >= 5000 },
  { id: "xp_10000",    emoji: "🏆", name: "Legend",         description: "Earn 10,000 XP",         bonusXP: 750, condition: p => (p.total_xp || 0) >= 10000 },

  // Challenges completed milestones
  { id: "done_1",      emoji: "🎯", name: "First Blood",    description: "Complete 1 challenge",   bonusXP: 10,  condition: p => (p.challenges_completed || 0) >= 1 },
  { id: "done_10",     emoji: "🏅", name: "Ten Down",       description: "Complete 10 challenges", bonusXP: 50,  condition: p => (p.challenges_completed || 0) >= 10 },
  { id: "done_50",     emoji: "🎖️", name: "Challenger",    description: "Complete 50 challenges", bonusXP: 200, condition: p => (p.challenges_completed || 0) >= 50 },
  { id: "done_100",    emoji: "💎", name: "Diamond Grind",  description: "Complete 100 challenges",bonusXP: 500, condition: p => (p.challenges_completed || 0) >= 100 },

  // Level milestones
  { id: "level_5",     emoji: "🌱", name: "Growing Strong", description: "Reach Level 5",          bonusXP: 50,  condition: p => (p.level || 1) >= 5 },
  { id: "level_10",    emoji: "🦾", name: "Iron Body",      description: "Reach Level 10",         bonusXP: 150, condition: p => (p.level || 1) >= 10 },
  { id: "level_20",    emoji: "🧗", name: "Elite",          description: "Reach Level 20",         bonusXP: 500, condition: p => (p.level || 1) >= 20 },
];

export function getNewlyEarned(profile) {
  const already = new Set(profile.unlocked_achievements || []);
  return ACHIEVEMENTS.filter(a => !already.has(a.id) && a.condition(profile));
}