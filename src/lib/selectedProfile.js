const KEY = "circadia_selected_profile_id";

export function getSelectedProfileId() {
  return localStorage.getItem(KEY) || null;
}

export function setSelectedProfileId(id) {
  localStorage.setItem(KEY, id);
}

export function clearSelectedProfile() {
  localStorage.removeItem(KEY);
}