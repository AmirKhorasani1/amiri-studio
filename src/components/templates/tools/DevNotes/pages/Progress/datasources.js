const PROJECTS_KEY = "dn-projects-v1";
const TASKS_KEY = "task-manager:tasks";
const NOTES_KEY = "dev-notes:notes";

function readJSON(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

// Progress مستقیم از localStorage می‌خونه (نه از utils داخلی Projects)، پس همون نرمال‌سازی
// status/techStack/tasks پیش‌فرض رو اینجا هم رعایت می‌کنیم تا با پروژه‌های قدیمی کرش نکنه.
export function getProjects() {
  return readJSON(PROJECTS_KEY, []).map((p) => ({
    status: "active",
    techStack: [],
    tasks: [],
    ...p,
  }));
}

export function getPersonalTasks() {
  return readJSON(TASKS_KEY, []);
}

export function getNotes() {
  return readJSON(NOTES_KEY, []);
}