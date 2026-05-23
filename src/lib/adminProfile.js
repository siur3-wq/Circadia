// ─── Customize the admin profile here ───────────────────────────────────────
export const ADMIN_CONFIG = {
  name: "Admin",
  emoji: "🛡️",
  pin: "1230",
};
// ────────────────────────────────────────────────────────────────────────────

const KEY = "circadia_is_admin";

export const setAdminMode = () => localStorage.setItem(KEY, "true");
export const clearAdminMode = () => localStorage.removeItem(KEY);
export const isAdminMode = () => localStorage.getItem(KEY) === "true";