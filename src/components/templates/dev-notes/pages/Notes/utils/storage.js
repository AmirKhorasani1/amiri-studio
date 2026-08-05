const STORAGE_KEY = "dev-notes:notes";

export function loadNotes() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to read notes from localStorage:", err);
    return [];
  }
}

export function saveNotes(notes) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error("Failed to save notes to localStorage:", err);
  }
}