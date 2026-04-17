// Helpers for persisting app state in localStorage

export const storage = {
  get: (key, fallback = null) => {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error("localStorage write failed");
    }
  },
  remove: (key) => localStorage.removeItem(key),
};

// Add a song to recently played (max 20, no duplicates)
export function addToRecentlyPlayed(song) {
  const recent = storage.get("musify_recent", []);
  const filtered = recent.filter((s) => s.id !== song.id);
  const updated = [song, ...filtered].slice(0, 20);
  storage.set("musify_recent", updated);
}
